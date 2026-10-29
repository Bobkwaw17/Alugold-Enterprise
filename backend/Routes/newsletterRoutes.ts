import { Router } from "express";
import { subscribe, unsubscribe } from "../Controllers/newsletterController";

const router = Router();

router.post("/subscribe", subscribe);
router.delete("/unsubscribe", unsubscribe);

export default router;
