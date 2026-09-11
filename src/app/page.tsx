"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Compass,
  MapPin,
  Sparkles,
  Camera,
  Utensils,
  Bed,
  ShieldCheck,
  Zap,
  Globe,
  ArrowRight,
  TrendingUp,
  Star,
  Users,
} from "lucide-react";
import LocationButton from "@/components/location/LocationButton";
import SearchBar from "@/components/search/SearchBar";
import { destinations } from "@/data/destinations";
import { useLocation } from "@/context/LocationContext";

export default function LandingPage() {
  const router = useRouter();
  const { setManualLocation } = useLocation();

  const travelCategories = [
    {
      id: "must-visit",
      title: "Must Visit",
      desc: "Iconic historical monuments & royal forts",
      icon: "🔥",
      bgClass: "from-amber-500/10 to-rose-500/10 border-amber-500/20",
    },
    {
      id: "hidden-gems",
      title: "Hidden Gems",
      desc: "Untouristed stepwells, valleys & peaceful retreats",
      icon: "💎",
      bgClass: "from-indigo-500/10 to-violet-500/10 border-indigo-500/20",
    },
    {
      id: "food",
      title: "Local Food",
      desc: "Centuries-old eateries, kachoris & rooftop tea lounges",
      icon: "🍛",
      bgClass: "from-orange-500/10 to-amber-500/10 border-orange-500/20",
    },
    {
      id: "stays",
      title: "Budget Stays",
      desc: "Cozy backpacker hostels & authentic haveli homestays",
      icon: "🏨",
      bgClass: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
    },
    {
      id: "photography",
      title: "Photo Spots",
      desc: "Rainbow archways, sunset cliffs & symmetry spots",
      icon: "📸",
      bgClass: "from-violet-500/10 to-fuchsia-500/10 border-violet-500/20",
    },
    {
      id: "historical",
      title: "Heritage & Forts",
      desc: "UNESCO palaces, mirror halls & ancient architecture",
      icon: "🏰",
      bgClass: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20",
    },
  ];

  const handleSelectCity = (cityName: string) => {
    setManualLocation(cityName);
    router.push(`/explore?city=${encodeURIComponent(cityName.toLowerCase())}`);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section with Large Destination Photography */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85"
            alt="TRAVELX Hero Destination - Jaipur Hawa Mahal"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105 animate-in fade-in duration-1000"
          />
          {/* Gradients Overlay for crisp readable text */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.6)_100%)]" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center flex flex-col items-center">
          {/* Pulsing Proximity Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Smart Location-Aware Discovery</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
            Discover what&apos;s{" "}
            <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-indigo-300 bg-clip-text text-transparent">
              around you.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-slate-200/90 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Find famous places, hidden gems, local food, budget stays and
            unforgettable experiences wherever you are.
          </p>

          {/* Location Trigger & Search Buttons */}
          <div className="w-full max-w-lg mb-10">
            <LocationButton className="w-full sm:w-auto" />
          </div>

          {/* Quick Search Bar directly inside Hero */}
          <div className="w-full max-w-xl mx-auto">
            <SearchBar
              placeholder="Search attractions, cities, food, photo spots..."
              className="shadow-2xl"
            />
          </div>

          {/* Floating Live Highlights */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>
                <strong className="text-white font-semibold">4.8+</strong> Star Curated Places
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>
                <strong className="text-white font-semibold">1 km - 10 km</strong> Radius Search
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>
                <strong className="text-white font-semibold">Crowd Level</strong> Live Indicators
              </span>
            </div>
          </div>
        </div>

        {/* Subtle Bottom Curved Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent pointer-events-none" />
      </section>

      {/* Popular Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Popular Destinations
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore hand-curated spots across India&apos;s most iconic travel capitals.
            </p>
          </div>

          <Link
            href="/destinations"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
          >
            <span>View all cities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.slice(0, 4).map((dest) => (
            <div
              key={dest.id}
              onClick={() => handleSelectCity(dest.name)}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-200/80 dark:border-slate-800"
            >
              <Image
                src={dest.heroImage}
                alt={dest.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Badges */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md">
                  {dest.placesCount} spots
                </span>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                <div className="flex items-center gap-1 text-xs text-amber-300 font-medium mb-1">
                  <span>From ~₹{dest.avgBudgetPerDay}/day</span>
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
                  {dest.name}
                </h3>
                <span className="text-xs text-slate-300 block mb-2 font-medium">
                  {dest.state}
                </span>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed opacity-90">
                  {dest.tagline}
                </p>

                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-indigo-300 group-hover:translate-x-1 transition-transform">
                  <span>Explore {dest.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Tailored Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Travel by Categories
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Whether you seek tranquil hidden stepwells or vibrant street delicacies, TRAVELX filters your world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/explore?category=${cat.id}`}
              className={`group p-6 rounded-3xl bg-gradient-to-br ${cat.bgClass} border bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300 flex items-start gap-4 cursor-pointer`}
            >
              <div className="text-3xl sm:text-4xl p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {cat.desc}
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                  <span>Browse Spots</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why TRAVELX Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-slate-900 to-indigo-950 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Zap className="w-4 h-4" />
              <span>Next-Gen Travel Engine</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Why travellers choose TRAVELX over generic search engines
            </h2>

            <p className="text-sm sm:text-base text-slate-300 mb-10 leading-relaxed">
              Mainstream map apps dump hundreds of uncurated pins. TRAVELX detects your exact spot and organizes your world into walk zones, crowd indicators, golden hours, and real local secrets.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-white">
                  Walking Distance Zones
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Discover what is literally within a 1 km stroll vs a quick 5 km auto-rickshaw ride.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-indigo-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-white">
                  Hidden Gems First
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Skip the tourist traps. We highlight low-crowd stepwells, hilltop viewpoints, and family havelis.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-300">
                  <Camera className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-white">
                  Photography Radar
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Exact golden hour windows, camera lens tips, and rooftop angles so every photo looks cinematic.
                </p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center gap-4">
              <Link
                href="/explore"
                className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-white text-slate-900 hover:bg-slate-100 transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                Start Exploring Now
              </Link>
              <Link
                href="/trip-planner"
                className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all active:scale-95 cursor-pointer"
              >
                Plan a Custom Itinerary
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
