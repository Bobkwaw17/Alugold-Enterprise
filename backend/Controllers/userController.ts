import { RequestHandler } from "express";
import User from "../Models/User";
import { HttpError } from "../Utils/validate";

const strArray = (v: unknown, name: string): string[] => {
  if (!Array.isArray(v) || v.some((x) => typeof x !== "string")) throw new HttpError(400, `${name} must be an array of strings`);
  return v.map((x: string) => x.trim()).filter(Boolean);
};

function assertSelfOrAdmin(reqUser: { _id: unknown; role: string }, id: string) {
  if (reqUser.role !== "admin" && String(reqUser._id) !== id) throw new HttpError(403, "Forbidden");
}

export const getPreferences: RequestHandler = async (req, res, next) => {
  try {
    assertSelfOrAdmin(req.user!, String(req.params.id));
    const user = await User.findById(req.params.id);
    if (!user) throw new HttpError(404, "User not found");
    res.json({ status: "success", data: user.preferences });
  } catch (e) {
    next(e);
  }
};

export const updatePreferences: RequestHandler = async (req, res, next) => {
  try {
    assertSelfOrAdmin(req.user!, String(req.params.id));
    const b = req.body ?? {};
    const set: Record<string, unknown> = {};
    if ("materials" in b) set["preferences.materials"] = strArray(b.materials, "materials");
    if ("finishes" in b) set["preferences.finishes"] = strArray(b.finishes, "finishes");
    if (b.notifications) {
      for (const k of ["milestones", "email"] as const) {
        if (k in b.notifications) {
          if (typeof b.notifications[k] !== "boolean") throw new HttpError(400, `notifications.${k} must be boolean`);
          set[`preferences.notifications.${k}`] = b.notifications[k];
        }
      }
    }
    const user = await User.findByIdAndUpdate(req.params.id, { $set: set }, { new: true });
    if (!user) throw new HttpError(404, "User not found");
    res.json({ status: "success", data: user.preferences });
  } catch (e) {
    next(e);
  }
};
