import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import User from "../Models/User";
import { signToken } from "../Middleware/auth";
import { HttpError, requireFields } from "../Utils/validate";

export const login: RequestHandler = async (req, res, next) => {
  try {
    requireFields(req.body, ["email", "password"]);
    const user = await User.findOne({ email: String(req.body.email).toLowerCase().trim() }).select("+password");
    const ok = user && (await bcrypt.compare(String(req.body.password), user.password));
    if (!user || !ok) throw new HttpError(401, "Invalid email or password");
    res.json({
      status: "success",
      data: {
        token: signToken(String(user._id)),
        user: { _id: String(user._id), name: user.name, email: user.email, role: user.role },
      },
    });
  } catch (e) {
    next(e);
  }
};

// Tokens are stateless JWTs: the client discards its token. Endpoint exists for API symmetry.
export const logout: RequestHandler = (_req, res) => {
  res.json({ status: "success", data: { message: "Logged out" } });
};

export const me: RequestHandler = (req, res) => {
  const u = req.user!;
  res.json({ status: "success", data: { _id: String(u._id), name: u.name, email: u.email, role: u.role } });
};
