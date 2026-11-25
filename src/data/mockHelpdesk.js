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

// Mesin Penjawab Otomatis Cerdas & Kontekstual untuk Helpdesk Live Chat PPDB
export function generateSmartHelpdeskReply(query) {
  if (!query || typeof query !== 'string') {
    return 'Assalamu\'alaikum. Ada yang dapat panitia bantu mengenai pendaftaran santri baru Pondok Pesantren Darul Harumain?'
  }

  const q = query.toLowerCase().trim()

  // 1. Biaya Daftar Ulang (SMP / SMA)
  if (
    (q.includes('daftar ulang') || q.includes('pendaftaran ulang') || q.includes('daftulang')) ||
    ((q.includes('smp') || q.includes('sma') || q.includes('mts') || q.includes('smk') || q.includes('ma')) && (q.includes('biaya') || q.includes('berapa')))
  ) {
    return 'Untuk biaya Pendaftaran Ulang resmi berdasarkan jenjang pendidikan santri adalah:\n• Jenjang SMP / MTs: Rp 1.200.000\n• Jenjang SMA / SMK / MA: Rp 1.400.000\nBiaya daftar ulang ini dibayarkan setelah calon santri melengkapi berkas, dinyatakan valid oleh admin, dan mengikuti tes pemetaan. Setelah daftar ulang, penempatan kamar asrama akan otomatis terbuka.'
  }

  // 2. Rincian Biaya Pendaftaran Resmi / Paket Masuk (Rp 7.725.000)
  if (
    q.includes('biaya') || q.includes('tarif') || q.includes('uang pangkal') || 
    q.includes('formulir') || q.includes('syahriah') || q.includes('infak') || 
    q.includes('spp') || q.includes('harga') || q.includes('7.725') || q.includes('total biaya')
  ) {
    return 'Rincian Biaya Pendaftaran Resmi Pondok Pesantren Darul Harumain (Total Paket Masuk Rp 7.725.000) adalah:\n1. Formulir Pendaftaran: Rp 350.000\n2. Uang Pangkal & Pendidikan: Rp 4.000.000\n3. Infak Bangunan Pesantren: Rp 2.500.000\n4. Syahriah / Bulanan (Bulan Juli): Rp 875.000\n\n*Catatan Resmi: Paket Rp 7.725.000 di atas belum termasuk Kitab, LKS, Kasur, dan Seragam. Biaya ditransfer ke rekening resmi BSI 7335153493 a.n. Fatkhan.'
  }

  // 3. Perlengkapan Santri (Kasur, Kitab, Seragam)
  if (
    q.includes('perlengkapan') || q.includes('kasur') || q.includes('kitab') || 
    q.includes('seragam') || q.includes('buku') || q.includes('lks') || 
    q.includes('amtsilati') || q.includes('jas') || q.includes('batik')
  ) {
    return 'Rincian biaya perlengkapan santri baru (SK Resmi Panitia PSB Ka Fatkhan):\n• Kasur Busa Berkualitas (1 paket): Rp 300.000\n• Paket 10 Kitab Amtsilati & LKS Sekolah: Rp 617.500\n• Paket Seragam Lengkap (Batik, Semi Jas, Olahraga): Rp 1.050.000 (Putra) / Rp 1.100.000 (Putri)\n\nGrand Total Perlengkapan: Rp 1.967.500 (Putra) atau Rp 2.017.500 (Putri).'
  }

  // 4. Nomor Rekening Resmi / Transfer / Pembayaran
  if (
    q.includes('rekening') || q.includes('transfer') || q.includes('no rek') || 
    q.includes('norek') || q.includes('bsi') || q.includes('bank') || 
    q.includes('bayar lewat') || q.includes('bukti transfer')
  ) {
    return 'Pembayaran resmi PPDB Pondok Pesantren Darul Harumain disalurkan HANYA melalui rekening tunggal resmi:\n• Bank: Bank Syariah Indonesia (BSI)\n• No. Rekening: 7335153493\n• Atas Nama: Fatkhan (Ketua Panitia PSB)\n\nSetelah transfer, simpan struk/bukti dan unggah di menu "Tagihan & Pembayaran" pada portal santri atau kirimkan via WhatsApp Ka Fatkhan.'
  }

  // 5. Kontak Panitia / Ka Fatkhan / WhatsApp
  if (
    q.includes('kontak') || q.includes('wa') || q.includes('whatsapp') || 
    q.includes('nomor panitia') || q.includes('no hp') || q.includes('telepon') || 
    q.includes('fatkhan') || q.includes('hubungi')
  ) {
    return 'Anda dapat menghubungi langsung Ketua Panitia PSB:\n• Nama: Ka Fatkhan (Fatkan Nur Fiqli, S.Pd.)\n• WhatsApp / Telp: 0813-8025-2083\n• Tautan Chat Langsung: https://wa.me/6281380252083\nPanitia siaga melayani konsultasi pendaftaran setiap hari kerja pukul 08.00 - 16.00 WIB.'
  }

  // 6. Tes / Ujian CBT Online / Tes Al-Qur'an / Sifat Pemetaan
  if (
    q.includes('tes') || q.includes('ujian') || q.includes('cbt') || 
    q.includes('hafalan') || q.includes('materi tes') || q.includes('gugur') || 
    q.includes('lulus') || q.includes('seleksi') || q.includes('tahfidz') || 
    q.includes('qur\'an') || q.includes('tajwid')
  ) {
    return 'Mengenai ujian seleksi di Darul Harumain:\n1. Materi Tes: Tes Lisan Al-Qur\'an (makhraj, tajwid, hafalan surat-surat juz 30) dan Tes CBT Online (pengetahuan agama dasar & akademik).\n2. Sifat Tes: Tes ini murni untuk PEMETAAN KEMAMPUAN AWAL (diagnostic test) calon santri, BUKAN untuk menggugurkan/mengeliminasi pendaftar. Hasil tes digunakan asatidz untuk menempatkan bimbingan halaqah Al-Qur\'an dan kelas sesuai kemampuan santri.\nTes baru dapat diakses setelah berkas pendaftaran Anda dinyatakan valid oleh admin.'
  }

  // 7. Persyaratan Berkas & Dokumen
  if (
    q.includes('syarat') || q.includes('berkas') || q.includes('dokumen') || 
    q.includes('kk') || q.includes('akta') || q.includes('ijazah') || 
    q.includes('skl') || q.includes('foto') || q.includes('upload') || q.includes('unggah')
  ) {
    return 'Berkas yang wajib diunggah pada formulir pendaftaran:\n1. Kartu Keluarga (KK) asli\n2. Akta Kelahiran Calon Santri\n3. Ijazah Terakhir atau Surat Keterangan Lulus (SKL) / raport terakhir\n4. Pas Foto resmi 3x4 (pakaian muslim rapi, latar biru/merah)\n5. Surat Keterangan Sehat dari dokter / puskesmas\n\n*Jika ijazah belum keluar dari sekolah asal, Anda cukup mengunggah SKL sementara berstempel basah.'
  }

  // 8. Kamar Asrama & Penempatan
  if (
    q.includes('kamar') || q.includes('asrama') || q.includes('gedung') || 
    q.includes('fasilitas kamar') || q.includes('ranjang') || q.includes('lemari')
  ) {
    return 'Mengenai Asrama & Kamar Santri:\n• Penempatan kamar asrama akan otomatis dapat dilihat di Portal Santri setelah:\n  1) Berkas divalidasi oleh admin verifikator,\n  2) Calon santri telah mengikuti tes pemetaan, dan\n  3) Telah menyelesaikan pendaftaran ulang.\n• Kamar asrama dilengkapi kasur busa berkualitas, lemari pakaian santri, sirkulasi udara optimal, serta didampingi musyrif/musyrifah 24 jam.'
  }

  // 9. Jadwal Gelombang & Waktu Pendaftaran
  if (
    q.includes('jadwal') || q.includes('gelombang') || q.includes('kapan') || 
    q.includes('buka') || q.includes('tutup') || q.includes('periode') || q.includes('batas')
  ) {
    return 'Jadwal PPDB Pondok Pesantren Darul Harumain Tahun Pelajaran 2027/2028:\n• Gelombang 1: 01 September 2026 – 30 November 2026 (Jadwal tes pemetaan: 06–08 Desember 2026)\n• Gelombang 2: 01 Januari 2027 – 28 Februari 2027 (Jadwal tes pemetaan: 07–09 Maret 2027)\nDisarankan segera mendaftar karena pendaftaran otomatis ditutup jika kuota asrama per jenjang telah terpenuhi.'
  }

  // 10. Aturan Gadget / HP / Komunikasi Santri
  if (
    q.includes('hp') || q.includes('handphone') || q.includes('gadget') || 
    q.includes('smartphone') || q.includes('telepon') || q.includes('jenguk') || q.includes('sambang')
  ) {
    return 'Ketentuan Gadget & Komunikasi Santri di Asrama:\n• Santri TIDAK diperkenankan membawa smartphone/HP pribadi ke asrama pondok demi fokus ibadah dan belajar Al-Qur\'an.\n• Komunikasi santri dengan orang tua disediakan secara rutin dan terjadwal melalui telepon pondok atau asatidz pendamping asrama.\n• Jadwal kunjungan/sambang orang tua dilaksanakan rutin setiap 2 pekan sekali pada hari Ahad.'
  }

  // 11. Alamat / Lokasi / Kampus Pesantren & Survei
  if (
    q.includes('alamat') || q.includes('lokasi') || q.includes('dimana') || 
    q.includes('tempat') || q.includes('bogor') || q.includes('survei') || q.includes('rute')
  ) {
    return 'Lokasi Kampus Pondok Pesantren Darul Harumain:\nJl. Pesantren No. 14, Bogor Barat, Kota Bogor, Jawa Barat.\n\nBagi calon wali santri yang ingin melakukan survei lokasi/kunjungan langsung, kami membuka silaturahmi setiap hari kerja. Silakan konfirmasi jadwal kunjungan terlebih dahulu melalui WhatsApp Ka Fatkhan di 0813-8025-2083.'
  }

  // 12. Alur Pendaftaran (Step-by-step)
  if (
    q.includes('alur') || q.includes('cara daftar') || q.includes('langkah') || 
    q.includes('tahapan') || q.includes('gimana cara') || q.includes('bagaimana cara')
  ) {
    return 'Alur Pendaftaran Santri Baru (5 Langkah):\n1. Daftar Akun: Buat akun di portal santri dan peroleh nomor pendaftaran.\n2. Lengkapi Berkas: Isi biodata diri, orang tua, dan unggah dokumen (KK, Akta, Ijazah/SKL, Foto).\n3. Verifikasi Panitia: Panitia memvalidasi keaslian berkas pendaftaran Anda.\n4. Tes Pemetaan: Mengikuti tes pemetaan Al-Qur\'an dan CBT online.\n5. Daftar Ulang & Kamar: Melakukan daftar ulang dan langsung melihat penempatan kamar asrama.'
  }

  // 13. Lupa Kata Sandi / Masalah Login
  if (
    q.includes('lupa sandi') || q.includes('lupa password') || 
    q.includes('tidak bisa login') || q.includes('reset password') || q.includes('kata sandi')
  ) {
    return 'Jika Anda mengalami kendala saat masuk ke portal santri atau lupa kata sandi:\nSilakan buka halaman Login, lalu klik tombol "Atur Ulang Kata Sandi (Lupa Sandi)". Masukkan email atau nomor pendaftaran Anda (misal: DH-2026-00128) untuk mengatur kata sandi baru secara instan.'
  }

  // 14. Salam & Sapaan Sopan
  if (
    q.startsWith('assalam') || q.includes('halo') || q.includes('hai') || 
    q.includes('pagi') || q.includes('siang') || q.includes('sore') || q.includes('malam') || q.includes('permisi')
  ) {
    return 'Wa\'alaikumsalam Wr. Wb. Selamat datang di Layanan Konsultasi & Helpdesk PPDB Pondok Pesantren Darul Harumain!\nAda yang dapat kami bantu seputar informasi rincian biaya, kelengkapan berkas, alur ujian pemetaan, atau rekening pembayaran resmi?'
  }

  // 15. Ucapan Terima Kasih
  if (
    q.includes('terima kasih') || q.includes('makasih') || q.includes('syukron') || 
    q.includes('jazakallah') || q.includes('alhamdulillah')
  ) {
    return 'Afwan jiddan, sama-sama Bapak/Ibu. Senang dapat membantu Anda. Semoga proses pendaftaran putra/putri Anda di Pondok Pesantren Darul Harumain diberikan kelancaran dan barakah. Jika ada pertanyaan lanjutan, jangan ragu untuk menghubungi kami kembali atau hubungi Ka Fatkhan di WhatsApp 0813-8025-2083.'
  }

  // 16. Fallback Cerdas (Menjawab dengan ringkasan poin penting)
  return `Terima kasih atas pertanyaan Anda: "${query}".\n\nUntuk informasi pendaftaran santri baru Darul Harumain:\n• Paket Biaya Pendaftaran Masuk: Rp 7.725.000\n• Biaya Daftar Ulang: SMP Rp 1.200.000 / SMA Rp 1.400.000\n• Rekening Resmi BSI: 7335153493 a.n. Fatkhan\n• Kontak Ketua Panitia (Ka Fatkhan): 0813-8025-2083 (WhatsApp)\n\nJika pertanyaan Anda memerlukan konfirmasi berkas khusus, silakan buat "Tiket Pertanyaan Baru" pada tombol di atas atau hubungi Ka Fatkhan melalui WhatsApp.`
}
