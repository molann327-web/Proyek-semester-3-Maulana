// Data dummy Helpdesk & FAQ PPDB Darul Harumain

export const mockFaqs = [
  {
    category: 'Persyaratan & Berkas',
    items: [
      {
        q: 'Apa saja berkas utama yang wajib disiapkan saat pendaftaran?',
        a: 'Berkas wajib meliputi: Scan Kartu Keluarga asli, Akta Kelahiran calon santri, Ijazah atau Surat Keterangan Lulus (SKL) / raport terakhir, Pas Foto formal 3x4 latar biru/merah, serta Surat Keterangan Sehat dari dokter/puskesmas.'
      },
      {
        q: 'Bagaimana jika ijazah resmi belum terbit saat mendaftar?',
        a: 'Calon santri dapat menggunakan Surat Keterangan Lulus (SKL) sementara atau surat keterangan aktif dari kepala sekolah asal dengan cap basah.'
      },
      {
        q: 'Apakah menerima santri pindahan (mutasi) di luar gelombang reguler?',
        a: 'Untuk santri mutasi/pindahan, pendaftaran dibuka dengan konsultasi khusus melalui sekretariat pondok dan disesuaikan dengan ketersediaan kamar asrama.'
      }
    ]
  },
  {
    category: 'Biaya & Pembayaran',
    items: [
      {
        q: 'Berapa biaya pendaftaran awal dan bagaimana cara pembayarannya?',
        a: 'Biaya formulir pendaftaran adalah Rp 350.000,- yang dapat dibayarkan melalui transfer ke rekening resmi Bank Syariah Indonesia (BSI) Ka Fatkhan (7335153493) atau melalui konfirmasi panitia.'
      },
      {
        q: 'Apakah biaya daftar ulang (uang pangkal) dapat diangsur?',
        a: 'Pondok Pesantren Darul Harumain menyediakan skema pembayaran bertahap (maksimal 2 termin) dengan persetujuan bagian keuangan pada saat wawancara wali santri.'
      },
      {
        q: 'Apakah tersedia beasiswa penuh untuk santri berprestasi?',
        a: 'Ya, tersedia beasiswa khusus bagi hafizh Al-Qur\'an minimal 5 Juz serta jalur beasiswa dhuafa/yatim berprestasi dengan melampirkan SKTM resmi.'
      }
    ]
  },
  {
    category: 'Tes & Kehidupan Pesantren',
    items: [
      {
        q: 'Materi apa saja yang diujikan dalam tes seleksi masuk?',
        a: 'Materi seleksi mencakup: 1) Tes lisan membaca Al-Qur\'an dan hafalan juz amma, 2) Tes CBT online dasar keagamaan dan akademik umum, 3) Wawancara motivasi santri dan kesiapan orang tua/wali.'
      },
      {
        q: 'Apakah santri diperkenankan membawa gadget / telepon genggam di asrama?',
        a: 'Demi fokus ibadah dan belajar, santri tidak diperkenankan membawa smartphone ke asrama. Pondok menyediakan jadwal video call terjadwal melalui telepon asrama atau ustadz pendamping.'
      }
    ]
  }
]

export const mockChatMessages = [
  {
    id: 1,
    sender: 'system',
    text: "Assalamu'alaikum Wr. Wb. Selamat datang di Layanan Informasi PPDB Pondok Pesantren Darul Harumain. Ada yang dapat panitia bantu mengenai pendaftaran santri baru?",
    time: '08:00'
  },
  {
    id: 2,
    sender: 'user',
    text: 'Wa\'alaikumsalam ustadz. Mau tanya untuk tes hafalan Al-Qur\'an apakah harus sudah hafal juz 30 penuh?',
    time: '08:05'
  },
  {
    id: 3,
    sender: 'staff',
    name: 'Ustadzah Fitria (Panitia Helpdesk)',
    text: 'Untuk jalur reguler, panitia menguji kelancaran membaca Al-Qur\'an sesuai kaidah tajwid, makhraj, dan hafalan surat-surat pendek (minimal juz 30 sebagian). Namun jika mendaftar jalur Tahfidz Intensif, diutamakan telah memiliki hafalan mutqin minimal 1-2 juz.',
    time: '08:08'
  }
]

export const mockHelpdeskTickets = [
  {
    id: 'TCK-201',
    applicantName: 'H. Muhammad Yusuf (Wali Ahmad Fauzan)',
    subject: 'Konfirmasi jadwal tes wawancara via online',
    category: 'Ujian Seleksi',
    status: 'Selesai',
    date: '22 Okt 2026',
    priority: 'Normal'
  },
  {
    id: 'TCK-202',
    applicantName: 'Hendri Gunawan (Wali M. Rizky)',
    subject: 'Format berkas akta kelahiran gagal terupload',
    category: 'Unggah Berkas',
    status: 'Sedang Diproses',
    date: '21 Okt 2026',
    priority: 'Tinggi'
  },
  {
    id: 'TCK-203',
    applicantName: 'Ibu Nurhayati (Wali Bilal Habasyi)',
    subject: 'Pengajuan surat rekomendasi beasiswa dhuafa',
    category: 'Beasiswa',
    status: 'Menunggu Tanggapan',
    date: '20 Okt 2026',
    priority: 'Tinggi'
  }
]
