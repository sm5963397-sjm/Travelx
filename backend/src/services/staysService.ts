import { SEED_STAYS, NormalizedStay } from "../data/seedData";
import { calculateDistance, findClosestCity } from "../utils/geo";

export interface StaysQueryOptions {
  latitude: number;
  longitude: number;
  radiusKm?: number;
}

export class StaysService {
  public static async getNearbyStays(options: StaysQueryOptions): Promise<NormalizedStay[]> {
    const { latitude, longitude, radiusKm = 50 } = options;
    const closest = findClosestCity(latitude, longitude);

    const results = SEED_STAYS.map((stay) => {
      const dist = calculateDistance(latitude, longitude, stay.latitude, stay.longitude);
      return {
        ...stay,
        distance: dist,
      };
    });

    const filtered = results.filter(
      (s) => s.distance! <= radiusKm || s.city.toLowerCase() === closest.city.toLowerCase()
    );

    filtered.sort((a, b) => a.distance! - b.distance!);
    return filtered.length > 0 ? filtered : results.slice(0, 4);
  }
}
