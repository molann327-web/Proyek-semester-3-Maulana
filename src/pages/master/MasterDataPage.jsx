import React, { useState } from 'react'
import {
  Settings2,
  Calendar,
  Building2,
  FileCheck2,
  ShieldCheck,
  History,
  CheckCircle2,
  Save,
  Plus,
  Edit,
  Trash2
} from 'lucide-react'
import {
  mockPesantrenIdentity,
  mockWaves,
  mockPrograms,
  mockDocumentRequirements,
  mockAuditLogs
} from '../../data/mockMasterData'
import { StatusBadge } from '../../components/common/StatusBadge'

export function MasterDataPage({ onNotify }) {
  const [activeTab, setActiveTab] = useState('Gelombang & Kuota')
  const [identity, setIdentity] = useState(mockPesantrenIdentity)
  const [waves, setWaves] = useState(mockWaves)
  const [programs, setPrograms] = useState(mockPrograms)
  const [docs, setDocs] = useState(mockDocumentRequirements)

  const handleSaveIdentity = (e) => {
    e.preventDefault()
    onNotify('Identitas pondok pesantren berhasil diperbarui (simulasi)')
  }

  const handleToggleDocRequired = (id) => {
    const updated = docs.map((d) => (d.id === id ? { ...d, required: !d.required } : d))
    setDocs(updated)
    onNotify('Aturan persyaratan dokumen diperbarui')
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
              <Settings2 size={14} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[.15em] text-brand-700 dark:text-brand-300">
              Modul Master Data & Pengaturan Sistem
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[30px]">
            Konfigurasi & Pengaturan PPDB
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Pengaturan periode gelombang pendaftaran, kuota jenjang, persyaratan dokumen wajib, identitas pesantren, dan log audit sistem.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNotify('Seluruh perubahan konfigurasi berhasil disimpan ke sistem (simulasi)')}
          className="flex h-10 items-center gap-2 rounded-xl bg-brand-500 px-4 text-xs font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-600"
        >
          <Save size={15} /> Simpan Pengaturan
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 dark:border-white/10">
        {[
          'Gelombang & Kuota',
          'Jenjang Program',
          'Persyaratan Berkas',
          'Identitas Pesantren',
          'Log Audit Aktivitas'
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

      {/* Tab 1: Gelombang & Kuota */}
      {activeTab === 'Gelombang & Kuota' && (
        <div className="space-y-4">
          <div className="grid gap-5 md:grid-cols-2">
            {waves.map((w) => (
              <div
                key={w.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-[#192118]"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                    {w.academicYear}
                  </span>
                  <StatusBadge status={w.status} />
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-800 dark:text-white">
                  {w.name}
                </h3>
                <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <p>📅 Periode: {w.startDate} - {w.endDate}</p>
                  <p>📝 Jadwal Tes Seleksi: {w.examDate}</p>
                </div>

                <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs dark:bg-white/5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kuota Terisi:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {w.filled} / {w.quota} Kursi Santri
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-slate-200 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-brand-500"
                      style={{ width: `${Math.round((w.filled / w.quota) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3 dark:border-white/5">
                  <button
                    type="button"
                    onClick={() => onNotify(`Form ubah ${w.name} dibuka (demo)`)}
                    className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-slate-200 py-1.5 text-xs font-semibold hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5"
                  >
                    <Edit size={13} /> Edit Periode
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Jenjang Program */}
      {activeTab === 'Jenjang Program' && (
        <div className="grid gap-4 md:grid-cols-3">
          {programs.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-[#192118]"
            >
              <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">
                {p.id}
              </span>
              <h3 className="mt-1 text-sm font-bold text-slate-800 dark:text-white">{p.name}</h3>
              <div className="mt-3 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                <p>Masa Studi: {p.duration}</p>
                <p>Batas Usia: {p.minAge} - {p.maxAge} Tahun</p>
                <p className="font-bold text-slate-700 dark:text-slate-200">
                  Daya Tampung: {p.quota} Santri
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Persyaratan Berkas */}
      {activeTab === 'Persyaratan Berkas' && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#192118]">
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            Konfigurasi Persyaratan Dokumen Calon Santri
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Tentukan berkas yang wajib diunggah oleh pendaftar pada alur formulir online.
          </p>

          <div className="mt-5 divide-y divide-slate-100 dark:divide-white/5">
            {docs.map((d) => (
              <div key={d.id} className="flex items-center justify-between py-3.5">
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">{d.name}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    Format: {d.formats} · Batas Ukuran: {d.maxSize}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-bold ${
                      d.required
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400'
                    }`}
                  >
                    {d.required ? 'Wajib Diunggah' : 'Opsional'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleDocRequired(d.id)}
                    className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300"
                  >
                    Ubah Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Identitas Pesantren */}
      {activeTab === 'Identitas Pesantren' && (
        <form onSubmit={handleSaveIdentity} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#192118]">
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            Profil Resmi Pondok Pesantren
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Data ini digunakan pada kop kartu peserta, kuitansi elektronik, dan template pengumuman resmi.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Nama Lembaga Pesantren
              </label>
              <input
                type="text"
                value={identity.name}
                onChange={(e) => setIdentity({ ...identity, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Motto / Visi Utama
              </label>
              <input
                type="text"
                value={identity.motto}
                onChange={(e) => setIdentity({ ...identity, motto: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Nomor SK Kemenag
              </label>
              <input
                type="text"
                value={identity.skKemenag}
                onChange={(e) => setIdentity({ ...identity, skKemenag: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Nomor Statistik Pesantren (NSP)
              </label>
              <input
                type="text"
                value={identity.nisp}
                onChange={(e) => setIdentity({ ...identity, nisp: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Alamat Kampus Pesantren
              </label>
              <input
                type="text"
                value={identity.address}
                onChange={(e) => setIdentity({ ...identity, address: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Pimpinan Pondok Pesantren
              </label>
              <input
                type="text"
                value={identity.headmaster}
                onChange={(e) => setIdentity({ ...identity, headmaster: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Ketua Panitia PPDB
              </label>
              <input
                type="text"
                value={identity.ppdbChairman}
                onChange={(e) => setIdentity({ ...identity, ppdbChairman: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          <div className="mt-5 border-t border-slate-100 pt-4 dark:border-white/10">
            <button
              type="submit"
              className="rounded-xl bg-brand-500 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-600"
            >
              Simpan Profil Lembaga
            </button>
          </div>
        </form>
      )}

      {/* Tab 5: Log Audit Aktivitas */}
      {activeTab === 'Log Audit Aktivitas' && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#192118]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/10">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Log Audit Aktivitas Sistem PPDB
              </h3>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Pencatatan jejak audit aksi administratif pengguna untuk akuntabilitas data.
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-mono text-slate-600 dark:bg-white/5 dark:text-slate-300">
              Audit Tracker Aktif
            </span>
          </div>

          <div className="mt-4 divide-y divide-slate-100 dark:divide-white/5">
            {mockAuditLogs.map((log) => (
              <div key={log.id} className="flex flex-col gap-2 py-3 text-xs sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-brand-600">{log.id}</span>
                    <span className="font-semibold text-slate-800 dark:text-white">{log.action}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    Oleh: <b className="text-slate-600 dark:text-slate-300">{log.user}</b> · IP: {log.ip}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-400">{log.timestamp}</span>
                  <StatusBadge status={log.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
