import { Router } from "express";
import { RecommendationsController } from "../controllers/recommendationsController";

const router = Router();

router.post("/", RecommendationsController.getRecommendations);

export default router;
