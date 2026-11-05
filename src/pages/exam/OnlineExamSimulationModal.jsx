import React, { useState, useEffect } from 'react'
import { Modal } from '../../components/common/Modal'
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  BookOpenCheck,
  Award,
  Sparkles
} from 'lucide-react'
import { mockQuestions } from '../../data/mockExams'

export function OnlineExamSimulationModal({ isOpen, onClose, onNotify, questions = mockQuestions }) {
  const examQuestions = questions && questions.length > 0 ? questions : mockQuestions
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [flagged, setFlagged] = useState({})
  const [timeLeft, setTimeLeft] = useState(1200) // 20 minutes
  const [isFinished, setIsFinished] = useState(false)

  // Countdown timer simulation
  useEffect(() => {
    if (!isOpen || isFinished) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [isOpen, isFinished])

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const currentQuestion = examQuestions[currentIdx] || examQuestions[0]

  const handleSelectAnswer = (optionIdx) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIdx
    }))
  }

  const handleToggleFlag = () => {
    setFlagged((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }))
  }

  const calculateScore = () => {
    let correct = 0
    examQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    return {
      correct,
      total: examQuestions.length,
      percentage: Math.round((correct / examQuestions.length) * 100)
    }
  }

  const handleFinishExam = () => {
    setIsFinished(true)
    const res = calculateScore()
    onNotify(`Ujian selesai! Skor simulasi Anda: ${res.percentage}/100 (${res.correct} benar dari ${res.total} soal)`)
  }

  const handleRestart = () => {
    setAnswers({})
    setFlagged({})
    setCurrentIdx(0)
    setIsFinished(false)
    setTimeLeft(1200)
  }

  const scoreResult = isFinished ? calculateScore() : null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Simulasi Tes CBT Online Santri Baru"
      subtitle="Ujian Pengetahuan Agama & Dasar Akademik"
      maxWidth="max-w-3xl"
    >
      {isFinished ? (
        /* Result Screen */
        <div className="py-6 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
            <Award size={44} />
          </div>

          <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Alhamdulillah! Ujian Selesai Dikerjakan
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Berikut adalah hasil evaluasi otomatis sistem Computer Based Test (CBT) Darul Haromain.
          </p>

          <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-brand-50/80 p-5 dark:bg-brand-900/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
              Skor Perolehan CBT
            </span>
            <p className="mt-1 text-4xl font-extrabold text-brand-800 dark:text-white">
              {scoreResult.percentage} <span className="text-sm font-normal text-slate-500">/ 100</span>
            </p>
            <p className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {scoreResult.correct} Benar dari {scoreResult.total} Soal
            </p>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={handleRestart}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300"
            >
              Ulangi Simulasi Ujian
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-brand-500 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-600"
            >
              Tutup & Kembali ke Portal
            </button>
          </div>
        </div>
      ) : (
        /* Active CBT Interface */
        <div className="space-y-5">
          {/* CBT Top Bar: Question badge & Timer */}
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3.5 dark:bg-white/5">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-brand-500 px-2.5 py-1 text-[11px] font-bold text-white">
                SOAL {currentIdx + 1} DARI {examQuestions.length}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Kategori: {currentQuestion.category}
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-1 font-mono text-xs font-bold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
              <Clock size={15} />
              <span>Sisa Waktu: {formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Question Text */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-[#151c14]">
            <p className="text-sm font-bold leading-6 text-slate-900 dark:text-white">
              {currentQuestion.question}
            </p>

            {/* Answer Options */}
            <div className="mt-4 space-y-2.5">
              {currentQuestion.options.map((opt, oIdx) => {
                const isSelected = answers[currentQuestion.id] === oIdx
                const optLetter = String.fromCharCode(65 + oIdx)
                return (
                  <label
                    key={opt}
                    onClick={() => handleSelectAnswer(oIdx)}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-xs font-medium transition ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/70 text-brand-900 dark:border-brand-400 dark:bg-brand-900/30 dark:text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-200 dark:hover:bg-white/5'
                    }`}
                  >
                    <div
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-xs font-bold transition ${
                        isSelected
                          ? 'bg-brand-500 text-white'
                          : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300'
                      }`}
                    >
                      {optLetter}
                    </div>
                    <span className="flex-1">{opt}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Bottom Bar: Navigator & Buttons */}
          <div className="flex flex-col gap-4 border-t border-slate-100 pt-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-amber-600">
              <input
                type="checkbox"
                checked={Boolean(flagged[currentQuestion.id])}
                onChange={handleToggleFlag}
                className="h-4 w-4 rounded accent-amber-500"
              />
              <span>Tandai Ragu-ragu</span>
            </label>

            {/* Question quick jump buttons */}
            <div className="flex items-center gap-1.5">
              {examQuestions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined
                const isCurrent = currentIdx === idx
                const isFlag = flagged[q.id]
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    className={`grid h-8 w-8 place-items-center rounded-lg text-xs font-bold transition ${
                      isCurrent
                        ? 'ring-2 ring-brand-500 ring-offset-2 dark:ring-offset-[#192118]'
                        : ''
                    } ${
                      isFlag
                        ? 'bg-amber-400 text-white'
                        : isAnswered
                        ? 'bg-brand-500 text-white'
                        : 'border border-slate-200 bg-white text-slate-500 dark:border-white/10 dark:bg-white/5'
                    }`}
                  >
                    {idx + 1}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 disabled:opacity-30 dark:border-white/10 dark:text-slate-300"
              >
                <ChevronLeft size={14} /> Sebelumnya
              </button>

              {currentIdx < examQuestions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIdx((i) => Math.min(examQuestions.length - 1, i + 1))}
                  className="flex items-center gap-1 rounded-xl bg-brand-500 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-brand-600"
                >
                  Selanjutnya <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinishExam}
                  className="flex items-center gap-1 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-700"
                >
                  <CheckCircle2 size={14} /> Selesai & Kumpulkan
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
