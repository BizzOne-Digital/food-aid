import { imageUrl } from "./validations";

/**
 * Shapes untrusted admin input to match a defaults template:
 * unknown keys are dropped, types must match, strings are capped,
 * and any key that looks like an image must be an uploaded/Unsplash URL.
 */
export function shapeLike<T>(template: T, input: unknown, key = ""): T {
  if (typeof template === "string") {
    if (typeof input !== "string") return template;
    const v = input.slice(0, 5000);
    if (/image|logo|favicon|avatar/i.test(key) && !imageUrl.safeParse(v).success) return template;
    // Videos: a file in /public/videos or a full https link to an MP4/WebM.
    if (/video/i.test(key) && v !== "" && !/^(\/videos\/[\w.-]+\.(mp4|webm)|https:\/\/\S+\.(mp4|webm))$/i.test(v.trim())) return template;
    return v as T;
  }
  if (typeof template === "boolean") return (typeof input === "boolean" ? input : template) as T;
  if (typeof template === "number") return (typeof input === "number" && Number.isFinite(input) ? input : template) as T;
  if (Array.isArray(template)) {
    if (!Array.isArray(input)) return template;
    const item = template[0];
    if (item === undefined) return template;
    return input.slice(0, 50).map((v) => shapeLike(item, v, key)) as T;
  }
  if (template && typeof template === "object") {
    const src = input && typeof input === "object" && !Array.isArray(input) ? (input as Record<string, unknown>) : {};
    const out: Record<string, unknown> = {};
    for (const [k, t] of Object.entries(template)) out[k] = shapeLike(t, src[k], k);
    return out as T;
  }
  return template;
}
