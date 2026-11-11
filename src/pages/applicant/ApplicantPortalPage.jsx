import React, { useState } from 'react'
import {
  GraduationCap,
  FileCheck2,
  Wallet,
  BookOpenCheck,
  BedDouble,
  CheckCircle2,
  Clock,
  Printer,
  Download,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Building,
  UploadCloud,
  FileText,
  Copy,
  Check,
  ArrowRight,
  Lock,
  XCircle,
  AlertTriangle,
  CreditCard,
  Compass,
  Info,
  BookOpen,
  Receipt
} from 'lucide-react'
import { RegistrationCardModal } from '../registration/RegistrationCardModal'
import { OnlineExamSimulationModal } from '../exam/OnlineExamSimulationModal'
import { ReceiptModal } from '../finance/ReceiptModal'
import { mockTransactions } from '../../data/mockFinances'
import { officialFeeStructure, officialBankAccounts } from '../../data/mockFeeStructure'

export function ApplicantPortalPage({
  applicant,
  activeTab = 'overview',
  onTabChange,
  onNavigate,
  onNotify
}) {
  const [currentTab, setCurrentTab] = useState(activeTab)
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [isExamModalOpen, setIsExamModalOpen] = useState(false)
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)
  const [copiedBank, setCopiedBank] = useState(null)
  const [showEquipDetail, setShowEquipDetail] = useState(false)

  const { reregistrationFees, equipment, registrationFee, admissionPackage, committeeHead, academicYear } = officialFeeStructure

  // Sync with prop if it changes
  React.useEffect(() => {
    if (activeTab) setCurrentTab(activeTab)
  }, [activeTab])

  const handleTabClick = (tabKey) => {
    setCurrentTab(tabKey)
    if (onTabChange) onTabChange(tabKey)
  }

  // Fallback data
  const santri = applicant || {
    id: 'DH-2026-00128',
    name: 'Ahmad Fauzan Pratama',
    gender: 'Laki-laki',
    nisn: '0087654321',
    program: 'Tsanawiyah (MTs)',
    track: 'Reguler',
    school: 'MI Al-Hidayah Kota Bogor',
    status: 'Terverifikasi',
    pay: 'Lunas',
    initials: 'AF',
    documents: [
      { name: 'Kartu Keluarga (KK)', status: 'Valid', file: 'kk_ahmad_fauzan.pdf', size: '1.2 MB' },
      { name: 'Akta Kelahiran', status: 'Valid', file: 'akta_ahmad_fauzan.pdf', size: '850 KB' },
      { name: 'Ijazah / SKL Sementara', status: 'Valid', file: 'skl_mi_alhidayah.pdf', size: '1.4 MB' },
      { name: 'Pas Foto 3x4 (Latar Biru)', status: 'Valid', file: 'pas_foto_ahmad.jpg', size: '640 KB' },
      { name: 'Surat Keterangan Sehat', status: 'Valid', file: 'surat_sehat_puskesmas.pdf', size: '420 KB' }
    ],
    selectionScores: {
      quran: 92,
      academic: 88,
      interview: 90,
      finalScore: 90.2,
      result: 'Kelas Akselerasi Amtsilati'
    },
    dormitory: {
      building: 'Asrama Putra - Gedung Al-Farabi',
      room: 'Kamar A-204',
      status: 'Ditempatkan'
    },
    parentName: 'H. Muhammad Yusuf',
    parentPhone: '0812-9876-5432',
    address: 'Jl. Pesantren No. 14, Bogor Barat, Jawa Barat'
  }

  const transaction = mockTransactions.find((t) => t.applicantId === santri.id) || mockTransactions[0]

  // Deteksi jenjang untuk tarif pendaftaran ulang: SMP vs SMA
  const isSma = santri.program?.toLowerCase().includes('aliyah') || santri.program?.toLowerCase().includes('sma') || santri.program?.toLowerCase().includes('smk')
  const reregFee = isSma ? reregistrationFees.sma : reregistrationFees.smp

  // Deteksi gender untuk perlengkapan seragam
  const isPutri = santri.gender?.toLowerCase() === 'perempuan' || santri.name?.toLowerCase().includes('putri') || santri.name?.toLowerCase().includes('aisyah')
  const equipTotal = isPutri ? equipment.grandTotal.putri : equipment.grandTotal.putra
  const equipFormatted = isPutri ? equipment.grandTotal.formattedPutri : equipment.grandTotal.formattedPutra

  // Total pendaftaran ulang + perlengkapan
  const totalBiayaDaftarUlang = reregFee.amount + equipTotal
  const totalBiayaDaftarUlangFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalBiayaDaftarUlang)

  // ── ACCESS CONTROL LOGIC BARU ──────────────────────────────────────────────
  const allDocsValid =
    Array.isArray(santri.documents) &&
    santri.documents.length > 0 &&
    santri.documents.every((d) => d.status === 'Valid') &&
    santri.status === 'Terverifikasi'

  const reregPaid =
    santri.pay === 'Daftar Ulang Lunas' ||
    santri.pay === 'Lunas Daftar Ulang' ||
    santri.pay === 'Lunas'

  const canTakeExam = allDocsValid
  const canSeeDorm = allDocsValid && reregPaid

  const invalidDocs = Array.isArray(santri.documents)
    ? santri.documents.filter((d) => d.status !== 'Valid')
    : []

  // ── TAB DEFINITIONS ───────────────────────────────────────────────────────
  const tabs = [
    { key: 'overview',   label: 'Ringkasan Pendaftaran',      icon: GraduationCap, locked: false },
    { key: 'documents',  label: 'Berkas Dokumen Persyaratan', icon: FileCheck2,    locked: false },
    { key: 'payment',    label: 'Tagihan & Pembayaran',        icon: Wallet,        locked: false },
    {
      key: 'exam',
      label: 'Tes Pemetaan Kemampuan',
      icon: Compass,
      locked: !canTakeExam,
      lockReason: !allDocsValid
        ? 'Lengkapi berkas dan tunggu verifikasi admin untuk mengikuti tes pemetaan.'
        : null
    },
    {
      key: 'dorm',
      label: 'Informasi Kamar & Asrama',
      icon: BedDouble,
      locked: !canSeeDorm,
      lockReason: !allDocsValid
        ? 'Lengkapi berkas persyaratan terlebih dahulu.'
        : !reregPaid
          ? 'Selesaikan pembayaran daftar ulang untuk melihat nomor kamar & ranjang asrama.'
          : null
    }
  ]

  const handleCopyAccount = (bank, num) => {
    navigator.clipboard?.writeText(num)
    setCopiedBank(bank)
    onNotify(`Nomor rekening ${bank} disalin ke clipboard!`)
    setTimeout(() => setCopiedBank(null), 2500)
  }

  // ── PROGRESS STEPS ────────────────────────────────────────────────────────
  const steps = [
    {
      title: 'Formulir Pendaftaran',
      status: 'done',
      desc: 'Formulir Rp 350.000'
    },
    {
      title: 'Verifikasi Dokumen',
      status: allDocsValid ? 'done' : invalidDocs.length > 0 ? 'error' : 'pending',
      desc: allDocsValid
        ? `${santri.documents?.length || 0}/${santri.documents?.length || 0} Berkas dinyatakan valid`
        : invalidDocs.length > 0
          ? `${invalidDocs.length} berkas perlu perbaikan`
          : 'Menunggu verifikasi admin'
    },
    {
      title: 'Daftar Ulang & Biaya',
      status: reregPaid ? 'done' : allDocsValid ? 'pending' : 'locked',
      desc: reregPaid
        ? `Lunas (${reregFee.formatted})`
        : allDocsValid
          ? `Menunggu Pelunasan ${reregFee.formatted}`
          : 'Menunggu berkas valid'
    },
    {
      title: 'Tes Pemetaan Kemampuan',
      status: canTakeExam ? 'done' : 'locked',
      desc: canTakeExam
        ? 'Asesmen Al-Qur\'an & CBT'
        : 'Terkunci (butuh berkas valid)'
    },
    {
      title: 'Perlengkapan Kasur & Kitab',
      status: reregPaid ? 'done' : 'locked',
      desc: reregPaid
        ? 'Paket Kasur, 10 Kitab & Seragam Siap'
        : 'Setelah daftar ulang'
    },
    {
      title: 'Penempatan Kamar',
      status: canSeeDorm ? 'done' : 'locked',
      desc: canSeeDorm
        ? santri.dormitory?.room || 'Kamar A-204'
        : 'Selesaikan daftar ulang'
    }
  ]

  function LockedCard({ icon: Icon = Lock, title, description, ctaLabel, onCta, children }) {
    return (
      <div className="flex min-h-[340px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-10 text-center dark:border-white/10 dark:bg-white/[0.02]">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 dark:bg-white/5">
          <Icon size={30} className="text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="mt-4 text-base font-bold text-slate-700 dark:text-slate-300">{title}</h3>
        <p className="mt-2 max-w-md text-xs text-slate-500 dark:text-slate-400">{description}</p>
        {children && <div className="mt-4 w-full max-w-sm">{children}</div>}
        {ctaLabel && onCta && (
          <button
            type="button"
            onClick={onCta}
            className="mt-5 flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-brand-600 active:scale-95"
          >
            {ctaLabel}
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* ── TOP BANNER CALON SANTRI ───────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#213f25] via-[#284B2D] to-[#3a693f] p-6 text-white shadow-soft lg:p-8">
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-xl font-bold text-white shadow-inner backdrop-blur-md">
              {santri.initials || 'CS'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-lime-400/20 px-2.5 py-0.5 text-[11px] font-bold text-lime-300 border border-lime-400/30">
                  {santri.id}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${
                  allDocsValid
                    ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30'
                    : 'bg-amber-500/20 text-amber-200 border-amber-400/30'
                }`}>
                  Status: {allDocsValid ? 'Berkas Valid' : santri.status}
                </span>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white/90">
                  {santri.program} &bull; Santri {isPutri ? 'Putri' : 'Putra'}
                </span>
              </div>
              <h1 className="mt-1.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
                Assalamu'alaikum, {santri.name}
              </h1>
              <p className="mt-0.5 text-xs text-white/80">
                Pilihan: <strong className="text-white">{santri.program}</strong> ({santri.track}) &bull; Asal: {santri.school}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setIsCardModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-brand-800 shadow-md transition hover:bg-slate-100 active:scale-95"
            >
              <Printer size={15} /> Cetak Kartu Peserta (PDF)
            </button>
            <button
              type="button"
              onClick={() => onNavigate('Helpdesk & FAQ')}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95"
            >
              <HelpCircle size={15} /> Bantuan Panitia
            </button>
          </div>
        </div>

        {/* Timeline PPDB 6 Steps */}
        <div className="relative z-10 mt-8 border-t border-white/10 pt-6">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-lime-300">
            Progres Tahapan Masuk Santri Baru ({academicYear}):
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {steps.map((st, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-3 backdrop-blur-xs transition ${
                  st.status === 'done'
                    ? 'border-lime-400/30 bg-black/15 hover:bg-black/25'
                    : st.status === 'error'
                      ? 'border-red-400/30 bg-red-900/20'
                      : st.status === 'pending'
                        ? 'border-amber-400/30 bg-amber-900/20'
                        : 'border-white/5 bg-black/10 opacity-60'
                }`}
              >
                <div className={`flex items-center gap-1.5 text-xs font-bold ${
                  st.status === 'done'
                    ? 'text-lime-300'
                    : st.status === 'error'
                      ? 'text-red-300'
                      : st.status === 'pending'
                        ? 'text-amber-300'
                        : 'text-white/40'
                }`}>
                  {st.status === 'done' ? (
                    <CheckCircle2 size={14} className="shrink-0" />
                  ) : st.status === 'error' ? (
                    <XCircle size={14} className="shrink-0" />
                  ) : st.status === 'pending' ? (
                    <Clock size={14} className="shrink-0" />
                  ) : (
                    <Lock size={14} className="shrink-0" />
                  )}
                  <span className="truncate">Tahap {idx + 1}</span>
                </div>
                <p className="mt-1 text-xs font-semibold text-white">{st.title}</p>
                <p className="mt-0.5 text-[10px] text-white/70 truncate">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative background circles */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full border-[28px] border-white/5" />
      </div>

      {/* ── INTERNAL TABS SANTRI ─────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200/80 pb-3 dark:border-white/10">
        {tabs.map((t) => {
          const Icon = t.icon
          const isActive = currentTab === t.key
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => !t.locked && handleTabClick(t.key)}
              disabled={t.locked}
              title={t.locked ? t.lockReason : undefined}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                t.locked
                  ? 'cursor-not-allowed border border-slate-200/60 bg-slate-100/60 text-slate-400 opacity-70 dark:border-white/5 dark:bg-white/[0.03] dark:text-slate-600'
                  : isActive
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-[#192118] dark:text-slate-300 dark:hover:bg-white/5'
              }`}
            >
              {t.locked ? <Lock size={14} /> : <Icon size={16} />}
              <span>{t.label}</span>
              {t.locked && (
                <span className="ml-0.5 rounded-md bg-slate-200 px-1 py-0.5 text-[9px] font-black uppercase text-slate-500 dark:bg-white/10 dark:text-slate-500">
                  Terkunci
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* ── TAB 1: RINGKASAN PENDAFTARAN ──────────────────────────────── */}
      {currentTab === 'overview' && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/10">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Biodata Calon Santri</h3>
                  <p className="text-xs text-slate-400">Data pendaftaran tercatat di sistem PPDB</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                  Data Lengkap 100%
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
                <div>
                  <p className="text-slate-400">Nama Lengkap</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{santri.name}</p>
                </div>
                <div>
                  <p className="text-slate-400">Nomor Registrasi PPDB</p>
                  <p className="font-bold text-brand-700 dark:text-brand-300">{santri.id}</p>
                </div>
                <div>
                  <p className="text-slate-400">NISN</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{santri.nisn}</p>
                </div>
                <div>
                  <p className="text-slate-400">Asal Madrasah / Sekolah</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{santri.school}</p>
                </div>
                <div>
                  <p className="text-slate-400">Program &amp; Jalur</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{santri.program} - {santri.track || 'Reguler'}</p>
                </div>
                <div>
                  <p className="text-slate-400">Nama Orang Tua / Wali</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{santri.parentName || santri.fatherName || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-400">Nomor WhatsApp Wali</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{santri.parentPhone || santri.phone || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-400">Alamat Tempat Tinggal</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{santri.address || '-'}</p>
                </div>
              </div>
            </div>

            {/* Banner Penjelasan Biaya & Asesmen */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div
                onClick={() => handleTabClick('payment')}
                className="cursor-pointer rounded-2xl border border-brand-200 bg-brand-50/60 p-5 transition hover:shadow-md dark:border-brand-900/40 dark:bg-brand-950/20"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500 text-white">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Rincian Biaya Transparan</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      Biaya Masuk: <strong>{admissionPackage.formattedTotal}</strong> + Daftar Ulang {reregFee.level} ({reregFee.formatted})
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => canTakeExam ? handleTabClick('exam') : onNotify('Lengkapi berkas Anda terlebih dahulu.')}
                className={`rounded-2xl border p-5 transition ${
                  canTakeExam
                    ? 'cursor-pointer border-purple-200 bg-purple-50/60 hover:shadow-md dark:border-purple-900/40 dark:bg-purple-950/20'
                    : 'cursor-not-allowed border-slate-100 bg-slate-50 opacity-60 dark:border-white/5 dark:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`grid h-10 w-10 place-items-center rounded-xl ${
                    canTakeExam ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    <Compass size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tes Pemetaan Kemampuan</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      Asesmen baca Qur'an &amp; CBT untuk penempatan kelas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Agenda */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
              <h3 className="font-bold text-slate-900 dark:text-white">Jadwal Agenda Santri Baru</h3>
              <p className="text-xs text-slate-400">Kalender agenda PPDB {academicYear}</p>

              <div className="mt-4 space-y-3">
                {[
                  { date: '25 Okt 2026', title: 'Verifikasi Berkas Calon Santri', desc: 'Validasi dokumen persyaratan', done: allDocsValid },
                  { date: '26 Okt 2026', title: 'Tes Pemetaan Kemampuan (CBT)', desc: 'Asesmen awal baca Qur\'an & akademik', done: canTakeExam },
                  { date: '10 Nov 2026', title: 'Pelunasan Daftar Ulang & Kitab', desc: `${reregFee.level} (${reregFee.formatted})`, done: reregPaid },
                  { date: '15 Jul 2027', title: 'Kedatangan Santri & Asrama', desc: 'Check-in Asrama & Pembagian Ranjang', done: canSeeDorm }
                ].map((ev, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-2xl border border-slate-100 p-3 dark:border-white/5">
                    <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-bold ${
                      ev.done
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                        : 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300'
                    }`}>
                      {ev.done ? <Check size={16} /> : <Calendar size={16} />}
                    </div>
                    <div className="min-w-0 flex-1 text-xs">
                      <p className="font-bold text-slate-800 dark:text-white">{ev.title}</p>
                      <p className="text-[11px] text-slate-400">{ev.date} &bull; {ev.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: BERKAS DOKUMEN ─────────────────────────────────────── */}
      {currentTab === 'documents' && (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center border-b border-slate-100 pb-4 dark:border-white/10">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Dokumen Persyaratan Calon Santri</h3>
              <p className="text-xs text-slate-400">Seluruh berkas dokumen yang telah Anda unggah</p>
            </div>
            {allDocsValid ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                <CheckCircle2 size={15} /> Semua Berkas Terverifikasi Sah
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                <AlertTriangle size={15} /> {invalidDocs.length} Dokumen Perlu Perbaikan
              </span>
            )}
          </div>

          <div className="mt-5 space-y-3">
            {santri.documents.map((doc, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:flex-row sm:items-center dark:border-white/10 dark:bg-white/[0.02]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{doc.name}</p>
                    <p className="text-[11px] text-slate-400">
                      File: {doc.file} &bull; Ukuran: {doc.size}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                    {doc.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => onNotify(`Mengunduh file pratinjau ${doc.file} (simulasi)`)}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                  >
                    <Download size={14} /> Unduh
                  </button>
                  <button
                    type="button"
                    onClick={() => onNotify(`Buka form unggah ulang ${doc.name} (simulasi)`)}
                    className="flex items-center gap-1.5 rounded-xl border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100 dark:border-brand-900/50 dark:bg-brand-950/40 dark:text-brand-300"
                  >
                    <UploadCloud size={14} /> Ganti File
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 3: TAGIHAN & PEMBAYARAN RESMI ─────────────────────────── */}
      {currentTab === 'payment' && (
        <div className="space-y-6">
          {/* TABEL BROSUR RESMI BIAYA PENDAFTARAN DARUL HAROMAIN (Rp 7.725.000) */}
          <div className="overflow-hidden rounded-3xl border border-amber-300 bg-white shadow-soft dark:border-amber-700/40 dark:bg-[#192118]">
            <div className="bg-[#284B2D] p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-lime-300">
                  Ketetapan Resmi Pondok Pesantren
                </span>
                <h3 className="text-lg font-black text-white">
                  {admissionPackage.title}
                </h3>
                <p className="text-xs text-white/80">{admissionPackage.subtitle}</p>
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
                    <th className="px-5 py-3">No</th>
                    <th className="px-5 py-3">Keterangan Biaya</th>
                    <th className="px-5 py-3">Peruntukan</th>
                    <th className="px-5 py-3 text-right">Biaya (Rp)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {admissionPackage.items.map((it) => (
                    <tr key={it.no} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02]">
                      <td className="px-5 py-3 font-bold text-slate-400">{it.no}</td>
                      <td className="px-5 py-3 font-bold text-slate-800 dark:text-white">{it.name}</td>
                      <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{it.desc}</td>
                      <td className="px-5 py-3 text-right font-mono font-bold text-slate-900 dark:text-slate-100">{it.formatted}</td>
                    </tr>
                  ))}
                  <tr className="bg-amber-50 font-black text-xs dark:bg-amber-950/30 text-amber-950 dark:text-amber-200 border-t-2 border-amber-400">
                    <td colSpan={3} className="px-5 py-3.5 uppercase tracking-wider">Jumlah Keseluruhan Biaya Pendaftaran</td>
                    <td className="px-5 py-3.5 text-right text-base text-brand-700 dark:text-brand-300">{admissionPackage.formattedTotal}</td>
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

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {/* Rincian Tagihan Pendaftaran Ulang & Perlengkapan */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/10">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Pendaftaran Ulang &amp; Perlengkapan Santri</h3>
                    <p className="text-xs text-slate-400">
                      Jenjang: <strong>{reregFee.level}</strong> &bull; Kategori: <strong>Santri {isPutri ? 'Putri' : 'Putra'}</strong>
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                    Formulir (350rb): LUNAS
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {/* Item 1: Formulir */}
                  <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                    <div>
                      <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                        1. {registrationFee.title}
                      </p>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                        Invoice: INV-2026-00412 &bull; Diverifikasi oleh Bendahara PPDB
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">{registrationFee.formatted}</p>
                      <span className="text-[10px] font-bold text-emerald-600">✓ LUNAS</span>
                    </div>
                  </div>

                  {/* Item 2: Pendaftaran Ulang Jenjang */}
                  <div className={`flex items-center justify-between rounded-2xl border p-4 ${
                    reregPaid
                      ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20'
                      : 'border-amber-300 bg-amber-50/80 dark:border-amber-700/40 dark:bg-amber-950/30'
                  }`}>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        2. {reregFee.name}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Biaya daftar ulang resmi untuk jenjang {reregFee.level}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-brand-700 dark:text-brand-300">{reregFee.formatted}</p>
                      <span className={`text-[10px] font-bold ${reregPaid ? 'text-emerald-600' : 'text-amber-700'}`}>
                        {reregPaid ? '✓ LUNAS' : 'Menunggu Pelunasan'}
                      </span>
                    </div>
                  </div>

                  {/* Item 3: Rincian Perlengkapan Santri Baru */}
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-white/10 dark:bg-white/[0.02]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          3. Paket Perlengkapan Santri Baru ({isPutri ? 'Putri' : 'Putra'})
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Kasur busa + 10 Judul Kitab Amtsilati &amp; LKS + 3 Seragam
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-800 dark:text-white">{equipFormatted}</p>
                        <button
                          type="button"
                          onClick={() => setShowEquipDetail(!showEquipDetail)}
                          className="text-[10px] font-bold text-brand-600 hover:underline dark:text-brand-400"
                        >
                          {showEquipDetail ? 'Tutup Rincian' : 'Lihat Apa Saja yang Didapat ▼'}
                        </button>
                      </div>
                    </div>

                    {/* Dropdown rincian item perlengkapan */}
                    {showEquipDetail && (
                      <div className="mt-4 border-t border-slate-200/60 pt-3 dark:border-white/10 space-y-2 text-xs">
                        <p className="font-bold text-slate-700 dark:text-slate-200">Rincian Barang yang Diterima Santri:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                          <div className="rounded-lg bg-white p-2 border border-slate-100 dark:bg-white/5 dark:border-white/5">
                            <strong>A. Kamar:</strong> Kasur Busa (Rp 300.000)
                          </div>
                          <div className="rounded-lg bg-white p-2 border border-slate-100 dark:bg-white/5 dark:border-white/5">
                            <strong>C. Seragam:</strong> Batik, Semi Jas, Olahraga ({isPutri ? 'Rp 1.100.000' : 'Rp 1.050.000'})
                          </div>
                          <div className="rounded-lg bg-white p-2 border border-slate-100 sm:col-span-2 dark:bg-white/5 dark:border-white/5">
                            <strong>B. Kitab &amp; Buku (10 Judul - Rp 617.500):</strong> Paket Amtsilati, Muthola'ah, Durusul Lughoh Gontor, Kamus Arab, Imla', Akhlakul Banin/Banat, Fikih 1, Tajwid, English Lesson 1 Gontor, Buku LKS SMP/SMK.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-brand-50/70 p-4 dark:bg-brand-950/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-brand-900 dark:text-brand-200 font-semibold">
                      Total Biaya Daftar Ulang &amp; Perlengkapan:
                    </span>
                    <p className="text-[11px] text-slate-500">Ketetapan Panitia PSB: {committeeHead}</p>
                  </div>
                  <p className="text-lg font-black text-brand-700 dark:text-brand-300">
                    {totalBiayaDaftarUlangFormatted}
                  </p>
                </div>
              </div>

              {/* Upload Proof */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
                <h3 className="font-bold text-slate-900 dark:text-white">Konfirmasi Pembayaran Transfer</h3>
                <p className="text-xs text-slate-400">Unggah bukti transfer untuk diverifikasi oleh bendahara pesantren</p>

                <div className="mt-4 rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center dark:border-white/10">
                  <UploadCloud size={32} className="mx-auto text-brand-500" />
                  <p className="mt-2 text-xs font-bold text-slate-800 dark:text-white">
                    Tarik berkas bukti transfer ke sini atau klik tombol di bawah
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">Format JPG, PNG, atau PDF (Maks. 3 MB)</p>
                  <button
                    type="button"
                    onClick={() => onNotify('Simulasi: Bukti transfer berhasil diunggah dan dikirim ke bendahara!')}
                    className="mt-3 rounded-xl bg-brand-500 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-brand-600"
                  >
                    Pilih Bukti Transfer
                  </button>
                </div>
              </div>
            </div>

            {/* Bank Accounts */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
              <h3 className="font-bold text-slate-900 dark:text-white">Rekening Resmi PPDB</h3>
              <p className="text-xs text-slate-400">Hanya lakukan transfer ke rekening resmi berikut:</p>

              <div className="mt-4 space-y-3">
                {officialBankAccounts.map((b, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-white/10 dark:bg-white/[0.02]">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold text-slate-800 dark:text-white">{b.bank}</p>
                      <span className="text-[10px] font-bold text-brand-600">{b.badge}</span>
                    </div>
                    <p className="mt-1 font-mono text-sm font-bold text-brand-700 dark:text-brand-300">{b.accountNumber}</p>
                    <p className="text-[10px] text-slate-400">a.n. {b.accountName}</p>
                    <button
                      type="button"
                      onClick={() => handleCopyAccount(b.bank, b.accountNumber)}
                      className="mt-2.5 flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      {copiedBank === b.bank ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      {copiedBank === b.bank ? 'Tersalin' : 'Salin Nomor'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: TES PEMETAAN KEMAMPUAN SANTRI ────────────────────────── */}
      {currentTab === 'exam' && (
        canTakeExam ? (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/10">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Hasil Asesmen Pemetaan Kemampuan</h3>
                    <p className="text-xs text-slate-400">Pemetaan awal untuk kelompok belajar tahfidz, bahasa, dan kitab</p>
                  </div>
                  <span className="rounded-full bg-indigo-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    PEMETAAN AWAL
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 text-center dark:border-white/5 dark:bg-white/[0.02]">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Tes Al-Qur’an</p>
                    <p className="mt-1 text-2xl font-black text-brand-600 dark:text-brand-400">
                      {santri.selectionScores?.quran ?? 92}
                    </p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Tajwid &amp; Tahfidz</p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 text-center dark:border-white/5 dark:bg-white/[0.02]">
                    <p className="text-[10px] font-bold uppercase text-slate-400">CBT Potensi Dasar</p>
                    <p className="mt-1 text-2xl font-black text-blue-600 dark:text-blue-400">
                      {santri.selectionScores?.academic ?? 88}
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold">TPA &amp; Bahasa</p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 text-center dark:border-white/5 dark:bg-white/[0.02]">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Wawancara</p>
                    <p className="mt-1 text-2xl font-black text-purple-600 dark:text-purple-400">
                      {santri.selectionScores?.interview ?? 90}
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold">Karakter &amp; Minat</p>
                  </div>

                  <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-3.5 text-center dark:border-indigo-900/40 dark:bg-indigo-950/30">
                    <p className="text-[10px] font-bold uppercase text-indigo-700 dark:text-indigo-300">Rekomendasi</p>
                    <p className="mt-1 text-lg font-black text-indigo-700 dark:text-indigo-300">
                      Kelas Akselerasi
                    </p>
                    <p className="text-[10px] text-indigo-600 font-bold">Amtsilati 1</p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-slate-50 p-4 border border-slate-100 dark:bg-white/5 dark:border-white/5 flex items-start gap-3 text-xs">
                  <Compass size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">Tentang Tes Kemampuan:</p>
                    <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                      Tes ini dirancang khusus untuk memetakan tingkat baca Al-Qur'an dan potensi dasar calon santri baru agar para ustadz dapat membimbing dengan metode yang paling tepat. Tes ini <strong>tidak menggugurkan status santri</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Online CBT Simulation */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300">
                    <BookOpenCheck size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Simulasi CBT Pemetaan Kemampuan Online</h3>
                    <p className="text-xs text-slate-400">
                      Coba tes pemetaan mandiri berbasis komputer untuk latihan sebelum asesmen langsung
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">Paket Soal Pemetaan Pengetahuan Santri</p>
                      <p className="text-[11px] text-slate-400">5 Butir Soal &bull; Alokasi: 20 Menit &bull; Pilihan Ganda</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsExamModalOpen(true)}
                      className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-600/25 transition hover:bg-purple-700 active:scale-95"
                    >
                      <BookOpenCheck size={16} /> Mulai Tes CBT <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Tips */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
              <h3 className="font-bold text-slate-900 dark:text-white">Petunjuk Asesmen Santri</h3>
              <p className="text-xs text-slate-400">Informasi pelaksanaan tes pemetaan:</p>

              <ul className="mt-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-brand-500 shrink-0 mt-0.5" />
                  <span>Kerjakan dengan tenang tanpa perlu khawatir gagal atau tidak diterima.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-brand-500 shrink-0 mt-0.5" />
                  <span>Tes Al-Qur'an mengukur makharijul huruf, kelancaran, dan hafalan juz 30.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-brand-500 shrink-0 mt-0.5" />
                  <span>Hasil tes menjadi acuan ustadz dalam menentukan paket kitab awal santri.</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <LockedCard
            icon={Lock}
            title="Tes Pemetaan Belum Tersedia"
            description="Tes pemetaan kemampuan dapat diakses setelah seluruh berkas dokumen pendaftaran Anda diverifikasi dan dinyatakan sah oleh admin PPDB."
            ctaLabel="Lihat Status Berkas"
            onCta={() => handleTabClick('documents')}
          />
        )
      )}

      {/* ── TAB 5: INFORMASI KAMAR & ASRAMA ───────────────────────────── */}
      {currentTab === 'dorm' && (
        canSeeDorm ? (
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/10">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Penempatan Kamar &amp; Asrama Santri Baru</h3>
                <p className="text-xs text-slate-400">Informasi gedung dan ranjang asrama santri baru ({academicYear})</p>
              </div>
              <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-800 dark:bg-teal-900/40 dark:text-teal-300">
                {santri.dormitory?.status || 'Ditempatkan'}
              </span>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 dark:border-white/10 dark:bg-white/[0.02]">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
                  <Building size={20} />
                </div>
                <p className="mt-3 text-xs text-slate-400">Gedung Asrama</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {santri.dormitory?.building || (isPutri ? 'Asrama Putri - Gedung Khadijah' : 'Asrama Putra - Gedung Al-Farabi')}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 dark:border-white/10 dark:bg-white/[0.02]">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                  <BedDouble size={20} />
                </div>
                <p className="mt-3 text-xs text-slate-400">Nomor Kamar</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {santri.dormitory?.room || 'Kamar A-204'} (Lantai 2)
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 dark:border-white/10 dark:bg-white/[0.02]">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <CheckCircle2 size={20} />
                </div>
                <p className="mt-3 text-xs text-slate-400">Status Fasilitas Kasur</p>
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  Kasur Busa Siap di Ranjang
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-brand-50/50 p-5 dark:bg-brand-950/20">
              <h4 className="text-xs font-bold text-brand-900 dark:text-brand-200">
                Perlengkapan yang Wajib Dibawa Saat Kedatangan Santri:
              </h4>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-slate-600 dark:text-slate-300">
                <p>&bull; Baju muslim putih &amp; celana hitam / sarung standar (Putra)</p>
                <p>&bull; Gamis gelap &amp; jilbab syar'i standar pesantren (Putri)</p>
                <p>&bull; Al-Qur'an mushaf standar Madinah</p>
                <p>&bull; Perlengkapan mandi pribadi &amp; ember kecil bertutup</p>
                <p>&bull; Selimut &amp; sprei kasur ukuran 90x200 cm</p>
                <p>&bull; Alat tulis untuk pengajian kitab Amtsilati</p>
              </div>
            </div>
          </div>
        ) : (
          <LockedCard
            icon={BedDouble}
            title="Penempatan Kamar Belum Terbuka"
            description="Informasi penempatan nomor kamar dan ranjang asrama terbuka secara otomatis setelah Anda menyelesaikan pembayaran pendaftaran ulang dan paket perlengkapan."
            ctaLabel="Selesaikan Pembayaran Daftar Ulang"
            onCta={() => handleTabClick('payment')}
          >
            <div className="mt-3 space-y-2 text-left">
              <div className={`flex items-center gap-2 rounded-xl border p-2.5 text-xs ${
                allDocsValid ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-slate-50 text-slate-500'
              }`}>
                {allDocsValid ? <Check size={14} className="text-emerald-600" /> : <Lock size={14} />}
                <span>1. Verifikasi Berkas Dokumen Persyaratan ({allDocsValid ? 'Selesai' : 'Belum'})</span>
              </div>
              <div className={`flex items-center gap-2 rounded-xl border p-2.5 text-xs ${
                reregPaid ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-amber-200 bg-amber-50 text-amber-800'
              }`}>
                {reregPaid ? <Check size={14} className="text-emerald-600" /> : <Clock size={14} />}
                <span>2. Pembayaran Daftar Ulang {reregFee.level} ({reregFee.formatted})</span>
              </div>
            </div>
          </LockedCard>
        )
      )}

      {/* ── MODALS ───────────────────────────────────────────────────── */}
      <RegistrationCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        applicant={santri}
        onNotify={onNotify}
      />

      <OnlineExamSimulationModal
        isOpen={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
        onNotify={onNotify}
      />

      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        transaction={transaction}
        onNotify={onNotify}
      />
    </div>
  )
}
