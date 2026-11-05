import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export function Drawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = 'max-w-md',
  footer
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
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
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          className={`w-screen ${width} flex flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform dark:border-white/10 dark:bg-[#192118]`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-white/10 sm:px-6">
            <div>
              {subtitle && (
                <p className="text-[10px] font-bold uppercase tracking-[.15em] text-brand-600 dark:text-brand-400">
                  {subtitle}
                </p>
              )}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 sm:p-6">{children}</div>

          {footer && (
            <div className="border-t border-slate-100 p-5 dark:border-white/10 sm:px-6">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
