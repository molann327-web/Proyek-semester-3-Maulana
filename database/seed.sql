-- ==============================================================================
-- SISTEM INFORMASI PPDB PONDOK PESANTREN DARUL HARUMAIN BOGOR
-- DATA SEED RESMI (UNTUK 19 TABEL UTAMA) - POSTGRESQL
-- ==============================================================================

-- 1. SEED users (Password default di-hash dengan bcrypt: 'admin123', 'pimpinan123', dll.)
INSERT INTO users (id, email, password_hash, role) VALUES
('b0000000-0000-0000-0000-000000000001', 'admin@darulharumain.sch.id', crypt('admin123', gen_salt('bf')), 'admin'),
('b0000000-0000-0000-0000-000000000002', 'verifikator@darulharumain.sch.id', crypt('verifikator123', gen_salt('bf')), 'verifikator'),
('b0000000-0000-0000-0000-000000000003', 'bendahara@darulharumain.sch.id', crypt('bendahara123', gen_salt('bf')), 'bendahara'),
('b0000000-0000-0000-0000-000000000004', 'penguji@darulharumain.sch.id', crypt('penguji123', gen_salt('bf')), 'penguji'),
('b0000000-0000-0000-0000-000000000005', 'asrama@darulharumain.sch.id', crypt('asrama123', gen_salt('bf')), 'pengelola_asrama'),
('b0000000-0000-0000-0000-000000000006', 'pimpinan@darulharumain.sch.id', crypt('pimpinan123', gen_salt('bf')), 'pimpinan'),
('b0000000-0000-0000-0000-000000000007', 'santri@darulharumain.sch.id', crypt('santri123', gen_salt('bf')), 'calon_santri')
ON CONFLICT (email) DO NOTHING;

-- 2. SEED profiles
INSERT INTO profiles (user_id, nama_lengkap, no_hp, alamat, avatar_initials) VALUES
('b0000000-0000-0000-0000-000000000001', 'Ustadz Ahmad Fauzi, S.Pd.I', '0812-3456-7890', 'Bogor Barat', 'AF'),
('b0000000-0000-0000-0000-000000000002', 'Ustadz Wildan Firdaus, Lc.', '0812-9876-5432', 'Bogor Barat', 'WF'),
('b0000000-0000-0000-0000-000000000003', 'Ustadzah Halimah Tusadiah, S.E.', '0813-1122-3344', 'Kota Bogor', 'HT'),
('b0000000-0000-0000-0000-000000000004', 'Ustadz M. Ridwan, M.Pd.', '0815-5566-7788', 'Kab. Bogor', 'MR'),
('b0000000-0000-0000-0000-000000000005', 'Ustadz Danu Setiawan', '0817-9900-1122', 'Bogor Barat', 'DS'),
('b0000000-0000-0000-0000-000000000006', 'K.H. Muhammad Shodiq, M.A.', '0811-2233-4455', 'Bogor', 'MS'),
('b0000000-0000-0000-0000-000000000007', 'Ahmad Fauzan Pratama', '0812-8899-0011', 'Jl. Melati No. 12 Bogor', 'AF')
ON CONFLICT (user_id) DO NOTHING;

-- 3. SEED tahun_ajaran
INSERT INTO tahun_ajaran (id, nama, gelombang, tanggal_buka, tanggal_tutup, tanggal_ujian, status_aktif) VALUES
('TA-2027-G1', 'Tahun Pelajaran 2027 / 2028', 'Gelombang 1 (Reguler & Prestasi)', '2026-09-01', '2026-11-30', '06 - 08 Desember 2026', TRUE),
('TA-2027-G2', 'Tahun Pelajaran 2027 / 2028', 'Gelombang 2 (Reguler Lanjutan)', '2027-01-01', '2027-02-28', '07 - 09 Maret 2027', FALSE)
ON CONFLICT (id) DO NOTHING;

-- 4. SEED jenjang_kuota
INSERT INTO jenjang_kuota (id, tahun_ajaran_id, nama_jenjang, kuota_total, kuota_terisi, usia_min, usia_max) VALUES
('JK-MTS', 'TA-2027-G1', 'Madrasah Tsanawiyah (SMP / MTs)', 150, 142, 12, 15),
('JK-MA', 'TA-2027-G1', 'Madrasah Aliyah (SMA / MA) Keagamaan', 60, 48, 15, 18),
('JK-TAHFIDZ', 'TA-2027-G1', 'Takhasus Tahfidz 30 Juz Intensif', 40, 32, 13, 20)
ON CONFLICT (id) DO NOTHING;

