# Main Tumbuh

Penyusun rencana belajar-bermain 7 hari untuk orang tua dan anak usia **1 sampai 6 tahun**
(12 sampai 83 bulan). Gratis, tanpa login, tidak menyimpan data, dan memakai bahan dari rumah.

Main Tumbuh adalah **panduan stimulasi berbasis titik checklist perkembangan CDC**, bukan kurikulum,
bukan alat diagnosis, dan bukan klaim setara sekolah tertentu.

## Fitur

1. Form bulan dan tahun lahir (`<select>`, tanpa login).
2. Validasi: kosong, tidak valid, masa depan, terlalu muda (< 12 bulan, disertai saran ke dokter anak/bidan/posyandu), terlalu tua (> 83 bulan).
3. Usia dalam bulan, ditampilkan "x tahun y bulan", dipetakan ke titik CDC terakhir yang sudah dilewati: 12, 15, 18, 24, 30 bulan, 3, 4, 5 tahun (titik 5 tahun dipakai sampai 6 tahun 11 bulan).
4. Rencana 7 hari: satu domain per hari, tidak ada domain sama berurutan, kelima domain muncul, dua domain tambahan dipilih berbobot menurut usia.
5. Kartu kegiatan: judul, tujuan, bahan, langkah, durasi, catatan keselamatan, plus satu kegiatan cadangan per hari.
6. Penyaring keselamatan yang lebih ketat dari standar umum (tabel di bawah).
7. Disclaimer di bawah halaman.

Sengaja tidak ada tombol cetak/PDF.

## Aturan keselamatan

Kegiatan hanya tampil bila **usia konservatif (usia - 1 bulan)** sudah mencapai ambang setiap tag risikonya.
Pengurangan 1 bulan karena hari lahir tidak diketahui.

| Tag | Contoh | Muncul mulai |
|---|---|---|
| `smallParts` | benda yang muat di gulungan tisu (sekitar 3 cm) | 48 bulan (praktis: anak 49 bulan) |
| `foodChoking` | anggur utuh, kacang, wortel mentah, permen keras, sosis bulat | 48 bulan |
| `sharp` | gunting (anak, berujung tumpul), pisau, pensil | 48 bulan |
| `cord` | tali, pita, kabel > 30 cm | 36 bulan |
| `water` | wadah berair (maks 5 cm, dewasa dalam jangkauan tangan) | 24 bulan |
| `height` | undakan, papan (maks 30 cm, alas empuk) | 24 bulan |
| `balloon` | balon | tidak pernah |
| `heat` | kompor, api, minyak/air panas | tidak pernah |
| `magnetBattery` | baterai kancing, magnet kecil | tidak pernah |
| `plasticBag` | kantong plastik | tidak pernah |

Teks risiko, potensi dampak, dan aturan tiap tag ada di `src/logic/safety.js`.

## Menjalankan

Butuh Node.js 20 atau lebih baru.

```bash
npm install
npm run dev       # server pengembangan
npm test          # tes vitest (logika, keselamatan, perakit rencana, audit pustaka)
npm run build     # build produksi ke dist/
npm run preview   # pratinjau hasil build di http://localhost:4173
```

### Uji browser (opsional)

`e2e/browser-check.cjs` memeriksa alur galat, alur sukses, tab dengan keyboard, "Susun ulang",
tidak ada overflow di 360/390/1280 px, tidak ada error console, serta menyimpan tangkapan layar ke
`e2e/screenshots/`. Membutuhkan Playwright (tidak dimasukkan ke dependensi agar instalasi tetap ringan):

```bash
npm i -D playwright && npx playwright install chromium
npm run build && npm run preview   # di terminal lain
npm run test:e2e
```

## Struktur

```
src/
  logic/        config.js age.js safety.js planner.js rng.js (+ *.test.js)  -- logika murni tanpa React
  data/activities/  helper.js kasar.js halus.js bahasa.js kognitif.js sosem.js index.js (+ library.test.js)
  components/   Logo BirthForm PlanView ActivityCard SafetyPanel Disclaimer
  App.jsx App.css index.css main.jsx
e2e/browser-check.cjs
docs/referensi/  bahan referensi internal (tidak di-deploy)
vercel.json  netlify.toml
```

Konstanta penting (rentang usia `MIN_MONTHS`/`MAX_MONTHS`, titik CDC, domain, `REPEAT_WEIGHTS`) ada di
`src/logic/config.js`.

