"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { GeolocationStatus, UserLocation } from "@/types";
import { destinations } from "@/data/destinations";
import { mockReverseGeocode } from "@/utils/geo";

interface LocationContextType {
  status: GeolocationStatus;
  location: UserLocation;
  errorMessage: string | null;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  requestLocation: () => Promise<boolean>;
  setManualLocation: (city: string) => void;
  resetLocationState: () => void;
}

const DEFAULT_LOCATION: UserLocation = {
  city: "Jaipur",
  state: "Rajasthan",
  latitude: 26.9124,
  longitude: 75.7873,
  isCustomManual: false,
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<GeolocationStatus>("initial");
  const [location, setLocation] = useState<UserLocation>(DEFAULT_LOCATION);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Read saved location preference from localStorage if available
  useEffect(() => {
    try {
      const savedLoc = localStorage.getItem("travelx_user_location");
      if (savedLoc) {
        const parsed = JSON.parse(savedLoc);
        setLocation(parsed);
        setStatus("detected");
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const requestLocation = useCallback(async (): Promise<boolean> => {
    setStatus("requesting");
    setErrorMessage(null);

    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setStatus("error");
      setErrorMessage("Geolocation is not supported by your browser.");
      return false;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const detected = mockReverseGeocode(latitude, longitude, destinations);

          const newLoc: UserLocation = {
            latitude,
            longitude,
            city: detected.city,
            state: detected.state,
            isCustomManual: false,
          };

          setLocation(newLoc);
          setStatus("detected");
          try {
            localStorage.setItem("travelx_user_location", JSON.stringify(newLoc));
          } catch {
            // ignore
          }
          resolve(true);
        },
        (error) => {
          console.warn("Geolocation permission error:", error.message);
          if (error.code === error.PERMISSION_DENIED) {
            setStatus("denied");
            setErrorMessage("Location access was denied. You can search or select any destination directly.");
          } else {
            setStatus("error");
            setErrorMessage("Unable to retrieve your current location. Please choose a destination manually.");
          }
          resolve(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    });
  }, []);

  const setManualLocation = useCallback((cityName: string) => {
    const matched = destinations.find(
      (d) => d.name.toLowerCase() === cityName.toLowerCase() || d.id.toLowerCase() === cityName.toLowerCase()
    );

    if (matched) {
      const newLoc: UserLocation = {
        city: matched.name,
        state: matched.state,
        latitude: matched.latitude,
        longitude: matched.longitude,
        isCustomManual: true,
      };
      setLocation(newLoc);
      setStatus("detected");
      try {
        localStorage.setItem("travelx_user_location", JSON.stringify(newLoc));
      } catch {
        // ignore
      }
    } else {
      const customLoc: UserLocation = {
        city: cityName,
        latitude: 26.9124,
        longitude: 75.7873,
        isCustomManual: true,
      };
      setLocation(customLoc);
      setStatus("detected");
    }
    setIsLocationModalOpen(false);
  }, []);

  const resetLocationState = useCallback(() => {
    setStatus("initial");
    setErrorMessage(null);
  }, []);

  return (
    <LocationContext.Provider
      value={{
        status,
        location,
        errorMessage,
        isLocationModalOpen,
        setIsLocationModalOpen,
        requestLocation,
        setManualLocation,
        resetLocationState,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation(): LocationContextType {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
