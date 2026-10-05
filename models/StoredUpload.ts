import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { UPLOAD_FOLDERS } from "@/lib/upload-constants";

const StoredUploadSchema = new Schema(
  {
    folder: { type: String, required: true, enum: UPLOAD_FOLDERS },
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);
StoredUploadSchema.index({ folder: 1, filename: 1 }, { unique: true });

export type StoredUploadDoc = InferSchemaType<typeof StoredUploadSchema>;
export const StoredUpload: Model<StoredUploadDoc> =
  mongoose.models.StoredUpload || mongoose.model<StoredUploadDoc>("StoredUpload", StoredUploadSchema);
