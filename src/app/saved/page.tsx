"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  Heart,
  Calendar,
  Compass,
  Trash2,
  Share2,
  ArrowRight,
} from "lucide-react";
import { useSaved } from "@/context/SavedContext";
import { places as allPlaces } from "@/data/places";
import PlaceCard from "@/components/cards/PlaceCard";
import ItineraryTimeline from "@/components/itinerary/ItineraryTimeline";
import EmptyState from "@/components/ui/EmptyState";

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState<"places" | "trips">("places");
  const { savedPlaceIds, savedTrips, removeTrip } = useSaved();

  const savedPlaces = allPlaces.filter((p) => savedPlaceIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <Bookmark className="w-4 h-4" />
            <span>Personal Wishlist</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Saved Places & Trips
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Access your bookmarked spots, hidden gems, and customized multi-day itineraries anytime.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab("places")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "places"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Saved Places ({savedPlaces.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("trips")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "trips"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span>Saved Trips ({savedTrips.length})</span>
          </button>
        </div>
      </div>

      {/* Places Content */}
      {activeTab === "places" && (
        <div>
          {savedPlaces.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {savedPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} className="w-full sm:w-full" />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No saved places yet"
              description="Tap the heart icon on any landmark, hidden gem, or photo spot while exploring to bookmark it here."
              actionText="Explore Places Near You"
              onAction={() => (window.location.href = "/explore")}
              icon={<Heart className="w-8 h-8 text-rose-500" />}
            />
          )}
        </div>
      )}

      {/* Trips Content */}
      {activeTab === "trips" && (
        <div className="space-y-6">
          {savedTrips.length > 0 ? (
            savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      Saved Plan
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {trip.days} Days in {trip.destination}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Budget: ₹{trip.budget.toLocaleString()} • Pace: {trip.pace}
                    </p>
                  </div>
                  <button
                    onClick={() => removeTrip(trip.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
                <ItineraryTimeline plan={trip} />
              </div>
            ))
          ) : (
            <EmptyState
              title="No saved trips yet"
              description="Head to the Trip Planner to generate custom day-by-day itineraries and save them for your journeys."
              actionText="Create a Custom Itinerary"
              onAction={() => (window.location.href = "/trip-planner")}
              icon={<Calendar className="w-8 h-8 text-indigo-500" />}
            />
          )}
        </div>
      )}
    </div>
  );
}
