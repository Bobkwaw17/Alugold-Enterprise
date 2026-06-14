import { Request, Response, NextFunction, RequestHandler } from "express";
import Contact from "../Models/Contact";

export const createContact: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName, email, message } = req.body;
    const contact = await Contact.create({ fullName, email, message });
    res.status(201).json({ status: "success", data: contact });
  } catch (error) {
    next(error);
  }
};
