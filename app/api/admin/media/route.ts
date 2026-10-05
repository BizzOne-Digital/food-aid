import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { apiError, requireAdmin, validId } from "@/lib/api";
import { uploadUrl } from "@/lib/uploads";
import { isUploadFolder } from "@/lib/upload-constants";
import { StoredUpload } from "@/models/StoredUpload";

export const runtime = "nodejs";
const LIMIT = 24;

/** Admin: paginated media list. Binary `data` is never selected. */
export async function GET(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const url = new URL(req.url);
  const folder = url.searchParams.get("folder");
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
  const filter = isUploadFolder(folder) ? { folder } : {};
  await connectDB();
  const [docs, total] = await Promise.all([
    StoredUpload.find(filter)
      .select("_id folder filename mimeType size createdAt")
      .sort({ createdAt: -1 })
      .skip((page - 1) * LIMIT)
      .limit(LIMIT)
      .lean(),
    StoredUpload.countDocuments(filter),
  ]);
  const items = docs.map((d) => ({ ...d, _id: String(d._id), url: uploadUrl(d.folder, d.filename) }));
  return NextResponse.json({ success: true, items, total, page, pages: Math.max(1, Math.ceil(total / LIMIT)) });
}

export async function DELETE(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!validId(id)) return apiError("Invalid id", 400);
  await connectDB();
  const res = await StoredUpload.deleteOne({ _id: id });
  if (!res.deletedCount) return apiError("Image not found", 404);
  return NextResponse.json({ success: true });
}
