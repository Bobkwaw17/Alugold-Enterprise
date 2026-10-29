export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmail = (v: unknown): v is string => typeof v === "string" && EMAIL_RE.test(v.trim());
export const isNonEmpty = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/** Throws HttpError(400) listing every missing/invalid field. */
export function requireFields(body: Record<string, unknown>, fields: string[]): void {
  const bad = fields.filter((f) => (f === "email" ? !isEmail(body[f]) : !isNonEmpty(body[f])));
  if (bad.length) throw new HttpError(400, `Missing or invalid: ${bad.join(", ")}`);
}
