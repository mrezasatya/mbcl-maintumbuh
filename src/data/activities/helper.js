/**
 * Membuat satu kegiatan. Domain diambil dari awalan id (mis. 'kasar-01' -> 'kasar').
 * @param {string} id
 * @param {string} judul
 * @param {string} tujuan
 * @param {string[]} bahan
 * @param {string[]} langkah 3 sampai 4 langkah singkat
 * @param {number} durasi menit (5-20)
 * @param {number} min usia minimum (bulan)
 * @param {number} max usia maksimum (bulan)
 * @param {string[]} risiko tag keselamatan (lihat src/logic/safety.js)
 * @param {string} keselamatan catatan keselamatan khusus kegiatan
 */
export function A(id, judul, tujuan, bahan, langkah, durasi, min, max, risiko, keselamatan) {
  return {
    id,
    domain: id.split('-')[0],
    judul,
    tujuan,
    bahan,
    langkah,
    durasi,
    min,
    max,
    risiko: risiko || [],
    keselamatan,
  };
}
