import React from 'react'
import {
  LayoutDashboard,
  ClipboardList,
  FileCheck2,
  Wallet,
  BookOpenCheck,
  BedDouble,
  ChartNoAxesCombined,
  Settings2,
  BellRing,
  MessagesSquare,
  Users,
  GraduationCap,
  X,
  LogOut,
  UserCheck
} from 'lucide-react'

export const adminNavigationModules = [
  { name: 'Dashboard', icon: LayoutDashboard, group: 'UTAMA' },
  { name: 'Pendaftaran Santri', icon: ClipboardList, group: 'PENERIMAAN' },
  { name: 'Verifikasi & Seleksi', icon: FileCheck2, group: 'PENERIMAAN' },
  { name: 'Keuangan & Pembayaran', icon: Wallet, group: 'PENERIMAAN' },
  { name: 'Tes & Ujian Online', icon: BookOpenCheck, group: 'PENERIMAAN' },
  { name: 'Asrama & Ke-santrian', icon: BedDouble, group: 'SANTRI' },
  { name: 'Pelaporan & Pimpinan', icon: ChartNoAxesCombined, group: 'MANAJEMEN' },
  { name: 'Master Data & Pengaturan', icon: Settings2, group: 'MANAJEMEN' },
  { name: 'Notifikasi Gateway', icon: BellRing, group: 'LAYANAN' },
  { name: 'Helpdesk & FAQ', icon: MessagesSquare, group: 'LAYANAN' },
  { name: 'Manajemen Akun & Role', icon: Users, group: 'AKUN' }
]

export const applicantModules = [
  { name: 'Portal Santri', icon: LayoutDashboard, group: 'PORTAL SANTRI' },
  { name: 'Dokumen Berkas', icon: FileCheck2, group: 'PORTAL SANTRI' },
  { name: 'Tagihan & Pembayaran', icon: Wallet, group: 'PORTAL SANTRI' },
  { name: 'Ujian CBT Online', icon: BookOpenCheck, group: 'PORTAL SANTRI' },
  { name: 'Asrama & Kamar', icon: BedDouble, group: 'PORTAL SANTRI' },
  { name: 'Helpdesk & FAQ', icon: MessagesSquare, group: 'BANTUAN' }
]

export const treasurerModules = [
  { name: 'Keuangan & Pembayaran', icon: Wallet, group: 'KEUANGAN' },
  { name: 'Pelaporan & Pimpinan', icon: ChartNoAxesCombined, group: 'LAPORAN' },
  { name: 'Helpdesk & FAQ', icon: MessagesSquare, group: 'LAYANAN' }
]

export const examinerModules = [
  { name: 'Tes & Ujian Online', icon: BookOpenCheck, group: 'SELEKSI & UJIAN' },
  { name: 'Pelaporan & Pimpinan', icon: ChartNoAxesCombined, group: 'REKAP NILAI' },
  { name: 'Helpdesk & FAQ', icon: MessagesSquare, group: 'LAYANAN' }
]

export const verifierModules = [
  { name: 'Verifikasi & Seleksi', icon: FileCheck2, group: 'VERIFIKASI' },
  { name: 'Pendaftaran Santri', icon: ClipboardList, group: 'PENERIMAAN' },
  { name: 'Helpdesk & FAQ', icon: MessagesSquare, group: 'LAYANAN' }
]

export const executiveModules = [
  { name: 'Dashboard', icon: LayoutDashboard, group: 'UTAMA' },
  { name: 'Pelaporan & Pimpinan', icon: ChartNoAxesCombined, group: 'MANAJEMEN' },
  { name: 'Asrama & Ke-santrian', icon: BedDouble, group: 'MONITORING' },
  { name: 'Helpdesk & FAQ', icon: MessagesSquare, group: 'LAYANAN' }
]

export const navigationModules = adminNavigationModules

