# Dokumentasi Database PostgreSQL — PPDB Pondok Pesantren Darul Harumain

Folder ini berisi skema DDL (*Data Definition Language*) dan data awal (*Seed Data*) resmi untuk Sistem Informasi PPDB Pondok Pesantren Darul Harumain berbasis **PostgreSQL (v14+)**.

---

## 1. Struktur Berkas
* [`schema.sql`](./schema.sql): Skema lengkap DDL mencakup ekstensi UUID, tipe ENUM, 13 tabel relasional, indeks performa, dan trigger auto-update timestamp.
* [`seed.sql`](./seed.sql): Data awal lengkap (7 peran wewenang, akun staf default ter-hash bcrypt, profil lembaga, paket biaya resmi Rp 7.725.000, rekening BSI Ka Fatkhan, gedung asrama, soal ujian CBT, dan sampel pendaftar).

---

## 2. Diagram Hubungan Entitas (ERD Ringkas)

```
[roles] 1 ──── ∞ [users]
                   │
                   ├── 1 ──── 1 [applicants] ──── 1 ──── ∞ [applicant_documents]
                   │                 │
                   │                 ├── 1 ──── ∞ [invoices] ──── 1 ──── ∞ [payment_transactions]
                   │                 ├── 1 ──── 1 [applicant_exam_results]
                   │                 └── 1 ──── 1 [dorm_placements] ──── ∞ ──── 1 [dorm_rooms]
                   │                                                                  │
                   │                                                            ∞ ──── 1 [dorm_buildings]
                   └── 1 ──── ∞ [audit_logs]
```

---

## 3. Cara Menjalankan Skema

### Opsi A: Menggunakan PostgreSQL Lokal (`psql`)
1. Buka terminal / command prompt.
2. Buat database baru:
   ```bash
   createdb -U postgres ppdb_darul_harumain
   ```
3. Eksekusi berkas `schema.sql`:
   ```bash
   psql -U postgres -d ppdb_darul_harumain -f database/schema.sql
   ```
4. Masukkan data awal (*seed data*):
   ```bash
   psql -U postgres -d ppdb_darul_harumain -f database/seed.sql
   ```

---

### Opsi B: Menggunakan Docker Compose
Buat berkas `docker-compose.yml` di luar folder atau jalankan container cepat:
```bash
docker run --name pg-darulharumain \
  -e POSTGRES_DB=ppdb_darul_harumain \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:15-alpine
```
Lalu jalankan import:
```bash
docker exec -i pg-darulharumain psql -U postgres -d ppdb_darul_harumain < database/schema.sql
docker exec -i pg-darulharumain psql -U postgres -d ppdb_darul_harumain < database/seed.sql
```

---

### Opsi C: Menggunakan Database Cloud Gratis (Supabase / Neon / Railway)
1. Buat proyek baru di [Supabase](https://supabase.com) atau [Neon.tech](https://neon.tech).
2. Buka menu **SQL Editor**.
3. Salin seluruh isi [`schema.sql`](./schema.sql), lalu klik tombol **Run**.
4. Salin seluruh isi [`seed.sql`](./seed.sql), lalu klik tombol **Run**.

---

## 4. Kredensial Default Staf (Seed Data)
| Peran | Email | Kata Sandi Default |
|---|---|---|
| Super Admin | `admin@darulharumain.sch.id` | `admin123` |
| Verifikator Berkas | `verifikator@darulharumain.sch.id` | `verifikator123` |
| Bendahara PPDB | `bendahara@darulharumain.sch.id` | `bendahara123` |
| Penguji Seleksi | `penguji@darulharumain.sch.id` | `penguji123` |
| Pengelola Asrama | `asrama@darulharumain.sch.id` | `asrama123` |
| Pimpinan (Mudir) | `pimpinan@darulharumain.sch.id` | `pimpinan123` |
| Calon Santri Demo | `santri@darulharumain.sch.id` | `santri123` |
