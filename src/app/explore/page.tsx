"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  Compass,
  Map as MapIcon,
  ListFilter,
  Layers,
  Sparkles,
  RefreshCw,
  Search,
} from "lucide-react";
import { useLocation } from "@/context/LocationContext";
import { places as allPlaces } from "@/data/places";
import { foodItems as allFood } from "@/data/food";
import { stayItems as allStays } from "@/data/stays";
import { destinations } from "@/data/destinations";
import { Category, Place, FoodItem, StayItem } from "@/types";
import { calculateDistance } from "@/utils/geo";

import SearchBar from "@/components/search/SearchBar";
import CategoryFilter from "@/components/filters/CategoryFilter";
import FilterBar from "@/components/filters/FilterBar";
import PlaceSection from "@/components/cards/PlaceSection";
import PlaceCard from "@/components/cards/PlaceCard";
import HiddenGemCard from "@/components/cards/HiddenGemCard";
import FoodCard from "@/components/cards/FoodCard";
import HotelCard from "@/components/cards/HotelCard";
import PhotoSpotCard from "@/components/cards/PhotoSpotCard";
import MapView from "@/components/map/MapView";
import EmptyState from "@/components/ui/EmptyState";
import { SectionSkeleton } from "@/components/ui/Skeleton";
import VerticalPlaceStream from "@/components/explore/VerticalPlaceStream";
import { api } from "@/services/api";

