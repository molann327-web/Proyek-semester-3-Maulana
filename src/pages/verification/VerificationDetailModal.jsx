import React, { useState } from 'react'
import { Modal } from '../../components/common/Modal'
import { CheckCircle2, AlertCircle, FileText, Check, X, Sparkles, Send } from 'lucide-react'
import { StatusBadge } from '../../components/common/StatusBadge'

export function VerificationDetailModal({
  isOpen,
  onClose,
  applicant,
  onUpdateApplicant,
  onNotify
}) {
  if (!applicant) return null

  const [activeTab, setActiveTab] = useState('Verifikasi Berkas') // 'Verifikasi Berkas' | 'Penilaian Seleksi'
  const [documents, setDocuments] = useState(applicant.documents || [])
  const [revisionNote, setRevisionNote] = useState('')
  const [overallStatus, setOverallStatus] = useState(applicant.status)

  // Scores
  const [quranScore, setQuranScore] = useState(applicant.selectionScores?.quran || 85)
  const [academicScore, setAcademicScore] = useState(applicant.selectionScores?.academic || 80)
  const [interviewScore, setInterviewScore] = useState(applicant.selectionScores?.interview || 85)
  const [selectionResult, setSelectionResult] = useState(applicant.selectionScores?.result || 'Terjadwal')

  // Calculate weighted final score
  const finalScore = (Number(quranScore) * 0.4 + Number(academicScore) * 0.3 + Number(interviewScore) * 0.3).toFixed(1)

  const handleToggleDocStatus = (index, newStatus) => {
    const updated = [...documents]
    updated[index].status = newStatus
    if (newStatus === 'Perlu perbaikan') {
      updated[index].note = revisionNote || 'Foto dokumen buram atau tidak terbaca jelas'
    } else {
      updated[index].note = null
    }
    setDocuments(updated)
  }

  const handleSaveVerification = () => {
    const hasRevisions = documents.some((d) => d.status === 'Perlu perbaikan')
    const allValid = documents.every((d) => d.status === 'Valid')
    const newStatus = hasRevisions ? 'Perlu perbaikan' : allValid ? 'Terverifikasi' : 'Menunggu berkas'

    const updated = {
      ...applicant,
      status: newStatus,
      documents: documents,
      selectionScores: {
        quran: Number(quranScore),
        academic: Number(academicScore),
        interview: Number(interviewScore),
        finalScore: Number(finalScore),
        result: selectionResult
      }
    }

    onUpdateApplicant(updated)
    onNotify(`Status calon santri ${applicant.name} diperbarui menjadi: ${newStatus}`)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Verifikasi & Seleksi Calon Santri"
      subtitle={`${applicant.name} (${applicant.id})`}
      maxWidth="max-w-2xl"
      footer={
        <div className="flex w-full items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Perubahan status disimpan secara lokal (Simulasi).
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSaveVerification}
              className="rounded-xl bg-brand-500 px-5 py-2 text-xs font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-600"
            >
              Simpan Hasil Verifikasi
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Navigation tabs */}
        <div className="flex gap-2 border-b border-slate-100 pb-3 dark:border-white/10">
          {['Verifikasi Berkas', 'Penilaian Seleksi Masuk'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                activeTab === tab
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Verifikasi Berkas' ? (
          <div className="space-y-4">
            <div className="rounded-2xl bg-brand-50/70 p-3.5 dark:bg-brand-900/20">
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                Periksa keaslian dan kejelasan dokumen berikut. Beri tanda <b>Valid</b> jika berkas sesuai, atau <b>Perlu Perbaikan</b> jika ada kekurangan.
              </p>
            </div>

            <div className="space-y-3">
              {documents.map((doc, idx) => (
                <div
                  key={doc.name}
                  className="flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white p-3.5 dark:border-white/10 dark:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-brand-600" />
                      <p className="text-xs font-bold text-slate-800 dark:text-white">{doc.name}</p>
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      File: {doc.file || 'Belum diunggah'} {doc.size ? `· ${doc.size}` : ''}
                    </p>
                    {doc.note && (
                      <p className="mt-1 text-[11px] text-rose-500 italic">
                        Catatan koreksi: {doc.note}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge status={doc.status} />
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleToggleDocStatus(idx, 'Valid')}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                          doc.status === 'Valid'
                            ? 'bg-emerald-500 text-white'
                            : 'border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300'
                        }`}
                      >
                        Valid
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleDocStatus(idx, 'Perlu perbaikan')}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                          doc.status === 'Perlu perbaikan'
                            ? 'bg-rose-500 text-white'
                            : 'border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300'
                        }`}
                      >
                        Perbaikan
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Catatan Perbaikan Tambahan untuk Calon Santri:
              </label>
              <textarea
                rows={2}
                value={revisionNote}
                onChange={(e) => setRevisionNote(e.target.value)}
                placeholder="Contoh: Mohon unggah ulang akta kelahiran dalam resolusi tinggi..."
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>
        ) : (
          /* Penilaian Seleksi */
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-white/5 dark:bg-white/5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Tes Al-Qur'an (40%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={quranScore}
                  onChange={(e) => setQuranScore(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2 text-center text-sm font-bold text-slate-800 focus:border-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
                <p className="text-[10px] text-slate-400">Tajwid, kelancaran, & hafalan</p>
              </div>

              <div className="space-y-1.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-white/5 dark:bg-white/5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Tes Tulis CBT (30%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={academicScore}
                  onChange={(e) => setAcademicScore(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2 text-center text-sm font-bold text-slate-800 focus:border-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
                <p className="text-[10px] text-slate-400">Dasar agama & akademik</p>
              </div>

              <div className="space-y-1.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-white/5 dark:bg-white/5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Wawancara (30%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={interviewScore}
                  onChange={(e) => setInterviewScore(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2 text-center text-sm font-bold text-slate-800 focus:border-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
                <p className="text-[10px] text-slate-400">Motivasi santri & kesiapan wali</p>
              </div>
            </div>

            {/* Score Summary Box */}
            <div className="flex items-center justify-between rounded-2xl bg-brand-50/80 p-4 dark:bg-brand-900/20">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                  Total Nilai Akhir (Tervalidasi)
                </span>
                <p className="text-3xl font-extrabold tracking-tight text-brand-800 dark:text-white">
                  {finalScore} <span className="text-xs font-normal text-slate-500">/ 100</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Keputusan Seleksi
                </span>
                <div className="mt-1">
                  <select
                    value={selectionResult}
                    onChange={(e) => setSelectionResult(e.target.value)}
                    className="rounded-xl border border-brand-300 bg-white px-3 py-1.5 text-xs font-bold text-brand-800 dark:border-brand-700 dark:bg-[#1a2318] dark:text-brand-200"
                  >
                    <option value="Lulus">Lulus Seleksi</option>
                    <option value="Daftar Tunggu">Daftar Tunggu / Cadangan</option>
                    <option value="Tidak Lulus">Tidak Lulus</option>
                    <option value="Terjadwal">Belum Selesai (Terjadwal)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
