import { Router } from "express";
import { StaysController } from "../controllers/staysController";

const router = Router();

router.get("/", StaysController.getStays);

export default router;
