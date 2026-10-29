import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  name: string;
  serviceType: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  progress: number;
  phase?: string;
  nextMilestone?: string;
  owner?: mongoose.Types.ObjectId;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    serviceType: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    phase: { type: String },
    nextMilestone: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", ProjectSchema);
