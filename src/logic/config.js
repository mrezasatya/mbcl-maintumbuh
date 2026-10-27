// Konfigurasi pusat Main Tumbuh. Ubah rentang usia, band, domain,
// dan bobot pengulangan hanya di berkas ini.

/** Usia minimum yang didukung (bulan): 1 tahun 0 bulan. */
export const MIN_MONTHS = 12;
/** Usia maksimum yang didukung (bulan): 6 tahun 11 bulan. */
export const MAX_MONTHS = 83;

/** Jumlah tahun ke belakang pada pilihan tahun lahir. */
export const YEAR_RANGE = 10;

export const PLAN_DAYS = 7;

/** Batas minimal kegiatan aman agar sebuah domain boleh muncul dua kali. */
export const MIN_ACTIVITIES_TO_REPEAT = 4;

export const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

/**
 * Titik checklist perkembangan CDC dalam rentang aplikasi.
 * Anak dipetakan ke titik terakhir yang sudah dilewati.
 * Titik 5 tahun juga dipakai untuk 5 tahun sampai 6 tahun 11 bulan.
 */
export const AGE_BANDS = [
  { start: 12, label: '12 bulan' },
  { start: 15, label: '15 bulan' },
  { start: 18, label: '18 bulan' },
  { start: 24, label: '24 bulan (2 tahun)' },
  { start: 30, label: '30 bulan' },
  { start: 36, label: '3 tahun' },
  { start: 48, label: '4 tahun' },
  { start: 60, label: '5 tahun' },
];

export const DOMAINS = {
  kasar: { id: 'kasar', nama: 'Motorik Kasar', emoji: '🦘', hewan: 'kanguru', warna: '#ff7a59', lembut: '#ffe3d9' },
  halus: { id: 'halus', nama: 'Motorik Halus', emoji: '🐝', hewan: 'lebah', warna: '#f5b700', lembut: '#fff3c4' },
  bahasa: { id: 'bahasa', nama: 'Bahasa', emoji: '🦜', hewan: 'burung beo', warna: '#2f9be0', lembut: '#dcefff' },
  kognitif: { id: 'kognitif', nama: 'Kognitif', emoji: '🦉', hewan: 'burung hantu', warna: '#8a63d2', lembut: '#ece4ff' },
  sosem: { id: 'sosem', nama: 'Sosial-Emosional', emoji: '🐘', hewan: 'gajah', warna: '#e45c96', lembut: '#ffe1ee' },
};

export const DOMAIN_IDS = Object.keys(DOMAINS);

/**
 * Bobot pemilihan dua domain tambahan (domain yang muncul dua kali),
 * per kelompok usia. Makin besar bobot, makin sering domain itu diulang.
 */
export const REPEAT_WEIGHTS = [
  { from: 12, to: 17, weights: { kasar: 5, bahasa: 4, halus: 2, sosem: 2, kognitif: 1 } },
  { from: 18, to: 29, weights: { bahasa: 5, kasar: 4, sosem: 4, halus: 2, kognitif: 2 } },
  { from: 30, to: 47, weights: { bahasa: 4, sosem: 4, kognitif: 4, kasar: 2, halus: 2 } },
  { from: 48, to: 83, weights: { kognitif: 4, bahasa: 4, halus: 4, sosem: 4, kasar: 2 } },
];
