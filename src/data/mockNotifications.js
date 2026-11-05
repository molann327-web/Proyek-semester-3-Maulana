// Data dummy notifikasi WhatsApp & Email Gateway PPDB Darul Harumain

export const mockNotificationTemplates = [
  {
    id: 'TPL-01',
    event: 'Registrasi Akun Baru',
    channel: 'WhatsApp',
    category: 'Akun',
    content: "Assalamu'alaikum Wr. Wb. Bapak/Ibu {{nama_wali}},\n\nTerima kasih telah mendaftarkan ananda *{{nama_santri}}* di PPDB Pondok Pesantren Darul Harumain T.A. 2026/2027.\n\nNomor Pendaftaran: *{{nomor_pendaftaran}}*\nKode Akses: *{{kode_akses}}*\n\nSilakan melengkapi berkas dan formulir pada tautan: https://ppdb.darulharumain.sch.id/portal\n\nWassalamu'alaikum Wr. Wb.\n_Sekretariat PPDB Darul Harumain_"
  },
  {
    id: 'TPL-02',
    event: 'Pembayaran Terverifikasi (Lunas)',
    channel: 'WhatsApp',
    category: 'Keuangan',
    content: "Assalamu'alaikum Wr. Wb. {{nama_wali}},\n\nPembayaran biaya pendaftaran santri baru atas nama *{{nama_santri}}* (No: *{{nomor_pendaftaran}}*) sebesar *Rp {{nominal}}* telah BERHASIL diverifikasi (LUNAS).\n\nKuitansi elektronik dan kartu tes online dapat diunduh di dashboard pendaftaran.\n\nWassalamu'alaikum Wr. Wb.\n_Panitia Keuangan PPDB Darul Harumain_"
  },
  {
    id: 'TPL-03',
    event: 'Perbaikan Berkas Diperlukan',
    channel: 'WhatsApp',
    category: 'Verifikasi',
    content: "Assalamu'alaikum Wr. Wb. {{nama_wali}},\n\nBerdasarkan verifikasi panitia, berkas pendaftaran ananda *{{nama_santri}}* membutuhkan perbaikan pada:\n*{{catatan_perbaikan}}*\n\nMohon unggah ulang dokumen tersebut sebelum *{{batas_waktu}}* melalui portal PPDB.\n\nTerima kasih atas kerja samanya.\n_Tim Verifikasi Darul Harumain_"
  },
  {
    id: 'TPL-04',
    event: 'Jadwal Tes & Ujian Seleksi',
    channel: 'WhatsApp',
    category: 'Ujian',
    content: "Assalamu'alaikum Wr. Wb. {{nama_wali}},\n\nBerikut ini adalah jadwal pelaksanaan seleksi santri baru untuk ananda *{{nama_santri}}*:\n\n📅 Tanggal: *{{tanggal_tes}}*\n⏰ Waktu: *{{waktu_tes}}*\n📍 Sesi: *{{sesi_ujian}}*\n\nHarap hadir 30 menit sebelum sesi dimulai dengan membawa Kartu Ujian fisik. Jazakumullah khair."
  },
  {
    id: 'TPL-05',
    event: 'Pengumuman Hasil Kelulusan',
    channel: 'WhatsApp & Email',
    category: 'Kelulusan',
    content: "Assalamu'alaikum Wr. Wb. {{nama_wali}},\n\nAlhamdulillah, panitia seleksi PPDB Darul Harumain menyatakan ananda *{{nama_santri}}* dinyatakan:\n\n🎉 *{{status_kelulusan}}* 🎉\nProgram: {{program_santri}}\n\nSilakan login ke portal untuk melihat SK Kelulusan resmi dan instruksi daftar ulang.\nBarakallahu fiikum."
  }
]

export const mockMessageQueue = [
  {
    id: 'MSG-8821',
    recipient: '0812-9876-5432 (H. Muhammad Yusuf)',
    recipientName: 'Ahmad Fauzan Pratama',
    event: 'Pembayaran Terverifikasi (Lunas)',
    channel: 'WhatsApp',
    status: 'Terkirim',
    timestamp: '22 Okt 2026, 10:06 WIB',
    retries: 0
  },
  {
    id: 'MSG-8820',
    recipient: '0813-2233-4455 (Hendri Gunawan)',
    recipientName: 'Muhammad Rizky Ramadhan',
    event: 'Perbaikan Berkas Diperlukan',
    channel: 'WhatsApp',
    status: 'Menunggu',
    timestamp: '22 Okt 2026, 09:40 WIB',
    retries: 0
  },
  {
    id: 'MSG-8819',
    recipient: '0878-1122-3344 (H. Lukman Hakim)',
    recipientName: 'Nurul Hidayah Al-Zahra',
    event: 'Pengumuman Hasil Kelulusan',
    channel: 'WhatsApp',
    status: 'Terkirim',
    timestamp: '21 Okt 2026, 15:02 WIB',
    retries: 0
  },
  {
    id: 'MSG-8818',
    recipient: '0857-8899-1122 (Drs. Rahmat)',
    recipientName: 'Siti Aisyah Humaira',
    event: 'Registrasi Akun Baru',
    channel: 'WhatsApp',
    status: 'Terkirim',
    timestamp: '21 Okt 2026, 08:15 WIB',
    retries: 0
  },
  {
    id: 'MSG-8817',
    recipient: '0812-4455-6677 (Agus Salim)',
    recipientName: 'Abdul Rahman Al-Ghifari',
    event: 'Jadwal Tes & Ujian Seleksi',
    channel: 'WhatsApp',
    status: 'Gagal',
    timestamp: '20 Okt 2026, 14:00 WIB',
    retries: 2,
    failureReason: 'Nomor tujuan tidak aktif / jaringan timeout'
  }
]
