import mongoose, { Schema, type Model } from "mongoose";

// One document per page key ("home", "about"). `data` holds editable fields; images are URL strings only.
const PageContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, minimize: false }
);

export interface PageContentDoc {
  key: string;
  data: Record<string, unknown>;
}
export const PageContent: Model<PageContentDoc> =
  mongoose.models.PageContent || mongoose.model<PageContentDoc>("PageContent", PageContentSchema);
