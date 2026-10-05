import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { apiError, readJson, requireAdmin } from "@/lib/api";
import { shapeLike } from "@/lib/sanitize";
import { cleanupReplacedImages } from "@/lib/uploads";
import { defaultSettings } from "@/lib/defaults";
import { SiteSettings } from "@/models/SiteSettings";

export const runtime = "nodejs";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  await connectDB();
  const doc = await SiteSettings.findOne({ key: "site" }).lean();
  return NextResponse.json({ success: true, data: shapeLike(defaultSettings, { ...defaultSettings, ...(doc?.data ?? {}) }) });
}

export async function PUT(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = (await readJson(req)) as { data?: unknown } | null;
  if (!body?.data || typeof body.data !== "object") return apiError("Missing data", 400);
  const data = shapeLike(defaultSettings, body.data);
  if (!data.businessName.trim() || !data.email.includes("@")) return apiError("Business name and a valid email are required", 422);
  await connectDB();
  const before = await SiteSettings.findOne({ key: "site" }).lean();
  await SiteSettings.updateOne({ key: "site" }, { $set: { data } }, { upsert: true });
  await cleanupReplacedImages(before?.data, data);
  revalidatePath("/", "layout");
  return NextResponse.json({ success: true, data });
}
