import React from 'react'

export function StatusBadge({ status, className = '' }) {
  const getBadgeStyle = (val) => {
    switch (val) {
      // Pendaftaran & Verifikasi
      case 'Terverifikasi':
      case 'Lunas':
      case 'Lulus':
      case 'Valid':
      case 'Selesai':
      case 'Terkirim':
      case 'Aktif':
      case 'Ditempatkan':
        return 'bg-emerald-50 text-emerald-700 ring-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-800'

      case 'Menunggu berkas':
      case 'Menunggu':
      case 'Menunggu Verifikasi':
      case 'Menunggu Tanggapan':
      case 'Dalam seleksi':
      case 'Sedang Diproses':
      case 'Sedang Berlangsung':
      case 'Terjadwal':
      case 'Belum Dijadwalkan':
        return 'bg-amber-50 text-amber-700 ring-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-800'

      case 'Perlu perbaikan':
      case 'Ditolak':
      case 'Gagal':
      case 'Belum bayar':
      case 'Tidak Lulus':
      case 'Belum unggah':
        return 'bg-rose-50 text-rose-700 ring-rose-200/80 dark:bg-rose-950/40 dark:text-rose-300 dark:ring-rose-800'

      case 'Daftar Tunggu':
      case 'Cadangan':
        return 'bg-blue-50 text-blue-700 ring-blue-200/80 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-800'

      case 'Draft':
      case 'Segera Dibuka':
      default:
        return 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700'
    }
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${getBadgeStyle(
        status
      )} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      <span>{status || 'Draft'}</span>
    </span>
  )
}
