-- ==============================================================================
-- SISTEM INFORMASI PPDB PONDOK PESANTREN DARUL HARUMAIN BOGOR
-- SCHEMA DATABASE RESMI POSTGRESQL (19 TABEL UTAMA)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUM TYPES
CREATE TYPE role_pengguna_enum AS ENUM (
  'admin',          -- Super Admin PPDB
  'verifikator',    -- Panitia Verifikasi Berkas
  'bendahara',      -- Bendahara Keuangan
  'penguji',        -- Penguji Tes CBT & Tahfidz Al-Qur'an
  'pengelola_asrama',-- Pengelola Gedung & Kamar Asrama
  'pimpinan',       -- Mudir Ma'had / Pimpinan Pesantren
  'calon_santri'    -- Calon Santri / Wali Santri
);

CREATE TYPE jenis_kelamin_enum AS ENUM ('putra', 'putri');

CREATE TYPE status_pendaftar_enum AS ENUM (
  'Draft',
  'Menunggu Verifikasi',
  'Perlu Perbaikan',
  'Terverifikasi',
  'Ditolak'
);

CREATE TYPE jenis_dokumen_enum AS ENUM (
  'kk',
  'akta',
  'ijazah_skl',
  'pas_foto',
  'surat_sehat',
  'sertifikat_prestasi'
);

CREATE TYPE status_dokumen_enum AS ENUM (
  'Belum Diunggah',
  'Menunggu Validasi',
  'Valid',
  'Perlu Perbaikan'
);

CREATE TYPE status_bayar_enum AS ENUM (
  'Belum Bayar',
  'Menunggu Verifikasi',
  'Lunas',
  'Ditolak'
);

CREATE TYPE status_tiket_enum AS ENUM (
  'Menunggu Tanggapan',
  'Sedang Diproses',
  'Selesai',
  'Ditutup'
);

CREATE TYPE prioritas_tiket_enum AS ENUM ('Rendah', 'Normal', 'Tinggi');

-- ==============================================================================
-- TABEL 1: users (Akun Pengguna & Kredensial Login)
-- ==============================================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role role_pengguna_enum NOT NULL DEFAULT 'calon_santri',
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ==============================================================================
-- TABEL 2: profiles (Profil Detail Pengguna & Kontak)
-- ==============================================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  nama_lengkap VARCHAR(150) NOT NULL,
  no_hp VARCHAR(30),
  alamat TEXT,
  avatar_url TEXT,
  avatar_initials VARCHAR(4),
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_profiles_user ON profiles(user_id);

