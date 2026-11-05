import React, { useState } from 'react'
import { Modal } from '../../components/common/Modal'
import { Lock, AlertCircle, CheckCircle2 } from 'lucide-react'

export function ChangePasswordModal({ isOpen, onClose, onNotify }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Mohon lengkapi semua kolom kata sandi')
      return
    }
    if (newPassword.length < 6) {
      setError('Kata sandi baru minimal 6 karakter')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Konfirmasi kata sandi baru tidak cocok')
      return
    }

    setError('')
    onNotify('Kata sandi berhasil diperbarui (simulasi lokal)')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ubah Kata Sandi"
      subtitle="Keamanan Akun"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Kata Sandi Saat Ini
          </label>
          <div className="relative">
            <Lock size={15} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Kata Sandi Baru
          </label>
          <div className="relative">
            <Lock size={15} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Konfirmasi Kata Sandi Baru
          </label>
          <div className="relative">
            <Lock size={15} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi kata sandi baru"
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
          >
            Batal
          </button>
          <button
            type="submit"
            className="w-1/2 rounded-xl bg-brand-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-600"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </Modal>
  )
}
