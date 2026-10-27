import { DOMAIN_IDS, MIN_ACTIVITIES_TO_REPEAT, PLAN_DAYS, REPEAT_WEIGHTS } from './config.js';
import { ageBand } from './age.js';
import { activeFilters, isActivitySafe } from './safety.js';
import { defaultRng, shuffle, weightedIndex } from './rng.js';

/** Kegiatan yang cocok usia dan lolos keselamatan, dikelompokkan per domain. */
export function eligibleByDomain(months, library) {
  const pools = Object.fromEntries(DOMAIN_IDS.map((d) => [d, []]));
  for (const act of library) {
    if (!pools[act.domain]) continue;
    if (act.min <= months && months <= act.max && isActivitySafe(act, months)) {
      pools[act.domain].push(act);
    }
  }
  return pools;
}

export function repeatWeightsFor(months) {
  const row = REPEAT_WEIGHTS.find((r) => months >= r.from && months <= r.to);
  return row ? row.weights : Object.fromEntries(DOMAIN_IDS.map((d) => [d, 1]));
}

/** Memilih 2 domain tambahan yang berbeda, berbobot menurut usia. */
export function pickRepeatDomains(months, pools, rng = defaultRng, count = PLAN_DAYS - DOMAIN_IDS.length) {
  const weights = repeatWeightsFor(months);
  let candidates = DOMAIN_IDS.filter((d) => pools[d].length >= MIN_ACTIVITIES_TO_REPEAT && (weights[d] || 0) > 0);
  if (candidates.length < count) {
    throw new Error('Pustaka kegiatan tidak cukup untuk menyusun rencana 7 hari pada usia ini.');
  }
  const picked = [];
  for (let i = 0; i < count; i += 1) {
    const idx = weightedIndex(candidates.map((d) => weights[d]), rng);
    picked.push(candidates[idx]);
    candidates = candidates.filter((_, j) => j !== idx);
  }
  return picked;
}

/** Menyusun urutan domain dengan backtracking acak: tidak ada domain sama berurutan. */
export function arrangeDomains(domains, rng = defaultRng) {
  const counts = {};
  for (const d of domains) counts[d] = (counts[d] || 0) + 1;
  const result = [];

  function step() {
    if (result.length === domains.length) return true;
    const prev = result[result.length - 1];
    for (const d of shuffle(Object.keys(counts), rng)) {
      if (counts[d] === 0 || d === prev) continue;
      counts[d] -= 1;
      result.push(d);
      if (step()) return true;
      result.pop();
      counts[d] += 1;
    }
    return false;
  }

  if (!step()) throw new Error('Tidak dapat menyusun urutan domain tanpa pengulangan berurutan.');
  return result;
}

/** Bobot kegiatan: makin dekat titik tengah rentang usianya ke usia anak, makin besar peluangnya. */
export function activityWeight(act, months) {
  const mid = (act.min + act.max) / 2;
  return 1 / (1 + Math.abs(mid - months) / 6);
}

function drawActivity(pool, used, months, rng) {
  const options = pool.filter((a) => !used.has(a.id));
  if (options.length === 0) throw new Error('Kegiatan aman untuk domain ini habis.');
  const pick = options[weightedIndex(options.map((a) => activityWeight(a, months)), rng)];
  used.add(pick.id);
  return pick;
}

/**
 * Menyusun rencana 7 hari.
 * @param {number} months usia anak (bulan), sudah tervalidasi
 * @param {Array} library pustaka kegiatan
 * @param {() => number} rng pembangkit acak [0, 1)
 */
export function buildPlan(months, library, rng = defaultRng) {
  const pools = eligibleByDomain(months, library);
  for (const d of DOMAIN_IDS) {
    if (pools[d].length < 2) {
      throw new Error(`Kegiatan aman untuk domain ${d} pada usia ${months} bulan tidak cukup.`);
    }
  }
  const repeated = pickRepeatDomains(months, pools, rng);
  const order = arrangeDomains([...DOMAIN_IDS, ...repeated], rng);
  const used = new Set();
  const days = order.map((domain, i) => {
    const utama = drawActivity(pools[domain], used, months, rng);
    const cadangan = drawActivity(pools[domain], used, months, rng);
    return { hari: i + 1, domain, utama, cadangan };
  });
  return { months, band: ageBand(months), repeated, days, filters: activeFilters(months) };
}
