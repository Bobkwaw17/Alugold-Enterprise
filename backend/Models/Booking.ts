import mongoose, { Document, Schema } from "mongoose";

export const TIME_SLOTS = [
  "09:00 AM – 10:30 AM",
  "11:00 AM – 12:30 PM",
  "02:00 PM – 03:30 PM",
] as const;

export const BOOKING_STATUSES = ["pending", "confirmed", "cancelled"] as const;

export interface IBooking extends Document {
  service: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  fullName: string;
  email: string;
  projectDescription: string;
  status: (typeof BOOKING_STATUSES)[number];
}

const BookingSchema = new Schema<IBooking>(
  {
    service: { type: String, required: true, trim: true },
    date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    timeSlot: { type: String, required: true, enum: TIME_SLOTS },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    projectDescription: { type: String, default: "", trim: true },
    status: { type: String, enum: BOOKING_STATUSES, default: "pending" },
  },
  { timestamps: true }
);

// One live booking per slot; cancelled bookings free the slot.
BookingSchema.index(
  { date: 1, timeSlot: 1 },
  { unique: true, partialFilterExpression: { status: { $in: ["pending", "confirmed"] } } }
);

export default mongoose.model<IBooking>("Booking", BookingSchema);
