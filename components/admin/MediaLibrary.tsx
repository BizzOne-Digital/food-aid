"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Copy, LoaderCircle, Trash2, Upload } from "lucide-react";
import { ALLOWED_MIME, MAX_UPLOAD_BYTES, UPLOAD_FOLDERS, type UploadFolder } from "@/lib/upload-constants";
import { formatBytes, formatDate } from "./fields";
import { Pagination } from "./Pagination";

type Item = { _id: string; folder: string; filename: string; mimeType: string; size: number; createdAt: string; url: string };

export function MediaLibrary() {
  const [folder, setFolder] = useState<"" | UploadFolder>("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ items: Item[]; pages: number; total: number } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadFolder, setUploadFolder] = useState<UploadFolder>("gallery");
  const input = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const q = new URLSearchParams({ page: String(page), ...(folder ? { folder } : {}) });
    const res = await fetch(`/api/admin/media?${q}`);
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return toast.error(json.error || "Failed to load media");
    setData(json);
  }, [page, folder]);
  useEffect(() => {
    load();
  }, [load]);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    let ok = 0;
    for (const file of Array.from(files)) {
      if (!ALLOWED_MIME[file.type]) {
        toast.error(`${file.name}: unsupported type`);
        continue;
      }
      if (file.size > MAX_UPLOAD_BYTES) {
        toast.error(`${file.name}: larger than 8MB`);
        continue;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", uploadFolder);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) ok++;
      else toast.error(`${file.name}: ${(await res.json().catch(() => ({}))).error || "upload failed"}`);
    }
    setUploading(false);
    if (input.current) input.current.value = "";
    if (ok) {
      toast.success(`${ok} image${ok > 1 ? "s" : ""} uploaded`);
      setPage(1);
      load();
    }
  };

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied");
    } catch {
      toast.error("Could not copy");
    }
  };

  const remove = async (item: Item) => {
    if (!confirm(`Delete ${item.filename}? Any page, service or testimonial still using it will show a placeholder.`)) return;
    const res = await fetch(`/api/admin/media?id=${item._id}`, { method: "DELETE" });
    if (!res.ok) return toast.error("Delete failed");
    toast.success("Image deleted");
    load();
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by folder">
          {(["", ...UPLOAD_FOLDERS] as const).map((f) => (
            <button
              key={f || "all"}
              type="button"
              role="tab"
              aria-selected={folder === f}
              onClick={() => {
                setFolder(f);
                setPage(1);
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition ${folder === f ? "bg-ink text-white" : "bg-soft text-ink hover:bg-line"}`}
            >
              {f || "All"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="upload-folder" className="sr-only">
            Upload folder
          </label>
          <select id="upload-folder" value={uploadFolder} onChange={(e) => setUploadFolder(e.target.value as UploadFolder)} className="rounded-lg border border-line px-3 py-2 text-sm capitalize">
            {UPLOAD_FOLDERS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <input ref={input} type="file" multiple accept="image/png,image/jpeg,image/webp,image/gif" className="sr-only" onChange={(e) => upload(e.target.files)} aria-label="Choose images to upload" />
          <button type="button" onClick={() => input.current?.click()} disabled={uploading} className="btn-primary px-4 py-2">
            {uploading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> : <Upload className="h-4 w-4" aria-hidden />}
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {!data ? (
        <div className="flex justify-center py-20" role="status">
          <LoaderCircle className="h-8 w-8 animate-spin text-brand" aria-hidden />
        </div>
      ) : data.items.length === 0 ? (
        <p className="rounded-2xl border border-line bg-white p-10 text-center text-muted">No images in this folder yet.</p>
      ) : (
        <>
          <p className="mb-3 text-sm text-muted">{data.total} image{data.total === 1 ? "" : "s"}</p>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
            {data.items.map((m) => (
              <li key={m._id} className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
                <div className="relative aspect-square bg-soft">
                  <Image src={m.url} alt={m.filename} fill sizes="240px" className="object-cover" />
                </div>
                <div className="p-3 text-xs">
                  <p className="truncate font-semibold text-ink" title={m.filename}>
                    {m.filename}
                  </p>
                  <p className="mt-0.5 text-muted">
                    <span className="capitalize">{m.folder}</span> &middot; {formatBytes(m.size)}
                  </p>
                  <p className="text-muted">{formatDate(m.createdAt)}</p>
                  <div className="mt-2 flex gap-1.5">
                    <button type="button" onClick={() => copy(m.url)} className="btn flex-1 px-2 py-1.5 text-xs ring-1 ring-line hover:bg-soft">
                      <Copy className="h-3.5 w-3.5" aria-hidden /> Copy URL
                    </button>
                    <button type="button" onClick={() => remove(m)} aria-label={`Delete ${m.filename}`} className="btn px-2 py-1.5 text-muted ring-1 ring-line hover:text-brand">
                      <Trash2 className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Pagination page={page} pages={data.pages} onChange={setPage} />
        </>
      )}
    </>
  );
}
