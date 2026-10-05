import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { apiError, readJson, requireAdmin, zodError } from "@/lib/api";
import { bookingSchema, BOOKING_STATUSES, type BookingStatus } from "@/lib/validations";
import { Booking } from "@/models/Booking";

export const runtime = "nodejs";

/** Public: create a booking request. */
export async function POST(req: Request) {
  const body = await readJson(req);
  if (!body || typeof body !== "object") return apiError("Invalid request body.", 400);
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) return zodError(parsed.error);

  const { consent: _consent, ...data } = parsed.data;
  try {
    await connectDB();
    const doc = await Booking.create({ ...data, postalCode: data.postalCode.toUpperCase(), status: "New" });
    return NextResponse.json({ success: true, id: String(doc._id) }, { status: 201 });
  } catch (e) {
    console.error("[bookings] create failed", e);
    return apiError("We could not save your request right now. Please call us or try again shortly.", 500);
  }
}

/** Admin: list bookings with optional ?status= & ?page= filters. */
export async function GET(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
  const limit = 20;
  const filter = status && (BOOKING_STATUSES as readonly string[]).includes(status) ? { status: status as BookingStatus } : {};
  await connectDB();
  const [items, total] = await Promise.all([
    Booking.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Booking.countDocuments(filter),
  ]);
  return NextResponse.json({ success: true, items, total, page, pages: Math.ceil(total / limit) });
}
