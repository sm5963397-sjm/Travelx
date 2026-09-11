import { Destination } from "@/types";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Haversine formula to compute great-circle distance in kilometers
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10; // 1 decimal place
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// Reverse geocode mock that identifies closest city among our supported destinations
export function mockReverseGeocode(
  lat: number,
  lng: number,
  destinations: Destination[]
): { city: string; state: string; distanceToCenter: number } {
  let closestDest = destinations[0];
  let minDistance = Infinity;

  for (const dest of destinations) {
    const dist = calculateDistance(lat, lng, dest.latitude, dest.longitude);
    if (dist < minDistance) {
      minDistance = dist;
      closestDest = dest;
    }
  }

  // If within 120km of a known city, snap to that city, otherwise default to the closest city for rich discovery
  return {
    city: closestDest.name,
    state: closestDest.state,
    distanceToCenter: minDistance,
  };
}
