// Pembangkit acak yang bisa disuntik. Produksi memakai Math.random,
// tes memakai seed agar hasil dapat diulang.

/** PRNG mulberry32 dengan seed bilangan bulat. Mengembalikan fungsi () => [0, 1). */
export function seededRng(seed) {
  let a = seed >>> 0;
  return function rng() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const defaultRng = Math.random;

/** Mengacak salinan larik (Fisher-Yates). */
export function shuffle(items, rng = defaultRng) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Memilih satu indeks berdasarkan bobot (semua bobot > 0). */
export function weightedIndex(weights, rng = defaultRng) {
  const total = weights.reduce((s, w) => s + w, 0);
  let r = rng() * total;
  for (let i = 0; i < weights.length; i += 1) {
    r -= weights[i];
    if (r < 0) return i;
  }
  return weights.length - 1;
}
