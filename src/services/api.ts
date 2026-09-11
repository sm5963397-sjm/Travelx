const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
  user?: any;
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("travelx_token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.warn(`[API] Network failure at ${url}:`, error.message);
    return {
      success: false,
      message: error.message || "Failed to reach backend server. Please check your network.",
    };
  }
}

export const api = {
  // Explore
  explore: (lat: number, lng: number, radius = 50, category?: string) => {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
      radius: radius.toString(),
      ...(category && category !== "all" ? { category } : {}),
    });
    return apiFetch(`/explore?${params.toString()}`);
  },

  // Places
  getPlaces: (lat?: number, lng?: number, category?: string) => {
    const params = new URLSearchParams({
      ...(lat ? { lat: lat.toString() } : {}),
      ...(lng ? { lng: lng.toString() } : {}),
      ...(category && category !== "all" ? { category } : {}),
    });
    return apiFetch(`/places?${params.toString()}`);
  },

  getPlaceById: (id: string) => apiFetch(`/places/${id}`),

  // Stays & Restaurants
  getStays: (lat: number, lng: number, radius = 50) =>
    apiFetch(`/stays?lat=${lat}&lng=${lng}&radius=${radius}`),

  getRestaurants: (lat: number, lng: number, radius = 50) =>
    apiFetch(`/restaurants?lat=${lat}&lng=${lng}&radius=${radius}`),

  // Auth
  register: (payload: { name: string; email: string; password: string }) =>
    apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (payload: { email: string; password: string }) =>
    apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getMe: () => apiFetch("/auth/me"),

  // Favorites
  getFavorites: () => apiFetch("/favorites"),

  addFavorite: (payload: { placeId: string; placeName: string; category?: string; image?: string }) =>
    apiFetch("/favorites", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  removeFavorite: (placeId: string) =>
    apiFetch(`/favorites/${placeId}`, {
      method: "DELETE",
    }),

  // Trips
  getTrips: () => apiFetch("/trips"),

  getTripById: (id: string) => apiFetch(`/trips/${id}`),

  createTrip: (trip: any) =>
    apiFetch("/trips", {
      method: "POST",
      body: JSON.stringify(trip),
    }),

  updateTrip: (id: string, updates: any) =>
    apiFetch(`/trips/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    }),

  deleteTrip: (id: string) =>
    apiFetch(`/trips/${id}`, {
      method: "DELETE",
    }),

  // Budget
  calculateBudget: (budgetParams: any) =>
    apiFetch("/budget/calculate", {
      method: "POST",
      body: JSON.stringify(budgetParams),
    }),

  // Search
  search: (query: string, lat?: number, lng?: number) => {
    const params = new URLSearchParams({
      q: query,
      ...(lat ? { lat: lat.toString() } : {}),
      ...(lng ? { lng: lng.toString() } : {}),
    });
    return apiFetch(`/search?${params.toString()}`);
  },

  // AI Recommendations
  getRecommendations: (req: any) =>
    apiFetch("/recommendations", {
      method: "POST",
      body: JSON.stringify(req),
    }),
};
