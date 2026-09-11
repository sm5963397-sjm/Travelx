"use client";

import React from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

interface FilterBarProps {
  maxDistance: number; // 0 = all, 1 = within 1km, 5 = within 5km, 10 = within 10km
  onDistanceChange: (km: number) => void;
  budgetLevel: string; // "all", "Free", "Budget", "Moderate", "Luxury"
  onBudgetChange: (b: string) => void;
  sortBy: "popular" | "distance" | "rating" | "budget";
  onSortChange: (s: "popular" | "distance" | "rating" | "budget") => void;
  totalResultsCount?: number;
}

export default function FilterBar({
  maxDistance,
  onDistanceChange,
  budgetLevel,
  onBudgetChange,
  sortBy,
  onSortChange,
  totalResultsCount,
}: FilterBarProps) {
  const distanceOptions = [
    { label: "Any Distance", value: 0 },
    { label: "🚶 ≤ 1 km", value: 1 },
    { label: "🛵 ≤ 5 km", value: 5 },
    { label: "🚗 ≤ 10 km", value: 10 },
  ];

  const budgetOptions = [
    { label: "All Budgets", value: "all" },
    { label: "Free Only", value: "Free" },
    { label: "Budget (≤ ₹100)", value: "Budget" },
    { label: "Moderate (₹100-500)", value: "Moderate" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-slate-100 dark:border-slate-800">
      {/* Distance Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline">
          Distance:
        </span>
        {distanceOptions.map((opt) => {
          const isActive = maxDistance === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onDistanceChange(opt.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Budget & Sort Controls */}
      <div className="flex items-center gap-2">
        {/* Budget Selector */}
        <select
          value={budgetLevel}
          onChange={(e) => onBudgetChange(e.target.value)}
          aria-label="Filter places by budget"
          className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
        >
          {budgetOptions.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>

        {/* Sort Selector */}
        <div className="flex items-center gap-1">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            aria-label="Sort places by"
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="popular">🔥 Most Popular</option>
            <option value="distance">📍 Closest First</option>
            <option value="rating">⭐ Highest Rated</option>
            <option value="budget">💰 Lowest Entry Fee</option>
          </select>
        </div>

        {totalResultsCount !== undefined && (
          <span className="text-xs text-slate-400 font-medium hidden md:inline ml-1">
            ({totalResultsCount} spots)
          </span>
        )}
      </div>
    </div>
  );
}
