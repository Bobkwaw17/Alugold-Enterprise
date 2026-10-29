import { RequestHandler } from "express";
import Quote from "../Models/Quote";
import { requireFields } from "../Utils/validate";

export const createQuote: RequestHandler = async (req, res, next) => {
  try {
    const { fullName, email, phone, serviceType, projectDescription } = req.body;
    requireFields(req.body, ["fullName", "email", "serviceType", "projectDescription"]);
    const quote = await Quote.create({ fullName, email, phone, serviceType, projectDescription });
    res.status(201).json({ status: "success", data: quote });
  } catch (e) {
    next(e);
  }
};
