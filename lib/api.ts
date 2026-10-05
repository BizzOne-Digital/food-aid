import "server-only";
import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import type { ZodError } from "zod";
import { getSession } from "./auth";

export function apiError(message: string, status = 400, extra?: Record<string, unknown>) {
  return NextResponse.json({ success: false, error: message, ...extra }, { status });
}

export function zodError(err: ZodError) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".");
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return apiError("Please check the highlighted fields.", 422, { fieldErrors });
}

/** Returns a 401 response when there is no admin session, otherwise null. */
export async function requireAdmin() {
  return (await getSession()) ? null : apiError("Unauthorized", 401);
}

export async function readJson(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

export function validId(id: string) {
  return isValidObjectId(id);
}

/** Converts Mongo docs into plain JSON-safe objects for Client Components. */
export function serialize<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc));
}
