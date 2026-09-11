"use client";

import React from "react";

export function CardSkeleton() {
  return (
    <div className="min-w-[280px] max-w-[320px] rounded-2xl bg-slate-100 dark:bg-slate-800/60 p-3 animate-pulse border border-slate-200/60 dark:border-slate-700/50">
      <div className="h-44 w-full bg-slate-200 dark:bg-slate-700 rounded-xl mb-3" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-sm w-3/4 mb-2" />
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-sm w-1/2 mb-4" />
      <div className="flex justify-between items-center pt-2 border-t border-slate-200/50 dark:border-slate-700/40">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-sm w-1/4" />
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-xl w-24" />
      </div>
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="py-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse" />
        <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded-sm animate-pulse" />
      </div>
      <div className="flex gap-4 overflow-hidden">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}
