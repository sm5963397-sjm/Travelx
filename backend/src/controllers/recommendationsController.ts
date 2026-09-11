import { Request, Response } from "express";
import { RecommendationService } from "../services/recommendationService";

export class RecommendationsController {
  public static async getRecommendations(req: Request, res: Response): Promise<void> {
    try {
      const { interests = ["History", "Food"], budget = 2500, availableHours = 6, latitude, longitude } = req.body;

      const recommendations = await RecommendationService.getRecommendations({
        interests: Array.isArray(interests) ? interests : [interests],
        budget: parseFloat(budget),
        availableHours: parseFloat(availableHours),
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
      });

      res.json({
        success: true,
        data: recommendations,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to generate AI recommendations.",
      });
    }
  }
}
