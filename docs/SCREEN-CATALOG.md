# Katalog Preview UI

Dokumen ini mencatat tampilan yang tersedia pada prototype React. Preview visual yang paling lengkap adalah Dashboard PPDB. Semua layar memakai data dummy dan interaksi lokal.

## A. Shell aplikasi
- Sidebar dengan pengelompokan 10 modul
- Header breadcrumb, pencarian, tombol tema, notifikasi, identitas admin
- Sidebar drawer untuk viewport kecil
- Tema terang/gelap

## B. Dashboard PPDB
- Hero penerimaan tahun ajaran 2026/2027
- Kartu statistik: total pendaftar, verifikasi, pembayaran, kelulusan
- Grafik tren pendaftar per bulan
- Ringkasan status verifikasi
- Tabel pendaftar terbaru, filter status, pencarian, modal detail

## C. Pendaftaran Santri
- Statistik total, terverifikasi, menunggu, perbaikan
- Tabel daftar pendaftar, pencarian, filter status, detail calon santri

## D. Verifikasi & Seleksi
- Statistik antrean verifikasi dan seleksi
- Daftar calon santri, status berkas, detail calon santri

## E. Keuangan & Pembayaran
- Statistik tagihan dan pembayaran
- Daftar transaksi, nominal contoh, status, tindakan tinjau

## F. Tes & Ujian Online
- Kartu jadwal tes
- Contoh tampilan soal pilihan ganda, timer visual, pilihan jawaban dan tombol simpan simulasi

## G. Asrama & Ke-santrian
- Kartu gedung/blok, kapasitas, progress hunian, tindakan kelola

## H. Pelaporan & Pimpinan
- Ringkasan status dan progress bar
- Daftar laporan dengan tindakan ekspor simulasi

## I. Master Data & Pengaturan Sistem
- Panel periode, konfigurasi penerimaan, persyaratan dokumen, dan hak akses

## J. Notifikasi Gateway
- Antrean notifikasi dan status simulasi
- Contoh template WhatsApp
- Peringatan eksplisit bahwa tidak ada pesan nyata dikirim

## K. Helpdesk & FAQ
- FAQ interaktif berbasis details/summary
- Simulasi konsultasi dengan panitia dan form pesan

## L. Autentikasi & Profil (Lengkap)
- **Halaman Login Mandiri (`LoginPage.jsx`)**: Tampilan masuk terpisah dengan pemilihan cepat peran akun demo (Super Admin, Calon Santri, Verifikator, Bendahara, Penguji).
- **Halaman Registrasi Santri Baru (`RegisterPage.jsx`)**: Pembuatan akun mandiri calon santri dengan validasi formulir dan pembuatan nomor pendaftaran otomatis.
- **Dialog Pemulihan Kata Sandi (`ForgotPasswordModal.jsx`)**: Formulir permohonan tautan reset sandi via WhatsApp/email simulasi.
- **Dialog Pengubahan Kata Sandi (`ChangePasswordModal.jsx`)**: Penggantian kata sandi akun dengan validasi konfirmasi kata sandi.
- **Dialog Profil Pengguna (`ProfileModal.jsx`)**: Inspeksi data kredensial akun, wewenang peran, dan pengubahan nama/kontak.
- **Modul Manajemen Akun & Hak Akses (`UserManagementPage.jsx`)**: Pengelolaan akun staf/panitia dan matriks hak akses 7 peran pengguna.

## M. Fitur & Modal Interaktif Baru
- **Formulir Pendaftaran Bertahap 5 Langkah (`MultiStepRegistrationModal.jsx`)**: Data diri, orang tua/wali, pendidikan asal & program, unggah berkas (KK, akta, ijazah, foto), dan konfirmasi pernyataan.
- **Kartu Tanda Peserta Seleksi Resmi (`RegistrationCardModal.jsx`)**: Format kartu resmi ber-QR code, pas foto, jadwal ujian masuk, dan opsi cetak PDF.
- **Kuitansi Elektronik Resmi (`ReceiptModal.jsx`)**: Kuitansi sah berstempel digital "LUNAS" dengan rincian biaya dan opsi cetak PDF.
- **Simulasi Ujian CBT Online (`OnlineExamSimulationModal.jsx`)**: Pengerjaan soal interaktif mandiri santri dengan timer mundur visual, penanda ragu-ragu, navigasi nomor soal, dan rekapitulasi skor otomatis.

