# SOT — Sistem Informasi Pendaftaran Santri Baru Darul Harumain

**Versi:** 0.1.0  
**Status:** Baseline kebutuhan dan rancangan front-end  
**Tanggal:** 23 Oktober 2026  
**Metode:** Rapid Application Development (RAD)  
**Stack front-end:** React + Vite + Tailwind CSS  
**Brand utama:** `#689D4B`  
**Batas pekerjaan:** front-end terlebih dahulu, data dummy, tanpa backend/API.

## 1. Tujuan produk

Menyediakan portal terpusat untuk proses pendaftaran santri baru, pemeriksaan dokumen, seleksi, pembayaran, ujian online, penempatan asrama/kelas, komunikasi, dan pelaporan. UI harus memudahkan calon santri dan petugas dengan navigasi yang konsisten, status yang jelas, serta dukungan tampilan desktop dan mobile.

## 2. Prinsip sumber kebenaran (SOT)

1. Dokumen ini menjadi acuan ruang lingkup dan perilaku produk.
2. `AGENTS.md` mengatur batasan implementasi dan kontrak kerja agent.
3. `PROMPT-EXECUTION.md` menjadi prompt awal untuk melanjutkan implementasi.
4. Perubahan scope harus dicatat di SOT sebelum dianggap sebagai requirement.
5. Data di prototype hanya data dummy; tidak boleh dianggap data calon santri nyata.
6. Jangan menambahkan fitur di luar 10 modul yang disepakati tanpa persetujuan.

## 3. Peran dan hak akses

| Peran | Kapabilitas konseptual |
|---|---|
| Calon santri | Registrasi, profil, formulir, dokumen, pembayaran, ujian, status, notifikasi, helpdesk |
| Admin PPDB | Mengelola akun, periode, master data, pengaturan, dan keseluruhan proses |
| Panitia pendaftaran/verifikasi | Memeriksa formulir/dokumen, memberi catatan, memperbarui status |
| Penguji/seleksi | Jadwal tes, nilai Al-Qur'an/tulis/wawancara, rekomendasi kelulusan |
| Bendahara | Tagihan, bukti bayar, verifikasi pembayaran, kuitansi, riwayat |
| Pengelola asrama | Data santri diterima, gedung/kamar/kelas, perlengkapan |
| Pimpinan | Dashboard dan laporan; akses baca sesuai izin |
| Petugas helpdesk | FAQ, pertanyaan, live chat, riwayat percakapan |

Hak akses final perlu dikonfirmasi sebelum backend dibangun. Front-end saat ini hanya simulasi, bukan enforcement keamanan.

## 4. Ruang lingkup fitur

### 4.1 Modul Autentikasi & Profil
- Registrasi akun calon santri
- Login/logout pengguna dan reset/ubah kata sandi
- Kelola profil pengguna
- Manajemen akun admin/panitia
- Pengaturan hak akses pengguna

### 4.2 Modul Pendaftaran & Dokumen
- Formulir data diri, orang tua/wali, pendidikan sebelumnya
- Unggah KK, akta kelahiran, ijazah/SKL, pas foto
- Validasi kelengkapan dan edit formulir
- Ajukan formulir dan buat nomor pendaftaran otomatis
- Cetak kartu/bukti pendaftaran
- Pantau status pendaftaran

### 4.3 Modul Verifikasi & Seleksi
- Dashboard antrean dan detail calon santri
- Periksa kelengkapan dan validasi dokumen
- Catatan perbaikan dan pembaruan status verifikasi
- Input nilai tes Al-Qur'an, tulis, wawancara
- Hitung nilai akhir, tetapkan kelulusan
- Pengumuman dan riwayat hasil seleksi

### 4.4 Modul Keuangan & Pembayaran
- Informasi biaya dan metode pembayaran
- Nominal tagihan dan unggah bukti pembayaran
- Daftar pembayaran calon santri
- Verifikasi admin, status, dan catatan pembayaran
- Kuitansi digital, riwayat, dan cetak bukti pembayaran

