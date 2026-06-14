import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
} from "../Controllers/projectController";

const router = Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", createProject);
router.patch("/:id", updateProject);

export default router;
