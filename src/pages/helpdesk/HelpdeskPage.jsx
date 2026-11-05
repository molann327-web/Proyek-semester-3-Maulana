import React, { useState } from 'react'
import {
  MessagesSquare,
  MessageCircle,
  Search,
  ChevronDown,
  Send,
  HelpCircle,
  FileQuestion,
  User,
  CheckCircle2,
  Clock,
  Plus
} from 'lucide-react'
import { mockFaqs, mockChatMessages, mockHelpdeskTickets } from '../../data/mockHelpdesk'
import { StatusBadge } from '../../components/common/StatusBadge'
import { Modal } from '../../components/common/Modal'

export function HelpdeskPage({ onNotify }) {
  const [faqs, setFaqs] = useState(mockFaqs)
  const [faqSearch, setFaqSearch] = useState('')
  const [chatMessages, setChatMessages] = useState(mockChatMessages)
  const [chatInput, setChatInput] = useState('')
  const [tickets, setTickets] = useState(mockHelpdeskTickets)
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false)
  const [newTicket, setNewTicket] = useState({
    name: '',
    category: 'Persyaratan Dokumen',
    subject: '',
    message: ''
  })

  const handleSendChat = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: chatInput,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }

    setChatMessages((prev) => [...prev, userMsg])
    setChatInput('')

    // Simulated automated assistant response
    setTimeout(() => {
      const staffReply = {
        id: Date.now() + 1,
        sender: 'staff',
        name: 'Ustadzah Fitria (Panitia PPDB)',
        text: 'Terima kasih atas pesan Anda. Pertanyaan Anda telah dicatat oleh sistem helpdesk Darul Haromain. Untuk bantuan berkas darurat, Anda juga dapat menghubungi sekretariat di jam kerja (08.00 - 15.00 WIB).',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
      setChatMessages((prev) => [...prev, staffReply])
      onNotify('Balasan simulasi panitia diterima di ruang konsultasi')
    }, 1200)
  }

  const handleCreateTicket = (e) => {
    e.preventDefault()
    if (!newTicket.subject || !newTicket.name) return

    const created = {
      id: `TCK-${Math.floor(200 + Math.random() * 800)}`,
      applicantName: newTicket.name,
      subject: newTicket.subject,
      category: newTicket.category,
      status: 'Menunggu Tanggapan',
      date: 'Hari ini',
      priority: 'Normal'
    }

    setTickets([created, ...tickets])
    setIsNewTicketOpen(false)
    setNewTicket({ name: '', category: 'Persyaratan Dokumen', subject: '', message: '' })
    onNotify(`Tiket bantuan ${created.id} berhasil diajukan ke panitia PPDB`)
  }

  // Filter FAQs
  const filteredFaqs = faqs.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
        item.a.toLowerCase().includes(faqSearch.toLowerCase())
    )
  })).filter((cat) => cat.items.length > 0)

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
              <MessagesSquare size={14} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[.15em] text-brand-700 dark:text-brand-300">
              Modul Helpdesk & Live Chat / FAQ
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[30px]">
            Helpdesk & Pusat Informasi PPDB
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Layanan tanya jawab pendaftaran, konsultasi interaktif dengan panitia, dan penanganan tiket keluhan wali santri.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewTicketOpen(true)}
          className="flex h-10 items-center gap-2 rounded-xl bg-brand-500 px-4 text-xs font-bold text-white shadow-md shadow-brand-500/20 hover:bg-brand-600"
        >
          <Plus size={15} /> Buat Tiket Pertanyaan Baru
        </button>
      </div>

      {/* Main Grid: FAQ on Left, Live Chat on Right */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        {/* FAQs */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#192118]">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Frequently Asked Questions (FAQ)
              </h3>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Jawaban atas pertanyaan yang paling sering diajukan calon wali santri.
              </p>
            </div>

            <div className="relative min-w-[200px]">
              <Search size={14} className="pointer-events-none absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Cari topik bantuan..."
                className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          <div className="mt-5 space-y-6">
            {filteredFaqs.map((cat) => (
              <div key={cat.category}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                  {cat.category}
                </h4>
                <div className="mt-2 divide-y divide-slate-100 dark:divide-white/5">
                  {cat.items.map((item) => (
                    <details key={item.q} className="group py-3 last:pb-0">
                      <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-bold text-slate-800 transition hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400">
                        <span>{item.q}</span>
                        <ChevronDown size={14} className="text-slate-400 transition group-open:rotate-180" />
                      </summary>
                      <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400 pl-1">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Chat Simulator */}
        <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft dark:border-white/10 dark:bg-[#192118]">
          {/* Chat Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 p-4 dark:border-white/10">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
              <MessageCircle size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-white">
                Konsultasi Panitia PPDB
              </p>
              <p className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Panitia Siaga Online (Simulasi)
              </p>
            </div>
          </div>

          {/* Chat Scroll Area */}
          <div className="flex-1 space-y-3.5 bg-slate-50/70 p-4 dark:bg-white/[0.02] max-h-[360px] overflow-y-auto">
            {chatMessages.map((msg) => {
              const isUser = msg.sender === 'user'
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  {msg.name && (
                    <span className="mb-1 text-[10px] font-bold text-slate-500">
                      {msg.name}
                    </span>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-5 shadow-xs ${
                      isUser
                        ? 'rounded-tr-xs bg-brand-500 text-white'
                        : 'rounded-tl-xs bg-white text-slate-800 dark:bg-white/10 dark:text-white'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`mt-1 text-right text-[9px] ${
                        isUser ? 'text-white/70' : 'text-slate-400'
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSendChat} className="flex gap-2 border-t border-slate-100 p-3 dark:border-white/10">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Tulis pesan pertanyaan di sini..."
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
            <button
              type="submit"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-500 text-white shadow-sm hover:bg-brand-600"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>

      {/* Ticket List Section */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#192118]">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/10">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Daftar Tiket Pengaduan & Konsultasi Wali Santri
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Riwayat tiket bantuan teknis pendaftaran santri baru.
            </p>
          </div>
        </div>

        <div className="mt-4 divide-y divide-slate-100 dark:divide-white/5">
          {tickets.map((t) => (
            <div key={t.id} className="flex flex-col gap-2 py-3 text-xs sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-brand-600">{t.id}</span>
                  <span className="font-bold text-slate-800 dark:text-white">{t.subject}</span>
                </div>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Pengaju: <b className="text-slate-600 dark:text-slate-300">{t.applicantName}</b> · Kategori: {t.category}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400">{t.date}</span>
                <StatusBadge status={t.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Ticket Modal */}
      <Modal
        isOpen={isNewTicketOpen}
        onClose={() => setIsNewTicketOpen(false)}
        title="Ajukan Tiket Pertanyaan Baru"
        subtitle="Helpdesk Sekretariat PPDB"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateTicket} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nama Lengkap Wali / Calon Santri <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={newTicket.name}
              onChange={(e) => setNewTicket({ ...newTicket, name: e.target.value })}
              placeholder="Contoh: H. Muhammad Yusuf"
              className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Kategori Permasalahan
            </label>
            <select
              value={newTicket.category}
              onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 dark:border-white/10 dark:bg-[#1f281e] dark:text-white"
            >
              <option value="Persyaratan Dokumen">Persyaratan Dokumen / Unggah Berkas</option>
              <option value="Biaya & Pembayaran">Konfirmasi Pembayaran & Kuitansi</option>
              <option value="Jadwal & Ujian CBT">Jadwal Ujian Masuk & CBT Online</option>
              <option value="Asrama & Penempatan">Kamar Asrama & Santri Diterima</option>
              <option value="Lainnya">Pertanyaan Umum Lainnya</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Judul Pertanyaan <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={newTicket.subject}
              onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
              placeholder="Ringkasan kendala yang dialami"
              className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Deskripsi Pertanyaan Lengkap
            </label>
            <textarea
              rows={3}
              value={newTicket.message}
              onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
              placeholder="Tuliskan kendala Anda secara rinci..."
              className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div className="flex gap-2 pt-3">
            <button
              type="button"
              onClick={() => setIsNewTicketOpen(false)}
              className="w-1/2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className="w-1/2 rounded-xl bg-brand-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-600"
            >
              Kirim Tiket
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
