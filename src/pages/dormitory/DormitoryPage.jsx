import React, { useState } from 'react'
import {
  BedDouble,
  Building,
  UserPlus,
  Users,
  CheckCircle2,
  PackageCheck,
  Printer,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react'
import { mockDormBuildings, mockStarterEquipments } from '../../data/mockDormitory'
import { StatCard } from '../../components/common/StatCard'
import { StatusBadge } from '../../components/common/StatusBadge'
import { Modal } from '../../components/common/Modal'

export function DormitoryPage({ applicants, onUpdateApplicant, onNotify }) {
  const [buildings, setBuildings] = useState(mockDormBuildings)
  const [equipments, setEquipments] = useState(mockStarterEquipments)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [assignData, setAssignData] = useState({
    applicantId: '',
    buildingId: 'BL-01',
    roomNo: 'A-102'
  })

  // Students eligible for dorm assignment
  const acceptedApplicants = applicants.filter(
    (a) => a.selectionScores?.result === 'Lulus'
  )

  const unassignedApplicants = acceptedApplicants.filter(
    (a) => !a.dormitory
  )

  const handleToggleEquipment = (idx) => {
    const updated = [...equipments]
    updated[idx].received = !updated[idx].received
    setEquipments(updated)
    onNotify(`Status perlengkapan "${updated[idx].item}" diperbarui`)
  }

  const handleAssignDorm = (e) => {
    e.preventDefault()
    if (!assignData.applicantId) return

    const student = applicants.find((a) => a.id === assignData.applicantId)
    const buildingObj = buildings.find((b) => b.id === assignData.buildingId)

    if (student && buildingObj) {
      const updatedStudent = {
        ...student,
        dormitory: {
          building: buildingObj.name,
          room: assignData.roomNo,
          status: 'Ditempatkan'
        }
      }
      onUpdateApplicant(updatedStudent)
      onNotify(`${student.name} berhasil ditempatkan di ${assignData.roomNo} (${buildingObj.name})`)
      setIsAssignModalOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
              <BedDouble size={14} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[.15em] text-brand-700 dark:text-brand-300">
              Modul Asrama & Ke-santrian
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[30px]">
            Manajemen Asrama & Penempatan Santri
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Pendataan santri diterima, pembagian kamar asrama santriwan/santriwati, dan kontrol inventaris sarana awal.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify('Daftar penempatan santri diekspor ke format cetak / PDF (simulasi)')}
            className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          >
            <Printer size={14} /> Cetak Penempatan
          </button>
          <button
            type="button"
            onClick={() => setIsAssignModalOpen(true)}
            className="flex h-10 items-center gap-2 rounded-xl bg-brand-500 px-4 text-xs font-bold text-white shadow-md shadow-brand-500/20 transition hover:bg-brand-600"
          >
            <UserPlus size={15} /> Tempatkan Santri Baru
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Santri Diterima"
          value={acceptedApplicants.length}
          delta="Gelombang 1"
          note="Lulus Seleksi"
          line="Siap Masuk Asrama"
          icon={Users}
          tone="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"
        />
        <StatCard
          label="Gedung Asrama"
          value={`${buildings.length} Gedung`}
          delta="Putra & Putri"
          note="60 Kamar Total"
          line="Siap Dihuni"
          icon={Building}
          tone="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300"
        />
        <StatCard
          label="Hunian Kapasitas"
          value="76%"
          delta="184 / 240 Bed"
          note="56 Bed Tersedia"
          line="Kuota Kamar"
          icon={BedDouble}
          tone="bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-300"
        />
        <StatCard
          label="Belum Ditempatkan"
          value={unassignedApplicants.length}
          delta="Santri Baru"
          note="Perlu Plotting Kamar"
          line="Antrean Plotting"
          icon={PackageCheck}
          tone="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300"
        />
      </div>

      {/* Buildings Cards */}
      <div className="grid gap-5 lg:grid-cols-3">
        {buildings.map((b) => {
          const percent = Math.round((b.occupied / b.capacity) * 100)
          return (
            <div
              key={b.id}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-[#192118]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                  {b.type}
                </span>
                <span className="text-[11px] font-bold text-slate-400">
                  {b.floors} Lantai · {b.totalRooms} Kamar
                </span>
              </div>

              <h3 className="mt-3 text-base font-bold text-slate-800 dark:text-white">{b.name}</h3>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Musyrif: {b.supervisor}
              </p>

              <div className="mt-4 rounded-xl bg-slate-50 p-3.5 dark:bg-white/5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">Kapasitas Hunian:</span>
                  <span className="text-slate-800 dark:text-white">
                    {b.occupied} / {b.capacity} Santri ({percent}%)
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              {/* Sample Rooms */}
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 dark:border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Sampel Kondisi Kamar:
                </p>
                <div className="space-y-1.5">
                  {b.rooms?.map((rm) => (
                    <div
                      key={rm.roomNo}
                      className="flex items-center justify-between rounded-lg bg-white p-2 text-xs shadow-2xs dark:bg-white/[0.02]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 dark:text-white">{rm.roomNo}</span>
                        <span className="text-[10px] text-slate-400">({rm.occupied}/{rm.capacity} Santri)</span>
                      </div>
                      <StatusBadge status={rm.status} />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNotify(`Panel tata kelola kamar ${b.name} dibuka (demo)`)}
                className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl border border-slate-200 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
              >
                Lihat Semua Kamar & Denah <ChevronRight size={14} />
              </button>
            </div>
          )
        })}
      </div>

      {/* Starter Equipment Kit Checklist */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#192118]">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/10">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Standar Perlengkapan Awal Masuk Santri Baru
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Checklist sarana dan seragam yang diserahterimakan kepada setiap santri pada hari kedatangan.
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            Terverifikasi Bagian Sarpras
          </span>
        </div>

        <div className="mt-4 divide-y divide-slate-100 dark:divide-white/5">
          {equipments.map((eq, i) => (
            <div key={eq.item} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleEquipment(i)}
                  className={`grid h-6 w-6 place-items-center rounded-lg border transition ${
                    eq.received
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-slate-300 text-transparent dark:border-white/20'
                  }`}
                >
                  <Check size={14} strokeWidth={3} />
                </button>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">{eq.item}</p>
                  <p className="text-[11px] text-slate-400">{eq.note}</p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300">
                {eq.qty}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Assign Dorm Modal */}
      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title="Penempatan Kamar Santri Baru"
        subtitle="Plotting Asrama T.A. 2026/2027"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAssignDorm} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Pilih Calon Santri (Lulus Seleksi) <span className="text-rose-500">*</span>
            </label>
            <select
              required
              value={assignData.applicantId}
              onChange={(e) => setAssignData({ ...assignData, applicantId: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#1f281e] dark:text-white"
            >
              <option value="">-- Pilih Calon Santri --</option>
              {acceptedApplicants.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.id}) - {a.gender}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Pilih Gedung Asrama
            </label>
            <select
              value={assignData.buildingId}
              onChange={(e) => setAssignData({ ...assignData, buildingId: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#1f281e] dark:text-white"
            >
              {buildings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.type})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nomor Kamar Tersedia
            </label>
            <select
              value={assignData.roomNo}
              onChange={(e) => setAssignData({ ...assignData, roomNo: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-[#1f281e] dark:text-white"
            >
              <option value="A-102">Kamar A-102 (Sisa 1 Bed)</option>
              <option value="A-201">Kamar A-201 (Sisa 2 Bed)</option>
              <option value="B-102">Kamar B-102 (Sisa 1 Bed)</option>
              <option value="B-105">Kamar B-105 (Sisa 1 Bed)</option>
              <option value="T-101">Kamar T-101 (Tahfidz - Sisa 1 Bed)</option>
            </select>
          </div>

          <div className="flex gap-2 pt-3">
            <button
              type="button"
              onClick={() => setIsAssignModalOpen(false)}
              className="w-1/2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className="w-1/2 rounded-xl bg-brand-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-600"
            >
              Simpan Penempatan
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
