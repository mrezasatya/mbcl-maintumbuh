import { describe, expect, it } from 'vitest';
import { arrangeDomains, buildPlan, pickRepeatDomains, eligibleByDomain } from './planner.js';
import { seededRng } from './rng.js';
import { ACTIVITIES } from '../data/activities/index.js';
import { isActivitySafe } from './safety.js';
import { DOMAIN_IDS, MAX_MONTHS, MIN_MONTHS } from './config.js';

const SEEDS = 40;

describe('buildPlan untuk semua usia dan banyak seed', () => {
  for (let m = MIN_MONTHS; m <= MAX_MONTHS; m += 1) {
    it(`usia ${m} bulan`, () => {
      for (let s = 0; s < SEEDS; s += 1) {
        const plan = buildPlan(m, ACTIVITIES, seededRng(m * 1000 + s));
        const domains = plan.days.map((d) => d.domain);

        expect(plan.days).toHaveLength(7);
        expect(new Set(domains).size).toBe(5);
        for (let i = 1; i < domains.length; i += 1) expect(domains[i]).not.toBe(domains[i - 1]);
        for (const d of DOMAIN_IDS) expect(domains.filter((x) => x === d).length).toBeLessThanOrEqual(2);

        const ids = plan.days.flatMap((d) => [d.utama.id, d.cadangan.id]);
        expect(new Set(ids).size).toBe(14);

        for (const day of plan.days) {
          expect(day.utama).toBeTruthy();
          expect(day.cadangan).toBeTruthy();
          expect(day.utama.id).not.toBe(day.cadangan.id);
          for (const act of [day.utama, day.cadangan]) {
            expect(act.domain).toBe(day.domain);
            expect(act.min).toBeLessThanOrEqual(m);
            expect(act.max).toBeGreaterThanOrEqual(m);
            expect(isActivitySafe(act, m)).toBe(true);
          }
        }
      }
    });
  }
});

describe('variasi', () => {
  it('"Susun ulang" menghasilkan rencana yang berbeda', () => {
    for (const m of [12, 20, 30, 45, 60, 83]) {
      const rng = seededRng(m);
      const keys = new Set();
      for (let i = 0; i < 10; i += 1) {
        const plan = buildPlan(m, ACTIVITIES, rng);
        keys.add(plan.days.map((d) => d.utama.id).join(','));
      }
      expect(keys.size).toBeGreaterThan(5);
    }
  });

  it('seed sama menghasilkan rencana sama', () => {
    const a = buildPlan(30, ACTIVITIES, seededRng(7));
    const b = buildPlan(30, ACTIVITIES, seededRng(7));
    expect(a.days.map((d) => d.utama.id)).toEqual(b.days.map((d) => d.utama.id));
  });
});

describe('pembobotan domain ulang', () => {
  function tally(months, n = 3000) {
    const pools = eligibleByDomain(months, ACTIVITIES);
    const rng = seededRng(months);
    const c = Object.fromEntries(DOMAIN_IDS.map((d) => [d, 0]));
    for (let i = 0; i < n; i += 1) {
      const picked = pickRepeatDomains(months, pools, rng);
      expect(new Set(picked).size).toBe(2);
      for (const d of picked) c[d] += 1;
    }
    return c;
  }

  it('12-17 bulan condong ke motorik kasar dan bahasa', () => {
    const c = tally(14);
    expect(c.kasar).toBeGreaterThan(c.kognitif);
    expect(c.bahasa).toBeGreaterThan(c.kognitif);
  });

  it('48 bulan ke atas condong menjauhi motorik kasar', () => {
    const c = tally(60);
    expect(c.kognitif).toBeGreaterThan(c.kasar);
  });

  it('domain dengan kegiatan aman kurang dari 4 tidak diulang', () => {
    const pools = eligibleByDomain(30, ACTIVITIES);
    pools.kasar = pools.kasar.slice(0, 3);
    for (let i = 0; i < 200; i += 1) {
      expect(pickRepeatDomains(30, pools, seededRng(i))).not.toContain('kasar');
    }
  });
});

describe('arrangeDomains', () => {
  it('tidak ada domain berurutan', () => {
    for (let s = 0; s < 200; s += 1) {
      const order = arrangeDomains([...DOMAIN_IDS, 'kasar', 'bahasa'], seededRng(s));
      expect(order).toHaveLength(7);
      for (let i = 1; i < order.length; i += 1) expect(order[i]).not.toBe(order[i - 1]);
    }
  });
});
