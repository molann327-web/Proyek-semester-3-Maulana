-- ==============================================================================
-- SISTEM INFORMASI PPDB PONDOK PESANTREN DARUL HARUMAIN BOGOR
-- SCHEMA DATABASE RESMI - POSTGRESQL (v14+)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUM TYPES
CREATE TYPE user_role_enum AS ENUM (
  'admin',          -- Super Admin PPDB
  'verifier',       -- Panitia Verifikasi Dokumen
  'treasurer',      -- Bendahara Keuangan
  'examiner',       -- Penguji Tes CBT & Tahfidz Al-Qur'an
  'dorm_officer',   -- Pengelola Asrama & Kamar
  'executive',      -- Pimpinan / Mudir Ma'had
  'applicant'       -- Calon Santri / Wali Santri
);

CREATE TYPE gender_enum AS ENUM ('putra', 'putri');

CREATE TYPE applicant_status_enum AS ENUM (
  'Draft',
  'Menunggu Verifikasi',
  'Perlu Perbaikan',
  'Terverifikasi',
  'Ditolak'
);

CREATE TYPE doc_type_enum AS ENUM (
  'kk',
  'akta',
  'ijazah_skl',
  'pas_foto',
  'surat_sehat',
  'sertifikat_prestasi'
);

CREATE TYPE doc_status_enum AS ENUM (
  'Belum Diunggah',
  'Menunggu Validasi',
  'Valid',
  'Perlu Perbaikan'
);

CREATE TYPE payment_status_enum AS ENUM (
  'Belum Bayar',
  'Menunggu Verifikasi',
  'Lunas',
  'Ditolak'
);

CREATE TYPE fee_category_enum AS ENUM (
  'formulir',
  'uang_pangkal',
  'infak_bangunan',
  'syahriah_juli',
  'daftar_ulang_smp',
  'daftar_ulang_sma',
  'perlengkapan_kasur',
  'perlengkapan_kitab',
  'perlengkapan_seragam'
);

CREATE TYPE ticket_status_enum AS ENUM (
  'Menunggu Tanggapan',
  'Sedang Diproses',
  'Selesai',
  'Ditutup'
);

CREATE TYPE ticket_priority_enum AS ENUM ('Rendah', 'Normal', 'Tinggi');

-- ==============================================================================
-- 3. TABEL HAK AKSES & PENGGUNA (USERS & ROLES)
-- ==============================================================================
CREATE TABLE roles (
  id VARCHAR(32) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  permissions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(30),
  role_id VARCHAR(32) NOT NULL REFERENCES roles(id) ON UPDATE CASCADE,
  avatar_initials VARCHAR(4),
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role_id);

