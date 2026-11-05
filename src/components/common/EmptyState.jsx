import React from 'react'
import { Inbox, RefreshCw } from 'lucide-react'

export function EmptyState({
  title = 'Tidak Ada Data Ditemukan',
  description = 'Coba ubah kata kunci pencarian atau sesuaikan filter yang sedang aktif.',
  icon: Icon = Inbox,
  actionLabel,
  onAction,
  onReset
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500">
        <Icon size={28} strokeWidth={1.5} />
      </div>

      <h4 className="mt-4 text-base font-bold text-slate-800 dark:text-slate-100">{title}</h4>
      <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-3">
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
          >
            <RefreshCw size={13} /> Reset Filter
          </button>
        )}

        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-brand-500/20 transition hover:bg-brand-600"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  )
}
