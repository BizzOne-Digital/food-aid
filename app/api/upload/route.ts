import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { connectDB } from "@/lib/mongodb";
import { apiError, requireAdmin } from "@/lib/api";
import { uploadUrl } from "@/lib/uploads";
import { ALLOWED_MIME, MAX_UPLOAD_BYTES, isUploadFolder } from "@/lib/upload-constants";
import { StoredUpload } from "@/models/StoredUpload";

export const runtime = "nodejs";

/** Admin: upload an image. The binary is stored in MongoDB (StoredUpload), never on disk. */
export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return apiError("Expected multipart/form-data", 400);
  }

  const folder = form.get("folder");
  if (!isUploadFolder(folder)) return apiError("Invalid folder", 400);

  const file = form.get("file");
  if (!(file instanceof File)) return apiError("No file provided", 400);

  const ext = ALLOWED_MIME[file.type];
  if (!ext) return apiError("Only JPEG, PNG, WEBP and GIF images are allowed", 400);
  if (file.size <= 0) return apiError("File is empty", 400);
  if (file.size > MAX_UPLOAD_BYTES) return apiError("File is larger than 8MB", 413);

  const data = Buffer.from(await file.arrayBuffer());
  if (data.length > MAX_UPLOAD_BYTES) return apiError("File is larger than 8MB", 413);

  // Never trust the original filename.
  const filename = `${Date.now()}-${randomBytes(8).toString("hex")}.${ext}`;

  try {
    await connectDB();
    await StoredUpload.create({ folder, filename, mimeType: file.type, size: data.length, data });
  } catch (e) {
    console.error("[upload] save failed", e);
    return apiError("Could not save the image. Please try again.", 500);
  }

  return NextResponse.json({ success: true, url: uploadUrl(folder, filename), filename, size: data.length, folder });
}