function ExploreContent() {
  const searchParams = useSearchParams();
  const urlCity = searchParams.get("city");
  const urlSearch = searchParams.get("search");
  const urlCategory = searchParams.get("category");

  const { location, setManualLocation, setIsLocationModalOpen } = useLocation();

  // If a city is passed in the URL, update location
  useEffect(() => {
    if (urlCity && urlCity.toLowerCase() !== location.city.toLowerCase()) {
      setManualLocation(urlCity);
    }
  }, [urlCity, location.city, setManualLocation]);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    (urlCategory as Category) || "all"
  );
  const [searchQuery, setSearchQuery] = useState(urlSearch || "");
  const [maxDistance, setMaxDistance] = useState(0); // 0 = all
  const [budgetLevel, setBudgetLevel] = useState("all");
  const [sortBy, setSortBy] = useState<"popular" | "distance" | "rating" | "budget">("popular");
  const [viewMode, setViewMode] = useState<"stream" | "feed" | "map">("stream");
  const [backendPlaces, setBackendPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Re-run distance calculations based on current location coordinates
  const currentLat = location.latitude || 26.9124;
  const currentLng = location.longitude || 75.7873;

  // Merge backend places with local catalogue for ultimate discovery richness
  const combinedPlaces = useMemo(() => {
    if (backendPlaces.length > 0) {
      // Deduplicate by id
      const existingIds = new Set(backendPlaces.map((b) => b.id));
      const remainingLocal = allPlaces.filter((p) => !existingIds.has(p.id));
      return [...backendPlaces, ...remainingLocal];
    }
    return allPlaces;
  }, [backendPlaces]);

  // Fetch backend explore data when coordinates change
  useEffect(() => {
    let isMounted = true;
    async function loadExploreFromBackend() {
      try {
        const res = await api.explore(currentLat, currentLng, maxDistance || 50, selectedCategory);
        if (isMounted && res.success && res.data?.places) {
          setBackendPlaces(res.data.places);
        }
      } catch {
        // graceful fallback to static catalog
      }
    }
    loadExploreFromBackend();
    return () => {
      isMounted = false;
    };
  }, [currentLat, currentLng, maxDistance, selectedCategory]);

  // Filter places for current city or proximity
  const enrichedPlaces = useMemo(() => {
    return combinedPlaces.map((p) => {
      const distance = calculateDistance(currentLat, currentLng, p.latitude, p.longitude);
      return { ...p, distance };
    });
  }, [combinedPlaces, currentLat, currentLng]);

  const enrichedFood = useMemo(() => {
    return allFood.map((f) => {
      const distance = calculateDistance(currentLat, currentLng, f.latitude, f.longitude);
      return { ...f, distance };
    });
  }, [currentLat, currentLng]);

  const enrichedStays = useMemo(() => {
    return allStays.map((s) => {
      const distance = calculateDistance(currentLat, currentLng, s.latitude, s.longitude);
      return { ...s, distance };
    });
  }, [currentLat, currentLng]);

  // Filter and sort places
  const filteredPlaces = useMemo(() => {
    let result = enrichedPlaces.filter((p) => {
      // City matching: if place city matches current location city, prioritize
      const matchesCity =
        p.city.toLowerCase() === location.city.toLowerCase() ||
        (p.distance !== undefined && p.distance < 45);

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Category filter
      if (selectedCategory !== "all") {
        if (selectedCategory === "must-visit" && !p.isMustVisit) return false;
        if (selectedCategory === "hidden-gems" && !p.isHiddenGem) return false;
        if (selectedCategory === "photography" && !p.isPhotoSpot) return false;
        if (
          ["historical", "nature", "adventure", "culture"].includes(selectedCategory) &&
          p.category !== selectedCategory
        ) {
          return false;
        }
      }

      // Distance filter
      if (maxDistance > 0 && p.distance !== undefined && p.distance > maxDistance) {
        return false;
      }

      // Budget filter
      if (budgetLevel !== "all") {
        if (budgetLevel === "Free" && p.entryFee !== "Free" && p.entryFee !== 0) return false;
        if (budgetLevel === "Budget" && p.entryFee !== "Free" && typeof p.entryFee === "number" && p.entryFee > 100) return false;
        if (budgetLevel === "Moderate" && typeof p.entryFee === "number" && (p.entryFee <= 100 || p.entryFee > 500)) return false;
      }

      return matchesCity;
    });

    // Fallback: if no places matched this city, show all places in the database with their calculated distance
    if (result.length === 0 && !searchQuery) {
      result = enrichedPlaces;
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "distance") return (a.distance || 0) - (b.distance || 0);
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "budget") {
        const feeA = a.entryFee === "Free" ? 0 : Number(a.entryFee);
        const feeB = b.entryFee === "Free" ? 0 : Number(b.entryFee);
        return feeA - feeB;
      }
      return b.reviewCount - a.reviewCount; // popular default
    });

    return result;
  }, [enrichedPlaces, location.city, searchQuery, selectedCategory, maxDistance, budgetLevel, sortBy]);

  // Specific Feed Sections
  const mustVisitPlaces = useMemo(
    () => filteredPlaces.filter((p) => p.isMustVisit),
    [filteredPlaces]
  );

  const within1kmPlaces = useMemo(
    () => filteredPlaces.filter((p) => (p.distance || 0) <= 1.5),
    [filteredPlaces]
  );

  const within5kmPlaces = useMemo(
    () => filteredPlaces.filter((p) => (p.distance || 0) > 1.5 && (p.distance || 0) <= 6.0),
    [filteredPlaces]
  );

  const hiddenGemPlaces = useMemo(
    () => filteredPlaces.filter((p) => p.isHiddenGem),
    [filteredPlaces]
  );

  const photoSpotPlaces = useMemo(
    () => filteredPlaces.filter((p) => p.isPhotoSpot),
    [filteredPlaces]
  );

  const cityFood = useMemo(
    () =>
      enrichedFood.filter(
        (f) =>
          f.city.toLowerCase() === location.city.toLowerCase() ||
          (f.distance !== undefined && f.distance < 45)
      ),
    [enrichedFood, location.city]
  );

  const cityStays = useMemo(
    () =>
      enrichedStays.filter(
        (s) =>
          s.city.toLowerCase() === location.city.toLowerCase() ||
          (s.distance !== undefined && s.distance < 45)
      ),
    [enrichedStays, location.city]
  );

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setMaxDistance(0);
    setBudgetLevel("all");
    setSortBy("popular");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Top Location Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-xl shadow-indigo-950/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Live Location Radar
            </span>
          </div>

          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-2">
              <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 shrink-0" />
              <span>You&apos;re in {location.city}</span>
            </h1>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="text-xs sm:text-sm font-semibold text-indigo-300 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              Change Destination
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-normal">
            Exploring verified attractions, hidden secrets, local food, and stays near you.
          </p>
        </div>

        {/* Stream vs Feed vs Map View Toggle */}
        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 self-start md:self-auto overflow-x-auto">
          <button
            onClick={() => setViewMode("stream")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === "stream"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-white/80 hover:text-white"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Vertical Story</span>
          </button>

          <button
            onClick={() => setViewMode("feed")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === "feed"
                ? "bg-white text-slate-900 shadow-md"
                : "text-white/80 hover:text-white"
            }`}
          >
            <ListFilter className="w-4 h-4" />
            <span>Categorized Feed</span>
          </button>

          <button
            onClick={() => setViewMode("map")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === "map"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-white/80 hover:text-white"
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>Interactive Map</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        <SearchBar
          placeholder={`Search within ${location.city}: palaces, street food, sunset points, cafes...`}
          onSearch={(val) => setSearchQuery(val)}
        />

        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        <FilterBar
          maxDistance={maxDistance}
          onDistanceChange={(km) => setMaxDistance(km)}
          budgetLevel={budgetLevel}
          onBudgetChange={(b) => setBudgetLevel(b)}
          sortBy={sortBy}
          onSortChange={(s) => setSortBy(s)}
          totalResultsCount={filteredPlaces.length}
        />
      </div>

      {/* Main Content Area */}
      {viewMode === "map" ? (
        /* MAP VIEW MODE */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MapIcon className="w-5 h-5 text-indigo-600" />
              <span>Interactive Map View of {location.city}</span>
            </h2>
            <button
              onClick={() => setViewMode("feed")}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Back to scrolling feed
            </button>
          </div>

          <MapView
            userLocation={location}
            places={filteredPlaces}
            foodItems={cityFood}
            stayItems={cityStays}
            height="h-[650px]"
          />
        </div>
      ) : (
        /* VERTICAL DISCOVERY FEED MODE (SECTIONS 1 TO 7) */
        <div className="space-y-2">
          {isLoading ? (
            <div className="space-y-6">
              <SectionSkeleton />
              <SectionSkeleton />
              <SectionSkeleton />
            </div>
          ) : filteredPlaces.length === 0 ? (
            <EmptyState
              title="No places match your filters"
              description={`We couldn't find any places in ${location.city} matching your current category, distance, or budget filter.`}
              onAction={handleResetFilters}
            />
          ) : viewMode === "stream" ? (
            /* VERTICAL PLACE-BY-PLACE STREAM (STARTUP CORE REQUIREMENT) */
            <VerticalPlaceStream
              places={filteredPlaces}
              userLocation={location}
              stays={cityStays}
              restaurants={cityFood}
            />
          ) : (
            <>
              {/* SECTION 1: 🔥 MUST VISIT */}
              {mustVisitPlaces.length > 0 && (
                <PlaceSection
                  id="must-visit"
                  title="MUST VISIT"
                  emoji="🔥"
                  subtitle="Top iconic landmarks and legendary architecture that define this city."
                  count={mustVisitPlaces.length}
                >
                  {mustVisitPlaces.map((place) => (
                    <PlaceCard key={place.id} place={place} />
                  ))}
                </PlaceSection>
              )}

              {/* SECTION 2: 🚶 WITHIN 1 KM */}
              {within1kmPlaces.length > 0 && (
                <PlaceSection
                  id="within-1km"
                  title="WITHIN 1 KM"
                  emoji="🚶"
                  subtitle="Quick walking distance attractions you can reach on foot right now."
                  count={within1kmPlaces.length}
                >
                  {within1kmPlaces.map((place) => (
                    <PlaceCard key={place.id} place={place} />
                  ))}
                </PlaceSection>
              )}

              {/* SECTION 3: 🛵 WITHIN 5 KM */}
              {within5kmPlaces.length > 0 && (
                <PlaceSection
                  id="within-5km"
                  title="WITHIN 5 KM"
                  emoji="🛵"
                  subtitle="Short auto-rickshaw or taxi hops under 15 minutes away."
                  count={within5kmPlaces.length}
                >
                  {within5kmPlaces.map((place) => (
                    <PlaceCard key={place.id} place={place} />
                  ))}
                </PlaceSection>
              )}

              {/* SECTION 4: 💎 HIDDEN GEMS */}
              {hiddenGemPlaces.length > 0 && (
                <PlaceSection
                  id="hidden-gems"
                  title="HIDDEN GEMS"
                  emoji="💎"
                  subtitle="Off-the-beaten-track stepwells, quiet valleys, and local secret sanctuaries."
                  count={hiddenGemPlaces.length}
                >
                  {hiddenGemPlaces.map((place) => (
                    <HiddenGemCard key={place.id} place={place} />
                  ))}
                </PlaceSection>
              )}

              {/* SECTION 5: 🍛 FOOD NEAR YOU */}
              {cityFood.length > 0 && (
                <PlaceSection
                  id="food-near-you"
                  title="FOOD NEAR YOU"
                  emoji="🍛"
                  subtitle="Authentic royal thalis, cult street kachoris, chai lounges, and bakeries."
                  count={cityFood.length}
                >
                  {cityFood.map((food) => (
                    <FoodCard key={food.id} food={food} />
                  ))}
                </PlaceSection>
              )}

              {/* SECTION 6: 🏨 BUDGET STAYS */}
              {cityStays.length > 0 && (
                <PlaceSection
                  id="budget-stays"
                  title="BUDGET STAYS"
                  emoji="🏨"
                  subtitle="Hostels, heritage havelis, and budget-friendly retreats with great community vibes."
                  count={cityStays.length}
                >
                  {cityStays.map((stay) => (
                    <HotelCard key={stay.id} stay={stay} />
                  ))}
                </PlaceSection>
              )}

              {/* SECTION 7: 📸 BEST PHOTO SPOTS */}
              {photoSpotPlaces.length > 0 && (
                <PlaceSection
                  id="photo-spots"
                  title="BEST PHOTO SPOTS"
                  emoji="📸"
                  subtitle="Instagram-ready golden hour viewpoints, painted archways, and cinematic angles."
                  count={photoSpotPlaces.length}
                >
                  {photoSpotPlaces.map((place) => (
                    <PhotoSpotCard key={place.id} place={place} />
                  ))}
                </PlaceSection>
              )}

              {/* Inline Interactive Map Feature Preview */}
              <div className="pt-8 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Compass className="w-5 h-5 text-indigo-600" />
                      <span>Explore {location.city} on the Live Map</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Click pins to inspect distances, fees, and photo spots relative to your position.
                    </p>
                  </div>
                </div>

                <MapView
                  userLocation={location}
                  places={filteredPlaces}
                  foodItems={cityFood}
                  stayItems={cityStays}
                  height="h-[460px]"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<SectionSkeleton />}>
      <ExploreContent />
    </Suspense>
  );
}
