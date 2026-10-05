// Edge-safe session token helpers (used by proxy.ts and lib/auth.ts).
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "fal_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

export type Session = { sub: string; email: string };

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("SESSION_SECRET must be set (min 32 characters)");
  return new TextEncoder().encode(s);
}

export async function signSession(user: Session) {
  return new SignJWT({ email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secret());
}

export async function verifySessionToken(token?: string): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] });
    return { sub: String(payload.sub), email: String(payload.email) };
  } catch {
    return null;
  }
}
