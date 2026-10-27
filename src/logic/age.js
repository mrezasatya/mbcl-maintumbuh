import { AGE_BANDS, MAX_MONTHS, MIN_MONTHS, MONTH_NAMES, YEAR_RANGE } from './config.js';

/** Format usia selalu "x tahun y bulan", mis. "2 tahun 3 bulan" atau "1 tahun 0 bulan". */
export function formatAge(months) {
  const tahun = Math.floor(months / 12);
  const bulan = months % 12;
  return `${tahun} tahun ${bulan} bulan`;
}

/** Usia dalam bulan dari bulan (1-12) dan tahun lahir, relatif terhadap `now`. */
export function ageInMonths(birthMonth, birthYear, now = new Date()) {
  return (now.getFullYear() - birthYear) * 12 + (now.getMonth() + 1 - birthMonth);
}

/** Daftar tahun untuk pilihan form: tahun sekarang sampai YEAR_RANGE tahun ke belakang. */
export function yearOptions(now = new Date()) {
  const y = now.getFullYear();
  return Array.from({ length: YEAR_RANGE + 1 }, (_, i) => y - i);
}

function toInt(value) {
  if (typeof value === 'number') return Number.isInteger(value) ? value : NaN;
  if (typeof value === 'string' && /^\s*\d+\s*$/.test(value)) return Number(value.trim());
  return NaN;
}

const SUPPORTED = `${formatAge(MIN_MONTHS)} sampai ${formatAge(MAX_MONTHS)}`;

/**
 * Validasi bulan dan tahun lahir.
 * Mengembalikan { ok: true, months } atau { ok: false, code, message }.
 * code: 'empty' | 'invalid' | 'future' | 'tooYoung' | 'tooOld'
 */
export function validateBirth(birthMonth, birthYear, now = new Date()) {
  const empty = (v) => v === undefined || v === null || (typeof v === 'string' && v.trim() === '');
  if (empty(birthMonth) || empty(birthYear)) {
    return { ok: false, code: 'empty', message: 'Silakan pilih bulan dan tahun lahir anak terlebih dahulu.' };
  }

  const m = toInt(birthMonth);
  const y = toInt(birthYear);
  const invalid = {
    ok: false,
    code: 'invalid',
    message: 'Bulan atau tahun lahir tidak valid. Silakan pilih dari daftar yang tersedia.',
  };
  if (Number.isNaN(m) || Number.isNaN(y) || m < 1 || m > 12) return invalid;

  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  if (y > nowYear || (y === nowYear && m > nowMonth)) {
    return {
      ok: false,
      code: 'future',
      message: `${MONTH_NAMES[m - 1]} ${y} masih di masa depan. Periksa kembali bulan dan tahun lahir anak.`,
    };
  }

  const years = yearOptions(now);
  if (y < years[years.length - 1]) return invalid;

  const months = ageInMonths(m, y, now);
  if (months < MIN_MONTHS) {
    return {
      ok: false,
      code: 'tooYoung',
      months,
      message:
        `Usia anak sekitar ${formatAge(months)}. Main Tumbuh saat ini mendukung usia ${SUPPORTED}. ` +
        'Untuk stimulasi bayi di bawah 1 tahun, silakan berkonsultasi dengan dokter anak, bidan, atau posyandu terdekat.',
    };
  }
  if (months > MAX_MONTHS) {
    return {
      ok: false,
      code: 'tooOld',
      months,
      message: `Usia anak sekitar ${formatAge(months)}. Main Tumbuh saat ini mendukung usia ${SUPPORTED}.`,
    };
  }
  return { ok: true, months };
}

/** Titik acuan CDC: titik terakhir yang sudah dilewati. */
export function ageBand(months) {
  let band = AGE_BANDS[0];
  for (const b of AGE_BANDS) {
    if (months >= b.start) band = b;
  }
  return band;
}
