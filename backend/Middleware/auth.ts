import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../Models/User";
import { HttpError } from "../Utils/validate";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}

export const JWT_EXPIRES = "7d";

export function signToken(id: string): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return jwt.sign({ sub: id }, secret, { expiresIn: JWT_EXPIRES });
}

export const requireAuth: RequestHandler = async (req, _res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) throw new HttpError(401, "Authentication required");
    let payload: jwt.JwtPayload;
    try {
      payload = jwt.verify(header.slice(7), process.env.JWT_SECRET as string) as jwt.JwtPayload;
    } catch {
      throw new HttpError(401, "Invalid or expired token");
    }
    const user = await User.findById(payload.sub);
    if (!user) throw new HttpError(401, "User no longer exists");
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

export const requireAdmin: RequestHandler = (req, _res, next) => {
  if (req.user?.role !== "admin") return next(new HttpError(403, "Admin access required"));
  next();
};
