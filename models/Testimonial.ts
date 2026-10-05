import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const TestimonialSchema = new Schema(
  {
    clientName: { type: String, required: true },
    location: { type: String, default: "Calgary, AB" },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    review: { type: String, required: true },
    image: { type: String, default: "" },
    isPublished: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type TestimonialDoc = InferSchemaType<typeof TestimonialSchema>;
export const Testimonial: Model<TestimonialDoc> =
  mongoose.models.Testimonial || mongoose.model<TestimonialDoc>("Testimonial", TestimonialSchema);
