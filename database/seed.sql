-- ==============================================================================
-- SISTEM INFORMASI PPDB PONDOK PESANTREN DARUL HARUMAIN BOGOR
-- DATA SEED AWAL (INITIAL SEED DATA) - POSTGRESQL
-- ==============================================================================

-- 1. SEED ROLES
INSERT INTO roles (id, name, description, permissions) VALUES
('admin', 'Super Admin PPDB', 'Akses penuh ke seluruh modul, master data, konfigurasi periode, dan akun pengguna', '["Semua Modul", "Master Data", "Manajemen User", "Audit Log", "Ekspor Laporan"]'::jsonb),
('verifier', 'Panitia Verifikasi Berkas', 'Pemeriksaan kelengkapan dokumen pendaftaran, validasi data santri, dan catatan perbaikan', '["Verifikasi Berkas", "Daftar Calon Santri", "Catatan Dokumen"]'::jsonb),
('treasurer', 'Bendahara PPDB', 'Verifikasi pembayaran formulir, uang pangkal, daftar ulang, dan cetak kuitansi', '["Keuangan & Kasir", "Validasi Pembayaran", "Cetak Kuitansi", "Laporan Keuangan"]'::jsonb),
('examiner', 'Penguji Seleksi & Tahfidz', 'Input nilai tes lisan Al-Qur''an, penjadwalan ujian CBT, dan hasil pemetaan', '["Input Nilai", "Manajemen CBT", "Hasil Pemetaan"]'::jsonb),
('dorm_officer', 'Pengelola Asrama', 'Alokasi gedung dan kamar asrama bagi santri baru yang telah daftar ulang', '["Manajemen Asrama", "Plotting Kamar", "Kapasitas Asrama"]'::jsonb),
('executive', 'Pimpinan (Mudir Ma''had)', 'Akses eksekutif untuk melihat data jadi santri, rekapitulasi keuangan, dan laporan', '["Dashboard Eksekutif", "Data Jadi Santri", "Rekap Keuangan", "Laporan Tahunan"]'::jsonb),
('applicant', 'Calon Santri / Wali Santri', 'Portal mandiri calon santri: isi formulir, unggah berkas, bayar, tes CBT, dan cek kamar', '["Portal Santri", "Upload Berkas", "Ujian CBT Mandiri", "Cek Status"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 2. SEED USERS (Password default: 'admin123' di-hash menggunakan crypt / pgcrypto)
INSERT INTO users (id, name, email, password_hash, phone, role_id, avatar_initials) VALUES
('a0000000-0000-0000-0000-000000000001', 'Ustadz Ahmad Fauzi, S.Pd.I', 'admin@darulharumain.sch.id', crypt('admin123', gen_salt('bf')), '0812-3456-7890', 'admin', 'AF'),
('a0000000-0000-0000-0000-000000000002', 'Ustadz Wildan Firdaus, Lc.', 'verifikator@darulharumain.sch.id', crypt('verifikator123', gen_salt('bf')), '0812-9876-5432', 'verifier', 'WF'),
('a0000000-0000-0000-0000-000000000003', 'Ustadzah Halimah Tusadiah, S.E.', 'bendahara@darulharumain.sch.id', crypt('bendahara123', gen_salt('bf')), '0813-1122-3344', 'treasurer', 'HT'),
('a0000000-0000-0000-0000-000000000004', 'Ustadz M. Ridwan, M.Pd.', 'penguji@darulharumain.sch.id', crypt('penguji123', gen_salt('bf')), '0815-5566-7788', 'examiner', 'MR'),
('a0000000-0000-0000-0000-000000000005', 'Ustadz Danu Setiawan', 'asrama@darulharumain.sch.id', crypt('asrama123', gen_salt('bf')), '0817-9900-1122', 'dorm_officer', 'DS'),
('a0000000-0000-0000-0000-000000000006', 'K.H. Muhammad Shodiq, M.A.', 'pimpinan@darulharumain.sch.id', crypt('pimpinan123', gen_salt('bf')), '0811-2233-4455', 'executive', 'MS'),
('a0000000-0000-0000-0000-000000000007', 'Ahmad Fauzan Pratama', 'santri@darulharumain.sch.id', crypt('santri123', gen_salt('bf')), '0812-8899-0011', 'applicant', 'AF')
ON CONFLICT (email) DO NOTHING;

-- 3. SEED IDENTITAS PESANTREN
INSERT INTO pesantren_identity (
  name, motto, nisp, sk_kemenag, address, phone, email, website, headmaster, ppdb_chairman, bank_name, bank_account_number, bank_account_name
) VALUES (
  'Pondok Pesantren Darul Harumain',
  'Membangun Generasi Qur''ani, Berakhlak Mulia, dan Berwawasan Global',
  '510032010088',
  'Kemenag No. 421.2/089/Pondok/2018',
  'Jl. Pesantren No. 14, Bogor Barat, Kota Bogor, Jawa Barat',
  '0813-8025-2083',
  'sekretariat@darulharumain.sch.id',
  'https://darulharumain.sch.id',
  'K.H. Muhammad Shodiq, M.A.',
  'Fatkan Nur Fiqli, S.Pd. (Ka Fatkhan)',
  'Bank Syariah Indonesia (BSI)',
  '7335153493',
  'Fatkhan (Ketua Panitia PSB)'
) ON CONFLICT DO NOTHING;

-- 4. SEED GELOMBANG PENDAFTARAN
INSERT INTO registration_waves (id, name, academic_year, start_date, end_date, exam_date_info, quota, filled, is_active) VALUES
('W-01', 'Gelombang 1 (Reguler & Prestasi)', '2027 / 2028', '2026-09-01', '2026-11-30', '06 - 08 Desember 2026', 180, 142, TRUE),
('W-02', 'Gelombang 2 (Reguler Lanjutan)', '2027 / 2028', '2027-01-01', '2027-02-28', '07 - 09 Maret 2027', 70, 0, FALSE)
ON CONFLICT (id) DO NOTHING;

-- 5. SEED PROGRAM PENDIDIKAN
INSERT INTO education_programs (id, name, level, duration, quota, min_age, max_age) VALUES
('P-01', 'Madrasah Tsanawiyah (SMP / MTs)', 'SMP/MTs', '3 Tahun', 150, 12, 15),
('P-02', 'Madrasah Aliyah (SMA / MA) Keagamaan', 'SMA/MA', '3 Tahun', 60, 15, 18),
('P-03', 'Takhasus Tahfidz 30 Juz Intensif', 'SMP/MTs', '2 - 3 Tahun', 40, 13, 20)
ON CONFLICT (id) DO NOTHING;

-- 6. SEED PERSYARATAN BERKAS
INSERT INTO document_requirements (id, doc_type, name, is_required, allowed_formats, max_size_mb) VALUES
('DOC-01', 'kk', 'Kartu Keluarga (KK)', TRUE, 'PDF, JPG, PNG', 2),
('DOC-02', 'akta', 'Akta Kelahiran Calon Santri', TRUE, 'PDF, JPG, PNG', 2),
('DOC-03', 'ijazah_skl', 'Ijazah Terakhir / Surat Keterangan Lulus (SKL)', TRUE, 'PDF', 3),
('DOC-04', 'pas_foto', 'Pas Foto 3x4 Latar Biru / Merah', TRUE, 'JPG, PNG', 1),
('DOC-05', 'surat_sehat', 'Surat Keterangan Sehat Dokter / Puskesmas', TRUE, 'PDF, JPG', 2),
('DOC-06', 'sertifikat_prestasi', 'Sertifikat Prestasi / Tahfidz (Opsional Beasiswa)', FALSE, 'PDF', 5)
ON CONFLICT (doc_type) DO NOTHING;

-- 7. SEED MASTER BIAYA RESMI (PAKET MASUK Rp 7.725.000 + DAFTAR ULANG + PERLENGKAPAN)
INSERT INTO fee_items (id, name, category, amount, description, is_mandatory) VALUES
('FEE-01', 'Formulir Pendaftaran', 'formulir', 350000, 'Biaya registrasi akun dan formulir portal PPDB online', TRUE),
('FEE-02', 'Uang Pangkal & Pendidikan', 'uang_pangkal', 4000000, 'Pengembangan kurikulum & sarana pendidikan santri', TRUE),
('FEE-03', 'Infak Bangunan Pesantren', 'infak_bangunan', 2500000, 'Pengembangan sarana gedung & asrama santri', TRUE),
('FEE-04', 'Syahriah / Bulanan (Bulan Juli)', 'syahriah_juli', 875000, 'Iuran bulanan pertama kedatangan santri baru', TRUE),
('FEE-05', 'Pendaftaran Ulang Jenjang SMP / MTs', 'daftar_ulang_smp', 1200000, 'Administrasi daftar ulang santri tingkat SMP/MTs', FALSE),
('FEE-06', 'Pendaftaran Ulang Jenjang SMA / SMK / MA', 'daftar_ulang_sma', 1400000, 'Administrasi daftar ulang santri tingkat SMA/MA', FALSE),
('FEE-07', 'Kasur Busa Santri Berkualitas', 'perlengkapan_kasur', 300000, '1 paket kasur busa standar asrama', FALSE),
('FEE-08', '10 Paket Kitab Amtsilati & LKS', 'perlengkapan_kitab', 617500, 'Paket kitab kuning dan LKS kurikulum', FALSE),
('FEE-09', 'Paket Seragam Santri Putra (3 Stel)', 'perlengkapan_seragam', 1050000, 'Batik, semi jas almamater, olahraga putra', FALSE),
('FEE-10', 'Paket Seragam Santri Putri (3 Stel)', 'perlengkapan_seragam', 1100000, 'Batik, semi jas almamater, olahraga putri', FALSE)
ON CONFLICT (id) DO NOTHING;

-- 8. SEED GEDUNG ASRAMA & KAMAR
INSERT INTO dorm_buildings (id, name, gender_type, floors, total_rooms, capacity, occupied, supervisor_name) VALUES
('BL-01', 'Asrama Putra - Gedung Al-Farabi', 'putra', 3, 24, 96, 72, 'Ustadz Wildan Firdaus, Lc.'),
('BL-02', 'Asrama Putri - Gedung Khadijah', 'putri', 3, 24, 96, 80, 'Ustadzah Maryam Salsabila, S.Pd.'),
('BL-03', 'Asrama Putra - Gedung Ibnu Sina (Tahfidz)', 'putra', 2, 12, 48, 32, 'Ustadz Ahmad Syauqi, Al-Hafidz')
ON CONFLICT (id) DO NOTHING;

INSERT INTO dorm_rooms (id, building_id, room_number, floor_number, capacity, occupied, is_available) VALUES
('A-101', 'BL-01', '101', 1, 4, 4, FALSE),
('A-102', 'BL-01', '102', 1, 4, 3, TRUE),
('A-201', 'BL-01', '201', 2, 4, 2, TRUE),
('B-101', 'BL-02', '101', 1, 4, 4, FALSE),
('B-102', 'BL-02', '102', 1, 4, 3, TRUE),
('T-101', 'BL-03', '101', 1, 4, 3, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 9. SEED SOAL CBT ONLINE (PEMETAAN KEMAMPUAN AWAL)
INSERT INTO cbt_questions (category, question_text, options, correct_answer_index, explanation) VALUES
('Pengetahuan Al-Qur''an', 'Berapa jumlah juz dan surat yang terdapat dalam mushaf Al-Qur''an standar?', '["30 Juz dan 114 Surat", "30 Juz dan 112 Surat", "29 Juz dan 114 Surat", "30 Juz dan 110 Surat"]'::jsonb, 0, 'Mushaf Al-Qur''an terbagi menjadi 30 Juz dan 114 Surat.'),
('Fiqih Ibadah', 'Rukun wudhu yang pertama kali dilakukan berdasarkan syariat Islam adalah...', '["Membasuh kedua telapak tangan", "Niat dalam hati bersamaan membasuh wajah", "Berkumur-kumur", "Membasuh kedua kaki hingga mata kaki"]'::jsonb, 1, 'Niat bersamaan dengan membasuh bagian wajah pertama kali merupakan rukun wudhu yang utama.'),
('Bahasa Arab Dasar', 'Apa arti kosakata bahasa Arab "Madrasatun" (مَدْرَسَةٌ)?', '["Masjid", "Rumah Makan", "Sekolah / Madrasah", "Perpustakaan"]'::jsonb, 2, 'Madrasatun artinya sekolah atau tempat belajar.'),
('Akhlak & Kepesantrenan', 'Sikap santri yang menghormati guru/asatidz dan mematuhi tata tertib pesantren merupakan wujud nilai...', '["Tawadhu'' dan Ta''dzim", "Takabbur", "Riya''", "Ananiah"]'::jsonb, 0, 'Sikap ta''dzim dan tawadhu'' adalah akhlak mulia penuntut ilmu terhadap guru.');

-- 10. SEED SAMPLE APPLICANT
INSERT INTO applicants (
  id, user_id, wave_id, program_id, full_name, nickname, nisn, nik, gender, birth_place, birth_date,
  phone, email, address, city, province, previous_school, graduation_year,
  father_name, mother_name, parent_phone, status, is_documents_complete, is_documents_verified,
  is_exam_completed, is_reregistered
) VALUES (
  'DH-2026-00128',
  'a0000000-0000-0000-0000-000000000007',
  'W-01',
  'P-01',
  'Ahmad Fauzan Pratama',
  'Fauzan',
  '0098231456',
  '3201011405080002',
  'putra',
  'Bogor',
  '2012-05-14',
  '0812-8899-0011',
  'santri@darulharumain.sch.id',
  'Jl. Melati No. 12 RT 03/05',
  'Kota Bogor',
  'Jawa Barat',
  'SDIT Al-Ihsan Bogor',
  2026,
  'H. Muhammad Yusuf',
  'Hj. Siti Aisyah',
  '0812-1122-3344',
  'Terverifikasi',
  TRUE,
  TRUE,
  TRUE,
  TRUE
) ON CONFLICT (id) DO NOTHING;

-- SEED HASIL PEMETAAN SAMPLE SANTRI
INSERT INTO applicant_exam_results (
  applicant_id, quran_tajwid_score, quran_hafalan_score, quran_juz_memorized,
  cbt_score, interview_score, final_diagnostic_score, placement_level, examiner_notes
) VALUES (
  'DH-2026-00128',
  88.50,
  90.00,
  'Juz 30 Mutqin + Juz 1 awal',
  86.00,
  88.00,
  88.15,
  'Halaqah Al-Qur''an Tahfidz Intensif & Kelas Unggulan MTs',
  'Bacaan tajwid makhraj sangat baik, santri bersemangat dan adab memuaskan.'
) ON CONFLICT (applicant_id) DO NOTHING;

-- SEED PENEMPATAN KAMAR SAMPLE SANTRI
INSERT INTO dorm_placements (applicant_id, room_id, bed_number, notes) VALUES
('DH-2026-00128', 'A-102', 1, 'Penempatan kamar asrama putra resmi setelah lunas daftar ulang')
ON CONFLICT (applicant_id) DO NOTHING;
