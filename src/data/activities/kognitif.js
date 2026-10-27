import { A } from './helper.js';

// Kognitif: memecahkan masalah, mengingat, memilah, berhitung, dan sebab-akibat.
export const kognitif = [
  A('kognitif-01', 'Mainan Hilang, Mainan Ada', 'Melatih pemahaman bahwa benda tetap ada walau tidak terlihat.',
    ['Mainan kesukaan', 'Kain seukuran sapu tangan'],
    ['Tunjukkan mainan, lalu tutup dengan kain di depan anak.', 'Tanya, "Mana mainannya?" dan tunggu anak mencarinya.', 'Rayakan saat ditemukan, lalu ulangi dengan menyembunyikan sebagian saja.'],
    5, 12, 24, [], 'Kain hanya untuk menutup mainan, tidak dipakai menutup wajah anak.'),

  A('kognitif-02', 'Di Bawah Gelas Mana?', 'Melatih perhatian dan ingatan jangka pendek.',
    ['2 sampai 3 gelas plastik buram', 'Mainan yang muat di bawah gelas tetapi tidak muat di mulut anak'],
    ['Letakkan mainan di bawah satu gelas sambil anak melihat.', 'Tanya, "Di mana mainannya?"', 'Bila sudah mudah, geser posisi gelas pelan-pelan sebelum anak menebak.'],
    5, 12, 30, [], 'Pilih mainan yang lebih besar dari gulungan tisu agar aman bila digenggam dan didekatkan ke mulut.'),

  A('kognitif-03', 'Sortir Warna', 'Melatih mengenali dan mengelompokkan warna.',
    ['Kaus kaki atau kain berwarna merah, kuning, biru', 'Tiga keranjang atau kardus'],
    ['Tempel kertas berwarna di setiap keranjang.', 'Contohkan memasukkan kaus kaki merah ke keranjang merah.', 'Ajak anak menyortir sisanya sambil menyebut warnanya.'],
    10, 24, 48, [], 'Kegiatan aman; gunakan benda besar dan lunak.'),

  A('kognitif-04', 'Puzzle Kardus', 'Melatih mencocokkan bagian dan memecahkan masalah sederhana.',
    ['Gambar besar dari kotak makanan atau kalender bekas, yang sudah dipotong dewasa menjadi 2 sampai 4 bagian'],
    ['Siapkan potongan gambar sebelum anak bergabung.', 'Contohkan menyatukan potongan menjadi gambar utuh.', 'Biarkan anak mencoba, tambah jumlah potongan bila sudah mudah.'],
    10, 24, 48, [], 'Potong gambar saat anak tidak ada di dekat Anda dan simpan alat potong di luar jangkauan; potongan dibuat besar.'),

  A('kognitif-05', 'Cari Pasangan Kaus Kaki', 'Melatih mencocokkan pola, warna, dan ukuran.',
    ['Beberapa pasang kaus kaki bersih'],
    ['Campur semua kaus kaki di lantai.', 'Ambil satu dan tanya, "Mana pasangannya?"', 'Ajak anak memasangkan semuanya dan melipatnya bersama.'],
    10, 30, 60, [], 'Kegiatan aman.'),

  A('kognitif-06', 'Besar dan Kecil', 'Melatih membandingkan ukuran dan mengenal kata besar-kecil.',
    ['Pasangan benda besar dan kecil: mangkuk, sendok, sandal, bantal'],
    ['Tunjukkan dua mangkuk dan sebut, "Ini besar, ini kecil."', 'Ajak anak mengelompokkan benda besar dan benda kecil.', 'Tanya, "Mana yang besar?" untuk pasangan lain.'],
    10, 18, 36, [], 'Pastikan benda "kecil" tetap lebih besar dari mulut anak.'),

  A('kognitif-07', 'Mangkuk Bersarang', 'Melatih memahami urutan ukuran lewat mencoba-coba.',
    ['3 sampai 4 mangkuk plastik atau wadah berbagai ukuran'],
    ['Tunjukkan cara memasukkan mangkuk kecil ke mangkuk besar.', 'Keluarkan semua dan biarkan anak mencoba sendiri.', 'Balik semua mangkuk dan tumpuk menjadi menara.'],
    10, 12, 30, [], 'Gunakan wadah plastik yang tidak mudah pecah.'),

  A('kognitif-08', 'Ikuti Pola Tepukan', 'Melatih mengingat dan meneruskan pola.',
    ['Tidak perlu bahan'],
    ['Buat pola sederhana: tepuk, tepuk, hentak kaki.', 'Ajak anak mengulangi pola tersebut.', 'Tambah satu gerakan bila anak sudah lancar, lalu bergantian membuat pola.'],
    5, 36, 72, [], 'Kegiatan aman.'),

  A('kognitif-09', 'Hitung Sambil Melangkah', 'Melatih berhitung dengan urutan yang benar sambil bergerak.',
    ['Tidak perlu bahan'],
    ['Pilih tujuan dekat, misalnya dari kamar ke dapur.', 'Hitung setiap langkah keras-keras bersama.', 'Tebak dulu berapa langkah ke tujuan lain, lalu buktikan.'],
    5, 36, 72, [], 'Berjalan di lantai rata; jauhi area dapur saat sedang memasak.'),

  A('kognitif-10', 'Sortir Bentuk', 'Mengenal bentuk dasar dan mengelompokkannya.',
    ['Potongan kardus berbentuk lingkaran, segitiga, dan persegi (dibuat dewasa)', 'Tiga piring plastik'],
    ['Gambar satu bentuk di setiap piring.', 'Sebut nama bentuk satu per satu.', 'Ajak anak meletakkan potongan di piring yang sesuai.'],
    10, 30, 60, [], 'Potongan kardus dibuat besar, sekitar telapak tangan dewasa.'),

  A('kognitif-11', 'Pola Warna Tutup Botol', 'Melatih mengenali dan meneruskan pola.',
    ['Tutup botol bekas berbagai warna', 'Kertas bergaris'],
    ['Susun pola: merah, biru, merah, biru.', 'Tanya, "Sesudah ini warna apa?"', 'Biarkan anak meneruskan pola, lalu membuat pola sendiri.'],
    15, 48, 83, ['smallParts'], 'Hitung tutup botol sebelum dan sesudah bermain, lalu simpan di wadah tertutup.'),

  A('kognitif-12', 'Isi Cetakan Telur', 'Melatih berhitung satu-satu dan mengenal angka.',
    ['Wadah karton telur bekas', 'Tutup botol bekas', 'Spidol'],
    ['Tulis angka 1 sampai 6 di dasar lubang karton telur.', 'Anak memasukkan tutup botol sesuai angka di setiap lubang.', 'Hitung bersama untuk memeriksa.'],
    10, 48, 83, ['smallParts'], 'Bersihkan karton telur sebelum dipakai; tutup botol dihitung dan disimpan setelah selesai.'),

  A('kognitif-13', 'Tenggelam atau Terapung', 'Melatih menebak, mencoba, dan mengamati hasil.',
    ['Baskom berisi air setinggi maksimal 5 cm', 'Benda besar: sendok, spons, mainan karet, tutup panci plastik', 'Lap'],
    ['Tanya anak, "Kira-kira tenggelam atau terapung?"', 'Masukkan benda satu per satu ke baskom.', 'Kelompokkan benda yang tenggelam dan yang terapung.', 'Buang air dan keringkan area bersama.'],
    15, 30, 72, ['water'], 'Dewasa duduk di sebelah anak sepanjang kegiatan.'),

  A('kognitif-14', 'Raba dan Tebak', 'Melatih indra peraba dan mendeskripsikan benda.',
    ['Kardus berlubang seukuran tangan', 'Benda besar: sisir, sendok kayu, kaus kaki, bola'],
    ['Masukkan satu benda ke kardus tanpa dilihat anak.', 'Anak meraba lewat lubang dan menebak.', 'Tanya, "Rasanya bagaimana? Halus atau kasar?"'],
    10, 36, 72, [], 'Hanya benda yang tidak tajam dan tidak berbulu halus yang mudah rontok.'),

  A('kognitif-15', 'Urutkan Cerita Gambar', 'Melatih memahami urutan kejadian.',
    ['3 gambar buatan sendiri: bangun tidur, mandi, sarapan'],
    ['Gambar tiga kegiatan pagi di kertas terpisah.', 'Acak gambarnya dan tanya, "Mana yang terjadi dulu?"', 'Ceritakan urutan yang sudah disusun anak.'],
    10, 48, 83, [], 'Kegiatan aman.'),

  A('kognitif-16', 'Ukur dengan Telapak Kaki', 'Mengenal konsep mengukur dan membandingkan panjang.',
    ['Selotip kertas'],
    ['Pilih benda: kasur, karpet, atau meja.', 'Ukur panjangnya dengan langkah tumit-ke-jari kaki anak.', 'Bandingkan dengan langkah kaki Anda. Mengapa hasilnya beda?'],
    10, 48, 83, [], 'Kegiatan aman; lakukan di lantai yang tidak licin.'),

  A('kognitif-17', 'Mana yang Beda?', 'Melatih mengamati perbedaan dan mengelompokkan.',
    ['4 benda: misalnya 3 sendok dan 1 sisir'],
    ['Jajarkan keempat benda di meja.', 'Tanya, "Mana yang berbeda? Kenapa?"', 'Ganti benda dan biarkan anak menyiapkan teka-teki untuk Anda.'],
    10, 36, 83, [], 'Gunakan benda yang tidak tajam.'),

  A('kognitif-18', 'Memori Kartu Pasangan', 'Melatih daya ingat dan konsentrasi.',
    ['6 sampai 8 kartu dari kardus dengan gambar berpasangan'],
    ['Gambar pasangan sederhana: dua matahari, dua bunga, dua rumah.', 'Telungkupkan semua kartu.', 'Bergantian membuka dua kartu; bila sama, simpan.'],
    15, 48, 83, [], 'Kegiatan aman.'),

  A('kognitif-19', 'Rapikan ke Rumahnya', 'Melatih memilah benda menurut jenis.',
    ['Mainan dan barang yang berserakan', 'Beberapa kardus atau keranjang'],
    ['Beri label gambar di setiap kardus: boneka, bola, buku.', 'Ajak anak memasukkan barang sesuai "rumahnya".', 'Tanya, "Ini masuk mana?" sambil memberi petunjuk.'],
    10, 18, 48, [], 'Pastikan mainan tidak ada yang rusak atau memiliki bagian kecil yang lepas.'),

  A('kognitif-20', 'Mengamati Bayangan', 'Melatih mengamati perubahan dan sebab-akibat.',
    ['Halaman bersinar matahari pagi', 'Kapur tulis'],
    ['Anak berdiri diam, dewasa menggambar garis bayangannya dengan kapur.', 'Ulangi beberapa jam kemudian di titik yang sama.', 'Bandingkan dan tanya, "Kenapa bayangannya berpindah?"'],
    10, 36, 83, [], 'Lakukan saat matahari pagi atau sore, pakai topi, dan jangan menatap matahari.'),

  A('kognitif-21', 'Dari Besar ke Kecil', 'Melatih mengurutkan berdasarkan ukuran.',
    ['4 sampai 5 kotak atau botol bekas berbagai ukuran'],
    ['Jajarkan benda secara acak.', 'Contohkan mencari yang paling besar.', 'Ajak anak menyusun dari yang paling besar sampai yang paling kecil.'],
    10, 30, 60, [], 'Botol dalam keadaan kosong dan tutupnya dipegang dewasa.'),

  A('kognitif-22', 'Benda dan Pasangannya', 'Melatih memahami hubungan dan fungsi benda.',
    ['Pasangan benda: sikat gigi dan cangkir, sepatu dan kaus kaki, sendok dan piring'],
    ['Pisahkan pasangan benda di dua kelompok.', 'Ambil satu dan tanya, "Ini pasangannya apa?"', 'Bahas kegunaan setiap pasangan.'],
    10, 24, 48, [], 'Gunakan sikat gigi bersih yang tidak dimasukkan ke mulut saat bermain.'),

  A('kognitif-23', 'Dari Mana Bunyinya?', 'Melatih mencari sumber suara dan perhatian pendengaran.',
    ['Tutup panci dan sendok kayu'],
    ['Dewasa lain mengetuk tutup panci pelan dari balik pintu atau tirai.', 'Tanya anak, "Bunyi apa itu? Di mana?"', 'Bantu anak menemukan sumber bunyi, lalu biarkan ia mencoba mengetuk.'],
    5, 12, 30, [], 'Ketuk pelan saja agar tidak mengagetkan atau menyakiti telinga.'),

  A('kognitif-24', 'Hitung Jari', 'Mengenal bilangan 1 sampai 5 dengan benda nyata.',
    ['Jari tangan'],
    ['Angkat jari satu per satu sambil berhitung pelan.', 'Ajak anak menirukan dengan jarinya.', 'Hitung benda sekitar: "Ada berapa sendok?"'],
    5, 24, 48, [], 'Kegiatan aman.'),

  A('kognitif-25', 'Tarik Kain, Dapat Mainan', 'Melatih memahami sebab-akibat dan memecahkan masalah.',
    ['Kain atau serbet', 'Mainan kesukaan'],
    ['Letakkan mainan di ujung kain, agak jauh dari jangkauan anak.', 'Letakkan ujung kain lainnya di depan anak.', 'Tunggu anak menarik kain untuk mendapatkan mainan, bantu bila perlu.'],
    5, 12, 24, [], 'Gunakan kain pendek seukuran serbet; jangan memakai taplak meja yang di atasnya ada barang.'),

  A('kognitif-26', 'Kalender Cuaca', 'Melatih mengamati, mencatat, dan mengenal nama hari.',
    ['Kertas bekas bergaris 7 kotak', 'Krayon'],
    ['Tulis nama hari di setiap kotak.', 'Setiap pagi, ajak anak melihat langit.', 'Anak menggambar matahari, awan, atau hujan di kotak hari itu.', 'Akhir minggu, hitung berapa hari cerah.'],
    10, 48, 83, [], 'Kegiatan aman; jangan menatap matahari langsung.'),

  A('kognitif-27', 'Kotak dalam Kotak', 'Melatih mencoba-coba dan ketekunan.',
    ['2 sampai 3 kardus kecil berbeda ukuran', 'Mainan kesukaan'],
    ['Masukkan mainan ke kardus terkecil, lalu masukkan ke kardus yang lebih besar.', 'Berikan kepada anak dan semangati untuk membukanya.', 'Rayakan saat mainan ditemukan.'],
    10, 12, 30, [], 'Lepaskan staples dari kardus dan gunakan tutup yang mudah dibuka.'),
];
