import { RequestHandler } from "express";
import Booking from "../Models/Booking";
import Quote from "../Models/Quote";
import Contact from "../Models/Contact";
import Newsletter from "../Models/Newsletter";
import Project from "../Models/Project";
import Service from "../Models/Service";

export const getStats: RequestHandler = async (_req, res, next) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const [newQuotes, pendingBookings, unreadMessages, subscribers, activeProjects, services, upcoming] = await Promise.all([
      Quote.countDocuments({ status: "new" }),
      Booking.countDocuments({ status: "pending" }),
      Contact.countDocuments({ status: "unread" }),
      Newsletter.countDocuments(),
      Project.countDocuments({ status: { $ne: "completed" } }),
      Service.countDocuments(),
      Booking.find({ status: { $ne: "cancelled" }, date: { $gte: today } }).sort({ date: 1, timeSlot: 1 }).limit(5),
    ]);
    res.json({ status: "success", data: { newQuotes, pendingBookings, unreadMessages, subscribers, activeProjects, services, upcoming } });
  } catch (e) { next(e); }
};
