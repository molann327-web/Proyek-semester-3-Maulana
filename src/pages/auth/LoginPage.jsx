import React, { useState, useEffect } from 'react'
import { GraduationCap, Lock, Mail, ArrowRight, Sparkles, AlertCircle, Eye, EyeOff, Home, KeyRound, HelpCircle } from 'lucide-react'
import { mockUsers } from '../../data/mockUsers'

export function LoginPage({
  onLoginSuccess,
  onSwitchToRegister,
  onForgotPassword,
  onBackToLanding,
  users = mockUsers,
  prefillEmail = ''
}) {
  const [email, setEmail] = useState(prefillEmail || '')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (prefillEmail) {
      setEmail(prefillEmail)
    }
  }, [prefillEmail])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Mohon lengkapi alamat email dan kata sandi')
      return
    }

    const cleanInput = email.trim().toLowerCase()
    const inputPassword = password.trim()

    // Cari akun yang sesuai di database pengguna
    const userList = users && users.length > 0 ? users : mockUsers
    const matchedUser = userList.find((u) => {
      const uEmail = u.email ? u.email.toLowerCase() : ''
      const uId = u.id ? u.id.toLowerCase() : ''
      const uApplicantId = u.applicantId ? u.applicantId.toLowerCase() : ''
      const uRole = u.roleId ? u.roleId.toLowerCase() : ''

      if (uEmail === cleanInput || uId === cleanInput || uApplicantId === cleanInput) {
        return true
      }

      // Kata kunci cepat login
      if (cleanInput === 'admin' && uRole === 'super_admin') return true
      if (cleanInput === 'verifikator' && uRole === 'verifier') return true
      if (cleanInput === 'bendahara' && uRole === 'treasurer') return true
      if (cleanInput === 'penguji' && uRole === 'examiner') return true
      if ((cleanInput === 'santri' || cleanInput === 'calon santri') && uRole === 'applicant') return true
      if (cleanInput === 'pimpinan' && uRole === 'executive') return true

      return false
    })

    if (!matchedUser) {
      setError('Akun tidak terdaftar. Pastikan email atau nomor pendaftaran sudah benar.')
      return
    }

    // VALIDASI KATA SANDI SESUAI ATURAN ROLE:
    // 1. Admin: password 'admin123'
    if (matchedUser.roleId === 'super_admin' || cleanInput === 'admin') {
      if (inputPassword !== 'admin123') {
        setError('Kata sandi salah! Kata sandi untuk Admin PPDB adalah: admin123')
        return
      }
    }
    // 2. Bendahara: password 'bendahara123'
    else if (matchedUser.roleId === 'treasurer' || cleanInput === 'bendahara') {
      if (inputPassword !== 'bendahara123') {
        setError('Kata sandi salah! Kata sandi untuk Bendahara adalah: bendahara123')
        return
      }
    }
    // 3. Penguji: password 'penguji123'
    else if (matchedUser.roleId === 'examiner' || cleanInput === 'penguji') {
      if (inputPassword !== 'penguji123') {
        setError('Kata sandi salah! Kata sandi untuk Penguji adalah: penguji123')
        return
      }
    }
    // 4. Verifikator: password 'verifikator123'
    else if (matchedUser.roleId === 'verifier' || cleanInput === 'verifikator') {
      if (inputPassword !== 'verifikator123') {
        setError('Kata sandi salah! Kata sandi untuk Verifikator adalah: verifikator123')
        return
      }
    }
    // 5. Pimpinan: password 'pimpinan123'
    else if (matchedUser.roleId === 'executive' || cleanInput === 'pimpinan') {
      if (inputPassword !== 'pimpinan123') {
        setError('Kata sandi salah! Kata sandi untuk Pimpinan Pesantren adalah: pimpinan123')
        return
      }
    }
    // 6. Calon Santri / Wali: wajib menggunakan password yang terdaftar pada email akunnya
    else if (matchedUser.roleId === 'applicant') {
      const registeredPassword = matchedUser.password || 'santri123'
      if (inputPassword !== registeredPassword) {
        setError(`Kata sandi untuk akun calon santri (${matchedUser.email}) salah! Silakan gunakan kata sandi terdaftar dari email ini (default: santri123) atau klik "Lupa Kata Sandi?" di bawah untuk mengatur ulang kata sandi Anda.`)
        return
      }
    }
    // Default fallback
    else {
      const validPass = matchedUser.password || 'pesantren123'
      if (inputPassword !== validPass) {
        setError('Kata sandi yang Anda masukkan salah. Silakan periksa kembali atau gunakan fitur lupa sandi.')
        return
      }
    }

    onLoginSuccess(matchedUser)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F8F4] p-4 text-slate-800 transition-colors dark:bg-[#111710] dark:text-slate-100 sm:p-8">
      <div className="w-full max-w-4xl overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-soft dark:border-white/10 dark:bg-[#192118] grid md:grid-cols-2">
        {/* Left Brand Showcase Banner */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#284B2D] p-8 text-white md:flex lg:p-10">
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                <GraduationCap size={24} />
              </div>
              <div>
                <h2 className="font-bold tracking-tight text-white">Darul Harumain</h2>
                <p className="text-[10px] font-bold uppercase tracking-[.15em] text-lime-300">
                  Portal PPDB Terpadu
                </p>
              </div>
            </div>

            <div className="mt-12">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-lime-200">
                <Sparkles size={13} /> Tahun Ajaran 2027 / 2028
              </span>
              <h1 className="mt-4 text-2xl font-bold leading-tight lg:text-3xl">
                Mencetak Generasi Qur’ani yang Berakhlakul Karimah
              </h1>
              <p className="mt-3 text-xs leading-6 text-white/75">
                Sistem pendaftaran santri baru terpusat dengan transparansi verifikasi berkas, tes pemetaan mandiri, dan penempatan kamar asrama.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-auto pt-8 flex items-center justify-between text-[11px] text-white/60">
            <span>&copy; Pondok Pesantren Darul Harumain.</span>
            {onBackToLanding && (
              <button
                type="button"
                onClick={onBackToLanding}
                className="inline-flex items-center gap-1 text-lime-300 hover:underline font-semibold"
              >
                <Home size={13} /> Halaman Utama
              </button>
            )}
          </div>

          {/* Background decorative circles */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full border-[36px] border-white/5" />
        </div>

        {/* Right Form Card */}
        <div className="flex flex-col justify-between p-7 sm:p-10">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Masuk ke Portal
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Silakan masuk menggunakan akun terdaftar Anda
                </p>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300 md:hidden">
                <GraduationCap size={20} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && (
                <div className="flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p>{error}</p>
                    <button
                      type="button"
                      onClick={onForgotPassword}
                      className="mt-1 font-bold underline hover:text-rose-800 dark:hover:text-rose-200"
                    >
                      Buka Fitur Lupa Sandi &rarr;
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Alamat Email / Nomor Pendaftaran
                </label>
                <div className="relative">
                  <Mail size={16} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com atau DH-2026-XXXXX"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Kata Sandi
                  </label>
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:underline dark:text-brand-400"
                  >
                    <KeyRound size={12} />
                    <span>Lupa kata sandi?</span>
                  </button>
                </div>
                <div className="relative">
                  <Lock size={16} className="pointer-events-none absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    title={showPassword ? 'Sembunyikan sandi' : 'Lihat sandi'}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 text-xs font-bold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600 active:scale-[0.99]"
              >
                Masuk ke Aplikasi <ArrowRight size={15} />
              </button>
            </form>

            {/* Tombol Khusus Lupa Password agar mudah diakses */}
            <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 text-center dark:border-white/5 dark:bg-white/[0.02]">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Mengalami kendala masuk atau lupa kata sandi akun Anda?
              </p>
              <button
                type="button"
                onClick={onForgotPassword}
                className="mt-1.5 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs hover:border-brand-500 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                <KeyRound size={13} className="text-brand-600" />
                <span>Atur Ulang Kata Sandi (Lupa Sandi)</span>
              </button>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5 text-center text-xs dark:border-white/10 space-y-2">
            <div>
              <span className="text-slate-500 dark:text-slate-400">Belum memiliki akun calon santri? </span>
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="font-bold text-brand-600 hover:underline dark:text-brand-400"
              >
                Daftar Santri Baru
              </button>
            </div>
            {onBackToLanding && (
              <div>
                <button
                  type="button"
                  onClick={onBackToLanding}
                  className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                >
                  &larr; Kembali ke Beranda Landing Page
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
