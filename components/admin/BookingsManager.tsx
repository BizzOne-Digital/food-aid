"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ChevronDown, LoaderCircle, Mail, MapPin, Phone, Trash2 } from "lucide-react";
import { BOOKING_STATUSES } from "@/lib/validations";
import { StatusBadge, formatDate } from "./fields";
import { Pagination } from "./Pagination";

type Booking = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  address: string;
  city: string;
  postalCode: string;
  mobilityNotes: string;
  notes: string;
  status: string;
  createdAt: string;
};

export function BookingsManager({ initialStatus }: { initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ items: Booking[]; pages: number; total: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q = new URLSearchParams({ page: String(page), ...(status ? { status } : {}) });
      const res = await fetch(`/api/bookings?${q}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load bookings");
      setData(json);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [page, status]);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = async (id: string, next: string) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Update failed");
      setData((d) => d && { ...d, items: d.items.map((b) => (b._id === id ? { ...b, status: next } : b)) });
      toast.success(`Status changed to ${next}`);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this booking permanently?")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error || "Delete failed");
      toast.success("Booking deleted");
      load();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Filter by status">
        {["", ...BOOKING_STATUSES].map((s) => (
          <button
            key={s || "all"}
            type="button"
            role="tab"
            aria-selected={status === s}
            onClick={() => {
              setStatus(s);
              setPage(1);
            }}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${status === s ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-line hover:ring-ink"}`}
          >
            {s || "All"}
          </button>
        ))}
      </div>

      {loading && !data ? (
        <div className="flex justify-center py-20" role="status">
          <LoaderCircle className="h-8 w-8 animate-spin text-brand" aria-hidden />
          <span className="sr-only">Loading</span>
        </div>
      ) : error ? (
        <p className="rounded-xl bg-brand-50 p-5 text-brand-dark" role="alert">
          {error}
        </p>
      ) : data && data.items.length === 0 ? (
        <p className="rounded-2xl border border-line bg-white p-10 text-center text-muted">No bookings found.</p>
      ) : (
        <ul className={`space-y-3 ${loading ? "opacity-60" : ""}`}>
          {data?.items.map((b) => {
            const open = openId === b._id;
            return (
              <li key={b._id} className="rounded-2xl border border-line bg-white shadow-card">
                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : b._id)}
                    aria-expanded={open}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <ChevronDown className={`h-5 w-5 shrink-0 text-muted transition ${open ? "rotate-180" : ""}`} aria-hidden />
                    <span className="min-w-0">
                      <span className="block font-bold text-ink">{b.name}</span>
                      <span className="block truncate text-sm text-muted">
                        {b.service} &middot; {b.preferredDate} &middot; {b.preferredTime}
                      </span>
                    </span>
                  </button>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={b.status} />
                    <label className="sr-only" htmlFor={`st-${b._id}`}>
                      Change status
                    </label>
                    <select
                      id={`st-${b._id}`}
                      value={b.status}
                      disabled={busyId === b._id}
                      onChange={(e) => updateStatus(b._id, e.target.value)}
                      className="rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium"
                    >
                      {BOOKING_STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => remove(b._id)}
                      disabled={busyId === b._id}
                      aria-label={`Delete booking from ${b.name}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-brand-50 hover:text-brand"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </div>
                {open && (
                  <div className="grid gap-5 border-t border-line p-5 text-sm sm:grid-cols-2">
                    <div className="space-y-2">
                      <a href={`mailto:${b.email}`} className="flex items-center gap-2 text-ink hover:text-brand">
                        <Mail className="h-4 w-4 text-brand" aria-hidden /> {b.email}
                      </a>
                      <a href={`tel:${b.phone}`} className="flex items-center gap-2 text-ink hover:text-brand">
                        <Phone className="h-4 w-4 text-brand" aria-hidden /> {b.phone}
                      </a>
                      <p className="flex items-start gap-2 text-ink">
                        <MapPin className="mt-0.5 h-4 w-4 text-brand" aria-hidden />
                        {b.address}, {b.city} {b.postalCode}
                      </p>
                      <p className="text-xs text-muted">Submitted {formatDate(b.createdAt, true)}</p>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted">Mobility Notes</p>
                        <p className="mt-1 whitespace-pre-line text-ink">{b.mobilityNotes || "None"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted">Additional Notes</p>
                        <p className="mt-1 whitespace-pre-line text-ink">{b.notes || "None"}</p>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {data && <Pagination page={page} pages={data.pages} onChange={setPage} />}
    </div>
  );
}
