import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getStateData } from "@/lib/api"
import { formatCurrency } from "@/lib/utils"
import { formatCurrencyInWords } from "@/lib/number-to-words"
import { BarChart } from "@/components/bar-chart"
import { BudgetInsights } from "@/components/budget-insights"
import { BudgetGlossary } from "@/components/budget-glossary"
import { StateHeader } from "@/components/state-header"

const chartColors = {
  education: "#22C55E",
  health: "#3B82F6",
  infrastructure: "#F59E0B",
  agriculture: "#EC4899",
  security: "#8B5CF6",
  igr: "#EF4444",
  faac: "#64748B",
  grants: "#06B6D4",
  loans: "#9333EA",
}

export default async function StatePage({ params }: { params: { state: string } }) {
  // Use a local variable to avoid the params.state error
  const stateCode = params.state.toLowerCase()
  const stateData = await getStateData(stateCode)

  if (!stateData) {
    notFound()
  }

  const latestBudget = stateData.budgets[stateData.budgets.length - 1]

  const sectorData = Object.entries(latestBudget.sectorAllocations).map(([sector, amount]) => ({
    label: sector.charAt(0).toUpperCase() + sector.slice(1),
    value: amount,
    color: chartColors[sector.toLowerCase() as keyof typeof chartColors] || "#22C55E",
    percentage: (amount / latestBudget.totalBudget) * 100,
  }))

  const revenueData = Object.entries(latestBudget.revenue).map(([source, amount]) => ({
    label: source.toUpperCase(),
    value: amount,
    color: chartColors[source.toLowerCase() as keyof typeof chartColors] || "#EF4444",
    percentage: (amount / latestBudget.totalBudget) * 100,
  }))

  // Pre-format currency values for the client component
  const sectorCurrencyValues = sectorData.map((item) => formatCurrency(item.value))
  const revenueCurrencyValues = revenueData.map((item) => formatCurrency(item.value))

  return (
    <div className="container mx-auto p-4">
      <StateHeader stateName={stateData.name} year={latestBudget.year} statePath={stateCode} />

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(latestBudget.totalBudget)}</div>
            <div className="text-muted-foreground mt-1">{formatCurrencyInWords(latestBudget.totalBudget)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expenditure Split</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Recurrent</div>
                <div className="text-xl font-bold">{formatCurrency(latestBudget.recurrentExpenditure)}</div>
                <div className="text-xs text-muted-foreground">
                  {formatCurrencyInWords(latestBudget.recurrentExpenditure)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Capital</div>
                <div className="text-xl font-bold">{formatCurrency(latestBudget.capitalExpenditure)}</div>
                <div className="text-xs text-muted-foreground">
                  {formatCurrencyInWords(latestBudget.capitalExpenditure)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      

      <div className="mt-8">
        <Tabs defaultValue="sectors" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sectors">Sector Allocation</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Sources</TabsTrigger>
          </TabsList>
          <TabsContent value="sectors">
            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation by Sector</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] mb-6">
                  <BarChart data={sectorData} height={350} currencyFormatter={sectorCurrencyValues} />
                </div>
                <div className="mt-4 grid gap-2">
                  {sectorData.map((item, index) => (
                    <div key={item.label} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.label}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{sectorCurrencyValues[index]}</div>
                        <div className="text-sm text-muted-foreground">{item.percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] mb-6">
                  <BarChart data={revenueData} height={350} currencyFormatter={revenueCurrencyValues} />
                </div>
                <div className="mt-4 grid gap-2">
                  {revenueData.map((item, index) => (
                    <div key={item.label} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.label}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{revenueCurrencyValues[index]}</div>
                        <div className="text-sm text-muted-foreground">{item.percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BudgetInsights budget={latestBudget} stateName={stateData.name} />

      <div className="mt-8">
        <BudgetGlossary />
      </div>
    </div>
  )
}

