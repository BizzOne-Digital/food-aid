"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ImageIcon, LoaderCircle, RefreshCw, Trash2, Upload } from "lucide-react";
import { resolveImageUrl } from "@/lib/image";
import { ALLOWED_MIME, MAX_UPLOAD_BYTES, type UploadFolder } from "@/lib/upload-constants";

/**
 * Uploads to /api/upload (MongoDB-backed) and returns only the saved URL string via onChange.
 * The previous image is NOT deleted here: the server removes it after the owning content is saved,
 * so a failed upload or an unsaved form never loses the current image.
 */
export function ImageUploadField({
  label,
  value,
  onChange,
  folder = "pages",
  hint,
  aspect = "aspect-[16/10]",
  disabled,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: UploadFolder;
  hint?: string;
  aspect?: string;
  disabled?: boolean;
}) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const pick = () => input.current?.click();

  const onFile = async (file?: File) => {
    if (!file) return;
    if (!ALLOWED_MIME[file.type]) return toast.error("Please choose a PNG, JPEG, WEBP or GIF image.");
    if (file.size > MAX_UPLOAD_BYTES) return toast.error("Image must be 8MB or smaller.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    setUploading(true);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) throw new Error(data.error || "Upload failed");
      onChange(data.url as string);
      toast.success("Image uploaded. Save to apply changes.");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(false);
      if (input.current) input.current.value = "";
    }
  };

  const busy = uploading || disabled;

  return (
    <div>
      <p className="mb-1.5 text-sm font-semibold text-ink" id={`${id}-label`}>
        {label}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className={`relative w-full overflow-hidden rounded-xl border border-dashed border-[#d4d4d4] bg-soft sm:w-56 ${aspect}`}>
          {value ? (
            <Image src={resolveImageUrl(value)} alt={`${label} preview`} fill sizes="224px" className="object-cover" />
          ) : (
            <button
              type="button"
              onClick={pick}
              disabled={busy}
              className="flex h-full w-full flex-col items-center justify-center gap-1 text-muted hover:text-brand"
            >
              <ImageIcon className="h-7 w-7" aria-hidden />
              <span className="text-xs">No image</span>
            </button>
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/75" role="status">
              <LoaderCircle className="h-7 w-7 animate-spin text-brand" aria-hidden />
              <span className="sr-only">Uploading</span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            ref={input}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="sr-only"
            aria-labelledby={`${id}-label`}
            onChange={(e) => onFile(e.target.files?.[0])}
            disabled={busy}
            tabIndex={-1}
          />
          <button type="button" onClick={pick} disabled={busy} className="btn-outline px-4 py-2 text-[13px]">
            {value ? <RefreshCw className="h-4 w-4" aria-hidden /> : <Upload className="h-4 w-4" aria-hidden />}
            {uploading ? "Uploading..." : value ? "Replace" : "Upload"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              disabled={busy}
              className="btn px-4 py-2 text-[13px] text-ink ring-1 ring-line hover:bg-soft"
            >
              <Trash2 className="h-4 w-4" aria-hidden /> Remove
            </button>
          )}
          <p className="w-full text-xs text-muted">{hint ?? "PNG, JPEG, WEBP or GIF. Max 8MB."}</p>
        </div>
      </div>
    </div>
  );
}
