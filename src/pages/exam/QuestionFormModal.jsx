import React, { useState, useEffect } from 'react'
import { Modal } from '../../components/common/Modal'
import { BookOpenCheck, Check, AlertCircle } from 'lucide-react'

export function QuestionFormModal({
  isOpen,
  onClose,
  questionToEdit,
  onSaveQuestion
}) {
  const [category, setCategory] = useState('Pengetahuan Al-Qur\'an')
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [explanation, setExplanation] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (questionToEdit) {
      setCategory(questionToEdit.category || 'Pengetahuan Al-Qur\'an')
      setQuestion(questionToEdit.question || '')
      setOptions(questionToEdit.options && questionToEdit.options.length === 4 
        ? [...questionToEdit.options] 
        : ['', '', '', ''])
      setCorrectAnswer(questionToEdit.correctAnswer ?? 0)
      setExplanation(questionToEdit.explanation || '')
      setError('')
    } else {
      // Default new question
      setCategory('Pengetahuan Al-Qur\'an')
      setQuestion('')
      setOptions(['', '', '', ''])
      setCorrectAnswer(0)
      setExplanation('')
      setError('')
    }
  }, [questionToEdit, isOpen])

  const handleOptionChange = (idx, value) => {
    const updated = [...options]
    updated[idx] = value
    setOptions(updated)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!question.trim()) {
      setError('Teks pertanyaan wajib diisi')
      return
    }
    if (options.some((opt) => !opt.trim())) {
      setError('Seluruh 4 pilihan jawaban (A, B, C, D) wajib diisi')
      return
    }

    const payload = {
      id: questionToEdit ? questionToEdit.id : Date.now(),
      category,
      question: question.trim(),
      options: options.map((o) => o.trim()),
      correctAnswer: Number(correctAnswer),
      explanation: explanation.trim() || 'Kunci jawaban telah diverifikasi oleh tim penguji seleksi PPDB.'
    }

    onSaveQuestion(payload)
    onClose()
  }

  const categories = [
    'Pengetahuan Al-Qur\'an',
    'Tajwid & Makharijul Huruf',
    'Fiqih Ibadah',
    'Bahasa Arab Dasar',
    'Akhlaq & Adab Santri',
    'Potensi Akademik Umum'
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={questionToEdit ? 'Edit Butir Soal CBT' : 'Buat Butir Soal CBT Baru'}
      subtitle="Bank Soal Seleksi Masuk PPDB Darul Haromain"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        {/* Kategori Mata Pelajaran */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Kategori Mata Pelajaran / Materi
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#151c14] dark:text-white"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Pertanyaan */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Pertanyaan Soal
          </label>
          <textarea
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Tuliskan butir soal / studi kasus di sini..."
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#151c14] dark:text-white"
            required
          />
        </div>

        {/* 4 Pilihan Jawaban */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Pilihan Jawaban (Pilih radio untuk menentukan kunci jawaban yang benar):
          </label>
          {['A', 'B', 'C', 'D'].map((letter, idx) => (
            <div key={letter} className="flex items-center gap-2">
              <label
                className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border text-xs font-bold transition ${
                  correctAnswer === idx
                    ? 'border-brand-500 bg-brand-500 text-white shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300'
                }`}
                title={`Pilih ${letter} sebagai kunci jawaban benar`}
              >
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correctAnswer === idx}
                  onChange={() => setCorrectAnswer(idx)}
                  className="sr-only"
                />
                {correctAnswer === idx ? <Check size={14} /> : letter}
              </label>

              <input
                type="text"
                value={options[idx]}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                placeholder={`Isi teks pilihan jawaban ${letter}...`}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#151c14] dark:text-white"
                required
              />
            </div>
          ))}
          <p className="text-[11px] text-brand-600 dark:text-brand-400">
            &bull; Kunci jawaban yang terpilih saat ini: <strong>Pilihan {String.fromCharCode(65 + correctAnswer)}</strong>
          </p>
        </div>

        {/* Pembahasan Soal */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Pembahasan / Keterangan Jawaban (Opsional)
          </label>
          <textarea
            rows={2}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Tuliskan rujukan dalil, kaidah tajwid, atau pembahasan..."
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
            className="rounded-xl bg-brand-500 px-5 py-2 text-xs font-bold text-white shadow-md shadow-brand-500/25 transition hover:bg-brand-600 active:scale-95"
          >
            {questionToEdit ? 'Simpan Perubahan Soal' : 'Tambahkan ke Bank Soal'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
