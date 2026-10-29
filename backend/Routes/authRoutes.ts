import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login, logout, me } from "../Controllers/authController";
import { requireAuth } from "../Middleware/auth";

const router = Router();
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false });

router.post("/login", loginLimiter, login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;
