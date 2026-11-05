import React, { useState, useEffect } from 'react'
import { Modal } from '../../components/common/Modal'
import { Award, BookOpenCheck, CheckCircle2, User, Sparkles, AlertCircle } from 'lucide-react'

export function ScoreInputModal({
  isOpen,
  onClose,
  applicant,
  onSaveScore
}) {
  const [quranScore, setQuranScore] = useState(85)
  const [academicScore, setAcademicScore] = useState(80)
  const [interviewScore, setInterviewScore] = useState(85)
  const [result, setResult] = useState('Lulus')
  const [notes, setNotes] = useState('')
  const [cbtStatus, setCbtStatus] = useState('Selesai')

  useEffect(() => {
    if (applicant) {
      const sc = applicant.selectionScores || {}
      setQuranScore(sc.quran ?? 85)
      setAcademicScore(sc.academic ?? 80)
      setInterviewScore(sc.interview ?? 85)
      setResult(sc.result || 'Lulus')
      setNotes(sc.notes || 'Bacaan tajwid fasih, makharijul huruf baik, santri berakhlak sopan.')
      setCbtStatus(sc.cbtStatus || 'Selesai')
    }
  }, [applicant, isOpen])

  if (!applicant) return null

  // Calculate final score: Quran 40%, CBT 30%, Interview 30%
  const finalScore = Number(
    ((Number(quranScore) * 0.4) + (Number(academicScore) * 0.3) + (Number(interviewScore) * 0.3)).toFixed(1)
  )

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedApplicant = {
      ...applicant,
      selectionScores: {
        quran: Number(quranScore),
        academic: Number(academicScore),
        interview: Number(interviewScore),
        finalScore: finalScore,
        result: result,
        notes: notes,
        cbtStatus: cbtStatus,
        gradedAt: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
      }
    }

    onSaveScore(updatedApplicant)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Form Penilaian Seleksi Santri"
      subtitle={`Input & Verifikasi Hasil Ujian: ${applicant.name} (${applicant.id})`}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Identitas Santri Mini Card */}
        <div className="flex items-center gap-3.5 rounded-2xl bg-brand-50/70 p-3.5 dark:bg-brand-950/30 border border-brand-200/60 dark:border-brand-900/40">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500 text-sm font-bold text-white shadow-sm">
            {applicant.initials || 'CS'}
          </div>
          <div className="min-w-0 flex-1 text-xs">
            <p className="font-bold text-slate-900 dark:text-white truncate">{applicant.name}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {applicant.id} &bull; {applicant.program} ({applicant.track})
            </p>
            <p className="text-[10px] text-brand-700 dark:text-brand-300 font-semibold">
              Asal: {applicant.school}
            </p>
          </div>
          <div className="text-right">
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              {cbtStatus} Mengerjakan CBT
            </span>
          </div>
        </div>

        {/* 1. Nilai Tes Al-Qur'an (Tahfidz & Tajwid) - Bobot 40% */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 dark:border-white/10 dark:bg-[#151c14]">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 dark:text-white">
              1. Uji Baca Al-Qur'an &amp; Tahfidz (Bobot 40%)
            </label>
            <span className="font-mono text-sm font-black text-brand-600 dark:text-brand-400">
              {quranScore} / 100
            </span>
          </div>
          <p className="mt-0.5 text-[11px] text-slate-400">
            Penilaian kelancaran makharijul huruf, kaidah tajwid, dan hafalan juz.
          </p>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={quranScore}
            onChange={(e) => setQuranScore(e.target.value)}
            className="mt-2 w-full accent-brand-500 cursor-pointer"
          />
        </div>

        {/* 2. Nilai Ujian Tulis CBT Online - Bobot 30% */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 dark:border-white/10 dark:bg-[#151c14]">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 dark:text-white">
              2. Ujian Tulis CBT Online (Bobot 30%)
            </label>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-black text-blue-600 dark:text-blue-400">
                {academicScore} / 100
              </span>
            </div>
          </div>
          <p className="mt-0.5 text-[11px] text-slate-400">
            Skor terakumulasi otomatis dari sistem CBT (Potensi Akademik &amp; Bahasa).
          </p>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={academicScore}
            onChange={(e) => setAcademicScore(e.target.value)}
            className="mt-2 w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* 3. Nilai Wawancara - Bobot 30% */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 dark:border-white/10 dark:bg-[#151c14]">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 dark:text-white">
              3. Wawancara Santri &amp; Orang Tua (Bobot 30%)
            </label>
            <span className="font-mono text-sm font-black text-purple-600 dark:text-purple-400">
              {interviewScore} / 100
            </span>
          </div>
          <p className="mt-0.5 text-[11px] text-slate-400">
            Penilaian motivasi mondok, kesiapan asrama, dan komitmen orang tua wali.
          </p>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={interviewScore}
            onChange={(e) => setInterviewScore(e.target.value)}
            className="mt-2 w-full accent-purple-600 cursor-pointer"
          />
        </div>

        {/* Kalkulasi Nilai Akhir & Keputusan */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-center dark:border-emerald-900/40 dark:bg-emerald-950/30">
            <p className="text-[10px] font-bold uppercase text-emerald-800 dark:text-emerald-300">
              Nilai Akhir Terbobot
            </p>
            <p className="mt-1 font-mono text-3xl font-black text-emerald-700 dark:text-emerald-300">
              {finalScore}
            </p>
            <p className="text-[10px] text-emerald-600">
              {finalScore >= 75 ? 'Memenuhi Standar Mutu' : 'Di Bawah Standar'}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 dark:border-white/10 dark:bg-[#151c14]">
            <label className="text-xs font-bold text-slate-800 dark:text-white">
              Keputusan Seleksi
            </label>
            <select
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              <option value="Lulus">Lulus (Diterima)</option>
              <option value="Cadangan">Cadangan (Waiting List)</option>
              <option value="Tidak Lulus">Tidak Lulus</option>
            </select>
            <p className="mt-1 text-[10px] text-slate-400">
              Status ini akan langsung tampil di portal calon santri.
            </p>
          </div>
        </div>

        {/* Catatan Evaluasi Penguji */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Catatan Rekomendasi Ustadz Penguji
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Catatan kelebihan, kekurangan makhraj, atau saran kamar asrama..."
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#151c14] dark:text-white"
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
          >
            Batal
          </button>
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-xl bg-brand-500 px-5 py-2 text-xs font-bold text-white shadow-md shadow-brand-500/25 transition hover:bg-brand-600 active:scale-95"
          >
            <Award size={15} /> Simpan &amp; Tetapkan Nilai
          </button>
        </div>
      </form>
    </Modal>
  )
}
