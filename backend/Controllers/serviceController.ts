import { Request, Response, NextFunction, RequestHandler } from "express";
import Service from "../Models/Service";

export const getAllServices: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await Service.find();
    res.json({ status: "success", data: services });
  } catch (error) {
    next(error);
  }
};

export const getServiceById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      res.status(404).json({ status: "error", data: { message: "Service not found" } });
      return;
    }
    res.json({ status: "success", data: service });
  } catch (error) {
    next(error);
  }
};
