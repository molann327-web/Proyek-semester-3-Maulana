import React from 'react'
import { Modal } from '../../components/common/Modal'
import { Printer, GraduationCap, CheckCircle2, ShieldCheck, Download } from 'lucide-react'

export function ReceiptModal({ isOpen, onClose, transaction, onNotify }) {
  if (!transaction) return null

  const handlePrint = () => {
    onNotify(`Kuitansi ${transaction.invoiceNumber} dikirim ke pencetak / file PDF (simulasi)`)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Kuitansi Pembayaran Elektronik"
      subtitle="Bukti Pembayaran Resmi Pesantren"
      maxWidth="max-w-xl"
      footer={
        <div className="flex w-full items-center justify-between">
          <p className="text-[11px] text-slate-400">
            Kuitansi ini adalah bukti sah pembayaran administrasi PPDB.
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
              <Printer size={15} /> Unduh Kuitansi (PDF)
            </button>
          </div>
        </div>
      }
    >
      <div className="rounded-2xl border-2 border-emerald-500/30 bg-[#FAFDF8] p-6 text-slate-800 shadow-inner dark:border-emerald-500/20 dark:bg-[#131b12] dark:text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500 text-white shadow-md shadow-brand-500/30">
              <GraduationCap size={26} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-brand-600 dark:text-brand-400">
                Pondok Pesantren Darul Haromain
              </p>
              <h3 className="text-base font-extrabold tracking-tight">KUITANSI PEMBAYARAN PPDB</h3>
              <p className="text-[10px] text-slate-400">Sekretariat Keuangan Pesantren</p>
            </div>
          </div>

          <div className="text-right">
            <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
              {transaction.invoiceNumber}
            </span>
            <p className="text-[10px] text-slate-400">{transaction.date}</p>
          </div>
        </div>

        {/* Paid Stamp */}
        <div className="relative mt-5 space-y-4 text-xs">
          <div className="absolute right-4 top-1 -rotate-12 select-none border-2 border-emerald-600 px-4 py-1 font-extrabold tracking-widest text-emerald-600 opacity-80 rounded-xl dark:border-emerald-400 dark:text-emerald-400">
            LUNAS / TERVERIFIKASI
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-100 bg-white p-3 dark:border-white/5 dark:bg-white/5">
              <span className="text-[10px] text-slate-400">Telah Diterima Dari:</span>
              <p className="font-bold text-slate-800 dark:text-white">{transaction.applicantName}</p>
              <p className="font-mono text-[10px] text-brand-600">{transaction.applicantId}</p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-3 dark:border-white/5 dark:bg-white/5">
              <span className="text-[10px] text-slate-400">Metode Pembayaran:</span>
              <p className="font-bold text-slate-800 dark:text-white">{transaction.method}</p>
              <p className="text-[10px] text-slate-400">Diverifikasi via Mutasi Bank</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-4 dark:border-white/5 dark:bg-white/5">
            <span className="text-[10px] text-slate-400">Rincian Pembayaran:</span>
            <div className="mt-2 flex items-center justify-between border-b border-slate-100 pb-2 dark:border-white/10">
              <p className="font-semibold text-slate-700 dark:text-slate-200">{transaction.costType}</p>
              <p className="font-mono font-bold text-slate-900 dark:text-white">
                Rp {transaction.amount.toLocaleString('id-ID')}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="font-bold text-slate-800 dark:text-white">Total Tagihan Lunas:</span>
              <span className="text-base font-extrabold text-brand-700 dark:text-brand-300">
                Rp {transaction.amount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-4 text-[10px] dark:border-white/10">
            <div>
              <p className="text-slate-400">Petugas Verifikasi Keuangan:</p>
              <p className="font-bold text-slate-700 dark:text-slate-300">
                {transaction.verifiedBy || 'Ustadzah Halimah (Bendahara)'}
              </p>
            </div>
            <div className="text-right text-slate-400">
              <p>Stempel Digital Terdaftar</p>
              <p className="font-mono text-[9px]">HASH-DH-{transaction.invoiceNumber.slice(-5)}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
