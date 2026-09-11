"use client";

import React from "react";
import BudgetCalculator from "@/components/budget/BudgetCalculator";
import { Sparkles, DollarSign, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BudgetPlannerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Expense Estimator & Planner</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Smart Travel Budget Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Forecast your total trip costs in real time. Adjust stays, local culinary splurges, transportation, and monuments to stay within your sweet spot.
        </p>
      </div>

      {/* Main Interactive Budget Component */}
      <BudgetCalculator />
    </div>
  );
}
