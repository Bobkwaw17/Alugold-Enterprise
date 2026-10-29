import { Router } from "express";
import {
  createBooking, getSlots, getAllBookings, getBookingById, updateBooking, deleteBooking,
} from "../Controllers/bookingController";
import { requireAuth, requireAdmin } from "../Middleware/auth";

const router = Router();

router.post("/", createBooking);
router.get("/slots", getSlots); // must precede "/:id"

router.use(requireAuth, requireAdmin);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.patch("/:id", updateBooking);
router.delete("/:id", deleteBooking);

export default router;