-- 5. SEED pengaturan_sistem
INSERT INTO pengaturan_sistem (
  nama_pesantren, motto, sk_kemenag, nisp, alamat, no_telp, email, pimpinan, ketua_panitia, nama_bank, no_rekening, atas_nama_rekening
) VALUES (
  'Pondok Pesantren Darul Harumain',
  'Membangun Generasi Qur''ani, Berakhlak Mulia, dan Berwawasan Global',
  'Kemenag No. 421.2/089/Pondok/2018',
  '510032010088',
  'Jl. Pesantren No. 14, Bogor Barat, Kota Bogor, Jawa Barat',
  '0813-8025-2083',
  'sekretariat@darulharumain.sch.id',
  'K.H. Muhammad Shodiq, M.A.',
  'Fatkan Nur Fiqli, S.Pd. (Ka Fatkhan)',
  'Bank Syariah Indonesia (BSI)',
  '7335153493',
  'Fatkhan (Ketua Panitia PSB)'
) ON CONFLICT DO NOTHING;

-- 6. SEED pendaftar
INSERT INTO pendaftar (
  id, user_id, tahun_ajaran_id, jenjang_kuota_id, nama_lengkap, jenis_kelamin, nisn, nik, tempat_lahir,
  tanggal_lahir, asal_sekolah, nama_ayah, pekerjaan_ayah, nama_ibu, pekerjaan_ibu, no_hp_ortu,
  status_verifikasi, status_daftar_ulang
) VALUES (
  'DH-2026-00128',
  'b0000000-0000-0000-0000-000000000007',
  'TA-2027-G1',
  'JK-MTS',
  'Ahmad Fauzan Pratama',
  'putra',
  '0098231456',
  '3201011405080002',
  'Bogor',
  '2012-05-14',
  'SDIT Al-Ihsan Bogor',
  'H. Muhammad Yusuf',
  'Wiraswasta',
  'Hj. Siti Aisyah',
  'Ibu Rumah Tangga',
  '0812-1122-3344',
  'Terverifikasi',
  'Lunas'
) ON CONFLICT (id) DO NOTHING;

-- 7. SEED dokumen_pendaftar
INSERT INTO dokumen_pendaftar (pendaftar_id, jenis_dokumen, file_url, file_name, status_validasi) VALUES
('DH-2026-00128', 'kk', 'https://storage.darulharumain.sch.id/docs/kk_00128.pdf', 'kk_keluarga_ahmad_fauzan.pdf', 'Valid'),
('DH-2026-00128', 'akta', 'https://storage.darulharumain.sch.id/docs/akta_00128.pdf', 'akta_kelahiran_fauzan.pdf', 'Valid'),
('DH-2026-00128', 'ijazah_skl', 'https://storage.darulharumain.sch.id/docs/skl_00128.pdf', 'skl_sdit_al_ihsan.pdf', 'Valid'),
('DH-2026-00128', 'pas_foto', 'https://storage.darulharumain.sch.id/docs/foto_00128.jpg', 'pas_foto_3x4_fauzan.jpg', 'Valid'),
('DH-2026-00128', 'surat_sehat', 'https://storage.darulharumain.sch.id/docs/sehat_00128.pdf', 'surat_keterangan_sehat_puskesmas.pdf', 'Valid')
ON CONFLICT (pendaftar_id, jenis_dokumen) DO NOTHING;

-- 8. SEED seleksi_hasil
INSERT INTO seleksi_hasil (
  pendaftar_id, nilai_cbt, nilai_quran_tajwid, nilai_quran_hafalan, juz_hafalan, nilai_wawancara,
  nilai_akhir, rekomendasi_kelas, catatan_penguji
) VALUES (
  'DH-2026-00128',
  86.00,
  88.50,
  90.00,
  'Juz 30 Mutqin',
  88.00,
  88.15,
  'Halaqah Tahfidz Intensif & MTs Reguler Unggulan',
  'Kemampuan tajwid dan makhraj sangat baik. Nilai tes CBT di atas rata-rata.'
) ON CONFLICT (pendaftar_id) DO NOTHING;

-- 9. SEED tagihan
INSERT INTO tagihan (id, pendaftar_id, jenis_tagihan, total_tagihan, total_dibayar, sisa_tagihan, status_bayar) VALUES
('INV-2026-00412', 'DH-2026-00128', 'Paket Masuk Pendaftaran (Formulir, Pangkal, Infak, Syahriah)', 7725000, 7725000, 0, 'Lunas'),
('INV-2026-00413', 'DH-2026-00128', 'Pendaftaran Ulang Jenjang SMP / MTs', 1200000, 1200000, 0, 'Lunas')
ON CONFLICT (id) DO NOTHING;

