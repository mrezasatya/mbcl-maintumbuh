import { A } from './helper.js';

// Sosial-Emosional: mengenal perasaan, kelekatan, bergiliran, berbagi, dan kemandirian.
export const sosem = [
  A('sosem-01', 'Cermin Ekspresi', 'Mengenal ekspresi wajah dan perasaan dasar.',
    ['Cermin yang terpasang kuat di dinding atau lemari'],
    ['Duduk bersama anak di depan cermin.', 'Buat wajah senang, sedih, dan terkejut sambil menyebut nama perasaannya.', 'Ajak anak menirukan dan tertawa bersama.'],
    5, 12, 36, [], 'Gunakan cermin yang terpasang kuat, bukan cermin kaca lepas yang bisa jatuh atau pecah.'),

  A('sosem-02', 'Giliranmu, Giliranku', 'Melatih menunggu giliran dalam permainan sederhana.',
    ['Bola plastik besar'],
    ['Duduk berhadapan dan gelindingkan bola sambil berkata, "Giliran Adik."', 'Saat bola kembali, katakan, "Sekarang giliran Ibu."', 'Ajak anggota keluarga lain ikut duduk melingkar.'],
    10, 12, 36, [], 'Gunakan bola lunak yang lebih besar dari mulut anak.'),

  A('sosem-03', 'Pijat Sayang Sambil Bernyanyi', 'Menguatkan rasa aman dan kedekatan dengan orang tua.',
    ['Tidak perlu bahan; boleh memakai minyak telon bila anak suka'],
    ['Pilih waktu santai, misalnya setelah mandi.', 'Pijat lembut punggung, tangan, dan kaki anak sambil bernyanyi pelan.', 'Sebut bagian tubuh yang sedang dipijat dan perhatikan respons anak.'],
    5, 12, 48, [], 'Pijat dengan lembut; hentikan bila anak menolak atau tidak nyaman.'),

  A('sosem-04', 'Lagu Beres-beres', 'Melatih tanggung jawab sederhana dan kerja sama.',
    ['Mainan yang berserakan', 'Keranjang atau kardus'],
    ['Nyanyikan lagu ceria buatan sendiri tentang membereskan mainan.', 'Contohkan memasukkan satu mainan ke keranjang.', 'Puji usaha anak, bukan hanya hasilnya.'],
    10, 18, 48, [], 'Periksa mainan yang rusak atau tajam dan singkirkan.'),

  A('sosem-05', 'Menyuapi Boneka', 'Melatih empati dan meniru kegiatan merawat.',
    ['Boneka', 'Sendok dan mangkuk plastik kosong'],
    ['Pura-pura boneka lapar: "Boneka mau makan."', 'Contohkan menyuapi boneka dengan sendok kosong.', 'Biarkan anak menyuapi, lalu menidurkan boneka bersama.'],
    10, 18, 48, [], 'Tidak memakai makanan sungguhan; sendok dan mangkuk dari plastik.'),

  A('sosem-06', 'Tos, Dadah, dan Salam', 'Melatih sapaan sosial dan kelekatan dengan keluarga.',
    ['Tidak perlu bahan'],
    ['Ajak anak melakukan tos dengan anggota keluarga.', 'Latih melambai "dadah" saat ada yang pergi.', 'Contohkan salim atau salam saat menyambut tamu.'],
    5, 12, 30, [], 'Kegiatan aman.'),

  A('sosem-07', 'Warung-warungan', 'Melatih berinteraksi, bergantian peran, dan sopan santun.',
    ['Kemasan bekas yang bersih (kotak teh, kotak susu)', 'Uang mainan dari potongan kertas', 'Meja kecil'],
    ['Tata kemasan bekas di meja sebagai barang dagangan.', 'Anak menjadi penjual, Anda menjadi pembeli; ucapkan "permisi" dan "terima kasih".', 'Bertukar peran setelah beberapa kali transaksi.'],
    15, 36, 83, [], 'Gunakan kemasan kosong yang bersih dan tidak tajam; uang mainan dari kertas, bukan uang logam.'),

  A('sosem-08', 'Kartu Perasaan', 'Mengenal nama perasaan dan kapan perasaan itu muncul.',
    ['Kertas bekas', 'Krayon'],
    ['Gambar empat wajah: senang, sedih, marah, takut.', 'Tunjuk satu wajah dan ceritakan kapan Anda merasa begitu.', 'Tanya anak, "Kapan kamu merasa sedih?" dan dengarkan tanpa menghakimi.'],
    10, 36, 72, [], 'Kegiatan aman; terima semua jawaban anak.'),

  A('sosem-09', 'Napas Boneka Naik Turun', 'Melatih menenangkan diri lewat napas perut.',
    ['Boneka kecil'],
    ['Anak berbaring telentang dengan boneka di atas perut.', 'Tarik napas pelan lewat hidung sampai boneka naik.', 'Embuskan pelan lewat mulut sampai boneka turun. Ulangi 5 kali.'],
    5, 36, 83, [], 'Hentikan bila anak pusing; bernapas dengan tempo biasa, tidak dipaksa.'),

  A('sosem-10', 'Masak-masakan Bersama', 'Melatih bermain peran, berbagi alat, dan bekerja sama.',
    ['Panci kecil, sendok, dan piring plastik', 'Daun atau kertas sebagai "bahan masakan"'],
    ['Siapkan "dapur" di lantai atau tikar.', 'Bagi peran: siapa yang memasak, siapa yang menyajikan.', 'Ajak anak menawarkan masakan kepada anggota keluarga.'],
    15, 30, 60, [], 'Bermain jauh dari dapur sungguhan; tidak ada yang dimakan dari permainan ini.'),

  A('sosem-11', 'Asisten Kecil di Rumah', 'Menumbuhkan rasa mampu dan tanggung jawab.',
    ['Serbet atau lap bersih', 'Sendok plastik'],
    ['Pilih tugas sederhana: melipat serbet atau menata sendok di meja.', 'Contohkan sekali, lalu biarkan anak mencoba.', 'Ucapkan terima kasih atas bantuannya.'],
    10, 30, 72, [], 'Hindari tugas dengan benda pecah belah atau tajam.'),

  A('sosem-12', 'Dokter-dokteran', 'Melatih empati dan mengurangi rasa takut saat berobat.',
    ['Boneka', 'Sendok sebagai alat periksa', 'Kain sebagai perban'],
    ['Boneka pura-pura sakit: "Aduh, perut boneka sakit."', 'Anak menjadi dokter: memeriksa dan menenangkan boneka.', 'Bergantian peran dan bicarakan perasaan saat ke dokter.'],
    15, 36, 72, [], 'Tidak memakai obat atau alat medis sungguhan.'),

  A('sosem-13', 'Ular Dadu Kardus', 'Melatih menunggu giliran, menerima kalah, dan mengikuti aturan.',
    ['Kotak kecil bekas dijadikan dadu (gambar titik 1 sampai 3)', 'Kertas besar bergambar jalur 15 kotak', 'Dua bidak dari gulungan kertas'],
    ['Gambar jalur berkelok dengan garis mulai dan selesai.', 'Bergantian melempar dadu dan maju sesuai jumlah titik.', 'Bicarakan perasaan saat menang dan kalah.'],
    15, 48, 83, [], 'Bidak dibuat sebesar ibu jari dewasa atau lebih.'),

  A('sosem-14', 'Gambar Hadiah untuk Keluarga', 'Menumbuhkan rasa peduli dan senang berbagi.',
    ['Kertas bekas', 'Krayon'],
    ['Tanya anak, "Mau membuat gambar untuk siapa?"', 'Anak menggambar, dewasa membantu menuliskan pesan.', 'Berikan gambar bersama-sama dan perhatikan reaksi penerimanya.'],
    15, 30, 83, [], 'Kegiatan aman.'),

  A('sosem-15', 'Pilih Bajuku Sendiri', 'Melatih kemandirian dan membuat pilihan.',
    ['Dua pilihan baju'],
    ['Tunjukkan dua baju dan tanya, "Mau pakai yang mana?"', 'Hargai pilihan anak.', 'Biarkan anak mencoba memakai sendiri, bantu seperlunya.'],
    10, 24, 48, [], 'Kegiatan aman; berpakaian sambil duduk agar tidak terjatuh.'),

  A('sosem-16', 'Petak Umpet di Rumah', 'Melatih menunggu, menahan diri, dan kegembiraan bersama.',
    ['Tidak perlu bahan'],
    ['Tetapkan area main dan tempat yang tidak boleh dipakai bersembunyi.', 'Satu orang berhitung sampai 10, yang lain bersembunyi.', 'Bergantian menjadi pencari.'],
    15, 36, 83, [], 'Larang bersembunyi di dalam lemari tertutup, kotak bertutup, mesin cuci, kamar mandi, atau di luar rumah.'),

  A('sosem-17', 'Main Bareng Teman', 'Melatih bermain berdampingan dan berinteraksi dengan anak lain.',
    ['Dua set mainan serupa', 'Teman sebaya, sepupu, atau anak tetangga'],
    ['Siapkan mainan untuk masing-masing anak agar tidak berebut.', 'Duduk di dekat mereka dan sebutkan apa yang dilakukan setiap anak.', 'Bantu anak bergantian atau bertukar mainan dengan kata-kata.'],
    20, 24, 60, [], 'Dewasa tetap berada di dekat anak-anak dan menengahi bila ada rebutan.'),

  A('sosem-18', 'Boneka Sedang Sedih', 'Melatih empati dan mencari cara menghibur.',
    ['Boneka'],
    ['Buat boneka terlihat sedih: "Boneka sedih, mainannya hilang."', 'Tanya anak, "Apa yang bisa kita lakukan?"', 'Lakukan ide anak, misalnya memeluk atau mencarikan mainan.'],
    10, 30, 60, [], 'Kegiatan aman.'),

  A('sosem-19', 'Lampu Merah Lampu Hijau', 'Melatih mengendalikan diri dan mengikuti aturan.',
    ['Kertas merah dan hijau, atau aba-aba suara'],
    ['Saat kertas hijau diangkat, anak berjalan atau berlari pelan.', 'Saat kertas merah diangkat, anak berhenti.', 'Bergantian menjadi pemberi aba-aba.'],
    10, 48, 83, [], 'Bermain di halaman atau ruang lapang, jauh dari jalan kendaraan.'),

  A('sosem-20', 'Jadwal Pagi Bergambar', 'Melatih kemandirian dan mengurangi rengekan saat rutinitas.',
    ['Kertas bekas', 'Krayon', 'Selotip'],
    ['Gambar urutan kegiatan pagi: bangun, mandi, berpakaian, sarapan.', 'Tempel di dinding setinggi mata anak.', 'Setiap pagi, anak menunjuk kegiatan yang sudah selesai.'],
    15, 48, 83, [], 'Kegiatan aman.'),

  A('sosem-21', 'Ritual Pamit dan Menyambut', 'Membangun rasa aman saat berpisah sementara dengan orang tua.',
    ['Tidak perlu bahan'],
    ['Buat salam pamit yang sama setiap kali pergi: peluk, cium, dadah.', 'Katakan dengan jujur kapan akan kembali, misalnya "Ibu pulang setelah kamu tidur siang."', 'Saat kembali, sambut dengan pelukan dan ceritakan kegiatan masing-masing.'],
    5, 12, 36, [], 'Kegiatan aman; hindari pergi diam-diam tanpa pamit.'),

  A('sosem-22', 'Menimang Boneka', 'Melatih kelembutan dan meniru kasih sayang.',
    ['Boneka atau guling kecil', 'Kain seukuran sapu tangan sebagai selimut'],
    ['Contohkan menimang boneka sambil bersenandung.', 'Berikan boneka kepada anak untuk ditimang.', 'Ajak anak "menidurkan" boneka dengan selimut kain.'],
    10, 12, 30, [], 'Periksa boneka tidak memiliki bagian kecil yang mudah lepas.'),

  A('sosem-23', 'Menari Berpasangan', 'Menguatkan kedekatan dan kegembiraan bersama.',
    ['Lagu anak dari hp atau nyanyian sendiri'],
    ['Pegang kedua tangan anak dan bergoyang mengikuti lagu.', 'Ajak anak memilih gerakan, Anda menirukan.', 'Akhiri dengan pelukan.'],
    5, 15, 48, [], 'Bergerak pelan dan tidak mengayun anak dengan memegang lengannya.'),

  A('sosem-24', 'Merawat Tanaman', 'Menumbuhkan rasa peduli dan tanggung jawab pada makhluk hidup.',
    ['Tanaman pot', 'Gelas plastik berisi sedikit air'],
    ['Ajak anak melihat dan menyentuh daun tanaman dengan lembut.', 'Siram tanaman bersama dengan sedikit air.', 'Bicarakan bahwa tanaman juga butuh dirawat, seperti kita.'],
    10, 30, 72, ['water'], 'Pilih tanaman yang tidak beracun dan tidak berduri; cuci tangan sesudahnya.'),

  A('sosem-25', 'Kata Ajaib', 'Melatih ucapan tolong, terima kasih, dan maaf.',
    ['Dua boneka'],
    ['Mainkan dua boneka yang ingin meminjam mainan.', 'Tunjukkan boneka yang berkata "tolong" dan "terima kasih".', 'Ajak anak memainkan boneka lain, termasuk saat meminta maaf.'],
    10, 30, 72, [], 'Kegiatan aman.'),

  A('sosem-26', 'Sudut Tenang', 'Melatih mengenali dan menenangkan perasaan yang kuat.',
    ['Bantal', 'Selimut', 'Buku atau boneka kesukaan'],
    ['Pilih sudut rumah yang tenang dan tata bantal dan selimut di sana.', 'Jelaskan bahwa sudut ini untuk menenangkan diri, bukan hukuman.', 'Latih bersama saat suasana hati sedang baik: duduk, tarik napas, peluk boneka.'],
    15, 36, 83, [], 'Sudut tenang tetap terlihat oleh dewasa, jauh dari jendela dan perabot berat.'),

  A('sosem-27', 'Tebak Wajahku', 'Melatih membaca ekspresi orang lain.',
    ['Tidak perlu bahan'],
    ['Buat ekspresi wajah: senang, sedih, kaget, atau marah.', 'Tanya anak, "Ibu sedang merasa apa?"', 'Bergantian: anak membuat ekspresi, Anda menebak.'],
    5, 24, 48, [], 'Kegiatan aman.'),
];
