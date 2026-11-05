// Data dummy ujian online & seleksi PPDB Darul Harumain

export const mockExamSchedules = [
  {
    id: 'SCH-01',
    subject: 'Tes Pengetahuan Agama & Dasar Akademik (CBT Online)',
    type: 'CBT Online',
    date: 'Sabtu, 24 Oktober 2026',
    time: '08:30 - 10:00 WIB (90 Menit)',
    quota: 150,
    registered: 142,
    completed: 98,
    status: 'Sedang Berlangsung',
    room: 'Portal Ujian Online Mandiri'
  },
  {
    id: 'SCH-02',
    subject: 'Uji Bacaan & Tahfidz Al-Qur\'an (Lisan)',
    type: 'Ujian Lisan / Praktik',
    date: 'Minggu, 25 Oktober 2026',
    time: '08:00 - 12:00 WIB',
    quota: 100,
    registered: 86,
    completed: 45,
    status: 'Terjadwal',
    room: 'Masjid Jami\' Lantai 2 / Video Call Simulasi'
  },
  {
    id: 'SCH-03',
    subject: 'Wawancara Kepribadian Calon Santri & Wali',
    type: 'Wawancara Terstruktur',
    date: 'Senin, 26 Oktober 2026',
    time: '08:30 - 15:00 WIB',
    quota: 80,
    registered: 64,
    completed: 20,
    status: 'Terjadwal',
    room: 'Gedung Rektorat Lt. 1'
  }
]

export const mockQuestions = [
  {
    id: 1,
    category: 'Pengetahuan Al-Qur\'an',
    question: 'Berapa jumlah juz dan surat yang terdapat dalam mushaf Al-Qur\'an standar?',
    options: [
      '30 Juz dan 114 Surat',
      '30 Juz dan 112 Surat',
      '29 Juz dan 114 Surat',
      '30 Juz dan 120 Surat'
    ],
    correctAnswer: 0,
    explanation: 'Al-Qur\'an terdiri dari 30 juz dan 114 surat, dimulai dari Surat Al-Fatihah hingga Surat An-Nas.'
  },
  {
    id: 2,
    category: 'Tajwid & Makharijul Huruf',
    question: 'Hukum bacaan apabila Nun Sukun (نْ) atau Tanwin bertemu dengan huruf Ra (ر) atau Lam (ل) adalah...',
    options: [
      'Izhar Halqi',
      'Idgham Bighunnah',
      'Idgham Bilaghunnah',
      'Ikhfa Haqiqi'
    ],
    correctAnswer: 2,
    explanation: 'Idgham Bilaghunnah terjadi jika nun sukun atau tanwin bertemu huruf Lam atau Ra, dibaca melebur tanpa dengung.'
  },
  {
    id: 3,
    category: 'Fiqih Ibadah',
    question: 'Berikut ini yang termasuk salah satu dari rukun wudhu yang wajib dilaksanakan adalah...',
    options: [
      'Berkumur-kumur tiga kali',
      'Membasuh kedua telinga',
      'Membasuh muka disertai niat',
      'Mendahulukan anggota wudhu sebelah kanan'
    ],
    correctAnswer: 2,
    explanation: 'Membasuh muka dengan niat adalah salah satu rukun fardhu wudhu menurut jumhur ulama.'
  },
  {
    id: 4,
    category: 'Bahasa Arab Dasar',
    question: 'Arti dari mufradat "مَدْرَسَةٌ" (Madrasatun) dan "مَكْتَبَةٌ" (Maktabatun) berturut-turut adalah...',
    options: [
      'Sekolah dan Perpustakaan',
      'Kelas dan Kantor',
      'Masjid dan Asrama',
      'Rumah dan Laboratorium'
    ],
    correctAnswer: 0,
    explanation: 'Madrasatun berarti sekolah, sedangkan maktabatun berarti perpustakaan.'
  },
  {
    id: 5,
    category: 'Akhlaq & Adab Santri',
    question: 'Bagaimana adab seorang penuntut ilmu (santri) terhadap guru/ustadz menurut kitab Ta\'lim al-Muta\'allim?',
    options: [
      'Mendebat guru di depan santri lain agar terlihat cerdas',
      'Memuliakan guru, bersikap tawadhu\', dan tidak berjalan mendahului tanpa izin',
      'Menghafal pelajaran tanpa memperhatikan ridha guru',
      'Hanya menghormati guru ketika berada di dalam kelas saja'
    ],
    correctAnswer: 1,
    explanation: 'Ta\'zhimul ustadz (memuliakan guru) dan tawadhu\' adalah kunci utama keberkahan ilmu seorang santri.'
  }
]
