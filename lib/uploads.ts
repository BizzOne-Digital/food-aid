import "server-only";
import { connectDB } from "./mongodb";
import { StoredUpload } from "@/models/StoredUpload";
import { FILENAME_RE, isUploadFolder, type UploadFolder } from "./upload-constants";

export function uploadUrl(folder: string, filename: string) {
  return `/api/uploads/${folder}/${filename}`;
}

export function isSafeFilename(name: string) {
  return !name.includes("..") && !name.includes("/") && !name.includes("\\") && FILENAME_RE.test(name);
}

/** Parses "/api/uploads/<folder>/<filename>" into validated parts, or null. */
export function parseUploadUrl(url: unknown): { folder: UploadFolder; filename: string } | null {
  if (typeof url !== "string" || !url.startsWith("/api/uploads/")) return null;
  const parts = url.split("?")[0].slice("/api/uploads/".length).split("/");
  if (parts.length !== 2) return null;
  const [folder, filename] = parts;
  if (!isUploadFolder(folder) || !isSafeFilename(filename)) return null;
  return { folder, filename };
}

/** Deletes the StoredUpload behind a URL. Non-upload URLs (Unsplash, placeholders) are ignored. */
export async function deleteStoredUploadByUrl(url: unknown) {
  const parsed = parseUploadUrl(url);
  if (!parsed) return false;
  await connectDB();
  const res = await StoredUpload.deleteOne(parsed);
  return res.deletedCount > 0;
}

/** Deletes uploads that were referenced before an update but are no longer referenced after it. */
export async function cleanupReplacedImages(before: unknown, after: unknown) {
  const prev = collectUploadUrls(before);
  const next = new Set(collectUploadUrls(after));
  await Promise.all(prev.filter((u) => !next.has(u)).map((u) => deleteStoredUploadByUrl(u)));
}

/** Recursively finds every "/api/uploads/..." string in an object. */
export function collectUploadUrls(value: unknown, acc: string[] = []): string[] {
  if (typeof value === "string") {
    if (value.startsWith("/api/uploads/")) acc.push(value);
  } else if (Array.isArray(value)) {
    value.forEach((v) => collectUploadUrls(v, acc));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((v) => collectUploadUrls(v, acc));
  }
  return acc;
}
