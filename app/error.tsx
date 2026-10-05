"use client";

import { RefreshCw } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-20">
      <div className="text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-3 text-3xl font-extrabold text-ink">We could not load this page</h1>
        <p className="mt-3 text-muted">Please try again. If the problem continues, call or email us.</p>
        <button type="button" onClick={reset} className="btn-primary mt-7">
          <RefreshCw className="h-4 w-4" aria-hidden /> Try Again
        </button>
      </div>
    </main>
  );
}
