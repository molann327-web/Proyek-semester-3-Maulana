// Data dummy Master Data & Pengaturan Sistem PPDB Darul Harumain

export const mockPesantrenIdentity = {
  name: 'Pondok Pesantren Darul Harumain',
  motto: 'Membangun Generasi Qur\'ani, Berakhlak Mulia, dan Berwawasan Global',
  nisp: '510032010088',
  skKemenag: 'Kemenag No. 421.2/089/Pondok/2018',
  address: 'Jl. Raya Ciapus Km. 7 No. 45, Tamansari, Kabupaten Bogor, Jawa Barat 16610',
  phone: '(0251) 8382901 / 0812-3456-7890',
  email: 'sekretariat@darulharumain.sch.id',
  website: 'https://darulharumain.sch.id',
  headmaster: 'K.H. Muhammad Shodiq, M.A.',
  ppdbChairman: 'Ustadz Farid Ridwan, S.Pd.I'
}

export const mockWaves = [
  {
    id: 'W-01',
    name: 'Gelombang 1 (Jalur Reguler & Prestasi)',
    academicYear: '2026 / 2027',
    startDate: '01 September 2026',
    endDate: '30 November 2026',
    quota: 180,
    filled: 142,
    status: 'Aktif',
    examDate: '06 - 08 Desember 2026'
  },
  {
    id: 'W-02',
    name: 'Gelombang 2 (Reguler Lanjutan)',
    academicYear: '2026 / 2027',
    startDate: '01 Januari 2027',
    endDate: '28 Februari 2027',
    quota: 70,
    filled: 0,
    status: 'Segera Dibuka',
    examDate: '07 - 09 Maret 2027'
  }
]

export const mockPrograms = [
  { id: 'P-01', name: 'Madrasah Tsanawiyah (MTs)', duration: '3 Tahun', quota: 150, minAge: 12, maxAge: 15 },
  { id: 'P-02', name: 'Madrasah Aliyah (MA) Keagamaan', duration: '3 Tahun', quota: 60, minAge: 15, maxAge: 18 },
  { id: 'P-03', name: 'Takhasus Tahfidz 30 Juz Intensif', duration: '2 - 3 Tahun', quota: 40, minAge: 13, maxAge: 20 }
]

export const mockDocumentRequirements = [
  { id: 'DOC-01', name: 'Kartu Keluarga (KK)', required: true, formats: 'PDF, JPG, PNG', maxSize: '2 MB' },
  { id: 'DOC-02', name: 'Akta Kelahiran Calon Santri', required: true, formats: 'PDF, JPG, PNG', maxSize: '2 MB' },
  { id: 'DOC-03', name: 'Ijazah Terakhir / Surat Keterangan Lulus (SKL)', required: true, formats: 'PDF', maxSize: '3 MB' },
  { id: 'DOC-04', name: 'Pas Foto 3x4 Latar Biru / Merah (Pakaian Muslim Rapi)', required: true, formats: 'JPG, PNG', maxSize: '1 MB' },
  { id: 'DOC-05', name: 'Surat Keterangan Sehat dari Dokter / Puskesmas', required: true, formats: 'PDF, JPG', maxSize: '2 MB' },
  { id: 'DOC-06', name: 'Sertifikat Prestasi / Tahfidz (Opsional untuk Jalur Beasiswa)', required: false, formats: 'PDF', maxSize: '5 MB' }
]

export const mockAuditLogs = [
  { id: 'LOG-091', timestamp: '23 Okt 2026, 07:15 WIB', user: 'Admin PPDB (Super Admin)', action: 'Pembaruan kuota asrama Gedung Al-Farabi', ip: '192.168.1.10', status: 'Sukses' },
  { id: 'LOG-090', timestamp: '22 Okt 2026, 15:40 WIB', user: 'Ustadzah Halimah (Bendahara)', action: 'Verifikasi lunas transaksi INV-2026-00412', ip: '192.168.1.18', status: 'Sukses' },
  { id: 'LOG-089', timestamp: '22 Okt 2026, 14:10 WIB', user: 'Ustadz Wildan (Verifikator)', action: 'Kirim catatan perbaikan berkas DH-2026-00126', ip: '192.168.1.12', status: 'Sukses' },
  { id: 'LOG-088', timestamp: '21 Okt 2026, 09:30 WIB', user: 'Sistem Notifikasi Gateway', action: 'Broadcast pengingat jadwal ujian (86 pesan)', ip: '127.0.0.1 (Local Worker)', status: 'Sukses' },
  { id: 'LOG-087', timestamp: '20 Okt 2026, 16:00 WIB', user: 'K.H. Muhammad Shodiq (Pimpinan)', action: 'Ekspor laporan rekapitulasi pendaftar Gelombang 1', ip: '192.168.1.2', status: 'Sukses' }
]
