import { Router } from "express";
import { ExploreController } from "../controllers/exploreController";

const router = Router();

router.get("/", ExploreController.explore);
router.post("/", ExploreController.explore);

export default router;
