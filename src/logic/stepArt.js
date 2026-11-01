// Memilih ilustrasi untuk setiap langkah kegiatan berdasarkan kata kunci.
// Urutan aturan penting: yang lebih spesifik ditulis lebih dulu.

export const STEP_RULES = [
  ['terowongan', /terowongan/],
  ['rumah', /keliling rumah|benda di rumah|tur benda|benda yang sama/],
  ['gerbang', /gerbang|berbaris|barisan/],
  ['engklek', /kotak berurutan|kotak ganda|kotak tertentu|satu kaki di/],
  ['gunting', /gunting/],
  ['tali', /\btali\b|sedotan|meronce/],
  ['tulis', /pensil|\btulis|huruf|titik-titik|nama si kecil/],
  ['adonan', /adonan|meremas|menggulung/],
  ['jepitan', /jepitan/],
  ['cat', /spons|\bcat\b|mengecap/],
  ['pisang', /pisang|mengupas/],
  ['dokter', /dokter|sakit/],
  ['warung', /penjual|pembeli|dagangan|kemasan|transaksi/],
  ['dapur', /"dapur"|memasak|masakan/],
  ['telepon', /telepon|menelepon/],
  ['foto', /\bfoto\b/],
  ['cermin', /cermin/],
  ['wajah', /wajah|ekspresi|perasaan|sedih|marah/],
  ['tanaman', /tanaman|\bdaun\b/],
  ['air', /\bair\b|teko|baskom|tenggelam|terapung|siram|menuang|tumpahan/],
  ['pakaian', /\bbaju\b|kemeja|kancing|resleting|kaus kaki|berpakaian|memakaikan/],
  ['dadu', /dadu|jalur berkelok/],
  ['kartu', /kartu|teka-teki|potongan gambar|pasangannya|pasangan benda|setiap pasangan|pasangan sederhana/],
  ['pola', /\bpola\b|warna|menyortir|\bmerah\b/],
  ['hitung', /hitung|\bangka\b|\bjari\b/],
  ['matahari', /matahari|bayangan|langit|cuaca|kapur/],
  ['bunyi', /bunyi|bisik|ketuk|dengar/],
  ['mangkuk', /mangkuk|sendok|menyendok|menyuapi/],
  ['bola', /\bbola\b/],
  ['botol', /botol|\btutup\b/],
  ['gelas', /gelas|menara|menumpuk|tumpuk/],
  ['boneka', /boneka/],
  ['bantal', /bantal|kasur|berguling|guling|alas empuk/],
  ['undakan', /undakan|papan/],
  ['garis', /selotip|\bgaris\b|berjalan di atas/],
  ['lompat', /lompat|melompat|katak/],
  ['lari', /berlari|\blari\b|penanda|kejar/],
  ['menari', /menari|bergoyang|goyang|patung/],
  ['lagu', /lagu|nyanyi|bersenandung/],
  ['tepuk', /tepuk|\btos\b/],
  ['tarik', /handuk|\btarik/],
  ['kain', /\bkain\b|ciluk|selimut|sembunyi/],
  ['buku', /\bbuku\b|halaman|majalah/],
  ['peluk', /peluk|pijat|gendong|pangku|cium|salam|dadah|sambut/],
  ['tidur', /tidur|napas|berbaring|menidurkan/],
  ['krayon', /^gambar |menggambar|krayon|coretan|jiplak|\bhias/],
  ['kertas', /kertas|robek|sobekan|lipat|kipas|\blem\b|tempel/],
  ['keranjang', /keranjang|merapikan|membereskan|rumahnya/],
  ['kardus', /kardus|\bkotak\b|wadah/],
  ['hewan', /hewan|kucing|cicak|kancil|burung|bebek|kelinci|ayam/],
  ['raba', /meraba|tanpa melihat|diam-diam/],
  ['jalan', /berjalan|melangkah|\blangkah\b|nampan|keliling|ukur/],
  ['bicara', /tanya|sebut|cerita|\bkata\b|petunjuk|perintah|dongeng|jelaskan|bicarakan|ucapkan|katakan/],
];

/** Konsep yang terlalu umum: bila langkah hanya cocok dengan ini, coba pakai konsep dari judul kegiatan. */
export const WEAK = new Set(['bicara', 'jalan']);
export const FALLBACK = 'bersama';

/** Semua konsep yang cocok dengan teks, urut dari yang paling spesifik. */
export function matchAll(text) {
  const t = text.toLowerCase();
  return STEP_RULES.filter(([, re]) => re.test(t)).map(([c]) => c);
}

export function matchConcept(text) {
  const t = text.toLowerCase();
  for (const [concept, re] of STEP_RULES) {
    if (re.test(t)) return concept;
  }
  return null;
}

/** Konsep ilustrasi untuk satu langkah, dengan cadangan dari judul lalu ilustrasi "main bersama". */
export function stepConcept(step, activity) {
  const own = matchConcept(step);
  if (own && !WEAK.has(own)) return own;
  const fromTitle = matchConcept(activity.judul);
  if (fromTitle && !WEAK.has(fromTitle)) return fromTitle;
  if (own) return own;
  const fromBahan = matchConcept(activity.bahan.join(' '));
  return fromBahan && !WEAK.has(fromBahan) ? fromBahan : FALLBACK;
}

/**
 * Konsep untuk semua langkah satu kegiatan. Bila dua langkah berurutan mendapat gambar yang sama,
 * langkah berikutnya memakai konsep lain yang juga cocok dengan teksnya (bila ada).
 */
export function stepConcepts(activity) {
  const result = [];
  activity.langkah.forEach((step, i) => {
    const base = stepConcept(step, activity);
    const prev = result[i - 1];
    if (base !== prev) {
      result.push(base);
      return;
    }
    const alt = matchAll(step).find((c) => c !== prev && !WEAK.has(c)) ||
      matchAll(step).find((c) => c !== prev);
    result.push(alt || base);
  });
  return result;
}
