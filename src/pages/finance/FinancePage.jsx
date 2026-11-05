import React, { useState } from 'react'
import {
  Wallet,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Printer,
  Plus,
  CreditCard,
  Building,
  Eye,
  Check,
  X,
  Download
} from 'lucide-react'
import { mockCostItems, mockPaymentAccounts, mockTransactions } from '../../data/mockFinances'
import { DataTable } from '../../components/common/DataTable'
import { FilterBar } from '../../components/common/FilterBar'
import { StatCard } from '../../components/common/StatCard'
import { StatusBadge } from '../../components/common/StatusBadge'
import { ReceiptModal } from './ReceiptModal'
import { Modal } from '../../components/common/Modal'

export function FinancePage({ onNotify }) {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Semua status')
  const [selectedReceipt, setSelectedReceipt] = useState(null)
  const [activeTab, setActiveTab] = useState('Daftar Transaksi') // 'Daftar Transaksi' | 'Rincian Biaya & Rekening'
  const [isSimulatePayOpen, setIsSimulatePayOpen] = useState(false)
  const [newPay, setNewPay] = useState({
    applicantName: '',
    applicantId: 'DH-2026-00127',
    costType: 'Biaya Registrasi & Formulir',
    amount: 250000,
    method: 'Transfer BSI'
  })

  const filtered = transactions.filter((t) => {
    const matchSearch = (t.applicantName + t.applicantId + t.invoiceNumber).toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'Semua status' || t.status === statusFilter
    return matchSearch && matchStatus
  })

  // Statistics
  const totalVerified = transactions
    .filter((t) => t.status === 'Lunas')
    .reduce((sum, t) => sum + t.amount, 0)
  const pendingCount = transactions.filter((t) => t.status === 'Menunggu Verifikasi').length
  const unpaidCount = transactions.filter((t) => t.status === 'Belum Bayar').length

  const handleVerify = (invoiceNo, action) => {
    const updated = transactions.map((t) => {
      if (t.invoiceNumber === invoiceNo) {
        return {
          ...t,
          status: action === 'approve' ? 'Lunas' : 'Ditolak',
          verifiedBy: 'Ustadzah Halimah (Bendahara)',
          verifiedAt: 'Baru saja'
        }
      }
      return t
    })
    setTransactions(updated)
    onNotify(`Transaksi ${invoiceNo} berhasil di-${action === 'approve' ? 'verifikasi LUNAS' : 'tolak'} (simulasi)`)
  }

  const handleCreateMockPayment = (e) => {
    e.preventDefault()
    const created = {
      invoiceNumber: `INV-2026-00${transactions.length + 415}`,
      applicantId: newPay.applicantId,
      applicantName: newPay.applicantName || 'Calon Santri Baru',
      costType: newPay.costType,
      amount: Number(newPay.amount),
      method: newPay.method,
      date: 'Hari ini, 09:30 WIB',
      status: 'Menunggu Verifikasi',
      proofImage: 'bukti_transfer_baru.jpg',
      verifiedBy: null,
      verifiedAt: null,
      notes: 'Bukti transfer baru diunggah oleh wali santri.'
    }
    setTransactions([created, ...transactions])
    setIsSimulatePayOpen(false)
    onNotify(`Pembayaran ${created.invoiceNumber} berhasil dicatat dan masuk antrean verifikasi bendahara`)
  }

  const columns = [
    {
      header: 'No. Tagihan / Invoice',
      key: 'invoiceNumber',
      render: (t) => (
        <div>
          <span className="font-mono text-xs font-bold text-brand-700 dark:text-brand-300">
            {t.invoiceNumber}
          </span>
          <p className="text-[10px] text-slate-400">{t.date}</p>
        </div>
      )
    },
    {
      header: 'Calon Santri',
      key: 'applicantName',
      render: (t) => (
        <div>
          <p className="font-bold text-slate-800 dark:text-white">{t.applicantName}</p>
          <p className="font-mono text-[10px] text-slate-400">{t.applicantId}</p>
        </div>
      )
    },
    {
      header: 'Jenis Biaya',
      key: 'costType',
      render: (t) => (
        <div>
          <p className="text-xs text-slate-700 dark:text-slate-300">{t.costType}</p>
          <span className="text-[10px] text-slate-400">{t.method}</span>
        </div>
      )
    },
    {
      header: 'Nominal',
      key: 'amount',
      render: (t) => (
        <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
          Rp {t.amount.toLocaleString('id-ID')}
        </span>
      )
    },
    {
      header: 'Status Pembayaran',
      key: 'status',
      render: (t) => <StatusBadge status={t.status} />
    },
    {
      header: 'Aksi Bendahara',
      key: 'actions',
      align: 'right',
      render: (t) => (
        <div className="flex items-center justify-end gap-1.5">
          {t.status === 'Menunggu Verifikasi' && (
            <>
              <button
                type="button"
                title="Setujui Lunas"
                onClick={() => handleVerify(t.invoiceNumber, 'approve')}
                className="flex items-center gap-1 rounded-lg bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-emerald-600"
              >
                <Check size={13} /> Lunas
              </button>
              <button
                type="button"
                title="Tolak Bukti"
                onClick={() => handleVerify(t.invoiceNumber, 'reject')}
                className="rounded-lg border border-slate-200 p-1 text-slate-400 hover:text-rose-600 dark:border-white/10"
              >
                <X size={14} />
              </button>
            </>
          )}

          {t.status === 'Lunas' && (
            <button
              type="button"
              title="Cetak Kuitansi Resmi"
              onClick={() => setSelectedReceipt(t)}
              className="flex items-center gap-1 rounded-lg border border-brand-200 bg-brand-50/70 px-2.5 py-1 text-[11px] font-bold text-brand-700 hover:bg-brand-100 dark:border-brand-800/40 dark:bg-brand-950/40 dark:text-brand-300"
            >
              <Printer size={13} /> Kuitansi
            </button>
          )}
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
              <Wallet size={14} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[.15em] text-brand-700 dark:text-brand-300">
              Modul Keuangan & Pembayaran
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[30px]">
            Keuangan & Verifikasi Pembayaran
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Kelola tagihan pendaftaran, verifikasi mutasi bukti transfer bank, dan penerbitan kuitansi digital santri baru.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify('Laporan rekapitulasi keuangan diekspor ke Excel (simulasi)')}
            className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          >
            <Download size={14} /> Rekap Keuangan
          </button>
          <button
            type="button"
            onClick={() => setIsSimulatePayOpen(true)}
            className="flex h-10 items-center gap-2 rounded-xl bg-brand-500 px-4 text-xs font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-600"
          >
            <Plus size={15} /> Catat Pembayaran Baru
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Total Dana Terverifikasi"
          value={`Rp ${(totalVerified / 1000000).toFixed(1)} jt`}
          delta="Lunas"
          note="Mutasi Masuk"
          line="Rekening PPDB"
          icon={Wallet}
          tone="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"
        />
        <StatCard
          label="Menunggu Validasi"
          value={pendingCount}
          delta="Perlu Tindakan"
          note="Bukti Transfer Masuk"
          line="Antrean Bendahara"
          icon={Clock}
          tone="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300"
        />
        <StatCard
          label="Belum Membayar"
          value={unpaidCount}
          delta="Jatuh Tempo"
          note="Belum Unggah Bukti"
          line="Perlu Pengingat WA"
          icon={AlertCircle}
          tone="bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300"
        />
        <StatCard
          label="Rekening Bank Aktif"
          value="3 Bank"
          delta="BSI, BCA, Mandiri"
          note="Virtual Account & Manual"
          line="Metode Tersedia"
          icon={Building}
          tone="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300"
        />
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 border-b border-slate-200 pb-3 dark:border-white/10">
        {['Daftar Transaksi', 'Rincian Komponen Biaya & Rekening'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === tab
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Daftar Transaksi' ? (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-[#192118]">
          <div className="mb-5">
            <FilterBar
              search={search}
              onSearchChange={setSearch}
              searchPlaceholder="Cari invoice, nama santri, atau ID..."
              status={statusFilter}
              onStatusChange={setStatusFilter}
              statusOptions={[
                'Semua status',
                'Lunas',
                'Menunggu Verifikasi',
                'Belum Bayar'
              ]}
              onReset={() => {
                setSearch('')
                setStatusFilter('Semua status')
              }}
            />
          </div>

          <DataTable
            columns={columns}
            data={filtered}
            keyField="invoiceNumber"
            pageSize={5}
            emptyTitle="Tidak Ada Transaksi"
            emptyDescription="Tidak ada data transaksi yang cocok dengan filter atau pencarian."
          />
        </div>
      ) : (
        /* Cost breakdown & bank accounts */
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Cost Items */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#192118]">
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Struktur Biaya Penerimaan Santri Baru
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Rincian nominal biaya resmi PPDB Pondok Pesantren Darul Haromain T.A. 2026/2027.
            </p>

            <div className="mt-5 divide-y divide-slate-100 dark:divide-white/5">
              {mockCostItems.map((c) => (
                <div key={c.id} className="flex items-start justify-between py-3.5">
                  <div className="min-w-0 pr-4">
                    <p className="text-xs font-bold text-slate-800 dark:text-white">{c.name}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">{c.description}</p>
                    <span className="mt-1 inline-block rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-white/5 dark:text-slate-300">
                      {c.type}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-extrabold text-brand-700 dark:text-brand-300">
                    Rp {c.amount.toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Bank Accounts */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#192118]">
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Rekening Resmi Tujuan Pembayaran
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Wali santri hanya diperkenankan mentransfer ke rekening resmi atas nama yayasan.
              </p>

              <div className="mt-5 space-y-3">
                {mockPaymentAccounts.map((acc) => (
                  <div
                    key={acc.accountNumber}
                    className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-800 dark:text-white">{acc.bank}</p>
                      <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        Aktif
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-base font-extrabold text-brand-700 dark:text-brand-300">
                      {acc.accountNumber}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                      a.n. {acc.accountName}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs leading-5 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200">
              <p className="font-bold">Peringatan Keamanan Transaksi:</p>
              Hindari pembayaran ke nomor rekening perseorangan yang mengatasnamakan panitia. Seluruh pembayaran terverifikasi otomatis dengan kuitansi digital berstempel resmi.
            </div>
          </div>
        </div>
      )}

      {/* Digital Receipt Modal */}
      <ReceiptModal
        isOpen={Boolean(selectedReceipt)}
        onClose={() => setSelectedReceipt(null)}
        transaction={selectedReceipt}
        onNotify={onNotify}
      />

      {/* Simulate Pay Modal */}
      <Modal
        isOpen={isSimulatePayOpen}
        onClose={() => setIsSimulatePayOpen(false)}
        title="Catat Pembayaran Baru (Simulasi)"
        subtitle="Entri Transaksi Kasir / Wali"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateMockPayment} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nama Calon Santri <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={newPay.applicantName}
              onChange={(e) => setNewPay({ ...newPay, applicantName: e.target.value })}
              placeholder="Contoh: Siti Aisyah Humaira"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Jenis Tagihan
            </label>
            <select
              value={newPay.costType}
              onChange={(e) => setNewPay({ ...newPay, costType: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#1f281e] dark:text-white"
            >
              <option value="Biaya Registrasi & Formulir">Biaya Registrasi & Formulir (Rp 250.000)</option>
              <option value="Paket Daftar Ulang & Masuk Asrama">Paket Daftar Ulang & Masuk Asrama (Rp 7.550.000)</option>
              <option value="Infaq Sarana Bangunan (Termin 1)">Infaq Sarana Bangunan - Termin 1 (Rp 2.500.000)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Metode Pembayaran
            </label>
            <select
              value={newPay.method}
              onChange={(e) => setNewPay({ ...newPay, method: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#1f281e] dark:text-white"
            >
              <option value="Transfer BSI">Transfer Bank Syariah Indonesia (BSI)</option>
              <option value="Transfer BCA">Transfer Bank Central Asia (BCA)</option>
              <option value="Transfer Mandiri">Transfer Bank Mandiri</option>
              <option value="Tunai di Kasir PPDB">Tunai di Sekretariat PPDB</option>
            </select>
          </div>

          <div className="flex gap-2 pt-3">
            <button
              type="button"
              onClick={() => setIsSimulatePayOpen(false)}
              className="w-1/2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className="w-1/2 rounded-xl bg-brand-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-600"
            >
              Simpan Pembayaran
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
