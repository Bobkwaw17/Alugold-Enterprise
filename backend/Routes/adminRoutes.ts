import { Router } from "express";
import { getStats } from "../Controllers/statsController";
import { requireAuth, requireAdmin } from "../Middleware/auth";

const router = Router();
router.get("/stats", requireAuth, requireAdmin, getStats);
export default router;
