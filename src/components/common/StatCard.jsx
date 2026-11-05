import React from 'react'
import { ArrowUpRight } from 'lucide-react'

export function StatCard({
  label,
  value,
  delta,
  note,
  line,
  icon: Icon,
  tone = 'bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300',
  onClick,
  actionLabel = 'Lihat detail'
}) {
  return (
    <article
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-[#192118] ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}>
          {Icon && <Icon size={20} strokeWidth={2} />}
        </div>
        {onClick && (
          <span
            title={actionLabel}
            className="text-slate-300 transition group-hover:text-brand-600 dark:text-slate-600 dark:group-hover:text-brand-400"
          >
            <ArrowUpRight size={18} />
          </span>
        )}
      </div>

      <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>

      <div className="mt-1 flex items-baseline gap-2">
        <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-[28px]">
          {value}
        </p>
        {delta && (
          <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            {delta}
          </span>
        )}
      </div>

      {(note || line) && (
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] dark:border-white/10">
          <span className="text-slate-400">{note}</span>
          <span className="font-semibold text-slate-600 dark:text-slate-300">{line}</span>
        </div>
      )}
    </article>
  )
}
