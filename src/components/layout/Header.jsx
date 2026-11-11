import React, { useState } from 'react'
import {
  Menu,
  Sun,
  Moon,
  BellRing,
  ChevronRight,
  ChevronDown,
  KeyRound,
  LogOut,
  User,
  Home
} from 'lucide-react'

export function Header({
  activeModule,
  onOpenSidebar,
  dark,
  setDark,
  currentUser,
  onChangeRole,
  onOpenProfile,
  onOpenPasswordModal,
  onLogout,
  onNavigate,
  onViewLanding
}) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)

  return (
    <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#151d14]/90 sm:px-7">
      {/* Left breadcrumb & mobile menu */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Buka menu navigasi"
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 lg:hidden"
          onClick={onOpenSidebar}
        >
          <Menu size={20} />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span
              className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
              onClick={() => onNavigate(currentUser?.roleId === 'applicant' ? 'Portal Santri' : 'Dashboard')}
            >
              PPDB Darul Harumain
            </span>
            <ChevronRight size={13} />
            <span className="font-semibold text-slate-800 dark:text-slate-200">{activeModule}</span>
          </div>
          <p className="hidden text-[11px] text-slate-400 sm:block">
            Sistem Informasi Penerimaan Santri Baru T.A. 2027/2028
          </p>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Tombol ke Landing Page publik */}
        {onViewLanding && (
          <button
            type="button"
            onClick={onViewLanding}
            className="hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 sm:flex"
            title="Buka Halaman Utama / Landing Page Publik"
          >
            <Home size={14} className="text-brand-600" />
            <span>Landing Page</span>
          </button>
        )}

        {/* Theme switcher */}
        <button
          type="button"
          aria-label={dark ? 'Ubah ke mode terang' : 'Ubah ke mode gelap'}
          onClick={() => setDark(!dark)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:text-slate-300 dark:hover:border-white/20"
        >
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notifications toggle */}
        <div className="relative">
          <button
            type="button"
            aria-label="Notifikasi sistem"
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowUserDropdown(false)
            }}
            className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:text-slate-300"
          >
            <BellRing size={17} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-500" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl dark:border-white/10 dark:bg-[#1a2318]">
              <div className="border-b border-slate-100 pb-2 font-bold text-xs text-slate-800 dark:text-white flex justify-between items-center">
                <span>Notifikasi Masuk</span>
                <span className="text-[10px] text-brand-600 font-bold">2 Baru</span>
              </div>
              <div className="mt-2 space-y-2 text-xs">
                <div className="rounded-xl bg-slate-50 p-2.5 dark:bg-white/5">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">Verifikasi Berkas Selesai</p>
                  <p className="text-[10px] text-slate-400">Berkas calon santri Ahmad Fauzan Pratama dinyatakan VALID.</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-2.5 dark:bg-white/5">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">Pembayaran Terverifikasi</p>
                  <p className="text-[10px] text-slate-400">Biaya formulir pendaftaran INV-2026-00412 telah lunas.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User profile dropdown button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowUserDropdown(!showUserDropdown)
              setShowNotifications(false)
            }}
            className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white p-1.5 pl-3 text-xs transition hover:border-slate-300 dark:border-white/10 dark:bg-white/5"
          >
            <div className="text-right hidden sm:block">
              <p className="font-bold leading-tight text-slate-800 dark:text-slate-100">{currentUser?.name}</p>
              <p className="text-[10px] text-slate-400">{currentUser?.roleName || 'Pengguna'}</p>
            </div>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-brand-500 font-bold text-white shadow-sm">
              {currentUser?.avatarInitials || 'AG'}
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-[#1a2318]">
              <div className="border-b border-slate-100 p-2.5 dark:border-white/10">
                <p className="text-xs font-bold text-slate-800 dark:text-white">{currentUser?.name}</p>
                <p className="truncate text-[10px] text-slate-400">{currentUser?.email}</p>
              </div>
              <div className="mt-1 space-y-1">
                {onViewLanding && (
                  <button
                    type="button"
                    onClick={() => {
                      onViewLanding()
                      setShowUserDropdown(false)
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5"
                  >
                    <Home size={15} /> Lihat Landing Page
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    onOpenProfile()
                    setShowUserDropdown(false)
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5"
                >
                  <User size={15} /> Profil Saya
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onOpenPasswordModal()
                    setShowUserDropdown(false)
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5"
                >
                  <KeyRound size={15} /> Ubah Kata Sandi
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLogout()
                    setShowUserDropdown(false)
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
                >
                  <LogOut size={15} /> Keluar Sistem
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
