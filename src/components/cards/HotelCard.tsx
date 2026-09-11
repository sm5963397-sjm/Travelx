"use client";

import React from "react";
import Image from "next/image";
import { Bed, Sparkles, Check } from "lucide-react";
import { StayItem } from "@/types";
import Rating from "@/components/ui/Rating";
import DistanceBadge from "@/components/ui/DistanceBadge";
import { formatPricePerNight } from "@/utils/formatters";

interface HotelCardProps {
  stay: StayItem;
}

export default function HotelCard({ stay }: HotelCardProps) {
  const stayTypeLabels = {
    hostel: "Hostel & Dorms",
    "budget-hotel": "Budget Hotel",
    homestay: "Local Homestay",
    "boutique-resort": "Boutique Stay",
  };

  return (
    <div className="group relative flex flex-col justify-between w-[290px] sm:w-[320px] shrink-0 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 overflow-hidden">
      {/* Top Image */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={stay.image}
          alt={stay.name}
          fill
          sizes="(max-width: 768px) 290px, 320px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        <div className="absolute top-3 left-3 z-10">
          <DistanceBadge
            distance={stay.distance}
            className="bg-black/60 text-white border-white/20 backdrop-blur-md"
          />
        </div>

        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xs">
            {formatPricePerNight(stay.pricePerNight)}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md">
            {stayTypeLabels[stay.type]}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <Rating score={stay.rating} reviewCount={stay.reviewCount} size="sm" />
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
              {stay.vibe.split(",")[0]}
            </span>
          </div>

          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {stay.name}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {stay.description}
          </p>

          {/* Key Amenities */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {stay.amenities.slice(0, 2).map((amenity, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                <Check className="w-2.5 h-2.5 text-blue-500" />
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block">Starting from</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                ₹{stay.pricePerNight}
                <span className="text-xs font-normal text-slate-400">/night</span>
              </span>
            </div>
            <a
              href="#book"
              onClick={(e) => {
                e.preventDefault();
                alert(`Redirecting to partner rates for ${stay.name}...`);
              }}
              className="py-1.5 px-3.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Check Deals
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
