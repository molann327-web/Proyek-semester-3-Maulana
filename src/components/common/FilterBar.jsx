import React from 'react'
import { Search, Filter, RefreshCw } from 'lucide-react'

export function FilterBar({
  search,
  onSearchChange,
  searchPlaceholder = 'Cari data...',
  status,
  onStatusChange,
  statusOptions = ['Semua status'],
  extraFilter,
  actions,
  onReset
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2.5">
        <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
          <Search size={15} className="pointer-events-none absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>

        {statusOptions && onStatusChange && (
          <div className="relative">
            <Filter size={13} className="pointer-events-none absolute left-3 top-3.5 text-slate-400" />
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white pl-8 pr-3 text-xs font-medium text-slate-700 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-[#1a2318] dark:text-slate-200"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt} className="dark:bg-[#192118]">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}

        {extraFilter}

        {onReset && (search || (status && status !== statusOptions[0])) && (
          <button
            type="button"
            onClick={onReset}
            title="Reset pencarian dan filter"
            className="flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 px-3 text-xs font-medium text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5"
          >
            <RefreshCw size={13} /> Reset
          </button>
        )}
      </div>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
