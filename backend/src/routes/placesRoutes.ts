import { Router } from "express";
import { PlacesController } from "../controllers/placesController";

const router = Router();

router.get("/", PlacesController.getPlaces);
router.get("/:id", PlacesController.getPlaceById);

export default router;
