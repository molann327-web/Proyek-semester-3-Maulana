import React, { useState } from 'react'
import {
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
  Phone,
  Mail,
  Lock,
  Building,
  MapPin,
  FileText,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react'

export function RegisterPage({ onRegisterSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    fullName: '',
    nisn: '',
    school: '',
    program: 'Tsanawiyah (MTs)',
    track: 'Reguler',
    parentName: '',
    whatsapp: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Validasi data wajib
    if (
      !formData.fullName.trim() ||
      !formData.nisn.trim() ||
      !formData.school.trim() ||
      !formData.parentName.trim() ||
      !formData.whatsapp.trim() ||
      !formData.address.trim() ||
      !formData.email.trim() ||
      !formData.password
    ) {
      setError('Mohon lengkapi semua kolom formulir bertanda bintang (*)')
      return
    }

    if (formData.password.length < 6) {
      setError('Kata sandi minimal terdiri dari 6 karakter')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok. Mohon periksa kembali.')
      return
    }

    if (!formData.agreeTerms) {
      setError('Anda harus menyetujui pernyataan kebenaran data')
      return
    }

    // Generate Nomor Registrasi PPDB Otomatis
    const mockId = `DH-2026-${Math.floor(10000 + Math.random() * 90000)}`
    const initials = formData.fullName
      .trim()
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'CS'

    const newApplicant = {
      id: mockId,
      name: formData.fullName.trim(),
      gender: 'Laki-laki',
      nisn: formData.nisn.trim(),
      school: formData.school.trim(),
      program: formData.program,
      track: formData.track,
      parentName: formData.parentName.trim(),
      parentPhone: formData.whatsapp.trim(),
      phone: formData.whatsapp.trim(),
      address: formData.address.trim(),
      email: formData.email.trim(),
      password: formData.password,
      date: 'Hari ini',
      status: 'Terdaftar',
      pay: 'Belum bayar',
      initials: initials,
      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
      completeness: 100,
      documents: [
        { name: 'Kartu Keluarga (KK)', status: 'Valid', file: 'kk_calon_santri.pdf', size: '1.2 MB' },
        { name: 'Akta Kelahiran', status: 'Valid', file: 'akta_calon_santri.pdf', size: '850 KB' },
        { name: 'Ijazah / SKL Sementara', status: 'Valid', file: 'skl_sekolah_asal.pdf', size: '1.4 MB' },
        { name: 'Pas Foto 3x4 (Latar Biru)', status: 'Valid', file: 'pas_foto_formal.jpg', size: '640 KB' },
        { name: 'Surat Keterangan Sehat', status: 'Valid', file: 'surat_sehat_puskesmas.pdf', size: '420 KB' }
      ],
      selectionScores: {
        quran: 88,
        academic: 85,
        interview: 86,
        finalScore: 86.5,
        result: 'Lulus'
      },
      dormitory: {
        building: 'Asrama Putra - Gedung Al-Farabi',
        room: 'Kamar A-204',
        status: 'Ditempatkan'
      }
    }

    onRegisterSuccess(newApplicant)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F8F4] p-4 text-slate-800 transition-colors dark:bg-[#111710] dark:text-slate-100 sm:p-8">
      <div className="w-full max-w-4xl rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#192118] sm:p-10">
        {/* Header Form */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-5 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/25">
              <GraduationCap size={26} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                Formulir Pendaftaran Calon Santri Baru
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Penerimaan Santri Baru (PPDB) Pondok Pesantren Darul Harumain T.A. 2026/2027
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
          >
            <ArrowLeft size={14} /> Sudah Ada Akun? Masuk
          </button>
        </div>

        {error && (
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* BAGIAN 1: BIODATA CALON SANTRI */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2 dark:border-white/10">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-50 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                1
              </span>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                Data Diri Calon Santri
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nama Lengkap Calon Santri <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User size={15} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Contoh: Ahmad Fauzan Pratama"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nomor Induk Siswa Nasional (NISN) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FileText size={15} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    name="nisn"
                    maxLength={10}
                    value={formData.nisn}
                    onChange={handleChange}
                    placeholder="Contoh: 0087654321 (10 digit)"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Asal Madrasah / Sekolah <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building size={15} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    placeholder="Contoh: MI Al-Hidayah Kota Bogor"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Pilihan Program <span className="text-rose-500">*</span>
                </label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#1f281e] dark:text-white"
                >
                  <option value="Tsanawiyah (MTs)">Tsanawiyah (MTs) - Setara SMP</option>
                  <option value="Aliyah (MA)">Aliyah (MA) - Setara SMA</option>
                  <option value="Takhasus Tahfidz">Takhasus Tahfidz 30 Juz</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Pilihan Jalur <span className="text-rose-500">*</span>
                </label>
                <select
                  name="track"
                  value={formData.track}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#1f281e] dark:text-white"
                >
                  <option value="Reguler">Jalur Reguler (Tes Umum)</option>
                  <option value="Prestasi">Jalur Prestasi (Rapor/Juara)</option>
                  <option value="Tahfidz">Jalur Tahfidz Al-Qur'an</option>
                </select>
              </div>
            </div>
          </div>

          {/* BAGIAN 2: DATA ORANG TUA / WALI & ALAMAT */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2 dark:border-white/10">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-50 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                2
              </span>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                Data Orang Tua / Wali &amp; Alamat Domisili
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nama Orang Tua / Wali <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User size={15} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="Contoh: H. Muhammad Yusuf"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nomor WhatsApp Wali <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone size={15} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="Contoh: 0812-9876-5432"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Alamat Tempat Tinggal <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin size={15} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
                <textarea
                  rows={2}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Contoh: Jl. Pesantren No. 14, Bogor Barat, Jawa Barat"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* BAGIAN 3: AKUN & KATA SANDI LOGIN */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2 dark:border-white/10">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-50 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                3
              </span>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                Akun Akses Masuk Portal Santri
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Alamat Email Santri / Wali <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail size={15} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Kata Sandi Baru <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock size={15} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimal 6 karakter"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Konfirmasi Kata Sandi <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock size={15} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ulangi kata sandi"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>
          </div>


          {/* Checklist & Submit */}
          <label className="flex cursor-pointer items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded accent-brand-500"
            />
            <span className="text-[11px] leading-5 text-slate-600 dark:text-slate-300">
              Saya menyatakan bahwa data biodata calon santri di atas adalah benar dan dapat dipertanggungjawabkan sesuai prosedur seleksi PPDB Darul Harumain.
            </span>
          </label>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3.5 text-xs font-bold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600 active:scale-[0.99]"
          >
            Daftarkan Akun &amp; Buat Nomor Registrasi <ArrowRight size={15} />
          </button>
        </form>
      </div>
    </div>
  )
}
