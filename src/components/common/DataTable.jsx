import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EmptyState } from './EmptyState'

export function DataTable({
  columns = [],
  data = [],
  keyField = 'id',
  pageSize = 5,
  emptyTitle = 'Tidak ada data',
  emptyDescription = 'Belum ada data yang sesuai dengan kriteria yang dipilih.',
  onResetFilter
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(data.length / pageSize) || 1

  const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1)
  }

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} onReset={onResetFilter} />
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-bold uppercase tracking-[.1em] text-slate-400 dark:border-white/5 dark:bg-white/[0.02]">
              {columns.map((col, idx) => (
                <th
                  key={col.key || idx}
                  className={`py-3.5 ${col.align === 'right' ? 'text-right' : ''} ${
                    idx === 0 ? 'pl-6 pr-4' : idx === columns.length - 1 ? 'pl-4 pr-6' : 'px-4'
                  }`}
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {currentData.map((row, rowIndex) => (
              <tr
                key={row[keyField] || rowIndex}
                className="transition hover:bg-slate-50/70 dark:hover:bg-white/[0.02]"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={col.key || colIndex}
                    className={`py-3.5 text-xs text-slate-700 dark:text-slate-200 ${
                      col.align === 'right' ? 'text-right' : ''
                    } ${
                      colIndex === 0
                        ? 'pl-6 pr-4'
                        : colIndex === columns.length - 1
                        ? 'pl-4 pr-6'
                        : 'px-4'
                    }`}
                  >
                    {col.render ? col.render(row, (currentPage - 1) * pageSize + rowIndex) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-6 py-3.5 dark:border-white/10 sm:flex-row">
        <p className="text-[11px] text-slate-400">
          Menampilkan <span className="font-semibold text-slate-600 dark:text-slate-300">{Math.min(data.length, (currentPage - 1) * pageSize + 1)}</span> -{' '}
          <span className="font-semibold text-slate-600 dark:text-slate-300">
            {Math.min(data.length, currentPage * pageSize)}
          </span>{' '}
          dari <span className="font-semibold text-slate-600 dark:text-slate-300">{data.length}</span> data dummy
        </p>

        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="flex h-8 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-600 disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              <ChevronLeft size={14} /> Sebelumnya
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                type="button"
                onClick={() => setCurrentPage(pg)}
                className={`grid h-8 w-8 place-items-center rounded-lg text-xs font-bold transition ${
                  currentPage === pg
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300'
                }`}
              >
                {pg}
              </button>
            ))}

            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="flex h-8 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-600 disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              Berikutnya <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
