import React, { useState } from 'react'
import { Modal } from '../../components/common/Modal'
import { Mail, CheckCircle2, ArrowRight, Lock, KeyRound, User, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { mockUsers } from '../../data/mockUsers'

export function ForgotPasswordModal({
  isOpen,
  onClose,
  onNotify,
  users = mockUsers,
  onResetPasswordSuccess,
  onPrefillLoginEmail
}) {
  const [step, setStep] = useState(1) // 1: cari akun, 2: buat sandi baru, 3: selesai
  const [query, setQuery] = useState('')
  const [foundUser, setFoundUser] = useState(null)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleClose = () => {
    setStep(1)
    setQuery('')
    setFoundUser(null)
    setNewPassword('')
    setConfirmPassword('')
    setError('')
    setShowPassword(false)
    onClose()
  }

  // Langkah 1: Cari akun
  const handleCheckAccount = (e) => {
    e.preventDefault()
    setError('')
    const clean = query.trim().toLowerCase()
    if (!clean) {
      setError('Mohon masukkan alamat email atau nomor pendaftaran')
      return
    }

    const matched = users.find((u) => {
      const uEmail = u.email ? u.email.toLowerCase() : ''
      const uAppId = u.applicantId ? u.applicantId.toLowerCase() : ''
      const uPhone = u.phone ? u.phone.toLowerCase() : ''
      return uEmail === clean || uAppId === clean || uPhone === clean
    })

    if (!matched) {
      setError('Akun tidak ditemukan. Pastikan alamat email atau nomor pendaftaran yang Anda masukkan sudah terdaftar.')
      return
    }

    setFoundUser(matched)
    setStep(2)
  }

  // Langkah 2: Simpan password baru
  const handleResetSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!newPassword || newPassword.length < 6) {
      setError('Kata sandi baru minimal terdiri dari 6 karakter')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok. Silakan ketik ulang dengan benar.')
      return
    }

    if (onResetPasswordSuccess && foundUser) {
      onResetPasswordSuccess(foundUser.email, newPassword)
    }

    if (onNotify) {
      onNotify(`Kata sandi untuk akun ${foundUser.name} berhasil diubah!`)
    }

    setStep(3)
  }

  // Langkah 3: Selesai & kembali login
  const handleProceedToLogin = () => {
    if (onPrefillLoginEmail && foundUser) {
      onPrefillLoginEmail(foundUser.email)
    }
    handleClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Pemulihan Kata Sandi Akun"
      subtitle="Portal PPDB Pondok Pesantren Darul Haromain"
      maxWidth="max-w-md"
    >
      {step === 1 && (
        <form onSubmit={handleCheckAccount} className="space-y-4 py-2">
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
            Masukkan alamat email atau nomor pendaftaran calon santri untuk menemukan akun Anda dan mengatur ulang kata sandi.
          </p>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Alamat Email / Nomor Pendaftaran
            </label>
            <div className="relative">
              <Mail size={16} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="nama@email.com atau DH-2026-XXXXX"
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="w-1/2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex w-1/2 items-center justify-center gap-1.5 rounded-xl bg-brand-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-600 active:scale-95"
            >
              Cari Akun <ArrowRight size={14} />
            </button>
          </div>
        </form>
      )}

      {step === 2 && foundUser && (
        <form onSubmit={handleResetSubmit} className="space-y-4 py-2">
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Akun Ditemukan Banner */}
          <div className="rounded-2xl border border-brand-200 bg-brand-50/70 p-3 text-xs dark:border-brand-900/50 dark:bg-brand-950/30">
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
              Akun Terverifikasi
            </p>
            <p className="mt-0.5 font-bold text-slate-800 dark:text-white">{foundUser.name}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {foundUser.email} &bull; Peran: <strong>{foundUser.roleName || 'Pengguna'}</strong>
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Kata Sandi Baru (Min. 6 Karakter)
            </label>
            <div className="relative">
              <Lock size={16} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Masukkan kata sandi baru"
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Konfirmasi Kata Sandi Baru
            </label>
            <div className="relative">
              <KeyRound size={16} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ketik ulang kata sandi baru"
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-1/2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="flex w-1/2 items-center justify-center gap-1.5 rounded-xl bg-brand-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-600 active:scale-95"
            >
              Simpan Sandi <ArrowRight size={14} />
            </button>
          </div>
        </form>
      )}

      {step === 3 && foundUser && (
        <div className="py-4 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
            <CheckCircle2 size={32} />
          </div>
          <h4 className="mt-4 text-base font-bold text-slate-800 dark:text-white">
            Kata Sandi Berhasil Diperbarui!
          </h4>
          <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Kata sandi untuk akun <b className="text-slate-800 dark:text-slate-200">{foundUser.email}</b> telah berhasil diubah. Sekarang Anda dapat masuk menggunakan kata sandi baru tersebut.
          </p>
          <button
            type="button"
            onClick={handleProceedToLogin}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-600 active:scale-95"
          >
            Masuk ke Portal Sekarang <ArrowRight size={14} />
          </button>
        </div>
      )}
    </Modal>
  )
}