-- ==============================================================================
-- TABEL 3: tahun_ajaran (Gelombang & Periode Pendaftaran)
-- ==============================================================================
CREATE TABLE tahun_ajaran (
  id VARCHAR(20) PRIMARY KEY, -- Contoh: 'TA-2027-G1'
  nama VARCHAR(100) NOT NULL, -- 'Tahun Pelajaran 2027 / 2028'
  gelombang VARCHAR(50) NOT NULL, -- 'Gelombang 1 (Reguler & Prestasi)'
  tanggal_buka DATE NOT NULL,
  tanggal_tutup DATE NOT NULL,
  tanggal_ujian VARCHAR(100), -- '06 - 08 Desember 2026'
  status_aktif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- TABEL 4: jenjang_kuota (Program Pendidikan & Kapasitas Kursi)
-- ==============================================================================
CREATE TABLE jenjang_kuota (
  id VARCHAR(20) PRIMARY KEY, -- 'JK-MTS', 'JK-MA', 'JK-TAHFIDZ'
  tahun_ajaran_id VARCHAR(20) NOT NULL REFERENCES tahun_ajaran(id) ON DELETE CASCADE,
  nama_jenjang VARCHAR(150) NOT NULL, -- 'Madrasah Tsanawiyah (SMP/MTs)'
  kuota_total INT NOT NULL DEFAULT 60,
  kuota_terisi INT NOT NULL DEFAULT 0,
  usia_min INT DEFAULT 12,
  usia_max INT DEFAULT 18,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- TABEL 5: pengaturan_sistem (Identitas Pesantren & Rekening Resmi PPDB)
-- ==============================================================================
CREATE TABLE pengaturan_sistem (
  id SERIAL PRIMARY KEY,
  nama_pesantren VARCHAR(200) NOT NULL,
  motto TEXT,
  sk_kemenag VARCHAR(100),
  nisp VARCHAR(50),
  alamat TEXT NOT NULL,
  no_telp VARCHAR(50),
  email VARCHAR(150),
  pimpinan VARCHAR(150),
  ketua_panitia VARCHAR(150), -- Ka Fatkhan
  nama_bank VARCHAR(100) DEFAULT 'Bank Syariah Indonesia (BSI)',
  no_rekening VARCHAR(50) DEFAULT '7335153493',
  atas_nama_rekening VARCHAR(150) DEFAULT 'Fatkhan (Ketua Panitia PSB)',
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- TABEL 6: pendaftar (Data Induk Calon Santri & Wali)
-- ==============================================================================
CREATE TABLE pendaftar (
  id VARCHAR(30) PRIMARY KEY, -- Contoh: 'DH-2026-00128'
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  tahun_ajaran_id VARCHAR(20) REFERENCES tahun_ajaran(id),
  jenjang_kuota_id VARCHAR(20) REFERENCES jenjang_kuota(id),
  
  -- Data Calon Santri
  nama_lengkap VARCHAR(150) NOT NULL,
  jenis_kelamin jenis_kelamin_enum NOT NULL,
  nisn VARCHAR(20),
  nik VARCHAR(20),
  tempat_lahir VARCHAR(100),
  tanggal_lahir DATE,
  asal_sekolah VARCHAR(150),

  -- Data Orang Tua / Wali
  nama_ayah VARCHAR(150),
  pekerjaan_ayah VARCHAR(100),
  nama_ibu VARCHAR(150),
  pekerjaan_ibu VARCHAR(100),
  no_hp_ortu VARCHAR(30),

  -- Status Seleksi & Alur PPDB
  status_verifikasi status_pendaftar_enum DEFAULT 'Draft',
  catatan_verifikasi TEXT,
  diverifikasi_oleh UUID REFERENCES users(id),
  diverifikasi_pada TIMESTAMPTZ,
  
  status_daftar_ulang status_bayar_enum DEFAULT 'Belum Bayar',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pendaftar_user ON pendaftar(user_id);
CREATE INDEX idx_pendaftar_status ON pendaftar(status_verifikasi);
CREATE INDEX idx_pendaftar_gender ON pendaftar(jenis_kelamin);

-- ==============================================================================
-- TABEL 7: dokumen_pendaftar (Unggahan Berkas Persyaratan)
-- ==============================================================================
CREATE TABLE dokumen_pendaftar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pendaftar_id VARCHAR(30) NOT NULL REFERENCES pendaftar(id) ON DELETE CASCADE,
  jenis_dokumen jenis_dokumen_enum NOT NULL,
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  status_validasi status_dokumen_enum DEFAULT 'Menunggu Validasi',
  catatan_perbaikan TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES users(id),
  CONSTRAINT uq_dokumen_santri UNIQUE (pendaftar_id, jenis_dokumen)
);

CREATE INDEX idx_dokumen_pendaftar ON dokumen_pendaftar(pendaftar_id);

-- ==============================================================================
-- TABEL 8: seleksi_hasil (Hasil Ujian CBT & Tes Pemetaan Kemampuan)
-- ==============================================================================
CREATE TABLE seleksi_hasil (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pendaftar_id VARCHAR(30) NOT NULL REFERENCES pendaftar(id) ON DELETE CASCADE,
  
  -- Nilai Tes Pemetaan (Bukan Eliminasi)
  nilai_cbt NUMERIC(5, 2) DEFAULT 0,
  nilai_quran_tajwid NUMERIC(5, 2) DEFAULT 0,
  nilai_quran_hafalan NUMERIC(5, 2) DEFAULT 0,
  juz_hafalan VARCHAR(50) DEFAULT 'Juz 30 sebagian',
  nilai_wawancara NUMERIC(5, 2) DEFAULT 0,
  nilai_akhir NUMERIC(5, 2) DEFAULT 0,
  
  rekomendasi_kelas VARCHAR(150), -- 'Halaqah Tahfidz Intensif', 'Reguler Kelas A'
  catatan_penguji TEXT,
  dinilai_oleh UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_seleksi_santri UNIQUE (pendaftar_id)
);

CREATE INDEX idx_seleksi_pendaftar ON seleksi_hasil(pendaftar_id);

-- ==============================================================================
-- TABEL 9: tagihan (Invoice Pembayaran: Paket 7.725jt, Daftar Ulang, dll.)
-- ==============================================================================
CREATE TABLE tagihan (
  id VARCHAR(40) PRIMARY KEY, -- 'INV-2026-00412'
  pendaftar_id VARCHAR(30) NOT NULL REFERENCES pendaftar(id) ON DELETE CASCADE,
  jenis_tagihan VARCHAR(100) NOT NULL, -- 'Paket Masuk Pendaftaran', 'Pendaftaran Ulang SMP'
  total_tagihan NUMERIC(12, 2) NOT NULL,
  total_dibayar NUMERIC(12, 2) DEFAULT 0,
  sisa_tagihan NUMERIC(12, 2) NOT NULL,
  status_bayar status_bayar_enum DEFAULT 'Belum Bayar',
  tanggal_jatuh_tempo DATE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tagihan_pendaftar ON tagihan(pendaftar_id);

-- ==============================================================================
-- TABEL 10: pembayaran (Transaksi & Bukti Transfer Pembayaran Resmi)
-- ==============================================================================
CREATE TABLE pembayaran (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tagihan_id VARCHAR(40) NOT NULL REFERENCES tagihan(id) ON DELETE CASCADE,
  pendaftar_id VARCHAR(30) NOT NULL REFERENCES pendaftar(id) ON DELETE CASCADE,
  nominal NUMERIC(12, 2) NOT NULL,
  metode_bayar VARCHAR(50) DEFAULT 'Transfer BSI',
  nama_bank VARCHAR(100) DEFAULT 'Bank Syariah Indonesia (BSI)',
  no_rekening VARCHAR(50) DEFAULT '7335153493',
  bukti_transfer_url TEXT NOT NULL,
  status_verifikasi status_bayar_enum DEFAULT 'Menunggu Verifikasi',
  diverifikasi_oleh UUID REFERENCES users(id),
  catatan TEXT,
  tanggal_bayar TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pembayaran_tagihan ON pembayaran(tagihan_id);

-- ==============================================================================
-- TABEL 11: bank_soal (Koleksi Soal Ujian CBT Online)
-- ==============================================================================
CREATE TABLE bank_soal (
  id SERIAL PRIMARY KEY,
  kategori VARCHAR(100) NOT NULL, -- 'Pengetahuan Al-Qur\'an', 'Agama Islam', 'Bahasa Arab'
  pertanyaan TEXT NOT NULL,
  pilihan_jawaban JSONB NOT NULL, -- ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"]
  kunci_jawaban INT NOT NULL, -- Indeks 0..3
  bobot_nilai NUMERIC(5, 2) DEFAULT 10.0,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- TABEL 12: ujian_peserta (Pengerjaan Jawaban CBT oleh Calon Santri)
-- ==============================================================================
CREATE TABLE ujian_peserta (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pendaftar_id VARCHAR(30) NOT NULL REFERENCES pendaftar(id) ON DELETE CASCADE,
  bank_soal_id INT NOT NULL REFERENCES bank_soal(id) ON DELETE CASCADE,
  jawaban_peserta INT, -- 0..3
  apakah_benar BOOLEAN DEFAULT FALSE,
  waktu_jawab TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_peserta_soal UNIQUE (pendaftar_id, bank_soal_id)
);

CREATE INDEX idx_ujian_pendaftar ON ujian_peserta(pendaftar_id);

-- ==============================================================================
-- TABEL 13: wa_templates (Template Pesan WhatsApp Gateway Otomatis)
-- ==============================================================================
CREATE TABLE wa_templates (
  id VARCHAR(30) PRIMARY KEY, -- 'WA-REG-SUCCESS', 'WA-PAY-VALID'
  kode_template VARCHAR(50) UNIQUE NOT NULL,
  judul VARCHAR(150) NOT NULL,
  pesan_template TEXT NOT NULL,
  variabel_tersedia JSONB DEFAULT '["nama_santri", "no_daftar", "status"]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- TABEL 14: wa_logs (Riwayat Pengiriman Pesan WhatsApp)
-- ==============================================================================
CREATE TABLE wa_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pendaftar_id VARCHAR(30) REFERENCES pendaftar(id) ON DELETE SET NULL,
  no_tujuan VARCHAR(30) NOT NULL,
  pesan TEXT NOT NULL,
  status_kirim VARCHAR(30) DEFAULT 'Terkirim',
  response_gateway TEXT,
  waktu_kirim TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wa_logs_pendaftar ON wa_logs(pendaftar_id);

-- ==============================================================================
-- TABEL 15: asrama_kamar (Gedung, Lantai, & Kamar Asrama)
-- ==============================================================================
CREATE TABLE asrama_kamar (
  id VARCHAR(20) PRIMARY KEY, -- 'K-A101', 'K-B102'
  nama_gedung VARCHAR(150) NOT NULL, -- 'Asrama Putra - Gedung Al-Farabi'
  jenis_gender jenis_kelamin_enum NOT NULL,
  no_kamar VARCHAR(20) NOT NULL,
  lantai INT DEFAULT 1,
  kapasitas INT NOT NULL DEFAULT 4,
  terisi INT NOT NULL DEFAULT 0,
  status_kamar VARCHAR(30) DEFAULT 'Tersedia', -- 'Penuh', 'Tersedia 1'
  nama_musyrif VARCHAR(150),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- TABEL 16: penempatan_santri (Alokasi Ranjang Santri di Asrama)
-- ==============================================================================
CREATE TABLE penempatan_santri (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pendaftar_id VARCHAR(30) NOT NULL REFERENCES pendaftar(id) ON DELETE CASCADE,
  kamar_id VARCHAR(20) NOT NULL REFERENCES asrama_kamar(id) ON DELETE RESTRICT,
  no_ranjang INT DEFAULT 1,
  tanggal_penempatan TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  dicatat_oleh UUID REFERENCES users(id),
  catatan TEXT,
  CONSTRAINT uq_penempatan_santri UNIQUE (pendaftar_id)
);

CREATE INDEX idx_penempatan_kamar ON penempatan_santri(kamar_id);

-- ==============================================================================
-- TABEL 17: faq (Frequently Asked Questions untuk Calon Wali Santri)
-- ==============================================================================
CREATE TABLE faq (
  id SERIAL PRIMARY KEY,
  kategori VARCHAR(100) NOT NULL, -- 'Persyaratan & Berkas', 'Biaya & Pembayaran', dll.
  pertanyaan TEXT NOT NULL,
  jawaban TEXT NOT NULL,
  urutan INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- TABEL 18: tiket_bantuan (Tiket Pengaduan & Konsultasi Internal)
-- ==============================================================================
CREATE TABLE tiket_bantuan (
  id VARCHAR(30) PRIMARY KEY, -- 'TCK-201'
  pendaftar_id VARCHAR(30) REFERENCES pendaftar(id) ON DELETE SET NULL,
  nama_pengaju VARCHAR(150) NOT NULL,
  kategori VARCHAR(100) NOT NULL,
  subjek VARCHAR(200) NOT NULL,
  pesan TEXT NOT NULL,
  status status_tiket_enum DEFAULT 'Menunggu Tanggapan',
  prioritas prioritas_tiket_enum DEFAULT 'Normal',
  ditangani_oleh UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  selesai_at TIMESTAMPTZ
);

-- ==============================================================================
-- TABEL 19: pesan_chat (Riwayat Live Chat Konsultasi Panitia)
-- ==============================================================================
CREATE TABLE pesan_chat (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(100),
  pengirim_tipe VARCHAR(20) NOT NULL, -- 'user', 'staff', 'system'
  nama_pengirim VARCHAR(150),
  isi_pesan TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- VIEW KHUSUS: v_laporan_eksekutif
-- (Sesuai catatan: Modul Pelaporan & Pimpinan tidak perlu tabel baru,
--  datanya diagregasi langsung dari: pendaftar, seleksi_hasil, dan pembayaran)
-- ==============================================================================
CREATE OR REPLACE VIEW v_laporan_eksekutif AS
SELECT
  p.id AS no_pendaftaran,
  p.nama_lengkap,
  p.jenis_kelamin,
  p.asal_sekolah,
  jk.nama_jenjang,
  ta.gelombang,
  p.status_verifikasi,
  p.status_daftar_ulang,
  
  -- Data Hasil Seleksi
  sh.nilai_cbt,
  sh.nilai_quran_tajwid,
  sh.nilai_quran_hafalan,
  sh.nilai_akhir,
  sh.rekomendasi_kelas,
  
  -- Agregasi Total Pembayaran Masuk
  COALESCE(SUM(pm.nominal) FILTER (WHERE pm.status_verifikasi = 'Lunas'), 0) AS total_dana_masuk,
  
  -- Status Penempatan Kamar
  ak.nama_gedung,
  ak.no_kamar,
  ps.no_ranjang,
  
  p.created_at AS tanggal_daftar
FROM pendaftar p
LEFT JOIN jenjang_kuota jk ON p.jenjang_kuota_id = jk.id
LEFT JOIN tahun_ajaran ta ON p.tahun_ajaran_id = ta.id
LEFT JOIN seleksi_hasil sh ON p.id = sh.pendaftar_id
LEFT JOIN pembayaran pm ON p.id = pm.pendaftar_id
LEFT JOIN penempatan_santri ps ON p.id = ps.pendaftar_id
LEFT JOIN asrama_kamar ak ON ps.kamar_id = ak.id
GROUP BY
  p.id, p.nama_lengkap, p.jenis_kelamin, p.asal_sekolah, jk.nama_jenjang, ta.gelombang,
  p.status_verifikasi, p.status_daftar_ulang, sh.nilai_cbt, sh.nilai_quran_tajwid,
  sh.nilai_quran_hafalan, sh.nilai_akhir, sh.rekomendasi_kelas, ak.nama_gedung,
  ak.no_kamar, ps.no_ranjang, p.created_at;

-- ==============================================================================
-- TRIGGERS UNTUK AUTO-UPDATE 'updated_at'
-- ==============================================================================
CREATE OR REPLACE FUNCTION update_timestamp_otomatis()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER trg_users_upd BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_timestamp_otomatis();
CREATE TRIGGER trg_profiles_upd BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_timestamp_otomatis();
CREATE TRIGGER trg_pendaftar_upd BEFORE UPDATE ON pendaftar FOR EACH ROW EXECUTE FUNCTION update_timestamp_otomatis();
CREATE TRIGGER trg_tagihan_upd BEFORE UPDATE ON tagihan FOR EACH ROW EXECUTE FUNCTION update_timestamp_otomatis();
CREATE TRIGGER trg_pengaturan_upd BEFORE UPDATE ON pengaturan_sistem FOR EACH ROW EXECUTE FUNCTION update_timestamp_otomatis();
