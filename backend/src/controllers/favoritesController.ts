import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { FavoriteModel } from "../models/Favorite";
import { UserModel } from "../models/User";
import { isDbConnected } from "../config/db";
import { SEED_PLACES } from "../data/seedData";

// In-memory store fallback
interface MemoryFav {
  id: string;
  userId: string;
  placeId: string;
  placeName: string;
  category?: string;
  image?: string;
}

const memoryFavorites: MemoryFav[] = [];

export class FavoritesController {
  public static async getFavorites(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized." });
        return;
      }

      if (isDbConnected()) {
        const favs = await FavoriteModel.find({ userId }).sort({ createdAt: -1 });
        res.json({
          success: true,
          data: favs,
        });
        return;
      }

      const userFavs = memoryFavorites.filter((f) => f.userId === userId);
      res.json({
        success: true,
        data: userFavs,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch favorites." });
    }
  }

  public static async addFavorite(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { placeId, placeName, category, image } = req.body;

      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized." });
        return;
      }

      if (!placeId) {
        res.status(400).json({ success: false, message: "placeId is required." });
        return;
      }

      const foundSeed = SEED_PLACES.find((p) => p.id === placeId);
      const name = placeName || foundSeed?.name || "Unknown Place";
      const cat = category || foundSeed?.category || "attraction";
      const img = image || foundSeed?.image || "";

      if (isDbConnected()) {
        const existing = await FavoriteModel.findOne({ userId, placeId });
        if (existing) {
          res.json({ success: true, message: "Place is already saved in favorites.", data: existing });
          return;
        }

        const fav = await FavoriteModel.create({
          userId,
          placeId,
          placeName: name,
          category: cat,
          image: img,
        });

        await UserModel.findByIdAndUpdate(userId, {
          $addToSet: { savedPlaces: placeId },
        });

        res.status(201).json({
          success: true,
          message: "Place saved to favorites.",
          data: fav,
        });
        return;
      }

      // Memory Store Fallback
      const existing = memoryFavorites.find((f) => f.userId === userId && f.placeId === placeId);
      if (existing) {
        res.json({ success: true, message: "Place is already saved in favorites.", data: existing });
        return;
      }

      const newFav: MemoryFav = {
        id: `fav-${Date.now()}`,
        userId,
        placeId,
        placeName: name,
        category: cat,
        image: img,
      };
      memoryFavorites.push(newFav);

      res.status(201).json({
        success: true,
        message: "Place saved to favorites.",
        data: newFav,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to save favorite." });
    }
  }

  public static async removeFavorite(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const placeId = req.params.placeId as string;

      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized." });
        return;
      }

      if (isDbConnected()) {
        await FavoriteModel.findOneAndDelete({ userId, placeId });
        await UserModel.findByIdAndUpdate(userId, {
          $pull: { savedPlaces: placeId },
        });

        res.json({ success: true, message: "Place removed from favorites." });
        return;
      }

      const index = memoryFavorites.findIndex((f) => f.userId === userId && f.placeId === placeId);
      if (index !== -1) {
        memoryFavorites.splice(index, 1);
      }

      res.json({ success: true, message: "Place removed from favorites." });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to remove favorite." });
    }
  }
}
