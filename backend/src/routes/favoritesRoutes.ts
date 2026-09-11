import { Router } from "express";
import { FavoritesController } from "../controllers/favoritesController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, FavoritesController.getFavorites);
router.post("/", authMiddleware, FavoritesController.addFavorite);
router.delete("/:placeId", authMiddleware, FavoritesController.removeFavorite);

export default router;
