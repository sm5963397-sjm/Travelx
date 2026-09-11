"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Ticket,
  Navigation,
  Sparkles,
  Camera,
  Star,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Share2,
  Bed,
  Utensils,
  ArrowRight,
  Sun,
  ShieldCheck,
} from "lucide-react";
import { Place, UserLocation, StayItem, FoodItem } from "@/types";
import { formatCurrency } from "@/utils/formatters";
import SaveButton from "@/components/ui/SaveButton";
import Rating from "@/components/ui/Rating";
import DistanceBadge from "@/components/ui/DistanceBadge";

interface VerticalPlaceStreamProps {
  places: Place[];
  userLocation: UserLocation;
  stays?: StayItem[];
  restaurants?: FoodItem[];
  onSelectCategory?: (category: string) => void;
}

export default function VerticalPlaceStream({
  places,
  userLocation,
  stays = [],
  restaurants = [],
}: VerticalPlaceStreamProps) {
  const [expandedNearbyPlaceId, setExpandedNearbyPlaceId] = useState<string | null>(null);

  const toggleNearby = (placeId: string) => {
    setExpandedNearbyPlaceId((prev) => (prev === placeId ? null : placeId));
  };

  const handleDirections = (place: Place) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-12 sm:space-y-16 max-w-4xl mx-auto">
      {/* Sticky Current Location Radar Banner */}
      <div className="sticky top-20 z-30 p-4 sm:p-5 rounded-3xl bg-slate-900/90 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl text-white transition-all">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-semibold uppercase tracking-wider">
                <Navigation className="w-3.5 h-3.5 rotate-45 text-amber-300" />
                <span>Current Exploration Origin</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>{userLocation.city}</span>
                {userLocation.state && (
                  <span className="text-xs font-normal text-slate-400">({userLocation.state})</span>
                )}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-full bg-white/10 text-slate-200 border border-white/10 font-medium">
              {places.length} curated places nearby
            </span>
            <span className="hidden md:inline-flex px-3 py-1.5 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 font-medium">
              Sorted by distance
            </span>
          </div>
        </div>

        {/* Quick jump navigation numbers */}
        {places.length > 1 && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-800 overflow-x-auto no-scrollbar">
            <span className="text-[11px] text-slate-400 uppercase font-semibold shrink-0">
              Jump to:
            </span>
            {places.slice(0, 10).map((p, idx) => (
              <a
                key={p.id}
                href={`#place-stream-${p.id}`}
                className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-indigo-600 text-[11px] font-bold text-slate-300 hover:text-white transition-colors shrink-0"
              >
                #{String(idx + 1).padStart(2, "0")} {p.name.split(" ")[0]}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Vertical Place-by-Place Stream */}
      <div className="space-y-12 sm:space-y-20">
        {places.map((place, index) => {
          const formattedIndex = String(index + 1).padStart(2, "0");
          const isExpanded = expandedNearbyPlaceId === place.id;

          // Find nearby stay and restaurant for this specific place
          const matchingStay =
            stays.find((s) => s.city.toLowerCase() === place.city.toLowerCase()) || stays[0];
          const matchingRestaurant =
            restaurants.find((r) => r.city.toLowerCase() === place.city.toLowerCase()) ||
            restaurants[0];

          return (
            <article
              id={`place-stream-${place.id}`}
              key={place.id}
              className="group relative rounded-3xl sm:rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Giant Top Visual Layer */}
              <div className="relative h-[280px] sm:h-[420px] w-full overflow-hidden bg-slate-950">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

                {/* Top Overlay: Sequence Number & Save Button */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3.5 py-1 rounded-full text-xs font-black tracking-widest uppercase bg-black/60 text-amber-300 border border-amber-300/30 backdrop-blur-md shadow-lg">
                      PLACE {formattedIndex}
                    </span>
                    <DistanceBadge
                      distance={place.distance}
                      className="bg-black/60 text-white border-white/20 backdrop-blur-md"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <SaveButton placeId={place.id} placeName={place.name} />
                  </div>
                </div>

                {/* Bottom Overlay inside Photo: Category & Photo Tips */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10 text-white">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600/90 text-white backdrop-blur-md">
                      {place.category}
                    </span>
                    {place.isMustVisit && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/90 text-white backdrop-blur-md">
                        🔥 Must Visit
                      </span>
                    )}
                    {place.isHiddenGem && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/90 text-slate-900 font-black backdrop-blur-md">
                        💎 Hidden Gem
                      </span>
                    )}
                    {place.isPhotoSpot && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-600/90 text-white backdrop-blur-md flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5" /> Photo Spot
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                    {place.name}
                  </h3>
                </div>
              </div>

              {/* Main Card Content Body */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Rating & Fast Info Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <Rating score={place.rating} reviewCount={place.reviewCount} size="md" />
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                      {place.city}, {place.state}
                    </span>
                  </div>

                  {place.crowdLevel && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          place.crowdLevel === "Low"
                            ? "bg-emerald-500"
                            : place.crowdLevel === "Moderate"
                            ? "bg-amber-500"
                            : "bg-rose-500"
                        }`}
                      />
                      <span>{place.crowdLevel} crowd right now</span>
                    </div>
                  )}
                </div>

                {/* Narrative Description */}
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {place.description}
                </p>

                {/* Photo Spot Tip Callout if present */}
                {place.photoTip && (
                  <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-start gap-3">
                    <Camera className="w-5 h-5 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700 dark:text-slate-300 space-y-0.5">
                      <strong className="font-bold text-violet-900 dark:text-violet-200 block">
                        Photographer&apos;s Pro Tip:
                      </strong>
                      <span>{place.photoTip}</span>
                      {place.goldenHour && (
                        <span className="block text-violet-600 dark:text-violet-400 font-semibold mt-1">
                          🌅 Golden Hour: {place.goldenHour}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Practical Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 block mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Visit Time
                    </span>
                    <strong className="text-slate-900 dark:text-white font-bold text-sm">
                      {place.visitDuration}
                    </strong>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 block mb-1 flex items-center gap-1">
                      <Ticket className="w-3.5 h-3.5 text-indigo-500" /> Entry Fee
                    </span>
                    <strong className="text-slate-900 dark:text-white font-bold text-sm">
                      {formatCurrency(place.entryFee)}
                    </strong>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 block mb-1 flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5 text-amber-500" /> Best Time
                    </span>
                    <strong className="text-slate-900 dark:text-white font-bold text-sm truncate block">
                      {place.bestTime ? place.bestTime.split("(")[0] : "Morning"}
                    </strong>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 block mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" /> Hours
                    </span>
                    <strong className="text-slate-900 dark:text-white font-bold text-sm truncate block">
                      {place.openingHours}
                    </strong>
                  </div>
                </div>

                {/* Primary Action Button Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/places/${place.id}`}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all shadow-md shadow-indigo-600/25 cursor-pointer"
                    >
                      <span>Explore Place Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleDirections(place)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
                      title="Open Google Maps Navigation"
                    >
                      <Navigation className="w-4 h-4 text-indigo-600 dark:text-indigo-400 rotate-45" />
                      <span className="hidden sm:inline">Directions</span>
                    </button>
                  </div>

                  {/* Toggle Nearby Stays & Restaurants Drawer */}
                  <button
                    onClick={() => toggleNearby(place.id)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-2xl text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800 transition-all cursor-pointer"
                  >
                    <span>Stays & Food Near Here</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Collapsible Nearby Recommendations Section */}
                {isExpanded && (
                  <div className="mt-4 pt-6 border-t border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-3 duration-200 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Recommended Accommodations & Dining Near {place.name}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Stay Mini-Card */}
                      {matchingStay && (
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3">
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-700">
                            <Image
                              src={matchingStay.image}
                              alt={matchingStay.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                              <Bed className="w-3 h-3" /> Stay Nearby
                            </span>
                            <h5 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                              {matchingStay.name}
                            </h5>
                            <span className="text-xs text-amber-500 font-bold block mt-0.5">
                              ~₹{matchingStay.pricePerNight}
                              <span className="text-[10px] font-normal text-slate-400">/night</span>
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Food Mini-Card */}
                      {matchingRestaurant && (
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3">
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-700">
                            <Image
                              src={matchingRestaurant.image}
                              alt={matchingRestaurant.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                              <Utensils className="w-3 h-3" /> Eat Near Here
                            </span>
                            <h5 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                              {matchingRestaurant.name}
                            </h5>
                            <span className="text-xs text-slate-500 dark:text-slate-400 block truncate mt-0.5">
                              Must Try: {matchingRestaurant.mustTryDish}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
