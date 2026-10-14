"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { LoaderCircle, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { Icon, ICON_NAMES } from "@/components/ui/Icon";
import { resolveImageUrl } from "@/lib/image";
import type { ServiceData } from "@/lib/defaults";
import { ImageUploadField } from "./ImageUploadField";
import { Modal } from "./Modal";
import { SelectInput, TextInput, Toggle } from "./fields";

type Svc = ServiceData & { _id?: string };
const EMPTY: Svc = { title: "", slug: "", imageUrl: "", beforeImage: "", afterImage: "", iconName: "Footprints", shortDescription: "", fullDescription: "", patientEducation: "", isActive: true, sortOrder: 0 };

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function ServicesManager() {
  const [items, setItems] = useState<Svc[] | null>(null);
  const [editing, setEditing] = useState<Svc | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/services");
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return toast.error(json.error || "Failed to load services");
    setItems(json.items);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const set = <K extends keyof Svc>(k: K, v: Svc[K]) => setEditing((e) => (e ? { ...e, [k]: v } : e));

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    setErrors({});
    try {
      const { _id, ...body } = editing;
      const res = await fetch(_id ? `/api/admin/services/${_id}` : "/api/admin/services", {
        method: _id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(json.fieldErrors ?? {});
        throw new Error(json.error || "Save failed");
      }
      toast.success("Service saved");
      setEditing(null);
      load();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (s: Svc) => {
    if (!s._id || !confirm(`Delete "${s.title}"? Its uploaded image will also be removed.`)) return;
    const res = await fetch(`/api/admin/services/${s._id}`, { method: "DELETE" });
    if (!res.ok) return toast.error("Delete failed");
    toast.success("Service deleted");
    load();
  };

  return (
    <>
      <div className="mb-5 flex justify-end">
        <button type="button" className="btn-primary" onClick={() => setEditing({ ...EMPTY, sortOrder: (items?.length ?? 0) + 1 })}>
          <Plus className="h-4 w-4" aria-hidden /> Add Service
        </button>
      </div>

      {!items ? (
        <div className="flex justify-center py-20" role="status">
          <LoaderCircle className="h-8 w-8 animate-spin text-brand" aria-hidden />
        </div>
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-line bg-white p-10 text-center text-muted">No services yet. Run the seed script or add one.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((s) => (
            <li key={s._id} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card">
              <div className="relative aspect-[16/9]">
                <Image src={resolveImageUrl(s.imageUrl)} alt="" fill sizes="360px" className="object-cover" />
                {!s.isActive && <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-0.5 text-xs font-semibold text-white">Hidden</span>}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <Icon name={s.iconName} className="h-5 w-5 text-brand" />
                  <h2 className="font-bold text-ink">{s.title}</h2>
                  <span className="ml-auto text-xs text-muted">#{s.sortOrder}</span>
                </div>
                <p className="mt-2 flex-1 text-sm text-muted">{s.shortDescription}</p>
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={() => setEditing(s)} className="btn-outline flex-1 px-3 py-2 text-[13px]">
                    <Pencil className="h-4 w-4" aria-hidden /> Edit
                  </button>
                  <button type="button" onClick={() => remove(s)} aria-label={`Delete ${s.title}`} className="btn px-3 py-2 text-muted ring-1 ring-line hover:text-brand">
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal open={!!editing} title={editing?._id ? "Edit Service" : "Add Service"} onClose={() => setEditing(null)}>
        {editing && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
            className="grid gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput
                label="Title"
                value={editing.title}
                error={errors.title}
                onChange={(v) => setEditing((e) => e && { ...e, title: v, slug: e._id ? e.slug : slugify(v) })}
              />
              <TextInput label="Slug" value={editing.slug} error={errors.slug} onChange={(v) => set("slug", slugify(v))} hint="Used for /services#slug" />
              <SelectInput label="Icon" value={editing.iconName} options={ICON_NAMES} onChange={(v) => set("iconName", v)} />
              <TextInput label="Sort Order" type="number" value={String(editing.sortOrder)} onChange={(v) => set("sortOrder", Number(v) || 0)} />
            </div>
            <ImageUploadField label="Image" folder="products" value={editing.imageUrl} onChange={(v) => set("imageUrl", v)} />
            <div className="grid gap-5 rounded-xl bg-soft p-4 sm:grid-cols-2">
              <p className="text-sm text-muted sm:col-span-2">
                Optional before/after photos. Use only real client results, shared with the client&apos;s permission. Shown on the Services page when both are added.
              </p>
              <ImageUploadField label="Before" folder="gallery" aspect="aspect-square" value={editing.beforeImage ?? ""} onChange={(v) => set("beforeImage", v)} />
              <ImageUploadField label="After" folder="gallery" aspect="aspect-square" value={editing.afterImage ?? ""} onChange={(v) => set("afterImage", v)} />
            </div>
            <TextInput label="Short Description" textarea rows={2} value={editing.shortDescription} error={errors.shortDescription} onChange={(v) => set("shortDescription", v)} />
            <TextInput label="Full Description" textarea rows={5} value={editing.fullDescription} error={errors.fullDescription} onChange={(v) => set("fullDescription", v)} />
            <TextInput
              label="Patient Education (optional)"
              textarea
              rows={6}
              value={editing.patientEducation ?? ""}
              error={errors.patientEducation}
              onChange={(v) => set("patientEducation", v)}
              hint="One tip per line. Shown as a Patient Education box on the Services page."
            />
            <Toggle label="Active (visible on website)" checked={editing.isActive} onChange={(v) => set("isActive", v)} />
            <div className="flex justify-end gap-2 border-t border-line pt-5">
              <button type="button" className="btn px-5 ring-1 ring-line" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> : <Save className="h-4 w-4" aria-hidden />}
                {saving ? "Saving..." : "Save Service"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
