"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, MapPin, Sparkles } from "lucide-react";
import { places } from "@/data/places";
import { destinations } from "@/data/destinations";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  placeholder = "Search places, food, stays, photo spots...",
  className = "",
  onSearch,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const trimmed = query.trim().toLowerCase();

  const matchedDestinations = trimmed
    ? destinations.filter((d) => d.name.toLowerCase().includes(trimmed))
    : [];

  const matchedPlaces = trimmed
    ? places
        .filter(
          (p) =>
            p.name.toLowerCase().includes(trimmed) ||
            p.city.toLowerCase().includes(trimmed) ||
            p.category.toLowerCase().includes(trimmed) ||
            p.tags.some((t) => t.toLowerCase().includes(trimmed))
        )
        .slice(0, 5)
    : [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsOpen(false);
      if (onSearch) {
        onSearch(query);
      } else {
        router.push(`/explore?search=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className="relative flex items-center">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-4 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            if (onSearch) onSearch(e.target.value);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-3 sm:py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              if (onSearch) onSearch("");
            }}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && trimmed && (matchedDestinations.length > 0 || matchedPlaces.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 max-h-96 overflow-y-auto">
          {/* City Destinations */}
          {matchedDestinations.length > 0 && (
            <div className="mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
                Destinations
              </span>
              {matchedDestinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => {
                    setIsOpen(false);
                    router.push(`/explore?city=${encodeURIComponent(dest.name.toLowerCase())}`);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-white">
                        {dest.name}
                      </span>
                      <span className="text-xs text-slate-400 ml-1.5">
                        {dest.state}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    Explore City →
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Place Attractions */}
          {matchedPlaces.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
                Attractions & Places
              </span>
              {matchedPlaces.map((place) => (
                <Link
                  key={place.id}
                  href={`/places/${place.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {place.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{place.city}</span>
                      <span>•</span>
                      <span className="capitalize">{place.category}</span>
                    </div>
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
