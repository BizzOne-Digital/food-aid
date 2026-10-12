import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { apiError, readJson, requireAdmin, validId, zodError } from "@/lib/api";
import { serviceSchema } from "@/lib/validations";
import { cleanupReplacedImages, deleteStoredUploadByUrl } from "@/lib/uploads";
import { Service } from "@/models/Service";

export const runtime = "nodejs";
type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  if (!validId(id)) return apiError("Invalid id", 400);
  const parsed = serviceSchema.safeParse(await readJson(req));
  if (!parsed.success) return zodError(parsed.error);
  await connectDB();
  const before = await Service.findById(id).lean();
  if (!before) return apiError("Service not found", 404);
  if (await Service.exists({ slug: parsed.data.slug, _id: { $ne: id } })) {
    return apiError("A service with this slug already exists.", 409, { fieldErrors: { slug: "Slug already in use" } });
  }
  const item = await Service.findByIdAndUpdate(id, parsed.data, { new: true }).lean();
  // Old image is removed only after the content update succeeded.
  await cleanupReplacedImages(
    [before.imageUrl, before.beforeImage, before.afterImage],
    [item?.imageUrl, item?.beforeImage, item?.afterImage]
  );
  revalidatePath("/", "layout");
  return NextResponse.json({ success: true, item });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  if (!validId(id)) return apiError("Invalid id", 400);
  await connectDB();
  const doc = await Service.findByIdAndDelete(id).lean();
  if (!doc) return apiError("Service not found", 404);
  await Promise.all([doc.imageUrl, doc.beforeImage, doc.afterImage].map((u) => deleteStoredUploadByUrl(u)));
  revalidatePath("/", "layout");
  return NextResponse.json({ success: true });
}