### 4.5 Modul Pelaporan & Pimpinan
- Dashboard statistik pendaftaran
- Statistik total pendaftar, periode, verifikasi, pembayaran, seleksi
- Laporan seluruh pendaftar, berkas terverifikasi, pembayaran, hasil seleksi
- Filter periode/status
- Cetak laporan, ekspor PDF dan Excel

### 4.6 Modul Master Data & Pengaturan Sistem
- Periode, gelombang, kuota, persyaratan, jalur pendaftaran
- Biaya, tahun ajaran, tes seleksi, kriteria kelulusan
- Informasi/pengumuman dan identitas/logo pesantren
- Hak akses, status pendaftaran, audit aktivitas pengguna

### 4.7 Modul Tes & Ujian Online
- Jadwal ujian, soal, pengerjaan online, timer
- Simpan jawaban, penilaian objektif otomatis
- Rekapitulasi dan riwayat nilai

### 4.8 Modul Notifikasi WhatsApp / Email Gateway
- Registrasi sukses dan nomor pendaftaran
- Kelengkapan/perbaikan berkas dan status verifikasi
- Pembayaran tervalidasi
- Jadwal tes, hasil seleksi, pengingat tenggat pendaftaran

### 4.9 Modul Asrama & Ke-santrian
- Pendataan santri diterima dan data lanjutan
- Kebutuhan asrama, gedung/kamar, pembagian kamar/kelas
- Perlengkapan awal dan cetak data penempatan

### 4.10 Modul Helpdesk & Live Chat / FAQ
- FAQ dan prosedur pendaftaran
- Persyaratan/biaya
- Form pertanyaan dan konsultasi panitia
- Live chat, riwayat percakapan
- Admin mengelola pertanyaan/jawaban

## 5. Struktur navigasi UI

- Utama: Dashboard
- Penerimaan: Pendaftaran Santri, Verifikasi & Seleksi, Keuangan & Pembayaran, Tes & Ujian Online
- Santri: Asrama & Ke-santrian
- Manajemen: Pelaporan & Pimpinan, Master Data & Pengaturan Sistem
- Layanan: Notifikasi Gateway, Helpdesk & FAQ
- Akun: profil admin, tema terang/gelap, notifikasi

Modul Autentikasi & Profil merupakan bagian alur akses dan halaman akun; layar admin pada prototipe menampilkan konteks sesi admin contoh.

## 6. Alur utama

### 6.1 Alur calon santri
Registrasi → verifikasi akun → login → isi profil/formulir → unggah dokumen → validasi kelengkapan → ajukan → nomor pendaftaran → pembayaran → verifikasi berkas/pembayaran → jadwal dan tes seleksi → pengumuman → jika diterima, pengisian data lanjutan dan penempatan asrama/kelas.

### 6.2 Alur petugas
Login → dashboard sesuai role → antrean kerja → buka detail → validasi/catat koreksi → perbarui status → sistem menyiapkan event notifikasi → riwayat aktivitas tercatat.

### 6.3 Alur notifikasi
Peristiwa bisnis → pilih template dan kanal → antrean pesan → provider gateway → status terkirim/gagal → retry terkontrol dan audit. Dalam baseline UI, alur ini hanya divisualisasikan.

## 7. Status konseptual

- Pendaftaran: Draft, Diajukan, Perlu Perbaikan, Lengkap, Dibatalkan.
- Verifikasi: Menunggu, Diproses, Terverifikasi, Perlu Perbaikan, Ditolak.
- Pembayaran: Belum Bayar, Menunggu Verifikasi, Lunas/Terverifikasi, Ditolak.
- Seleksi: Belum Dijadwalkan, Terjadwal, Selesai, Lulus, Tidak Lulus, Daftar Tunggu.
- Gateway: Draft, Antrean, Terkirim, Gagal, Dijadwalkan.

