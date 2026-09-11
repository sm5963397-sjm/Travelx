"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Compass, ArrowRight, Sparkles, Star } from "lucide-react";
import { destinations } from "@/data/destinations";
import { useLocation } from "@/context/LocationContext";

export default function DestinationsPage() {
  const router = useRouter();
  const { setManualLocation } = useLocation();

  const handleSelectCity = (cityName: string) => {
    setManualLocation(cityName);
    router.push(`/explore?city=${encodeURIComponent(cityName.toLowerCase())}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
          <MapPin className="w-3.5 h-3.5" />
          <span>Curated Hubs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Explore by Destination
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Select any city to automatically calibrate the discovery radar, distance radii, and local culinary hotspots.
        </p>
      </div>

      {/* Grid of Cities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            onClick={() => handleSelectCity(dest.name)}
            className="group relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={dest.heroImage}
                alt={dest.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md shadow-xs">
                  {dest.placesCount} spots
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                <span className="text-xs text-amber-300 font-semibold block">
                  ~₹{dest.avgBudgetPerDay}/day
                </span>
                <h3 className="text-2xl font-black text-white">
                  {dest.name}
                </h3>
                <span className="text-xs text-slate-300">
                  {dest.state}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {dest.tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {dest.popularFor.map((item, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>Explore {dest.name} Feed</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs text-slate-400">
                  {dest.latitude.toFixed(2)}°N, {dest.longitude.toFixed(2)}°E
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
