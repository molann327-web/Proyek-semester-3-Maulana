import React from 'react'
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react'

export function Toast({ toast, onClose }) {
  if (!toast) return null

  const type = toast.type || 'success'
  const isError = type === 'error'
  const isWarning = type === 'warning'
  const isInfo = type === 'info'

  return (
    <div
      role="status"
      className="fixed bottom-5 right-5 z-[70] flex max-w-md items-center gap-3 rounded-2xl bg-slate-900/95 p-4 text-xs font-semibold text-white shadow-2xl backdrop-blur-md dark:bg-white dark:text-slate-900"
    >
      <div className="shrink-0">
        {isError ? (
          <AlertCircle size={18} className="text-rose-400 dark:text-rose-600" />
        ) : isWarning ? (
          <AlertTriangle size={18} className="text-amber-400 dark:text-amber-600" />
        ) : isInfo ? (
          <Info size={18} className="text-sky-400 dark:text-sky-600" />
        ) : (
          <CheckCircle2 size={18} className="text-lime-400 dark:text-emerald-600" />
        )}
      </div>

      <p className="flex-1 leading-5">
        {typeof toast === 'string' ? toast : toast.message}
      </p>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 hover:text-white dark:hover:text-slate-700"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
