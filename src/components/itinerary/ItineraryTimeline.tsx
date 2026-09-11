"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  MapPin,
  Ticket,
  Lightbulb,
  Bookmark,
  Share2,
  Calendar,
  CheckCircle2,
  Navigation,
} from "lucide-react";
import { TripPlan, TripItineraryDay } from "@/types";
import { useSaved } from "@/context/SavedContext";
import { formatCurrency } from "@/utils/formatters";

interface ItineraryTimelineProps {
  plan: TripPlan;
}

export default function ItineraryTimeline({ plan }: ItineraryTimelineProps) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const { saveTrip, savedTrips } = useSaved();

  const isSaved = savedTrips.some((t) => t.id === plan.id);
  const currentDay = plan.daysItinerary[activeDayIndex] || plan.daysItinerary[0];

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Itinerary link copied to clipboard! 📋");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>AI Suggested Itinerary</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {plan.days} Days in {plan.destination}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Pace: <span className="capitalize text-white font-medium">{plan.pace}</span> •
            Budget: <span className="text-white font-medium">₹{plan.budget.toLocaleString()}</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => saveTrip(plan)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isSaved
                ? "bg-emerald-500 text-white shadow-emerald-500/25"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25"
            }`}
          >
            {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSaved ? "Saved to Plans" : "Save Itinerary"}</span>
          </button>

          <button
            onClick={handleShare}
            aria-label="Share itinerary"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {plan.daysItinerary.map((day, idx) => {
          const isActive = idx === activeDayIndex;

          return (
            <button
              key={day.dayNumber}
              onClick={() => setActiveDayIndex(idx)}
              className={`flex flex-col items-start px-5 py-2.5 rounded-2xl transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                Day {day.dayNumber}
              </span>
              <span className="text-xs font-semibold line-clamp-1 max-w-[140px]">
                {day.title.split("&")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Day Card */}
      {currentDay && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Day {currentDay.dayNumber} Plan
              </span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {currentDay.title}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Est. Day Cost</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {formatCurrency(currentDay.totalDayCost)}
              </span>
            </div>
          </div>

          {/* Activities Timeline */}
          <div className="relative pl-6 sm:pl-8 space-y-6 sm:space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-indigo-200 dark:before:bg-indigo-950">
            {currentDay.activities.map((act, i) => (
              <div key={i} className="relative group">
                {/* Timeline Dot */}
                <span className="absolute -left-6 sm:-left-8 top-1.5 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-600 flex items-center justify-center shadow-xs" />

                {/* Content Box */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3" />
                        {act.time}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                        {act.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <Navigation className="w-3 h-3 text-slate-400" />
                        {act.distanceFromPrev}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {act.cost === 0 ? "Free" : `₹${act.cost}`}
                      </span>
                    </div>
                  </div>

                  <div>
                    {act.placeId ? (
                      <Link
                        href={`/places/${act.placeId}`}
                        className="font-bold text-base text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-block"
                      >
                        {act.placeName} →
                      </Link>
                    ) : (
                      <h5 className="font-bold text-base text-slate-900 dark:text-white">
                        {act.placeName}
                      </h5>
                    )}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                      {act.activity}
                    </p>
                  </div>

                  {/* Local Insider Tip */}
                  {act.tip && (
                    <div className="flex items-start gap-1.5 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{act.tip}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
