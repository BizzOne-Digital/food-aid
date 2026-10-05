import type { ReactNode } from "react";

/** Label + control + inline error, wired up for screen readers. */
export function Field({
  id,
  label,
  error,
  required,
  hint,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <span className="text-brand" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function fieldA11y(id: string, error?: string) {
  return {
    id,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
}

/** Maps server-side fieldErrors onto react-hook-form. */
export function applyServerErrors(
  fieldErrors: Record<string, string> | undefined,
  setError: (name: never, e: { type: string; message: string }) => void
) {
  if (!fieldErrors) return;
  for (const [k, message] of Object.entries(fieldErrors)) setError(k as never, { type: "server", message });
}
