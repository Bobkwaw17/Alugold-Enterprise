import mongoose, { Document, Schema } from "mongoose";

export interface INewsletter extends Document {
  email: string;
}

const NewsletterSchema = new Schema<INewsletter>(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<INewsletter>("Newsletter", NewsletterSchema);
