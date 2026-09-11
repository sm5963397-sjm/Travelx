import axios from "axios";
import { calculateDistance, findClosestCity } from "../utils/geo";
import { SEED_PLACES, NormalizedPlace } from "../data/seedData";
import { PlaceModel } from "../models/Place";
import { isDbConnected } from "../config/db";

// In-memory cache for coordinates/grid lookups to reduce external calls & improve response times
const placesCache = new Map<string, { timestamp: number; data: NormalizedPlace[] }>();
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes

export interface ExploreOptions {
  latitude: number;
  longitude: number;
  radiusKm?: number;
  category?: string;
  search?: string;
}

export class PlacesService {
  /**
   * Discovers places around given coordinates with provider fallback and normalization
   */
  public static async discoverPlaces(options: ExploreOptions): Promise<{
    city: string;
    state: string;
    places: NormalizedPlace[];
  }> {
    const { latitude, longitude, radiusKm = 50, category, search } = options;

    // Cache key rounded to ~2km grid cell for high hit-rate
    const cacheKey = `${latitude.toFixed(2)}_${longitude.toFixed(2)}_${radiusKm}_${category || "all"}_${search || ""}`;
    const cached = placesCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      const closest = findClosestCity(latitude, longitude);
      return {
        city: closest.city,
        state: closest.state,
        places: cached.data,
      };
    }

    // 1. Determine nearby city
    const closestCity = findClosestCity(latitude, longitude);

    // 2. Fetch from DB if connected, otherwise use in-memory seed catalog
    let allAvailablePlaces: NormalizedPlace[] = [];

    if (isDbConnected()) {
      try {
        const dbPlaces = await PlaceModel.find().lean();
        if (dbPlaces && dbPlaces.length > 0) {
          allAvailablePlaces = dbPlaces.map((p: any) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            description: p.description,
            shortDescription: p.shortDescription || p.description,
            city: p.city,
            state: p.state || closestCity.state,
            latitude: p.latitude,
            longitude: p.longitude,
            rating: p.rating,
            reviewCount: p.reviewCount,
            photos: p.photos || [p.image],
            image: p.image,
            openingHours: p.openingHours,
            entryFee: p.entryFee,
            currency: p.currency || "₹",
            visitDuration: p.visitDuration || "2 hours",
            bestTime: p.bestTime || "Morning to afternoon",
            address: p.address || `${p.name}, ${p.city}`,
            tags: p.tags || [],
            isMustVisit: !!p.isMustVisit,
            isHiddenGem: !!p.isHiddenGem,
            isPhotoSpot: !!p.isPhotoSpot,
            crowdLevel: p.crowdLevel || "Moderate",
          }));
        }
      } catch (err) {
        console.warn("MongoDB fetch fallback to seed places:", err);
      }
    }

    if (allAvailablePlaces.length === 0) {
      allAvailablePlaces = [...SEED_PLACES];
    }

    // 3. Compute distance relative to user coordinates and filter
    let results = allAvailablePlaces.map((place) => {
      const dist = calculateDistance(latitude, longitude, place.latitude, place.longitude);
      return {
        ...place,
        distance: dist,
      };
    });

    // If matches closest city or within radius, prioritize
    results = results.filter((place) => {
      const isWithinRadius = place.distance! <= radiusKm;
      const isSameCity = place.city.toLowerCase() === closestCity.city.toLowerCase();

      // If user is far from any seeded city, still show top relevant places with accurate distance
      return isWithinRadius || isSameCity;
    });

    // If no places fall strictly within the radius, show places sorted by distance
    if (results.length === 0) {
      results = allAvailablePlaces
        .map((place) => ({
          ...place,
          distance: calculateDistance(latitude, longitude, place.latitude, place.longitude),
        }))
        .sort((a, b) => a.distance! - b.distance!)
        .slice(0, 8);
    } else {
      results.sort((a, b) => a.distance! - b.distance!);
    }

    // Apply category filter if requested
    if (category && category !== "all") {
      results = results.filter((p) => {
        if (category === "must-visit") return p.isMustVisit;
        if (category === "hidden-gems") return p.isHiddenGem;
        if (category === "photography") return p.isPhotoSpot;
        return p.category.toLowerCase() === category.toLowerCase();
      });
    }

    // Apply search filter if requested
    if (search && search.trim() !== "") {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Store in cache
    placesCache.set(cacheKey, { timestamp: Date.now(), data: results });

    return {
      city: closestCity.city,
      state: closestCity.state,
      places: results,
    };
  }

  /**
   * Retrieves single place details by ID
   */
  public static async getPlaceById(id: string): Promise<NormalizedPlace | null> {
    if (isDbConnected()) {
      try {
        const p: any = await PlaceModel.findOne({ id }).lean();
        if (p) {
          return {
            id: p.id,
            name: p.name,
            category: p.category,
            description: p.description,
            shortDescription: p.shortDescription || p.description,
            city: p.city,
            state: p.state || "",
            latitude: p.latitude,
            longitude: p.longitude,
            rating: p.rating,
            reviewCount: p.reviewCount,
            photos: p.photos || [p.image],
            image: p.image,
            openingHours: p.openingHours,
            entryFee: p.entryFee,
            currency: p.currency || "₹",
            visitDuration: p.visitDuration,
            bestTime: p.bestTime,
            address: p.address,
            tags: p.tags || [],
            isMustVisit: !!p.isMustVisit,
            isHiddenGem: !!p.isHiddenGem,
            isPhotoSpot: !!p.isPhotoSpot,
            crowdLevel: p.crowdLevel,
          };
        }
      } catch (err) {
        console.warn("DB findOne error:", err);
      }
    }

    const matched = SEED_PLACES.find((p) => p.id === id);
    return matched || null;
  }

  public static async seedInitialPlaces(): Promise<void> {
    if (isDbConnected()) {
      try {
        const count = await PlaceModel.countDocuments();
        if (count === 0) {
          await PlaceModel.insertMany(SEED_PLACES);
          console.log(`🌱 Seeded ${SEED_PLACES.length} places into MongoDB database.`);
        }
      } catch (err: any) {
        console.warn("Place seed error:", err.message);
      }
    }
  }
}
