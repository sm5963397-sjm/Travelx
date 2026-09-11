"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, Sun, ArrowUpRight } from "lucide-react";
import { Place } from "@/types";
import Rating from "@/components/ui/Rating";
import DistanceBadge from "@/components/ui/DistanceBadge";
import SaveButton from "@/components/ui/SaveButton";

interface PhotoSpotCardProps {
  place: Place;
}

export default function PhotoSpotCard({ place }: PhotoSpotCardProps) {
  return (
    <div className="group relative flex flex-col justify-between w-[300px] sm:w-[330px] shrink-0 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-violet-500/30 transition-all duration-300 overflow-hidden">
      {/* Top Image */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
        <Image
          src={place.image}
          alt={place.name}
          fill
          sizes="(max-width: 768px) 300px, 330px"
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-600/90 text-white backdrop-blur-md shadow-xs">
            <Camera className="w-3.5 h-3.5" />
            <span>Photo Spot</span>
          </div>
        </div>

        <div className="absolute top-3 right-3 z-10">
          <SaveButton placeId={place.id} placeName={place.name} size="sm" />
        </div>

        {/* Golden Hour / Best Lighting badge */}
        {place.goldenHour && (
          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium bg-black/70 text-amber-300 backdrop-blur-md border border-amber-300/30">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Golden Hour: {place.goldenHour}</span>
            </div>
            <DistanceBadge
              distance={place.distance}
              className="bg-black/70 text-white border-white/20 backdrop-blur-md"
            />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <Rating score={place.rating} reviewCount={place.reviewCount} size="sm" />
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {place.city}
            </span>
          </div>

          <Link href={`/places/${place.id}`}>
            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-1">
              {place.name}
            </h3>
          </Link>

          {/* Pro Camera Tip Callout */}
          {place.photoTip && (
            <div className="mt-2.5 p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-xs text-violet-950 dark:text-violet-200">
              <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider font-bold text-violet-600 dark:text-violet-400 mb-1">
                <Camera className="w-3 h-3" />
                <span>Camera Tip</span>
              </div>
              <p className="line-clamp-2 leading-relaxed">
                {place.photoTip}
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Link
            href={`/places/${place.id}`}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-violet-600 text-white dark:bg-slate-800 dark:hover:bg-violet-600 transition-colors"
          >
            <span>View Viewpoints & Map</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
