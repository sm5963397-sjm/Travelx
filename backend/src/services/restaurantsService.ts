import { SEED_RESTAURANTS, NormalizedRestaurant } from "../data/seedData";
import { calculateDistance, findClosestCity } from "../utils/geo";

export interface RestaurantQueryOptions {
  latitude: number;
  longitude: number;
  radiusKm?: number;
}

export class RestaurantsService {
  public static async getNearbyRestaurants(
    options: RestaurantQueryOptions
  ): Promise<NormalizedRestaurant[]> {
    const { latitude, longitude, radiusKm = 50 } = options;
    const closest = findClosestCity(latitude, longitude);

    const results = SEED_RESTAURANTS.map((rest) => {
      const dist = calculateDistance(latitude, longitude, rest.latitude, rest.longitude);
      return {
        ...rest,
        distance: dist,
      };
    });

    const filtered = results.filter(
      (r) => r.distance! <= radiusKm || r.city.toLowerCase() === closest.city.toLowerCase()
    );

    filtered.sort((a, b) => a.distance! - b.distance!);
    return filtered.length > 0 ? filtered : results.slice(0, 4);
  }
}
