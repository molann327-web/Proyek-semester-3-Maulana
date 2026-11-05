// Data dummy asrama & ke-santrian PPDB Darul Harumain

export const mockDormBuildings = [
  {
    id: 'BL-01',
    name: 'Asrama Putra - Gedung Al-Farabi',
    type: 'Putra',
    floors: 3,
    totalRooms: 24,
    capacity: 96,
    occupied: 72,
    supervisor: 'Ustadz Wildan Firdaus, Lc.',
    rooms: [
      { roomNo: 'A-101', capacity: 4, occupied: 4, status: 'Penuh', occupants: ['Ahmad Fauzan Pratama', 'Hafidz Maulana', 'Zaid Al-Banna', 'Rayhan Pratama'] },
      { roomNo: 'A-102', capacity: 4, occupied: 3, status: 'Tersedia 1', occupants: ['Irfan Syakir', 'Fikri Haikal', 'Salman Al-Farisi'] },
      { roomNo: 'A-201', capacity: 4, occupied: 2, status: 'Tersedia 2', occupants: ['Bagus Kurniawan', 'Daffa Rabbani'] },
      { roomNo: 'A-204', capacity: 4, occupied: 3, status: 'Tersedia 1', occupants: ['Ahmad Fauzan Pratama', 'Rafi Ahmad', 'Danu Wijaya'] }
    ]
  },
  {
    id: 'BL-02',
    name: 'Asrama Putri - Gedung Khadijah',
    type: 'Putri',
    floors: 3,
    totalRooms: 24,
    capacity: 96,
    occupied: 80,
    supervisor: 'Ustadzah Maryam Salsabila, S.Pd.',
    rooms: [
      { roomNo: 'B-101', capacity: 4, occupied: 4, status: 'Penuh', occupants: ['Siti Fatimah', 'Zahra Amelia', 'Nabila Putri', 'Alya Rahma'] },
      { roomNo: 'B-102', capacity: 4, occupied: 3, status: 'Tersedia 1', occupants: ['Nurul Hidayah Al-Zahra', 'Salwa Azzahra', 'Fitria Nur'] },
      { roomNo: 'B-105', capacity: 4, occupied: 3, status: 'Tersedia 1', occupants: ['Fathimah Az-Zahro', 'Husna Maulida', 'Najwa Shihab'] }
    ]
  },
  {
    id: 'BL-03',
    name: 'Asrama Khusus Tahfidz - Gedung Ibnu Sina',
    type: 'Putra (Tahfidz Intensif)',
    floors: 2,
    totalRooms: 12,
    capacity: 48,
    occupied: 32,
    supervisor: 'Ustadz Ahmad Syauqi, Al-Hafidz',
    rooms: [
      { roomNo: 'T-101', capacity: 4, occupied: 3, status: 'Tersedia 1', occupants: ['Bilal Habasyi Siregar', 'Hamzah Fansuri', 'Tariq Ziyad'] },
      { roomNo: 'T-102', capacity: 4, occupied: 2, status: 'Tersedia 2', occupants: ['Muzammil Hasballah', 'Idris Sanusi'] }
    ]
  }
]

export const mockStarterEquipments = [
  { item: 'Kasur Busa & Bantal Standar Pesantren', qty: '1 Set', received: true, note: 'Lengkap dengan sprei hijau brand Darul Harumain' },
  { item: 'Lemari Pakaian 2 Pintu + Kunci Khusus', qty: '1 Unit', received: true, note: 'Nomor inventaris lemari sesuai nomor ranjang' },
  { item: 'Seragam Jubah Putih & Peci Hitam', qty: '2 Pasang', received: true, note: 'Ukuran M/L telah disesuaikan' },
  { item: 'Seragam Pramuka Santri & Olahraga', qty: '2 Pasang', received: false, note: 'Tahap bordir nama santri' },
  { item: 'Paket Kitab Kuning Dasar (Matan Safinah, Jurumiyah, Aqidatul Awam)', qty: '1 Paket', received: true, note: 'Diberikan saat ta\'aruf santri' }
]
