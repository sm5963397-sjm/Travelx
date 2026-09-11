export interface Coordinates {
  latitude: number;
  longitude: number;
}

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
  return Math.round(d * 10) / 10;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export interface CityReference {
  id: string;
  name: string;
  state: string;
  latitude: number;
  longitude: number;
}

export const KNOWN_CITIES: CityReference[] = [
  { id: "jaipur", name: "Jaipur", state: "Rajasthan", latitude: 26.9124, longitude: 75.7873 },
  { id: "udaipur", name: "Udaipur", state: "Rajasthan", latitude: 24.5854, longitude: 73.7125 },
  { id: "varanasi", name: "Varanasi", state: "Uttar Pradesh", latitude: 25.3176, longitude: 82.9739 },
  { id: "manali", name: "Manali", state: "Himachal Pradesh", latitude: 32.2396, longitude: 77.1887 },
  { id: "goa", name: "Goa", state: "Goa", latitude: 15.2993, longitude: 74.124 },
  { id: "nagpur", name: "Nagpur", state: "Maharashtra", latitude: 21.1458, longitude: 79.0882 },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", latitude: 19.076, longitude: 72.8777 },
  { id: "delhi", name: "Delhi", state: "Delhi", latitude: 28.6139, longitude: 77.209 },
  { id: "bengaluru", name: "Bengaluru", state: "Karnataka", latitude: 12.9716, longitude: 77.5946 },
  { id: "agra", name: "Agra", state: "Uttar Pradesh", latitude: 27.1767, longitude: 78.0081 },
];

export function findClosestCity(lat: number, lng: number): { city: string; state: string; distance: number } {
  let closest = KNOWN_CITIES[0];
  let min = Infinity;

  for (const c of KNOWN_CITIES) {
    const dist = calculateDistance(lat, lng, c.latitude, c.longitude);
    if (dist < min) {
      min = dist;
      closest = c;
    }
  }

  return {
    city: closest.name,
    state: closest.state,
    distance: min,
  };
}
