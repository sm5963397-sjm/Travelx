export type Category =
  | "all"
  | "must-visit"
  | "historical"
  | "nature"
  | "food"
  | "stays"
  | "photography"
  | "hidden-gems"
  | "adventure"
  | "shopping"
  | "culture";

export type BudgetLevel = "Free" | "Budget" | "Moderate" | "Luxury";

export type CrowdLevel = "Low" | "Moderate" | "Crowded" | "Very Crowded";

export interface Place {
  id: string;
  name: string;
  city: string;
  state: string;
  category: "historical" | "nature" | "adventure" | "culture" | "photography" | "viewpoint";
  image: string;
  gallery?: string[];
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
  distance?: number; // computed in km relative to current location
  entryFee: number | "Free";
  currency: string;
  visitDuration: string; // e.g. "2-3 hours"
  description: string;
  shortDescription: string;
  tags: string[];
  openingHours: string; // e.g. "9:00 AM - 6:00 PM"
  bestTime: string; // e.g. "Early Morning, Oct-March"
  budgetLevel: BudgetLevel;
  isMustVisit?: boolean;
  isHiddenGem?: boolean;
  whySpecial?: string;
  crowdLevel?: CrowdLevel;
  isPhotoSpot?: boolean;
  photoTip?: string;
  goldenHour?: string;
  address?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  city: string;
  placeCategory: "restaurant" | "cafe" | "street-food" | "local-specialty";
  cuisine: string;
  image: string;
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
  distance?: number;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  costForTwo: number;
  mustTryDish: string;
  description: string;
  address: string;
  openingHours: string;
  tags: string[];
}

export interface StayItem {
  id: string;
  name: string;
  city: string;
  type: "hostel" | "budget-hotel" | "homestay" | "boutique-resort";
  image: string;
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
  distance?: number;
  pricePerNight: number;
  amenities: string[];
  description: string;
  address: string;
  vibe: string;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  tagline: string;
  heroImage: string;
  latitude: number;
  longitude: number;
  popularFor: string[];
  placesCount: number;
  avgBudgetPerDay: number;
}

export type GeolocationStatus =
  | "initial"
  | "requesting"
  | "detected"
  | "denied"
  | "error"
  | "fallback";

export interface UserLocation {
  latitude: number | null;
  longitude: number | null;
  city: string;
  state?: string;
  isCustomManual?: boolean;
}

export interface FilterState {
  category: Category;
  maxDistance: number; // in km, 0 = all
  budgetLevel: string; // "all", "Free", "Budget", "Moderate", "Luxury"
  searchQuery: string;
  sortBy: "popular" | "distance" | "rating" | "budget";
}

export interface TripItineraryDay {
  dayNumber: number;
  title: string;
  activities: {
    time: string;
    placeId?: string;
    placeName: string;
    activity: string;
    cost: number;
    distanceFromPrev: string;
    category: string;
    tip: string;
  }[];
  totalDayCost: number;
}

export interface TripPlan {
  id: string;
  destination: string;
  days: number;
  budget: number;
  interests: string[];
  pace: "relaxed" | "moderate" | "fast";
  daysItinerary: TripItineraryDay[];
  createdAt: string;
}
