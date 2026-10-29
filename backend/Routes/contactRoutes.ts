import { Router } from "express";
import { createContact } from "../Controllers/contactController";

const router = Router();

router.post("/", createContact);

export default router;
