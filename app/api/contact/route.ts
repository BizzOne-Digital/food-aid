import { NextResponse, after } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { apiError, readJson, requireAdmin, zodError } from "@/lib/api";
import { contactSchema } from "@/lib/validations";
import { ContactMessage } from "@/models/ContactMessage";
import { sendContactEmails } from "@/lib/mailer";

export const runtime = "nodejs";

/** Public: submit a contact message. */
export async function POST(req: Request) {
  const body = await readJson(req);
  if (!body || typeof body !== "object") return apiError("Invalid request body.", 400);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return zodError(parsed.error);
  try {
    await connectDB();
    const doc = await ContactMessage.create(parsed.data);
    after(() => sendContactEmails(parsed.data));
    return NextResponse.json({ success: true, id: String(doc._id) }, { status: 201 });
  } catch (e) {
    console.error("[contact] create failed", e);
    return apiError("We could not send your message right now. Please call or email us directly.", 500);
  }
}

/** Admin: list messages. */
export async function GET(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const page = Math.max(1, Number(new URL(req.url).searchParams.get("page")) || 1);
  const limit = 20;
  await connectDB();
  const [items, total] = await Promise.all([
    ContactMessage.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    ContactMessage.countDocuments(),
  ]);
  return NextResponse.json({ success: true, items, total, page, pages: Math.ceil(total / limit) });
}
