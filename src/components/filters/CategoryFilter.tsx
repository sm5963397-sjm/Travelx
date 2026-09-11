"use client";

import React from "react";
import { Category } from "@/types";

interface CategoryFilterProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  className?: string;
}

interface CategoryOption {
  id: Category;
  label: string;
  emoji: string;
}

const CATEGORIES: CategoryOption[] = [
  { id: "all", label: "All Experiences", emoji: "✨" },
  { id: "must-visit", label: "Must Visit", emoji: "🔥" },
  { id: "hidden-gems", label: "Hidden Gems", emoji: "💎" },
  { id: "food", label: "Food & Cafes", emoji: "🍛" },
  { id: "stays", label: "Budget Stays", emoji: "🏨" },
  { id: "photography", label: "Photo Spots", emoji: "📸" },
  { id: "historical", label: "Heritage & Forts", emoji: "🏰" },
  { id: "nature", label: "Nature & Parks", emoji: "🌿" },
  { id: "culture", label: "Bazaars & Culture", emoji: "🛍️" },
  { id: "adventure", label: "Adventure", emoji: "⛰️" },
];

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  className = "",
}: CategoryFilterProps) {
  return (
    <div
      className={`flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar ${className}`}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isSelected
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md shadow-slate-900/10 scale-100"
                : "bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
