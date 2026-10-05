import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { apiError, readJson, requireAdmin, validId, zodError } from "@/lib/api";
import { ContactMessage } from "@/models/ContactMessage";

export const runtime = "nodejs";
type Ctx = { params: Promise<{ id: string }> };

/** Admin: mark read/unread. */
export async function PATCH(req: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  if (!validId(id)) return apiError("Invalid id", 400);
  const parsed = z.object({ isRead: z.boolean() }).safeParse(await readJson(req));
  if (!parsed.success) return zodError(parsed.error);
  await connectDB();
  const doc = await ContactMessage.findByIdAndUpdate(id, parsed.data, { new: true }).lean();
  if (!doc) return apiError("Message not found", 404);
  return NextResponse.json({ success: true, item: doc });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  if (!validId(id)) return apiError("Invalid id", 400);
  await connectDB();
  const res = await ContactMessage.findByIdAndDelete(id);
  if (!res) return apiError("Message not found", 404);
  return NextResponse.json({ success: true });
}
