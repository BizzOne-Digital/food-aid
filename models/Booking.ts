import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { BOOKING_STATUSES } from "@/lib/validations";

const BookingSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    locationType: { type: String, default: "Home" },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    mobilityNotes: { type: String, default: "" },
    notes: { type: String, default: "" },
    status: { type: String, enum: BOOKING_STATUSES, default: "New" },
  },
  { timestamps: true }
);
BookingSchema.index({ createdAt: -1 });

export type BookingDoc = InferSchemaType<typeof BookingSchema>;
export const Booking: Model<BookingDoc> =
  mongoose.models.Booking || mongoose.model<BookingDoc>("Booking", BookingSchema);