-- 10. SEED pembayaran
INSERT INTO pembayaran (
  tagihan_id, pendaftar_id, nominal, metode_bayar, nama_bank, no_rekening, bukti_transfer_url, status_verifikasi, catatan
) VALUES
('INV-2026-00412', 'DH-2026-00128', 7725000, 'Transfer BSI', 'Bank Syariah Indonesia (BSI)', '7335153493', 'https://storage.darulharumain.sch.id/proofs/bsi_7725k_00128.jpg', 'Lunas', 'Pembayaran paket pendaftaran resmi tervalidasi via rekening BSI Ka Fatkhan'),
('INV-2026-00413', 'DH-2026-00128', 1200000, 'Transfer BSI', 'Bank Syariah Indonesia (BSI)', '7335153493', 'https://storage.darulharumain.sch.id/proofs/bsi_1200k_00128.jpg', 'Lunas', 'Daftar ulang jenjang SMP lunas, akses kamar terbuka')
ON CONFLICT DO NOTHING;

-- 11. SEED bank_soal
INSERT INTO bank_soal (kategori, pertanyaan, pilihan_jawaban, kunci_jawaban, bobot_nilai) VALUES
('Pengetahuan Al-Qur''an', 'Berapa jumlah juz dan surat yang terdapat dalam mushaf Al-Qur''an standar?', '["30 Juz dan 114 Surat", "30 Juz dan 112 Surat", "29 Juz dan 114 Surat", "30 Juz dan 110 Surat"]'::jsonb, 0, 10.0),
('Fiqih Ibadah', 'Rukun wudhu yang pertama kali dilakukan berdasarkan syariat Islam adalah...', '["Membasuh kedua telapak tangan", "Niat dalam hati bersamaan membasuh wajah", "Berkumur-kumur", "Membasuh kedua kaki hingga mata kaki"]'::jsonb, 1, 10.0),
('Bahasa Arab Dasar', 'Apa arti kosakata bahasa Arab "Madrasatun" (مَدْرَسَةٌ)?', '["Masjid", "Rumah Makan", "Sekolah / Madrasah", "Perpustakaan"]'::jsonb, 2, 10.0),
('Akhlak & Kepesantrenan', 'Sikap santri yang menghormati guru/asatidz dan mematuhi tata tertib pesantren merupakan wujud nilai...', '["Tawadhu'' dan Ta''dzim", "Takabbur", "Riya''", "Ananiah"]'::jsonb, 0, 10.0);

-- 12. SEED ujian_peserta
INSERT INTO ujian_peserta (pendaftar_id, bank_soal_id, jawaban_peserta, apakah_benar) VALUES
('DH-2026-00128', 1, 0, TRUE),
('DH-2026-00128', 2, 1, TRUE),
('DH-2026-00128', 3, 2, TRUE),
('DH-2026-00128', 4, 0, TRUE)
ON CONFLICT (pendaftar_id, bank_soal_id) DO NOTHING;

-- 13. SEED wa_templates
INSERT INTO wa_templates (id, kode_template, judul, pesan_template) VALUES
('WA-REG-01', 'REG_SUCCESS', 'Pendaftaran Akun Santri Berhasil', 'Assalamu''alaikum Wr. Wb. Selamat {nama_santri}, pendaftaran Anda di Pondok Pesantren Darul Harumain telah tercatat dengan nomor: {no_daftar}. Silakan lengkapi berkas di portal santri.'),
('WA-PAY-01', 'PAY_VERIFIED', 'Konfirmasi Pembayaran Divalidasi', 'Alhamdulillah, pembayaran tagihan Anda sebesar Rp {nominal} telah diverifikasi lunas oleh Bendahara PPDB. Kuitansi resmi dapat diunduh di portal santri.'),
('WA-EXAM-01', 'EXAM_SCHEDULE', 'Pengingat Ujian Seleksi Pemetaan', 'Pemberitahuan: Jadwal ujian tes pemetaan Al-Qur''an & CBT online ananda {nama_santri} dijadwalkan pada {tanggal_tes}.')
ON CONFLICT (id) DO NOTHING;

