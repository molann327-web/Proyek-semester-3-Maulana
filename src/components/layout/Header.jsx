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
  User
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
  onNavigate
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
            Sistem Informasi Penerimaan Santri Baru T.A. 2026/2027
          </p>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
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
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-500 dark:border-[#151d14]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-white/10 dark:bg-[#1a2318]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-white/10">
                <p className="text-xs font-bold text-slate-800 dark:text-white">Pemberitahuan Sistem</p>
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                  3 Baru
                </span>
              </div>
              <div className="mt-3 space-y-2.5 text-xs">
                <div
                  onClick={() => {
                    onNavigate('Verifikasi & Seleksi')
                    setShowNotifications(false)
                  }}
                  className="cursor-pointer rounded-xl bg-slate-50 p-2.5 transition hover:bg-brand-50/60 dark:bg-white/5"
                >
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Berkas Perlu Ditinjau</p>
                  <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                    Ada 3 berkas calon santri baru yang masuk antrean verifikasi hari ini.
                  </p>
                </div>
                <div
                  onClick={() => {
                    onNavigate('Keuangan & Pembayaran')
                    setShowNotifications(false)
                  }}
                  className="cursor-pointer rounded-xl bg-slate-50 p-2.5 transition hover:bg-brand-50/60 dark:bg-white/5"
                >
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Konfirmasi Pembayaran</p>
                  <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                    2 bukti transfer menanti validasi dari bendahara PPDB.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="hidden h-8 w-px bg-slate-200 sm:block dark:bg-white/10" />

        {/* User profile menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowUserDropdown(!showUserDropdown)
              setShowNotifications(false)
            }}
            className="flex items-center gap-2 rounded-xl p-1 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-100 text-xs font-bold text-brand-700 dark:bg-brand-900/60 dark:text-brand-200">
              {currentUser?.avatarInitials || 'AD'}
            </div>
            <div className="hidden text-left sm:block">
              <p className="max-w-[130px] truncate text-xs font-bold text-slate-800 dark:text-white">
                {currentUser?.name?.split(' ')[0] || 'Admin'}
              </p>
              <p className="max-w-[130px] truncate text-[10px] text-slate-400">
                {currentUser?.roleName?.split(' ')[0] || 'Administrator'}
              </p>
            </div>
            <ChevronDown size={14} className="hidden text-slate-400 sm:block" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-[#1a2318]">
              <div className="border-b border-slate-100 p-2.5 dark:border-white/10">
                <p className="text-xs font-bold text-slate-800 dark:text-white">{currentUser?.name}</p>
                <p className="truncate text-[10px] text-slate-400">{currentUser?.email}</p>
              </div>
              <div className="mt-1 space-y-1">
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
