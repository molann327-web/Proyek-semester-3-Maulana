import React, { useState } from 'react'
import {
  ClipboardList,
  Plus,
  Eye,
  Printer,
  FileText,
  CheckCircle2,
  AlertCircle,
  Download,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react'
import { DataTable } from '../../components/common/DataTable'
import { FilterBar } from '../../components/common/FilterBar'
import { StatCard } from '../../components/common/StatCard'
import { StatusBadge } from '../../components/common/StatusBadge'
import { Drawer } from '../../components/common/Drawer'
import { MultiStepRegistrationModal } from './MultiStepRegistrationModal'
import { RegistrationCardModal } from './RegistrationCardModal'

export function RegistrationManagementPage({
  applicants,
  onAddApplicant,
  onNotify
}) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('Semua status')
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [cardApplicant, setCardApplicant] = useState(null)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const filtered = applicants.filter((a) => {
    const matchSearch = (a.name + a.id + a.school).toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'Semua status' || a.status === filterStatus
    return matchSearch && matchStatus
  })

  // Calculate statistics
  const totalCount = applicants.length
  const verifiedCount = applicants.filter((a) => a.status === 'Terverifikasi').length
  const waitingCount = applicants.filter((a) => a.status === 'Menunggu berkas' || a.status === 'Dalam seleksi').length
  const revisionCount = applicants.filter((a) => a.status === 'Perlu perbaikan').length

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
            <p className="truncate text-[11px] text-slate-400">{a.school}</p>
          </div>
        </div>
      )
    },
    {
      header: 'No. Pendaftaran',
      key: 'id',
      render: (a) => (
        <div>
          <span className="font-mono text-xs font-semibold text-brand-700 dark:text-brand-300">
            {a.id}
          </span>
          <p className="text-[10px] text-slate-400">{a.date}</p>
        </div>
      )
    },
    {
      header: 'Program & Jalur',
      key: 'program',
      render: (a) => (
        <div>
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{a.program || 'Tsanawiyah (MTs)'}</p>
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500 dark:bg-white/5 dark:text-slate-400">
            {a.track || 'Reguler'}
          </span>
        </div>
      )
    },
    {
      header: 'Kelengkapan',
      key: 'completeness',
      render: (a) => (
        <div className="w-28">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-slate-400">Berkas</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">{a.completeness || 80}%</span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-slate-100 dark:bg-white/10">
            <div
              className={`h-full rounded-full ${
                (a.completeness || 80) === 100 ? 'bg-emerald-500' : 'bg-brand-500'
              }`}
              style={{ width: `${a.completeness || 80}%` }}
            />
          </div>
        </div>
      )
    },
    {
      header: 'Status Verifikasi',
      key: 'status',
      render: (a) => <StatusBadge status={a.status} />
    },
    {
      header: 'Pembayaran',
      key: 'pay',
      render: (a) => (
        <span
          className={`text-xs font-semibold ${
            a.pay === 'Lunas' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
          }`}
        >
          {a.pay}
        </span>
      )
    },
    {
      header: 'Aksi',
      key: 'actions',
      align: 'right',
      render: (a) => (
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            title="Lihat Detail Santri"
            onClick={() => setSelectedApplicant(a)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/30"
          >
            <Eye size={15} />
          </button>
          <button
            type="button"
            title="Cetak Kartu Peserta"
            onClick={() => setCardApplicant(a)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/30"
          >
            <Printer size={15} />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
              <ClipboardList size={14} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[.15em] text-brand-700 dark:text-brand-300">
              Modul Pendaftaran & Dokumen
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[30px]">
            Manajemen Pendaftaran Santri
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Pantau dan kelola formulir calon santri, unggahan berkas persyaratan, dan penerbitan kartu tanda peserta.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify('Data pendaftar diekspor')}
            className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
          >
            <Download size={14} /> Ekspor Data
          </button>
          <button
            type="button"
            onClick={() => setIsRegisterModalOpen(true)}
            className="flex h-10 items-center gap-2 rounded-xl bg-brand-500 px-4 text-xs font-bold text-white shadow-md shadow-brand-500/20 transition hover:bg-brand-600"
          >
            <Plus size={15} /> Pendaftaran Santri Baru
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Total Calon Santri"
          value={totalCount}
          delta="+8 minggu ini"
          note="Periode 2026/2027"
          line="Pendaftar Terdata"
          icon={Users}
          tone="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300"
        />
        <StatCard
          label="Berkas Terverifikasi"
          value={verifiedCount}
          delta={`${Math.round((verifiedCount / (totalCount || 1)) * 100)}%`}
          note="Lengkap & Valid"
          line="Siap Seleksi"
          icon={CheckCircle}
          tone="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"
        />
        <StatCard
          label="Menunggu Berkas"
          value={waitingCount}
          delta="Perlu Diproses"
          note="Antrean Baru"
          line="Dalam Antrean"
          icon={Clock}
          tone="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300"
        />
        <StatCard
          label="Perlu Perbaikan"
          value={revisionCount}
          delta="Prioritas Kontak"
          note="Berkas Kurang Jelas"
          line="Perlu Notifikasi"
          icon={AlertCircle}
          tone="bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300"
        />
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-[#192118]">
        <div className="mb-5">
          <FilterBar
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Cari nama, ID pendaftaran, atau asal sekolah..."
            status={filterStatus}
            onStatusChange={setFilterStatus}
            statusOptions={[
              'Semua status',
              'Terverifikasi',
              'Menunggu berkas',
              'Perlu perbaikan',
              'Dalam seleksi'
            ]}
            onReset={() => {
              setSearch('')
              setFilterStatus('Semua status')
            }}
          />
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          keyField="id"
          pageSize={5}
          emptyTitle="Pendaftar Tidak Ditemukan"
          emptyDescription="Tidak ada data calon santri yang sesuai dengan pencarian atau filter status."
        />
      </div>

      {/* Applicant Detail Drawer */}
      <Drawer
        isOpen={Boolean(selectedApplicant)}
        onClose={() => setSelectedApplicant(null)}
        title="Detail Calon Santri"
        subtitle="Informasi Pendaftaran & Berkas"
        footer={
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setCardApplicant(selectedApplicant)
                setSelectedApplicant(null)
              }}
              className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
            >
              Cetak Kartu Ujian
            </button>
            <button
              type="button"
              onClick={() => {
                onNotify(`Simulasi catatan dikirim ke wali santri ${selectedApplicant?.name}`)
                setSelectedApplicant(null)
              }}
              className="flex-1 rounded-xl bg-brand-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-600"
            >
              Kirim Notifikasi WA
            </button>
          </div>
        }
      >
        {selectedApplicant && (
          <div className="space-y-5 text-xs">
            {/* Header info */}
            <div className="flex items-center gap-3 rounded-2xl bg-brand-50/70 p-4 dark:bg-brand-900/20">
              <div className={`grid h-12 w-12 place-items-center rounded-2xl text-sm font-bold ${selectedApplicant.color}`}>
                {selectedApplicant.initials}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-800 dark:text-white sm:text-sm">
                  {selectedApplicant.name}
                </h4>
                <p className="font-mono text-[11px] font-semibold text-brand-700 dark:text-brand-300">
                  {selectedApplicant.id}
                </p>
              </div>
            </div>

            {/* Quick Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-white/5 dark:bg-white/5">
                <span className="text-[10px] text-slate-400">Status Verifikasi</span>
                <div className="mt-1">
                  <StatusBadge status={selectedApplicant.status} />
                </div>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-white/5 dark:bg-white/5">
                <span className="text-[10px] text-slate-400">Pembayaran</span>
                <p className="mt-1 font-bold text-slate-800 dark:text-white">
                  {selectedApplicant.pay}
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-white/5 dark:bg-white/5">
                <span className="text-[10px] text-slate-400">Asal Sekolah</span>
                <p className="mt-1 font-semibold text-slate-800 dark:text-white">
                  {selectedApplicant.school}
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-white/5 dark:bg-white/5">
                <span className="text-[10px] text-slate-400">Jalur & Program</span>
                <p className="mt-1 font-semibold text-slate-800 dark:text-white">
                  {selectedApplicant.program} ({selectedApplicant.track})
                </p>
              </div>
            </div>

            {/* Parent & Contact */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
              <p className="font-bold text-slate-800 dark:text-white">Data Orang Tua / Kontak</p>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Nama Wali:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedApplicant.parentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pekerjaan:</span>
                  <span className="text-slate-700 dark:text-slate-300">{selectedApplicant.parentJob || 'Wiraswasta'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">WhatsApp:</span>
                  <span className="font-mono font-semibold text-brand-600">{selectedApplicant.parentPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Domisili:</span>
                  <span className="text-right text-slate-700 dark:text-slate-300">{selectedApplicant.address}</span>
                </div>
              </div>
            </div>

            {/* Documents List */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
              <p className="font-bold text-slate-800 dark:text-white">Berkas Persyaratan yang Diunggah</p>
              <div className="mt-3 divide-y divide-slate-100 dark:divide-white/5">
                {selectedApplicant.documents?.map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between py-2.5">
                    <div>
                      <p className="font-semibold text-slate-700 dark:text-slate-300">{doc.name}</p>
                      <p className="text-[10px] text-slate-400">{doc.file ? `${doc.file} (${doc.size})` : 'Belum diunggah'}</p>
                      {doc.note && (
                        <p className="mt-1 text-[10px] text-rose-500 italic">Catatan: {doc.note}</p>
                      )}
                    </div>
                    <StatusBadge status={doc.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Multi-step Registration Modal */}
      <MultiStepRegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSubmitSuccess={onAddApplicant}
        onNotify={onNotify}
      />

      {/* Registration Card Modal */}
      <RegistrationCardModal
        isOpen={Boolean(cardApplicant)}
        onClose={() => setCardApplicant(null)}
        applicant={cardApplicant}
        onNotify={onNotify}
      />
    </div>
  )
}
