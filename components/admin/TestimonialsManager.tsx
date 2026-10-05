"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, LoaderCircle, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { Initials, Stars } from "@/components/ui/Stars";
import type { TestimonialData } from "@/lib/defaults";
import { ImageUploadField } from "./ImageUploadField";
import { Modal } from "./Modal";
import { SelectInput, TextInput, Toggle } from "./fields";

type T = TestimonialData & { _id?: string };
const EMPTY: T = { clientName: "", location: "Calgary, AB", rating: 5, review: "", image: "", isPublished: true, sortOrder: 0 };

export function TestimonialsManager({ openNew }: { openNew?: boolean }) {
  const [items, setItems] = useState<T[] | null>(null);
  const [editing, setEditing] = useState<T | null>(openNew ? EMPTY : null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/testimonials");
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return toast.error(json.error || "Failed to load testimonials");
    setItems(json.items);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const set = <K extends keyof T>(k: K, v: T[K]) => setEditing((e) => (e ? { ...e, [k]: v } : e));

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    setErrors({});
    try {
      const { _id, ...body } = editing;
      const res = await fetch(_id ? `/api/admin/testimonials/${_id}` : "/api/admin/testimonials", {
        method: _id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(json.fieldErrors ?? {});
        throw new Error(json.error || "Save failed");
      }
      toast.success("Testimonial saved");
      setEditing(null);
      load();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (t: T) => {
    const res = await fetch(`/api/admin/testimonials/${t._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !t.isPublished }),
    });
    if (!res.ok) return toast.error("Update failed");
    toast.success(t.isPublished ? "Unpublished" : "Published");
    setItems((list) => list?.map((x) => (x._id === t._id ? { ...x, isPublished: !t.isPublished } : x)) ?? null);
  };

  const remove = async (t: T) => {
    if (!confirm(`Delete the testimonial from ${t.clientName}?`)) return;
    const res = await fetch(`/api/admin/testimonials/${t._id}`, { method: "DELETE" });
    if (!res.ok) return toast.error("Delete failed");
    toast.success("Testimonial deleted");
    load();
  };

  return (
    <>
      <div className="mb-5 flex justify-end">
        <button type="button" className="btn-primary" onClick={() => setEditing({ ...EMPTY, sortOrder: (items?.length ?? 0) + 1 })}>
          <Plus className="h-4 w-4" aria-hidden /> Add Testimonial
        </button>
      </div>

      {!items ? (
        <div className="flex justify-center py-20" role="status">
          <LoaderCircle className="h-8 w-8 animate-spin text-brand" aria-hidden />
        </div>
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-line bg-white p-10 text-center text-muted">No testimonials yet.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((t) => (
            <li key={t._id} className={`flex flex-col rounded-2xl border bg-white p-5 shadow-card ${t.isPublished ? "border-line" : "border-dashed border-[#ccc] opacity-75"}`}>
              <div className="flex items-center justify-between">
                <Stars rating={t.rating} />
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${t.isPublished ? "bg-emerald-50 text-emerald-800" : "bg-neutral-100 text-neutral-600"}`}>
                  {t.isPublished ? "Published" : "Hidden"}
                </span>
              </div>
              <p className="mt-3 line-clamp-4 flex-1 text-sm text-ink/80">&ldquo;{t.review}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                <Initials name={t.clientName} className="h-9 w-9 text-xs" />
                <span className="text-sm">
                  <span className="block font-bold text-ink">{t.clientName}</span>
                  <span className="text-muted">{t.location}</span>
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button type="button" onClick={() => setEditing(t)} className="btn-outline flex-1 px-3 py-2 text-[13px]">
                  <Pencil className="h-4 w-4" aria-hidden /> Edit
                </button>
                <button type="button" onClick={() => togglePublish(t)} aria-label={t.isPublished ? "Unpublish" : "Publish"} className="btn px-3 py-2 ring-1 ring-line hover:bg-soft">
                  {t.isPublished ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
                </button>
                <button type="button" onClick={() => remove(t)} aria-label={`Delete testimonial from ${t.clientName}`} className="btn px-3 py-2 text-muted ring-1 ring-line hover:text-brand">
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal open={!!editing} title={editing?._id ? "Edit Testimonial" : "Add Testimonial"} onClose={() => setEditing(null)}>
        {editing && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
            className="grid gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput label="Client Name" value={editing.clientName} error={errors.clientName} onChange={(v) => set("clientName", v)} hint="Use first name and initial for privacy" />
              <TextInput label="Location" value={editing.location} onChange={(v) => set("location", v)} />
              <SelectInput label="Rating" value={String(editing.rating)} options={["5", "4", "3", "2", "1"]} onChange={(v) => set("rating", Number(v))} />
              <TextInput label="Sort Order" type="number" value={String(editing.sortOrder)} onChange={(v) => set("sortOrder", Number(v) || 0)} />
            </div>
            <TextInput label="Review" textarea rows={4} value={editing.review} error={errors.review} onChange={(v) => set("review", v)} />
            <ImageUploadField label="Avatar (optional)" folder="gallery" aspect="aspect-square" value={editing.image} onChange={(v) => set("image", v)} hint="Only upload with the client's permission. Initials are shown otherwise." />
            <Toggle label="Published" checked={editing.isPublished} onChange={(v) => set("isPublished", v)} />
            <div className="flex justify-end gap-2 border-t border-line pt-5">
              <button type="button" className="btn px-5 ring-1 ring-line" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> : <Save className="h-4 w-4" aria-hidden />}
                {saving ? "Saving..." : "Save Testimonial"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
