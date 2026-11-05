import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl',
  footer
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className={`relative my-8 w-full ${maxWidth} rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl transition-all dark:border-white/10 dark:bg-[#192118] sm:p-7`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 dark:border-white/10">
          <div>
            {subtitle && (
              <p className="text-[11px] font-bold uppercase tracking-[.15em] text-brand-600 dark:text-brand-400">
                {subtitle}
              </p>
            )}
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h3>
          </div>
          <button
            type="button"
            aria-label="Tutup dialog"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-5 max-h-[calc(85vh-140px)] overflow-y-auto pr-1">
          {children}
        </div>

        {footer && (
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-white/10">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
