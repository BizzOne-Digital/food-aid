/**
 * One-off: points the hero and the six services at the local /images files.
 * Only image fields are changed; all other content is kept.
 *   npx tsx scripts/update-images.ts
 */
import { config } from "dotenv";
import mongoose from "mongoose";
import { defaultServices } from "../lib/defaults";
import { Service } from "../models/Service";
import { PageContent } from "../models/PageContent";
import { SiteSettings } from "../models/SiteSettings";

config({ path: ".env.local" });
config();

async function main() {
  await mongoose.connect(process.env.MONGODB_URI!);
  for (const s of defaultServices) {
    const r = await Service.updateOne({ slug: s.slug }, { $set: { imageUrl: s.imageUrl } });
    console.log(`  ${s.slug}: ${r.modifiedCount ? "updated" : "unchanged"}`);
  }
  const h = await PageContent.updateOne({ key: "home" }, { $set: { "data.heroImage": "/images/hero.png" } });
  console.log(`  home hero: ${h.modifiedCount ? "updated" : "unchanged"}`);
  const st = await SiteSettings.updateOne({ key: "site" }, { $set: { "data.seoImage": "/images/hero.png" } });
  console.log(`  seo image: ${st.modifiedCount ? "updated" : "unchanged"}`);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
