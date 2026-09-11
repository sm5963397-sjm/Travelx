"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useSaved } from "@/context/SavedContext";

interface SaveButtonProps {
  placeId: string;
  placeName?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function SaveButton({
  placeId,
  placeName,
  className = "",
  size = "md",
}: SaveButtonProps) {
  const { isPlaceSaved, toggleSavePlace } = useSaved();
  const saved = isPlaceSaved(placeId);

  const buttonSizes = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSavePlace(placeId, placeName);
      }}
      aria-label={saved ? "Remove from saved places" : "Save place"}
      className={`rounded-full transition-all duration-200 active:scale-90 flex items-center justify-center cursor-pointer shadow-md ${
        saved
          ? "bg-rose-500 text-white shadow-rose-500/25"
          : "bg-white/90 hover:bg-white text-slate-700 hover:text-rose-500 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:text-rose-400 backdrop-blur-md"
      } ${buttonSizes[size]} ${className}`}
    >
      <Heart
        className={`${iconSizes[size]} transition-transform duration-200 ${
          saved ? "fill-white text-white scale-105" : ""
        }`}
      />
    </button>
  );
}
