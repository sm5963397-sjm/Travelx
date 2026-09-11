"use client";

import React from "react";
import Image from "next/image";
import { Utensils, Sparkles, MapPin } from "lucide-react";
import { FoodItem } from "@/types";
import Rating from "@/components/ui/Rating";
import DistanceBadge from "@/components/ui/DistanceBadge";

interface FoodCardProps {
  food: FoodItem;
}

export default function FoodCard({ food }: FoodCardProps) {
  const categoryLabels = {
    restaurant: "Restaurant",
    cafe: "Cafe",
    "street-food": "Street Food",
    "local-specialty": "Iconic Specialty",
  };

  return (
    <div className="group relative flex flex-col justify-between w-[280px] sm:w-[310px] shrink-0 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-amber-500/30 transition-all duration-300 overflow-hidden">
      {/* Top Image */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={food.image}
          alt={food.name}
          fill
          sizes="(max-width: 768px) 280px, 310px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        <div className="absolute top-3 left-3 z-10">
          <DistanceBadge
            distance={food.distance}
            className="bg-black/60 text-white border-white/20 backdrop-blur-md"
          />
        </div>

        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-xs">
            {food.priceRange}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md">
            {categoryLabels[food.placeCategory]}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <Rating score={food.rating} reviewCount={food.reviewCount} size="sm" />
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              ~₹{food.costForTwo} for 2
            </span>
          </div>

          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
            {food.name}
          </h3>

          <p className="text-xs text-amber-700 dark:text-amber-400 font-medium mt-0.5 line-clamp-1">
            {food.cuisine}
          </p>

          {/* Must Try Dish Highlight */}
          <div className="mt-2.5 flex items-center gap-1.5 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="line-clamp-1 font-medium">
              Try: <span className="font-semibold">{food.mustTryDish}</span>
            </span>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{food.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
