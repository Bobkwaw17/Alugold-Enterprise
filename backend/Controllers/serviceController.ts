import { RequestHandler } from "express";
import Service from "../Models/Service";
import { HttpError, requireFields } from "../Utils/validate";

const FIELDS = ["name", "slug", "category", "description", "imageUrl", "imageAlt", "featured", "order"];
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const pick = (body: Record<string, unknown>) =>
  Object.fromEntries(FIELDS.filter((k) => k in body).map((k) => [k, body[k]]));

export const getAllServices: RequestHandler = async (_req, res, next) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1 });
    res.json({ status: "success", data: services });
  } catch (error) {
    next(error);
  }
};

// Accepts a Mongo id or a slug (e.g. /api/services/curtain-wall-systems)
export const getServiceById: RequestHandler = async (req, res, next) => {
  try {
    const key = String(req.params.id);
    const service = /^[a-f\d]{24}$/i.test(key) ? await Service.findById(key) : await Service.findOne({ slug: key.toLowerCase() });
    if (!service) throw new HttpError(404, "Service not found");
    res.json({ status: "success", data: service });
  } catch (error) {
    next(error);
  }
};

// ---- Admin ----
export const createService: RequestHandler = async (req, res, next) => {
  try {
    requireFields(req.body, ["name", "description"]);
    const data = pick(req.body);
    data.slug = slugify(String(data.slug ?? data.name));
    const service = await Service.create(data);
    res.status(201).json({ status: "success", data: service });
  } catch (error) {
    next(error);
  }
};

export const updateService: RequestHandler = async (req, res, next) => {
  try {
    const data = pick(req.body);
    if (typeof data.slug === "string") data.slug = slugify(data.slug);
    const service = await Service.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!service) throw new HttpError(404, "Service not found");
    res.json({ status: "success", data: service });
  } catch (error) {
    next(error);
  }
};

export const deleteService: RequestHandler = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) throw new HttpError(404, "Service not found");
    res.json({ status: "success", data: { message: "Service deleted" } });
  } catch (error) {
    next(error);
  }
};
