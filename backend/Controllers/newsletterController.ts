import { Request, Response, NextFunction, RequestHandler } from "express";
import Newsletter from "../Models/Newsletter";

export const subscribe: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ status: "error", data: { message: "Email is required" } });
      return;
    }
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      res.status(409).json({ status: "error", data: { message: "Email already subscribed" } });
      return;
    }
    const subscriber = await Newsletter.create({ email });
    res.status(201).json({ status: "success", data: subscriber });
  } catch (error) {
    next(error);
  }
};

export const unsubscribe: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ status: "error", data: { message: "Email is required" } });
      return;
    }
    const subscriber = await Newsletter.findOneAndDelete({ email });
    if (!subscriber) {
      res.status(404).json({ status: "error", data: { message: "Email not found" } });
      return;
    }
    res.json({ status: "success", data: { message: "Unsubscribed successfully" } });
  } catch (error) {
    next(error);
  }
};
