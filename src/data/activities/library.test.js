import { describe, expect, it } from 'vitest';
import { ACTIVITIES } from './index.js';
import { KNOWN_TAGS, isActivitySafe } from '../../logic/safety.js';
import { DOMAIN_IDS, MAX_MONTHS, MIN_MONTHS } from '../../logic/config.js';

// Teks yang menggambarkan apa yang dilakukan dan dipakai anak.
// Catatan keselamatan tidak ikut audit kata kunci karena wajar menyebut bahaya
// ("jauhkan dari pisau"), tetapi tetap ikut audit kata terlarang.
const activityText = (a) => [a.judul, a.tujuan, ...a.bahan, ...a.langkah].join(' ').toLowerCase();
const fullText = (a) => [activityText(a), a.keselamatan.toLowerCase()].join(' ');

const word = (w) => new RegExp(`\\b${w}\\b`, 'i');

// Kata kunci yang wajib disertai tag risiko tertentu.
const KEYWORDS = {
  smallParts: ['kancing', 'biji', 'manik', 'manik-manik', 'kerikil', 'koin', 'kelereng', 'tutup botol', 'potongan sedotan', 'beras', 'butir', 'mote', 'uang logam', 'karet gelang'],
  foodChoking: ['kacang', 'anggur', 'permen', 'sosis', 'wortel', 'popcorn', 'berondong', 'jagung'],
  sharp: ['gunting', 'pisau', 'pensil', 'jarum', 'garpu', 'cutter', 'paku', 'tusuk'],
  cord: ['tali', 'pita', 'benang', 'kabel', 'rafia', 'selendang'],
  water: ['air', 'ember', 'baskom', 'siram', 'menyiram', 'kolam'],
  height: ['tangga', 'undakan', 'papan', 'bangku', 'memanjat', 'titian'],
};

// Pengecualian eksplisit: [id kegiatan, kata kunci, alasan].
const EXCEPTIONS = [
  ['halus-09', 'air', 'air dicampur ke adonan oleh dewasa, bukan wadah berair'],
];

const isException = (id, kw) => EXCEPTIONS.some(([eid, ekw]) => eid === id && ekw === kw);

// Kata yang tidak boleh muncul sama sekali.
const BANNED = ['balon', 'kompor', 'api', 'lilin', 'magnet', 'baterai', 'kantong plastik', 'korek', 'setrika', 'minyak panas', 'air panas'];

describe('audit pustaka kegiatan', () => {
  it('jumlah kegiatan sekitar 130', () => {
    expect(ACTIVITIES.length).toBeGreaterThanOrEqual(125);
    for (const d of DOMAIN_IDS) {
      expect(ACTIVITIES.filter((a) => a.domain === d).length).toBeGreaterThanOrEqual(24);
    }
  });

  it('id unik dan domain sesuai awalan id', () => {
    const ids = ACTIVITIES.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const a of ACTIVITIES) {
      expect(DOMAIN_IDS).toContain(a.domain);
      expect(a.id.startsWith(`${a.domain}-`)).toBe(true);
    }
  });

  it('field wajib terisi dengan benar', () => {
    for (const a of ACTIVITIES) {
      const where = a.id;
      expect(a.judul.trim(), where).not.toBe('');
      expect(a.tujuan.trim(), where).not.toBe('');
      expect(a.bahan.length, where).toBeGreaterThan(0);
      expect(a.langkah.length, where).toBeGreaterThanOrEqual(3);
      expect(a.langkah.length, where).toBeLessThanOrEqual(4);
      for (const l of a.langkah) expect(l.trim(), where).not.toBe('');
      expect(Number.isInteger(a.durasi), where).toBe(true);
      expect(a.durasi, where).toBeGreaterThanOrEqual(5);
      expect(a.durasi, where).toBeLessThanOrEqual(20);
      expect(a.min, where).toBeLessThanOrEqual(a.max);
      expect(a.min, where).toBeGreaterThanOrEqual(MIN_MONTHS);
      expect(a.max, where).toBeLessThanOrEqual(MAX_MONTHS);
      expect(a.keselamatan.trim(), where).not.toBe('');
    }
  });

  it('semua tag risiko dikenal', () => {
    for (const a of ACTIVITIES) {
      for (const tag of a.risiko) expect(KNOWN_TAGS, `${a.id}: ${tag}`).toContain(tag);
    }
  });

  it('kata kunci berbahaya selalu disertai tag yang sesuai', () => {
    const problems = [];
    for (const a of ACTIVITIES) {
      const text = activityText(a);
      for (const [tag, words] of Object.entries(KEYWORDS)) {
        for (const kw of words) {
          if (word(kw).test(text) && !a.risiko.includes(tag) && !isException(a.id, kw)) {
            problems.push(`${a.id}: "${kw}" tanpa tag ${tag}`);
          }
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it('setiap pengecualian masih dipakai (tidak basi)', () => {
    for (const [id, kw] of EXCEPTIONS) {
      const a = ACTIVITIES.find((x) => x.id === id);
      expect(a, id).toBeTruthy();
      expect(word(kw).test(activityText(a)), `${id}/${kw}`).toBe(true);
    }
  });

  it('batas kata bekerja: "memberi" bukan "ember", "tetangga" bukan "tangga"', () => {
    expect(word('ember').test('memberi pujian')).toBe(false);
    expect(word('tangga').test('anak tetangga')).toBe(false);
    expect(word('api').test('rapikan sapi')).toBe(false);
    expect(word('air').test('sedikit air')).toBe(true);
  });

  it('tidak ada kata terlarang', () => {
    const problems = [];
    for (const a of ACTIVITIES) {
      for (const b of BANNED) if (word(b).test(fullText(a))) problems.push(`${a.id}: ${b}`);
    }
    expect(problems).toEqual([]);
  });

  it('tidak ada benda kecil untuk usia di bawah 48 bulan', () => {
    for (const a of ACTIVITIES) {
      if (a.risiko.includes('smallParts') || a.risiko.includes('foodChoking')) {
        expect(a.min, a.id).toBeGreaterThanOrEqual(48);
      }
    }
  });

  it('tiap usia, tiap domain memiliki minimal 5 kegiatan aman', () => {
    const gaps = [];
    for (let m = MIN_MONTHS; m <= MAX_MONTHS; m += 1) {
      for (const d of DOMAIN_IDS) {
        const n = ACTIVITIES.filter((a) => a.domain === d && a.min <= m && m <= a.max && isActivitySafe(a, m)).length;
        if (n < 5) gaps.push(`${d} @ ${m}: ${n}`);
      }
    }
    expect(gaps).toEqual([]);
  });
});
