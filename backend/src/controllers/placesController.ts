import { Request, Response } from "express";
import { PlacesService } from "../services/placesService";

export class PlacesController {
  public static async getPlaces(req: Request, res: Response): Promise<void> {
    try {
      const lat = req.query.lat ? parseFloat(req.query.lat as string) : 21.1458;
      const lng = req.query.lng ? parseFloat(req.query.lng as string) : 79.0882;
      const category = req.query.category as string | undefined;

      const result = await PlacesService.discoverPlaces({
        latitude: lat,
        longitude: lng,
        category,
      });

      res.json({
        success: true,
        data: result.places,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch places." });
    }
  }

  public static async getPlaceById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const place = await PlacesService.getPlaceById(id);

      if (!place) {
        res.status(404).json({
          success: false,
          message: `Place with ID "${id}" was not found.`,
        });
        return;
      }

      res.json({
        success: true,
        data: place,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch place." });
    }
  }
}
