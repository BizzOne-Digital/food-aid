import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { readJson, requireAdmin, zodError } from "@/lib/api";
import { testimonialSchema } from "@/lib/validations";
import { Testimonial } from "@/models/Testimonial";

export const runtime = "nodejs";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  await connectDB();
  const items = await Testimonial.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
  return NextResponse.json({ success: true, items });
}

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const parsed = testimonialSchema.safeParse(await readJson(req));
  if (!parsed.success) return zodError(parsed.error);
  await connectDB();
  const item = await Testimonial.create(parsed.data);
  revalidatePath("/", "layout");
  return NextResponse.json({ success: true, item }, { status: 201 });
}
