import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { connectDB } from "./mongodb";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession, verifySessionToken, type Session } from "./session";
import { AdminUser } from "@/models/AdminUser";

export type { Session };

export async function createSession(user: Session) {
  const token = await signSession(user);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function getSession() {
  return verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
}

/** For admin Server Components: redirects to login when there is no valid session. */
export async function requireAdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

const DUMMY_HASH = "$2b$12$C6UzMDM.H6dfI/f/IKcEeO5d2bCWh4CZ2v3m3vS2bYw9Yk4V6ZQ0K";

/**
 * Validates credentials. On first login the env admin (ADMIN_EMAIL / ADMIN_PASSWORD_HASH)
 * is copied into the AdminUser collection; afterwards the DB record is used.
 */
export async function authenticate(email: string, password: string): Promise<Session | null> {
  await connectDB();
  const normalized = email.trim().toLowerCase();
  let user = await AdminUser.findOne({ email: normalized });

  if (!user) {
    const envEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    // bcrypt hashes contain "$", which .env loaders expand; the hash is stored with "\$" escapes, so normalize them here.
    const envHash = process.env.ADMIN_PASSWORD_HASH?.trim().replace(/^['"]|['"]$/g, "").replace(/\\\$/g, "$");
    if (!envEmail || !envHash || envEmail !== normalized) {
      await bcrypt.compare(password, DUMMY_HASH); // keep timing consistent
      return null;
    }
    if (!(await bcrypt.compare(password, envHash))) return null;
    user = await AdminUser.create({ email: normalized, passwordHash: envHash });
  } else if (!(await bcrypt.compare(password, user.passwordHash))) {
    return null;
  }

  user.lastLoginAt = new Date();
  await user.save();
  return { sub: String(user._id), email: user.email };
}
