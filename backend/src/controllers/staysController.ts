import { Request, Response } from "express";
import { StaysService } from "../services/staysService";

export class StaysController {
  public static async getStays(req: Request, res: Response): Promise<void> {
    try {
      const lat = req.query.lat ? parseFloat(req.query.lat as string) : 21.1458;
      const lng = req.query.lng ? parseFloat(req.query.lng as string) : 79.0882;
      const radiusKm = req.query.radius ? parseFloat(req.query.radius as string) : 50;

      const stays = await StaysService.getNearbyStays({
        latitude: lat,
        longitude: lng,
        radiusKm,
      });

      res.json({
        success: true,
        data: stays,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch stays." });
    }
  }
}
