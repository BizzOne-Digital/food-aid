export const PLACEHOLDER_IMAGE = "/images/placeholder.webp";

/**
 * Resolves stored image URLs for rendering.
 * - /api/uploads/... → MongoDB-backed image, used as is
 * - /uploads/...     → legacy filesystem path, not available on serverless → placeholder
 * - empty            → placeholder
 * - external (Unsplash) and /images/... → used as is
 */
export function resolveImageUrl(url?: string | null, fallback = PLACEHOLDER_IMAGE): string {
  if (!url || typeof url !== "string") return fallback;
  const u = url.trim();
  if (!u) return fallback;
  if (u.startsWith("/api/uploads/")) return u;
  if (u.startsWith("/uploads/")) return PLACEHOLDER_IMAGE;
  if (u.startsWith("/") || u.startsWith("https://images.unsplash.com/")) return u;
  return fallback;
}
