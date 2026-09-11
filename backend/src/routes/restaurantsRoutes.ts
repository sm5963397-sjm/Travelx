import { Router } from "express";
import { RestaurantsController } from "../controllers/restaurantsController";

const router = Router();

router.get("/", RestaurantsController.getRestaurants);

export default router;
