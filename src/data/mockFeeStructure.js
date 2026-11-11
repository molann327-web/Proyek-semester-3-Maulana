// Data Rincian Biaya PPDB & Perlengkapan Santri Baru
// Sesuai Dokumen Resmi Pondok Pesantren Darul Haromain Tahun Pelajaran 2027 - 2028
// Ketua Panitia PSB: Fatkan Nur Fiqli, S.Pd.

export const officialFeeStructure = {
  academicYear: '2027 - 2028',
  location: 'Bogor, Jawa Barat',
  committeeHead: 'Fatkan Nur Fiqli, S.Pd.',
  committeeTitle: 'Ketua Panitia PSB Pondok Pesantren Darul Haromain',

  // 1. Biaya Pendaftaran / Formulir Awal
  registrationFee: {
    title: 'Biaya Pendaftaran & Formulir (Awal)',
    amount: 250000,
    formatted: 'Rp 250.000',
    description: 'Biaya administrasi registrasi, akun portal santri, dan kartu tanda peserta PPDB.',
    status: 'Wajib saat awal mendaftar'
  },

  // 2. Biaya Pendaftaran Ulang Berdasarkan Jenjang
  reregistrationFees: {
    smp: {
      level: 'SMP / MTs',
      name: 'Pendaftaran Ulang Jenjang SMP / MTs',
      amount: 1200000,
      formatted: 'Rp 1.200.000',
      description: 'Biaya administrasi daftar ulang santri baru tingkat Menengah Pertama (SMP/MTs).'
    },
    sma: {
      level: 'SMA / SMK / MA',
      name: 'Pendaftaran Ulang Jenjang SMA / SMK / MA',
      amount: 1400000,
      formatted: 'Rp 1.400.000',
      description: 'Biaya administrasi daftar ulang santri baru tingkat Menengah Atas / Kejuruan (SMA/SMK/MA).'
    }
  },

  // 3. Rincian Perlengkapan Santri Baru
  equipment: {
    // A. Perlengkapan Kamar
    roomItems: [
      { no: 1, name: 'Kasur Busa Santri Berkualitas', qty: '1 paket', putra: 300000, putri: 300000 }
    ],
    roomTotal: {
      putra: 300000,
      putri: 300000,
      formattedPutra: 'Rp 300.000',
      formattedPutri: 'Rp 300.000'
    },

    // B. Kitab Pesantren dan Sekolah
    bookItems: [
      { no: 1, name: 'Paket Kitab Amtsilati (Metode Cepat Baca Kitab Kuning)', qty: '1 paket', putra: 300000, putri: 300000 },
      { no: 2, name: 'Muthola\'ah', qty: '1 buah', putra: 20000, putri: 20000 },
      { no: 3, name: 'Kitab Durusul Lughoh Gontor Jilid 1', qty: '1 buah', putra: 45000, putri: 45000 },
      { no: 4, name: 'Kamus Bahasa Arab Gontor Jilid 1', qty: '1 buah', putra: 20000, putri: 20000 },
      { no: 5, name: 'Imla\' (Kaidah Menulis Arab)', qty: '1 buah', putra: 10000, putri: 10000 },
      { no: 6, name: 'Akhlakul Banin / Banat', qty: '1 buah', putra: 10000, putri: 10000 },
      { no: 7, name: 'Fikih 1 (Dasar-dasar Ibadah & Thaharah)', qty: '1 buah', putra: 15000, putri: 15000 },
      { no: 8, name: 'Kitab Ilmu Tajwid', qty: '1 buah', putra: 10000, putri: 10000 },
      { no: 9, name: 'Buku English Lesson 1 (B. Inggris Gontor)', qty: '1 buah', putra: 37500, putri: 37500 },
      { no: 10, name: 'Buku LKS Kurikulum Nasional (SMP/SMK)', qty: '1 paket', putra: 150000, putri: 150000 }
    ],
    bookTotal: {
      putra: 617500,
      putri: 617500,
      formattedPutra: 'Rp 617.500',
      formattedPutri: 'Rp 617.500'
    },

    // C. Biaya Seragam Santri
    uniformItems: [
      { no: 1, name: 'Seragam Batik Resmi Pesantren', qty: '1 buah', putra: 300000, putri: 350000 },
      { no: 2, name: 'Semi Jas Almamater Pesantren', qty: '1 buah', putra: 450000, putri: 450000 },
      { no: 3, name: 'Seragam Olahraga Santri', qty: '1 stel', putra: 300000, putri: 300000 }
    ],
    uniformTotal: {
      putra: 1050000,
      putri: 1100000,
      formattedPutra: 'Rp 1.050.000',
      formattedPutri: 'Rp 1.100.000'
    },

    // Total Perlengkapan Keseluruhan (A + B + C)
    grandTotal: {
      putra: 1967500,
      putri: 2017500,
      formattedPutra: 'Rp 1.967.500',
      formattedPutri: 'Rp 2.017.500'
    }
  }
}

// Rekening Bank Resmi PPDB Darul Haromain
export const officialBankAccounts = [
  {
    bank: 'Bank Syariah Indonesia (BSI)',
    accountNumber: '711-2345-890',
    accountName: 'PPDB Pondok Pesantren Darul Haromain',
    badge: 'Utama / Rekomendasi'
  },
  {
    bank: 'Bank Central Asia (BCA)',
    accountNumber: '883-0987-123',
    accountName: 'Yayasan Darul Haromain',
    badge: 'BCA Virtual'
  },
  {
    bank: 'Bank Mandiri',
    accountNumber: '133-00-9876543-1',
    accountName: 'Darul Haromain Penerimaan Santri',
    badge: 'Mandiri Livin'
  }
]
