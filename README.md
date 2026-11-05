# PPDB Darul Harumain — SOT & Front-end Starter

Prototype Sistem Informasi Pendaftaran Santri Baru berbasis React + Vite + Tailwind CSS, dengan brand `#689D4B`, dark mode, dan data dummy.

## Jalankan lokal

Persyaratan: Node.js 20+ dan npm.

```bash
npm install
npm run dev
```

Buka URL lokal yang ditampilkan Vite. Untuk memeriksa build produksi:

```bash
npm run build
npm run preview
```

## Isi paket

- `src/`: dashboard dan tampilan modul interaktif (prototype)
- `docs/SOT.md`: sumber kebenaran kebutuhan, cakupan, alur, dan acceptance criteria
- `docs/SCREEN-CATALOG.md`: katalog tampilan/preview modul
- `docs/ROADMAP-RAD.md`: tahapan RAD dan timeline indikatif
- `AGENTS.md`: kontrak kerja agent/developer
- `PROMPT-EXECUTION.md`: prompt eksekusi proyek awal

## Status

SOT dan prototype UI awal, bukan aplikasi produksi. Data dummy dan tindakan UI bersifat simulasi. Tidak ada API, database, autentikasi, unggah dokumen persisten, ekspor file aktual, atau pesan WhatsApp/email nyata.

## Keputusan implementasi

- Front-end terlebih dahulu; backend tidak termasuk dalam baseline ini.
- Semua nama, angka, nomor pendaftaran, dan aktivitas pada UI adalah data contoh.
- WhatsApp Gateway hanya divisualisasikan sebagai antrean/template; tidak mengirim pesan.
- Integrasi berikutnya harus memakai adaptor gateway resmi/provider yang dipilih, persetujuan penerima, template yang sesuai, dan pencatatan status delivery.
