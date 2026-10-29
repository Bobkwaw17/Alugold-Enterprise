import mongoose, { Document, Schema } from "mongoose";

export interface IPreferences {
  materials: string[];
  finishes: string[];
  notifications: { milestones: boolean; email: boolean };
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
  preferences: IPreferences;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin", "client"], default: "client" },
    preferences: {
      materials: { type: [String], default: [] },
      finishes: { type: [String], default: [] },
      notifications: {
        milestones: { type: Boolean, default: true },
        email: { type: Boolean, default: true },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
