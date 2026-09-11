"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Ticket, ArrowUpRight } from "lucide-react";
import { Place } from "@/types";
import Rating from "@/components/ui/Rating";
import DistanceBadge from "@/components/ui/DistanceBadge";
import SaveButton from "@/components/ui/SaveButton";
import { formatCurrency } from "@/utils/formatters";

interface PlaceCardProps {
  place: Place;
  className?: string;
}

export default function PlaceCard({ place, className = "" }: PlaceCardProps) {
  return (
    <div
      className={`group relative flex flex-col justify-between w-[290px] sm:w-[320px] shrink-0 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Top Image Section */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={place.image}
          alt={place.name}
          fill
          sizes="(max-width: 768px) 300px, 320px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <DistanceBadge
            distance={place.distance}
            className="bg-black/60 text-white border-white/20 backdrop-blur-md"
          />
        </div>

        <div className="absolute top-3 right-3 z-10">
          <SaveButton placeId={place.id} placeName={place.name} size="sm" />
        </div>

        {/* Floating Category Pill */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md shadow-xs">
            {place.category}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & City */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <Rating score={place.rating} reviewCount={place.reviewCount} size="sm" />
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {place.city}
            </span>
          </div>

          {/* Place Name */}
          <Link href={`/places/${place.id}`}>
            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
              {place.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {place.shortDescription || place.description}
          </p>
        </div>

        {/* Details Specs: Visit Duration & Entry Fee */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-3">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{place.visitDuration}</span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-slate-900 dark:text-slate-200">
              <Ticket className="w-3.5 h-3.5 text-indigo-500" />
              <span>{formatCurrency(place.entryFee)}</span>
            </div>
          </div>

          {/* Action Link Button */}
          <Link
            href={`/places/${place.id}`}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-indigo-600 text-slate-800 hover:text-white dark:bg-slate-800 dark:hover:bg-indigo-600 dark:text-slate-200 transition-colors duration-200"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