-- 14. SEED wa_logs
INSERT INTO wa_logs (pendaftar_id, no_tujuan, pesan, status_kirim) VALUES
('DH-2026-00128', '0812-1122-3344', 'Konfirmasi: Pembayaran paket masuk santri DH-2026-00128 dinyatakan Lunas.', 'Terkirim');

-- 15. SEED asrama_kamar
INSERT INTO asrama_kamar (id, nama_gedung, jenis_gender, no_kamar, lantai, kapasitas, terisi, status_kamar, nama_musyrif) VALUES
('K-A101', 'Asrama Putra - Gedung Al-Farabi', 'putra', '101', 1, 4, 4, 'Penuh', 'Ustadz Wildan Firdaus, Lc.'),
('K-A102', 'Asrama Putra - Gedung Al-Farabi', 'putra', '102', 1, 4, 3, 'Tersedia 1', 'Ustadz Wildan Firdaus, Lc.'),
('K-B101', 'Asrama Putri - Gedung Khadijah', 'putri', '101', 1, 4, 4, 'Penuh', 'Ustadzah Maryam Salsabila, S.Pd.'),
('K-B102', 'Asrama Putri - Gedung Khadijah', 'putri', '102', 1, 4, 3, 'Tersedia 1', 'Ustadzah Maryam Salsabila, S.Pd.')
ON CONFLICT (id) DO NOTHING;

-- 16. SEED penempatan_santri
INSERT INTO penempatan_santri (pendaftar_id, kamar_id, no_ranjang, catatan) VALUES
('DH-2026-00128', 'K-A102', 1, 'Penempatan kamar asrama putra resmi setelah lunas daftar ulang')
ON CONFLICT (pendaftar_id) DO NOTHING;

-- 17. SEED faq
INSERT INTO faq (kategori, pertanyaan, jawaban, urutan) VALUES
('Biaya & Pembayaran', 'Berapa rincian biaya pendaftaran resmi Pondok Pesantren Darul Harumain?', 'Rincian paket pendaftaran masuk adalah Rp 7.725.000 (Formulir Rp 350.000, Uang Pangkal Rp 4.000.000, Infak Bangunan Rp 2.500.000, Syahriah Juli Rp 875.000). Biaya ini belum termasuk perlengkapan kitab, kasur, dan seragam.', 1),
('Biaya & Pembayaran', 'Berapa biaya pendaftaran ulang setelah lulus tes pemetaan?', 'Biaya daftar ulang adalah Rp 1.200.000 untuk jenjang SMP/MTs dan Rp 1.400.000 untuk jenjang SMA/SMK/MA.', 2),
('Biaya & Pembayaran', 'Kemana transfer biaya resmi PPDB dilakukan?', 'Transfer resmi HANYA disalurkan melalui Bank Syariah Indonesia (BSI) No. Rekening 7335153493 a.n. Fatkhan (Ketua Panitia PSB).', 3),
('Ujian & Seleksi', 'Apakah tes seleksi masuk bersifat menggugurkan calon santri?', 'Tidak. Tes seleksi (CBT dan Al-Qur''an) difungsikan murni sebagai tes pemetaan kemampuan awal (diagnostic placement) agar asatidz dapat membimbing santri sesuai tingkatannya saat di asrama.', 4)
ON CONFLICT DO NOTHING;

-- 18. SEED tiket_bantuan
INSERT INTO tiket_bantuan (id, pendaftar_id, nama_pengaju, kategori, subjek, pesan, status, prioritas) VALUES
('TCK-201', 'DH-2026-00128', 'H. Muhammad Yusuf (Wali Ahmad Fauzan)', 'Biaya & Pembayaran', 'Konfirmasi pelunasan daftar ulang via BSI', 'Mohon konfirmasi mutasi pembayaran daftar ulang jenjang SMP.', 'Selesai', 'Normal')
ON CONFLICT (id) DO NOTHING;

-- 19. SEED pesan_chat
INSERT INTO pesan_chat (session_id, pengirim_tipe, nama_pengirim, isi_pesan) VALUES
('SES-001', 'system', 'Sistem PPDB', 'Assalamu''alaikum Wr. Wb. Selamat datang di Layanan Informasi PPDB Pondok Pesantren Darul Harumain.'),
('SES-001', 'user', 'Wali Santri', 'Berapa nomor rekening resmi BSI untuk pembayaran pendaftaran?'),
('SES-001', 'staff', 'Ustadzah Fitria (Panitia Helpdesk)', 'Pembayaran resmi PPDB disalurkan ke Bank Syariah Indonesia (BSI) No. Rekening 7335153493 a.n. Fatkhan (Ketua Panitia PSB).');
