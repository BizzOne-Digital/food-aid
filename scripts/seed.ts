/**
 * Seeds services, homepage/about content, site settings and example testimonials.
 * Safe to re-run: existing records are kept unless you pass --force.
 *   npm run seed
 *   npm run seed -- --force
 */
import { config } from "dotenv";
import mongoose from "mongoose";
import { defaultAbout, defaultHome, defaultServices, defaultSettings, defaultTestimonials } from "../lib/defaults";
import { Service } from "../models/Service";
import { Testimonial } from "../models/Testimonial";
import { PageContent } from "../models/PageContent";
import { SiteSettings } from "../models/SiteSettings";

// Same precedence as Next.js: .env.local wins over .env.
config({ path: ".env.local" });
config();

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set (.env.local)");
  const force = process.argv.includes("--force");
  await mongoose.connect(uri);
  console.log("Connected. Force mode:", force);

  for (const s of defaultServices) {
    const exists = await Service.exists({ slug: s.slug });
    if (exists && !force) continue;
    await Service.updateOne({ slug: s.slug }, { $set: s }, { upsert: true });
    console.log("  service:", s.title);
  }

  if (force || (await Testimonial.estimatedDocumentCount()) === 0) {
    if (force) await Testimonial.deleteMany({});
    await Testimonial.insertMany(defaultTestimonials);
    console.log("  testimonials:", defaultTestimonials.length);
  }

  for (const [key, data] of [["home", defaultHome], ["about", defaultAbout]] as const) {
    if (!force && (await PageContent.exists({ key }))) continue;
    await PageContent.updateOne({ key }, { $set: { data } }, { upsert: true });
    console.log("  page:", key);
  }

  if (force || !(await SiteSettings.exists({ key: "site" }))) {
    await SiteSettings.updateOne({ key: "site" }, { $set: { data: defaultSettings } }, { upsert: true });
    console.log("  settings");
  }

  await mongoose.disconnect();
  console.log("Seed complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
