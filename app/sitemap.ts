import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { path: "", priority: 1, freq: "weekly" as const },
    { path: "/about", priority: 0.8, freq: "monthly" as const },
    { path: "/services", priority: 0.9, freq: "monthly" as const },
    { path: "/testimonials", priority: 0.6, freq: "weekly" as const },
    { path: "/booking", priority: 0.9, freq: "monthly" as const },
    { path: "/contact", priority: 0.7, freq: "yearly" as const },
  ].map((p) => ({ url: `${SITE_URL}${p.path}`, lastModified: now, changeFrequency: p.freq, priority: p.priority }));
}
