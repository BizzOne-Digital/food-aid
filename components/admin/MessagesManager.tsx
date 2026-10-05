"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ChevronDown, LoaderCircle, Mail, MailOpen, Phone, Trash2 } from "lucide-react";
import { formatDate } from "./fields";
import { Pagination } from "./Pagination";

type Msg = { _id: string; name: string; email: string; phone: string; subject: string; message: string; isRead: boolean; createdAt: string };

export function MessagesManager() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ items: Msg[]; pages: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch(`/api/contact?page=${page}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load messages");
      setData(json);
    } catch (e) {
      setError((e as Error).message);
    }
  }, [page]);

  useEffect(() => {
    load();
  }, [load]);

  const setRead = async (id: string, isRead: boolean) => {
    const res = await fetch(`/api/contact/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead }),
    });
    if (!res.ok) return toast.error("Could not update message");
    setData((d) => d && { ...d, items: d.items.map((m) => (m._id === id ? { ...m, isRead } : m)) });
  };

  const toggle = (m: Msg) => {
    const next = openId === m._id ? null : m._id;
    setOpenId(next);
    if (next && !m.isRead) setRead(m._id, true);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this message permanently?")) return;
    const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
    if (!res.ok) return toast.error("Could not delete message");
    toast.success("Message deleted");
    load();
  };

  if (error)
    return (
      <p className="rounded-xl bg-brand-50 p-5 text-brand-dark" role="alert">
        {error}
      </p>
    );
  if (!data)
    return (
      <div className="flex justify-center py-20" role="status">
        <LoaderCircle className="h-8 w-8 animate-spin text-brand" aria-hidden />
        <span className="sr-only">Loading</span>
      </div>
    );
  if (data.items.length === 0) return <p className="rounded-2xl border border-line bg-white p-10 text-center text-muted">No messages yet.</p>;

  return (
    <>
      <ul className="space-y-3">
        {data.items.map((m) => {
          const open = openId === m._id;
          return (
            <li key={m._id} className={`rounded-2xl border bg-white shadow-card ${m.isRead ? "border-line" : "border-brand/40"}`}>
              <div className="flex items-center gap-3 p-4 sm:p-5">
                <button type="button" onClick={() => toggle(m)} aria-expanded={open} className="flex min-w-0 flex-1 items-center gap-3 text-left">
                  <ChevronDown className={`h-5 w-5 shrink-0 text-muted transition ${open ? "rotate-180" : ""}`} aria-hidden />
                  {!m.isRead && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand" aria-label="Unread" />}
                  <span className="min-w-0">
                    <span className={`block truncate ${m.isRead ? "font-semibold" : "font-extrabold"} text-ink`}>{m.subject}</span>
                    <span className="block truncate text-sm text-muted">
                      {m.name} &middot; {formatDate(m.createdAt, true)}
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRead(m._id, !m.isRead)}
                  aria-label={m.isRead ? "Mark as unread" : "Mark as read"}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-soft hover:text-ink"
                >
                  {m.isRead ? <Mail className="h-4 w-4" aria-hidden /> : <MailOpen className="h-4 w-4" aria-hidden />}
                </button>
                <button
                  type="button"
                  onClick={() => remove(m._id)}
                  aria-label={`Delete message from ${m.name}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-brand-50 hover:text-brand"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              </div>
              {open && (
                <div className="border-t border-line p-5 text-sm">
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`} className="flex items-center gap-2 font-semibold text-ink hover:text-brand">
                      <Mail className="h-4 w-4 text-brand" aria-hidden /> {m.email}
                    </a>
                    {m.phone && (
                      <a href={`tel:${m.phone}`} className="flex items-center gap-2 font-semibold text-ink hover:text-brand">
                        <Phone className="h-4 w-4 text-brand" aria-hidden /> {m.phone}
                      </a>
                    )}
                  </div>
                  <p className="mt-4 whitespace-pre-line leading-relaxed text-ink">{m.message}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <Pagination page={page} pages={data.pages} onChange={setPage} />
    </>
  );
}
