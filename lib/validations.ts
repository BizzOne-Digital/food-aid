import { z } from "zod";

export const BOOKING_STATUSES = ["New", "Contacted", "Confirmed", "Completed", "Cancelled"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const SERVICE_OPTIONS = [
  "Free Foot Assessment",
  "Ingrown Nail Care",
  "Callus Care",
  "Corn Care",
  "Involuted Nail Care",
  "Onyfix Correction",
  "Other",
] as const;

const phone = z
  .string()
  .trim()
  .min(7, "Please enter a valid phone number")
  .max(25)
  .regex(/^[+()\-.\s\d]+$/, "Please enter a valid phone number");

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(150),
  phone,
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date"),
  preferredTime: z.string().trim().min(1, "Please choose a time").max(30),
  service: z.enum(SERVICE_OPTIONS, { message: "Please choose a service" }),
  address: z.string().trim().min(3, "Please enter your address").max(200),
  city: z.string().trim().min(2, "Please enter your city").max(80),
  postalCode: z
    .string()
    .trim()
    .regex(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, "Please enter a valid postal code (e.g. T2P 1J9)"),
  mobilityNotes: z.string().trim().max(1000).optional().default(""),
  notes: z.string().trim().max(2000).optional().default(""),
  consent: z.literal(true, { message: "Please agree to be contacted" }),
});
export type BookingInput = z.input<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(150),
  phone: z.union([phone, z.literal("")]).optional().default(""),
  subject: z.string().trim().min(2, "Please enter a subject").max(150),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(4000),
});
export type ContactInput = z.input<typeof contactSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

export const imageUrl = z
  .string()
  .trim()
  .max(500)
  .refine(
    (v) => v === "" || v.startsWith("/api/uploads/") || v.startsWith("/images/") || v.startsWith("https://images.unsplash.com/"),
    "Image must be an uploaded image or an Unsplash URL"
  );

export const serviceSchema = z.object({
  title: z.string().trim().min(2).max(100),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug: lowercase letters, numbers and dashes"),
  imageUrl: imageUrl.default(""),
  iconName: z.string().trim().max(40).default("Footprints"),
  shortDescription: z.string().trim().max(300).default(""),
  fullDescription: z.string().trim().max(5000).default(""),
  isActive: z.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export const testimonialSchema = z.object({
  clientName: z.string().trim().min(2).max(100),
  location: z.string().trim().max(100).default("Calgary, AB"),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  review: z.string().trim().min(5).max(2000),
  image: imageUrl.default(""),
  isPublished: z.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export const bookingStatusSchema = z.object({ status: z.enum(BOOKING_STATUSES) });
