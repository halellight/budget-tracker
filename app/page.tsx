import Link from "next/link"
import { getAllStates, getStateData } from "@/lib/api"
import { formatCurrency } from "@/lib/utils"
import { ArrowRight, ArrowUpRight, Check } from "lucide-react"
import { RotatingStateCard } from "@/components/rotating-state-card"
import type { StateData } from "@/types/budget"

const FEATURED = ["lagos", "rivers", "kano", "delta", "ogun", "abia"]

const STATS = [
  { label: "States Tracked",   value: "37",      sub: "All 36 + FCT" },
  { label: "Data Points",      value: "185+",  sub: "Across all sectors" },
  { label: "Total Budget",     value: "₦18.4T", sub: "Combined 2024 budgets" },
  { label: "Citizens",         value: "220M+",   sub: "Population represented" },
]

export default async function HomePage() {
  const stateNames = await getAllStates()
  const allStatesData = await Promise.all(
    stateNames.map(async (s) => {
      const d = await getStateData(s)
      return d ? { ...d, slug: s } : null
    })
  )
  const allValidStates = allStatesData.filter(Boolean) as (StateData & { slug: string })[]

  const featured = allValidStates.filter(s => FEATURED.includes(s.slug))

  return (
    <div className="min-h-screen pb-20">

      {/* ─── STARK EDITORIAL HERO ─── */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 sharp-border-bottom bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="max-w-2xl animate-fade-in">
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 uppercase text-foreground">
                Follow <br/>
                The <span className="text-primary">Money.</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-snug mb-10">
                Complete, verified budget data for all 36 Nigerian states and the FCT. No spin. No jargon. Just the numbers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/states"
                  className="inline-flex items-center justify-between px-6 py-4 bg-primary text-primary-foreground font-bold text-lg uppercase tracking-wider hover:bg-white transition-colors w-full sm:w-auto sharp-border border-transparent"
                >
                  Explore Data <ArrowRight className="w-5 h-5 ml-4" />
                </Link>
                <Link
                  href="/compare"
                  className="inline-flex items-center justify-between px-6 py-4 sharp-border text-foreground font-bold text-lg uppercase tracking-wider hover:border-primary hover:text-primary transition-colors w-full sm:w-auto"
                >
                  Compare States <ArrowRight className="w-5 h-5 ml-4" />
                </Link>
              </div>
            </div>

            {/* Right Content - Rotating Card */}
            <div className="animate-slide-up delay-100 flex justify-center lg:justify-end">
              <RotatingStateCard states={allValidStates} />
            </div>

          </div>
        </div>
      </section>

      {/* ─── DATA GRID ─── */}
      <section className="sharp-border-bottom bg-card">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {STATS.map(({ label, value, sub }, i) => (
              <div
                key={label}
                className="py-10 px-6 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-black text-foreground tracking-tighter mb-2">{value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{label}</div>
                <div className="text-xs text-muted-foreground font-medium">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENTO BOX FEATURED STATES ─── */}
      <section className="pt-20 sharp-border-bottom pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Key States</h2>
              <p className="text-muted-foreground mt-2 font-medium">Breakdowns for Nigeria&apos;s economic hubs.</p>
            </div>
            <Link
              href="/states"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-white transition-colors"
            >
              View all {stateNames.length} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((data, i) => {
              const budget = data.budgets[data.budgets.length - 1]
              const capPct = Math.round((budget.capitalExpenditure / budget.totalBudget) * 100)

              return (
                <Link
                  key={data.slug}
                  href={`/state/${data.slug}`}
                  className="group block sharp-border bg-card p-6 card-hover flex flex-col justify-between min-h-[300px]"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="px-3 py-1 bg-border text-foreground text-xs font-bold uppercase tracking-widest">
                        {data.region}
                      </div>
                      <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    
                    <h3 className="text-3xl font-black uppercase tracking-tight mb-1 group-hover:text-primary transition-colors">
                      {data.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      Cap: {data.capital} | Gov. {data.currentGovernor.split(" ").slice(-1)[0]}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Budget 2024</span>
                        <span className="text-2xl font-bold">{formatCurrency(budget.totalBudget)}</span>
                      </div>
                    </div>

                    {/* Brutalist Progress Bar */}
                    <div className="w-full h-2 bg-border relative">
                      <div 
                        className="absolute top-0 left-0 h-full bg-primary" 
                        style={{ width: `${capPct}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      <span>Cap: {capPct}%</span>
                      <span>Rec: {100 - capPct}%</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── WHY TRACK STATE BUDGETS ─── */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-foreground">
                Why Track State Budgets?
              </h2>
              
              <p className="text-lg text-muted-foreground font-medium leading-relaxed mb-8">
                Understanding how our states allocate resources is crucial for every Nigerian citizen. Our platform provides easy-to-understand visualizations of budget data and commodity production.
              </p>

              <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                {[
                  "Track government spending",
                  "Monitor development projects",
                  "Compare state performances",
                  "Make informed decisions",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-foreground" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sharp-border bg-background p-2 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
              <img 
                src="/naira.jpg" 
                alt="Naira Notes Background"
                className="w-full h-auto object-cover rounded-xl grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
