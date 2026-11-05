import React, { useState } from 'react'
import {
  ChartNoAxesCombined,
  Download,
  Printer,
  FileSpreadsheet,
  FileText,
  Calendar,
  Filter,
  CheckCircle2,
  Users,
  Award,
  Wallet
} from 'lucide-react'
import { StatCard } from '../../components/common/StatCard'

export function ReportsPage({ applicants, onNotify }) {
  const [selectedPeriod, setSelectedPeriod] = useState('T.A. 2026 / 2027')
  const [selectedWave, setSelectedWave] = useState('Gelombang 1')

  const total = applicants.length
  const verified = applicants.filter((a) => a.status === 'Terverifikasi').length
  const paid = applicants.filter((a) => a.pay === 'Lunas').length
  const passed = applicants.filter((a) => a.selectionScores?.result === 'Lulus').length

  const handleExport = (reportName, format) => {
    onNotify(`${reportName} berhasil diekspor ke format ${format} (simulasi lokal)`)
  }

  const reportsList = [
    {
      id: 'REP-01',
      title: 'Laporan Rekapitulasi Seluruh Calon Santri',
      desc: 'Berisi data lengkap profil santri, NIK, NISN, sekolah asal, dan kontak wali santri.',
      badge: 'Data Master',
      updated: '23 Okt 2026'
    },
    {
      id: 'REP-02',
      title: 'Laporan Pemeriksaan & Verifikasi Dokumen',
      desc: 'Catatan validasi KK, akta kelahiran, foto, dan status berkas yang perlu perbaikan.',
      badge: 'Verifikasi',
      updated: '22 Okt 2026'
    },
    {
      id: 'REP-03',
      title: 'Laporan Rekap Penerimaan Keuangan PPDB',
      desc: 'Rincian penerimaan biaya formulir, infaq pembangunan, daftar ulang, dan status mutasi bank.',
      badge: 'Keuangan',
      updated: '23 Okt 2026'
    },
    {
      id: 'REP-04',
      title: 'Laporan Hasil Seleksi & Surat Keputusan Kelulusan',
      desc: 'Daftar nilai tes Al-Qur\'an, tes tulis CBT, wawancara, dan penetapan santri diterima.',
      badge: 'Kelulusan',
      updated: '21 Okt 2026'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
              <ChartNoAxesCombined size={14} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[.15em] text-brand-700 dark:text-brand-300">
              Modul Pelaporan & Pimpinan
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[30px]">
            Pelaporan Eksekutif & Analitik PPDB
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Ringkasan data analitik penerimaan santri untuk mendukung pengambilan keputusan pimpinan pondok pesantren.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs dark:border-white/10 dark:bg-white/5">
            <Calendar size={14} className="text-slate-400" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-transparent font-semibold outline-none dark:text-white"
            >
              <option value="T.A. 2026 / 2027">T.A. 2026 / 2027</option>
              <option value="T.A. 2025 / 2026">T.A. 2025 / 2026</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => handleExport('Laporan Eksekutif Lengkap PPDB', 'PDF')}
            className="flex h-10 items-center gap-2 rounded-xl bg-brand-500 px-4 text-xs font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-600"
          >
            <Download size={14} /> Ekspor Semua Laporan
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Total Pendaftar Masuk"
          value={total}
          delta="100%"
          note="Dari Kuota 250 Santri"
          line="Target 90% Tercapai"
          icon={Users}
          tone="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300"
        />
        <StatCard
          label="Berkas Terverifikasi"
          value={verified}
          delta={`${Math.round((verified / (total || 1)) * 100)}%`}
          note="Lolos Berkas"
          line="Siap Seleksi Lisan"
          icon={CheckCircle2}
          tone="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"
        />
        <StatCard
          label="Pembayaran Registrasi"
          value={paid}
          delta={`${Math.round((paid / (total || 1)) * 100)}%`}
          note="Lunas Terverifikasi"
          line="Dana Diterima"
          icon={Wallet}
          tone="bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300"
        />
        <StatCard
          label="Santri Dinyatakan Lulus"
          value={passed}
          delta={`${Math.round((passed / (total || 1)) * 100)}%`}
          note="Tahap Seleksi"
          line="Siap Penempatan"
          icon={Award}
          tone="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300"
        />
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Funnel Konversi */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#192118]">
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            Konversi Alur Penerimaan Santri Baru
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Tingkat keberhasilan calon santri dari tahap pembuatan akun hingga penetapan kelulusan.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-300">1. Registrasi Akun & Formulir</span>
                <span className="text-slate-800 dark:text-white">{total} Santri (100%)</span>
              </div>
              <div className="mt-1.5 h-2.5 rounded-full bg-slate-100 dark:bg-white/10">
                <div className="h-full w-full rounded-full bg-blue-500" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-300">2. Pembayaran Biaya Pendaftaran</span>
                <span className="text-slate-800 dark:text-white">
                  {paid} Santri ({Math.round((paid / (total || 1)) * 100)}%)
                </span>
              </div>
              <div className="mt-1.5 h-2.5 rounded-full bg-slate-100 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-violet-500"
                  style={{ width: `${Math.round((paid / (total || 1)) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-300">3. Berkas Lengkap & Terverifikasi</span>
                <span className="text-slate-800 dark:text-white">
                  {verified} Santri ({Math.round((verified / (total || 1)) * 100)}%)
                </span>
              </div>
              <div className="mt-1.5 h-2.5 rounded-full bg-slate-100 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-brand-500"
                  style={{ width: `${Math.round((verified / (total || 1)) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-300">4. Lulus Seleksi Masuk Pesantren</span>
                <span className="text-slate-800 dark:text-white">
                  {passed} Santri ({Math.round((passed / (total || 1)) * 100)}%)
                </span>
              </div>
              <div className="mt-1.5 h-2.5 rounded-full bg-slate-100 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${Math.round((passed / (total || 1)) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Demographics / Sebaran Daerah */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#192118]">
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            Sebaran Demografi Asal Pendaftar
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Persebaran wilayah domisili calon santri baru Pondok Pesantren Darul Harumain.
          </p>

          <div className="mt-5 space-y-3.5">
            {[
              { region: 'Kabupaten & Kota Bogor', count: 4, pct: 57, color: 'bg-brand-500' },
              { region: 'Sukabumi & Cianjur', count: 2, pct: 29, color: 'bg-blue-500' },
              { region: 'Luar Provinsi Jawa Barat (Medan, dll.)', count: 1, pct: 14, color: 'bg-amber-500' }
            ].map((reg) => (
              <div key={reg.region}>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-200">{reg.region}</span>
                  <span className="text-slate-500">
                    {reg.count} Santri ({reg.pct}%)
                  </span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-slate-100 dark:bg-white/10">
                  <div
                    className={`h-full rounded-full ${reg.color}`}
                    style={{ width: `${reg.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-brand-50/70 p-3.5 text-xs text-brand-900 dark:bg-brand-900/20 dark:text-brand-200">
            <p className="font-bold">Analisis Rekomendasi Pimpinan:</p>
            Tingkat minat pendaftar dari wilayah Jabodetabek dan Sukabumi sangat dominan (86%). Diusulkan perluasan kuota kamar pada Gelombang 2 untuk jenjang Madrasah Tsanawiyah (MTs).
          </div>
        </div>
      </div>

      {/* Downloadable Reports Section */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#192118]">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/10">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Daftar Dokumen Laporan Siap Unduh
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Format laporan resmi yang dapat dicetak atau diunduh dalam bentuk spreadsheet.
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {reportsList.map((rep) => (
            <div
              key={rep.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.02]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-800 dark:bg-brand-900/40 dark:text-brand-300">
                    {rep.badge}
                  </span>
                  <span className="text-[10px] text-slate-400">Pembaruan: {rep.updated}</span>
                </div>
                <h4 className="mt-2 text-xs font-bold text-slate-800 dark:text-white">
                  {rep.title}
                </h4>
                <p className="mt-1 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
                  {rep.desc}
                </p>
              </div>

              <div className="mt-4 flex gap-2 border-t border-slate-200/60 pt-3 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => handleExport(rep.title, 'PDF')}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-1.5 text-[11px] font-bold text-slate-700 shadow-2xs hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  <FileText size={13} className="text-rose-600" /> Ekspor PDF
                </button>
                <button
                  type="button"
                  onClick={() => handleExport(rep.title, 'Excel (.xlsx)')}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-1.5 text-[11px] font-bold text-slate-700 shadow-2xs hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  <FileSpreadsheet size={13} className="text-emerald-600" /> Ekspor Excel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