-- ==============================================================================
-- 4. MASTER DATA (IDENTITAS PESANTREN, GELOMBANG, & PROGRAM)
-- ==============================================================================
CREATE TABLE pesantren_identity (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  motto TEXT,
  nisp VARCHAR(50),
  sk_kemenag VARCHAR(100),
  address TEXT NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(150),
  website VARCHAR(150),
  headmaster VARCHAR(150),
  ppdb_chairman VARCHAR(150),
  bank_name VARCHAR(100) DEFAULT 'Bank Syariah Indonesia (BSI)',
  bank_account_number VARCHAR(50) DEFAULT '7335153493',
  bank_account_name VARCHAR(150) DEFAULT 'Fatkhan (Ketua Panitia PSB)',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE registration_waves (
  id VARCHAR(20) PRIMARY KEY, -- misal 'W-01', 'W-02'
  name VARCHAR(150) NOT NULL,
  academic_year VARCHAR(30) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  exam_date_info VARCHAR(100),
  quota INT NOT NULL DEFAULT 100,
  filled INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE education_programs (
  id VARCHAR(20) PRIMARY KEY, -- 'P-01', 'P-02', 'P-03'
  name VARCHAR(150) NOT NULL,
  level VARCHAR(50) NOT NULL, -- 'SMP/MTs', 'SMA/MA'
  duration VARCHAR(50) DEFAULT '3 Tahun',
  quota INT NOT NULL DEFAULT 60,
  min_age INT DEFAULT 12,
  max_age INT DEFAULT 18,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE document_requirements (
  id VARCHAR(20) PRIMARY KEY, -- 'DOC-01'
  doc_type doc_type_enum NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  is_required BOOLEAN DEFAULT TRUE,
  allowed_formats VARCHAR(100) DEFAULT 'PDF, JPG, PNG',
  max_size_mb INT DEFAULT 2,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 5. TABEL UTAMA PENDAFTAR (APPLICANTS)
-- ==============================================================================
CREATE TABLE applicants (
  id VARCHAR(30) PRIMARY KEY, -- Contoh: 'DH-2026-00128'
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  wave_id VARCHAR(20) REFERENCES registration_waves(id),
  program_id VARCHAR(20) REFERENCES education_programs(id),
  
  -- Data Diri Santri
  full_name VARCHAR(150) NOT NULL,
  nickname VARCHAR(50),
  nisn VARCHAR(20),
  nik VARCHAR(20),
  gender gender_enum NOT NULL,
  birth_place VARCHAR(100),
  birth_date DATE,
  child_number INT,
  total_siblings INT,
  phone VARCHAR(30),
  email VARCHAR(150),
  address TEXT,
  city VARCHAR(100),
  province VARCHAR(100),
  postal_code VARCHAR(10),

  -- Data Asal Sekolah
  previous_school VARCHAR(150),
  npsn_school VARCHAR(20),
  graduation_year INT,

  -- Data Orang Tua / Wali
  father_name VARCHAR(150),
  father_nik VARCHAR(20),
  father_job VARCHAR(100),
  father_income VARCHAR(50),
  mother_name VARCHAR(150),
  mother_nik VARCHAR(20),
  mother_job VARCHAR(100),
  parent_phone VARCHAR(30),
  guardian_name VARCHAR(150),
  guardian_phone VARCHAR(30),

  -- Status & Progres Pendaftaran
  status applicant_status_enum DEFAULT 'Draft',
  is_documents_complete BOOLEAN DEFAULT FALSE,
  is_documents_verified BOOLEAN DEFAULT FALSE,
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMPTZ,
  verification_notes TEXT,

  is_exam_completed BOOLEAN DEFAULT FALSE,
  is_reregistered BOOLEAN DEFAULT FALSE,
  reregistered_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_applicants_status ON applicants(status);
CREATE INDEX idx_applicants_gender ON applicants(gender);
CREATE INDEX idx_applicants_wave ON applicants(wave_id);
CREATE INDEX idx_applicants_program ON applicants(program_id);

-- ==============================================================================
-- 6. BERKAS DOKUMEN PENDAFTAR (DOCUMENTS)
-- ==============================================================================
CREATE TABLE applicant_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id VARCHAR(30) NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
  doc_type doc_type_enum NOT NULL,
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size_kb INT,
  status doc_status_enum DEFAULT 'Menunggu Validasi',
  verifier_notes TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES users(id),
  CONSTRAINT uq_applicant_doc UNIQUE (applicant_id, doc_type)
);

CREATE INDEX idx_applicant_docs_applicant ON applicant_documents(applicant_id);

-- ==============================================================================
-- 7. KEUANGAN & PEMBAYARAN (FINANCES, INVOICES, & TRANSACTIONS)
-- ==============================================================================
CREATE TABLE fee_items (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category fee_category_enum NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  description TEXT,
  is_mandatory BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoices (
  id VARCHAR(40) PRIMARY KEY, -- 'INV-2026-00412'
  applicant_id VARCHAR(30) NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
  title VARCHAR(150) NOT NULL,
  total_amount NUMERIC(12, 2) NOT NULL,
  paid_amount NUMERIC(12, 2) DEFAULT 0,
  status payment_status_enum DEFAULT 'Belum Bayar',
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id VARCHAR(40) NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  fee_item_id VARCHAR(20) REFERENCES fee_items(id),
  name VARCHAR(150) NOT NULL,
  amount NUMERIC(12, 2) NOT NULL
);

CREATE TABLE payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id VARCHAR(40) NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  applicant_id VARCHAR(30) NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
  amount NUMERIC(12, 2) NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'Transfer BSI',
  bank_name VARCHAR(100) DEFAULT 'Bank Syariah Indonesia (BSI)',
  account_number VARCHAR(50) DEFAULT '7335153493',
  account_holder VARCHAR(150) DEFAULT 'Fatkhan (Ketua Panitia PSB)',
  proof_file_url TEXT NOT NULL,
  proof_file_name VARCHAR(255),
  status payment_status_enum DEFAULT 'Menunggu Verifikasi',
  notes TEXT,
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_invoices_applicant ON invoices(applicant_id);
CREATE INDEX idx_payments_invoice ON payment_transactions(invoice_id);

-- ==============================================================================
-- 8. TES PEMETAAN KEMAMPUAN AWAL & CBT (EXAMS)
-- ==============================================================================
CREATE TABLE exam_schedules (
  id VARCHAR(20) PRIMARY KEY, -- 'SCH-01'
  title VARCHAR(150) NOT NULL,
  exam_type VARCHAR(50) NOT NULL, -- 'CBT Online', 'Ujian Lisan / Praktik', 'Wawancara'
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  duration_minutes INT DEFAULT 90,
  room_location VARCHAR(150),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cbt_questions (
  id SERIAL PRIMARY KEY,
  schedule_id VARCHAR(20) REFERENCES exam_schedules(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL, -- 'Al-Qur\'an', 'Agama Islam', 'Bahasa Arab', 'Umum'
  question_text TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of string options: ["A", "B", "C", "D"]
  correct_answer_index INT NOT NULL, -- 0..3
  explanation TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE applicant_exam_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id VARCHAR(30) NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
  
  -- Nilai Pemetaan Kemampuan (Bukan Penggugur)
  quran_tajwid_score NUMERIC(5, 2) DEFAULT 0,
  quran_hafalan_score NUMERIC(5, 2) DEFAULT 0,
  quran_juz_memorized VARCHAR(50) DEFAULT 'Juz 30 sebagian',
  
  cbt_score NUMERIC(5, 2) DEFAULT 0,
  interview_score NUMERIC(5, 2) DEFAULT 0,
  final_diagnostic_score NUMERIC(5, 2) DEFAULT 0,
  
  placement_level VARCHAR(100), -- 'Halaqah Al-Qur\'an Tahsin Lanjutan', 'Kelas Reguler Unggulan'
  examiner_notes TEXT,
  examined_by UUID REFERENCES users(id),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_applicant_exam UNIQUE (applicant_id)
);

CREATE TABLE cbt_applicant_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id VARCHAR(30) NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
  question_id INT NOT NULL REFERENCES cbt_questions(id) ON DELETE CASCADE,
  selected_answer_index INT,
  is_correct BOOLEAN DEFAULT FALSE,
  answered_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_applicant_question UNIQUE (applicant_id, question_id)
);

-- ==============================================================================
-- 9. ASRAMA & PENEMPATAN KAMAR (DORMITORY)
-- ==============================================================================
CREATE TABLE dorm_buildings (
  id VARCHAR(20) PRIMARY KEY, -- 'BL-01'
  name VARCHAR(150) NOT NULL,
  gender_type gender_enum NOT NULL,
  floors INT DEFAULT 3,
  total_rooms INT DEFAULT 24,
  capacity INT DEFAULT 96,
  occupied INT DEFAULT 0,
  supervisor_name VARCHAR(150),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dorm_rooms (
  id VARCHAR(20) PRIMARY KEY, -- 'A-101'
  building_id VARCHAR(20) NOT NULL REFERENCES dorm_buildings(id) ON DELETE CASCADE,
  room_number VARCHAR(20) NOT NULL,
  floor_number INT DEFAULT 1,
  capacity INT DEFAULT 4,
  occupied INT DEFAULT 0,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dorm_placements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id VARCHAR(30) NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
  room_id VARCHAR(20) NOT NULL REFERENCES dorm_rooms(id) ON DELETE RESTRICT,
  bed_number INT DEFAULT 1,
  assigned_by UUID REFERENCES users(id),
  assigned_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  CONSTRAINT uq_applicant_placement UNIQUE (applicant_id)
);

CREATE INDEX idx_dorm_rooms_building ON dorm_rooms(building_id);

-- ==============================================================================
-- 10. HELPDESK, TIKET & LIVE CHAT
-- ==============================================================================
CREATE TABLE helpdesk_tickets (
  id VARCHAR(30) PRIMARY KEY, -- 'TCK-201'
  applicant_id VARCHAR(30) REFERENCES applicants(id) ON DELETE SET NULL,
  submitter_name VARCHAR(150) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  category VARCHAR(100) NOT NULL,
  status ticket_status_enum DEFAULT 'Menunggu Tanggapan',
  priority ticket_priority_enum DEFAULT 'Normal',
  message TEXT NOT NULL,
  assigned_to UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMPTZ
);

CREATE TABLE helpdesk_ticket_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id VARCHAR(30) NOT NULL REFERENCES helpdesk_tickets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  sender_name VARCHAR(150) NOT NULL,
  is_staff BOOLEAN DEFAULT FALSE,
  reply_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_type VARCHAR(20) NOT NULL, -- 'user', 'staff', 'system'
  sender_name VARCHAR(150),
  message_text TEXT NOT NULL,
  session_id VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE faqs (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 11. LOG AUDIT AKTIVITAS SISTEM (AUDIT LOGS)
-- ==============================================================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  user_name VARCHAR(150),
  action VARCHAR(255) NOT NULL,
  ip_address VARCHAR(50),
  details JSONB,
  status VARCHAR(50) DEFAULT 'Sukses',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ==============================================================================
-- 12. TRIGGERS UNTUK AUTO-UPDATE 'updated_at'
-- ==============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_applicants_updated_at
BEFORE UPDATE ON applicants
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_invoices_updated_at
BEFORE UPDATE ON invoices
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_registration_waves_updated_at
BEFORE UPDATE ON registration_waves
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
