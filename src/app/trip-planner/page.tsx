"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Calendar,
  Compass,
  MapPin,
  Loader2,
  Check,
  TrendingUp,
  RotateCcw,
} from "lucide-react";
import { destinations } from "@/data/destinations";
import { mockJaipurItinerary } from "@/data/itineraries";
import { TripPlan, TripItineraryDay } from "@/types";
import ItineraryTimeline from "@/components/itinerary/ItineraryTimeline";

const INTEREST_OPTIONS = [
  { id: "History", label: "History & Forts", emoji: "🏰" },
  { id: "Nature", label: "Nature & Lakes", emoji: "🌿" },
  { id: "Food", label: "Local Food & Street Eateries", emoji: "🍛" },
  { id: "Photography", label: "Photography & Viewpoints", emoji: "📸" },
  { id: "Adventure", label: "Adventure & Hiking", emoji: "⛰️" },
  { id: "Shopping", label: "Bazaars & Handcrafts", emoji: "🛍️" },
  { id: "Culture", label: "Culture & Stepwells", emoji: "🎭" },
];

function TripPlannerContent() {
  const searchParams = useSearchParams();
  const initialDest = searchParams.get("destination") || "Jaipur";

  // Inputs
  const [destination, setDestination] = useState(initialDest);
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(15000);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "History",
    "Food",
    "Photography",
  ]);
  const [travelPace, setTravelPace] = useState<"relaxed" | "moderate" | "fast">("moderate");

  // State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<TripPlan | null>({
    id: "plan-jaipur-demo",
    destination: "Jaipur",
    days: 3,
    budget: 15000,
    interests: ["History", "Food", "Photography"],
    pace: "moderate",
    daysItinerary: mockJaipurItinerary.slice(0, 3),
    createdAt: new Date().toISOString(),
  });

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleGeneratePlan = () => {
    setIsGenerating(true);

    setTimeout(() => {
      // Dynamic Day Generator based on days input
      let generatedDays: TripItineraryDay[] = [];

      for (let i = 1; i <= days; i++) {
        // Recycle or dynamically adapt template days
        const baseIndex = (i - 1) % mockJaipurItinerary.length;
        const baseDay = mockJaipurItinerary[baseIndex];

        generatedDays.push({
          dayNumber: i,
          title: `Day ${i}: ${destination} Exploration & Highlights`,
          totalDayCost: baseDay.totalDayCost,
          activities: baseDay.activities.map((a) => ({
            ...a,
            activity: a.activity.replace("Jaipur", destination),
          })),
        });
      }

      setGeneratedPlan({
        id: `plan-${destination.toLowerCase()}-${Date.now()}`,
        destination,
        days,
        budget,
        interests: selectedInterests,
        pace: travelPace,
        daysItinerary: generatedDays,
        createdAt: new Date().toISOString(),
      });

      setIsGenerating(false);
    }, 900);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intelligent Trip Planner</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Design your perfect itinerary in seconds
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Tell us your travel pace, budget, and favorite themes. TRAVELX will structure a balanced day-by-day route with optimal walking distances.
        </p>
      </div>

      {/* Generator Configuration Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Destination Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Select Destination
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {destinations.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name} ({d.state})
                </option>
              ))}
            </select>
          </div>

          {/* Number of Days */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span>Trip Duration</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm lowercase">
                {days} days
              </span>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              {[1, 2, 3, 4, 5, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDays(num)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    days === num
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {num}d
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span>Estimated Budget</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                ₹{budget.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="3000"
              max="40000"
              step="1000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer pt-2"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>₹3k (Backpacker)</span>
              <span>₹20k</span>
              <span>₹40k (Luxury)</span>
            </div>
          </div>
        </div>

        {/* Travel Pace */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Travel Pace
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "relaxed", label: "Relaxed", desc: "1-2 spots/day, peaceful cafe breaks" },
              { id: "moderate", label: "Moderate (Recommended)", desc: "3-4 spots/day, balanced flow" },
              { id: "fast", label: "Fast-Paced", desc: "5+ spots/day, see everything possible" },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setTravelPace(p.id as any)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  travelPace === p.id
                    ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 text-slate-900 dark:text-white ring-2 ring-indigo-500/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="font-bold text-sm mb-0.5">{p.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Interests Multi-Select */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Interests & Themes (Select all you like)
          </label>
          <div className="flex flex-wrap gap-2.5">
            {INTEREST_OPTIONS.map((item) => {
              const isSelected = selectedInterests.includes(item.id);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleInterest(item.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md scale-100"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate CTA Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Routes are sequenced to minimize back-and-forth travel time.
          </p>

          <button
            type="button"
            onClick={handleGeneratePlan}
            disabled={isGenerating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all shadow-xl shadow-indigo-600/30 cursor-pointer disabled:opacity-75"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sequencing optimal itinerary...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Generate My Plan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Itinerary Result Section */}
      {generatedPlan && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Generated Travel Route
            </h2>
            <button
              onClick={handleGeneratePlan}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
          </div>

          <ItineraryTimeline plan={generatedPlan} />
        </div>
      )}
    </div>
  );
}

export default function TripPlannerPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading planner...</div>}>
      <TripPlannerContent />
    </Suspense>
  );
}
