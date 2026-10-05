import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const AdminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "Admin" },
    lastLoginAt: Date,
  },
  { timestamps: true }
);

export type AdminUserDoc = InferSchemaType<typeof AdminUserSchema>;
export const AdminUser: Model<AdminUserDoc> =
  mongoose.models.AdminUser || mongoose.model<AdminUserDoc>("AdminUser", AdminUserSchema);
