"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { TripPlan } from "@/types";
import { api } from "@/services/api";

interface SavedContextType {
  savedPlaceIds: string[];
  savedTrips: TripPlan[];
  toggleSavePlace: (id: string, name?: string) => void;
  isPlaceSaved: (id: string) => boolean;
  saveTrip: (trip: TripPlan) => void;
  removeTrip: (id: string) => void;
  toastMessage: string | null;
  clearToast: () => void;
}

const DEFAULT_SAVED_PLACES = ["hawa-mahal", "amber-fort", "jal-mahal"];

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [savedPlaceIds, setSavedPlaceIds] = useState<string[]>(DEFAULT_SAVED_PLACES);
  const [savedTrips, setSavedTrips] = useState<TripPlan[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedPlaces = localStorage.getItem("travelx_saved_places");
      if (storedPlaces) {
        setSavedPlaceIds(JSON.parse(storedPlaces));
      }
      const storedTrips = localStorage.getItem("travelx_saved_trips");
      if (storedTrips) {
        setSavedTrips(JSON.parse(storedTrips));
      }
    } catch {
      // ignore
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const clearToast = () => setToastMessage(null);

  const toggleSavePlace = (id: string, name?: string) => {
    setSavedPlaceIds((prev) => {
      let updated: string[];
      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
        triggerToast(`Removed ${name || "place"} from saved list`);
        // Sync with API
        api.removeFavorite(id).catch((err) => console.warn("API removeFavorite error:", err));
      } else {
        updated = [...prev, id];
        triggerToast(`Saved ${name || "place"} to your wishlist ❤️`);
        // Sync with API
        api
          .addFavorite({ placeId: id, placeName: name || id })
          .catch((err) => console.warn("API addFavorite error:", err));
      }
      try {
        localStorage.setItem("travelx_saved_places", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const isPlaceSaved = (id: string) => savedPlaceIds.includes(id);

  const saveTrip = (trip: TripPlan) => {
    setSavedTrips((prev) => {
      const updated = [trip, ...prev.filter((t) => t.id !== trip.id)];
      try {
        localStorage.setItem("travelx_saved_trips", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    // Sync with API
    api.createTrip(trip).catch((err) => console.warn("API createTrip error:", err));
    triggerToast(`Trip to ${trip.destination} saved to your plans! 📅`);
  };

  const removeTrip = (id: string) => {
    setSavedTrips((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      try {
        localStorage.setItem("travelx_saved_trips", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    // Sync with API
    api.deleteTrip(id).catch((err) => console.warn("API deleteTrip error:", err));
    triggerToast("Trip plan removed");
  };

  return (
    <SavedContext.Provider
      value={{
        savedPlaceIds,
        savedTrips,
        toggleSavePlace,
        isPlaceSaved,
        saveTrip,
        removeTrip,
        toastMessage,
        clearToast,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved(): SavedContextType {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error("useSaved must be used within a SavedProvider");
  }
  return context;
}
