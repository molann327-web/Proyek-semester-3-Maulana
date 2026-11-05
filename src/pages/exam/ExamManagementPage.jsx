import React, { useState } from 'react'
import {
  BookOpenCheck,
  Calendar,
  Clock,
  Play,
  CheckCircle2,
  AlertCircle,
  Award,
  Users,
  Download,
  FileQuestion,
  Plus,
  Edit3,
  Trash2,
  Search,
  Filter,
  Check,
  ChevronRight,
  FileText
} from 'lucide-react'
import { mockExamSchedules, mockQuestions } from '../../data/mockExams'
import { StatCard } from '../../components/common/StatCard'
import { StatusBadge } from '../../components/common/StatusBadge'
import { OnlineExamSimulationModal } from './OnlineExamSimulationModal'
import { QuestionFormModal } from './QuestionFormModal'
import { ScoreInputModal } from './ScoreInputModal'

export function ExamManagementPage({ applicants, onUpdateApplicant, onNotify }) {
  const [questions, setQuestions] = useState(mockQuestions)
  const [activeTab, setActiveTab] = useState('Bank Soal CBT') // 'Bank Soal CBT' | 'Hasil & Penilaian Santri' | 'Jadwal Sesi'
  
  // Modals state
  const [isExamSimModalOpen, setIsExamSimModalOpen] = useState(false)
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)
  const [questionToEdit, setQuestionToEdit] = useState(null)
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false)
  const [selectedApplicantForScore, setSelectedApplicantForScore] = useState(null)

  // Filters for Students
  const [studentSearch, setStudentSearch] = useState('')
  const [cbtFilter, setCbtFilter] = useState('Semua')
  const [resultFilter, setResultFilter] = useState('Semua')

  // Filters for Questions
  const [questionSearch, setQuestionSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('Semua')

  // Handlers for Questions
  const handleOpenCreateQuestion = () => {
    setQuestionToEdit(null)
    setIsQuestionModalOpen(true)
  }

  const handleOpenEditQuestion = (q) => {
    setQuestionToEdit(q)
    setIsQuestionModalOpen(true)
  }

  const handleSaveQuestion = (newOrUpdated) => {
    const exists = questions.some((q) => q.id === newOrUpdated.id)
    if (exists) {
      setQuestions(questions.map((q) => (q.id === newOrUpdated.id ? newOrUpdated : q)))
      onNotify('Butir soal CBT berhasil diperbarui!')
    } else {
      setQuestions([newOrUpdated, ...questions])
      onNotify('Soal baru berhasil ditambahkan ke Bank Soal CBT!')
    }
  }

  const handleDeleteQuestion = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus butir soal ini dari Bank Soal?')) {
      setQuestions(questions.filter((q) => q.id !== id))
      onNotify('Butir soal berhasil dihapus dari Bank Soal CBT.')
    }
  }

  // Handlers for Scoring Students
  const handleOpenScoreModal = (applicant) => {
    setSelectedApplicantForScore(applicant)
    setIsScoreModalOpen(true)
  }

  const handleSaveScore = (updatedApplicant) => {
    if (onUpdateApplicant) {
      onUpdateApplicant(updatedApplicant)
    }
    onNotify(`Nilai seleksi untuk ${updatedApplicant.name} berhasil disimpan dan diperbarui!`)
  }

  // Filtered Students
  const filteredApplicants = (applicants || []).filter((a) => {
    const sc = a.selectionScores || {}
    const hasCBT = sc.academic !== undefined && sc.academic !== null && sc.academic !== ''
    const matchSearch = (a.name + a.id + a.school).toLowerCase().includes(studentSearch.toLowerCase())
    
    let matchCBT = true
    if (cbtFilter === 'Sudah Mengerjakan') matchCBT = hasCBT
    if (cbtFilter === 'Belum Mengerjakan') matchCBT = !hasCBT

    let matchResult = true
    if (resultFilter !== 'Semua') matchResult = sc.result === resultFilter

    return matchSearch && matchCBT && matchResult
  })

  // Filtered Questions
  const filteredQuestions = questions.filter((q) => {
    const matchSearch = (q.question + q.category).toLowerCase().includes(questionSearch.toLowerCase())
    const matchCategory = categoryFilter === 'Semua' || q.category === categoryFilter
    return matchSearch && matchCategory
  })

  // Stats
  const completedCbtCount = (applicants || []).filter((a) => a.selectionScores?.academic !== undefined).length
  const totalApplicantsCount = (applicants || []).length || 1
  const avgCbtScore = Math.round(
    (applicants || [])
      .filter((a) => a.selectionScores?.academic)
      .reduce((sum, a) => sum + Number(a.selectionScores.academic), 0) /
      Math.max(1, completedCbtCount)
  )

  const categories = [
    'Semua',
    'Pengetahuan Al-Qur\'an',
    'Tajwid & Makharijul Huruf',
    'Fiqih Ibadah',
    'Bahasa Arab Dasar',
    'Akhlaq & Adab Santri',
    'Potensi Akademik Umum'
  ]

  return (
    <div className="space-y-6">
      {/* Header Penguji */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
              <BookOpenCheck size={14} />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[.15em] text-brand-700 dark:text-brand-300">
              Portal Tim Penguji &amp; Seleksi
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-[30px]">
            Manajemen Soal CBT &amp; Penilaian Santri
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Kelola butir soal ujian online, pantau status pengerjaan tes santri, dan input penilaian kelulusan Al-Qur'an serta CBT.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleOpenCreateQuestion}
            className="flex h-10 items-center gap-2 rounded-xl bg-brand-500 px-4 text-xs font-bold text-white shadow-md shadow-brand-500/20 transition hover:bg-brand-600 active:scale-95"
          >
            <Plus size={15} /> Buat Soal Baru
          </button>
          <button
            type="button"
            onClick={() => setIsExamSimModalOpen(true)}
            className="flex h-10 items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 text-xs font-bold text-purple-700 shadow-xs transition hover:bg-purple-100 dark:border-purple-900/50 dark:bg-purple-950/40 dark:text-purple-300"
          >
            <Play size={14} /> Coba Simulasi CBT
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Total Soal di Bank Soal"
          value={`${questions.length} Butir`}
          delta="Aktif"
          note="Siap Digunakan"
          line="Ujian CBT PPDB"
          icon={FileQuestion}
          tone="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300"
        />
        <StatCard
          label="Santri Selesai CBT"
          value={`${completedCbtCount} Santri`}
          delta={`${Math.round((completedCbtCount / totalApplicantsCount) * 100)}%`}
          note="Sudah Mengikuti Tes"
          line="Tersimpan di Sistem"
          icon={CheckCircle2}
          tone="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"
        />
        <StatCard
          label="Rata-rata Nilai CBT"
          value={avgCbtScore || '84.6'}
          delta="Standar Mutu"
          note="Ambang Batas: 75.0"
          line="Kategori Baik"
          icon={Award}
          tone="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300"
        />
        <StatCard
          label="Total Peserta Seleksi"
          value={`${totalApplicantsCount} Orang`}
          delta="Gelombang 1"
          note="Terdaftar Resmi"
          line="Siap Dinilai"
          icon={Users}
          tone="bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-300"
        />
      </div>

      {/* Tabs Nav */}
      <div className="flex gap-2 border-b border-slate-200 pb-3 dark:border-white/10">
        {[
          { id: 'Bank Soal CBT', label: `Bank Soal CBT (${questions.length} Soal)` },
          { id: 'Hasil & Penilaian Santri', label: `Hasil & Penilaian Santri (${filteredApplicants.length})` },
          { id: 'Jadwal Sesi', label: 'Jadwal Sesi Ujian' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              activeTab === tab.id
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: BANK SOAL CBT (Bisa Bikin Soal & Edit Soal) */}
      {activeTab === 'Bank Soal CBT' && (
        <div className="space-y-4">
          {/* Filter Bar for Questions */}
          <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-white/10 dark:bg-[#192118] sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search size={15} className="pointer-events-none absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={questionSearch}
                onChange={(e) => setQuestionSearch(e.target.value)}
                placeholder="Cari materi atau kata kunci soal..."
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Kategori:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#151c14] dark:text-slate-200"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleOpenCreateQuestion}
                className="flex items-center gap-1.5 rounded-xl bg-brand-500 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-brand-600 active:scale-95"
              >
                <Plus size={14} /> Tambah Soal
              </button>
            </div>
          </div>

          {/* List of Questions */}
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center dark:border-white/10">
                <FileQuestion size={36} className="mx-auto text-slate-300" />
                <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Tidak ada butir soal yang sesuai dengan pencarian
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Coba ubah kata kunci atau klik "Tambah Soal" untuk membuat soal baru.
                </p>
              </div>
            ) : (
              filteredQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-brand-300 dark:border-white/10 dark:bg-[#192118]"
                >
                  <div className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-3 sm:flex-row sm:items-center dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                        Soal #{idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        &bull; {q.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        Kunci Jawaban: Pilihan {String.fromCharCode(65 + q.correctAnswer)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenEditQuestion(q)}
                        className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-brand-700 hover:bg-brand-50 dark:border-white/10 dark:bg-white/5 dark:text-brand-300"
                        title="Edit soal ini"
                      >
                        <Edit3 size={13} /> Edit Soal
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="flex items-center gap-1 rounded-xl border border-rose-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:border-rose-900/50 dark:bg-white/5 dark:text-rose-400"
                        title="Hapus soal ini"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 text-sm font-bold leading-6 text-slate-900 dark:text-white">
                    {q.question}
                  </p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === q.correctAnswer
                      return (
                        <div
                          key={oIdx}
                          className={`flex items-start gap-2.5 rounded-xl p-3 text-xs transition ${
                            isCorrect
                              ? 'border border-emerald-300 bg-emerald-50/80 font-bold text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200'
                              : 'border border-slate-100 bg-slate-50/50 text-slate-700 dark:border-white/5 dark:bg-white/[0.02] dark:text-slate-300'
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${
                              isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-300'
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="flex-1">{opt}</span>
                          {isCorrect && <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />}
                        </div>
                      )
                    })}
                  </div>

                  {q.explanation && (
                    <div className="mt-3 rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-500 dark:bg-white/5 dark:text-slate-400">
                      <strong>Pembahasan / Rujukan:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: HASIL & PENILAIAN SANTRI (Melihat Murid yang Mengerjakan & Input Nilai) */}
      {activeTab === 'Hasil & Penilaian Santri' && (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center dark:border-white/10">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Daftar Hasil Tes &amp; Penilaian Ujian Santri
              </h3>
              <p className="text-xs text-slate-400">
                Pantau santri yang telah mengerjakan tes online dan masukkan nilai ujian seleksi lisan &amp; wawancara.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNotify('Rekapitulasi seluruh nilai ujian diekspor ke Excel (simulasi)')}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300"
            >
              <Download size={14} /> Unduh Rekap Nilai
            </button>
          </div>

          {/* Filter Controls */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="relative">
              <Search size={15} className="pointer-events-none absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="Cari nama atau nomor pendaftaran..."
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 shrink-0">Tes CBT:</span>
              <select
                value={cbtFilter}
                onChange={(e) => setCbtFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#151c14] dark:text-slate-200"
              >
                <option value="Semua">Semua Status CBT</option>
                <option value="Sudah Mengerjakan">Sudah Mengerjakan</option>
                <option value="Belum Mengerjakan">Belum Mengerjakan</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 shrink-0">Kelulusan:</span>
              <select
                value={resultFilter}
                onChange={(e) => setResultFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#151c14] dark:text-slate-200"
              >
                <option value="Semua">Semua Hasil</option>
                <option value="Lulus">Lulus</option>
                <option value="Cadangan">Cadangan</option>
                <option value="Tidak Lulus">Tidak Lulus</option>
              </select>
            </div>
          </div>

          {/* Students Table */}
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-xs">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400 dark:border-white/5 dark:bg-white/[0.02]">
                <tr>
                  <th className="px-4 py-3">Calon Santri</th>
                  <th className="px-4 py-3">Status Pengerjaan CBT</th>
                  <th className="px-4 py-3 text-center">Tes Qur'an (40%)</th>
                  <th className="px-4 py-3 text-center">Tes CBT (30%)</th>
                  <th className="px-4 py-3 text-center">Wawancara (30%)</th>
                  <th className="px-4 py-3 text-center">Nilai Akhir</th>
                  <th className="px-4 py-3 text-center">Hasil Keputusan</th>
                  <th className="px-4 py-3 text-right">Aksi Penguji</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredApplicants.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400">
                      Tidak ada santri yang sesuai dengan filter pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredApplicants.map((a) => {
                    const sc = a.selectionScores || {}
                    const isCbtCompleted = sc.academic !== undefined && sc.academic !== null && sc.academic !== ''
                    return (
                      <tr key={a.id} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02]">
                        <td className="px-4 py-3.5">
                          <p className="font-bold text-slate-800 dark:text-white">{a.name}</p>
                          <p className="font-mono text-[11px] text-slate-400">
                            {a.id} &bull; {a.program}
                          </p>
                        </td>

                        <td className="px-4 py-3.5">
                          {isCbtCompleted ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                              <CheckCircle2 size={12} /> Selesai Mengerjakan
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-white/10 dark:text-slate-400">
                              <Clock size={12} /> Belum Mengerjakan
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3.5 text-center font-bold text-slate-700 dark:text-slate-200">
                          {sc.quran ?? '-'}
                        </td>

                        <td className="px-4 py-3.5 text-center font-bold text-blue-600 dark:text-blue-400">
                          {sc.academic ?? '-'}
                        </td>

                        <td className="px-4 py-3.5 text-center font-bold text-purple-600 dark:text-purple-400">
                          {sc.interview ?? '-'}
                        </td>

                        <td className="px-4 py-3.5 text-center font-black text-brand-700 dark:text-brand-300 text-sm">
                          {sc.finalScore ?? '-'}
                        </td>

                        <td className="px-4 py-3.5 text-center">
                          <StatusBadge status={sc.result || 'Belum Dinilai'} />
                        </td>

                        <td className="px-4 py-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => handleOpenScoreModal(a)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 hover:bg-brand-100 dark:bg-brand-900/40 dark:text-brand-300"
                          >
                            <Award size={13} /> Input / Ubah Nilai
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: JADWAL SESI UJIAN */}
      {activeTab === 'Jadwal Sesi' && (
        <div className="grid gap-5 lg:grid-cols-3">
          {mockExamSchedules.map((sch) => (
            <div
              key={sch.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#192118]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-brand-50 px-2.5 py-0.5 text-[10px] font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                    {sch.type}
                  </span>
                  <StatusBadge status={sch.status} />
                </div>

                <h3 className="mt-3 text-sm font-bold text-slate-800 dark:text-white">
                  {sch.subject}
                </h3>

                <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-brand-600" />
                    <span>{sch.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-brand-600" />
                    <span>{sch.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpenCheck size={14} className="text-brand-600" />
                    <span>Ruang: {sch.room}</span>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs dark:bg-white/5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Progres Kehadiran:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {sch.completed} / {sch.registered} Santri Telah Mengerjakan
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-brand-500"
                      style={{ width: `${Math.round((sch.completed / sch.registered) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsExamSimModalOpen(true)}
                  className="flex-1 rounded-xl bg-brand-500 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brand-600"
                >
                  Uji Soal (CBT)
                </button>
                <button
                  type="button"
                  onClick={() => onNotify(`Daftar absensi ujian ${sch.subject} diunduh (simulasi)`)}
                  className="rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300"
                >
                  Absensi
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Online Exam Simulation Modal */}
      <OnlineExamSimulationModal
        isOpen={isExamSimModalOpen}
        onClose={() => setIsExamSimModalOpen(false)}
        questions={questions}
        onNotify={onNotify}
      />

      {/* Create / Edit Question Modal */}
      <QuestionFormModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        questionToEdit={questionToEdit}
        onSaveQuestion={handleSaveQuestion}
      />

      {/* Score Input Modal */}
      <ScoreInputModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        applicant={selectedApplicantForScore}
        onSaveScore={handleSaveScore}
      />
    </div>
  )
}
