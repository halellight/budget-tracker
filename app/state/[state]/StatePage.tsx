'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { StateData, StateBudget, ChartData } from "@/types/budget"
import { formatCurrency, calculatePercentage } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getNextState } from "@/lib/stateNavigation"
import { StateImage } from '@/components/StateImage'
import { useStateData } from '@/lib/useStateData'
import { ClientSideChart } from '@/app/components/ClientSideChart'
import {BudgetInsights} from '@/components/BudgetInsights';
import {BudgetGlossary} from '@/components/BudgetGlossary';

// const DynamicBudgetInsights = dynamic(() => import('@/components/BudgetInsights'), {
//   loading: () => <p>Loading insights...</p>,
// })



// const DynamicBudgetGlossary = dynamic(() => import('@/components/BudgetGlossary'), {
//   loading: () => <p>Loading glossary...</p>,
// })

const chartColors = {
  education: "hsl(142, 76%, 36%)",
  health: "hsl(142, 76%, 46%)",
  infrastructure: "hsl(142, 76%, 56%)",
  agriculture: "hsl(142, 76%, 66%)",
  security: "hsl(142, 76%, 76%)",
  igr: "hsl(142, 76%, 86%)",
  faac: "hsl(142, 76%, 26%)",
  grants: "hsl(142, 76%, 16%)",
  loans: "hsl(142, 76%, 6%)",
}

interface StatePageProps {
  params: { state: string }
}

export default function StatePage({ params }: StatePageProps) {
  const { state } = params
  const { stateData, isLoading, isError } = useStateData(state)
  const [nextState, setNextState] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchNextState() {
      const next = await getNextState(state)
      setNextState(next)
    }
    fetchNextState()
  }, [state])

  if (isLoading) return <div className="text-foreground" aria-live="polite">Loading...</div>
  if (isError) return <div className="text-foreground" aria-live="assertive">Error loading state data</div>
  if (!stateData) return <div className="text-foreground" aria-live="assertive">No state data available</div>
  if (!stateData.budgets || stateData.budgets.length === 0) return <div className="text-foreground" aria-live="assertive">No budget data available for this state</div>

  const latestBudget = stateData.budgets[stateData.budgets.length - 1]

  const handleNextState = () => {
    if (nextState) {
      router.push(`/state/${nextState}`)
    }
  }

  const sectorData = Object.entries(latestBudget.sectorAllocations).map(([sector, amount]) => ({
    sector: sector.charAt(0).toUpperCase() + sector.slice(1),
    amount,
    percentage: calculatePercentage(amount, latestBudget.totalBudget),
  }))

  const revenueData = Object.entries(latestBudget.revenue).map(([source, amount]) => ({
    source: source.toUpperCase(),
    amount,
    percentage: calculatePercentage(amount, latestBudget.totalBudget),
  }))

  return (
    <div className="container mx-auto p-4">
      <div className="relative h-[300px] mb-8 rounded-lg overflow-hidden">
        <StateImage state={state} name={stateData.name} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-foreground">
            <h1 className="text-4xl font-bold mb-2">{stateData.name}</h1>
            <p className="text-lg mb-2">Governor: {stateData.currentGovernor}</p>
            <p className="text-lg">Budget Analysis {latestBudget.year}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {formatCurrency(latestBudget.totalBudget)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expenditure Split</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="text-sm text-muted-foreground">Recurrent</div>
                <div className="text-xl font-bold text-primary">
                  {formatCurrency(latestBudget.recurrentExpenditure)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Capital</div>
                <div className="text-xl font-bold text-primary">
                  {formatCurrency(latestBudget.capitalExpenditure)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
              <div className="h-[400px]">
                <ClientSideChart
                  data={sectorData}
                  dataKey="sector"
                  fill="hsl(var(--primary))"
                  title="Budget Allocation by Sector"
                />
              </div>
              <div className="mt-4 grid gap-2">
                {sectorData.map((item) => (
                  <div
                    key={item.sector}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            chartColors[
                              item.sector.toLowerCase() as keyof typeof chartColors
                            ],
                        }}
                      />
                      <span className="text-foreground">{item.sector}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-primary">
                        {formatCurrency(item.amount)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.percentage.toFixed(1)}%
                      </div>
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
              <div className="h-[400px]">
                <ClientSideChart
                  data={revenueData}
                  dataKey="source"
                  fill="hsl(var(--primary))"
                  title="Revenue Sources"
                />
              </div>
              <div className="mt-4 grid gap-2">
                {revenueData.map((item) => (
                  <div
                    key={item.source}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            chartColors[
                              item.source.toLowerCase() as keyof typeof chartColors
                            ],
                        }}
                      />
                      <span className="text-foreground">{item.source}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-primary">
                        {formatCurrency(item.amount)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.percentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {/* <DynamicBudgetInsights budget={latestBudget} />
        <DynamicBudgetGlossary /> */}
        <BudgetInsights budget={latestBudget} />
        <BudgetGlossary />
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleNextState} disabled={!nextState}>
          {nextState ? `Next State: ${nextState}` : 'No More States'}
        </Button>
      </div>
    </div>
  )
}

