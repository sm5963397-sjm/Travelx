"use client";

import React from "react";
import { LocationProvider, useLocation } from "@/context/LocationContext";
import { SavedProvider } from "@/context/SavedContext";
import LocationModal from "@/components/location/LocationModal";
import Toast from "@/components/ui/Toast";

import { AuthProvider } from "@/context/AuthContext";

function GlobalModal() {
  const { isLocationModalOpen, setIsLocationModalOpen, setManualLocation } = useLocation();

  return (
    <LocationModal
      isOpen={isLocationModalOpen}
      onClose={() => setIsLocationModalOpen(false)}
      onSelect={(city) => setManualLocation(city)}
    />
  );
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LocationProvider>
        <SavedProvider>
          {children}
          <GlobalModal />
          <Toast />
        </SavedProvider>
      </LocationProvider>
    </AuthProvider>
  );
}
