import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { StateBudget } from "@/types/budget"
import { formatCurrency } from "@/lib/utils"
import { formatCurrencyInWords } from "@/lib/number-to-words"

interface BudgetInsightsProps {
  budget: StateBudget
  stateName: string
}

export function BudgetInsights({ budget, stateName }: BudgetInsightsProps) {
  // Calculate insights
  const capitalPercentage = (budget.capitalExpenditure / budget.totalBudget) * 100
  const recurrentPercentage = (budget.recurrentExpenditure / budget.totalBudget) * 100

  // Find highest and lowest sector allocations
  const sectorEntries = Object.entries(budget.sectorAllocations)
  const highestSector = sectorEntries.reduce((prev, current) => (current[1] > prev[1] ? current : prev))
  const lowestSector = sectorEntries.reduce((prev, current) => (current[1] < prev[1] ? current : prev))

  // Calculate percentages for highest and lowest sectors
  const highestSectorPercentage = (highestSector[1] / budget.totalBudget) * 100
  const lowestSectorPercentage = (lowestSector[1] / budget.totalBudget) * 100

  // Revenue insights
  const revenueEntries = Object.entries(budget.revenue)
  const highestRevenue = revenueEntries.reduce((prev, current) => (current[1] > prev[1] ? current : prev))
  const highestRevenuePercentage = (highestRevenue[1] / budget.totalBudget) * 100

  // Calculate if the budget is balanced, surplus, or deficit
  const totalRevenue = Object.values(budget.revenue).reduce((sum, value) => sum + value, 0)
  const budgetBalance = totalRevenue - budget.totalBudget
  const budgetStatus = budgetBalance > 0 ? "surplus" : budgetBalance < 0 ? "deficit" : "balanced"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Insights</CardTitle>
        <CardDescription>
          Key observations from {stateName} State's {budget.year} budget
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg">Budget Overview</h3>
          <p className="text-muted-foreground">
            {stateName} State's total budget for {budget.year} is {formatCurrencyInWords(budget.totalBudget)}. This
            budget{" "}
            {budgetStatus === "balanced"
              ? "is balanced"
              : budgetStatus === "surplus"
                ? `has a surplus of ${formatCurrency(budgetBalance)}`
                : `has a deficit of ${formatCurrency(Math.abs(budgetBalance))}`}
            .
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Expenditure Distribution</h3>
          <p className="text-muted-foreground">
            {capitalPercentage > recurrentPercentage
              ? `The budget prioritizes capital expenditure (${capitalPercentage.toFixed(1)}%) over recurrent expenditure (${recurrentPercentage.toFixed(1)}%).`
              : `The budget allocates more to recurrent expenditure (${recurrentPercentage.toFixed(1)}%) than capital expenditure (${capitalPercentage.toFixed(1)}%).`}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Sector Priorities</h3>
          <p className="text-muted-foreground">
            The highest allocation goes to the {highestSector[0]} sector with {formatCurrencyInWords(highestSector[1])}{" "}
            ({highestSectorPercentage.toFixed(1)}% of total budget). The lowest allocation is for the {lowestSector[0]}{" "}
            sector with {formatCurrencyInWords(lowestSector[1])} ({lowestSectorPercentage.toFixed(1)}% of total budget).
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Revenue Sources</h3>
          <p className="text-muted-foreground">
            The primary source of revenue is {highestRevenue[0].toUpperCase()} at{" "}
            {formatCurrencyInWords(highestRevenue[1])} ({highestRevenuePercentage.toFixed(1)}% of total budget).
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

