"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, MapPin, X, Compass, Check } from "lucide-react";
import { useLocation } from "@/context/LocationContext";
import { destinations } from "@/data/destinations";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (cityName: string) => void;
}

export default function LocationModal({
  isOpen,
  onClose,
  onSelect,
}: LocationModalProps) {
  const router = useRouter();
  const { location, setManualLocation } = useLocation();
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filteredDestinations = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.state.toLowerCase().includes(search.toLowerCase()) ||
      d.popularFor.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSelectCity = (cityName: string) => {
    setManualLocation(cityName);
    if (onSelect) {
      onSelect(cityName);
    } else {
      router.push(`/explore?city=${encodeURIComponent(cityName.toLowerCase())}`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Select Destination
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose a city to explore attractions, food, and stays
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Jaipur, Mumbai, Goa, Delhi, Pune..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              autoFocus
            />
          </div>
        </div>

        {/* City List */}
        <div className="max-h-[380px] overflow-y-auto p-4 space-y-2">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((dest) => {
              const isCurrent = location.city.toLowerCase() === dest.name.toLowerCase();

              return (
                <button
                  key={dest.id}
                  onClick={() => handleSelectCity(dest.name)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                    isCurrent
                      ? "border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/30"
                      : "border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                      <Image
                        src={dest.heroImage}
                        alt={dest.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {dest.name}
                        </span>
                        <span className="text-xs text-slate-400 font-normal">
                          {dest.state}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {dest.tagline}
                      </p>
                    </div>
                  </div>

                  {isCurrent && (
                    <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      <Check className="w-4 h-4" />
                      <span>Current</span>
                    </div>
                  )}
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
              No matching destinations found for &quot;{search}&quot;.
              <button
                onClick={() => handleSelectCity(search)}
                className="mt-2 block mx-auto text-indigo-600 hover:underline font-medium cursor-pointer"
              >
                Explore &quot;{search}&quot; anyway
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            More destinations across India & global travel hubs are added continuously.
          </p>
        </div>
      </div>
    </div>
  );
}
