# Arsitektur Database PostgreSQL PPDB Pondok Pesantren Darul Harumain

Repositori skema DDL (*Data Definition Language*) dan data awal (*Seed Data*) resmi berbasis **PostgreSQL (v14+)** dengan total **19 tabel utama** yang mencakup seluruh proses bisnis pendaftaran santri baru.

---

## 1. Daftar 19 Tabel Utama

| No | Nama Tabel | Deskripsi Fungsi | Modul Terkait |
|:---:|---|---|---|
| 1 | `users` | Akun kredensial login pengguna, peran wewenang, dan status aktif | Autentikasi & Hak Akses |
| 2 | `profiles` | Data identitas detail akun, kontak nomor HP, dan alamat | Profil Pengguna |
| 3 | `tahun_ajaran` | Periode pendaftaran, gelombang, tanggal buka/tutup, dan jadwal tes | Master Data & Periode |
| 4 | `jenjang_kuota` | Pilihan jenjang (MTs, MA, Tahfidz), batas usia, dan daya tampung kursi | Master Data |
| 5 | `pengaturan_sistem` | Identitas pondok, SK Kemenag, pimpinan, kontak Ka Fatkhan, dan rekening BSI | Master Data & Konfigurasi |
| 6 | `pendaftar` | Data induk calon santri, biodata, asal sekolah, orang tua/wali, dan status | Pendaftaran & Biodata |
| 7 | `dokumen_pendaftar` | Unggahan berkas wajib (KK, Akta, Ijazah/SKL, Foto, Surat Sehat) & validasi | Verifikasi & Berkas |
| 8 | `seleksi_hasil` | Nilai tes CBT, tes lisan Al-Qur'an, hafalan, dan rekomendasi halaqah/kelas | Seleksi & Pemetaan |
| 9 | `tagihan` | Invoice rincian biaya (Paket Masuk Rp 7.725.000, Daftar Ulang SMP/SMA) | Keuangan & Tagihan |
| 10 | `pembayaran` | Transaksi pembayaran, nominal, bukti transfer ke rekening BSI Ka Fatkhan | Keuangan & Kasir |
| 11 | `bank_soal` | Bank soal ujian CBT online, kategori, opsi pilihan ganda, dan kunci jawaban | Ujian CBT Online |
| 12 | `ujian_peserta` | Rekam pengerjaan dan lembar jawaban CBT calon santri | Ujian CBT Online |
| 13 | `wa_templates` | Template notifikasi WhatsApp otomatis (registrasi, bayar, jadwal tes) | WhatsApp Gateway |
| 14 | `wa_logs` | Catatan jejak pengiriman pesan gateway dan status broadcast | WhatsApp Gateway |
| 15 | `asrama_kamar` | Data gedung asrama putra/putri, lantai, nomor kamar, kapasitas, dan musyrif | Manajemen Asrama |
| 16 | `penempatan_santri` | Alokasi kamar dan nomor ranjang santri setelah melunasi pendaftaran ulang | Manajemen Asrama |
| 17 | `faq` | Frequently Asked Questions interaktif untuk calon wali santri | Helpdesk & Pusat Bantuan |
| 18 | `tiket_bantuan` | Tiket pengaduan teknis pendaftaran yang ditangani panitia internal | Helpdesk Internal |
| 19 | `pesan_chat` | Riwayat percakapan konsultasi online panitia PPDB | Live Chat Konsultasi |

---

## 2. Modul Pelaporan & Pimpinan (Tanpa Tabel Tambahan)

Sesuai rancangan sistem, **Modul Pelaporan & Pimpinan (Eksekutif)** tidak memerlukan tabel fisik baru karena datanya diagregasi secara dinamis (*real-time*) dari gabungan tabel `pendaftar`, `seleksi_hasil`, `pembayaran`, dan `penempatan_santri` melalui database VIEW resmi:

```sql
SELECT * FROM v_laporan_eksekutif;
```
View ini menyajikan ringkasan *"Data Jadi"* santri baru, capaian tes pemetaan, total realisasi penerimaan dana transfer BSI, hingga plotting kamar asrama.

---

## 3. Langkah Instalasi Skema Database

### Melalui Terminal / Command Prompt (`psql`):
```bash
# 1. Buat database
createdb -U postgres ppdb_darul_harumain

# 2. Eksekusi skema 19 tabel
psql -U postgres -d ppdb_darul_harumain -f database/schema.sql

# 3. Masukkan data awal (seed)
psql -U postgres -d ppdb_darul_harumain -f database/seed.sql
```

### Melalui Cloud Database (Supabase / Neon.tech):
1. Buka dashboard database Anda di [Supabase](https://supabase.com) atau [Neon](https://neon.tech).
2. Buka menu **SQL Editor**.
3. Buka berkas [`schema.sql`](./schema.sql), salin kodenya ke SQL Editor dan klik **Run**.
4. Buka berkas [`seed.sql`](./seed.sql), salin kodenya dan klik **Run**.
5. Seluruh 19 tabel relasional dan view laporan langsung aktif dan siap dihubungkan ke backend API.
