// Aturan keselamatan Main Tumbuh (lebih ketat dari standar umum).
// Kegiatan hanya boleh tampil bila usia konservatif (usia - 1 bulan)
// sudah mencapai ambang setiap tag risikonya.

export const NEVER = Infinity;

export const SAFETY_TAGS = {
  smallParts: {
    minMonths: 48,
    label: 'Benda kecil',
    contoh: 'benda yang muat masuk gulungan tisu (sekitar 3 cm), mis. kancing, tutup botol kecil, manik-manik',
    risiko: 'Benda kecil mudah masuk ke mulut, hidung, atau telinga.',
    potensi: 'Tersedak, sumbatan saluran napas yang bisa berakibat fatal, atau benda tertelan dan tersangkut.',
    aturan: 'Hanya untuk usia 4 tahun ke atas. Hitung jumlah benda sebelum dan sesudah main, simpan kembali di wadah tertutup, dan tetap dampingi.',
  },
  foodChoking: {
    minMonths: 48,
    label: 'Makanan berisiko tersedak',
    contoh: 'anggur utuh, kacang, wortel mentah, permen keras, sosis bulat',
    risiko: 'Makanan bulat, keras, atau licin dapat menutup saluran napas anak.',
    potensi: 'Tersedak berat yang membutuhkan pertolongan segera.',
    aturan: 'Hanya untuk usia 4 tahun ke atas. Potong kecil memanjang atau lunakkan, anak makan sambil duduk, dan jangan sambil berlari atau tertawa terbahak.',
  },
  sharp: {
    minMonths: 48,
    label: 'Benda tajam atau runcing',
    contoh: 'gunting, pisau, ujung pensil',
    risiko: 'Ujung atau sisi tajam dapat melukai tangan, wajah, atau mata.',
    potensi: 'Luka gores, luka tusuk, atau cedera mata.',
    aturan: 'Hanya untuk usia 4 tahun ke atas, pakai gunting anak berujung tumpul, duduk di meja, dan dewasa memegang alat saat tidak dipakai.',
  },
  cord: {
    minMonths: 36,
    label: 'Tali, pita, atau kabel panjang',
    contoh: 'tali, pita, benang, atau kabel lebih dari 30 cm',
    risiko: 'Tali panjang dapat melilit leher atau jari.',
    potensi: 'Tercekik atau aliran darah jari terhambat.',
    aturan: 'Hanya untuk usia 3 tahun ke atas. Jangan dikalungkan, jangan ditinggal, dan simpan segera setelah selesai.',
  },
  water: {
    minMonths: 24,
    label: 'Wadah berisi air',
    contoh: 'baskom, ember, atau nampan berair',
    risiko: 'Anak kecil bisa tenggelam bahkan di air yang dangkal, dan lantai basah licin.',
    potensi: 'Tenggelam dalam hitungan detik, atau terpeleset dan terbentur.',
    aturan: 'Hanya untuk usia 2 tahun ke atas. Air maksimal 5 cm, dewasa selalu dalam jangkauan tangan, dan buang air segera setelah selesai.',
  },
  height: {
    minMonths: 24,
    label: 'Ketinggian (undakan atau papan)',
    contoh: 'undakan, papan titian, bangku rendah',
    risiko: 'Anak bisa kehilangan keseimbangan dan jatuh.',
    potensi: 'Terbentur, keseleo, atau patah tulang.',
    aturan: 'Hanya untuk usia 2 tahun ke atas. Tinggi maksimal 30 cm, alas empuk di bawahnya, dan dewasa berdiri di samping anak.',
  },
  balloon: {
    minMonths: NEVER,
    label: 'Balon',
    contoh: 'balon karet, termasuk pecahannya',
    risiko: 'Balon atau pecahannya dapat terhirup dan menutup saluran napas sepenuhnya.',
    potensi: 'Tersedak yang sangat sulit ditolong dan bisa berakibat fatal.',
    aturan: 'Tidak pernah dipakai di aplikasi ini untuk usia berapa pun.',
  },
  heat: {
    minMonths: NEVER,
    label: 'Panas dan api',
    contoh: 'kompor, api, lilin, minyak atau air panas',
    risiko: 'Sumber panas dapat membakar kulit dan memicu kebakaran.',
    potensi: 'Luka bakar serius dan kebakaran.',
    aturan: 'Tidak pernah dipakai di aplikasi ini.',
  },
  magnetBattery: {
    minMonths: NEVER,
    label: 'Baterai kancing dan magnet kecil',
    contoh: 'baterai jam, baterai remote kecil, magnet hiasan kulkas kecil',
    risiko: 'Jika tertelan, baterai kancing dapat membakar jaringan dan magnet dapat saling menarik di dalam usus.',
    potensi: 'Luka bakar kimia di kerongkongan atau usus berlubang; keadaan darurat.',
    aturan: 'Tidak pernah dipakai di aplikasi ini.',
  },
  plasticBag: {
    minMonths: NEVER,
    label: 'Kantong plastik',
    contoh: 'kantong belanja plastik, plastik kemasan tipis',
    risiko: 'Plastik tipis dapat menutup hidung dan mulut.',
    potensi: 'Mati lemas.',
    aturan: 'Tidak pernah dipakai di aplikasi ini.',
  },
};

export const KNOWN_TAGS = Object.keys(SAFETY_TAGS);

/** Usia konservatif: usia dikurangi 1 bulan karena hanya bulan dan tahun lahir yang diketahui. */
export function conservativeAge(months) {
  return months - 1;
}

/** Apakah satu tag aman untuk usia (bulan) tersebut. Tag tak dikenal dianggap tidak aman. */
export function isTagAllowed(tag, months) {
  const rule = SAFETY_TAGS[tag];
  if (!rule) return false;
  return conservativeAge(months) >= rule.minMonths;
}

/** Apakah sebuah kegiatan aman untuk usia (bulan) tersebut. */
export function isActivitySafe(activity, months) {
  return (activity.risiko || []).every((tag) => isTagAllowed(tag, months));
}

/** Daftar tag yang sedang disaring (disembunyikan) untuk usia tersebut. */
export function activeFilters(months) {
  return KNOWN_TAGS.filter((tag) => !isTagAllowed(tag, months)).map((tag) => ({ tag, ...SAFETY_TAGS[tag] }));
}

/** Pengawasan umum menurut usia. */
export function generalSupervision(months) {
  if (months < 24) {
    return 'Dampingi anak sepanjang kegiatan, dalam jangkauan tangan. Anak usia ini masih sering memasukkan benda ke mulut.';
  }
  if (months < 48) {
    return 'Dampingi anak dari dekat sepanjang kegiatan dan rapikan bahan segera setelah selesai.';
  }
  return 'Tetap dampingi anak. Ajak anak ikut merapikan bahan dan ingatkan aturan main sebelum mulai.';
}

/** Teks ambang yang mudah dibaca. */
export function thresholdText(minMonths) {
  if (minMonths === NEVER) return 'Tidak pernah muncul';
  return `Muncul mulai usia ${minMonths / 12} tahun`;
}
