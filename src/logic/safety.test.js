import { describe, expect, it } from 'vitest';
import { activeFilters, conservativeAge, isActivitySafe, isTagAllowed, KNOWN_TAGS, SAFETY_TAGS } from './safety.js';
import { buildPlan } from './planner.js';
import { seededRng } from './rng.js';
import { ACTIVITIES } from '../data/activities/index.js';

// Ambang ditulis ulang secara independen dari kode produksi.
// null = tidak pernah boleh muncul.
const EXPECTED = {
  smallParts: 48,
  foodChoking: 48,
  sharp: 48,
  cord: 36,
  water: 24,
  height: 24,
  balloon: null,
  heat: null,
  magnetBattery: null,
  plasticBag: null,
};

function expectedAllowed(tag, months) {
  const t = EXPECTED[tag];
  if (t === null) return false;
  return months - 1 >= t;
}

describe('aturan keselamatan', () => {
  it('daftar tag sama persis dengan yang diharapkan', () => {
    expect([...KNOWN_TAGS].sort()).toEqual(Object.keys(EXPECTED).sort());
  });

  it('usia konservatif = usia - 1', () => {
    expect(conservativeAge(48)).toBe(47);
  });

  it('setiap tag cocok dengan ambang independen pada semua usia 12-83', () => {
    for (const tag of Object.keys(EXPECTED)) {
      for (let m = 12; m <= 83; m += 1) {
        expect(isTagAllowed(tag, m), `${tag} @ ${m}`).toBe(expectedAllowed(tag, m));
      }
    }
  });

  it('contoh titik batas: benda kecil baru boleh di 49 bulan', () => {
    expect(isTagAllowed('smallParts', 48)).toBe(false);
    expect(isTagAllowed('smallParts', 49)).toBe(true);
    expect(isTagAllowed('cord', 36)).toBe(false);
    expect(isTagAllowed('cord', 37)).toBe(true);
    expect(isTagAllowed('water', 24)).toBe(false);
    expect(isTagAllowed('water', 25)).toBe(true);
  });

  it('tag "tidak pernah" tidak pernah lolos, bahkan di usia jauh di atas rentang', () => {
    for (const tag of ['balloon', 'heat', 'magnetBattery', 'plasticBag']) {
      for (const m of [12, 48, 83, 96, 200, 1000]) {
        expect(isTagAllowed(tag, m)).toBe(false);
      }
    }
  });

  it('tag tak dikenal dianggap tidak aman', () => {
    expect(isTagAllowed('misterius', 83)).toBe(false);
    expect(isActivitySafe({ risiko: ['misterius'] }, 83)).toBe(false);
  });

  it('setiap tag punya teks label, risiko, potensi, aturan', () => {
    for (const tag of KNOWN_TAGS) {
      for (const field of ['label', 'risiko', 'potensi', 'aturan']) {
        expect(SAFETY_TAGS[tag][field], `${tag}.${field}`).toBeTruthy();
      }
    }
  });

  it('penyaring aktif sesuai usia', () => {
    const at12 = activeFilters(12).map((f) => f.tag).sort();
    expect(at12).toEqual(Object.keys(EXPECTED).sort());
    const at83 = activeFilters(83).map((f) => f.tag).sort();
    expect(at83).toEqual(['balloon', 'heat', 'magnetBattery', 'plasticBag']);
  });

  it('kegiatan sintetis berbalon tidak pernah muncul di rencana', () => {
    const balon = (domain, n) =>
      Array.from({ length: n }, (_, i) => ({
        id: `${domain}-balon-${i}`, domain, judul: 'Main balon', tujuan: 'x', bahan: [], langkah: [],
        durasi: 10, min: 12, max: 83, risiko: ['balloon'], keselamatan: 'x',
      }));
    const library = [...ACTIVITIES, ...['kasar', 'halus', 'bahasa', 'kognitif', 'sosem'].flatMap((d) => balon(d, 30))];
    for (let m = 12; m <= 83; m += 1) {
      for (let s = 0; s < 5; s += 1) {
        const plan = buildPlan(m, library, seededRng(m * 100 + s));
        for (const day of plan.days) {
          expect(day.utama.risiko).not.toContain('balloon');
          expect(day.cadangan.risiko).not.toContain('balloon');
        }
      }
    }
  });
});
