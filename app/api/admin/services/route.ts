import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { apiError, readJson, requireAdmin, zodError } from "@/lib/api";
import { serviceSchema } from "@/lib/validations";
import { Service } from "@/models/Service";

export const runtime = "nodejs";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  await connectDB();
  const items = await Service.find().sort({ sortOrder: 1, createdAt: 1 }).lean();
  return NextResponse.json({ success: true, items });
}

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const parsed = serviceSchema.safeParse(await readJson(req));
  if (!parsed.success) return zodError(parsed.error);
  await connectDB();
  if (await Service.exists({ slug: parsed.data.slug })) return apiError("A service with this slug already exists.", 409, { fieldErrors: { slug: "Slug already in use" } });
  const item = await Service.create(parsed.data);
  revalidatePath("/", "layout");
  return NextResponse.json({ success: true, item }, { status: 201 });
}
