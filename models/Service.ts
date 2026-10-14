import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    imageUrl: { type: String, default: "" },
    beforeImage: { type: String, default: "" },
    afterImage: { type: String, default: "" },
    iconName: { type: String, default: "Footprints" },
    shortDescription: { type: String, default: "" },
    fullDescription: { type: String, default: "" },
    patientEducation: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type ServiceDoc = InferSchemaType<typeof ServiceSchema>;
export const Service: Model<ServiceDoc> =
  mongoose.models.Service || mongoose.model<ServiceDoc>("Service", ServiceSchema);
