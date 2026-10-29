import mongoose, { Document, Schema } from "mongoose";

export interface IService extends Document {
  name: string;
  slug: string;
  category: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  featured: boolean;
  order: number;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, default: "", trim: true },
    description: { type: String, required: true, trim: true },
    imageUrl: { type: String },
    imageAlt: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IService>("Service", ServiceSchema);
