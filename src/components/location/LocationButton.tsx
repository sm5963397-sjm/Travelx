"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Loader2,
  AlertCircle,
  RotateCcw,
  Search,
  CheckCircle2,
} from "lucide-react";
import { useLocation } from "@/context/LocationContext";

interface LocationButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "header";
  showFallbackOnDenied?: boolean;
}

export default function LocationButton({
  className = "",
  variant = "primary",
  showFallbackOnDenied = true,
}: LocationButtonProps) {
  const router = useRouter();
  const {
    status,
    location,
    errorMessage,
    requestLocation,
    setIsLocationModalOpen,
    resetLocationState,
  } = useLocation();

  const handleExploreNearMe = async () => {
    const success = await requestLocation();
    if (success) {
      router.push("/explore");
    }
  };

  // State 1: Requesting Geolocation Permission
  if (status === "requesting") {
    return (
      <div className="flex flex-col items-center">
        <button
          disabled
          className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold bg-indigo-600/80 text-white cursor-wait shadow-lg shadow-indigo-600/25 ${className}`}
        >
          <Loader2 className="w-5 h-5 animate-spin text-white" />
          <span>Detecting your location...</span>
        </button>
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 animate-pulse">
          Please allow location access in your browser
        </span>
      </div>
    );
  }

  // State 2: Location Detected Successfully
  if (status === "detected" && variant === "header") {
    return (
      <button
        onClick={() => setIsLocationModalOpen(true)}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 hover:bg-indigo-100 transition-colors cursor-pointer ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
        <span>You&apos;re in {location.city}</span>
        <span className="text-[11px] font-normal text-indigo-500 dark:text-indigo-400 underline ml-0.5">
          Change
        </span>
      </button>
    );
  }

  // State 3: Permission Denied State
  if (status === "denied") {
    return (
      <div className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-center max-w-md mx-auto">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 font-semibold text-sm">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Location access is unavailable</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {errorMessage || "You denied location permission. You can search or select a destination instead."}
        </p>

        <div className="flex items-center gap-2.5 flex-wrap justify-center mt-1">
          {/* Fallback Action */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm cursor-pointer transition-all active:scale-95"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Destination Instead</span>
          </button>

          {/* Retry Action */}
          <button
            onClick={handleExploreNearMe}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  // State 4: Error State
  if (status === "error") {
    return (
      <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center max-w-sm">
        <div className="flex items-center gap-1.5 text-xs text-rose-700 dark:text-rose-300 font-semibold">
          <AlertCircle className="w-4 h-4" />
          <span>Location error occurred</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={handleExploreNearMe}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Retry
          </button>
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            Choose City Manually
          </button>
        </div>
      </div>
    );
  }

  // Initial / Default State
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <button
        onClick={handleExploreNearMe}
        className={`group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-200 shadow-lg shadow-indigo-600/30 cursor-pointer ${className}`}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
        </span>
        <MapPin className="w-5 h-5 text-amber-300 group-hover:animate-bounce" />
        <span>Explore Near Me</span>
      </button>

      <button
        onClick={() => setIsLocationModalOpen(true)}
        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base text-slate-700 dark:text-slate-200 bg-white/90 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 active:scale-95 transition-all shadow-sm cursor-pointer"
      >
        <Search className="w-4 h-4 text-slate-400" />
        <span>Search Destination</span>
      </button>
    </div>
  );
}
