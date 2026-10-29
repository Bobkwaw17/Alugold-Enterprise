import { Router } from "express";
import { subscribe, unsubscribe } from "../Controllers/newsletterController";
import Newsletter from "../Models/Newsletter";
import { adminCrud } from "../Utils/crud";
import { requireAuth, requireAdmin } from "../Middleware/auth";

const router = Router();
const crud = adminCrud(Newsletter, "Subscriber", []);

router.post("/subscribe", subscribe);
router.delete("/unsubscribe", unsubscribe); // before "/:id"

router.get("/", requireAuth, requireAdmin, crud.list);
router.delete("/:id", requireAuth, requireAdmin, crud.remove);

export default router;
