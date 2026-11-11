import React, { useState } from 'react'
import {
  ChartNoAxesCombined,
  Users,
  CheckCircle2,
  Wallet,
  Building,
  Printer,
  Download,
  Filter,
  Search,
  FileSpreadsheet,
  Award,
  BookOpen,
  Calendar,
  Compass,
  FileText,
  BadgeCheck,
  ChevronRight,
  ShieldCheck,
  Receipt
} from 'lucide-react'
import { StatCard } from '../../components/common/StatCard'
import { officialFeeStructure } from '../../data/mockFeeStructure'

export function ExecutiveDashboardPage({ applicants, onNotify }) {
  const [activeTab, setActiveTab] = useState('data-jadi') // 'data-jadi' | 'keuangan' | 'pemetaan'
  const [filterProgram, setFilterProgram] = useState('Semua')
  const [searchTerm, setSearchTerm] = useState('')

  const { reregistrationFees, equipment, admissionPackage, committeeHead, academicYear } = officialFeeStructure

  // Santri yang dianggap data jadi: berkas terverifikasi
  const dataJadiSantri = applicants.filter((a) => {
    const isReady = a.status === 'Terverifikasi'
    const matchesProgram = filterProgram === 'Semua' || a.program?.includes(filterProgram)
    const matchesSearch =
      !searchTerm ||
      a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.school?.toLowerCase().includes(searchTerm.toLowerCase())
    return isReady && matchesProgram && matchesSearch
  })

  // Perhitungan Keuangan Riil Sesuai Brosur Resmi & Ketetapan Baru
  const totalPendaftar = applicants.length
  const totalDataJadi = applicants.filter((a) => a.status === 'Terverifikasi').length
  const totalLunasDaftarUlang = applicants.filter((a) => a.pay === 'Lunas' || a.pay === 'Daftar Ulang Lunas').length

  // Total estimasi kas masuk:
  // Formulir: totalPendaftar * 350.000
  // Santri lunas: Biaya Masuk (Rp 7.725.000) + Daftar Ulang SMP/SMA + Perlengkapan
  let totalKasMasuk = totalPendaftar * 350000
  applicants.forEach((a) => {
    if (a.pay === 'Lunas' || a.pay === 'Daftar Ulang Lunas') {
      const isSma = a.program?.toLowerCase().includes('aliyah') || a.program?.toLowerCase().includes('sma') || a.program?.toLowerCase().includes('smk')
      totalKasMasuk += (admissionPackage.total - 350000) // sisa paket masuk di luar formulir
      totalKasMasuk += isSma ? reregistrationFees.sma.amount : reregistrationFees.smp.amount
      totalKasMasuk += equipment.grandTotal.putra // perlengkapan
    }
  })

  const handleExport = (reportTitle, format) => {
    onNotify(`Laporan Eksekutif "${reportTitle}" berhasil diekspor dalam format ${format}!`)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* ── HEADER EKSEKUTIF ───────────────────────────────────────────── */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end border-b border-slate-200/80 pb-5 dark:border-white/10">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
              <ChartNoAxesCombined size={14} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[.15em] text-indigo-700 dark:text-indigo-300">
              Portal Khusus Pimpinan &bull; Mudir Ma'had
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Laporan Data Jadi &amp; Monitoring Eksekutif PPDB
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Tahun Ajaran {academicYear} &bull; Pengawasan data santri baru, keuangan resmi ({admissionPackage.formattedTotal}), dan hasil pemetaan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
          >
            <Printer size={15} /> Cetak Lembar Eksekutif
          </button>
          <button
            type="button"
            onClick={() => handleExport('Laporan Rekap Data Jadi Santri', 'PDF')}
            className="flex h-10 items-center gap-2 rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-md shadow-indigo-600/25 transition hover:bg-indigo-700 active:scale-95"
          >
            <Download size={14} /> Ekspor Data Jadi (PDF)
          </button>
        </div>
      </div>

      {/* ── KPI EXECUTIVE METRICS ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Total Calon Santri Mendaftar"
          value={totalPendaftar}
          delta="Formulir 350rb"
          note="Gelombang 1 & 2"
          line="Target 250 Santri"
          icon={Users}
          tone="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300"
        />
        <StatCard
          label="Data Jadi (Berkas Valid)"
          value={totalDataJadi}
          delta={`${Math.round((totalDataJadi / (totalPendaftar || 1)) * 100)}%`}
          note="Lolos Verifikasi"
          line="Siap Pembagian Kelas"
          icon={BadgeCheck}
          tone="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"
        />
        <StatCard
          label="Selesai Daftar Ulang"
          value={totalLunasDaftarUlang}
          delta="SMP 1.2Jt / SMA 1.4Jt"
          note="Administrasi Tuntas"
          line="Ranjang Kamar Siap"
          icon={CheckCircle2}
          tone="bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-300"
        />
        <StatCard
          label="Total Dana PPDB Masuk"
          value={new Intl.NumberFormat('id-ID', { notation: 'compact', compactDisplay: 'short' }).format(totalKasMasuk)}
          delta="Paket 7,72 Jt + Daftar Ulang"
          note="Rekening Resmi BSI/BCA"
          line="Termasuk Perlengkapan"
          icon={Wallet}
          tone="bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-300"
        />
      </div>

      {/* ── TAB NAVIGASI PIMPINAN ─────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200/80 pb-3 dark:border-white/10">
        {[
          { key: 'data-jadi', label: 'Tabel Data Jadi Santri Baru', icon: Users },
          { key: 'keuangan', label: 'Rekapitulasi Keuangan & Biaya Resmi', icon: Wallet },
          { key: 'pemetaan', label: 'Hasil Pemetaan Kemampuan Santri', icon: Compass }
        ].map((t) => {
          const Icon = t.icon
          const isActive = activeTab === t.key
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-[#192118] dark:text-slate-300 dark:hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              <span>{t.label}</span>
            </button>
          )
        })}
      </div>

      {/* ── TAB 1: DATA JADI SANTRI BARU ───────────────────────────────── */}
      {activeTab === 'data-jadi' && (
        <div className="space-y-4">
          <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-white/10 dark:bg-[#192118] sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama santri, nomor registrasi, asal sekolah..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 text-xs outline-none focus:border-indigo-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Program:</span>
              {['Semua', 'Tsanawiyah', 'Aliyah'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFilterProgram(p)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    filterProgram === p
                      ? 'bg-indigo-600 text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft dark:border-white/10 dark:bg-[#192118]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-400">
                  <tr>
                    <th className="px-5 py-3.5">No. Registrasi</th>
                    <th className="px-5 py-3.5">Nama Calon Santri</th>
                    <th className="px-5 py-3.5">Jenjang / Program</th>
                    <th className="px-5 py-3.5">Asal Sekolah</th>
                    <th className="px-5 py-3.5">Status Berkas</th>
                    <th className="px-5 py-3.5">Daftar Ulang</th>
                    <th className="px-5 py-3.5">Kamar Asrama</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {dataJadiSantri.map((santri) => {
                    const isSmp = santri.program?.toLowerCase().includes('tsanawiyah') || santri.program?.toLowerCase().includes('smp')
                    const reregTarif = isSmp ? 'Rp 1.200.000' : 'Rp 1.400.000'
                    return (
                      <tr key={santri.id} className="transition hover:bg-slate-50/60 dark:hover:bg-white/[0.02]">
                        <td className="px-5 py-3.5 font-mono font-bold text-indigo-700 dark:text-indigo-300">
                          {santri.id}
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="font-bold text-slate-900 dark:text-white">{santri.name}</p>
                          <p className="text-[10px] text-slate-400">NISN: {santri.nisn || '-'}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200">
                            {santri.program} ({santri.track || 'Reguler'})
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                          {santri.school}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                            <CheckCircle2 size={12} /> Terverifikasi
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div>
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                              Lunas ({reregTarif})
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-slate-700 dark:text-slate-300 font-medium">
                          {santri.dormitory?.room ? `${santri.dormitory.room}` : 'Kamar A-204'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-xs text-slate-500 dark:border-white/10">
              <span>Menampilkan {dataJadiSantri.length} Santri Data Jadi Resmi</span>
              <span className="font-semibold text-indigo-700 dark:text-indigo-300">T.A. {academicYear}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: REKAPITULASI KEUANGAN RESMI ─────────────────────────── */}
      {activeTab === 'keuangan' && (
        <div className="space-y-6">
          {/* Tabel Brosur Resmi Biaya Pendaftaran Rp 7.725.000 */}
          <div className="overflow-hidden rounded-3xl border border-amber-300 bg-white shadow-soft dark:border-amber-700/40 dark:bg-[#192118]">
            <div className="bg-[#284B2D] p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-lime-300">
                  Ketetapan Brosur Resmi PPDB Darul Haromain
                </span>
                <h3 className="text-lg font-black text-white">
                  {admissionPackage.title}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-white/80">Jumlah Biaya Masuk:</span>
                <p className="text-2xl font-black text-lime-300">{admissionPackage.formattedTotal}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-amber-500 text-white font-bold uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="px-6 py-3">No</th>
                    <th className="px-6 py-3">Keterangan Biaya</th>
                    <th className="px-6 py-3">Peruntukan</th>
                    <th className="px-6 py-3 text-right">Biaya (Rp)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {admissionPackage.items.map((it) => (
                    <tr key={it.no} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02]">
                      <td className="px-6 py-3.5 font-bold text-slate-400">{it.no}</td>
                      <td className="px-6 py-3.5 font-bold text-slate-800 dark:text-white">{it.name}</td>
                      <td className="px-6 py-3.5 text-slate-500 dark:text-slate-400">{it.desc}</td>
                      <td className="px-6 py-3.5 text-right font-mono font-bold text-slate-900 dark:text-slate-100">{it.formatted}</td>
                    </tr>
                  ))}
                  <tr className="bg-amber-50 font-black text-xs dark:bg-amber-950/30 text-amber-950 dark:text-amber-200 border-t-2 border-amber-400">
                    <td colSpan={3} className="px-6 py-3.5 uppercase tracking-wider">Jumlah Keseluruhan Biaya Pendaftaran</td>
                    <td className="px-6 py-3.5 text-right text-base text-brand-700 dark:text-brand-300">{admissionPackage.formattedTotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3.5 bg-slate-50 border-t border-slate-100 dark:bg-white/5 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs gap-2">
              <span className="font-semibold text-slate-600 dark:text-slate-300 italic">
                {admissionPackage.disclaimer}
              </span>
              <span className="text-slate-400">
                Bogor, 27 Agustus 2026 &bull; Mengetahui, {committeeHead}
              </span>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Rincian Pendaftaran Ulang & Perlengkapan */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#192118]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/10">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Pendaftaran Ulang &amp; Perlengkapan Santri
                </h3>
                <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-[10px] font-bold text-brand-800 dark:bg-brand-900/40 dark:text-brand-300">
                  Ketetapan Panitia
                </span>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="flex items-center justify-between rounded-xl bg-brand-50/70 p-3 dark:bg-brand-950/20">
                  <span className="font-semibold text-brand-900 dark:text-brand-200">1. Biaya Pendaftaran Ulang SMP / MTs</span>
                  <span className="font-bold text-brand-800 dark:text-brand-300">Rp 1.200.000</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-purple-50/70 p-3 dark:bg-purple-950/20">
                  <span className="font-semibold text-purple-900 dark:text-purple-200">2. Biaya Pendaftaran Ulang SMA / SMK / MA</span>
                  <span className="font-bold text-purple-800 dark:text-purple-300">Rp 1.400.000</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">3. Perlengkapan Santri Baru Putra</span>
                    <p className="text-[10px] text-slate-400">Kasur (300rb) + 10 Kitab Amtsilati (617.500) + Seragam (1.050.000)</p>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">Rp 1.967.500</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">4. Perlengkapan Santri Baru Putri</span>
                    <p className="text-[10px] text-slate-400">Kasur (300rb) + 10 Kitab Amtsilati (617.500) + Seragam (1.100.000)</p>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">Rp 2.017.500</span>
                </div>
              </div>
            </div>

            {/* Rekapitulasi Alokasi Dana */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#192118]">
              <h3 className="font-bold text-slate-900 dark:text-white">
                Proyeksi Realisasi Penggunaan Dana Masuk
              </h3>
              <p className="mt-0.5 text-xs text-slate-400">Alokasi anggaran belanja kebutuhan santri baru:</p>

              <div className="mt-5 space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700 dark:text-slate-200">Pendidikan &amp; Pengadaan Kitab Amtsilati</span>
                    <span className="text-indigo-600 font-bold">40%</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-slate-100 dark:bg-white/10">
                    <div className="h-full w-[40%] rounded-full bg-indigo-600" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700 dark:text-slate-200">Infak Pembangunan Asrama &amp; Kamar Santri</span>
                    <span className="text-brand-600 font-bold">30%</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-slate-100 dark:bg-white/10">
                    <div className="h-full w-[30%] rounded-full bg-brand-500" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700 dark:text-slate-200">Konveksi Seragam (Batik, Jas, Olahraga) &amp; Kasur</span>
                    <span className="text-blue-600 font-bold">20%</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-slate-100 dark:bg-white/10">
                    <div className="h-full w-[20%] rounded-full bg-blue-500" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700 dark:text-slate-200">Operasional Sistem PPDB &amp; Syahriah Santri</span>
                    <span className="text-purple-600 font-bold">10%</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-slate-100 dark:bg-white/10">
                    <div className="h-full w-[10%] rounded-full bg-purple-500" />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleExport('Laporan Rincian Keuangan PSB', 'Excel (.xlsx)')}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  <FileSpreadsheet size={14} className="text-emerald-600" /> Unduh Laporan Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: HASIL PEMETAAN KEMAMPUAN SANTRI ──────────────────────── */}
      {activeTab === 'pemetaan' && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#192118]">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center border-b border-slate-100 pb-4 dark:border-white/10">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Laporan Hasil Pemetaan Kemampuan Awal Santri (Placement Test)
                </h3>
                <p className="text-xs text-slate-400">
                  Asesmen kemampuan baca Qur'an, potensi akademik, dan wawancara untuk pemetaan kelompok belajar.
                </p>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                Bukan Tes Eliminasi / Kelulusan
              </span>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-white/[0.02]">
                  <tr>
                    <th className="px-4 py-3">Nama Santri</th>
                    <th className="px-4 py-3">Tes Al-Qur'an</th>
                    <th className="px-4 py-3">Tes CBT Dasar</th>
                    <th className="px-4 py-3">Wawancara</th>
                    <th className="px-4 py-3">Skor Pemetaan</th>
                    <th className="px-4 py-3">Rekomendasi Kelas Awal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {applicants.slice(0, 6).map((s) => {
                    const quran = s.selectionScores?.quran || 85
                    const academic = s.selectionScores?.academic || 82
                    const interview = s.selectionScores?.interview || 88
                    const avg = ((quran + academic + interview) / 3).toFixed(1)
                    return (
                      <tr key={s.id}>
                        <td className="px-4 py-3">
                          <p className="font-bold text-slate-800 dark:text-white">{s.name}</p>
                          <p className="text-[10px] text-slate-400">{s.program}</p>
                        </td>
                        <td className="px-4 py-3 font-semibold text-brand-600">{quran} (Tajwid)</td>
                        <td className="px-4 py-3 font-semibold text-blue-600">{academic}</td>
                        <td className="px-4 py-3 font-semibold text-purple-600">{interview}</td>
                        <td className="px-4 py-3 font-black text-slate-900 dark:text-white">{avg}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                            avg >= 88
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                          }`}>
                            {avg >= 88 ? 'Kelas Akselerasi Amtsilati & Tahfidz' : 'Kelas Reguler Amtsilati'}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
