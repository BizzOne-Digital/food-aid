import mongoose, { Schema, type Model } from "mongoose";

// Singleton document (key: "site"). `data` follows SiteSettingsData in lib/defaults.ts.
const SiteSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "site" },
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, minimize: false }
);

export interface SiteSettingsShape {
  key: string;
  data: Record<string, unknown>;
}
export const SiteSettings: Model<SiteSettingsShape> =
  mongoose.models.SiteSettings || mongoose.model<SiteSettingsShape>("SiteSettings", SiteSettingsSchema);
