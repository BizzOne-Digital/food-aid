import "server-only";
import { cache } from "react";
import { connectDB } from "./mongodb";
import { serialize } from "./api";
import {
  defaultAbout,
  defaultHome,
  defaultServices,
  defaultSettings,
  type AboutContent,
  type HomeContent,
  type ServiceData,
  type SiteSettingsData,
  type TestimonialData,
} from "./defaults";
import { PageContent } from "@/models/PageContent";
import { SiteSettings } from "@/models/SiteSettings";
import { Service } from "@/models/Service";
import { Testimonial } from "@/models/Testimonial";

/**
 * Public content loaders. If MongoDB is unreachable the site still renders with defaults,
 * so a database hiccup never takes the marketing site down.
 */
async function safe<T>(fn: () => Promise<T>, fallback: T, label: string): Promise<T> {
  try {
    await connectDB();
    return await fn();
  } catch (e) {
    console.error(`[content] ${label} failed, using defaults:`, (e as Error).message);
    return fallback;
  }
}

function merge<T extends object>(defaults: T, data: unknown): T {
  if (!data || typeof data !== "object") return defaults;
  const out = { ...defaults } as Record<string, unknown>;
  for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
    if (!(k in defaults) || v === undefined || v === null) continue;
    const d = (defaults as Record<string, unknown>)[k];
    out[k] = d && typeof d === "object" && !Array.isArray(d) && typeof v === "object" && !Array.isArray(v) ? merge(d, v) : v;
  }
  return out as T;
}

export const getSettings = cache(async (): Promise<SiteSettingsData> =>
  safe(async () => merge(defaultSettings, (await SiteSettings.findOne({ key: "site" }).lean())?.data), defaultSettings, "settings")
);

export const getHomeContent = cache(async (): Promise<HomeContent> =>
  safe(async () => merge(defaultHome, (await PageContent.findOne({ key: "home" }).lean())?.data), defaultHome, "home")
);

export const getAboutContent = cache(async (): Promise<AboutContent> =>
  safe(async () => merge(defaultAbout, (await PageContent.findOne({ key: "about" }).lean())?.data), defaultAbout, "about")
);

export const getActiveServices = cache(async (): Promise<ServiceData[]> =>
  safe(
    async () => {
      const docs = await Service.find({ isActive: true }).sort({ sortOrder: 1, createdAt: 1 }).lean();
      return docs.length ? serialize(docs as unknown as ServiceData[]) : defaultServices;
    },
    defaultServices,
    "services"
  )
);

export const getPublishedTestimonials = cache(async (): Promise<TestimonialData[]> =>
  safe(
    async () => {
      // Only genuine, published reviews are shown. Never fall back to sample reviews.
      const docs = await Testimonial.find({ isPublished: true }).sort({ sortOrder: 1, createdAt: -1 }).lean();
      return serialize(docs as unknown as TestimonialData[]);
    },
    [],
    "testimonials"
  )
);