export function Sidebar({
  activeModule,
  setActiveModule,
  isOpen,
  setIsOpen,
  currentUser,
  onOpenProfile,
  onLogout
}) {
  const getModulesForRole = (roleId) => {
    switch (roleId) {
      case 'applicant':
        return applicantModules
      case 'treasurer':
        return treasurerModules
      case 'examiner':
        return examinerModules
      case 'verifier':
        return verifierModules
      case 'executive':
        return executiveModules
      default:
        return adminNavigationModules
    }
  }

  const currentRoleModules = getModulesForRole(currentUser?.roleId)
  const groups = [...new Set(currentRoleModules.map((m) => m.group))]

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Tutup menu navigasi"
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[265px] flex-col border-r border-slate-200/80 bg-white transition-transform duration-300 dark:border-white/10 dark:bg-[#192118] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Brand header */}
        <div className="flex h-[82px] items-center gap-3 border-b border-slate-100 px-5 dark:border-white/10">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/25">
            <GraduationCap size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold tracking-tight text-slate-900 dark:text-white">Darul Harumain</p>
            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[.14em] text-brand-600 dark:text-brand-400">
              {currentUser?.roleId === 'applicant' ? 'Portal Calon Santri' : 'Portal PPDB Online'}
            </p>
          </div>
          <button
            type="button"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Periode Badge Card */}
        {currentUser?.roleId === 'applicant' ? (
          <div className="mx-4 mt-4 rounded-2xl bg-brand-50/80 p-3.5 dark:bg-brand-900/20">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[.15em] text-brand-700 dark:text-brand-300">
                Calon Santri
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Terdaftar
              </span>
            </div>
            <p className="mt-1 text-xs font-bold text-slate-800 dark:text-white truncate">
              {currentUser?.name || 'Ahmad Fauzan Pratama'}
            </p>
            <p className="mt-0.5 font-mono text-[11px] font-semibold text-brand-600 dark:text-brand-400">
              {currentUser?.applicantId || 'DH-2026-00128'}
            </p>
          </div>
        ) : (
          <div className="mx-4 mt-4 rounded-2xl bg-brand-50/80 p-3.5 dark:bg-brand-900/20">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[.15em] text-brand-700 dark:text-brand-300">
                Tahun Ajaran
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Aktif
              </span>
            </div>
            <p className="mt-1 text-sm font-bold text-slate-800 dark:text-white">2026 / 2027</p>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-brand-200/50 dark:bg-white/10">
              <div className="h-full w-[72%] rounded-full bg-brand-500" />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span>Gelombang 1</span>
              <span>72% kuota terisi</span>
            </div>
          </div>
        )}

        {/* Module Navigation */}
        <nav className="mt-4 flex-1 space-y-4 overflow-y-auto px-3 pb-4">
          {groups.map((grp) => {
            const items = currentRoleModules.filter((m) => m.group === grp)
            if (items.length === 0) return null
            return (
              <div key={grp}>
                <p className="mb-1.5 px-3 text-[10px] font-bold tracking-[.16em] text-slate-400 dark:text-slate-500">
                  {grp}
                </p>
                <div className="space-y-1">
                  {items.map((item) => {
                    const Icon = item.icon
                    const isActive = activeModule === item.name
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => {
                          setActiveModule(item.name)
                          setIsOpen(false)
                        }}
                        className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-semibold transition ${
                          isActive
                            ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                        }`}
                      >
                        <Icon size={16} strokeWidth={isActive ? 2.4 : 1.8} />
                        <span className="flex-1 truncate">{item.name}</span>
                        {item.name === 'Helpdesk & FAQ' && (
                          <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-white' : 'bg-rose-500'}`} />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </nav>

        {/* User Session Footer */}
        <div className="border-t border-slate-100 p-3 dark:border-white/10">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-2.5 transition dark:bg-white/5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-100 text-xs font-bold text-brand-800 dark:bg-brand-900/60 dark:text-brand-200">
              {currentUser?.avatarInitials || 'AD'}
            </div>
            <div className="min-w-0 flex-1 cursor-pointer" onClick={onOpenProfile}>
              <p className="truncate text-xs font-bold text-slate-800 dark:text-white">
                {currentUser?.name || 'Admin PPDB'}
              </p>
              <p className="truncate text-[10px] text-slate-400">
                {currentUser?.roleName || 'Super administrator'}
              </p>
            </div>
            <button
              type="button"
              title="Keluar / Ganti Akun"
              onClick={onLogout}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
