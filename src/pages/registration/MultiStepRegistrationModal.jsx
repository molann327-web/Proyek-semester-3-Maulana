import React, { useState } from 'react'
import { Modal } from '../../components/common/Modal'
import {
  User,
  Users,
  GraduationCap,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileCheck2,
  Sparkles,
  AlertCircle
} from 'lucide-react'
import { FileUploadField } from '../../components/common/FormFields'

export function MultiStepRegistrationModal({
  isOpen,
  onClose,
  onSubmitSuccess,
  onNotify
}) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Data Diri
    name: '',
    gender: 'Laki-laki',
    nik: '',
    nisn: '',
    birthPlace: '',
    birthDate: '',
    bloodType: 'A',
    address: '',
    phone: '',

    // Step 2: Data Orang Tua
    fatherName: '',
    fatherJob: '',
    motherName: '',
    motherJob: '',
    parentPhone: '',
    parentIncome: 'Rp 3.000.000 - Rp 5.000.000',

    // Step 3: Pendidikan & Program
    previousSchool: '',
    schoolAddress: '',
    program: 'Tsanawiyah (MTs)',
    track: 'Reguler',
    averageReportScore: '88.5',

    // Step 4: Dokumen
    docKk: { uploaded: true, name: 'scan_kk_asli.pdf', size: '1.2 MB' },
    docAkta: { uploaded: true, name: 'akta_kelahiran_resmi.pdf', size: '890 KB' },
    docIjazah: { uploaded: false, name: null, size: null },
    docFoto: { uploaded: true, name: 'pas_foto_formal.jpg', size: '540 KB' },
    docSehat: { uploaded: false, name: null, size: null },

    // Step 5: Pernyataan
    confirmed: false
  })

  const [stepError, setStepError] = useState('')

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMockUpload = (docKey, defaultName) => {
    setFormData((prev) => ({
      ...prev,
      [docKey]: {
        uploaded: true,
        name: defaultName,
        size: '1.1 MB'
      }
    }))
    onNotify(`Dokumen ${defaultName} berhasil diunggah (simulasi)`)
  }

  const validateStep = (step) => {
    setStepError('')
    if (step === 1) {
      if (!formData.name || !formData.nik || !formData.birthPlace) {
        setStepError('Mohon lengkapi Nama Calon Santri, NIK, dan Tempat Lahir.')
        return false
      }
    } else if (step === 2) {
      if (!formData.fatherName || !formData.parentPhone) {
        setStepError('Mohon isi Nama Ayah/Wali dan Nomor WhatsApp.')
        return false
      }
    } else if (step === 3) {
      if (!formData.previousSchool) {
        setStepError('Mohon masukkan nama sekolah asal calon santri.')
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((s) => Math.min(5, s + 1))
    }
  }

  const handlePrev = () => {
    setStepError('')
    setCurrentStep((s) => Math.max(1, s - 1))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.confirmed) {
      setStepError('Silakan centang pernyataan kebenaran data terlebih dahulu.')
      return
    }

    const newId = `DH-2026-${Math.floor(10000 + Math.random() * 90000)}`
    const initials = formData.name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()

    const newApplicant = {
      id: newId,
      name: formData.name,
      gender: formData.gender,
      nisn: formData.nisn || '0098765432',
      nik: formData.nik,
      birthPlace: formData.birthPlace,
      birthDate: formData.birthDate || '12 Mei 2012',
      school: formData.previousSchool,
      program: formData.program,
      track: formData.track,
      date: 'Hari ini',
      status: 'Menunggu berkas',
      pay: 'Belum bayar',
      initials: initials || 'CS',
      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
      phone: formData.phone || formData.parentPhone,
      parentName: formData.fatherName,
      parentPhone: formData.parentPhone,
      address: formData.address || 'Bogor, Jawa Barat',
      completeness: 80,
      documents: [
        { name: 'Kartu Keluarga (KK)', status: formData.docKk.uploaded ? 'Valid' : 'Belum unggah', file: formData.docKk.name, size: formData.docKk.size || '-' },
        { name: 'Akta Kelahiran', status: formData.docAkta.uploaded ? 'Valid' : 'Belum unggah', file: formData.docAkta.name, size: formData.docAkta.size || '-' },
        { name: 'Ijazah / SKL Sementara', status: formData.docIjazah.uploaded ? 'Valid' : 'Belum unggah', file: formData.docIjazah.name, size: formData.docIjazah.size || '-' },
        { name: 'Pas Foto 3x4 (Latar Biru)', status: formData.docFoto.uploaded ? 'Valid' : 'Belum unggah', file: formData.docFoto.name, size: formData.docFoto.size || '-' },
        { name: 'Surat Keterangan Sehat', status: formData.docSehat.uploaded ? 'Valid' : 'Belum unggah', file: formData.docSehat.name, size: formData.docSehat.size || '-' }
      ]
    }

    onSubmitSuccess(newApplicant)
    onNotify(`Pendaftaran ${newApplicant.name} berhasil diajukan dengan nomor ${newApplicant.id}`)
    onClose()
  }

  const steps = [
    { num: 1, label: 'Data Diri' },
    { num: 2, label: 'Orang Tua' },
    { num: 3, label: 'Pendidikan' },
    { num: 4, label: 'Dokumen' },
    { num: 5, label: 'Konfirmasi' }
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Formulir Pendaftaran Santri Baru"
      subtitle="Penerimaan T.A. 2026/2027"
      maxWidth="max-w-3xl"
    >
      <div>
        {/* Step Indicator */}
        <div className="mb-6 grid grid-cols-5 gap-2 border-b border-slate-100 pb-5 dark:border-white/10">
          {steps.map((st) => {
            const isDone = currentStep > st.num
            const isCurrent = currentStep === st.num
            return (
              <div key={st.num} className="flex flex-col items-center text-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                      : 'bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500'
                  }`}
                >
                  {isDone ? '✓' : st.num}
                </div>
                <span
                  className={`mt-1.5 hidden text-[11px] font-semibold sm:block ${
                    isCurrent
                      ? 'text-brand-600 dark:text-brand-400'
                      : isDone
                      ? 'text-slate-700 dark:text-slate-300'
                      : 'text-slate-400'
                  }`}
                >
                  {st.label}
                </span>
              </div>
            )
          })}
        </div>

        {stepError && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
            <AlertCircle size={15} />
            <span>{stepError}</span>
          </div>
        )}

        {/* STEP 1: DATA DIRI */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nama Lengkap Calon Santri <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Sesuai akta kelahiran / kartu keluarga"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nomor Induk Kependudukan (NIK) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={16}
                  value={formData.nik}
                  onChange={(e) => handleInputChange('nik', e.target.value)}
                  placeholder="16 digit NIK"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nomor Induk Siswa Nasional (NISN)
                </label>
                <input
                  type="text"
                  value={formData.nisn}
                  onChange={(e) => handleInputChange('nisn', e.target.value)}
                  placeholder="10 digit NISN"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Jenis Kelamin
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#1f281e] dark:text-white"
                >
                  <option value="Laki-laki">Laki-laki (Santriwan)</option>
                  <option value="Perempuan">Perempuan (Santriwati)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Tempat Lahir <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.birthPlace}
                  onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                  placeholder="Kota / Kabupaten"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Golongan Darah
                </label>
                <select
                  value={formData.bloodType}
                  onChange={(e) => handleInputChange('bloodType', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#1f281e] dark:text-white"
                >
                  <option value="A">Golongan Darah A</option>
                  <option value="B">Golongan Darah B</option>
                  <option value="AB">Golongan Darah AB</option>
                  <option value="O">Golongan Darah O</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Alamat Lengkap Domisili
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Nama jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: DATA ORANG TUA / WALI */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nama Lengkap Ayah / Wali <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  placeholder="Nama Ayah / Wali Santri"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Pekerjaan Ayah
                </label>
                <input
                  type="text"
                  value={formData.fatherJob}
                  onChange={(e) => handleInputChange('fatherJob', e.target.value)}
                  placeholder="PNS / Swasta / Wiraswasta"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nama Lengkap Ibu
                </label>
                <input
                  type="text"
                  value={formData.motherName}
                  onChange={(e) => handleInputChange('motherName', e.target.value)}
                  placeholder="Nama Ibu Kandung"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Pekerjaan Ibu
                </label>
                <input
                  type="text"
                  value={formData.motherJob}
                  onChange={(e) => handleInputChange('motherJob', e.target.value)}
                  placeholder="Ibu Rumah Tangga / Guru / Pedagang"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nomor WhatsApp Orang Tua <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.parentPhone}
                  onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                  placeholder="0812-xxxx-xxxx"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Penghasilan Rata-rata Orang Tua
                </label>
                <select
                  value={formData.parentIncome}
                  onChange={(e) => handleInputChange('parentIncome', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#1f281e] dark:text-white"
                >
                  <option value="< Rp 2.000.000">&lt; Rp 2.000.000</option>
                  <option value="Rp 2.000.000 - Rp 5.000.000">Rp 2.000.000 - Rp 5.000.000</option>
                  <option value="Rp 5.000.000 - Rp 10.000.000">Rp 5.000.000 - Rp 10.000.000</option>
                  <option value="> Rp 10.000.000">&gt; Rp 10.000.000</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PENDIDIKAN ASAL & PROGRAM */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nama Asal Sekolah / Madrasah <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.previousSchool}
                  onChange={(e) => handleInputChange('previousSchool', e.target.value)}
                  placeholder="Contoh: MI Al-Ikhlas / SDIT Al-Falah"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Pilihan Program Pendidikan
                </label>
                <select
                  value={formData.program}
                  onChange={(e) => handleInputChange('program', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#1f281e] dark:text-white"
                >
                  <option value="Tsanawiyah (MTs)">Madrasah Tsanawiyah (MTs)</option>
                  <option value="Aliyah (MA)">Madrasah Aliyah (MA) Keagamaan</option>
                  <option value="Takhasus Tahfidz">Takhasus Tahfidz 30 Juz</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Jalur Pendaftaran
                </label>
                <select
                  value={formData.track}
                  onChange={(e) => handleInputChange('track', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#1f281e] dark:text-white"
                >
                  <option value="Reguler">Jalur Reguler</option>
                  <option value="Prestasi Tahfidz">Jalur Prestasi Tahfidz</option>
                  <option value="Beasiswa Dhuafa">Jalur Beasiswa Yatim / Dhuafa</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nilai Rata-rata Raport Terakhir
                </label>
                <input
                  type="text"
                  value={formData.averageReportScore}
                  onChange={(e) => handleInputChange('averageReportScore', e.target.value)}
                  placeholder="Contoh: 85.5"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: UNGGAH DOKUMEN PERSYARATAN */}
        {currentStep === 4 && (
          <div className="space-y-3.5">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Unggah berkas persyaratan wajib dalam format PDF atau JPG/PNG (Maks 2MB).
            </p>

            <FileUploadField
              label="1. Scan Kartu Keluarga (KK) Asli"
              required
              isUploaded={formData.docKk.uploaded}
              fileName={formData.docKk.name}
              fileSize={formData.docKk.size}
              onUploadMock={() => handleMockUpload('docKk', 'scan_kk_asli.pdf')}
            />

            <FileUploadField
              label="2. Scan Akta Kelahiran Calon Santri"
              required
              isUploaded={formData.docAkta.uploaded}
              fileName={formData.docAkta.name}
              fileSize={formData.docAkta.size}
              onUploadMock={() => handleMockUpload('docAkta', 'akta_kelahiran.pdf')}
            />

            <FileUploadField
              label="3. Ijazah / Surat Keterangan Lulus (SKL) / Raport"
              required
              isUploaded={formData.docIjazah.uploaded}
              fileName={formData.docIjazah.name}
              fileSize={formData.docIjazah.size}
              onUploadMock={() => handleMockUpload('docIjazah', 'skl_sekolah_asal.pdf')}
            />

            <FileUploadField
              label="4. Pas Foto Formal 3x4 (Latar Biru/Merah)"
              required
              isUploaded={formData.docFoto.uploaded}
              fileName={formData.docFoto.name}
              fileSize={formData.docFoto.size}
              onUploadMock={() => handleMockUpload('docFoto', 'pas_foto_formal.jpg')}
            />

            <FileUploadField
              label="5. Surat Keterangan Sehat Dokter / Puskesmas"
              required={false}
              isUploaded={formData.docSehat.uploaded}
              fileName={formData.docSehat.name}
              fileSize={formData.docSehat.size}
              onUploadMock={() => handleMockUpload('docSehat', 'surat_keterangan_sehat.pdf')}
            />
          </div>
        )}

        {/* STEP 5: REVIEW & KONFIRMASI */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-[#192118]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/10">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Biodata Calon Santri</h4>
                  <p className="text-xs text-slate-400">Data pendaftaran yang tercatat di sistem PPDB</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                  Data Lengkap 100%
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                <div>
                  <p className="text-slate-400">Nama Lengkap</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{formData.name || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-400">Nomor Registrasi PPDB</p>
                  <p className="font-bold text-brand-700 dark:text-brand-300 font-mono">Auto-generate (DH-2026-XXXXX)</p>
                </div>
                <div>
                  <p className="text-slate-400">NISN</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{formData.nisn || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-400">Asal Madrasah / Sekolah</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{formData.previousSchool || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-400">Program &amp; Jalur</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100">
                    {formData.program} - {formData.track}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Nama Orang Tua / Wali</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{formData.fatherName || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-400">Nomor WhatsApp Wali</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{formData.parentPhone || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-400">Alamat Tempat Tinggal</p>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{formData.address || '-'}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
              <p className="text-xs font-bold text-slate-800 dark:text-white">Kelengkapan Berkas:</p>
              <div className="mt-2 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span>KK & Akta Kelahiran</span>
                  <span className="font-semibold text-emerald-600">✓ Siap Diverifikasi</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pas Foto 3x4</span>
                  <span className="font-semibold text-emerald-600">✓ Siap Diverifikasi</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Nomor Registrasi Otomatis</span>
                  <span className="font-mono text-brand-600 font-bold">Auto-generate oleh sistem</span>
                </div>
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-2.5 pt-2">
              <input
                type="checkbox"
                checked={formData.confirmed}
                onChange={(e) => handleInputChange('confirmed', e.target.checked)}
                className="mt-1 h-4 w-4 rounded accent-brand-500"
              />
              <span className="text-xs leading-5 text-slate-600 dark:text-slate-300">
                Saya menyatakan dengan sungguh-sungguh bahwa data yang saya isikan adalah benar dan bersedia mematuhi segala ketentuan seleksi PPDB Darul Harumain.
              </span>
            </label>
          </div>
        )}

        {/* Step Buttons */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/10">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={handlePrev}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 disabled:opacity-30 dark:border-white/10 dark:text-slate-300"
          >
            <ArrowLeft size={14} /> Kembali
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 rounded-xl bg-brand-500 px-5 py-2 text-xs font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-600"
            >
              Lanjutkan <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-2 text-xs font-bold text-white shadow-lg shadow-brand-500/25 hover:bg-brand-600"
            >
              <CheckCircle2 size={16} /> Ajukan Pendaftaran Sekarang
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}
