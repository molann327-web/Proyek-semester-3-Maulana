import React, { useState } from 'react'
import {
  FileCheck2,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Sparkles,
  BookOpenCheck,
  Send,
  Download,
  Users
} from 'lucide-react'
import { DataTable } from '../../components/common/DataTable'
import { FilterBar } from '../../components/common/FilterBar'
import { StatCard } from '../../components/common/StatCard'
import { StatusBadge } from '../../components/common/StatusBadge'
import { VerificationDetailModal } from './VerificationDetailModal'

export function VerificationSelectionPage({
  applicants,
  onUpdateApplicant,
  onNotify
}) {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('Semua Antrean')
  const [selectedApplicant, setSelectedApplicant] = useState(null)

  const filtered = applicants.filter((a) => {
    const matchSearch = (a.name + a.id + a.school).toLowerCase().includes(search.toLowerCase())
    if (!matchSearch) return false

    if (activeTab === 'Perlu Verifikasi Berkas') {
      return a.status === 'Menunggu berkas' || a.status === 'Dalam seleksi'
    }
    if (activeTab === 'Perlu Perbaikan') {
      return a.status === 'Perlu perbaikan'
    }
    if (activeTab === 'Lulus Seleksi') {
      return a.selectionScores?.result === 'Lulus'
    }
    return true
  })

  // Statistics
  const pendingDocs = applicants.filter((a) => a.status === 'Menunggu berkas').length
  const needsFix = applicants.filter((a) => a.status === 'Perlu perbaikan').length
  const verifiedCount = applicants.filter((a) => a.status === 'Terverifikasi').length
  const passedCount = applicants.filter((a) => a.selectionScores?.result === 'Lulus').length

  const columns = [
    {
      header: 'Calon Santri',
      key: 'name',
      render: (a) => (
        <div className="flex items-center gap-3">
          <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold ${a.color}`}>
            {a.initials}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-slate-800 dark:text-white">{a.name}</p>
            <p className="font-mono text-[10px] text-slate-400">{a.id}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Asal Sekolah',
      key: 'school',
      render: (a) => <span className="text-xs text-slate-600 dark:text-slate-300">{a.school}</span>
    },
    {
      header: 'Status Berkas',
      key: 'status',
      render: (a) => <StatusBadge status={a.status} />
    },
    {
      header: 'Nilai Seleksi',
      key: 'scores',
      render: (a) => {
        const sc = a.selectionScores
        if (!sc || sc.finalScore === null) {
          return <span className="text-[11px] text-slate-400">Belum diuji</span>
        }
        return (
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-white">{sc.finalScore}</span>
            <span className="text-[10px] text-slate-400">(Q:{sc.quran || '-'} / T:{sc.academic || '-'})</span>
          </div>
        )
      }
    },
    {
      header: 'Hasil Kelulusan',
      key: 'result',
      render: (a) => {
        const res = a.selectionScores?.result || 'Belum Dijadwalkan'
        return <StatusBadge status={res} />
      }
    },
    {
      header: 'Aksi Panitia',
      key: 'action',
      align: 'right',
      render: (a) => (
        <button
          type="button"
          onClick={() => setSelectedApplicant(a)}
          className="rounded-xl bg-brand-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-brand-600"
        >
          Periksa & Nilai
        </button>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
              <FileCheck2 size={14} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[.15em] text-brand-700 dark:text-brand-300">
              Modul Verifikasi & Seleksi
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[30px]">
            Verifikasi Berkas & Kelulusan Seleksi
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Pemeriksaan keaslian berkas persyaratan, input penilaian tes Al-Qur'an dan wawancara, serta penetapan kelulusan santri.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNotify('Pengumuman kelulusan disimulasikan ke seluruh kontak wali santri')}
          className="flex h-10 items-center gap-2 rounded-xl bg-brand-500 px-4 text-xs font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-600"
        >
          <Send size={14} /> Publikasikan Hasil Seleksi (Demo)
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Antrean Berkas Baru"
          value={pendingDocs}
          note="Perlu Diperiksa"
          line="Verifikasi Awal"
          icon={FileCheck2}
          tone="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300"
        />
        <StatCard
          label="Perlu Perbaikan"
          value={needsFix}
          note="Menunggu Unggah Ulang"
          line="Notifikasi Terkirim"
          icon={AlertCircle}
          tone="bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300"
        />
        <StatCard
          label="Lolos Berkas"
          value={verifiedCount}
          note="Dokumen Lengkap"
          line="Siap Tes Online/Lisan"
          icon={CheckCircle2}
          tone="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"
        />
        <StatCard
          label="Lulus Seleksi Santri"
          value={passedCount}
          note="Gelombang 1"
          line="Siap Daftar Ulang"
          icon={GraduationCap}
          tone="bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300"
        />
      </div>

      {/* Tabs Filter */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 dark:border-white/10">
        {[
          'Semua Antrean',
          'Perlu Verifikasi Berkas',
          'Perlu Perbaikan',
          'Lulus Seleksi'
        ].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === tab
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-[#192118]">
        <div className="mb-5">
          <FilterBar
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Cari nama santri atau nomor pendaftaran..."
            onReset={() => setSearch('')}
          />
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          keyField="id"
          pageSize={5}
          emptyTitle="Tidak Ada Antrean Verifikasi"
          emptyDescription="Tidak ada calon santri pada kategori tab atau kriteria pencarian ini."
        />
      </div>

      {/* Detail Modal */}
      <VerificationDetailModal
        isOpen={Boolean(selectedApplicant)}
        onClose={() => setSelectedApplicant(null)}
        applicant={selectedApplicant}
        onUpdateApplicant={onUpdateApplicant}
        onNotify={onNotify}
      />
    </div>
  )
}
