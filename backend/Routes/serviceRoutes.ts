import { Router } from "express";
import {
  getAllServices, getServiceById, createService, updateService, deleteService,
} from "../Controllers/serviceController";
import { requireAuth, requireAdmin } from "../Middleware/auth";

const router = Router();

router.get("/", getAllServices);
router.get("/:id", getServiceById);

router.post("/", requireAuth, requireAdmin, createService);
router.patch("/:id", requireAuth, requireAdmin, updateService);
router.delete("/:id", requireAuth, requireAdmin, deleteService);

export default router;
