"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  Clock,
  Ticket,
  Calendar,
  Compass,
  Navigation,
  Share2,
  Sparkles,
  Sun,
  Camera,
  ArrowLeft,
  MapPin,
  ExternalLink,
  Utensils,
  Bed,
  CheckCircle2,
} from "lucide-react";
import { places as allPlaces } from "@/data/places";
import { foodItems as allFood } from "@/data/food";
import { stayItems as allStays } from "@/data/stays";
import { useLocation } from "@/context/LocationContext";
import { useSaved } from "@/context/SavedContext";
import { calculateDistance } from "@/utils/geo";
import { formatCurrency, formatPricePerNight } from "@/utils/formatters";

import Rating from "@/components/ui/Rating";
import DistanceBadge from "@/components/ui/DistanceBadge";
import SaveButton from "@/components/ui/SaveButton";
import FoodCard from "@/components/cards/FoodCard";
import HotelCard from "@/components/cards/HotelCard";
import MapView from "@/components/map/MapView";

interface PlaceDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function PlaceDetailsPage({ params }: PlaceDetailsPageProps) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const placeId = resolvedParams.id;

  const { location } = useLocation();
  const { isPlaceSaved, toggleSavePlace } = useSaved();

  const place = allPlaces.find((p) => p.id === placeId);

  // Gallery state
  const [selectedImage, setSelectedImage] = useState<string>(
    place?.image || ""
  );

  // Navigation simulator modal state
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);

  if (!place) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Destination Not Found
        </h2>
        <p className="text-slate-500 mb-6">
          The place with ID &quot;{placeId}&quot; could not be located in our directory.
        </p>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explore Feed
        </Link>
      </div>
    );
  }

  const currentLat = location.latitude || 26.9124;
  const currentLng = location.longitude || 75.7873;
  const distance = calculateDistance(currentLat, currentLng, place.latitude, place.longitude);

  const galleryImages = place.gallery && place.gallery.length > 0 ? place.gallery : [place.image];

  // Nearby food and stays
  const nearbyFood = allFood
    .filter(
      (f) =>
        f.city.toLowerCase() === place.city.toLowerCase() ||
        calculateDistance(place.latitude, place.longitude, f.latitude, f.longitude) < 8
    )
    .slice(0, 3);

  const nearbyStays = allStays
    .filter(
      (s) =>
        s.city.toLowerCase() === place.city.toLowerCase() ||
        calculateDistance(place.latitude, place.longitude, s.latitude, s.longitude) < 12
    )
    .slice(0, 3);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Place link copied to clipboard! 📋");
    }
  };

  const handleOpenGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      {/* Back Button & Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            aria-label="Share place"
            className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <SaveButton placeId={place.id} placeName={place.name} size="md" />
        </div>
      </div>

      {/* Hero Image Section & Gallery */}
      <div className="space-y-4">
        <div className="relative h-[340px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl bg-slate-900">
          <Image
            src={selectedImage || place.image}
            alt={place.name}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/20 to-transparent pointer-events-none" />

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
            <DistanceBadge
              distance={distance}
              className="bg-black/70 text-white border-white/20 backdrop-blur-md text-sm px-3 py-1"
            />
            {place.isHiddenGem && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md">
                💎 Hidden Gem
              </span>
            )}
            {place.isPhotoSpot && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-600 text-white shadow-md">
                📸 Pro Photo Spot
              </span>
            )}
          </div>

          {/* Title Overlay in Hero */}
          <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md">
                {place.category}
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {place.city}, {place.state}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
              {place.name}
            </h1>
          </div>
        </div>

        {/* Thumbnail Gallery Row */}
        {galleryImages.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`relative w-24 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  selectedImage === img
                    ? "border-indigo-600 scale-105 shadow-md"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${place.name} preview ${i + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Grid: Details Overview + Sticky Action Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Columns: Overview, Stats, Tips */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium block">Rating</span>
              <Rating score={place.rating} reviewCount={place.reviewCount} size="md" />
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium block">Entry Fee</span>
              <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white text-base">
                <Ticket className="w-4 h-4 text-indigo-500" />
                <span>{formatCurrency(place.entryFee)}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium block">Recommended Time</span>
              <div className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white text-sm">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{place.visitDuration}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium block">Opening Hours</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block truncate">
                {place.openingHours}
              </span>
            </div>
          </div>

          {/* Description Section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              About this destination
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {place.description}
            </p>

            {/* Tags */}
            <div className="pt-2 flex flex-wrap gap-2">
              {place.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Best Time to Visit & Photo Radar Callouts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Best Time to Visit</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {place.bestTime}
              </p>
            </div>

            {place.photoTip && (
              <div className="p-5 rounded-3xl bg-violet-500/10 border border-violet-500/20 space-y-2">
                <div className="flex items-center gap-2 text-violet-800 dark:text-violet-300 font-bold text-sm">
                  <Camera className="w-4 h-4 text-violet-500" />
                  <span>Photography & Vantage Point</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {place.photoTip}
                </p>
              </div>
            )}
          </div>

          {/* Embedded Map Section */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  <span>Location & Surrounding Proximity</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{place.address}</p>
              </div>
              <button
                onClick={handleOpenGoogleMaps}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <MapView
              userLocation={location}
              places={[place]}
              height="h-[340px]"
            />
          </div>
        </div>

        {/* Right Sticky Sidebar: Actions & Trip Planner CTA */}
        <div className="space-y-6">
          <div className="sticky top-24 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-5">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                Plan Your Visit
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {formatCurrency(place.entryFee)}
              </div>
              <span className="text-xs text-slate-500">
                {place.entryFee === "Free" ? "No admission tickets needed" : "Standard general entry per person"}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleOpenGoogleMaps}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 active:scale-95 transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Navigate to Location</span>
              </button>

              <button
                onClick={() => {
                  toggleSavePlace(place.id, place.name);
                }}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-sm border transition-all cursor-pointer ${
                  isPlaceSaved(place.id)
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
                    : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isPlaceSaved(place.id) ? "Saved in Wishlist ❤️" : "Save Destination"}</span>
              </button>

              <Link
                href={`/trip-planner?destination=${encodeURIComponent(place.city)}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-sm bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity"
              >
                <Calendar className="w-4 h-4" />
                <span>Add to Custom Trip</span>
              </Link>
            </div>

            {/* Quick Tips */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-2">
              <div className="flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>Approx. {distance} km away from your location</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Hours: {place.openingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Food Section */}
      {nearbyFood.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Utensils className="w-5 h-5 text-amber-500" />
              <span>Great Local Food Nearby</span>
            </h3>
            <Link
              href={`/explore?category=food`}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              See all eateries
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyFood.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>
      )}

      {/* Nearby Stays Section */}
      {nearbyStays.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bed className="w-5 h-5 text-blue-500" />
              <span>Recommended Budget Stays Nearby</span>
            </h3>
            <Link
              href={`/explore?category=stays`}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              See all stays
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyStays.map((stay) => (
              <HotelCard key={stay.id} stay={stay} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
