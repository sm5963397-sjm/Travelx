"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  Bed,
  Utensils,
  Car,
  Ticket,
  PieChart,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingDown,
} from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

export default function BudgetCalculator() {
  const [totalTargetBudget, setTotalTargetBudget] = useState(12000);
  const [days, setDays] = useState(3);
  const [dailyStay, setDailyStay] = useState(1200);
  const [dailyFood, setDailyFood] = useState(800);
  const [dailyTransport, setDailyTransport] = useState(400);
  const [dailyAttractions, setDailyAttractions] = useState(300);

  // Calculations
  const calculatedTotal = useMemo(() => {
    return (dailyStay + dailyFood + dailyTransport + dailyAttractions) * days;
  }, [dailyStay, dailyFood, dailyTransport, dailyAttractions, days]);

  const dailyEstimated = useMemo(() => {
    return Math.round(calculatedTotal / days);
  }, [calculatedTotal, days]);

  const remainingBudget = totalTargetBudget - calculatedTotal;
  const isOverBudget = remainingBudget < 0;

  // Percentage shares
  const stayTotal = dailyStay * days;
  const foodTotal = dailyFood * days;
  const transportTotal = dailyTransport * days;
  const attractionsTotal = dailyAttractions * days;

  const stayPct = Math.round((stayTotal / (calculatedTotal || 1)) * 100);
  const foodPct = Math.round((foodTotal / (calculatedTotal || 1)) * 100);
  const transportPct = Math.round((transportTotal / (calculatedTotal || 1)) * 100);
  const attractionsPct = Math.round((attractionsTotal / (calculatedTotal || 1)) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 text-white shadow-xl shadow-indigo-600/15">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" />
              <span>Smart Travel Expense Forecaster</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Trip Budget Planner
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <span className="text-xs text-white/80">Planned Duration:</span>
            <span className="text-sm font-bold text-white">{days} Days</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <span className="text-xs text-white/70 block">Target Budget</span>
            <span className="text-xl sm:text-2xl font-black text-white">
              {formatCurrency(totalTargetBudget)}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <span className="text-xs text-white/70 block">Estimated Total</span>
            <span className="text-xl sm:text-2xl font-black text-white">
              {formatCurrency(calculatedTotal)}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
            <span className="text-xs text-white/70 block">Daily Average</span>
            <span className="text-xl sm:text-2xl font-black text-amber-300">
              {formatCurrency(dailyEstimated)}/day
            </span>
          </div>

          <div
            className={`p-4 rounded-2xl backdrop-blur-md border ${
              isOverBudget
                ? "bg-rose-500/20 border-rose-400/30 text-rose-200"
                : "bg-emerald-500/20 border-emerald-400/30 text-emerald-200"
            }`}
          >
            <span className="text-xs block opacity-90">
              {isOverBudget ? "Over Target by" : "Remaining Buffer"}
            </span>
            <span className="text-xl sm:text-2xl font-black">
              {formatCurrency(Math.abs(remainingBudget))}
            </span>
          </div>
        </div>

        {/* Visual Category Breakdown Progress Bar */}
        <div className="mt-6 pt-6 border-t border-white/15 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/80">
            <span>Budget Allocation Breakdown</span>
            <span>{calculatedTotal > 0 ? "100%" : "0%"}</span>
          </div>
          <div className="h-3.5 w-full rounded-full bg-white/20 overflow-hidden flex">
            <div
              style={{ width: `${stayPct}%` }}
              className="bg-blue-400 h-full transition-all duration-300"
              title={`Stay: ${stayPct}%`}
            />
            <div
              style={{ width: `${foodPct}%` }}
              className="bg-amber-400 h-full transition-all duration-300"
              title={`Food: ${foodPct}%`}
            />
            <div
              style={{ width: `${transportPct}%` }}
              className="bg-emerald-400 h-full transition-all duration-300"
              title={`Transport: ${transportPct}%`}
            />
            <div
              style={{ width: `${attractionsPct}%` }}
              className="bg-violet-400 h-full transition-all duration-300"
              title={`Attractions: ${attractionsPct}%`}
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs pt-1 text-white/90">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <span>Stays ({stayPct}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Food & Cafes ({foodPct}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Local Transport ({transportPct}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
              <span>Attractions & Entry ({attractionsPct}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sliders & Inputs Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Target Budget & Days */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span>Overall Travel Scope</span>
          </h3>

          <div>
            <div className="flex justify-between items-center mb-2 text-sm font-medium">
              <label htmlFor="total-target-budget" className="text-slate-700 dark:text-slate-300">
                Target Budget
              </label>
              <span className="font-bold text-indigo-600 dark:text-indigo-400 text-base">
                ₹{totalTargetBudget.toLocaleString()}
              </span>
            </div>
            <input
              id="total-target-budget"
              type="range"
              min="2000"
              max="50000"
              step="500"
              value={totalTargetBudget}
              onChange={(e) => setTotalTargetBudget(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>₹2,000</span>
              <span>₹25,000</span>
              <span>₹50,000+</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 text-sm font-medium">
              <label htmlFor="trip-duration-days" className="text-slate-700 dark:text-slate-300">
                Trip Duration (Days)
              </label>
              <span className="font-bold text-indigo-600 dark:text-indigo-400 text-base">
                {days} Days
              </span>
            </div>
            <input
              id="trip-duration-days"
              type="range"
              min="1"
              max="14"
              step="1"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>1 Day</span>
              <span>7 Days</span>
              <span>14 Days</span>
            </div>
          </div>
        </div>

        {/* Right Column: Daily Category Budgets */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span>Daily Category Estimates</span>
          </h3>

          {/* Stay Slider */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs sm:text-sm font-medium">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <Bed className="w-4 h-4 text-blue-500" />
                <span>Stay / Night</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                ₹{dailyStay}/night (₹{stayTotal} total)
              </span>
            </div>
            <input
              type="range"
              min="300"
              max="6000"
              step="100"
              value={dailyStay}
              onChange={(e) => setDailyStay(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Food Slider */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs sm:text-sm font-medium">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <Utensils className="w-4 h-4 text-amber-500" />
                <span>Food & Dining / Day</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                ₹{dailyFood}/day (₹{foodTotal} total)
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="3000"
              step="50"
              value={dailyFood}
              onChange={(e) => setDailyFood(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Transport Slider */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs sm:text-sm font-medium">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <Car className="w-4 h-4 text-emerald-500" />
                <span>Transport / Day</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                ₹{dailyTransport}/day (₹{transportTotal} total)
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="2000"
              step="50"
              value={dailyTransport}
              onChange={(e) => setDailyTransport(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Attraction Ticket Slider */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs sm:text-sm font-medium">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <Ticket className="w-4 h-4 text-violet-500" />
                <span>Attraction Fees / Day</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                ₹{dailyAttractions}/day (₹{attractionsTotal} total)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1500"
              step="50"
              value={dailyAttractions}
              onChange={(e) => setDailyAttractions(Number(e.target.value))}
              className="w-full accent-violet-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Smart Recommendations Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            Budget-Friendly Travel Recommendations
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="font-bold text-blue-600 dark:text-blue-400 block">
              🏨 Stay Tip:
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Hostels like Zostel or The Hosteller cost ~₹650–800/night with vibrant social common rooms.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="font-bold text-amber-600 dark:text-amber-400 block">
              🍛 Food Hack:
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Try legendary street breakfast spots like Rawat Kachori (~₹60) to stay full while experiencing local cult dishes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="font-bold text-violet-600 dark:text-violet-400 block">
              🎟️ Entry Pass:
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Purchase the composite 2-day heritage ticket in Jaipur covering Amer Fort, Hawa Mahal, and Jantar Mantar for ₹100 total.
            </p>
          </div>
        </div>

        <div className="pt-2 text-right">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>Explore budget stays & free spots near you</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
