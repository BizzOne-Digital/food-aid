import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { apiError, readJson, requireAdmin, validId, zodError } from "@/lib/api";
import { testimonialSchema } from "@/lib/validations";
import { cleanupReplacedImages, deleteStoredUploadByUrl } from "@/lib/uploads";
import { Testimonial } from "@/models/Testimonial";

export const runtime = "nodejs";
type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  if (!validId(id)) return apiError("Invalid id", 400);
  const parsed = testimonialSchema.safeParse(await readJson(req));
  if (!parsed.success) return zodError(parsed.error);
  await connectDB();
  const before = await Testimonial.findById(id).lean();
  if (!before) return apiError("Testimonial not found", 404);
  const item = await Testimonial.findByIdAndUpdate(id, parsed.data, { new: true }).lean();
  await cleanupReplacedImages(before.image, item?.image);
  revalidatePath("/", "layout");
  return NextResponse.json({ success: true, item });
}

/** Quick publish/unpublish toggle. */
export async function PATCH(req: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  if (!validId(id)) return apiError("Invalid id", 400);
  const body = (await readJson(req)) as { isPublished?: unknown } | null;
  if (typeof body?.isPublished !== "boolean") return apiError("isPublished must be boolean", 400);
  await connectDB();
  const item = await Testimonial.findByIdAndUpdate(id, { isPublished: body.isPublished }, { new: true }).lean();
  if (!item) return apiError("Testimonial not found", 404);
  revalidatePath("/", "layout");
  return NextResponse.json({ success: true, item });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  if (!validId(id)) return apiError("Invalid id", 400);
  await connectDB();
  const doc = await Testimonial.findByIdAndDelete(id).lean();
  if (!doc) return apiError("Testimonial not found", 404);
  await deleteStoredUploadByUrl(doc.image);
  revalidatePath("/", "layout");
  return NextResponse.json({ success: true });
}
