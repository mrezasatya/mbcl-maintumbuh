import { A } from './helper.js';

// Bahasa: mendengar, memahami, berbicara, dan persiapan membaca.
export const bahasa = [
  A('bahasa-01', 'Tur Benda di Rumah', 'Menambah kosakata benda sehari-hari dan melatih menunjuk.',
    ['Benda-benda di rumah: gelas, sendok, sapu, pintu, jendela'],
    ['Gendong atau gandeng anak berkeliling rumah.', 'Berhenti di satu benda, sentuh, dan sebut namanya dengan jelas.', 'Tanya, "Mana pintu?" dan beri pujian saat anak menunjuk.', 'Ulangi nama benda yang sama di hari-hari berikutnya.'],
    10, 12, 30, [], 'Jauhkan anak dari benda berbahaya seperti colokan listrik dan pisau saat berkeliling.'),

  A('bahasa-02', 'Lagu Tepuk Bersama', 'Melatih mendengar irama, meniru, dan melengkapi kata.',
    ['Nyanyian sendiri, misalnya Pok Ame-ame'],
    ['Duduk berhadapan dan nyanyikan lagu sambil bertepuk tangan.', 'Ulangi lagu, kali ini berhenti sejenak sebelum kata terakhir.', 'Tunggu anak menirukan suara atau gerakan, lalu lanjutkan dengan gembira.'],
    5, 12, 36, [], 'Kegiatan aman; pastikan anak duduk stabil saat bertepuk tangan.'),

  A('bahasa-03', 'Baca Buku Bergambar', 'Menumbuhkan minat buku dan menambah kosakata.',
    ['Buku bergambar sederhana atau buku karton'],
    ['Pangku anak dan pilih buku dengan gambar besar.', 'Tunjuk gambar, sebut namanya, dan tirukan suaranya bila ada.', 'Tanya, "Mana kucing?" lalu beri waktu anak menunjuk.', 'Biarkan anak memilih halaman yang ingin dilihat lagi.'],
    10, 12, 36, [], 'Pilih buku tanpa bagian kecil yang mudah lepas.'),

  A('bahasa-04', 'Tiru Suara Hewan', 'Melatih menirukan bunyi, langkah awal menuju kata.',
    ['Gambar hewan dari buku atau boneka hewan'],
    ['Tunjukkan gambar hewan satu per satu.', 'Tirukan suaranya: kucing "meong", ayam "kukuruyuk", sapi "moo".', 'Beri jeda dan tunggu anak menirukan, lalu tepuk tangan bersama.'],
    5, 12, 30, [], 'Periksa boneka tidak memiliki mata plastik kecil atau bagian yang mudah lepas.'),

  A('bahasa-05', 'Telepon-teleponan', 'Melatih bercakap bergantian dan menirukan percakapan sehari-hari.',
    ['Gelas plastik bekas atau telepon mainan dari kardus'],
    ['Pura-pura menelepon: "Halo, ini Adik?"', 'Beri jeda agar anak menjawab dengan suara atau kata.', 'Bergantian: anak menelepon nenek, ayah, atau boneka.'],
    10, 15, 48, [], 'Gunakan gelas plastik tebal atau mainan yang tidak bisa dibongkar anak.'),

  A('bahasa-06', 'Kotak Misteri', 'Menambah kosakata dan melatih rasa ingin tahu lewat pertanyaan.',
    ['Kardus bertutup', 'Benda rumah berukuran besar: sisir, sendok sayur, kaus kaki, gelas plastik'],
    ['Masukkan beberapa benda ke kardus.', 'Ajak anak mengambil satu benda tanpa melihat.', 'Sebut nama benda dan kegunaannya, misalnya "Sisir, untuk menyisir rambut."'],
    10, 18, 48, [], 'Isi kardus hanya dengan benda besar yang tidak tajam dan tidak muat di mulut.'),

  A('bahasa-07', 'Nyanyi Cicak-cicak di Dinding', 'Melatih mengingat kata dalam lagu dan mengaitkan kata dengan gerakan.',
    ['Tidak perlu bahan'],
    ['Nyanyikan lagu sambil membuat gerakan jari merayap seperti cicak.', 'Ulangi dan beri kesempatan anak melengkapi kata-kata tertentu.', 'Ajak anak menyebut hewan lain yang ada di rumah.'],
    5, 18, 48, [], 'Kegiatan aman; lakukan sambil duduk bersama.'),

  A('bahasa-08', 'Cerita Foto Keluarga', 'Melatih menyebut nama orang, menyusun kalimat, dan bercerita.',
    ['Foto keluarga di album atau hp'],
    ['Tunjukkan satu foto dan tanya, "Siapa ini?"', 'Ceritakan singkat apa yang terjadi di foto.', 'Ajak anak menceritakan foto lain dengan kata-katanya sendiri.'],
    10, 24, 60, [], 'Bila memakai hp, dewasa yang memegang dan batasi waktu layar.'),

  A('bahasa-09', 'Perintah Dua Langkah', 'Melatih memahami dan mengingat instruksi berurutan.',
    ['Mainan dan barang di sekitar rumah'],
    ['Beri perintah sederhana: "Ambil bola, lalu taruh di keranjang."', 'Bantu dengan menunjuk bila anak bingung.', 'Bergantian: anak yang memberi perintah kepada Anda.'],
    10, 24, 48, [], 'Hindari perintah yang melibatkan benda pecah belah atau tempat tinggi.'),

  A('bahasa-10', 'Dongeng Si Kancil', 'Melatih menyimak cerita, mengingat tokoh, dan menebak kelanjutan.',
    ['Tidak perlu bahan; boneka atau gambar hewan bila ada'],
    ['Ceritakan dongeng Si Kancil dengan kata-kata Anda sendiri dan suara yang berbeda untuk tiap tokoh.', 'Berhenti di tengah cerita dan tanya, "Menurutmu, apa yang dilakukan Kancil?"', 'Ajak anak menceritakan bagian yang ia sukai.'],
    15, 36, 83, [], 'Kegiatan aman; bahas juga pesan cerita, misalnya tidak mengambil milik orang lain.'),

  A('bahasa-11', 'Tebak Bunyi Awal', 'Melatih kesadaran bunyi huruf sebagai persiapan membaca.',
    ['Benda-benda di rumah'],
    ['Sebut satu bunyi, misalnya "Bbb".', 'Ajak anak mencari benda yang namanya diawali bunyi itu: bola, buku, bantal.', 'Bergantian memilih bunyi lain.'],
    10, 48, 83, [], 'Kegiatan aman; hindari mencari benda di tempat tinggi atau dapur.'),

  A('bahasa-12', 'Wayang Kertas', 'Melatih bercerita, berdialog, dan berimajinasi.',
    ['Kertas bekas atau kardus tipis', 'Krayon', 'Gunting anak berujung tumpul', 'Stik es krim atau sedotan utuh', 'Selotip'],
    ['Gambar dua tokoh, misalnya kancil dan buaya.', 'Anak menggunting gambar dengan bantuan, lalu tempel ke stik.', 'Mainkan cerita pendek dengan dialog bergantian.'],
    20, 48, 83, ['sharp'], 'Gunting dipakai sambil duduk dan disimpan setelah selesai.'),

  A('bahasa-13', 'Cerita Hari Ini', 'Melatih mengingat kejadian dan menyusun kalimat berurutan.',
    ['Tidak perlu bahan'],
    ['Saat menjelang tidur, ceritakan tiga hal yang Anda lakukan hari ini.', 'Tanya anak, "Tadi kamu main apa?"', 'Bantu dengan pertanyaan: siapa, di mana, lalu apa.'],
    10, 30, 83, [], 'Kegiatan aman; jadikan rutinitas yang menenangkan.'),

  A('bahasa-14', 'Tebak-tebakan Ciri Benda', 'Melatih memahami kata sifat dan berpikir dari petunjuk.',
    ['Benda-benda di rumah'],
    ['Pilih satu benda diam-diam, lalu beri petunjuk: "Bentuknya bulat, warnanya merah."', 'Anak menebak bendanya.', 'Bergantian: anak memberi petunjuk, Anda menebak.'],
    10, 36, 83, [], 'Kegiatan aman.'),

  A('bahasa-15', 'Kata Berirama', 'Melatih mendengar akhir kata yang sama sebagai persiapan membaca.',
    ['Tidak perlu bahan'],
    ['Sebut pasangan kata berirama: "batu, satu", "kaki, laki".', 'Tanya, "Apa lagi yang bunyinya mirip?"', 'Terima kata karangan anak walau tidak bermakna, lalu tertawa bersama.'],
    10, 48, 83, [], 'Kegiatan aman.'),

  A('bahasa-16', 'Buku Cerita Buatan Sendiri', 'Melatih bercerita, mengaitkan gambar dengan kata, dan rasa bangga.',
    ['3 lembar kertas bekas dilipat menjadi buku', 'Krayon', 'Selotip untuk menjilid'],
    ['Lipat kertas menjadi buku kecil dan jilid dengan selotip.', 'Anak menggambar satu cerita di setiap halaman.', 'Dewasa menulis kalimat yang diucapkan anak di bawah gambarnya.', 'Bacakan buku itu bersama.'],
    20, 48, 83, [], 'Kegiatan aman; duduk di meja dengan cahaya cukup.'),

  A('bahasa-17', 'Boneka Kaus Kaki', 'Melatih berdialog dan mengekspresikan perasaan lewat tokoh.',
    ['Kaus kaki bekas yang bersih', 'Spidol yang dapat dicuci'],
    ['Gambar mata dan mulut di kaus kaki dengan spidol.', 'Pakai di tangan dan buat boneka menyapa anak.', 'Ajak anak menjawab atau memainkan boneka sendiri.'],
    10, 24, 60, [], 'Gambar wajah dengan spidol saja, tanpa menempel kancing atau mata plastik.'),

  A('bahasa-18', 'Ceritakan Saat Berpakaian', 'Menambah kosakata bagian tubuh dan kegiatan sehari-hari.',
    ['Pakaian anak'],
    ['Saat memakaikan baju, sebut setiap langkah: "Tangan masuk, kepala keluar."', 'Tanya, "Mana kaki?" lalu tunggu anak menunjuk.', 'Beri pilihan: "Mau baju merah atau biru?"'],
    10, 12, 36, [], 'Kegiatan aman; lakukan di lantai atau tempat rendah, bukan di atas meja.'),

  A('bahasa-19', 'Berburu Gambar di Majalah', 'Melatih menyebut nama benda dan menggolongkannya.',
    ['Majalah, koran, atau brosur bekas'],
    ['Buka majalah bersama.', 'Minta anak mencari gambar tertentu: "Cari gambar makanan."', 'Tanya nama benda yang ditemukan dan gunanya.'],
    10, 30, 60, [], 'Awasi agar sobekan kertas tidak dimasukkan ke mulut.'),

  A('bahasa-20', 'Nyanyi Burung Kakak Tua', 'Melatih mengingat kata dan memahami cerita sederhana dalam lagu.',
    ['Tidak perlu bahan'],
    ['Nyanyikan lagu Burung Kakak Tua bersama.', 'Ulangi dan berhenti sebelum kata akhir baris agar anak melanjutkan.', 'Bertanya tentang lagu: "Burungnya hinggap di mana?"'],
    5, 24, 60, [], 'Kegiatan aman.'),

  A('bahasa-21', 'Ciluk Ba Panggil Nama', 'Melatih mengenali nama sendiri dan nama orang terdekat.',
    ['Kain kecil seukuran sapu tangan'],
    ['Tutup wajah Anda dengan kain.', 'Buka sambil berkata "Ciluk ba! Ini Ibu!" atau nama Anda.', 'Bergantian menutup wajah anak dengan lembut lalu sebut namanya.'],
    5, 12, 24, [], 'Kain hanya menutup sebentar; jangan menutup hidung dan mulut anak terlalu lama.'),

  A('bahasa-22', 'Pesan Berbisik', 'Melatih mendengar dengan saksama dan mengulang kalimat.',
    ['Minimal 3 orang'],
    ['Duduk melingkar.', 'Bisikkan kalimat pendek ke orang di sebelah.', 'Pesan diteruskan sampai orang terakhir yang menyebutkannya keras-keras.', 'Bandingkan dengan kalimat awal dan tertawa bersama.'],
    10, 60, 83, [], 'Kegiatan aman; berbisik pelan, tidak berteriak ke telinga.'),

  A('bahasa-23', 'Sedang Apa Dia?', 'Melatih menyebut kata kerja dan menyusun kalimat pendek.',
    ['Buku bergambar atau foto orang beraktivitas'],
    ['Tunjuk gambar dan tanya, "Dia sedang apa?"', 'Bantu dengan kata kerja: makan, tidur, lari.', 'Perpanjang jawaban anak: "Iya, adik makan nasi."'],
    10, 18, 36, [], 'Kegiatan aman.'),

  A('bahasa-24', 'Wawancara Boneka', 'Melatih menjawab dan bertanya dengan kata tanya apa, siapa, di mana.',
    ['Boneka atau mainan kesukaan', 'Sendok sayur sebagai mikrofon'],
    ['Pura-pura menjadi pewawancara yang mewawancarai boneka.', 'Ajukan pertanyaan: "Siapa namamu? Kamu suka makan apa?"', 'Bergantian: anak menjadi pewawancara.'],
    10, 36, 72, [], 'Kegiatan aman.'),

  A('bahasa-25', 'Mengenal Huruf Nama Sendiri', 'Mengenal bentuk huruf yang paling bermakna bagi anak.',
    ['Kertas bekas', 'Krayon'],
    ['Tulis nama anak besar-besar.', 'Sebut setiap huruf sambil menunjuknya.', 'Ajak anak mencari huruf yang sama di kemasan atau koran.'],
    10, 48, 83, [], 'Kegiatan aman.'),

  A('bahasa-26', 'Mau yang Mana?', 'Melatih menyatakan pilihan lewat tunjukan, suara, atau kata.',
    ['Dua mainan atau dua benda berbeda'],
    ['Pegang dua benda di kanan dan kiri.', 'Tanya, "Mau bola atau boneka?" sambil mengangkat masing-masing.', 'Sebut ulang pilihan anak dengan jelas: "Oh, bola!"'],
    5, 12, 30, [], 'Gunakan benda besar yang aman digenggam anak.'),
];
