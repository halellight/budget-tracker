"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ArrowRight, ArrowLeftRight } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { StateData } from "@/types/budget"

interface CompareClientProps {
  states: (StateData & { slug: string })[]
  initialA?: string
}

const SECTORS = ["education", "health", "infrastructure", "agriculture", "security"]

function StatePicker({
  states,
  value,
  onChange,
  label,
}: {
  states: (StateData & { slug: string })[]
  value: string
  onChange: (slug: string) => void
  label: string
}) {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)

  const filtered = states.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.region.toLowerCase().includes(search.toLowerCase())
  )

  const selected = states.find((s) => s.slug === value)

  return (
    <div className="relative">
      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">{label}</label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 sharp-border bg-background hover:border-primary transition-colors text-left"
      >
        {selected ? (
          <span className="font-black text-xl uppercase tracking-tight">{selected.name}</span>
        ) : (
          <span className="text-muted-foreground font-bold uppercase tracking-widest text-sm">Select State</span>
        )}
        <ArrowRight className="w-5 h-5 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute z-20 mt-[-1px] w-full sharp-border bg-background shadow-2xl">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-border/50 focus:outline-none text-foreground placeholder:text-muted-foreground font-medium"
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filtered.map((s) => (
              <button
                key={s.slug}
                onClick={() => { onChange(s.slug); setOpen(false); setSearch("") }}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-border/50 text-left transition-colors border-b border-border last:border-0"
              >
                <span className="font-bold text-sm uppercase tracking-wider">{s.name}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{s.region}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function CompareClient({ states, initialA = "" }: CompareClientProps) {
  const [slugA, setSlugA] = useState(initialA)
  const [slugB, setSlugB] = useState("")

  const stateA = states.find((s) => s.slug === slugA)
  const stateB = states.find((s) => s.slug === slugB)

  const budgetA = stateA?.budgets[stateA.budgets.length - 1]
  const budgetB = stateB?.budgets[stateB.budgets.length - 1]

  const swap = () => { setSlugA(slugB); setSlugB(slugA) }
  const canCompare = !!stateA && !!stateB

  const totalA = budgetA?.totalBudget ?? 0
  const totalB = budgetB?.totalBudget ?? 0
  const maxTotal = Math.max(totalA, totalB, 1)

  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 lg:py-24 max-w-6xl">
      {/* Header */}
      <div className="mb-12">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Analysis</p>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-4">Compare <br/>States<span className="text-primary">.</span></h1>
        <p className="text-muted-foreground font-medium max-w-xl">
          Select two Nigerian states to compare their 2024 budgets side by side — total size, sector allocations, and revenue sources.
        </p>
      </div>

      {/* State pickers */}
      <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-end mb-16">
        <StatePicker states={states} value={slugA} onChange={setSlugA} label="State A" />
        <button
          onClick={swap}
          disabled={!slugA && !slugB}
          className="flex items-center justify-center p-4 sharp-border bg-border hover:bg-primary hover:text-primary-foreground hover:border-primary text-foreground transition-colors disabled:opacity-50 self-end mb-0.5"
          title="Swap states"
        >
          <ArrowLeftRight className="w-6 h-6" />
        </button>
        <StatePicker states={states.filter(s => s.slug !== slugA)} value={slugB} onChange={setSlugB} label="State B" />
      </div>

      {/* Empty state */}
      {!canCompare && (
        <div className="text-center py-32 sharp-border bg-card/50">
          <p className="text-2xl font-black uppercase tracking-widest text-muted-foreground mb-2">Awaiting Selection</p>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
            Choose two states to begin comparison
          </p>
        </div>
      )}

      {/* Comparison results */}
      {canCompare && budgetA && budgetB && (
        <div className="animate-fade-in border-t border-border pt-16">

          {/* Header row */}
          <div className="grid grid-cols-2 gap-px bg-border sharp-border mb-12">
            {[stateA, stateB].map((st, idx) => (
              <div key={idx} className="bg-card p-6">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{st!.region}</div>
                <div className="text-3xl font-black uppercase tracking-tight">{st!.name}</div>
              </div>
            ))}
          </div>

          {/* Total budget comparison */}
          <div className="sharp-border bg-card p-8 mb-12">
            <h2 className="text-xl font-black uppercase tracking-tight mb-8">Total Budget ({budgetA.year})</h2>
            <div className="grid grid-cols-[1fr_auto_1fr] gap-8 items-center">
              <div>
                <p className="text-2xl lg:text-4xl font-black mb-3">{formatCurrency(totalA)}</p>
                <div className="w-full h-4 bg-background sharp-border relative">
                  <div className="absolute top-0 left-0 h-full bg-foreground" style={{ width: `${(totalA / maxTotal) * 100}%` }} />
                </div>
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">VS</div>
              <div>
                <p className="text-2xl lg:text-4xl font-black mb-3">{formatCurrency(totalB)}</p>
                <div className="w-full h-4 bg-background sharp-border relative">
                  <div className="absolute top-0 left-0 h-full bg-foreground" style={{ width: `${(totalB / maxTotal) * 100}%` }} />
                </div>
              </div>
            </div>
            {totalA !== totalB && (
              <div className="mt-8 text-center text-sm font-bold uppercase tracking-widest border-t border-border pt-6">
                <span className="text-foreground">{stateA.name}</span> is{" "}
                <span className="text-primary">{Math.abs(((totalA - totalB) / totalB) * 100).toFixed(1)}%</span>
                {" "}{totalA > totalB ? "larger" : "smaller"} than <span className="text-foreground">{stateB.name}</span>
              </div>
            )}
          </div>

          {/* Sector allocations */}
          <div className="sharp-border bg-card p-8 mb-12">
            <h2 className="text-xl font-black uppercase tracking-tight mb-8">Sector Allocations</h2>
            <div className="space-y-6">
              {SECTORS.map((sector) => {
                const amtA = budgetA.sectorAllocations[sector] ?? 0
                const amtB = budgetB.sectorAllocations[sector] ?? 0
                const maxSector = Math.max(amtA, amtB, 1)

                return (
                  <div key={sector} className="border-b border-border pb-6 last:border-0 last:pb-0">
                    <div className="text-sm font-bold uppercase tracking-widest mb-4 text-center">{sector}</div>
                    <div className="grid grid-cols-[1fr_1px_1fr] gap-6 items-center">
                      <div className="text-right">
                        <p className="text-lg font-black mb-2">{amtA ? formatCurrency(amtA) : "—"}</p>
                        <div className="w-full h-2 bg-background sharp-border relative flex justify-end">
                          <div className="h-full bg-primary" style={{ width: `${(amtA / maxSector) * 100}%` }} />
                        </div>
                      </div>
                      <div className="bg-border h-full w-full" />
                      <div className="text-left">
                        <p className="text-lg font-black mb-2">{amtB ? formatCurrency(amtB) : "—"}</p>
                        <div className="w-full h-2 bg-background sharp-border relative">
                          <div className="absolute top-0 left-0 h-full bg-primary" style={{ width: `${(amtB / maxSector) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Expenditure split */}
          <div className="grid sm:grid-cols-2 gap-px bg-border sharp-border">
            {[
              { state: stateA, budget: budgetA, slug: slugA },
              { state: stateB, budget: budgetB, slug: slugB },
            ].map(({ state, budget, slug }) => {
              const capPct = Math.round((budget.capitalExpenditure / budget.totalBudget) * 100)
              return (
                <div key={slug} className="bg-card p-8">
                  <h3 className="text-lg font-black uppercase tracking-tight mb-6">{state.name} Split</h3>
                  
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    <span>Cap: {capPct}%</span>
                    <span>Rec: {100 - capPct}%</span>
                  </div>
                  
                  <div className="w-full h-3 bg-background sharp-border relative mb-6">
                    <div className="absolute top-0 left-0 h-full bg-primary" style={{ width: `${capPct}%` }} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm font-bold">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Capital</div>
                      {formatCurrency(budget.capitalExpenditure)}
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Recurrent</div>
                      {formatCurrency(budget.recurrentExpenditure)}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <Link
                      href={`/state/${slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition-colors"
                    >
                      View Profile <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      )}
    </div>
  )
}
