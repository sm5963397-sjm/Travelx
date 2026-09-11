"use client";

import React from "react";
import { Navigation } from "lucide-react";
import { formatDistance } from "@/utils/formatters";

interface DistanceBadgeProps {
  distance?: number;
  className?: string;
}

export default function DistanceBadge({ distance, className = "" }: DistanceBadgeProps) {
  if (distance === undefined || isNaN(distance)) return null;

  return (
    <div
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 backdrop-blur-xs ${className}`}
    >
      <Navigation className="w-3 h-3 rotate-45 shrink-0" />
      <span>{formatDistance(distance)}</span>
    </div>
  );
}
