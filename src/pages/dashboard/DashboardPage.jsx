import React, { useState } from 'react'
import {
  Users,
  ShieldCheck,
  Wallet,
  GraduationCap,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Filter,
  Eye,
  Plus,
  CircleCheck,
  CalendarDays,
  Download,
  Printer,
  Sparkles
} from 'lucide-react'
import { StatCard } from '../../components/common/StatCard'
import { StatusBadge } from '../../components/common/StatusBadge'
import { Drawer } from '../../components/common/Drawer'
import { RegistrationCardModal } from '../registration/RegistrationCardModal'

const chartData = [38, 52, 43, 68, 55, 76, 61, 84, 72, 92, 78, 100]
const monthLabels = ['Nov', 'Des', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt']

export function DashboardPage({
  applicants,
  onNavigate,
  onNotify,
  onOpenRegisterModal
}) {
  const [period, setPeriod] = useState('Periode 2026/2027')
  const [filter, setFilter] = useState('Semua status')
  const [search, setSearch] = useState('')
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [cardApplicant, setCardApplicant] = useState(null)

  const filtered = applicants.filter((a) => {
    const matchSearch = (a.name + a.id + a.school).toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'Semua status' || a.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="space-y-6">
      {/* Top Greeting & Controls */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[.16em] text-brand-700 dark:text-brand-300">
              Ringkasan Eksekutif PPDB
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-[30px]">
            Dashboard PPDB Darul Haromain
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Pantau seluruh progres penerimaan santri baru tahun ajaran 2026/2027 secara terpadu.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold dark:border-white/10 dark:bg-white/5">
            <CalendarDays size={14} className="text-slate-400" />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-transparent outline-none dark:text-white"
            >
              <option value="Periode 2026/2027">Periode 2026/2027</option>
              <option value="Periode 2025/2026">Periode 2025/2026</option>
              <option value="Semua periode">Semua periode</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => onNotify('Laporan ringkasan penerimaan disiapkan untuk diunduh (demo)')}
            className="flex h-10 items-center gap-2 rounded-xl bg-brand-500 px-4 text-xs font-bold text-white shadow-md shadow-brand-500/20 transition hover:bg-brand-600"
          >
            <Download size={14} /> Ekspor Laporan
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#284B2D] p-6 text-white shadow-soft sm:p-8">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em]">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-300 animate-pulse" /> Pendaftaran Dibuka
          </span>

          <h2 className="mt-4 text-2xl font-extrabold leading-tight sm:text-[32px]">
            Membangun generasi Qur'ani,<br className="hidden sm:block" /> dimulai dari langkah pertama.
          </h2>

          <p className="mt-3 max-w-md text-xs leading-6 text-white/75 sm:text-sm">
            Periode penerimaan santri baru tahun ajaran 2026/2027 sedang berlangsung. Pastikan verifikasi berkas dan pembayaran diselesaikan tepat waktu.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate('Pendaftaran Santri')}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#284B2D] transition hover:bg-brand-50"
            >
              Kelola Pendaftaran <ArrowUpRight size={15} />
            </button>
            <button
              type="button"
              onClick={onOpenRegisterModal}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              + Daftar Santri Baru
            </button>
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="pointer-events-none absolute -right-10 -top-28 h-80 w-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-2 -top-16 h-64 w-64 rounded-full border-[32px] border-white/[.045]" />
        <div className="pointer-events-none absolute bottom-[-95px] right-[18%] h-56 w-56 rotate-45 rounded-[48px] bg-brand-500/20" />

        <div className="absolute bottom-6 right-8 hidden text-right lg:block">
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-white/50">
            Target Kuota Penerimaan
          </p>
          <p className="mt-1 text-4xl font-extrabold">
            250 <span className="text-lg font-medium text-white/50">santri</span>
          </p>
          <p className="mt-1 text-xs text-lime-200">180 kursi telah terisi (72%)</p>
        </div>
      </section>

      {/* 4 Core Stat Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Pendaftar"
          value="1.248"
          delta="+12,8%"
          note="dibanding bulan lalu"
          line="Meningkat stabil"
          icon={Users}
          tone="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300"
          onClick={() => onNavigate('Pendaftaran Santri')}
        />
        <StatCard
          label="Berkas Terverifikasi"
          value="864"
          delta="69,2%"
          note="dari total pendaftar"
          line="Target 80%"
          icon={ShieldCheck}
          tone="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"
          onClick={() => onNavigate('Verifikasi & Seleksi')}
        />
        <StatCard
          label="Pembayaran Lunas"
          value="792"
          delta="63,4%"
          note="dari total pendaftar"
          line="72 menunggu"
          icon={Wallet}
          tone="bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300"
          onClick={() => onNavigate('Keuangan & Pembayaran')}
        />
        <StatCard
          label="Lulus Seleksi Santri"
          value="326"
          delta="26,1%"
          note="hasil seleksi sementara"
          line="Gelombang 1"
          icon={GraduationCap}
          tone="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300"
          onClick={() => onNavigate('Verifikasi & Seleksi')}
        />
      </section>

      {/* Trends & Pipeline Breakdown */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.55fr_1fr]">
        {/* Trend Bar Chart */}
        <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-[#192118] sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">Tren Pertumbuhan Pendaftar</h3>
              <p className="mt-1 text-xs text-slate-400">Pertumbuhan calon santri per bulan</p>
            </div>
            <span className="rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-500 dark:border-white/10">
              12 Bulan Terakhir
            </span>
          </div>

          <div className="mt-6 flex h-[175px] items-end gap-2 border-b border-slate-100 pb-0 dark:border-white/10 sm:gap-4">
            {chartData.map((v, i) => (
              <div key={i} className="group flex h-full flex-1 flex-col justify-end">
                <div
                  className="relative w-full rounded-t-lg bg-brand-100 transition hover:bg-brand-300 dark:bg-brand-900/60"
                  style={{ height: `${v}%` }}
                >
                  <div
                    className={`absolute inset-x-0 bottom-0 rounded-t-lg ${
                      i > 8 ? 'bg-brand-500' : 'bg-brand-400/80'
                    }`}
                    style={{ height: `${Math.max(30, v - 18)}%` }}
                  />
                  <span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded bg-slate-900 px-1.5 py-0.5 text-[10px] font-bold text-white group-hover:block z-10 whitespace-nowrap">
                    {Math.round(v * 12.4)} santri
                  </span>
                </div>
                <span className="mt-2 text-center text-[10px] text-slate-400">
                  {monthLabels[i]}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              <span className="text-[11px] text-slate-500">Jumlah pendaftar masuk</span>
            </div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
              +24,6% <span className="font-normal text-slate-400">dari periode 2025/2026</span>
            </p>
          </div>
        </article>

        {/* Process Breakdown Donut */}
        <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-[#192118] sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">Komposisi Verifikasi</h3>
              <p className="mt-1 text-xs text-slate-400">Status berkas saat ini</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('Verifikasi & Seleksi')}
              className="text-xs font-bold text-brand-600 hover:underline dark:text-brand-400"
            >
              Detail →
            </button>
          </div>

          <div className="mt-6 flex items-center gap-5">
            <div
              className="relative grid h-32 w-32 shrink-0 place-items-center rounded-full"
              style={{
                background:
                  'conic-gradient(#689D4B 0 69%, #E8B75A 69% 82%, #E87979 82% 100%)'
              }}
            >
              <div className="grid h-[88px] w-[88px] place-items-center rounded-full bg-white dark:bg-[#192118]">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">69%</p>
                  <p className="text-[9px] text-slate-400">Terverifikasi</p>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-[11px]">
                  <span className="text-slate-500">Terverifikasi</span>
                  <b className="text-slate-700 dark:text-slate-200">864</b>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10">
                  <div className="h-full w-[69%] rounded-full bg-brand-500" />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-[11px]">
                  <span className="text-slate-500">Menunggu</span>
                  <b className="text-slate-700 dark:text-slate-200">248</b>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10">
                  <div className="h-full w-[20%] rounded-full bg-amber-400" />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-[11px]">
                  <span className="text-slate-500">Perlu Perbaikan</span>
                  <b className="text-slate-700 dark:text-slate-200">136</b>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10">
                  <div className="h-full w-[11%] rounded-full bg-rose-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-brand-50 p-3 dark:bg-brand-900/25">
            <div className="flex gap-2">
              <CircleCheck size={16} className="mt-0.5 text-brand-600 dark:text-brand-400" />
              <p className="text-[11px] leading-5 text-slate-600 dark:text-slate-300">
                <b className="text-brand-700 dark:text-brand-300">Progres baik.</b> 69% berkas telah lolos verifikasi. Prioritaskan 136 berkas yang perlu perbaikan.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* Recent Applicants Table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft dark:border-white/10 dark:bg-[#192118]">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 dark:border-white/10 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white">Pendaftar Terbaru Masuk</h3>
            <p className="mt-0.5 text-xs text-slate-400">Aktivitas pendaftaran calon santri terkini</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Filter size={14} className="pointer-events-none absolute left-2.5 top-2.5 text-slate-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="h-9 rounded-lg border border-slate-200 bg-white pl-8 pr-2 text-[11px] font-medium outline-none dark:border-white/10 dark:bg-[#192118] dark:text-slate-200"
              >
                <option>Semua status</option>
                <option>Terverifikasi</option>
                <option>Menunggu berkas</option>
                <option>Perlu perbaikan</option>
                <option>Dalam seleksi</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('Pendaftaran Santri')}
              className="flex h-9 items-center gap-1.5 rounded-lg bg-brand-500 px-3 text-[11px] font-bold text-white hover:bg-brand-600"
            >
              <Plus size={14} /> Lihat Semua
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="bg-slate-50/80 text-[10px] uppercase tracking-[.1em] text-slate-400 dark:bg-white/[.025]">
                <th className="px-6 py-3 font-bold">Calon Santri</th>
                <th className="px-4 py-3 font-bold">Nomor Pendaftaran</th>
                <th className="px-4 py-3 font-bold">Tanggal</th>
                <th className="px-4 py-3 font-bold">Status Verifikasi</th>
                <th className="px-4 py-3 font-bold">Pembayaran</th>
                <th className="px-5 py-3 text-right font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filtered.slice(0, 5).map((a) => (
                <tr key={a.id} className="transition hover:bg-slate-50/70 dark:hover:bg-white/[.025]">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`grid h-9 w-9 place-items-center rounded-xl text-[10px] font-bold ${a.color}`}>
                        {a.initials}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-white">{a.name}</p>
                        <p className="mt-0.5 text-[10px] text-slate-400">{a.school}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {a.id}
                  </td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-500 dark:text-slate-400">
                    {a.date}
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`text-[11px] font-semibold ${
                        a.pay === 'Lunas' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                      }`}
                    >
                      {a.pay}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        title="Lihat Detail Santri"
                        onClick={() => setSelectedApplicant(a)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/30"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        type="button"
                        title="Cetak Kartu Ujian"
                        onClick={() => setCardApplicant(a)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/30"
                      >
                        <Printer size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-3.5 dark:border-white/10">
          <p className="text-[11px] text-slate-400">
            Menampilkan {Math.min(filtered.length, 5)} dari {filtered.length} data pendaftar terkini
          </p>
          <button
            type="button"
            onClick={() => onNavigate('Pendaftaran Santri')}
            className="flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline dark:text-brand-400"
          >
            Buka Daftar Lengkap <ChevronRight size={14} />
          </button>
        </div>
      </section>

      {/* Footer Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] text-slate-400">
        <p>© 2026 Pondok Pesantren Darul Haromain · Sistem Informasi PPDB Terpadu</p>
        <p className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Semua modul beroperasi normal
        </p>
      </div>

      {/* Drawer */}
      <Drawer
        isOpen={Boolean(selectedApplicant)}
        onClose={() => setSelectedApplicant(null)}
        title="Detail Calon Santri"
        subtitle="Verifikasi Berkas"
      >
        {selectedApplicant && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3 rounded-2xl bg-brand-50/70 p-4 dark:bg-brand-900/20">
              <div className={`grid h-12 w-12 place-items-center rounded-2xl text-sm font-bold ${selectedApplicant.color}`}>
                {selectedApplicant.initials}
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-white sm:text-sm">{selectedApplicant.name}</p>
                <p className="font-mono text-brand-700 dark:text-brand-300">{selectedApplicant.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                <p className="text-[10px] text-slate-400">Asal Sekolah</p>
                <p className="font-semibold text-slate-800 dark:text-white">{selectedApplicant.school}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                <p className="text-[10px] text-slate-400">Program</p>
                <p className="font-semibold text-slate-800 dark:text-white">{selectedApplicant.program || 'Tsanawiyah (MTs)'}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                <p className="text-[10px] text-slate-400">Status Verifikasi</p>
                <div className="mt-1"><StatusBadge status={selectedApplicant.status} /></div>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
                <p className="text-[10px] text-slate-400">Pembayaran</p>
                <p className="font-semibold text-slate-800 dark:text-white">{selectedApplicant.pay}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedApplicant(null)
                onNavigate('Verifikasi & Seleksi')
              }}
              className="mt-4 w-full rounded-xl bg-brand-500 py-3 text-xs font-bold text-white shadow-md hover:bg-brand-600"
            >
              Buka di Modul Verifikasi & Seleksi
            </button>
          </div>
        )}
      </Drawer>

      {/* Card Preview Modal */}
      <RegistrationCardModal
        isOpen={Boolean(cardApplicant)}
        onClose={() => setCardApplicant(null)}
        applicant={cardApplicant}
        onNotify={onNotify}
      />
    </div>
  )
}
