/**
 * One-off (Oct 14 client feedback): new email, thickened nail patient education,
 * and the "Nails trimmed by a licensed Advanced Foot Care Nurse." line.
 * Only these fields are changed; everything else edited in the admin is kept.
 *   npx tsx scripts/update-oct14.ts
 */
import { config } from "dotenv";
import mongoose from "mongoose";
import { defaultServices, defaultSettings } from "../lib/defaults";
import { Service } from "../models/Service";
import { SiteSettings } from "../models/SiteSettings";

config({ path: ".env.local" });
config();

async function main() {
  await mongoose.connect(process.env.MONGODB_URI!);
  const s = await SiteSettings.updateOne({ key: "site" }, { $set: { "data.email": defaultSettings.email } });
  console.log(`  email: ${s.modifiedCount ? "updated" : "unchanged"}`);

  for (const slug of ["thickened-nail-care", "routine-foot-nail-care"]) {
    const d = defaultServices.find((x) => x.slug === slug)!;
    const r = await Service.updateOne(
      { slug },
      { $set: { fullDescription: d.fullDescription, patientEducation: d.patientEducation ?? "" } }
    );
    console.log(`  ${slug}: ${r.modifiedCount ? "updated" : "unchanged"}`);
  }
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
