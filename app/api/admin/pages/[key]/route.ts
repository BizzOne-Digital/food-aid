import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { apiError, readJson, requireAdmin } from "@/lib/api";
import { shapeLike } from "@/lib/sanitize";
import { cleanupReplacedImages } from "@/lib/uploads";
import { defaultAbout, defaultHome } from "@/lib/defaults";
import { PageContent } from "@/models/PageContent";

export const runtime = "nodejs";
type Ctx = { params: Promise<{ key: string }> };

const TEMPLATES = { home: defaultHome, about: defaultAbout } as const;
type Key = keyof typeof TEMPLATES;
const isKey = (k: string): k is Key => k in TEMPLATES;

export async function GET(_req: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { key } = await params;
  if (!isKey(key)) return apiError("Unknown page", 404);
  await connectDB();
  const doc = await PageContent.findOne({ key }).lean();
  return NextResponse.json({ success: true, data: shapeLike(TEMPLATES[key], { ...TEMPLATES[key], ...(doc?.data ?? {}) }) });
}

export async function PUT(req: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { key } = await params;
  if (!isKey(key)) return apiError("Unknown page", 404);
  const body = (await readJson(req)) as { data?: unknown } | null;
  if (!body?.data || typeof body.data !== "object") return apiError("Missing data", 400);

  const data = shapeLike(TEMPLATES[key], body.data);
  await connectDB();
  const before = await PageContent.findOne({ key }).lean();
  await PageContent.updateOne({ key }, { $set: { data } }, { upsert: true });
  await cleanupReplacedImages(before?.data, data);
  revalidatePath("/", "layout");
  return NextResponse.json({ success: true, data });
}
