import { RequestHandler } from "express";
import { Model } from "mongoose";
import { HttpError } from "./validate";

/** Admin list / get / patch / delete handlers for a model. `patchable` whitelists editable fields. */
export function adminCrud<T>(model: Model<T>, label: string, patchable: string[], sort: Record<string, 1 | -1> = { createdAt: -1 }) {
  const list: RequestHandler = async (req, res, next) => {
    try {
      const filter: Record<string, unknown> = {};
      if (typeof req.query.status === "string") filter.status = req.query.status;
      res.json({ status: "success", data: await model.find(filter as any).sort(sort) });
    } catch (e) { next(e); }
  };
  const get: RequestHandler = async (req, res, next) => {
    try {
      const doc = await model.findById(req.params.id);
      if (!doc) throw new HttpError(404, `${label} not found`);
      res.json({ status: "success", data: doc });
    } catch (e) { next(e); }
  };
  const patch: RequestHandler = async (req, res, next) => {
    try {
      const update = Object.fromEntries(patchable.filter((k) => k in req.body).map((k) => [k, req.body[k]]));
      const doc = await model.findByIdAndUpdate(req.params.id, update as any, { new: true, runValidators: true });
      if (!doc) throw new HttpError(404, `${label} not found`);
      res.json({ status: "success", data: doc });
    } catch (e) { next(e); }
  };
  const remove: RequestHandler = async (req, res, next) => {
    try {
      const doc = await model.findByIdAndDelete(req.params.id);
      if (!doc) throw new HttpError(404, `${label} not found`);
      res.json({ status: "success", data: { message: `${label} deleted` } });
    } catch (e) { next(e); }
  };
  return { list, get, patch, remove };
}
