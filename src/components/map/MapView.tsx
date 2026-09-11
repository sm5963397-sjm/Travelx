"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Navigation,
  Sparkles,
  Camera,
  Utensils,
  Bed,
  Layers,
  ZoomIn,
  ZoomOut,
  X,
  ExternalLink,
} from "lucide-react";
import { Place, FoodItem, StayItem, UserLocation } from "@/types";
import Rating from "@/components/ui/Rating";
import DistanceBadge from "@/components/ui/DistanceBadge";
import { formatCurrency } from "@/utils/formatters";

interface MapViewProps {
  userLocation: UserLocation;
  places: Place[];
  foodItems?: FoodItem[];
  stayItems?: StayItem[];
  selectedPlaceId?: string;
  onSelectPlace?: (placeId: string) => void;
  height?: string;
  className?: string;
}

export default function MapView({
  userLocation,
  places,
  foodItems = [],
  stayItems = [],
  selectedPlaceId,
  onSelectPlace,
  height = "h-[500px]",
  className = "",
}: MapViewProps) {
  const [activeTab, setActiveTab] = useState<"all" | "places" | "food" | "stays">("all");
  const [activeItem, setActiveItem] = useState<any | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Compute bounding box around current places or user location
  const centerLat = userLocation.latitude || 26.9124;
  const centerLng = userLocation.longitude || 75.7873;

  // Projection helper: maps lat/lng differences to percentage positions (0% to 100%) on SVG
  const projectToMap = (lat: number, lng: number) => {
    // Spread around center
    const latSpan = 0.22 / zoomLevel;
    const lngSpan = 0.22 / zoomLevel;

    const x = 50 + ((lng - centerLng) / lngSpan) * 45;
    const y = 50 - ((lat - centerLat) / latSpan) * 45;

    // Clamp inside viewport
    const clampedX = Math.max(8, Math.min(92, x));
    const clampedY = Math.max(10, Math.min(90, y));

    return { x: clampedX, y: clampedY };
  };

  const visiblePlaces = places.slice(0, 10);
  const visibleFood = foodItems.slice(0, 6);
  const visibleStays = stayItems.slice(0, 5);

  const handleMarkerClick = (item: any, type: "place" | "food" | "stay") => {
    setActiveItem({ ...item, itemType: type });
    if (onSelectPlace && item.id) {
      onSelectPlace(item.id);
    }
  };

  return (
    <div
      className={`relative w-full ${height} rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-inner select-none ${className}`}
    >
      {/* Visual Realistic Map Background Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {/* Subtle grid pattern & topography roads simulation */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        />
        {/* Simulated waterways and major roadways */}
        <svg className="w-full h-full text-slate-800" preserveAspectRatio="none">
          <path
            d="M -100 200 Q 200 150 400 320 T 900 250 T 1400 400"
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="12"
            strokeOpacity="0.4"
          />
          <path
            d="M 100 -50 Q 300 250 500 280 T 800 650"
            fill="none"
            stroke="#334155"
            strokeWidth="8"
            strokeOpacity="0.6"
          />
          <path
            d="M -50 400 Q 400 380 900 500"
            fill="none"
            stroke="#334155"
            strokeWidth="6"
            strokeOpacity="0.6"
          />
        </svg>
      </div>

      {/* Top Map Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 shadow-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
              activeTab === "all"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-300 hover:text-white"
            }`}
          >
            All Pins
          </button>
          <button
            onClick={() => setActiveTab("places")}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
              activeTab === "places"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Attractions
          </button>
          <button
            onClick={() => setActiveTab("food")}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
              activeTab === "food"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Food
          </button>
          <button
            onClick={() => setActiveTab("stays")}
            className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
              activeTab === "stays"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Stays
          </button>
        </div>

        {/* Zoom & Center Controls */}
        <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 rounded-2xl p-1 shadow-lg">
          <button
            onClick={() => setZoomLevel((z) => Math.min(2, z + 0.3))}
            aria-label="Zoom in"
            className="p-1.5 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.3))}
            aria-label="Zoom out"
            className="p-1.5 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Markers Layer */}
      <div className="absolute inset-0 pointer-events-auto">
        {/* User Location Radar Pulse Marker */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
          style={{ left: "50%", top: "50%" }}
          onClick={() => alert(`Your current detected location is near ${userLocation.city}`)}
        >
          <div className="relative flex items-center justify-center">
            {/* Radar wave animation */}
            <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-indigo-500 opacity-60"></span>
            <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-600/50 border-2 border-white">
              <Navigation className="w-4 h-4 fill-white rotate-45" />
            </span>
          </div>
          <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-slate-900/90 text-white text-[11px] font-bold border border-slate-700 shadow-md">
            You Are Here
          </div>
        </div>

        {/* Attractions Markers */}
        {(activeTab === "all" || activeTab === "places") &&
          visiblePlaces.map((place) => {
            const { x, y } = projectToMap(place.latitude, place.longitude);
            const isSelected = activeItem?.id === place.id;

            return (
              <div
                key={place.id}
                onClick={() => handleMarkerClick(place, "place")}
                className="absolute -translate-x-1/2 -translate-y-full z-20 cursor-pointer transition-transform duration-200 hover:scale-125 hover:z-40"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-2xl shadow-lg border-2 border-white dark:border-slate-900 transition-all ${
                    place.isPhotoSpot
                      ? "bg-violet-600 text-white"
                      : place.isHiddenGem
                      ? "bg-indigo-600 text-white"
                      : "bg-rose-500 text-white"
                  } ${isSelected ? "ring-4 ring-white scale-125" : ""}`}
                >
                  {place.isPhotoSpot ? (
                    <Camera className="w-3.5 h-3.5" />
                  ) : place.isHiddenGem ? (
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  ) : (
                    <MapPin className="w-4 h-4 fill-white" />
                  )}
                </div>
              </div>
            );
          })}

        {/* Food Markers */}
        {(activeTab === "all" || activeTab === "food") &&
          visibleFood.map((food) => {
            const { x, y } = projectToMap(food.latitude, food.longitude);
            const isSelected = activeItem?.id === food.id;

            return (
              <div
                key={food.id}
                onClick={() => handleMarkerClick(food, "food")}
                className="absolute -translate-x-1/2 -translate-y-full z-20 cursor-pointer transition-transform duration-200 hover:scale-125 hover:z-40"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-full bg-amber-500 text-white shadow-lg border-2 border-white ${
                    isSelected ? "ring-4 ring-amber-300 scale-125" : ""
                  }`}
                >
                  <Utensils className="w-3 h-3" />
                </div>
              </div>
            );
          })}

        {/* Stays Markers */}
        {(activeTab === "all" || activeTab === "stays") &&
          visibleStays.map((stay) => {
            const { x, y } = projectToMap(stay.latitude, stay.longitude);
            const isSelected = activeItem?.id === stay.id;

            return (
              <div
                key={stay.id}
                onClick={() => handleMarkerClick(stay, "stay")}
                className="absolute -translate-x-1/2 -translate-y-full z-20 cursor-pointer transition-transform duration-200 hover:scale-125 hover:z-40"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white shadow-lg border-2 border-white ${
                    isSelected ? "ring-4 ring-blue-300 scale-125" : ""
                  }`}
                >
                  <Bed className="w-3 h-3" />
                </div>
              </div>
            );
          })}
      </div>

      {/* Selected Marker Detail Card (Bottom Floating Popup) */}
      {activeItem && (
        <div className="absolute bottom-4 left-4 right-4 z-40 max-w-sm mx-auto animate-in slide-in-from-bottom-5 duration-200">
          <div className="p-3.5 rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/70 text-white shadow-2xl flex items-center gap-3">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-slate-800">
              <Image
                src={activeItem.image}
                alt={activeItem.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                  {activeItem.itemType || "Attraction"}
                </span>
                <button
                  onClick={() => setActiveItem(null)}
                  className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h4 className="font-bold text-sm text-white truncate">
                {activeItem.name}
              </h4>

              <div className="flex items-center gap-2 mt-1">
                <Rating score={activeItem.rating} size="sm" showCount={false} />
                <span className="text-xs text-slate-300">
                  {activeItem.distance ? `${activeItem.distance} km` : activeItem.city}
                </span>
              </div>
            </div>

            {activeItem.itemType === "place" && (
              <Link
                href={`/places/${activeItem.id}`}
                className="p-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0 transition-colors shadow-xs"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Map Attribution and Coordinates Bar */}
      <div className="absolute bottom-2 left-4 z-10 text-[10px] text-slate-500 flex items-center gap-2 pointer-events-none">
        <span>TRAVELX Interactive Engine</span>
        <span>•</span>
        <span>
          {centerLat.toFixed(4)}° N, {centerLng.toFixed(4)}° E ({userLocation.city})
        </span>
      </div>
    </div>
  );
}
