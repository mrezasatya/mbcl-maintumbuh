import { describe, expect, it } from 'vitest';
import { ageBand, ageInMonths, formatAge, validateBirth, yearOptions } from './age.js';
import { MAX_MONTHS, MIN_MONTHS } from './config.js';

// Tanggal tetap: 15 Juni 2026.
const NOW = new Date(2026, 5, 15);

describe('formatAge', () => {
  it('selalu menampilkan tahun dan bulan', () => {
    expect(formatAge(27)).toBe('2 tahun 3 bulan');
    expect(formatAge(12)).toBe('1 tahun 0 bulan');
    expect(formatAge(83)).toBe('6 tahun 11 bulan');
    expect(formatAge(5)).toBe('0 tahun 5 bulan');
    expect(formatAge(60)).toBe('5 tahun 0 bulan');
  });
});

describe('ageInMonths', () => {
  it('menghitung dari bulan dan tahun', () => {
    expect(ageInMonths(6, 2024, NOW)).toBe(24);
    expect(ageInMonths(3, 2024, NOW)).toBe(27);
    expect(ageInMonths(7, 2025, NOW)).toBe(11);
  });

  it('benar saat pergantian tahun (Januari)', () => {
    const jan = new Date(2027, 0, 3);
    expect(ageInMonths(12, 2025, jan)).toBe(13);
    expect(ageInMonths(1, 2026, jan)).toBe(12);
    expect(ageInMonths(2, 2026, jan)).toBe(11);
  });
});

describe('yearOptions', () => {
  it('tahun sekarang sampai 10 tahun ke belakang', () => {
    const ys = yearOptions(NOW);
    expect(ys[0]).toBe(2026);
    expect(ys[ys.length - 1]).toBe(2016);
    expect(ys).toHaveLength(11);
  });
});

describe('validateBirth', () => {
  it('kosong', () => {
    expect(validateBirth('', '', NOW).code).toBe('empty');
    expect(validateBirth('3', '', NOW).code).toBe('empty');
    expect(validateBirth(undefined, 2024, NOW).code).toBe('empty');
    expect(validateBirth(null, null, NOW).code).toBe('empty');
  });

  it('tidak valid', () => {
    expect(validateBirth('13', '2024', NOW).code).toBe('invalid');
    expect(validateBirth('0', '2024', NOW).code).toBe('invalid');
    expect(validateBirth('abc', '2024', NOW).code).toBe('invalid');
    expect(validateBirth(2.5, 2024, NOW).code).toBe('invalid');
    expect(validateBirth('3', '20x4', NOW).code).toBe('invalid');
    expect(validateBirth(3, 1990, NOW).code).toBe('invalid');
  });

  it('masa depan', () => {
    const r = validateBirth(7, 2026, NOW);
    expect(r.code).toBe('future');
    expect(r.message).toContain('Juli 2026');
    expect(validateBirth(1, 2027, NOW).code).toBe('future');
    expect(validateBirth('6', '2026', NOW).code).toBe('tooYoung');
  });

  it('terlalu muda: menyebut usia, rentang, dan saran tenaga kesehatan', () => {
    const r = validateBirth(7, 2025, NOW);
    expect(r.ok).toBe(false);
    expect(r.code).toBe('tooYoung');
    expect(r.months).toBe(11);
    expect(r.message).toContain('0 tahun 11 bulan');
    expect(r.message).toContain('1 tahun 0 bulan sampai 6 tahun 11 bulan');
    expect(r.message).toMatch(/dokter anak/);
    expect(r.message).toMatch(/bidan/);
    expect(r.message).toMatch(/posyandu/);
  });

  it('terlalu tua: menyebut usia dan rentang', () => {
    const r = validateBirth(5, 2019, NOW);
    expect(r.code).toBe('tooOld');
    expect(r.months).toBe(85);
    expect(r.message).toContain('7 tahun 1 bulan');
    expect(r.message).toContain('1 tahun 0 bulan sampai 6 tahun 11 bulan');
  });

  it('batas bawah dan atas diterima', () => {
    expect(validateBirth(6, 2025, NOW)).toEqual({ ok: true, months: MIN_MONTHS });
    expect(validateBirth(7, 2019, NOW)).toEqual({ ok: true, months: MAX_MONTHS });
    expect(validateBirth(6, 2019, NOW).code).toBe('tooOld');
  });

  it('menerima angka dan string', () => {
    expect(validateBirth(3, 2024, NOW)).toEqual({ ok: true, months: 27 });
    expect(validateBirth('3', '2024', NOW)).toEqual({ ok: true, months: 27 });
    expect(validateBirth(' 3 ', ' 2024 ', NOW)).toEqual({ ok: true, months: 27 });
  });

  it('pergantian tahun pada Januari', () => {
    const jan = new Date(2027, 0, 10);
    expect(validateBirth(1, 2026, jan)).toEqual({ ok: true, months: 12 });
    expect(validateBirth(2, 2026, jan).code).toBe('tooYoung');
    expect(validateBirth(2, 2027, jan).code).toBe('future');
    expect(validateBirth(1, 2027, jan).code).toBe('tooYoung');
  });
});

describe('ageBand', () => {
  const cases = [
    [12, 12], [14, 12], [15, 15], [17, 15], [18, 18], [23, 18], [24, 24], [29, 24],
    [30, 30], [35, 30], [36, 36], [47, 36], [48, 48], [59, 48], [60, 60], [83, 60],
  ];
  it.each(cases)('usia %i bulan -> titik %i', (months, start) => {
    expect(ageBand(months).start).toBe(start);
  });
});
