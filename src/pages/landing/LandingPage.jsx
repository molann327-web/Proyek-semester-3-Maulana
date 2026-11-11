import React, { useState } from 'react'
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  BedDouble,
  ShieldCheck,
  PhoneCall,
  Calendar,
  Sparkles,
  Wallet,
  FileCheck2,
  Building,
  Users,
  ChevronRight,
  HelpCircle,
  Clock,
  Printer,
  Compass,
  Check,
  Info,
  BadgePercent
} from 'lucide-react'
import { officialFeeStructure, officialBankAccounts } from '../../data/mockFeeStructure'

export function LandingPage({
  onLoginClick,
  onRegisterClick,
  onGuestExplore
}) {
  const [genderTab, setGenderTab] = useState('putra') // 'putra' | 'putri'
  const [levelTab, setLevelTab] = useState('smp') // 'smp' | 'sma'

  const { equipment, reregistrationFees, registrationFee, admissionPackage, academicYear, committeeHead } = officialFeeStructure

  const reregAmount = levelTab === 'smp' ? reregistrationFees.smp.amount : reregistrationFees.sma.amount
  const reregFormatted = levelTab === 'smp' ? reregistrationFees.smp.formatted : reregistrationFees.sma.formatted
  const equipAmount = genderTab === 'putra' ? equipment.grandTotal.putra : equipment.grandTotal.putri
  const equipFormatted = genderTab === 'putra' ? equipment.grandTotal.formattedPutra : equipment.grandTotal.formattedPutri
  
  // Total Biaya Lengkap: Biaya Pendaftaran Resmi (7.725.000) + Pendaftaran Ulang Jenjang + Perlengkapan
  const totalBiayaMasukLengkap = admissionPackage.total + reregAmount + equipAmount
  const totalBiayaMasukFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalBiayaMasukLengkap)

  return (
    <div className="min-h-screen bg-[#F8FAF7] text-slate-800 antialiased selection:bg-brand-500 selection:text-white dark:bg-[#111710] dark:text-slate-100">
      {/* ── HEADER / NAVBAR ────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-[#192118]/90">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/25">
              <GraduationCap size={24} />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                Darul Harumain
              </span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                Pondok Pesantren &bull; PPDB {academicYear}
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-xs font-semibold md:flex">
            <a href="#tentang" className="text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400">
              Tentang Pesantren
            </a>
            <a href="#program" className="text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400">
              Program Pendidikan
            </a>
            <a href="#biaya" className="text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400">
              Rincian Biaya
            </a>
            <a href="#alur" className="text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400">
              Alur &amp; Asesmen
            </a>
            <a href="#fasilitas" className="text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400">
              Fasilitas
            </a>
            <a href="#kontak" className="text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400">
              Kontak
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onLoginClick}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              Masuk Akun
            </button>
            <button
              type="button"
              onClick={onRegisterClick}
              className="flex items-center gap-1.5 rounded-xl bg-brand-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-brand-500/25 transition hover:bg-brand-600 active:scale-95"
            >
              <span>Daftar Sekarang</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-brand-800 dark:border-brand-900/50 dark:bg-brand-950/40 dark:text-brand-300">
                <Sparkles size={14} className="text-brand-600 dark:text-brand-400" />
                <span>Penerimaan Santri Baru (PSB) Tahun Ajaran {academicYear} Dibuka!</span>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-5xl dark:text-white leading-[1.15]">
                Membentuk Generasi <span className="text-brand-600 dark:text-brand-400">Qur’ani</span>, Berakhlak Karimah &amp; Berwawasan Global
              </h1>

              <p className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Selamat datang di portal resmi PPDB Pondok Pesantren Darul Harumain Bogor.
                Mengintegrasikan kurikulum pesantren salafiyah metode cepat baca kitab <strong>Amtsilati</strong>,
                bahasa Arab &amp; Inggris Gontor, serta kurikulum nasional kemenag/kemdikbud yang unggul.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onRegisterClick}
                  className="flex items-center gap-2 rounded-2xl bg-brand-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600 active:scale-95"
                >
                  <span>Daftar Santri Baru</span>
                  <ArrowRight size={16} />
                </button>
                <a
                  href="#biaya"
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  <Wallet size={16} className="text-brand-600" />
                  <span>Lihat Rincian Biaya</span>
                </a>
                <button
                  type="button"
                  onClick={onGuestExplore}
                  className="rounded-2xl border border-dashed border-slate-300 px-4 py-3 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:border-white/20 dark:text-slate-400"
                >
                  Jelajahi Demo Portal &rarr;
                </button>
              </div>

              {/* Quick highlight points */}
              <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-3 text-xs">
                <div className="flex items-center gap-2 rounded-xl bg-white p-2.5 shadow-xs border border-slate-100 dark:bg-white/5 dark:border-white/5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Asesmen Pemetaan Awal</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white p-2.5 shadow-xs border border-slate-100 dark:bg-white/5 dark:border-white/5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Metode Cepat Amtsilati</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white p-2.5 shadow-xs border border-slate-100 dark:bg-white/5 dark:border-white/5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Biaya Transparan &amp; Jelas</span>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Brosur Biaya Pendaftaran */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md overflow-hidden rounded-[32px] border border-amber-300/80 bg-white p-6 shadow-xl dark:border-amber-700/40 dark:bg-[#192118]">
                {/* Header Kartu Oranye / Hijau Pesantren */}
                <div className="rounded-2xl bg-gradient-to-r from-[#213f25] via-[#284B2D] to-[#1f4726] p-4 text-white text-center shadow-sm">
                  <h3 className="text-sm font-black uppercase tracking-wider text-lime-300">
                    Biaya Pendaftaran
                  </h3>
                  <p className="text-xs font-bold text-white/95">
                    Pondok Pesantren Darul Haromain
                  </p>
                </div>

                {/* Tabel Biaya Pendaftaran Brosur Resmi */}
                <div className="mt-4 overflow-hidden rounded-2xl border border-amber-200 dark:border-amber-900/30">
                  <div className="grid grid-cols-12 bg-amber-500 text-white font-black text-xs uppercase px-3 py-2">
                    <span className="col-span-8">Keterangan</span>
                    <span className="col-span-4 text-right">Biaya (Rp)</span>
                  </div>
                  <div className="divide-y divide-slate-100 text-xs dark:divide-white/5 bg-white dark:bg-white/[0.02]">
                    {admissionPackage.items.map((it, idx) => (
                      <div key={idx} className="grid grid-cols-12 px-3 py-2.5 items-center">
                        <span className="col-span-8 font-semibold text-slate-800 dark:text-slate-200">{it.name}</span>
                        <span className="col-span-4 text-right font-mono font-bold text-slate-900 dark:text-white">{it.formatted}</span>
                      </div>
                    ))}
                    <div className="grid grid-cols-12 px-3 py-3 bg-amber-50 font-black text-xs dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 border-t-2 border-amber-400">
                      <span className="col-span-8 uppercase tracking-wider">Jumlah</span>
                      <span className="col-span-4 text-right text-sm text-brand-700 dark:text-brand-300">
                        {admissionPackage.formattedTotal}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-[11px] font-semibold italic text-slate-500 text-center dark:text-slate-400">
                  {admissionPackage.disclaimer}
                </p>

                {/* Info Pendaftaran Ulang Jenjang */}
                <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs border border-slate-100 dark:bg-white/5 dark:border-white/5 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pendaftaran Ulang SMP / MTs:</span>
                    <strong className="text-brand-700 dark:text-brand-300">Rp 1.200.000</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pendaftaran Ulang SMA / SMK / MA:</span>
                    <strong className="text-brand-700 dark:text-brand-300">Rp 1.400.000</strong>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-3 dark:border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Ketua Panitia PSB:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{committeeHead}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAM PENDIDIKAN ─────────────────────────────────────────── */}
      <section id="program" className="border-t border-slate-200/80 bg-white py-16 dark:border-white/10 dark:bg-[#151c14]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Jenjang Pendidikan
            </span>
            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl dark:text-white">
              Pilihan Program &amp; Kurikulum Terpadu
            </h2>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Pondok Pesantren Darul Harumain menyelenggarakan jenjang pendidikan formal yang terintegrasi dengan kepesantrenan 24 jam.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Program 1: SMP / MTs */}
            <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-7 transition hover:border-brand-500 hover:shadow-md dark:border-white/10 dark:bg-[#192118]">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800 dark:bg-brand-900/40 dark:text-brand-300">
                  Tingkat Menengah Pertama
                </span>
                <span className="text-xs font-bold text-slate-400">3 Tahun Pendidikan</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                SMP / MTs Darul Harumain
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Fokus pembentukan karakter akhlak, penguasaan baca Al-Qur'an tartil &amp; tahfidz juz amma,
                dasar-dasar gramatika bahasa Arab metode Amtsilati, serta pemenuhan kurikulum nasional SMP.
              </p>
              <div className="mt-5 space-y-2 border-t border-slate-200/60 pt-4 dark:border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-brand-600" />
                  <span>Biaya Pendaftaran Ulang: <strong>Rp 1.200.000</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-brand-600" />
                  <span>Target Tahfidz: Minimal 3 - 5 Juz</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-brand-600" />
                  <span>Kuasai Kitab Dasar: Fikih, Akhlak, Tajwid, Amtsilati</span>
                </div>
              </div>
            </div>

            {/* Program 2: SMA / SMK / MA */}
            <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-7 transition hover:border-brand-500 hover:shadow-md dark:border-white/10 dark:bg-[#192118]">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
                  Tingkat Menengah Atas
                </span>
                <span className="text-xs font-bold text-slate-400">3 Tahun Pendidikan</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                SMA / SMK / MA Darul Harumain
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Pengembangan keilmuan agama mendalam, baca kitab kuning turats, kecakapan aktif dwi-bahasa
                (Arab &amp; Inggris standar Gontor), serta kesiapan masuk perguruan tinggi negeri maupun timur tengah.
              </p>
              <div className="mt-5 space-y-2 border-t border-slate-200/60 pt-4 dark:border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-purple-600" />
                  <span>Biaya Pendaftaran Ulang: <strong>Rp 1.400.000</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-purple-600" />
                  <span>Kecakapan Bahasa: Muhadatsah Arab &amp; English Speech</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-purple-600" />
                  <span>Kajian Kitab Kuning Lanjutan &amp; Bimbingan Kampus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RINCIAN BIAYA TRANSPARAN (DARI DOKUMEN RESMI) ─────────────── */}
      <section id="biaya" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Transparansi Finansial
            </span>
            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl dark:text-white">
              Rincian Biaya Pendaftaran &amp; Perlengkapan Santri Baru
            </h2>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Sesuai Surat Ketetapan Resmi Panitia PSB Pondok Pesantren Darul Haromain Tahun Pelajaran {academicYear}.
              Semua biaya tercatat secara rinci dan transparan tanpa ada pungutan tersembunyi.
            </p>
          </div>

          {/* Tabel Brosur Resmi Biaya Pendaftaran (Rp 7.725.000) */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-amber-300 bg-white shadow-soft dark:border-amber-700/40 dark:bg-[#192118]">
            <div className="bg-[#284B2D] p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-lime-300">
                  Brosur Resmi PPDB Darul Haromain
                </span>
                <h3 className="text-lg font-bold text-white">
                  {admissionPackage.title}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-white/80">Total Biaya Masuk Pokok:</span>
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
                    <th className="px-6 py-3 text-right">Nominal (Rp)</th>
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

            <div className="p-4 bg-slate-50 border-t border-slate-100 dark:bg-white/5 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs gap-2">
              <span className="font-semibold text-slate-600 dark:text-slate-300 italic">
                {admissionPackage.disclaimer}
              </span>
              <span className="text-slate-400">
                Bogor, 27 Agustus 2026 &bull; Mengetahui, {committeeHead}
              </span>
            </div>
          </div>

          {/* Interactive Selector: Jenjang & Jenis Kelamin */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-[#192118]">
              <span className="px-3 text-xs font-bold text-slate-400">Jenjang:</span>
              <button
                type="button"
                onClick={() => setLevelTab('smp')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  levelTab === 'smp'
                    ? 'bg-brand-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
                }`}
              >
                SMP / MTs (Daftar Ulang: Rp 1.200.000)
              </button>
              <button
                type="button"
                onClick={() => setLevelTab('sma')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  levelTab === 'sma'
                    ? 'bg-brand-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
                }`}
              >
                SMA / SMK / MA (Daftar Ulang: Rp 1.400.000)
              </button>
            </div>

            <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-[#192118]">
              <span className="px-3 text-xs font-bold text-slate-400">Santri:</span>
              <button
                type="button"
                onClick={() => setGenderTab('putra')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  genderTab === 'putra'
                    ? 'bg-brand-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
                }`}
              >
                Putra (Batik Rp 300rb)
              </button>
              <button
                type="button"
                onClick={() => setGenderTab('putri')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  genderTab === 'putri'
                    ? 'bg-brand-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
                }`}
              >
                Putri (Batik Rp 350rb)
              </button>
            </div>
          </div>

          {/* Summary Box */}
          <div className="mt-8 rounded-3xl border border-brand-200 bg-gradient-to-r from-brand-50 via-emerald-50 to-lime-50 p-6 dark:border-brand-900/40 dark:from-brand-950/30 dark:via-[#192118] dark:to-emerald-950/30">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-800 dark:text-brand-300">
                  Simulasi Estimasi Biaya Lengkap Santri Baru
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Pilihan: Jenjang {levelTab.toUpperCase()} &bull; Santri {genderTab === 'putra' ? 'Putra' : 'Putri'}
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Biaya Masuk Pokok ({admissionPackage.formattedTotal}) + Daftar Ulang Jenjang ({reregFormatted}) + Perlengkapan Kasur/Kitab/Seragam ({equipFormatted})
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 dark:text-slate-400">Total Keseluruhan Lengkap</p>
                <p className="text-2xl font-black text-brand-700 dark:text-brand-300 sm:text-3xl">
                  {totalBiayaMasukFormatted}
                </p>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                  Sudah Termasuk Uang Pangkal, Infak, Syahriah, Kasur, 10 Kitab, &amp; 3 Seragam
                </span>
              </div>
            </div>
          </div>

          {/* Tables of Equipment */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Table A: Kamar */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#192118]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/10">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BedDouble size={16} className="text-brand-600" />
                  <span>A. Perlengkapan Kamar</span>
                </h4>
                <span className="text-xs font-bold text-brand-700 dark:text-brand-300">
                  {equipment.roomTotal.formattedPutra}
                </span>
              </div>
              <div className="mt-3 divide-y divide-slate-100 dark:divide-white/5 text-xs">
                {equipment.roomItems.map((item) => (
                  <div key={item.no} className="flex items-center justify-between py-2.5">
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</p>
                      <p className="text-[10px] text-slate-400">{item.qty}</p>
                    </div>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      Rp {item.putra.toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Table C: Seragam */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#192118]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/10">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck size={16} className="text-brand-600" />
                  <span>C. Biaya Seragam Santri</span>
                </h4>
                <span className="text-xs font-bold text-brand-700 dark:text-brand-300">
                  {genderTab === 'putra' ? equipment.uniformTotal.formattedPutra : equipment.uniformTotal.formattedPutri}
                </span>
              </div>
              <div className="mt-3 divide-y divide-slate-100 dark:divide-white/5 text-xs">
                {equipment.uniformItems.map((item) => {
                  const val = genderTab === 'putra' ? item.putra : item.putri
                  return (
                    <div key={item.no} className="flex items-center justify-between py-2.5">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</p>
                        <p className="text-[10px] text-slate-400">{item.qty}</p>
                      </div>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                        Rp {val.toLocaleString('id-ID')}
                      </span>
                    </div>
                  )
                })}
              </div>
              <p className="mt-3 text-[10px] text-slate-400 border-t border-slate-100 pt-2 dark:border-white/5">
                * Seragam batik putri dilengkapi jilbab &amp; bahan gamis santriwati.
              </p>
            </div>

            {/* Table B: Kitab Pesantren & Sekolah */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#192118] lg:col-span-1">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/10">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen size={16} className="text-brand-600" />
                  <span>B. Kitab &amp; Buku Sekolah</span>
                </h4>
                <span className="text-xs font-bold text-brand-700 dark:text-brand-300">
                  {equipment.bookTotal.formattedPutra}
                </span>
              </div>
              <div className="mt-3 max-h-[260px] overflow-y-auto divide-y divide-slate-100 dark:divide-white/5 text-xs pr-1">
                {equipment.bookItems.map((item) => (
                  <div key={item.no} className="flex items-center justify-between py-2">
                    <div className="pr-2">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.no}. {item.name}
                      </p>
                      <p className="text-[10px] text-slate-400">{item.qty}</p>
                    </div>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300 shrink-0">
                      Rp {item.putra.toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 border-t border-slate-100 pt-2 text-[10px] text-slate-400 flex justify-between dark:border-white/5">
                <span>Total 10 Judul Kitab &amp; LKS</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">100% Hak Milik Santri</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALUR PENDAFTARAN & ASESMEN PEMETAAN ────────────────────────── */}
      <section id="alur" className="border-t border-slate-200/80 bg-white py-16 dark:border-white/10 dark:bg-[#151c14]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Alur Penerimaan Santri
            </span>
            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl dark:text-white">
              5 Tahapan Mudah &amp; Nyaman
            </h2>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Ujian CBT &amp; baca Al-Qur'an diselenggarakan sebagai tes pemetaan kemampuan untuk bimbingan awal ustadz.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                step: '01',
                title: 'Daftar Akun Online',
                desc: 'Isi biodata calon santri, NISN, data orang tua wali, dan dapatkan nomor registrasi PPDB.'
              },
              {
                step: '02',
                title: 'Unggah Dokumen Berkas',
                desc: 'Unggah scan KK, Akta Kelahiran, SKL/Ijazah, Pas Foto, dan Surat Sehat melalui portal.'
              },
              {
                step: '03',
                title: 'Verifikasi Berkas Admin',
                desc: 'Panitia memeriksa keabsahan dokumen. Setelah valid, calon santri siap tahap berikutnya.'
              },
              {
                step: '04',
                title: 'Daftar Ulang & Biaya',
                desc: 'Selesaikan pendaftaran ulang (SMP: 1,2 Jt / SMA: 1,4 Jt) & paket perlengkapan santri.'
              },
              {
                step: '05',
                title: 'Tes Pemetaan & Kamar',
                desc: 'Ikuti tes pemetaan kemampuan awal santri (Al-Qur\'an & CBT) dan dapatkan penempatan kamar asrama.'
              }
            ].map((s, idx) => (
              <div
                key={idx}
                className="relative rounded-3xl border border-slate-200/80 bg-slate-50/50 p-5 dark:border-white/10 dark:bg-[#192118]"
              >
                <div className="text-2xl font-black text-brand-500/40">{s.step}</div>
                <h4 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">{s.title}</h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed dark:text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Banner Penjelasan Asesmen Pemetaan */}
          <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/20">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 shrink-0">
                <Compass size={24} />
              </div>
              <div className="text-xs">
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                  Prinsip Asesmen Kemampuan Santri di Darul Harumain
                </h4>
                <p className="mt-1 text-emerald-800 dark:text-emerald-300 leading-relaxed">
                  Tes pengetahuan dan tes Al-Qur'an semata-mata ditujukan untuk <strong>mengetahui potensi dan pemetaan kemampuan santri</strong> (placement test),
                  sehingga tim pengajar ustadz dapat mengelompokkan pembinaan secara tepat sejak hari pertama.
                  Calon santri tidak digugurkan oleh hasil tes, melainkan dibimbing sesuai kapasitas kemampuannya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FASILITAS PESANTREN ────────────────────────────────────────── */}
      <section id="fasilitas" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Sarana &amp; Prasarana
            </span>
            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl dark:text-white">
              Lingkungan Belajar Asri &amp; Modern
            </h2>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Didukung fasilitas lengkap untuk menunjang kenyamanan beribadah, belajar kitab, dan aktivitas santri.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Gedung Asrama Putra & Putri', desc: 'Kamar nyaman terpisah dengan ranjang, kasur berkualitas, dan sirkulasi udara sehat.', icon: BedDouble },
              { title: 'Masjid Jami\' Pesantren', desc: 'Pusat shalat berjamaah 5 waktu, kajian tafsir, halaqah Qur\'an, dan muhadharah.', icon: Building },
              { title: 'Laboratorium CBT & Komputer', desc: 'Sarana tes berbasis komputer, pelatihan literasi digital, dan ujian nasional mandiri.', icon: GraduationCap },
              { title: 'Perpustakaan & Kitab Turats', desc: 'Koleksi lengkap kitab kuning salaf, kamus bahasa, dan referensi pelajaran umum.', icon: BookOpen }
            ].map((f, i) => {
              const Icon = f.icon
              return (
                <div
                  key={i}
                  className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                    <Icon size={24} />
                  </div>
                  <h4 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">{f.title}</h4>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed dark:text-slate-400">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── KONTAK & REKENING RESMI ───────────────────────────────────── */}
      <section id="kontak" className="border-t border-slate-200/80 bg-white py-16 dark:border-white/10 dark:bg-[#151c14]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                Layanan Informasi &amp; Helpdesk
              </span>
              <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                Hubungi Panitia Penerimaan Santri
              </h2>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ada pertanyaan seputar pendaftaran, rincian biaya, atau survei lokasi pondok pesantren?
                Silakan hubungi panitia resmi melalui kontak berikut:
              </p>

              <div className="mt-6 space-y-3 text-xs">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-white/5 dark:bg-white/[0.02]">
                  <PhoneCall size={18} className="text-brand-600" />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">Ketua Panitia PSB</p>
                    <p className="text-slate-500">{committeeHead} &bull; WhatsApp: 0812-3456-7890</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-white/5 dark:bg-white/[0.02]">
                  <Building size={18} className="text-brand-600" />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">Lokasi Pondok Pesantren</p>
                    <p className="text-slate-500">Jl. Pesantren No. 14, Bogor Barat, Kota Bogor, Jawa Barat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rekening Resmi */}
            <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 dark:border-white/10 dark:bg-[#192118]">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Rekening Resmi Pembayaran PPDB
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Pembayaran biaya formulir dan pendaftaran ulang hanya disalurkan melalui rekening resmi:
              </p>

              <div className="mt-4 space-y-2.5 text-xs">
                {officialBankAccounts.map((b, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-200/80 bg-white p-3.5 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{b.bank}</span>
                      <span className="rounded bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-800 dark:bg-brand-900/40 dark:text-brand-300">
                        {b.badge}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-sm font-bold text-brand-700 dark:text-brand-300">
                      {b.accountNumber}
                    </p>
                    <p className="text-[10px] text-slate-400">a.n. {b.accountName}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200/80 bg-[#192118] py-8 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white">
                <GraduationCap size={18} />
              </div>
              <span className="text-sm font-bold">Pondok Pesantren Darul Harumain Bogor</span>
            </div>
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} PPDB Pondok Pesantren Darul Harumain. Seluruh hak cipta dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
