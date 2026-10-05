import { NextResponse } from "next/server";
import { authenticate, createSession } from "@/lib/auth";
import { apiError, readJson, zodError } from "@/lib/api";
import { loginSchema } from "@/lib/validations";

export const runtime = "nodejs";

// Basic in-memory throttle (per instance). Slows brute force; pair with Vercel firewall rules for stronger limits.
const attempts = new Map<string, { n: number; until: number }>();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const rec = attempts.get(ip);
  if (rec && rec.until > now && rec.n >= 5) {
    return apiError("Too many attempts. Please wait a few minutes and try again.", 429);
  }

  const parsed = loginSchema.safeParse(await readJson(req));
  if (!parsed.success) return zodError(parsed.error);

  try {
    const session = await authenticate(parsed.data.email, parsed.data.password);
    if (!session) {
      const n = rec && rec.until > now ? rec.n + 1 : 1;
      attempts.set(ip, { n, until: now + 10 * 60 * 1000 });
      return apiError("Invalid email or password.", 401);
    }
    attempts.delete(ip);
    await createSession(session);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[login]", e);
    return apiError("Login is unavailable. Check the server configuration.", 500);
  }
}
