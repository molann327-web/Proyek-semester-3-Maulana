// Data dummy keuangan & pembayaran PPDB Darul Harumain

export const mockCostItems = [
  { id: 'C-01', name: 'Biaya Formulir & Registrasi PPDB', amount: 250000, type: 'Wajib Awal', description: 'Biaya administrasi pendaftaran dan kartu tes' },
  { id: 'C-02', name: 'Infaq Pengembangan Bangunan (Uang Pangkal)', amount: 4500000, type: 'Daftar Ulang', description: 'Investasi sarana prasarana pesantren' },
  { id: 'C-03', name: 'Biaya Seragam Lengkap (5 Stel) & Atribut', amount: 1200000, type: 'Daftar Ulang', description: 'Seragam harian, gamis/jubah, pramuka, olahraga, batik' },
  { id: 'C-04', name: 'Kitab / Buku Pelajaran & Al-Qur\'an Standar', amount: 750000, type: 'Daftar Ulang', description: 'Paket kutubus salaf dan modul akademik 1 tahun' },
  { id: 'C-05', name: 'SPP Syahriah & Konsumsi Bulan Pertama', amount: 1100000, type: 'Rutin Bulanan', description: 'Makan 3x sehari, laundry seragam, dan asrama' }
]

export const mockPaymentAccounts = [
  { bank: 'Bank Syariah Indonesia (BSI)', accountNumber: '711-2345-890', accountName: 'PPDB Pondok Pesantren Darul Harumain', qrCode: 'QRIS-DH-BSI' },
  { bank: 'Bank Central Asia (BCA)', accountNumber: '883-0987-123', accountName: 'Yayasan Darul Harumain', qrCode: 'QRIS-DH-BCA' },
  { bank: 'Bank Mandiri', accountNumber: '133-00-9876543-1', accountName: 'Darul Harumain Penerimaan', qrCode: 'QRIS-DH-MANDIRI' }
]

export const mockTransactions = [
  {
    invoiceNumber: 'INV-2026-00412',
    applicantId: 'DH-2026-00128',
    applicantName: 'Ahmad Fauzan Pratama',
    costType: 'Biaya Registrasi & Formulir',
    amount: 250000,
    method: 'Transfer BSI',
    date: '22 Okt 2026, 09:14 WIB',
    status: 'Lunas',
    proofImage: 'bukti_transfer_bsi_00128.jpg',
    verifiedBy: 'Ustadzah Halimah (Bendahara)',
    verifiedAt: '22 Okt 2026, 10:05 WIB',
    notes: 'Pembayaran terverifikasi via mutasi bank BSI.'
  },
  {
    invoiceNumber: 'INV-2026-00411',
    applicantId: 'DH-2026-00125',
    applicantName: 'Nurul Hidayah Al-Zahra',
    costType: 'Biaya Registrasi & Formulir',
    amount: 250000,
    method: 'Transfer BCA',
    date: '21 Okt 2026, 14:30 WIB',
    status: 'Lunas',
    proofImage: 'bukti_bca_nurul.jpg',
    verifiedBy: 'Ustadzah Halimah (Bendahara)',
    verifiedAt: '21 Okt 2026, 15:00 WIB',
    notes: 'Dana masuk sesuai nominal invoice.'
  },
  {
    invoiceNumber: 'INV-2026-00410',
    applicantId: 'DH-2026-00126',
    applicantName: 'Muhammad Rizky Ramadhan',
    costType: 'Biaya Registrasi & Formulir',
    amount: 250000,
    method: 'Transfer BSI',
    date: '21 Okt 2026, 11:20 WIB',
    status: 'Menunggu Verifikasi',
    proofImage: 'struk_atm_rizky.jpg',
    verifiedBy: null,
    verifiedAt: null,
    notes: 'Bukti transfer diunggah calon santri, menunggu pengecekan mutasi.'
  },
  {
    invoiceNumber: 'INV-2026-00409',
    applicantId: 'DH-2026-00124',
    applicantName: 'Abdul Rahman Al-Ghifari',
    costType: 'Biaya Registrasi & Formulir',
    amount: 250000,
    method: 'Tunai di Kasir PPDB',
    date: '20 Okt 2026, 13:45 WIB',
    status: 'Lunas',
    proofImage: 'kuitansi_fisik_kasir_0124.jpg',
    verifiedBy: 'Ahmad Sofyan (Kasir)',
    verifiedAt: '20 Okt 2026, 13:50 WIB',
    notes: 'Pembayaran tunai langsung di kantor sekretariat PPDB.'
  },
  {
    invoiceNumber: 'INV-2026-00408',
    applicantId: 'DH-2026-00127',
    applicantName: 'Siti Aisyah Humaira',
    costType: 'Biaya Registrasi & Formulir',
    amount: 250000,
    method: 'Menunggu Pembayaran',
    date: '22 Okt 2026, 08:00 WIB',
    status: 'Belum Bayar',
    proofImage: null,
    verifiedBy: null,
    verifiedAt: null,
    notes: 'Tagihan diterbitkan, batas bayar 24 jam.'
  },
  {
    invoiceNumber: 'INV-2026-00405',
    applicantId: 'DH-2026-00128',
    applicantName: 'Ahmad Fauzan Pratama',
    costType: 'Paket Daftar Ulang & Masuk Asrama',
    amount: 7550000,
    method: 'Transfer BSI',
    date: '23 Okt 2026, 08:30 WIB',
    status: 'Menunggu Verifikasi',
    proofImage: 'bukti_daftar_ulang_fauzan.pdf',
    verifiedBy: null,
    verifiedAt: null,
    notes: 'Uang pangkal, seragam, kitab, dan SPP bulan pertama.'
  }
]
