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
  PartyPopper,
  CreditCard
} from 'lucide-react'
import { RegistrationCardModal } from '../registration/RegistrationCardModal'
import { OnlineExamSimulationModal } from '../exam/OnlineExamSimulationModal'
import { ReceiptModal } from '../finance/ReceiptModal'
import { mockTransactions } from '../../data/mockFinances'

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

  // Sync with prop if it changes
  React.useEffect(() => {
    if (activeTab) setCurrentTab(activeTab)
  }, [activeTab])

  const handleTabClick = (tabKey) => {
    setCurrentTab(tabKey)
    if (onTabChange) onTabChange(tabKey)
  }

  // Fallback if applicant not found
  const santri = applicant || {
    id: 'DH-2026-00128',
    name: 'Ahmad Fauzan Pratama',
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
      result: 'Lulus'
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

  // ── ACCESS CONTROL LOGIC ──────────────────────────────────────────────────
  // Semua berkas harus Valid DAN status admin = Terverifikasi
  const allDocsValid =
    Array.isArray(santri.documents) &&
    santri.documents.length > 0 &&
    santri.documents.every((d) => d.status === 'Valid') &&
    santri.status === 'Terverifikasi'

  // Lulus seleksi
  const examPassed = santri.selectionScores?.result === 'Lulus'

  // Pembayaran daftar ulang sudah lunas
  const reregPaid =
    santri.pay === 'Daftar Ulang Lunas' ||
    santri.pay === 'Lunas Daftar Ulang' ||
    santri.pay === 'Lunas' // fallback untuk demo data

  // Derived access flags
  const canTakeExam = allDocsValid
  const canSeeDorm = examPassed && reregPaid

  // Dokumen yang belum valid (untuk pesan locked exam)
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
      label: 'Ujian CBT & Hasil Seleksi',
      icon: BookOpenCheck,
      locked: !canTakeExam,
      lockReason: !allDocsValid
        ? 'Selesaikan kelengkapan berkas dan tunggu verifikasi admin terlebih dahulu.'
        : null
    },
    {
      key: 'dorm',
      label: 'Informasi Kamar & Asrama',
      icon: BedDouble,
      locked: !canSeeDorm,
      lockReason: !examPassed
        ? 'Selesaikan ujian seleksi terlebih dahulu untuk melihat penempatan kamar.'
        : !reregPaid
          ? 'Selesaikan pembayaran daftar ulang untuk mengaktifkan penempatan kamar asrama.'
          : null
    }
  ]

  const handleCopyAccount = (bank, num) => {
    navigator.clipboard?.writeText(num)
    setCopiedBank(bank)
    onNotify(`Nomor rekening ${bank} disalin ke clipboard!`)
    setTimeout(() => setCopiedBank(null), 2500)
  }

  // ── PROGRESS STEPS (dinamis berdasarkan status) ───────────────────────────
  const steps = [
    {
      title: 'Formulir Pendaftaran',
      status: 'done',
      desc: 'Selesai diisi & diajukan'
    },
    {
      title: 'Verifikasi Dokumen',
      status: allDocsValid ? 'done' : invalidDocs.length > 0 ? 'error' : 'pending',
      desc: allDocsValid
        ? `${santri.documents?.length || 0}/${santri.documents?.length || 0} Berkas dinyatakan valid`
        : invalidDocs.length > 0
          ? `${invalidDocs.length} berkas perlu diperbaiki`
          : 'Menunggu verifikasi admin'
    },
    {
      title: 'Pembayaran Registrasi',
      status: 'done',
      desc: 'Lunas Rp 250.000'
    },
    {
      title: 'Ujian Seleksi & CBT',
      status: examPassed ? 'done' : canTakeExam ? 'pending' : 'locked',
      desc: examPassed
        ? `Skor Akhir: ${santri.selectionScores?.finalScore || '-'} (Lulus)`
        : canTakeExam
          ? 'Siap mengikuti ujian'
          : 'Menunggu verifikasi berkas'
    },
    {
      title: 'Hasil Kelulusan',
      status: examPassed ? 'done' : 'locked',
      desc: examPassed
        ? `Diterima — ${santri.program} ${santri.track || 'Reguler'}`
        : 'Menunggu hasil ujian'
    },
    {
      title: 'Penempatan Asrama',
      status: canSeeDorm ? 'done' : 'locked',
      desc: canSeeDorm
        ? santri.dormitory?.room
          ? `${santri.dormitory.room}`
          : 'Kamar telah ditetapkan'
        : 'Selesaikan daftar ulang'
    }
  ]

  // ── KOMPONEN LOCKED STATE CARD ─────────────────────────────────────────────
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
      {/* Top Banner Calon Santri */}
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
                  santri.status === 'Terverifikasi'
                    ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30'
                    : santri.status === 'Perlu perbaikan'
                      ? 'bg-red-500/20 text-red-200 border-red-400/30'
                      : 'bg-amber-500/20 text-amber-200 border-amber-400/30'
                }`}>
                  {santri.status}
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
            Progres Tahapan Pendaftaran Anda:
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
                  <span className="truncate">Langkah {idx + 1}</span>
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

      {/* Internal Navigation Tabs for Calon Santri */}
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

      {/* TAB 1: RINGKASAN PENDAFTARAN */}
      {currentTab === 'overview' && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Info Card */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/10">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Biodata Calon Santri</h3>
                  <p className="text-xs text-slate-400">Data pendaftaran yang tercatat di sistem PPDB</p>
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

            {/* Quick Actions Card */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div
                onClick={() => setIsCardModalOpen(true)}
                className="cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-brand-500 hover:shadow-md dark:border-white/10 dark:bg-[#192118]"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                    <Printer size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Kartu Ujian Masuk</h4>
                    <p className="text-[11px] text-slate-400">Unduh &amp; cetak kartu tanda peserta</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => canTakeExam ? handleTabClick('exam') : onNotify('Berkas Anda belum terverifikasi. Lengkapi dokumen terlebih dahulu.')}
                className={`rounded-2xl border bg-white p-5 shadow-sm transition dark:bg-[#192118] ${
                  canTakeExam
                    ? 'cursor-pointer border-slate-200/80 hover:border-brand-500 hover:shadow-md dark:border-white/10'
                    : 'cursor-not-allowed border-slate-100 opacity-60 dark:border-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`grid h-10 w-10 place-items-center rounded-xl ${
                    canTakeExam
                      ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300'
                      : 'bg-slate-100 text-slate-400 dark:bg-white/5'
                  }`}>
                    {canTakeExam ? <BookOpenCheck size={20} /> : <Lock size={20} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Simulasi Ujian CBT</h4>
                    <p className="text-[11px] text-slate-400">
                      {canTakeExam ? 'Coba ujian online mandiri' : 'Tunggu verifikasi berkas terlebih dahulu'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Announcement Sidebar */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
              <h3 className="font-bold text-slate-900 dark:text-white">Jadwal Agenda Penting</h3>
              <p className="text-xs text-slate-400">Kalender agenda santri baru 2026</p>

              <div className="mt-4 space-y-3">
                {[
                  { date: '25 Okt 2026', title: 'Ujian Baca Al-Qur\'an', desc: '08:00 WIB via Video Call / Di Pesantren', done: true },
                  { date: '26 Okt 2026', title: 'Tes CBT Potensi Akademik', desc: 'Selesai dikerjakan online', done: true },
                  { date: '28 Okt 2026', title: 'Pengumuman Kelulusan', desc: 'Dinyatakan Lulus Seleksi Utama', done: true },
                  { date: '10 Nov 2026', title: 'Batas Akhir Daftar Ulang', desc: 'Pemberkasan fisik & pelunasan seragam', done: false },
                  { date: '15 Jul 2027', title: 'Kedatangan Santri Baru', desc: 'Check-in Asrama Gedung Al-Farabi', done: false }
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

      {/* TAB 2: BERKAS DOKUMEN PERSYARATAN */}
      {currentTab === 'documents' && (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center border-b border-slate-100 pb-4 dark:border-white/10">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Dokumen Persyaratan Calon Santri</h3>
              <p className="text-xs text-slate-400">Seluruh berkas dokumen yang telah Anda unggah</p>
            </div>
            {allDocsValid ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                <CheckCircle2 size={15} /> {santri.documents?.length} Dari {santri.documents?.length} Dokumen Terverifikasi Sah
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                <AlertTriangle size={15} /> {invalidDocs.length} Dokumen Belum Valid
              </span>
            )}
          </div>

          {/* Alert jika ada berkas yang belum valid */}
          {!allDocsValid && (
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
              <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
              <div className="text-xs">
                <p className="font-bold text-amber-800 dark:text-amber-200">Berkas belum lengkap / terverifikasi</p>
                <p className="mt-0.5 text-amber-700 dark:text-amber-300">
                  Lengkapi dan perbaiki berkas dokumen yang ditandai. Akses Ujian CBT akan terbuka setelah semua berkas dinyatakan Valid oleh admin.
                </p>
              </div>
            </div>
          )}

          <div className="mt-5 space-y-3">
            {santri.documents.map((doc, idx) => (
              <div
                key={idx}
                className={`flex flex-col justify-between gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center ${
                  doc.status === 'Valid'
                    ? 'border-slate-200/80 bg-slate-50/50 dark:border-white/10 dark:bg-white/[0.02]'
                    : doc.status === 'Perlu perbaikan'
                      ? 'border-red-200 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/20'
                      : 'border-amber-200 bg-amber-50/50 dark:border-amber-900/40 dark:bg-amber-950/20'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                    doc.status === 'Valid'
                      ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300'
                      : doc.status === 'Perlu perbaikan'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                  }`}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{doc.name}</p>
                    <p className="text-[11px] text-slate-400">
                      {doc.file ? `File: ${doc.file} • Ukuran: ${doc.size}` : 'Belum diunggah'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                    doc.status === 'Valid'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                      : doc.status === 'Perlu perbaikan'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                  }`}>
                    {doc.status}
                  </span>
                  {doc.file && (
                    <button
                      type="button"
                      onClick={() => onNotify(`Mengunduh file pratinjau ${doc.file} (simulasi)`)}
                      className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      <Download size={14} /> Unduh
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onNotify(`Buka form unggah ulang ${doc.name} (simulasi)`)}
                    className="flex items-center gap-1.5 rounded-xl border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100 dark:border-brand-900/50 dark:bg-brand-950/40 dark:text-brand-300"
                  >
                    <UploadCloud size={14} /> {doc.file ? 'Ganti File' : 'Unggah'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TAGIHAN & PEMBAYARAN */}
      {currentTab === 'payment' && (
        <div className="space-y-6">
          {/* Banner lulus — ajak daftar ulang */}
          {examPassed && !reregPaid && (
            <div className="flex items-start gap-4 rounded-2xl border border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-700/40 dark:bg-emerald-950/30">
              <PartyPopper size={22} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="font-bold text-emerald-900 dark:text-emerald-200">Selamat! Anda dinyatakan LULUS Seleksi!</p>
                <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">
                  Segera selesaikan pembayaran Daftar Ulang (Rp 7.550.000) untuk mengaktifkan akses penempatan kamar asrama Anda.
                  Batas waktu pembayaran: <strong>10 November 2026</strong>.
                </p>
              </div>
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/10">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Rincian Tagihan Biaya PPDB</h3>
                    <p className="text-xs text-slate-400">Status pelunasan administrasi dan daftar ulang</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                    Registrasi: LUNAS
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                    <div>
                      <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                        1. Biaya Pendaftaran &amp; Formulir (Wajib Awal)
                      </p>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                        Invoice: INV-2026-00412 &bull; Diverifikasi oleh Bendahara PPDB
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Rp 250.000</p>
                      <button
                        type="button"
                        onClick={() => setIsReceiptModalOpen(true)}
                        className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:underline dark:text-emerald-300"
                      >
                        <Printer size={12} /> Lihat Kuitansi Sah
                      </button>
                    </div>
                  </div>

                  {/* Daftar Ulang — highlight jika lulus tapi belum bayar */}
                  <div className={`flex items-center justify-between rounded-2xl border p-4 ${
                    examPassed && !reregPaid
                      ? 'border-amber-300 bg-amber-50/80 dark:border-amber-700/40 dark:bg-amber-950/30'
                      : reregPaid && examPassed
                        ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20'
                        : 'border-slate-200/80 bg-slate-50/50 dark:border-white/10 dark:bg-white/[0.02]'
                  }`}>
                    <div>
                      <p className={`text-xs font-bold ${
                        examPassed && !reregPaid
                          ? 'text-amber-900 dark:text-amber-200'
                          : 'text-slate-800 dark:text-white'
                      }`}>
                        2. Biaya Daftar Ulang Santri Baru (Setelah Lulus)
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Meliputi Uang Pangkal, Seragam 5 Stel, Paket Kitab, &amp; Syahriah Bulan Pertama
                      </p>
                      {examPassed && !reregPaid && (
                        <p className="mt-1 text-[11px] font-bold text-amber-700 dark:text-amber-300">
                          ⚠ Segera bayar sebelum 10 November 2026
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-slate-800 dark:text-white">Rp 7.550.000</p>
                      {reregPaid && examPassed ? (
                        <span className="mt-1 block rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                          LUNAS
                        </span>
                      ) : (
                        <span className="mt-1 block rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                          Dapat Dicicil
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Transfer Proof Card */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
                <h3 className="font-bold text-slate-900 dark:text-white">Konfirmasi Pembayaran Transfer</h3>
                <p className="text-xs text-slate-400">Unggah bukti transfer rekening untuk diverifikasi oleh bendahara</p>

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

            {/* Right Bank Accounts */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
              <h3 className="font-bold text-slate-900 dark:text-white">Rekening Resmi Pesantren</h3>
              <p className="text-xs text-slate-400">Gunakan rekening resmi PPDB berikut:</p>

              <div className="mt-4 space-y-3">
                {[
                  { bank: 'Bank Syariah Indonesia (BSI)', num: '711-2345-890', name: 'PPDB Pondok Pesantren Darul Haromain' },
                  { bank: 'Bank Central Asia (BCA)', num: '883-0987-123', name: 'Yayasan Darul Haromain' },
                  { bank: 'Bank Mandiri', num: '133-00-9876543-1', name: 'Darul Haromain Penerimaan' }
                ].map((b, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-white/10 dark:bg-white/[0.02]">
                    <p className="text-xs font-bold text-slate-800 dark:text-white">{b.bank}</p>
                    <p className="mt-1 font-mono text-sm font-bold text-brand-700 dark:text-brand-300">{b.num}</p>
                    <p className="text-[10px] text-slate-400">a.n. {b.name}</p>
                    <button
                      type="button"
                      onClick={() => handleCopyAccount(b.bank, b.num)}
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

      {/* TAB 4: UJIAN CBT & HASIL SELEKSI */}
      {currentTab === 'exam' && (
        canTakeExam ? (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {/* Score Card */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/10">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Hasil Penilaian Seleksi Santri</h3>
                    <p className="text-xs text-slate-400">Rekapitulasi skor ujian tertulis, Al-Qur'an, dan wawancara</p>
                  </div>
                  {examPassed ? (
                    <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                      DITERIMA (LULUS)
                    </span>
                  ) : santri.selectionScores?.result === 'Tidak Lulus' ? (
                    <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                      TIDAK LULUS
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-white shadow-sm">
                      MENUNGGU HASIL
                    </span>
                  )}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 text-center dark:border-white/5 dark:bg-white/[0.02]">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Tes Al-Qur'an</p>
                    <p className="mt-1 text-2xl font-black text-brand-600 dark:text-brand-400">
                      {santri.selectionScores?.quran ?? '—'}
                    </p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Tajwid &amp; Tahfidz</p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 text-center dark:border-white/5 dark:bg-white/[0.02]">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Ujian CBT</p>
                    <p className="mt-1 text-2xl font-black text-blue-600 dark:text-blue-400">
                      {santri.selectionScores?.academic ?? '—'}
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold">TPA &amp; Bahasa</p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 text-center dark:border-white/5 dark:bg-white/[0.02]">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Wawancara</p>
                    <p className="mt-1 text-2xl font-black text-purple-600 dark:text-purple-400">
                      {santri.selectionScores?.interview ?? '—'}
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold">Santri &amp; Wali</p>
                  </div>

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5 text-center dark:border-emerald-900/40 dark:bg-emerald-950/30">
                    <p className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-300">Nilai Akhir</p>
                    <p className="mt-1 text-2xl font-black text-emerald-700 dark:text-emerald-300">
                      {santri.selectionScores?.finalScore ?? '—'}
                    </p>
                    <p className="text-[10px] text-emerald-600 font-bold">
                      {examPassed ? 'Grade A (Lulus)' : santri.selectionScores?.result || 'Menunggu'}
                    </p>
                  </div>
                </div>

                {/* Arahan daftar ulang setelah lulus */}
                {examPassed && !reregPaid && (
                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-700/40 dark:bg-amber-950/20">
                    <CreditCard size={18} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
                    <div className="flex-1 text-xs">
                      <p className="font-bold text-amber-900 dark:text-amber-200">Langkah Berikutnya: Pembayaran Daftar Ulang</p>
                      <p className="mt-0.5 text-amber-700 dark:text-amber-300">
                        Anda telah lulus seleksi! Segera lakukan pembayaran daftar ulang agar penempatan kamar asrama dapat diaktifkan.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleTabClick('payment')}
                      className="shrink-0 rounded-xl bg-amber-500 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-amber-600"
                    >
                      Bayar Sekarang
                    </button>
                  </div>
                )}
              </div>

              {/* Online CBT Simulation Card */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300">
                    <BookOpenCheck size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Simulasi Ujian CBT Online</h3>
                    <p className="text-xs text-slate-400">
                      Uji coba mengerjakan tes seleksi berbasis komputer dengan timer dan penilaian otomatis
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">Paket Soal Tes Potensi Akademik 2026</p>
                      <p className="text-[11px] text-slate-400">5 Butir Soal &bull; Alokasi Waktu: 20 Menit &bull; Pilihan Ganda</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsExamModalOpen(true)}
                      className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-600/25 transition hover:bg-purple-700 active:scale-95"
                    >
                      <BookOpenCheck size={16} /> Mulai Simulasi CBT <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Examination Tips */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
              <h3 className="font-bold text-slate-900 dark:text-white">Petunjuk Ujian CBT</h3>
              <p className="text-xs text-slate-400">Tata tertib pelaksanaan tes seleksi:</p>

              <ul className="mt-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-brand-500 shrink-0 mt-0.5" />
                  <span>Gunakan laptop atau tablet dengan koneksi internet yang stabil.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-brand-500 shrink-0 mt-0.5" />
                  <span>Kerjakan secara mandiri dan jujur tanpa bantuan orang lain.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-brand-500 shrink-0 mt-0.5" />
                  <span>Timer akan otomatis menghitung mundur setelah tombol mulai diklik.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-brand-500 shrink-0 mt-0.5" />
                  <span>Nilai akan langsung dihitung secara otomatis saat ujian selesai.</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          /* LOCKED: Exam belum tersedia */
          <LockedCard
            icon={Lock}
            title="Ujian CBT Belum Tersedia"
            description="Akses ujian terbuka setelah seluruh berkas dokumen dinyatakan Valid oleh tim admin PPDB. Silakan lengkapi dan perbaiki berkas Anda terlebih dahulu."
            ctaLabel="Lihat Status Berkas"
            onCta={() => handleTabClick('documents')}
          >
            {/* Daftar berkas yang belum valid */}
            {invalidDocs.length > 0 && (
              <div className="mt-2 space-y-2 text-left">
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Berkas yang belum valid ({invalidDocs.length}):
                </p>
                {invalidDocs.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs dark:border-red-900/40 dark:bg-red-950/30">
                    <XCircle size={14} className="shrink-0 text-red-500" />
                    <span className="font-medium text-red-800 dark:text-red-300">{d.name}</span>
                    <span className="ml-auto rounded-md bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-900/40 dark:text-red-300">
                      {d.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {/* Status admin belum verifikasi meskipun dokumen ada */}
            {invalidDocs.length === 0 && !allDocsValid && (
              <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs dark:border-amber-900/40 dark:bg-amber-950/30">
                <Clock size={14} className="shrink-0 text-amber-500" />
                <span className="text-amber-800 dark:text-amber-300">Menunggu verifikasi akhir dari admin PPDB</span>
              </div>
            )}
          </LockedCard>
        )
      )}

      {/* TAB 5: INFORMASI KAMAR & ASRAMA */}
      {currentTab === 'dorm' && (
        canSeeDorm ? (
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/10">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Penempatan Kamar &amp; Asrama Santri</h3>
                <p className="text-xs text-slate-400">Informasi gedung dan fasilitas asrama santri baru</p>
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
                  {santri.dormitory?.building || 'Asrama Putra - Gedung Al-Farabi'}
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
                <p className="mt-3 text-xs text-slate-400">Status Pembagian Ranjang</p>
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  Ranjang B-03 (Tingkat Bawah)
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-brand-50/50 p-5 dark:bg-brand-950/20">
              <h4 className="text-xs font-bold text-brand-900 dark:text-brand-200">
                Perlengkapan yang Wajib Dibawa Saat Kedatangan Santri:
              </h4>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-slate-600 dark:text-slate-300">
                <p>&bull; Baju muslim putih &amp; celana hitam / sarung standar</p>
                <p>&bull; Al-Qur'an mushaf standar Madinah</p>
                <p>&bull; Perlengkapan mandi pribadi &amp; ember kecil bertutup</p>
                <p>&bull; Selimut &amp; sprei kasur ukuran 90x200 cm</p>
              </div>
            </div>
          </div>
        ) : (
          /* LOCKED: Kamar belum bisa diakses */
          <LockedCard
            icon={BedDouble}
            title={
              !examPassed
                ? 'Penempatan Kamar Belum Tersedia'
                : 'Selesaikan Pembayaran Daftar Ulang'
            }
            description={
              !examPassed
                ? 'Informasi penempatan kamar asrama akan diaktifkan setelah Anda dinyatakan lulus ujian seleksi PPDB Darul Haromain.'
                : 'Anda telah lulus seleksi! Segera selesaikan pembayaran daftar ulang (Rp 7.550.000) untuk melihat penempatan kamar asrama Anda.'
            }
            ctaLabel={!examPassed ? 'Lihat Jadwal Ujian' : 'Pergi ke Tagihan & Pembayaran'}
            onCta={() => handleTabClick(!examPassed ? 'exam' : 'payment')}
          >
            {/* Status visual: 3 tahap */}
            <div className="mt-2 space-y-2 text-left">
              {[
                {
                  label: 'Berkas Dokumen Terverifikasi',
                  done: allDocsValid
                },
                {
                  label: 'Ujian Seleksi Lulus',
                  done: examPassed
                },
                {
                  label: 'Pembayaran Daftar Ulang Lunas',
                  done: reregPaid && examPassed
                }
              ].map((step, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 text-xs ${
                    step.done
                      ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20'
                      : 'border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.02]'
                  }`}
                >
                  {step.done ? (
                    <CheckCircle2 size={14} className="shrink-0 text-emerald-500" />
                  ) : (
                    <Lock size={14} className="shrink-0 text-slate-400" />
                  )}
                  <span className={step.done ? 'font-semibold text-emerald-800 dark:text-emerald-300' : 'text-slate-500 dark:text-slate-400'}>
                    {step.label}
                  </span>
                  {step.done && (
                    <span className="ml-auto text-[10px] font-bold text-emerald-600 dark:text-emerald-400">✓ Selesai</span>
                  )}
                </div>
              ))}
            </div>
          </LockedCard>
        )
      )}

      {/* MODALS */}
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
