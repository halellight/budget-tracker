"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, MapPin, ArrowUpRight } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { StateData, RegionKey } from "@/types/budget"

interface StatesClientProps {
  states: (StateData & { slug: string })[]
}

const REGIONS: RegionKey[] = [
  "South-West", "South-East", "South-South",
  "North-West", "North-East", "North-Central", "FCT"
]

function getBudgetSize(total: number): { label: string; cls: string } {
  if (total >= 500_000_000_000) return { label: "Large", cls: "bg-primary text-primary-foreground" }
  if (total >= 250_000_000_000) return { label: "Medium", cls: "bg-border text-foreground" }
  return { label: "Small", cls: "bg-background sharp-border text-muted-foreground" }
}

export function StatesClient({ states }: StatesClientProps) {
  const [search, setSearch] = useState("")
  const [region, setRegion] = useState<RegionKey | "All">("All")

  const filtered = useMemo(() => {
    return states
      .filter((s) => {
        const q = search.toLowerCase()
        const matchSearch =
          s.name.toLowerCase().includes(q) ||
          s.capital.toLowerCase().includes(q) ||
          s.currentGovernor.toLowerCase().includes(q)
        const matchRegion = region === "All" || s.region === region
        return matchSearch && matchRegion
      })
      .sort((a, b) => {
        const aBudget = a.budgets[a.budgets.length - 1]?.totalBudget ?? 0
        const bBudget = b.budgets[b.budgets.length - 1]?.totalBudget ?? 0
        return bBudget - aBudget
      })
  }, [states, search, region])

  return (
    <>
      {/* Search + Filter bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by state, capital, or governor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 sharp-border bg-background text-foreground font-medium placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-none"
          />
        </div>
        <div className="relative md:w-64">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as RegionKey | "All")}
            className="w-full px-4 py-4 sharp-border bg-background text-foreground font-bold uppercase tracking-wider focus:outline-none focus:border-primary appearance-none cursor-pointer rounded-none"
          >
            <option value="All">All Regions</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {/* Region filters (desktop only visible alternative to select if wanted, but let's keep it minimal) */}
      <div className="flex flex-wrap gap-2 mb-8 hidden sm:flex">
        <button
          onClick={() => setRegion("All")}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors border ${
            region === "All"
              ? "bg-foreground text-background border-foreground"
              : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
          }`}
        >
          All ({states.length})
        </button>
        {REGIONS.map((r) => {
          const count = states.filter((s) => s.region === r).length
          return (
            <button
              key={r}
              onClick={() => setRegion(r === region ? "All" : r)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors border ${
                region === r
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {r} ({count})
            </button>
          )
        })}
      </div>

      <div className="mb-6 border-b border-border pb-4 flex justify-between items-end">
        <h2 className="text-xl font-bold uppercase tracking-wider">Results</h2>
        <span className="text-sm font-bold text-muted-foreground">{filtered.length} found</span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-32 sharp-border bg-card/50">
          <p className="text-2xl font-black uppercase tracking-widest text-muted-foreground mb-4">No Data Found</p>
          <button
            onClick={() => { setSearch(""); setRegion("All") }}
            className="text-sm font-bold uppercase tracking-widest text-primary hover:underline"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((state, i) => {
            const budget = state.budgets[state.budgets.length - 1]
            const capPct = budget
              ? Math.round((budget.capitalExpenditure / budget.totalBudget) * 100)
              : 0
            const size = budget ? getBudgetSize(budget.totalBudget) : null

            return (
              <Link
                key={state.slug}
                href={`/state/${state.slug}`}
                className="group block sharp-border bg-card p-0 card-hover flex flex-col justify-between animate-fade-in min-h-[300px] overflow-hidden relative"
                style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
              >
                <div className="relative h-32 w-full overflow-hidden border-b border-border bg-muted">
                  <img 
                    src={`/states/${state.slug}.jpg`} 
                    alt={`${state.name} State`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-background sharp-border text-xs font-bold uppercase tracking-widest text-foreground">
                      {state.region}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-background sharp-border p-1">
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-2xl uppercase tracking-tight text-foreground group-hover:text-primary transition-colors leading-none mb-2">
                      {state.name}
                    </h3>
                    <p className="text-xs font-medium text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      {state.capital}
                    </p>
                  </div>

                  {budget ? (
                    <div className="mt-6 pt-4 border-t border-border">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Budget {budget.year}
                        </span>
                        {size && (
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 ${size.cls}`}>
                            {size.label}
                          </span>
                        )}
                      </div>
                      <p className="text-xl font-bold text-foreground mb-3">{formatCurrency(budget.totalBudget)}</p>
                      
                      <div className="w-full h-1.5 bg-border relative">
                        <div 
                          className="absolute top-0 left-0 h-full bg-primary" 
                          style={{ width: `${capPct}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6 pt-4 border-t border-border">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">No Data</p>
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
