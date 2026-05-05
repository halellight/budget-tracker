import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getStateData, getAllStates } from "@/lib/api"
import { formatCurrency } from "@/lib/utils"
import { BudgetCharts } from "@/components/BudgetChart"
import { BudgetInsights } from "@/components/budget-insights"
import { BudgetGlossary } from "@/components/budget-glossary"
import { ArrowLeft, ExternalLink } from "lucide-react"

export async function generateStaticParams() {
  const states = await getAllStates()
  return states.map((s) => ({ state: s }))
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params
  const data = await getStateData(state)
  if (!data) return { title: "State Not Found" }
  const budget = data.budgets[data.budgets.length - 1]
  return {
    title: `${data.name} State Budget`,
    description: `${data.name} ${budget.year} budget: ${formatCurrency(budget.totalBudget)} total.`,
  }
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateParam } = await params
  const stateCode = stateParam.toLowerCase()
  const stateData = await getStateData(stateCode)

  if (!stateData) notFound()

  const latestBudget = stateData.budgets[stateData.budgets.length - 1]
  const hasPrev = stateData.budgets.length > 1
  const prevBudget = hasPrev ? stateData.budgets[stateData.budgets.length - 2] : null

  const sectorData = Object.entries(latestBudget.sectorAllocations).map(([sector, amount]) => ({
    sector,
    amount,
    percentage: (amount / latestBudget.totalBudget) * 100,
  }))

  const revenueData = Object.entries(latestBudget.revenue).map(([source, amount]) => ({
    source,
    amount,
    percentage: (amount / latestBudget.totalBudget) * 100,
  }))

  const totalRevenue = Object.values(latestBudget.revenue).reduce((a, b) => a + b, 0)
  const balance = totalRevenue - latestBudget.totalBudget
  const capPct = Math.round((latestBudget.capitalExpenditure / latestBudget.totalBudget) * 100)
  const recPct = 100 - capPct

  const budgetChange = prevBudget
    ? ((latestBudget.totalBudget - prevBudget.totalBudget) / prevBudget.totalBudget) * 100
    : null

  return (
    <div className="pb-20">
      {/* ── STARK HEADER ── */}
      <div className="sharp-border-bottom bg-card pt-10 pb-16 relative overflow-hidden">
        {/* State Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`/states/${stateCode}.jpg`} 
            alt={`${stateData.name} State`}
            className="w-full h-full object-cover opacity-40 object-center mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <Link
            href="/states"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All States
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-border text-xs font-bold uppercase tracking-widest">
                  {stateData.region}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Cap: {stateData.capital}
                </span>
              </div>

              <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
                {stateData.name} <span className="text-primary">.</span>
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm font-medium border-l-2 border-primary pl-4">
                <div><span className="text-muted-foreground uppercase text-xs font-bold tracking-widest block mb-1">Governor</span> {stateData.currentGovernor}</div>
                {stateData.population && <div><span className="text-muted-foreground uppercase text-xs font-bold tracking-widest block mb-1">Pop.</span> ~{stateData.population}M</div>}
                {stateData.website && (
                  <div>
                    <span className="text-muted-foreground uppercase text-xs font-bold tracking-widest block mb-1">Portal</span>
                    <a href={stateData.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary transition-colors">
                      Website <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Massive total budget block */}
            <div className="bg-background sharp-border p-6 lg:p-8 min-w-[300px]">
              <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Total {latestBudget.year} Budget</div>
              <div className="text-3xl sm:text-5xl font-black tracking-tight mb-1">{formatCurrency(latestBudget.totalBudget)}</div>
              {budgetChange !== null && (
                <div className={`text-sm font-bold uppercase tracking-wider ${budgetChange > 0 ? "text-primary" : "text-destructive"}`}>
                  {budgetChange > 0 ? "+" : ""}{budgetChange.toFixed(1)}% vs {prevBudget?.year}
                </div>
              )}
            </div>
          </div>
          
          {stateData.description && (
            <p className="text-muted-foreground mt-10 max-w-3xl leading-relaxed font-medium">
              {stateData.description}
            </p>
          )}
        </div>
      </div>

      {/* ── KEY METRICS BENTO ── */}
      <div className="container mx-auto px-4 sm:px-6 pt-16">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Metrics Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border sharp-border mb-16">
          {[
            { label: "Capital Exp.", value: formatCurrency(latestBudget.capitalExpenditure), sub: `${capPct}% of total` },
            { label: "Recurrent Exp.", value: formatCurrency(latestBudget.recurrentExpenditure), sub: `${recPct}% of total` },
            { label: "Total Revenue", value: formatCurrency(totalRevenue), sub: "Estimated income" },
            { 
              label: "Fiscal Balance", 
              value: balance > 0 ? "Surplus" : balance < 0 ? "Deficit" : "Balanced", 
              sub: balance !== 0 ? formatCurrency(Math.abs(balance)) : "Matched",
              textColor: balance > 0 ? "text-primary" : balance < 0 ? "text-destructive" : ""
            },
          ].map(({ label, value, sub, textColor }) => (
            <div key={label} className="bg-card p-8">
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">{label}</div>
              <div className={`text-2xl font-black mb-1 ${textColor || "text-foreground"}`}>{value}</div>
              <div className="text-sm font-medium text-muted-foreground">{sub}</div>
            </div>
          ))}
        </div>

        {/* ── CHARTS SECTION ── */}
        <div className="mb-16">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Breakdowns</h2>
          <div className="sharp-border bg-card">
            <BudgetCharts sectorData={sectorData} revenueData={revenueData} />
          </div>
        </div>

        {/* ── INSIGHTS & GLOSSARY ── */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="sharp-border bg-card p-0">
            <BudgetInsights budget={latestBudget} stateName={stateData.name} />
          </div>
          <div className="sharp-border bg-card p-0">
            <BudgetGlossary />
          </div>
        </div>

      </div>
    </div>
  )
}
