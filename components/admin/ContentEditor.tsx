"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoaderCircle, Plus, Save, Trash2 } from "lucide-react";
import { ICON_NAMES } from "@/components/ui/Icon";
import type { UploadFolder } from "@/lib/upload-constants";
import { ImageUploadField } from "./ImageUploadField";
import { Panel, SelectInput, TextInput, Toggle } from "./fields";

/** Declarative field config so one editor handles Home, About and Settings. */
export type FieldDef =
  | { key: string; label: string; type: "text" | "textarea"; hint?: string; rows?: number }
  | { key: string; label: string; type: "image"; folder?: UploadFolder; hint?: string }
  | { key: string; label: string; type: "toggle" }
  | { key: string; label: string; type: "stringList"; hint?: string }
  | { key: string; label: string; type: "objectList"; fields: { key: string; label: string; icon?: boolean; textarea?: boolean }[]; fixed?: boolean }
  | { key: string; label: string; type: "group"; fields: FieldDef[] };

export type SectionDef = { title: string; description?: string; fields: FieldDef[] };

type Data = Record<string, unknown>;

function FieldRenderer({ def, value, onChange }: { def: FieldDef; value: unknown; onChange: (v: unknown) => void }) {
  switch (def.type) {
    case "text":
    case "textarea":
      return (
        <TextInput
          label={def.label}
          value={String(value ?? "")}
          onChange={onChange}
          textarea={def.type === "textarea"}
          rows={def.rows ?? 3}
          hint={def.hint}
        />
      );
    case "image":
      return <ImageUploadField label={def.label} folder={def.folder ?? "pages"} value={String(value ?? "")} onChange={onChange} hint={def.hint} />;
    case "toggle":
      return <Toggle label={def.label} checked={Boolean(value)} onChange={onChange} />;
    case "stringList": {
      const list = Array.isArray(value) ? (value as string[]) : [];
      return (
        <div>
          <p className="field-label">{def.label}</p>
          <div className="space-y-2">
            {list.map((v, i) => (
              <div key={i} className="flex gap-2">
                <input
                  aria-label={`${def.label} ${i + 1}`}
                  value={v}
                  onChange={(e) => onChange(list.map((x, j) => (j === i ? e.target.value : x)))}
                  className="field py-2.5 text-sm"
                />
                <button type="button" aria-label="Remove item" onClick={() => onChange(list.filter((_, j) => j !== i))} className="btn px-3 text-muted ring-1 ring-line hover:text-brand">
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => onChange([...list, ""])} className="btn mt-2 px-3 py-2 text-[13px] text-brand ring-1 ring-line hover:bg-brand-50">
            <Plus className="h-4 w-4" aria-hidden /> Add item
          </button>
        </div>
      );
    }
    case "objectList": {
      const list = Array.isArray(value) ? (value as Data[]) : [];
      return (
        <div>
          <p className="field-label">{def.label}</p>
          <div className="space-y-3">
            {list.map((item, i) => (
              <div key={i} className="grid gap-3 rounded-xl bg-soft p-4 sm:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
                {def.fields.map((f) =>
                  f.icon ? (
                    <SelectInput
                      key={f.key}
                      label={f.label}
                      value={String(item[f.key] ?? "")}
                      options={ICON_NAMES}
                      onChange={(v) => onChange(list.map((x, j) => (j === i ? { ...x, [f.key]: v } : x)))}
                    />
                  ) : (
                    <TextInput
                      key={f.key}
                      label={f.label}
                      textarea={f.textarea}
                      rows={2}
                      value={String(item[f.key] ?? "")}
                      onChange={(v) => onChange(list.map((x, j) => (j === i ? { ...x, [f.key]: v } : x)))}
                    />
                  )
                )}
                {!def.fixed && (
                  <button type="button" onClick={() => onChange(list.filter((_, j) => j !== i))} className="btn self-end px-3 py-2 text-[13px] text-muted ring-1 ring-line hover:text-brand">
                    <Trash2 className="h-4 w-4" aria-hidden /> Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          {!def.fixed && (
            <button
              type="button"
              onClick={() => onChange([...list, Object.fromEntries(def.fields.map((f) => [f.key, f.icon ? "Heart" : ""]))])}
              className="btn mt-2 px-3 py-2 text-[13px] text-brand ring-1 ring-line hover:bg-brand-50"
            >
              <Plus className="h-4 w-4" aria-hidden /> Add item
            </button>
          )}
        </div>
      );
    }
    case "group": {
      const obj = (value && typeof value === "object" ? value : {}) as Data;
      return (
        <fieldset className="grid gap-4 rounded-xl border border-line p-4">
          <legend className="px-1 text-sm font-bold text-ink">{def.label}</legend>
          {def.fields.map((f) => (
            <FieldRenderer key={f.key} def={f} value={obj[f.key]} onChange={(v) => onChange({ ...obj, [f.key]: v })} />
          ))}
        </fieldset>
      );
    }
  }
}

export function ContentEditor({ endpoint, sections, saveLabel = "Save Changes" }: { endpoint: string; sections: SectionDef[]; saveLabel?: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setData(null);
    setDirty(false);
    fetch(endpoint)
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || "Failed to load");
        setData(j.data);
      })
      .catch((e) => toast.error(e.message));
  }, [endpoint]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const update = (key: string, v: unknown) => {
    setData((d) => (d ? { ...d, [key]: v } : d));
    setDirty(true);
  };

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch(endpoint, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data }) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Save failed");
      setData(j.data);
      setDirty(false);
      toast.success("Changes saved and published");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (!data)
    return (
      <div className="flex justify-center py-20" role="status">
        <LoaderCircle className="h-8 w-8 animate-spin text-brand" aria-hidden />
        <span className="sr-only">Loading</span>
      </div>
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
      className="space-y-6 pb-24"
    >
      {sections.map((s) => (
        <Panel key={s.title} title={s.title} description={s.description}>
          {s.fields.map((f) => (
            <FieldRenderer key={f.key} def={f} value={data[f.key]} onChange={(v) => update(f.key, v)} />
          ))}
        </Panel>
      ))}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 py-3 backdrop-blur lg:left-64">
        <div className="flex items-center justify-end gap-3">
          {dirty && <span className="text-sm font-medium text-brand">Unsaved changes</span>}
          <button type="submit" disabled={saving || !dirty} className="btn-primary">
            {saving ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> : <Save className="h-4 w-4" aria-hidden />}
            {saving ? "Saving..." : saveLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
