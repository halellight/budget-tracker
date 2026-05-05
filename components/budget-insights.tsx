import { formatCurrency } from "@/lib/utils"

import type { StateBudget } from "@/types/budget"

function formatCurrencyInWords(amount: number): string {
  if (amount >= 1_000_000_000_000) return `₦${(amount / 1_000_000_000_000).toFixed(2)} Trillion`
  if (amount >= 1_000_000_000) return `₦${(amount / 1_000_000_000).toFixed(2)} Billion`
  if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(2)} Million`
  return formatCurrency(amount)
}

export function BudgetInsights({ budget, stateName }: { budget: StateBudget; stateName: string }) {
  const topSector = Object.entries(budget.sectorAllocations).sort(
    ([, a], [, b]) => b - a,
  )[0]
  const topRevenue = Object.entries(budget.revenue).sort(([, a], [, b]) => b - a)[0]

  const totalRevenue = Object.values(budget.revenue).reduce((sum, val) => sum + val, 0)
  const budgetBalance = totalRevenue - budget.totalBudget
  const budgetStatus = budgetBalance > 0 ? "surplus" : budgetBalance < 0 ? "deficit" : "balanced"

  return (
    <div className="p-8 h-full">
      <div className="mb-8">
        <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Budget Insights</h3>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Key observations from {stateName} State&apos;s {budget.year} budget
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border-l-2 border-primary pl-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Overview</h4>
          <p className="text-sm font-medium leading-relaxed">
            {stateName} State&apos;s total budget for {budget.year} is {formatCurrencyInWords(budget.totalBudget)}. This budget{" "}
            {budgetStatus === "balanced"
              ? "is perfectly balanced"
              : budgetStatus === "surplus"
                ? `operates with a surplus of ${formatCurrency(budgetBalance)}`
                : `operates with a deficit of ${formatCurrency(Math.abs(budgetBalance))}`}
            .
          </p>
        </div>

        <div className="border-l-2 border-border pl-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Expenditure Focus</h4>
          <p className="text-sm font-medium leading-relaxed">
            The largest single sector allocation is{" "}
            <span className="font-bold text-foreground capitalize">{topSector[0]}</span>, receiving{" "}
            <span className="font-bold text-foreground">{formatCurrencyInWords(topSector[1] as number)}</span>. This accounts for{" "}
            <span className="font-bold text-foreground">
              {(((topSector[1] as number) / budget.totalBudget) * 100).toFixed(1)}%
            </span>{" "}
            of the total budget.
          </p>
        </div>

        <div className="border-l-2 border-border pl-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Revenue Dependency</h4>
          <p className="text-sm font-medium leading-relaxed">
            The primary source of revenue is{" "}
            <span className="font-bold text-foreground uppercase">{topRevenue[0]}</span>, contributing{" "}
            <span className="font-bold text-foreground">{formatCurrencyInWords(topRevenue[1] as number)}</span>. This represents{" "}
            <span className="font-bold text-foreground">
              {(((topRevenue[1] as number) / totalRevenue) * 100).toFixed(1)}%
            </span>{" "}
            of the total expected revenue.
          </p>
        </div>
      </div>
    </div>
  )
}