## Menambah kegiatan

1. Buka berkas domain di `src/data/activities/` (mis. `bahasa.js`).
2. Tambahkan entri dengan helper `A`:

   ```js
   A('bahasa-27', 'Judul', 'Tujuan singkat.',
     ['Bahan 1', 'Bahan 2'],
     ['Langkah 1.', 'Langkah 2.', 'Langkah 3.'],   // 3 sampai 4 langkah
     10,            // durasi menit, 5 sampai 20
     24, 60,        // usia min dan maks (bulan), dalam 12..83
     ['water'],     // tag risiko; [] bila tidak ada
     'Catatan keselamatan khusus kegiatan.'),
   ```

   Domain diambil dari awalan id, dan id harus unik.
3. Jalankan `npm test`. Audit pustaka akan gagal bila: field kurang, tag tidak dikenal, ada kata
   berisiko (mis. `air`, `tali`, `gunting`, `tangga`, `kancing`, `kacang`) tanpa tag yang sesuai, ada kata
   terlarang (balon, kompor, api, lilin, magnet, baterai, kantong plastik), benda kecil untuk < 48 bulan,
   atau ada usia/domain dengan kurang dari 5 kegiatan aman. Pengecualian kata kunci harus ditulis eksplisit
   di `EXCEPTIONS` pada `library.test.js` beserta alasannya.
4. Tulis dengan kata sendiri, bahan murah dari rumah, tanpa lirik lagu (cukup judul), tanpa menyebut sumber.

## Deploy

### GitHub + Vercel (disarankan)

1. Push repositori ke GitHub.
2. Masuk ke [vercel.com](https://vercel.com), pilih **Add New > Project**, lalu impor repositori ini.
3. Vercel membaca `vercel.json` (framework Vite, `npm run build`, output `dist`). Tidak perlu variabel lingkungan.
4. Klik **Deploy**. Setiap push ke branch utama akan otomatis di-deploy ulang; branch lain mendapat URL pratinjau.

Alternatif lewat CLI: `npm i -g vercel && vercel` lalu `vercel --prod`.

### Netlify

1. Masuk ke [app.netlify.com](https://app.netlify.com), pilih **Add new site > Import an existing project**, lalu hubungkan GitHub.
2. Netlify membaca `netlify.toml` (build `npm run build`, publish `dist`, Node 22).
3. Klik **Deploy site**.

Alternatif lewat CLI: `npm i -g netlify-cli && netlify deploy --build` lalu `netlify deploy --build --prod`.

Aplikasi ini satu halaman tanpa routing, jadi tidak perlu aturan rewrite.

## Asumsi dan keputusan yang diambil

- **"Sudah melewati ambang"** diartikan `usia konservatif >= ambang`. Contoh: benda kecil (ambang 48) baru
  muncul untuk anak yang dihitung 49 bulan.
- **Tahun di luar daftar:** tahun di masa depan diberi pesan "masa depan" (lebih jelas daripada "tidak valid");
  tahun lebih tua dari 10 tahun ke belakang diberi pesan "tidak valid".
- **Domain ulang:** hanya domain dengan minimal 4 kegiatan aman yang boleh muncul dua kali (2 hari x utama + cadangan).
- **Pemilihan kegiatan:** bobot `1 / (1 + |titik tengah rentang - usia| / 6)`, sehingga kegiatan yang paling pas usia lebih sering muncul.
- **Adonan tepung** (halus-09) dibuat dewasa tanpa dimasak dan **tanpa garam**, karena garam dalam adonan main berisiko bila tertelan banyak.
- **Kegiatan dengan air** dibatasi pada wadah dangkal dan diberi tag `water`; menyiram tanaman juga diberi tag.
- **Audit kata kunci** memeriksa judul, tujuan, bahan, dan langkah. Catatan keselamatan dikecualikan karena wajar menyebut bahaya ("jauhkan dari pisau"), tetapi tetap ikut audit kata terlarang.
- **Ganti usia** menutup rencana dan memfokuskan kembali form.
- **Lampiran referensi** belum ada di repositori saat proyek dibangun; pustaka disusun sendiri (lihat `docs/referensi/README.md`).
- Tidak ada localStorage, cookie, analitik, atau permintaan jaringan selain memuat aset aplikasi; font di-bundle lewat `@fontsource`.
