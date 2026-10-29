import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  name: string;
  serviceType: string;
  description: string;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    serviceType: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", ProjectSchema);
