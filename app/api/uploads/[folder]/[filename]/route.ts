import { connectDB } from "@/lib/mongodb";
import { isSafeFilename } from "@/lib/uploads";
import { isUploadFolder } from "@/lib/upload-constants";
import { StoredUpload } from "@/models/StoredUpload";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ folder: string; filename: string }> };

/** Public: serve an image stored in MongoDB. Filenames are unique, so caching is immutable. */
export async function GET(_req: Request, { params }: Ctx) {
  const { folder, filename } = await params;
  if (!isUploadFolder(folder) || !isSafeFilename(filename)) {
    return new Response("Not found", { status: 404 });
  }

  await connectDB();
  // Not lean: hydrated docs give a real Buffer for `data`.
  const doc = await StoredUpload.findOne({ folder, filename }).select("mimeType size data");
  if (!doc) return new Response("Not found", { status: 404 });
  const bytes = new Uint8Array(doc.data);

  return new Response(bytes, {
    status: 200,
    headers: {
      "Content-Type": doc.mimeType,
      "Content-Length": String(bytes.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'",
    },
  });
}
