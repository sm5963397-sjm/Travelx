import { Request, Response } from "express";
import { PlacesService } from "../services/placesService";

export class ExploreController {
  public static async explore(req: Request, res: Response): Promise<void> {
    try {
      const latParam = req.query.latitude || req.query.lat;
      const lngParam = req.query.longitude || req.query.lng;
      const radiusParam = req.query.radius || req.query.radiusKm;
      const categoryParam = req.query.category as string | undefined;
      const searchParam = req.query.search || req.query.q;

      // Default to Nagpur / Central India if no coordinates are supplied
      const latitude = latParam ? parseFloat(latParam as string) : 21.1458;
      const longitude = lngParam ? parseFloat(lngParam as string) : 79.0882;
      const radiusKm = radiusParam ? parseFloat(radiusParam as string) : 50;

      if (isNaN(latitude) || isNaN(longitude)) {
        res.status(400).json({
          success: false,
          message: "Valid latitude and longitude are required.",
        });
        return;
      }

      const discovery = await PlacesService.discoverPlaces({
        latitude,
        longitude,
        radiusKm,
        category: categoryParam,
        search: searchParam as string,
      });

      res.json({
        success: true,
        data: {
          detectedLocation: {
            city: discovery.city,
            state: discovery.state,
            userCoordinates: { latitude, longitude },
          },
          totalCount: discovery.places.length,
          places: discovery.places,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to explore nearby places.",
      });
    }
  }
}
