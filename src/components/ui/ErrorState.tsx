"use client";

import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  secondaryAction?: React.ReactNode;
}

export default function ErrorState({
  title = "Something went wrong",
  message = "We encountered an issue loading this information. Please try again.",
  onRetry,
  secondaryAction,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-800/40 my-6">
      <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
        {title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
        {message}
      </p>
      <div className="flex items-center gap-3 flex-wrap justify-center">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        )}
        {secondaryAction}
      </div>
    </div>
  );
}
