"use client";

import React from "react";
import { Star } from "lucide-react";

interface RatingProps {
  score: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export default function Rating({
  score,
  reviewCount,
  size = "md",
  showCount = true,
}: RatingProps) {
  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base font-semibold",
  };

  return (
    <div className="inline-flex items-center gap-1 font-medium text-amber-500">
      <Star className={`${iconSizes[size]} fill-amber-400 text-amber-400 shrink-0`} />
      <span className={`font-semibold text-slate-800 dark:text-slate-100 ${textSizes[size]}`}>
        {score.toFixed(1)}
      </span>
      {showCount && reviewCount && (
        <span className={`text-slate-400 dark:text-slate-500 font-normal ${textSizes[size]}`}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
