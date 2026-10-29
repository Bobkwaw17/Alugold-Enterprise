import { Router } from "express";
import { getPreferences, updatePreferences } from "../Controllers/userController";
import { requireAuth } from "../Middleware/auth";

const router = Router();
router.use(requireAuth);
router.get("/:id/preferences", getPreferences);
router.put("/:id/preferences", updatePreferences);
export default router;
