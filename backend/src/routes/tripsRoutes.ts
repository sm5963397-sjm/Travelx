import { Router } from "express";
import { TripsController } from "../controllers/tripsController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, TripsController.getTrips);
router.get("/:id", authMiddleware, TripsController.getTripById);
router.post("/", authMiddleware, TripsController.createTrip);
router.put("/:id", authMiddleware, TripsController.updateTrip);
router.delete("/:id", authMiddleware, TripsController.deleteTrip);

export default router;
