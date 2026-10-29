import { RequestHandler } from "express";
import Booking, { BOOKING_STATUSES, TIME_SLOTS } from "../Models/Booking";
import { HttpError, requireFields } from "../Utils/validate";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const todayStr = () => new Date().toISOString().slice(0, 10);

function assertDate(date: unknown): asserts date is string {
  if (typeof date !== "string" || !DATE_RE.test(date) || Number.isNaN(Date.parse(date))) {
    throw new HttpError(400, "date must be YYYY-MM-DD");
  }
}

export const createBooking: RequestHandler = async (req, res, next) => {
  try {
    const b = req.body;
    requireFields(b, ["service", "date", "timeSlot", "fullName", "email"]);
    assertDate(b.date);
    if (b.date < todayStr()) throw new HttpError(400, "Date cannot be in the past");
    if (!(TIME_SLOTS as readonly string[]).includes(b.timeSlot)) throw new HttpError(400, "Invalid time slot");

    const booking = await Booking.create({
      service: b.service,
      date: b.date,
      timeSlot: b.timeSlot,
      fullName: b.fullName,
      email: b.email,
      projectDescription: b.projectDescription ?? "",
    });
    res.status(201).json({ status: "success", data: booking });
  } catch (e) {
    next(e); // duplicate slot -> 409 via errorHandler (E11000)
  }
};

export const getSlots: RequestHandler = async (req, res, next) => {
  try {
    const { date } = req.query;
    assertDate(date);
    const taken = await Booking.find({ date, status: { $ne: "cancelled" } }).distinct("timeSlot");
    res.json({
      status: "success",
      data: { date, slots: TIME_SLOTS.map((slot) => ({ slot, available: !taken.includes(slot) })) },
    });
  } catch (e) {
    next(e);
  }
};

export const getAllBookings: RequestHandler = async (req, res, next) => {
  try {
    const filter: Record<string, unknown> = {};
    if (typeof req.query.status === "string") filter.status = req.query.status;
    if (typeof req.query.date === "string") filter.date = req.query.date;
    const bookings = await Booking.find(filter).sort({ date: 1, timeSlot: 1 });
    res.json({ status: "success", data: bookings });
  } catch (e) {
    next(e);
  }
};

export const getBookingById: RequestHandler = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) throw new HttpError(404, "Booking not found");
    res.json({ status: "success", data: booking });
  } catch (e) {
    next(e);
  }
};

export const updateBooking: RequestHandler = async (req, res, next) => {
  try {
    const allowed = ["service", "date", "timeSlot", "fullName", "email", "projectDescription", "status"];
    const update: Record<string, unknown> = {};
    for (const k of allowed) if (k in req.body) update[k] = req.body[k];
    if ("date" in update) assertDate(update.date);
    if ("status" in update && !(BOOKING_STATUSES as readonly string[]).includes(String(update.status))) {
      throw new HttpError(400, "Invalid status");
    }
    const booking = await Booking.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!booking) throw new HttpError(404, "Booking not found");
    res.json({ status: "success", data: booking });
  } catch (e) {
    next(e);
  }
};

export const deleteBooking: RequestHandler = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) throw new HttpError(404, "Booking not found");
    res.json({ status: "success", data: { message: "Booking deleted" } });
  } catch (e) {
    next(e);
  }
};
