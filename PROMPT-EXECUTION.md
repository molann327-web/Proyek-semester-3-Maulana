# Prompt Execution — Proyek Awal PPDB Darul Harumain

Anda adalah senior front-end engineer dan UI/UX engineer. Bangun front-end Sistem Informasi Pendaftaran Santri Baru Pondok Pesantren Darul Harumain menggunakan React + Vite + Tailwind CSS, sesuai `AGENTS.md` dan `docs/SOT.md`.

## Konteks
- Metode pengembangan: RAD.
- Prioritas: front-end saja, memakai data dummy.
- Brand utama: `#689D4B`.
- Gaya: Modern Clean & Structured Layout, geometris, gradasi modern secukupnya, dark mode, responsif.
- Modul: Autentikasi & Profil; Pendaftaran & Dokumen; Verifikasi & Seleksi; Keuangan & Pembayaran; Pelaporan & Pimpinan; Master Data & Pengaturan; Tes & Ujian Online; Notifikasi WhatsApp/Email Gateway; Asrama & Ke-santrian; Helpdesk & Live Chat/FAQ.

## Instruksi eksekusi
1. Baca `AGENTS.md`, `docs/SOT.md`, `docs/SCREEN-CATALOG.md`, dan `docs/ROADMAP-RAD.md` terlebih dahulu.
2. Pertahankan scope front-end; jangan membuat backend, database, API, pembayaran nyata, atau mengirim WhatsApp/email.
3. Audit struktur project dan jalankan aplikasi/build sebelum mengubahnya.
4. Pecah UI menjadi komponen reusable: AppShell, Sidebar, Header, StatCard, StatusBadge, DataTable, FilterBar, Modal/Drawer, EmptyState, dan form fields.
5. Lengkapi layar Autentikasi & Profil yang belum menjadi halaman tersendiri: registrasi, login, reset kata sandi, ubah kata sandi, profil, manajemen akun/role. Semua aksi tetap simulasi.
6. Bangun alur pendaftaran dengan form bertahap, validasi sisi klien, status kelengkapan, upload mock, nomor pendaftaran mock, dan preview kartu.
7. Lengkapi verifikasi/seleksi, pembayaran, laporan, master data, tes online, notifikasi gateway, asrama, dan helpdesk sesuai SOT.
8. Untuk fitur WhatsApp, buat daftar template, preview pesan, antrean, status simulasi, dan catatan integrasi; jangan mengirim pesan nyata.
9. Sediakan loading, empty, success, error, dan disabled states jika relevan.
10. Pastikan semua interaksi yang terlihat berfungsi dan memberi umpan balik.
11. Jalankan `npm run build`; laporkan hasil sebenarnya dan perbaiki error.
12. Perbarui katalog layar dan SOT bila keputusan yang telah disetujui berubah.

## Output yang diminta
- Source code yang dapat dijalankan.
- UI responsif, light/dark mode.
- Data dummy yang terisolasi dari komponen presentasi.
- Dokumentasi perubahan dan instruksi run.
- Daftar asumsi/pertanyaan terbuka.
- Ringkasan pengujian dengan perintah dan hasil yang benar-benar dijalankan.

## Jangan
- Jangan mengarang requirement bisnis yang belum diputuskan.
- Jangan mengklaim integrasi nyata.
- Jangan menambahkan fitur di luar SOT.
- Jangan membocorkan secret atau memakai data pribadi sungguhan.
