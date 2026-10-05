import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { apiError, readJson, requireAdmin, validId, zodError } from "@/lib/api";
import { bookingStatusSchema } from "@/lib/validations";
import { Booking } from "@/models/Booking";

export const runtime = "nodejs";
type Ctx = { params: Promise<{ id: string }> };

/** Admin: update booking status. */
export async function PATCH(req: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  if (!validId(id)) return apiError("Invalid id", 400);
  const parsed = bookingStatusSchema.safeParse(await readJson(req));
  if (!parsed.success) return zodError(parsed.error);
  await connectDB();
  const doc = await Booking.findByIdAndUpdate(id, { status: parsed.data.status }, { new: true }).lean();
  if (!doc) return apiError("Booking not found", 404);
  return NextResponse.json({ success: true, item: doc });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  if (!validId(id)) return apiError("Invalid id", 400);
  await connectDB();
  const res = await Booking.findByIdAndDelete(id);
  if (!res) return apiError("Booking not found", 404);
  return NextResponse.json({ success: true });
}
