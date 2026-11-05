import React from 'react'
import { Modal } from '../../components/common/Modal'
import { Printer, Download, GraduationCap, QrCode, CheckCircle2, Calendar, MapPin, User } from 'lucide-react'

export function RegistrationCardModal({ isOpen, onClose, applicant, onNotify }) {
  if (!applicant) return null

  const handlePrint = () => {
    onNotify('Dokumen kartu pendaftaran dikirim ke antrean cetak / PDF (simulasi)')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Kartu Tanda Peserta PPDB"
      subtitle="Bukti Pendaftaran Resmi"
      maxWidth="max-w-xl"
      footer={
        <div className="flex w-full items-center justify-between">
          <p className="text-[11px] text-slate-400">
            Cetak kartu ini dan bawa saat mengikuti tes seleksi lisan di pesantren.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-600"
            >
              <Printer size={15} /> Cetak Kartu (PDF)
            </button>
          </div>
        </div>
      }
    >
      <div className="rounded-2xl border-2 border-brand-500/30 bg-[#FBFDF9] p-6 text-slate-800 shadow-inner dark:border-brand-500/20 dark:bg-[#141b12] dark:text-slate-100">
        {/* Pesantren Official Header */}
        <div className="flex items-center gap-3.5 border-b-2 border-slate-200 pb-4 dark:border-white/10">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-500 text-white shadow-md shadow-brand-500/30">
            <GraduationCap size={30} />
          </div>
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-brand-600 dark:text-brand-400">
              Pondok Pesantren Darul Haromain
            </p>
            <h3 className="text-base font-extrabold tracking-tight sm:text-lg">
              KARTU TANDA PESERTA SELEKSI PPDB
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Tahun Ajaran 2026/2027 · SK Kemenag No. 421.2/089/Pondok/2018
            </p>
          </div>
        </div>

        {/* Card Body */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-[140px_1fr]">
          {/* Photo & QR Mockup */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative grid h-44 w-32 place-items-center rounded-xl border border-slate-200 bg-slate-100 text-slate-400 overflow-hidden dark:border-white/10 dark:bg-white/5">
              <div className="text-center p-2">
                <User size={40} className="mx-auto text-brand-500/70" />
                <p className="mt-2 text-[10px] font-bold text-slate-500">PAS FOTO 3x4</p>
                <p className="text-[9px] text-emerald-600 font-semibold">Terverifikasi</p>
              </div>
            </div>

            <div className="grid h-16 w-32 place-items-center rounded-xl border border-dashed border-slate-300 bg-white p-2 text-center dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300">
                <QrCode size={18} className="text-brand-600" />
                <span>{applicant.id}</span>
              </div>
            </div>
          </div>

          {/* Student Info Table */}
          <div className="space-y-2 text-xs">
            <div className="rounded-xl bg-brand-50/70 p-3 dark:bg-brand-900/20">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Nomor Registrasi Resmi
              </span>
              <p className="font-mono text-base font-bold text-brand-700 dark:text-brand-300">
                {applicant.id}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-slate-100 bg-white p-2.5 dark:border-white/5 dark:bg-white/5">
                <span className="text-[10px] text-slate-400">Nama Lengkap</span>
                <p className="font-bold text-slate-800 dark:text-white">{applicant.name}</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-2.5 dark:border-white/5 dark:bg-white/5">
                <span className="text-[10px] text-slate-400">Jenis Kelamin</span>
                <p className="font-bold text-slate-800 dark:text-white">{applicant.gender || 'Laki-laki'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-slate-100 bg-white p-2.5 dark:border-white/5 dark:bg-white/5">
                <span className="text-[10px] text-slate-400">NISN / NIK</span>
                <p className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  {applicant.nisn || '0087654321'}
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-2.5 dark:border-white/5 dark:bg-white/5">
                <span className="text-[10px] text-slate-400">Program & Jalur</span>
                <p className="font-bold text-slate-800 dark:text-white">
                  {applicant.program || 'Tsanawiyah (MTs)'} · {applicant.track || 'Reguler'}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-2.5 dark:border-white/5 dark:bg-white/5">
              <span className="text-[10px] text-slate-400">Asal Sekolah</span>
              <p className="font-semibold text-slate-700 dark:text-slate-300">{applicant.school}</p>
            </div>
          </div>
        </div>

        {/* Exam Schedule Details */}
        <div className="mt-5 rounded-2xl border border-brand-200/60 bg-brand-50/50 p-4 dark:border-brand-900/40 dark:bg-brand-900/10">
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
            Jadwal Ujian Masuk Pesantren
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Calendar size={14} className="text-brand-600" />
              <span>Sabtu-Ahad, 06 - 07 Des 2026</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <MapPin size={14} className="text-brand-600" />
              <span>Gedung Utama Ponpes Darul Haromain</span>
            </div>
          </div>
        </div>

        {/* Footer Rules */}
        <div className="mt-4 border-t border-dashed border-slate-200 pt-3 text-[10px] leading-4 text-slate-400 dark:border-white/10">
          <p>
            <b>Catatan Peserta:</b> Hadir 30 menit sebelum jadwal seleksi dengan seragam sekolah asal atau busana muslim rapi, membawa kartu ini serta alat tulis.
          </p>
        </div>
      </div>
    </Modal>
  )
}
