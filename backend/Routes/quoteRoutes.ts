import { Router } from "express";
import { createQuote } from "../Controllers/quoteController";

const router = Router();
router.post("/", createQuote);
export default router;
