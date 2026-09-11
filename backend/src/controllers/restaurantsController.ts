import { Request, Response } from "express";
import { RestaurantsService } from "../services/restaurantsService";

export class RestaurantsController {
  public static async getRestaurants(req: Request, res: Response): Promise<void> {
    try {
      const lat = req.query.lat ? parseFloat(req.query.lat as string) : 21.1458;
      const lng = req.query.lng ? parseFloat(req.query.lng as string) : 79.0882;
      const radiusKm = req.query.radius ? parseFloat(req.query.radius as string) : 50;

      const restaurants = await RestaurantsService.getNearbyRestaurants({
        latitude: lat,
        longitude: lng,
        radiusKm,
      });

      res.json({
        success: true,
        data: restaurants,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch restaurants." });
    }
  }
}
