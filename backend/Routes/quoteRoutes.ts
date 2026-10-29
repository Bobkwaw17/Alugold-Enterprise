import { Router } from "express";
import { createQuote } from "../Controllers/quoteController";
import Quote from "../Models/Quote";
import { adminCrud } from "../Utils/crud";
import { requireAuth, requireAdmin } from "../Middleware/auth";

const router = Router();
const crud = adminCrud(Quote, "Quote", ["status"]);

router.post("/", createQuote);

router.use(requireAuth, requireAdmin);
router.get("/", crud.list);
router.get("/:id", crud.get);
router.patch("/:id", crud.patch);
router.delete("/:id", crud.remove);

export default router;
