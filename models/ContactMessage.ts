import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const ContactMessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);
ContactMessageSchema.index({ createdAt: -1 });

export type ContactMessageDoc = InferSchemaType<typeof ContactMessageSchema>;
export const ContactMessage: Model<ContactMessageDoc> =
  mongoose.models.ContactMessage || mongoose.model<ContactMessageDoc>("ContactMessage", ContactMessageSchema);
