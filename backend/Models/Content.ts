import mongoose, { Document, Schema } from "mongoose";

// One document per editable text. Missing key => frontend default is used.
export interface IContent extends Document {
  key: string;
  value: string;
}

const ContentSchema = new Schema<IContent>(
  {
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true, maxlength: 2000 },
  },
  { timestamps: true }
);

export default mongoose.model<IContent>("Content", ContentSchema);
