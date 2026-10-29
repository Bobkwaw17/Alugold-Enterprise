import { Router } from "express";
import { createContact } from "../Controllers/contactController";
import Contact from "../Models/Contact";
import { adminCrud } from "../Utils/crud";
import { requireAuth, requireAdmin } from "../Middleware/auth";

const router = Router();
const crud = adminCrud(Contact, "Message", ["status"]);

router.post("/", createContact);

router.use(requireAuth, requireAdmin);
router.get("/", crud.list);
router.get("/:id", crud.get);
router.patch("/:id", crud.patch);
router.delete("/:id", crud.remove);

export default router;
