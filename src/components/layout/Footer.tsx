"use client";

import React from "react";
import Link from "next/link";
import { Compass, Heart, MapPin, Sparkles, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-24 md:pb-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-indigo-600/25">
                <Compass className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                TRAVEL<span className="text-indigo-400">X</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The intelligent location-aware travel discovery engine. Uncover famous landmarks, secret alleyways, local street delicacies, and photo spots wherever your journey takes you.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>Available in Jaipur, Mumbai, Goa, Delhi, Pune, Nagpur, Agra & growing.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Discovery
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/explore" className="hover:text-indigo-400 transition-colors">
                  Explore Near Me
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-indigo-400 transition-colors">
                  All Destinations
                </Link>
              </li>
              <li>
                <Link href="/trip-planner" className="hover:text-indigo-400 transition-colors">
                  AI Trip Planner
                </Link>
              </li>
              <li>
                <Link href="/budget-planner" className="hover:text-indigo-400 transition-colors">
                  Budget Calculator
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-indigo-400 transition-colors">
                  Wishlist & Bookmarks
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Featured Cities
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/explore?city=jaipur" className="hover:text-indigo-400 transition-colors">
                  Jaipur (Pink City)
                </Link>
              </li>
              <li>
                <Link href="/explore?city=mumbai" className="hover:text-indigo-400 transition-colors">
                  Mumbai Coastal
                </Link>
              </li>
              <li>
                <Link href="/explore?city=goa" className="hover:text-indigo-400 transition-colors">
                  Goa Beaches & Heritage
                </Link>
              </li>
              <li>
                <Link href="/explore?city=delhi" className="hover:text-indigo-400 transition-colors">
                  Delhi Monuments & Food
                </Link>
              </li>
              <li>
                <Link href="/explore?city=agra" className="hover:text-indigo-400 transition-colors">
                  Agra & Taj Mahal
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Travel Radar
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Receive secret weekend itineraries and hidden gem alerts every Friday.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing to TRAVELX radar!");
              }}
              className="space-y-2"
            >
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} TRAVELX Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for explorers & wanderers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
