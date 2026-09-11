export function formatDistance(km: number | undefined): string {
  if (km === undefined || isNaN(km)) return "Nearby";
  if (km < 1) {
    const meters = Math.round(km * 1000);
    return `${meters} m away`;
  }
  return `${km.toFixed(1)} km away`;
}

export function formatCurrency(amount: number | "Free", currency = "₹"): string {
  if (amount === "Free" || amount === 0) return "Free Entry";
  return `${currency}${amount.toLocaleString("en-IN")}`;
}

export function formatPricePerNight(amount: number, currency = "₹"): string {
  return `${currency}${amount.toLocaleString("en-IN")}/night`;
}

export function formatCrowdBadge(crowd?: string): { label: string; colorClass: string } {
  switch (crowd) {
    case "Low":
      return { label: "Quiet & Peaceful", colorClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400" };
    case "Moderate":
      return { label: "Moderate Crowd", colorClass: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400" };
    case "Crowded":
      return { label: "Popular & Lively", colorClass: "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400" };
    case "Very Crowded":
      return { label: "High Rush", colorClass: "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400" };
    default:
      return { label: "Standard Crowd", colorClass: "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-slate-400" };
  }
}
