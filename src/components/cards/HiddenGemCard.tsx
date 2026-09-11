"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Users, ArrowUpRight } from "lucide-react";
import { Place } from "@/types";
import Rating from "@/components/ui/Rating";
import DistanceBadge from "@/components/ui/DistanceBadge";
import SaveButton from "@/components/ui/SaveButton";
import { formatCrowdBadge, formatCurrency } from "@/utils/formatters";

interface HiddenGemCardProps {
  place: Place;
}

export default function HiddenGemCard({ place }: HiddenGemCardProps) {
  const crowdInfo = formatCrowdBadge(place.crowdLevel);

  return (
    <div className="group relative flex flex-col justify-between w-[310px] sm:w-[340px] shrink-0 rounded-3xl bg-gradient-to-b from-indigo-50/50 to-white dark:from-slate-900/80 dark:to-slate-900 border border-indigo-200/60 dark:border-indigo-900/40 shadow-sm hover:shadow-xl hover:border-indigo-400/50 transition-all duration-300 overflow-hidden">
      {/* Top Banner Tag */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={place.image}
          alt={place.name}
          fill
          sizes="(max-width: 768px) 310px, 340px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-600/90 text-white backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Hidden Gem</span>
          </div>
        </div>

        <div className="absolute top-3 right-3 z-10">
          <SaveButton placeId={place.id} placeName={place.name} size="sm" />
        </div>

        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
          <DistanceBadge
            distance={place.distance}
            className="bg-black/60 text-white border-white/20 backdrop-blur-md"
          />
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-md">
            {place.budgetLevel} ({formatCurrency(place.entryFee)})
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <Rating score={place.rating} reviewCount={place.reviewCount} size="sm" />
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${crowdInfo.colorClass}`}>
              <Users className="w-3 h-3" />
              <span>{crowdInfo.label}</span>
            </div>
          </div>

          <Link href={`/places/${place.id}`}>
            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
              {place.name}
            </h3>
          </Link>

          {/* Why It's Special Callout */}
          {place.whySpecial && (
            <div className="mt-2 p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40">
              <p className="text-xs text-indigo-950 dark:text-indigo-200 line-clamp-2 italic">
                &ldquo;{place.whySpecial}&rdquo;
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Link
            href={`/places/${place.id}`}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
          >
            <span>Discover Secret</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
