export interface StateBudget {
  year: string;
  totalBudget: number;
  recurrentExpenditure: number;
  capitalExpenditure: number;
  sectorAllocations: {
    [sector: string]: number;
  };
  revenue: {
    [source: string]: number;
  };
}

export interface StateData {
  name: string;
  code: string;
  capital: string;
  region: "South-West" | "South-East" | "South-South" | "North-West" | "North-East" | "North-Central" | "FCT";
  currentGovernor: string;
  population: number; // in millions
  description: string;
  website?: string;
  budgets: StateBudget[];
}

export type RegionKey = "South-West" | "South-East" | "South-South" | "North-West" | "North-East" | "North-Central" | "FCT";

export const REGION_COLORS: Record<RegionKey, { bg: string; text: string; badge: string }> = {
  "South-West":    { bg: "from-emerald-900/60 to-emerald-950/80", text: "text-emerald-400",  badge: "badge-sw" },
  "South-East":    { bg: "from-cyan-900/60 to-cyan-950/80",       text: "text-cyan-400",     badge: "badge-se" },
  "South-South":   { bg: "from-violet-900/60 to-violet-950/80",   text: "text-violet-400",   badge: "badge-ss" },
  "North-Central": { bg: "from-amber-900/60 to-amber-950/80",     text: "text-amber-400",    badge: "badge-nc" },
  "North-West":    { bg: "from-rose-900/60 to-rose-950/80",       text: "text-rose-400",     badge: "badge-nw" },
  "North-East":    { bg: "from-orange-900/60 to-orange-950/80",   text: "text-orange-400",   badge: "badge-ne" },
  "FCT":           { bg: "from-blue-900/60 to-blue-950/80",       text: "text-blue-400",     badge: "badge-fct" },
};
