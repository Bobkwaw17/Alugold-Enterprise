import mongoose, { Document, Schema } from "mongoose";

export interface IQuote extends Document {
  fullName: string;
  email: string;
  phone?: string;
  serviceType: string;
  projectDescription: string;
}

const QuoteSchema = new Schema<IQuote>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    serviceType: { type: String, required: true, trim: true },
    projectDescription: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<IQuote>("Quote", QuoteSchema);
