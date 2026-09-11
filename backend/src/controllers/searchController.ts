import { Request, Response } from "express";
import { SEED_PLACES, SEED_STAYS, SEED_RESTAURANTS } from "../data/seedData";
import { KNOWN_CITIES, calculateDistance } from "../utils/geo";

export class SearchController {
  public static async search(req: Request, res: Response): Promise<void> {
    try {
      const q = (req.query.q as string || "").trim().toLowerCase();
      const lat = req.query.lat ? parseFloat(req.query.lat as string) : undefined;
      const lng = req.query.lng ? parseFloat(req.query.lng as string) : undefined;

      if (!q) {
        res.json({
          success: true,
          data: {
            places: [],
            stays: [],
            restaurants: [],
            cities: [],
          },
        });
        return;
      }

      // 1. Search places
      const matchedPlaces = SEED_PLACES.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      ).map((p) => ({
        ...p,
        distance: lat && lng ? calculateDistance(lat, lng, p.latitude, p.longitude) : undefined,
      }));

      // 2. Search stays
      const matchedStays = SEED_STAYS.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          s.vibe.toLowerCase().includes(q) ||
          s.amenities.some((a) => a.toLowerCase().includes(q))
      ).map((s) => ({
        ...s,
        distance: lat && lng ? calculateDistance(lat, lng, s.latitude, s.longitude) : undefined,
      }));

      // 3. Search restaurants
      const matchedRestaurants = SEED_RESTAURANTS.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.city.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.mustTryDish.toLowerCase().includes(q)
      ).map((r) => ({
        ...r,
        distance: lat && lng ? calculateDistance(lat, lng, r.latitude, r.longitude) : undefined,
      }));

      // 4. Search cities
      const matchedCities = KNOWN_CITIES.filter(
        (c) => c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)
      );

      res.json({
        success: true,
        data: {
          query: q,
          totalMatches:
            matchedPlaces.length +
            matchedStays.length +
            matchedRestaurants.length +
            matchedCities.length,
          places: matchedPlaces,
          stays: matchedStays,
          restaurants: matchedRestaurants,
          cities: matchedCities,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to execute search." });
    }
  }
}
