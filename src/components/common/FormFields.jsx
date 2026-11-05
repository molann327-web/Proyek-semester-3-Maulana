import React from 'react'
import { UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react'

export function InputField({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  icon: Icon,
  className = ''
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Icon size={16} />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 dark:bg-white/5 dark:text-white dark:disabled:bg-white/[0.02] ${
            Icon ? 'pl-10' : ''
          } ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-slate-200 focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:focus:border-brand-400'
          }`}
        />
      </div>
      {error ? (
        <p className="flex items-center gap-1 text-[11px] text-rose-500">
          <AlertCircle size={12} /> {error}
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      ) : null}
    </div>
  )
}

export function SelectField({
  label,
  id,
  options = [],
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  className = ''
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-slate-900 transition-all focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 dark:bg-[#1f281e] dark:text-white ${
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
            : 'border-slate-200 focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:focus:border-brand-400'
        }`}
      >
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value
          const lbl = typeof opt === 'string' ? opt : opt.label
          return (
            <option key={val} value={val} className="dark:bg-[#1a2318] dark:text-white">
              {lbl}
            </option>
          )
        })}
      </select>
      {error ? (
        <p className="flex items-center gap-1 text-[11px] text-rose-500">
          <AlertCircle size={12} /> {error}
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      ) : null}
    </div>
  )
}

export function TextareaField({
  label,
  id,
  placeholder,
  value,
  onChange,
  rows = 3,
  error,
  helperText,
  required = false,
  disabled = false,
  className = ''
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 dark:bg-white/5 dark:text-white ${
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
            : 'border-slate-200 focus:border-brand-500 focus:ring-brand-500/20 dark:border-white/10 dark:focus:border-brand-400'
        }`}
      />
      {error ? (
        <p className="flex items-center gap-1 text-[11px] text-rose-500">
          <AlertCircle size={12} /> {error}
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      ) : null}
    </div>
  )
}

export function FileUploadField({
  label,
  fileName,
  fileSize,
  isUploaded,
  onUploadMock,
  accept = 'PDF, JPG, PNG (Maks 2MB)',
  required = false,
  error
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {isUploaded ? (
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={13} /> Terunggah
          </span>
        ) : (
          <span className="text-[10px] text-slate-400">{accept}</span>
        )}
      </div>

      <div
        className={`relative flex items-center justify-between rounded-xl border p-3.5 transition-all ${
          isUploaded
            ? 'border-emerald-300 bg-emerald-50/50 dark:border-emerald-800/60 dark:bg-emerald-950/20'
            : 'border-dashed border-slate-300 bg-slate-50/70 hover:border-brand-400 hover:bg-brand-50/30 dark:border-white/20 dark:bg-white/[0.02]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`grid h-9 w-9 place-items-center rounded-lg ${
              isUploaded
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                : 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'
            }`}
          >
            <UploadCloud size={18} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {fileName || 'Pilih dokumen untuk diunggah (simulasi)'}
            </p>
            <p className="text-[10px] text-slate-400">
              {fileSize ? `${fileSize} · Dokumen siap diverifikasi` : accept}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onUploadMock}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
            isUploaded
              ? 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200'
              : 'bg-brand-500 text-white shadow-sm hover:bg-brand-600'
          }`}
        >
          {isUploaded ? 'Ganti File' : 'Unggah'}
        </button>
      </div>

      {error && (
        <p className="flex items-center gap-1 text-[11px] text-rose-500">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  )
}
