import { SEED_PLACES, NormalizedPlace } from "../data/seedData";
import { calculateDistance, findClosestCity } from "../utils/geo";

export interface RecommendationRequest {
  interests: string[];
  budget: number;
  availableHours: number;
  latitude?: number;
  longitude?: number;
}

export interface RecommendationResponse {
  recommendationTitle: string;
  summary: string;
  suggestedPace: string;
  estimatedTotalCost: number;
  places: (NormalizedPlace & { whyRecommended: string })[];
  recommendedEatery?: string;
}

export class RecommendationService {
  public static async getRecommendations(
    req: RecommendationRequest
  ): Promise<RecommendationResponse> {
    const { interests, budget, availableHours, latitude = 21.1458, longitude = 79.0882 } = req;
    const closest = findClosestCity(latitude, longitude);

    // Filter and score places based on interests
    const scoredPlaces = SEED_PLACES.map((p) => {
      let score = 0;
      const tagsAndCategory = [...p.tags, p.category, p.name].map((s) => s.toLowerCase());

      interests.forEach((interest) => {
        const lowerInterest = interest.toLowerCase();
        if (tagsAndCategory.some((t) => t.includes(lowerInterest))) {
          score += 3;
        }
      });

      if (p.isMustVisit) score += 2;
      if (p.rating >= 4.8) score += 1;

      const dist = calculateDistance(latitude, longitude, p.latitude, p.longitude);
      // Distance penalty if beyond 25km
      if (dist < 15) score += 2;

      return {
        ...p,
        distance: dist,
        score,
      };
    });

    scoredPlaces.sort((a, b) => b.score - a.score);

    // Limit places according to available hours (assuming ~2 hours per place)
    const placeCount = Math.max(1, Math.min(4, Math.floor(availableHours / 2)));
    const selected = scoredPlaces.slice(0, placeCount);

    const placesWithReasons = selected.map((p) => {
      const matchedInterest = interests.find((i) =>
        [...p.tags, p.category].some((t) => t.toLowerCase().includes(i.toLowerCase()))
      );

      return {
        ...p,
        whyRecommended: matchedInterest
          ? `Perfect match for your interest in ${matchedInterest} with a ${p.rating}★ rating.`
          : `High-rated landmark within easy reach of ${closest.city}.`,
      };
    });

    const totalCost = placesWithReasons.reduce((acc, p) => {
      const fee = typeof p.entryFee === "number" ? p.entryFee : 0;
      return acc + fee;
    }, 0) + 400; // adding local transit & snacks allowance

    return {
      recommendationTitle: `Curated ${closest.city} Discovery for You`,
      summary: `Tailored for ${interests.join(", ")} within a ₹${budget} budget and ${availableHours} hours available.`,
      suggestedPace: availableHours <= 4 ? "Fast / Highlights" : "Comfortable & Immersive",
      estimatedTotalCost: totalCost,
      places: placesWithReasons,
      recommendedEatery: `Local favorite spot nearby with ~₹200 avg meal`,
    };
  }
}
