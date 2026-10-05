"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (p: number) => void }) {
  if (pages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="mt-6 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-line disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
      </button>
      <span className="text-sm font-semibold text-ink">
        Page {page} of {pages}
      </span>
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= pages}
        aria-label="Next page"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-line disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" aria-hidden />
      </button>
    </nav>
  );
}
