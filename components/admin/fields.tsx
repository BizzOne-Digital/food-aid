"use client";

import { useId } from "react";

export function TextInput({
  label,
  value,
  onChange,
  textarea,
  rows = 3,
  placeholder,
  hint,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
  hint?: string;
  error?: string;
  type?: string;
}) {
  const id = useId();
  const common = {
    id,
    value,
    placeholder,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-e` : hint ? `${id}-h` : undefined,
    className: "field py-2.5 text-sm",
  };
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {textarea ? (
        <textarea {...common} rows={rows} onChange={(e) => onChange(e.target.value)} className={`${common.className} resize-y`} />
      ) : (
        <input {...common} type={type} onChange={(e) => onChange(e.target.value)} />
      )}
      {hint && !error && (
        <p id={`${id}-h`} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-e`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 text-sm font-semibold text-ink">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-brand" : "bg-[#cfcfcf]"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? "left-[22px]" : "left-0.5"}`} />
      </button>
      {label}
    </label>
  );
}

export function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="field py-2.5 text-sm">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export function Panel({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      <div className="mt-5 grid gap-5">{children}</div>
    </section>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    New: "bg-brand-50 text-brand ring-brand/20",
    Contacted: "bg-amber-50 text-amber-800 ring-amber-200",
    Confirmed: "bg-blue-50 text-blue-800 ring-blue-200",
    Completed: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    Cancelled: "bg-neutral-100 text-neutral-600 ring-neutral-200",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${map[status] ?? map.Cancelled}`}>{status}</span>;
}

export { formatDate, formatBytes } from "@/lib/format";
