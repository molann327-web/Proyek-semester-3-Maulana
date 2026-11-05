import React, { useState } from 'react'
import {
  Users,
  Shield,
  UserPlus,
  Search,
  Filter,
  CheckCircle2,
  Lock,
  MoreHorizontal,
  KeyRound,
  ShieldCheck,
  Edit,
  Trash2
} from 'lucide-react'
import { mockUsers, mockRoles } from '../../data/mockUsers'
import { DataTable } from '../../components/common/DataTable'
import { FilterBar } from '../../components/common/FilterBar'
import { Modal } from '../../components/common/Modal'
import { StatusBadge } from '../../components/common/StatusBadge'

export function UserManagementPage({ onNotify }) {
  const [userList, setUserList] = useState(mockUsers)
  const [search, setSearch] = useState('')
  const [selectedRole, setSelectedRole] = useState('Semua role')
  const [activeTab, setActiveTab] = useState('Daftar Pengguna') // 'Daftar Pengguna' | 'Hak Akses & Role'
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    roleId: 'verifier',
    status: 'Aktif'
  })

  const filteredUsers = userList.filter((u) => {
    const matchSearch =
      (u.name + u.email + u.roleName).toLowerCase().includes(search.toLowerCase())
    const matchRole =
      selectedRole === 'Semua role' || u.roleName.toLowerCase().includes(selectedRole.toLowerCase())
    return matchSearch && matchRole
  })

  const handleAddUser = (e) => {
    e.preventDefault()
    if (!newUser.name || !newUser.email) return

    const roleObj = mockRoles.find((r) => r.id === newUser.roleId)
    const created = {
      id: `USR-00${userList.length + 1}`,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone || '0812-0000-0000',
      roleId: newUser.roleId,
      roleName: roleObj ? roleObj.name : 'Pengguna',
      status: newUser.status,
      avatarInitials: newUser.name.substring(0, 2).toUpperCase(),
      lastLogin: 'Belum pernah login',
      createdAt: '23 Okt 2026'
    }

    setUserList([created, ...userList])
    setIsAddUserOpen(false)
    setNewUser({ name: '', email: '', phone: '', roleId: 'verifier', status: 'Aktif' })
    onNotify(`Pengguna baru ${created.name} berhasil ditambahkan (simulasi lokal)`)
  }

  const columns = [
    {
      header: 'Nama & Email Pengguna',
      key: 'name',
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-100 text-xs font-bold text-brand-800 dark:bg-brand-900/60 dark:text-brand-200">
            {u.avatarInitials}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-slate-800 dark:text-white">{u.name}</p>
            <p className="text-[11px] text-slate-400">{u.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Peran & Wewenang',
      key: 'roleName',
      render: (u) => (
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:bg-white/5 dark:text-slate-300">
          <Shield size={12} className="text-brand-600 dark:text-brand-400" />
          {u.roleName}
        </span>
      )
    },
    {
      header: 'No. Kontak',
      key: 'phone',
      render: (u) => <span className="font-mono text-[11px] text-slate-500">{u.phone}</span>
    },
    {
      header: 'Status Akun',
      key: 'status',
      render: (u) => <StatusBadge status={u.status} />
    },
    {
      header: 'Login Terakhir',
      key: 'lastLogin',
      render: (u) => <span className="text-[11px] text-slate-400">{u.lastLogin}</span>
    },
    {
      header: 'Aksi',
      key: 'actions',
      align: 'right',
      render: (u) => (
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            title="Reset Password"
            onClick={() => onNotify(`Tautan reset sandi untuk ${u.name} dikirimkan (demo)`)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <KeyRound size={15} />
          </button>
          <button
            type="button"
            title="Edit Akun"
            onClick={() => onNotify(`Form edit akun ${u.name} dibuka (demo)`)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <Edit size={15} />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
              <Users size={14} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[.15em] text-brand-700 dark:text-brand-300">
              Modul Autentikasi & Profil
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[30px]">
            Manajemen Akun & Hak Akses
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Kelola data staf panitia, admin, bendahara, penguji, dan hak akses pengguna sistem PPDB.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddUserOpen(true)}
          className="flex h-10 items-center gap-2 rounded-xl bg-brand-500 px-4 text-xs font-bold text-white shadow-md shadow-brand-500/20 transition hover:bg-brand-600"
        >
          <UserPlus size={15} /> Tambah Akun Pengguna
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-3 dark:border-white/10">
        {['Daftar Pengguna', 'Matriks Hak Akses & Peran'].map((tab) => (
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

      {activeTab === 'Daftar Pengguna' ? (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-[#192118]">
          <div className="mb-5">
            <FilterBar
              search={search}
              onSearchChange={setSearch}
              searchPlaceholder="Cari nama, email, atau peran..."
              status={selectedRole}
              onStatusChange={setSelectedRole}
              statusOptions={[
                'Semua role',
                'Super Admin',
                'Verifikasi',
                'Bendahara',
                'Penguji',
                'Santri'
              ]}
              onReset={() => {
                setSearch('')
                setSelectedRole('Semua role')
              }}
            />
          </div>

          <DataTable
            columns={columns}
            data={filteredUsers}
            keyField="id"
            pageSize={6}
            emptyTitle="Tidak Ada Pengguna"
            emptyDescription="Tidak ada data akun pengguna yang cocok dengan kriteria filter."
          />
        </div>
      ) : (
        /* Role Permissions Matrix */
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {mockRoles.map((role) => (
            <div
              key={role.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-[#192118]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`rounded-lg px-2.5 py-1 text-[10px] font-bold ${role.badgeColor}`}>
                    {role.id.toUpperCase()}
                  </span>
                  <ShieldCheck size={18} className="text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-slate-800 dark:text-white">
                  {role.name}
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {role.description}
                </p>

                <div className="mt-4 border-t border-slate-100 pt-3 dark:border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Wewenang Modul:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {role.permissions.map((p) => (
                      <span
                        key={p}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-white/5 dark:text-slate-300"
                      >
                        ✓ {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNotify(`Ubah hak akses ${role.name} (simulasi)`)}
                className="mt-5 w-full rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
              >
                Konfigurasi Akses
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add User Modal */}
      <Modal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        title="Tambah Akun Pengguna Baru"
        subtitle="Manajemen Pengguna"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAddUser} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nama Lengkap & Gelar <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Contoh: Ustadz Ahmad, S.Pd."
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Alamat Email Resmi <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="nama@darulharumain.sch.id"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nomor WhatsApp
            </label>
            <input
              type="text"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              placeholder="0812-xxxx-xxxx"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Peran (Role) Akses
            </label>
            <select
              value={newUser.roleId}
              onChange={(e) => setNewUser({ ...newUser, roleId: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#1f281e] dark:text-white"
            >
              {mockRoles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 pt-3">
            <button
              type="button"
              onClick={() => setIsAddUserOpen(false)}
              className="w-1/2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            >
              Batal
            </button>
            <button
              type="submit"
              className="w-1/2 rounded-xl bg-brand-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-600"
            >
              Simpan Akun
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
