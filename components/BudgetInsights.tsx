import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StateBudget } from "@/types/budget"
import { formatCurrency } from "@/lib/utils"

interface BudgetInsightsProps {
  budget: StateBudget
}

export function BudgetInsights({ budget }: BudgetInsightsProps) {
  const totalRevenue = Object.values(budget.revenue).reduce((sum, value) => sum + value, 0)
  const topSector = Object.entries(budget.sectorAllocations).reduce((a, b) => a[1] > b[1] ? a : b)
  const capitalPercentage = (budget.capitalExpenditure / budget.totalBudget) * 100
  const recurrentPercentage = (budget.recurrentExpenditure / budget.totalBudget) * 100

  return (
    <Card className="bg-secondary text-foreground">
      <CardHeader>
        <CardTitle className="text-primary">Budget Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>
            <strong className="text-primary">Total Revenue vs Budget:</strong> The total revenue ({formatCurrency(totalRevenue)}) 
            {totalRevenue > budget.totalBudget ? " exceeds " : " is less than "} 
            the total budget ({formatCurrency(budget.totalBudget)}) by {formatCurrency(Math.abs(totalRevenue - budget.totalBudget))}.
          </li>
          <li>
            <strong className="text-primary">Top Funded Sector:</strong> {topSector[0].charAt(0).toUpperCase() + topSector[0].slice(1)} receives the highest allocation of {formatCurrency(topSector[1])}.
          </li>
          <li>
            <strong className="text-primary">Capital vs Recurrent Expenditure:</strong> {capitalPercentage.toFixed(1)}% of the budget is allocated to capital expenditure, while {recurrentPercentage.toFixed(1)}% goes to recurrent expenditure.
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

