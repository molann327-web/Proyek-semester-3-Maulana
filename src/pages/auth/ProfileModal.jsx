import React, { useState } from 'react'
import { Modal } from '../../components/common/Modal'
import { User, Mail, Phone, Shield, Calendar, Clock, CheckCircle2 } from 'lucide-react'

export function ProfileModal({ isOpen, onClose, user, onUpdateUser, onNotify }) {
  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState(user?.phone || '0812-3456-7890')
  const [email] = useState(user?.email || 'admin@darulharomain.sch.id')

  const handleSave = (e) => {
    e.preventDefault()
    if (onUpdateUser) {
      onUpdateUser({
        ...user,
        name,
        phone,
        avatarInitials: name ? name.substring(0, 2).toUpperCase() : 'AD'
      })
    }
    if (onNotify) {
      onNotify('Profil pengguna berhasil diperbarui (simulasi lokal)')
    }
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Profil Pengguna"
      subtitle="Informasi Akun"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSave} className="space-y-5 py-2">
        {/* User Card Header */}
        <div className="flex items-center gap-4 rounded-2xl bg-brand-50/80 p-4 dark:bg-brand-900/20">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-500 text-xl font-bold text-white shadow-md shadow-brand-500/30">
            {user?.avatarInitials || 'AD'}
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {user?.name || 'Admin PPDB'}
            </h4>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                <Shield size={11} /> {user?.roleName || 'Super administrator'}
              </span>
              <span className="text-[11px] text-slate-400">ID: {user?.id || 'USR-001'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3.5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nama Lengkap
            </label>
            <div className="relative">
              <User size={15} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Alamat Email (Akun)
            </label>
            <div className="relative">
              <Mail size={15} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="email"
                disabled
                value={email}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3.5 py-2.5 text-xs text-slate-500 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-400"
              />
            </div>
            <p className="text-[10px] text-slate-400">Email akun dikelola oleh administrator sistem.</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nomor WhatsApp / Telepon
            </label>
            <div className="relative">
              <Phone size={15} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 text-[11px] dark:border-white/5 dark:bg-white/[0.02]">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Clock size={14} className="text-brand-600" />
            <span>Login: {user?.lastLogin || 'Hari ini, 07:15 WIB'}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Calendar size={14} className="text-brand-600" />
            <span>Terdaftar: {user?.createdAt || '01 Ags 2026'}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
          >
            Tutup
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
