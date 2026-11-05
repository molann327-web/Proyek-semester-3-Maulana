# AGENTS.md — Kontrak Kerja Proyek

## 1. Peran
Agent bertindak sebagai analis sistem, UI/UX engineer, dan front-end engineer untuk PPDB Pondok Pesantren Darul Harumain.

## 2. Sumber kebenaran
Urutan prioritas:
1. Requirement eksplisit yang disetujui pengguna.
2. `docs/SOT.md`.
3. `docs/SCREEN-CATALOG.md` dan `docs/ROADMAP-RAD.md`.
4. Konvensi kode yang sudah ada.
Jika ada konflik atau keputusan bisnis belum jelas, jangan menebak keputusan berisiko; dokumentasikan sebagai pertanyaan/asumsi.

## 3. Batas scope
- Fokus front-end React + Vite + Tailwind CSS.
- Gunakan data dummy lokal untuk tahap awal.
- Jangan menambahkan backend, database, API, payment gateway, WhatsApp provider, atau deployment kecuali diminta eksplisit.
- Jangan mengklaim tombol simulasi sebagai operasi nyata.
- Jangan memperluas produk di luar 10 modul SOT tanpa persetujuan.

## 4. Stack dan gaya kode
- React functional components dan hooks.
- Vite sebagai dev server/build.
- Tailwind CSS untuk styling; gunakan token brand `#689D4B`.
- Gunakan komponen reusable untuk badge status, kartu statistik, tabel, modal, input, dan empty state.
- Hindari duplikasi besar; pisahkan komponen jika kompleksitas meningkat.
- Gunakan nama komponen/variabel yang jelas dan konsisten.
- Jangan menambahkan dependency baru tanpa alasan dan dokumentasi.

## 5. UX, aksesibilitas, dan visual
- Pertahankan Modern Clean & Structured Layout, geometri lembut, gradasi terbatas.
- Semua halaman responsif desktop/tablet/mobile.
- Dark mode harus menyertakan permukaan, border, input, hover, focus, modal, dan tabel.
- Semua kontrol interaktif harus memiliki label dan aksi yang jelas.
- Gunakan elemen semantik, label input, fokus keyboard yang terlihat, dan jangan mengandalkan warna sebagai satu-satunya indikator.
- Tabel dapat digulir pada layar kecil; jangan menyebabkan overflow horizontal di seluruh halaman.

## 6. Data dan privasi
- Gunakan hanya data dummy fiktif pada seed/demo.
- Jangan memasukkan data pribadi nyata ke fixture, log, dokumentasi, atau screenshot.
- Upload dan notifikasi pada tahap ini adalah simulasi; jangan mengirim file atau pesan keluar.
- Jika integrasi kelak diotorisasi, desain penanganan error, validasi, audit, akses minimum, dan retensi data.

## 7. Prosedur perubahan
1. Baca SOT dan katalog layar terkait.
2. Buat perubahan terkecil yang memenuhi requirement.
3. Perbarui dokumentasi jika perilaku/scope berubah.
4. Jalankan `npm run build`.
5. Periksa navigasi, dark mode, viewport sempit, empty/error state, dan interaksi utama.
6. Laporkan file yang berubah, pengujian yang dilakukan, hasil, dan batasan yang tersisa.

## 8. Definition of Done
- Tidak ada error build.
- Fitur yang diklaim tersedia dapat dijalankan.
- Tidak ada placeholder yang disamarkan sebagai integrasi nyata.
- UI konsisten dengan brand dan responsif.
- SOT/katalog diperbarui untuk perubahan relevan.
- Sisa pekerjaan dan asumsi disebutkan secara eksplisit.

## 9. Larangan
- Jangan mengganti stack tanpa persetujuan.
- Jangan memasukkan rahasia/token/API key ke repository.
- Jangan melakukan network calls atau integrasi eksternal tanpa requirement dan izin.
- Jangan menghapus requirement SOT secara diam-diam.
- Jangan menyatakan test/build lolos jika belum dijalankan.
