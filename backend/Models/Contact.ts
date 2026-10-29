import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  fullName: string;
  email: string;
  message: string;
  status: "unread" | "read" | "archived";
}

const ContactSchema = new Schema<IContact>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["unread", "read", "archived"], default: "unread" },
  },
  { timestamps: true }
);

export default mongoose.model<IContact>("Contact", ContactSchema);
