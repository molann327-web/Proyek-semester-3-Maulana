import React, { useState } from 'react'
import {
  BellRing,
  MessageCircle,
  Mail,
  Send,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCode,
  ShieldAlert,
  ArrowRight
} from 'lucide-react'
import { mockNotificationTemplates, mockMessageQueue } from '../../data/mockNotifications'
import { StatCard } from '../../components/common/StatCard'
import { StatusBadge } from '../../components/common/StatusBadge'

export function NotificationGatewayPage({ onNotify }) {
  const [templates, setTemplates] = useState(mockNotificationTemplates)
  const [queue, setQueue] = useState(mockMessageQueue)
  const [selectedTemplate, setSelectedTemplate] = useState(mockNotificationTemplates[0])
  const [previewName, setPreviewName] = useState('Ahmad Fauzan')
  const [previewId, setPreviewId] = useState('DH-2026-00128')

  const handleRetryMessage = (id) => {
    const updated = queue.map((q) => {
      if (q.id === id) {
        return { ...q, status: 'Terkirim', retries: q.retries + 1, timestamp: 'Baru saja' }
      }
      return q
    })
    setQueue(updated)
    onNotify(`Pesan ${id} berhasil dikirim ulang (simulasi retry gateway)`)
  }

  const renderTemplatePreview = () => {
    return selectedTemplate.content
      .replace(/{{nama_santri}}/g, previewName)
      .replace(/{{nama_wali}}/g, `Bpk. Yusuf (Wali ${previewName})`)
      .replace(/{{nomor_pendaftaran}}/g, previewId)
      .replace(/{{kode_akses}}/g, 'DH-88219')
      .replace(/{{nominal}}/g, '250.000')
      .replace(/{{catatan_perbaikan}}/g, 'Scan Akta Kelahiran tidak terbaca')
      .replace(/{{batas_waktu}}/g, '28 Oktober 2026')
      .replace(/{{tanggal_tes}}/g, '06 Desember 2026')
      .replace(/{{waktu_tes}}/g, '08:00 WIB')
      .replace(/{{sesi_ujian}}/g, 'Sesi Pagi - CBT')
      .replace(/{{status_kelulusan}}/g, 'LULUS SELEKSI')
      .replace(/{{program_santri}}/g, 'Madrasah Tsanawiyah (MTs)')
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
              <BellRing size={14} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[.15em] text-brand-700 dark:text-brand-300">
              Modul Notifikasi Gateway
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[30px]">
            WhatsApp & Email Notification Gateway
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Automasi pengiriman pesan notifikasi status pendaftaran, verifikasi berkas, konfirmasi bayar, dan pengumuman seleksi.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNotify('Simulasi trigger pengiriman broadcast batch berhasil dijalankan')}
          className="flex h-10 items-center gap-2 rounded-xl bg-brand-500 px-4 text-xs font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-600"
        >
          <Send size={14} /> Uji Antrean Gateway (Simulasi)
        </button>
      </div>

      {/* Gateway Architecture Pipeline Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-[#192118]">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Alur Kerja Notifikasi Gateway (Event-Driven Pipeline):
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-center">
          <div className="flex-1 min-w-[120px] rounded-xl bg-slate-50 p-3 dark:bg-white/5">
            <p className="text-xs font-bold text-slate-800 dark:text-white">1. Event Trigger</p>
            <p className="mt-0.5 text-[10px] text-slate-400">Pendaftaran / Verifikasi</p>
          </div>
          <ArrowRight size={16} className="text-slate-300" />
          <div className="flex-1 min-w-[120px] rounded-xl bg-slate-50 p-3 dark:bg-white/5">
            <p className="text-xs font-bold text-slate-800 dark:text-white">2. Template Engine</p>
            <p className="mt-0.5 text-[10px] text-slate-400">Render Dynamic Tags</p>
          </div>
          <ArrowRight size={16} className="text-slate-300" />
          <div className="flex-1 min-w-[120px] rounded-xl bg-brand-50 p-3 dark:bg-brand-900/30">
            <p className="text-xs font-bold text-brand-700 dark:text-brand-300">3. Message Queue</p>
            <p className="mt-0.5 text-[10px] text-brand-600/70 dark:text-brand-400/70">Antrean Terjadwal</p>
          </div>
          <ArrowRight size={16} className="text-slate-300" />
          <div className="flex-1 min-w-[120px] rounded-xl bg-slate-50 p-3 dark:bg-white/5">
            <p className="text-xs font-bold text-slate-800 dark:text-white">4. Provider Gateway</p>
            <p className="mt-0.5 text-[10px] text-slate-400">WhatsApp / SMTP Relay</p>
          </div>
          <ArrowRight size={16} className="text-slate-300" />
          <div className="flex-1 min-w-[120px] rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/40">
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">5. Delivery Status</p>
            <p className="mt-0.5 text-[10px] text-emerald-600/70">Laporan Diterima ✓✓</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Pesan Terkirim (Bulan Ini)"
          value="1.248"
          delta="98.8%"
          note="Terkirim Sukses"
          line="WhatsApp & Email"
          icon={CheckCircle2}
          tone="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"
        />
        <StatCard
          label="Menunggu Antrean"
          value={queue.filter((q) => q.status === 'Menunggu').length}
          delta="Sedang Diproses"
          note="Batch Scheduler"
          line="Siap Dispatch"
          icon={Clock}
          tone="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300"
        />
        <StatCard
          label="Gagal Pengiriman"
          value={queue.filter((q) => q.status === 'Gagal').length}
          delta="Perlu Tindakan"
          note="Nomor Tidak Valid"
          line="Retry Otomatis"
          icon={AlertCircle}
          tone="bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300"
        />
        <StatCard
          label="Template Aktif"
          value={`${templates.length} Template`}
          delta="Standar SOT"
          note="Multi-Channel"
          line="Event Bisnis"
          icon={FileCode}
          tone="bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-300"
        />
      </div>

      {/* Main Two Column View: Template & Live WhatsApp Simulator */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Template Selector & Editor */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#192118]">
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            Pilihan Template Pesan Gateway
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Pilih template untuk melihat simulasi tampilan di ponsel penerima:
          </p>

          <div className="mt-4 space-y-2">
            {templates.map((tpl) => {
              const isSelected = selectedTemplate.id === tpl.id
              return (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => setSelectedTemplate(tpl)}
                  className={`flex w-full items-center justify-between rounded-xl p-3 text-left transition ${
                    isSelected
                      ? 'border border-brand-500 bg-brand-50/70 dark:bg-brand-900/30'
                      : 'border border-slate-100 bg-slate-50/60 hover:bg-slate-50 dark:border-white/5 dark:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
                      <MessageCircle size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-white">{tpl.event}</p>
                      <p className="text-[10px] text-slate-400">Kanal: {tpl.channel}</p>
                    </div>
                  </div>
                  <span className="rounded bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                    {tpl.category}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-5 border-t border-slate-100 pt-4 dark:border-white/10">
            <p className="text-xs font-bold text-slate-800 dark:text-white">Kustomisasi Parameter Uji:</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <input
                type="text"
                value={previewName}
                onChange={(e) => setPreviewName(e.target.value)}
                placeholder="Nama Calon Santri"
                className="rounded-xl border border-slate-200 bg-white p-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
              <input
                type="text"
                value={previewId}
                onChange={(e) => setPreviewId(e.target.value)}
                placeholder="Nomor Pendaftaran"
                className="rounded-xl border border-slate-200 bg-white p-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Live WhatsApp Bubble Simulator */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-[#EFEAE2] p-5 shadow-soft dark:border-white/10 dark:bg-[#0c130b]">
          <div>
            {/* Phone WhatsApp Header */}
            <div className="flex items-center gap-3 rounded-xl bg-[#005E54] p-3 text-white shadow-sm">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-xs font-bold">
                DH
              </div>
              <div>
                <p className="text-xs font-bold">Sekretariat PPDB Darul Haromain</p>
                <p className="text-[10px] text-white/70">Akun WhatsApp Bisnis Resmi (Simulasi)</p>
              </div>
            </div>

            {/* Chat Bubble */}
            <div className="mt-5 flex flex-col space-y-3">
              <div className="max-w-[90%] rounded-2xl rounded-tl-xs bg-white p-4 text-xs leading-5 text-slate-800 shadow-sm dark:bg-[#1f2c1c] dark:text-slate-100 whitespace-pre-line">
                {renderTemplatePreview()}
                <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-slate-400">
                  <span>09:41</span>
                  <span className="font-bold text-sky-500">✓✓</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-dashed border-amber-300 bg-amber-50/80 p-3 text-[11px] leading-4 text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
            <p className="flex items-center gap-1 font-bold">
              <ShieldAlert size={14} /> Batasan Scope Front-End:
            </p>
            Seluruh pesan dan alur antrean ini beroperasi dalam mode mock lokal. Tidak ada SMS, WhatsApp, atau email nyata yang dikirimkan keluar.
          </div>
        </div>
      </div>

      {/* Message Queue Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#192118]">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/10">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Antrean Pengiriman Pesan Real-Time (Simulasi)
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Status dispatch pesan WhatsApp dan email berbasis event pendaftaran.
            </p>
          </div>
        </div>

        <div className="mt-4 divide-y divide-slate-100 dark:divide-white/5">
          {queue.map((q) => (
            <div key={q.id} className="flex flex-col gap-2 py-3 text-xs sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{q.id}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{q.event}</span>
                </div>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Penerima: <b className="text-slate-600 dark:text-slate-300">{q.recipient}</b> ({q.recipientName}) · Kanal: {q.channel}
                </p>
                {q.failureReason && (
                  <p className="mt-0.5 text-[10px] text-rose-500 italic">Kendala: {q.failureReason}</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400">{q.timestamp}</span>
                <StatusBadge status={q.status} />
                {q.status === 'Gagal' && (
                  <button
                    type="button"
                    onClick={() => handleRetryMessage(q.id)}
                    className="flex items-center gap-1 rounded-lg bg-brand-500 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-brand-600"
                  >
                    <RefreshCw size={12} /> Kirim Ulang
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