Status final, aturan transisi, dan otorisasi perubahan harus disepakati sebelum implementasi backend.

## 8. Standar UI/UX

- Modern Clean & Structured Layout; hierarki visual jelas, whitespace cukup, kartu ringkas, tabel mudah dipindai.
- Brand utama `#689D4B`; gunakan variasi warna netral dan semantic colors untuk status.
- Geometri lembut: radius 12–24 px, garis tipis, shadow halus, aksen lingkaran/gradasi secara terbatas.
- Dark mode harus menjaga kontras, status, fokus, hover, tabel, dialog, dan input tetap terbaca.
- Responsif: desktop sebagai workspace admin, tablet dengan grid adaptif, mobile dengan sidebar drawer dan tabel yang dapat digulir.
- Semua tombol harus punya hasil interaksi yang jelas atau diberi label simulasi.
- Form memiliki label, validasi, required state, error/help text, dan ringkasan kelengkapan.
- Aksesibilitas: keyboard navigation, fokus terlihat, label semantik, kontras memadai, jangan mengandalkan warna saja.

## 9. Data dummy awal

Dashboard menampilkan data simulasi seperti total pendaftar, berkas terverifikasi, pembayaran, hasil seleksi, tren bulanan, dan pendaftar terbaru. Nama, nomor registrasi, tanggal, sekolah, status, nilai, nominal, dan statistik tidak mewakili data riil. Data dummy boleh diubah untuk menguji keadaan kosong, loading, sukses, gagal, dan status yang beragam.

## 10. Batasan integrasi

Tidak termasuk baseline:
- Backend, API, database, autentikasi riil, otorisasi server
- Upload berkas ke penyimpanan persisten
- Pembayaran online atau rekonsiliasi bank
- Pengiriman WhatsApp/email nyata
- Ujian aman dengan timer server dan anti-kecurangan
- Ekspor PDF/Excel produksi
- Deployment dan domain produksi

Integrasi WhatsApp berikutnya memerlukan keputusan provider, nomor bisnis, template, opt-in, kebijakan retry, penanganan kegagalan, dan perlindungan data pribadi.

## 11. Kriteria penerimaan SOT/prototype

- [x] Aplikasi berjalan dengan `npm install` lalu `npm run dev` (atau `npm run preview`).
- [x] Build produksi lulus `npm run build` tanpa error (1618 modul ditransformasi).
- [x] Semua 10 modul memiliki entry navigasi dan tampilan khusus yang lengkap.
- [x] Dashboard memiliki ringkasan, grafik/indikator, dan daftar pendaftar.
- [x] Pencarian, filter status, modal detail, notifikasi demo, dan dark mode berfungsi.
- [x] Layout adaptif untuk viewport desktop dan mobile.
- [x] Tidak ada klaim bahwa data/gateway adalah produksi (semua bertanda simulasi/demo).
- [x] Dokumentasi SOT, roadmap RAD, katalog layar, AGENTS.md, dan prompt eksekusi tersedia.

## 12. Keputusan yang masih perlu dikonfirmasi

1. Apakah calon santri harus membuat akun sendiri atau admin juga dapat membuat akun?
2. Metode pembayaran apa yang digunakan dan apakah tahap pertama hanya unggah bukti?
3. Provider WhatsApp Gateway yang dipilih dan kebutuhan template/opt-in.
4. Formula nilai akhir dan ambang kelulusan setiap tes.
5. Kebijakan periode, gelombang, kuota, dan status transisi.
6. Kebijakan retensi dokumen, akses data pribadi, dan audit.
7. Apakah tes online perlu bank soal, randomisasi, dan aturan durasi per kategori?
8. Format resmi kartu pendaftaran, kuitansi, PDF, dan Excel.

Keputusan yang belum disetujui harus diperlakukan sebagai asumsi, bukan requirement final.
