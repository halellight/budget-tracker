"use client"

import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/utils"

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

type ChartData =
  | {
      sector: string
      amount: number
      percentage: number
    }
  | {
      source: string
      amount: number
      percentage: number
    }

interface BudgetChartsProps {
  sectorData: {
    sector: string
    amount: number
    percentage: number
  }[]
  revenueData: {
    source: string
    amount: number
    percentage: number
  }[]
}

export function BudgetCharts({ sectorData, revenueData }: BudgetChartsProps) {
  return (
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
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorData}>
                  <XAxis dataKey="sector" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => `Sector: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="amount" fill={chartColors.education} name="Amount" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid gap-2">
              {sectorData.map((item) => (
                <div key={item.sector} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          chartColors[item.sector.toLowerCase() as keyof typeof chartColors] || "#22C55E",
                      }}
                    />
                    <span>{item.sector}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(item.amount)}</div>
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
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <XAxis dataKey="source" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => `Source: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="amount" fill={chartColors.igr} name="Amount" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid gap-2">
              {revenueData.map((item) => (
                <div key={item.source} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          chartColors[item.source.toLowerCase() as keyof typeof chartColors] || "#EF4444",
                      }}
                    />
                    <span>{item.source}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(item.amount)}</div>
                    <div className="text-sm text-muted-foreground">{item.percentage.toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

