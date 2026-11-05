// Data dummy pengguna, peran (roles), dan autentikasi PPDB Darul Harumain

export const mockRoles = [
  {
    id: 'super_admin',
    name: 'Admin PPDB (Super Admin)',
    description: 'Akses penuh ke seluruh modul, master data, konfigurasi periode, dan akun pengguna',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    permissions: ['Semua Modul', 'Master Data', 'Manajemen User', 'Audit Log', 'Ekspor Laporan']
  },
  {
    id: 'verifier',
    name: 'Panitia Pendaftaran & Verifikasi',
    description: 'Pemeriksaan kelengkapan formulir dan validasi dokumen berkas santri',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    permissions: ['Pendaftaran', 'Verifikasi Berkas', 'Catatan Perbaikan', 'Helpdesk']
  },
  {
    id: 'treasurer',
    name: 'Bendahara PPDB',
    description: 'Verifikasi bukti pembayaran, kuitansi digital, dan rekap keuangan',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    permissions: ['Keuangan & Pembayaran', 'Kuitansi', 'Laporan Keuangan']
  },
  {
    id: 'examiner',
    name: 'Penguji & Seleksi',
    description: 'Penilaian tes Al-Qur\'an, tes tulis CBT, wawancara, dan penetapan kelulusan',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    permissions: ['Jadwal Tes', 'Input Nilai Seleksi', 'Rekapitulasi Ujian']
  },
  {
    id: 'dorm_manager',
    name: 'Pengelola Asrama',
    description: 'Pendataan santri diterima, pembagian kamar, gedung, dan perlengkapan santri',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
    permissions: ['Asrama & Ke-santrian', 'Penempatan Kamar', 'Inventaris']
  },
  {
    id: 'executive',
    name: 'Pimpinan Pesantren',
    description: 'Akses monitoring eksekutif, analitik grafik, dan rekapitulasi laporan',
    badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
    permissions: ['Dashboard Pimpinan', 'Pelaporan & Analitik', 'Cetak SK']
  },
  {
    id: 'applicant',
    name: 'Calon Santri / Wali Santri',
    description: 'Akses portal pendaftaran mandiri, upload berkas, pembayaran, CBT online, kartu ujian',
    badgeColor: 'bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300',
    permissions: ['Isi Formulir', 'Unggah Berkas', 'Bayar Tagihan', 'Ujian CBT', 'Kartu Pendaftaran', 'Chat Helpdesk']
  }
]

export const mockUsers = [
  {
    id: 'USR-001',
    name: 'Ustadz Farid Ridwan, S.Pd.I',
    email: 'admin.ppdb@darulharumain.sch.id',
    password: 'admin123',
    phone: '0812-3456-7890',
    roleId: 'super_admin',
    roleName: 'Admin PPDB (Super Admin)',
    status: 'Aktif',
    avatarInitials: 'FR',
    lastLogin: 'Hari ini, 07:15 WIB',
    createdAt: '01 Agustus 2026'
  },
  {
    id: 'USR-002',
    name: 'Ustadz Wildan Firdaus, Lc.',
    email: 'verifikator@darulharumain.sch.id',
    password: 'verifikator123',
    phone: '0813-2345-6789',
    roleId: 'verifier',
    roleName: 'Panitia Pendaftaran & Verifikasi',
    status: 'Aktif',
    avatarInitials: 'WF',
    lastLogin: 'Kemarin, 14:20 WIB',
    createdAt: '05 Agustus 2026'
  },
  {
    id: 'USR-003',
    name: 'Ustadzah Halimah Tusadiah, S.E.',
    email: 'bendahara@darulharumain.sch.id',
    password: 'bendahara123',
    phone: '0819-3456-7891',
    roleId: 'treasurer',
    roleName: 'Bendahara PPDB',
    status: 'Aktif',
    avatarInitials: 'HT',
    lastLogin: 'Hari ini, 08:30 WIB',
    createdAt: '05 Agustus 2026'
  },
  {
    id: 'USR-004',
    name: 'Ustadz Ahmad Syauqi, Al-Hafidz',
    email: 'penguji.quran@darulharumain.sch.id',
    password: 'penguji123',
    phone: '0857-4567-8901',
    roleId: 'examiner',
    roleName: 'Penguji & Seleksi',
    status: 'Aktif',
    avatarInitials: 'AS',
    lastLogin: '21 Okt 2026',
    createdAt: '10 Agustus 2026'
  },
  {
    id: 'USR-005',
    name: 'K.H. Muhammad Shodiq, M.A.',
    email: 'pimpinan@darulharumain.sch.id',
    password: 'pimpinan123',
    phone: '0811-9876-5432',
    roleId: 'executive',
    roleName: 'Pimpinan Pesantren',
    status: 'Aktif',
    avatarInitials: 'MS',
    lastLogin: '20 Okt 2026',
    createdAt: '01 Agustus 2026'
  },
  {
    id: 'USR-006',
    name: 'Ahmad Fauzan Pratama (Calon Santri)',
    email: 'ahmad.fauzan@gmail.com',
    password: 'santri123',
    phone: '0812-9876-5432',
    roleId: 'applicant',
    roleName: 'Calon Santri / Wali Santri',
    applicantId: 'DH-2026-00128',
    status: 'Aktif',
    avatarInitials: 'AF',
    lastLogin: 'Hari ini, 06:45 WIB',
    createdAt: '22 Okt 2026'
  }
]
