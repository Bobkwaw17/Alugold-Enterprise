import { Router } from "express";
import { getContent, updateContent } from "../Controllers/contentController";
import { requireAuth, requireAdmin } from "../Middleware/auth";

const router = Router();
router.get("/", getContent);
router.put("/", requireAuth, requireAdmin, updateContent);
export default router;
