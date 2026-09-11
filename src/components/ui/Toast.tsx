"use client";

import React from "react";
import { useSaved } from "@/context/SavedContext";
import { CheckCircle2, X } from "lucide-react";

export default function Toast() {
  const { toastMessage, clearToast } = useSaved();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/95 dark:bg-slate-800/95 text-white shadow-xl shadow-slate-950/20 backdrop-blur-md border border-slate-700/50 max-w-sm">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <p className="text-sm font-medium">{toastMessage}</p>
        <button
          onClick={clearToast}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
