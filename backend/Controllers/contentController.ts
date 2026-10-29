import { RequestHandler } from "express";
import Content from "../Models/Content";
import { CONTENT_KEYS } from "../Utils/contentKeys";
import { HttpError } from "../Utils/validate";

const allowed = new Set<string>(CONTENT_KEYS);

export const getContent: RequestHandler = async (_req, res, next) => {
  try {
    const rows = await Content.find();
    res.set("Cache-Control", "no-cache");
    res.json({ status: "success", data: Object.fromEntries(rows.map((r) => [r.key, r.value])) });
  } catch (e) { next(e); }
};

// Body: { key: "text" }. An empty string removes the override (revert to default).
export const updateContent: RequestHandler = async (req, res, next) => {
  try {
    const entries = Object.entries(req.body ?? {});
    if (!entries.length) throw new HttpError(400, "No content provided");
    for (const [k, v] of entries) {
      if (!allowed.has(k)) throw new HttpError(400, `Unknown content key: ${k}`);
      if (typeof v !== "string" || v.length > 2000) throw new HttpError(400, `Invalid value for ${k}`);
    }
    await Promise.all(
      entries.map(([key, value]) =>
        (value as string).trim() === ""
          ? Content.deleteOne({ key })
          : Content.updateOne({ key }, { $set: { value: (value as string).trim() } }, { upsert: true })
      )
    );
    const rows = await Content.find();
    res.json({ status: "success", data: Object.fromEntries(rows.map((r) => [r.key, r.value])) });
  } catch (e) { next(e); }
};
