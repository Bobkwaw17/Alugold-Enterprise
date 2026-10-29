import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
} from "../Controllers/projectController";
import { requireAuth, requireAdmin } from "../Middleware/auth";

const router = Router();

// README: Projects are admin-only
router.use(requireAuth, requireAdmin);

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", createProject);
router.patch("/:id", updateProject);

export default router;
