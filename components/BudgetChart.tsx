"use client"

import {
  Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const CHART_COLORS: Record<string, string> = {
  education:      "#16a34a", // Emerald 600
  health:         "#2563eb", // Blue 600
  infrastructure: "#d97706", // Amber 600
  agriculture:    "#db2777", // Pink 600
  security:       "#7c3aed", // Violet 600
  igr:            "#dc2626", // Red 600
  faac:           "#475569", // Slate 600
  grants:         "#0891b2", // Cyan 600
  loans:          "#7e22ce", // Purple 600
}

const DEFAULT_COLORS = [
  "#16a34a","#2563eb","#d97706","#db2777","#7c3aed",
  "#0891b2","#dc2626","#7e22ce","#ea580c","#475569"
]

function fmtShort(n: number): string {
  if (n >= 1_000_000_000_000) return `₦${(n / 1_000_000_000_000).toFixed(2)}T`
  if (n >= 1_000_000_000)     return `₦${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000)         return `₦${(n / 1_000_000).toFixed(0)}M`
  return `₦${n.toLocaleString()}`
}

interface BudgetChartsProps {
  sectorData: { sector: string; amount: number; percentage: number }[]
  revenueData: { source: string; amount: number; percentage: number }[]
}

function ChartPanel({
  data,
  keyField,
}: {
  data: { [key: string]: string | number }[]
  keyField: string
}) {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Bar chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 0, bottom: 4, left: 0 }} barSize={40}>
            <XAxis
              dataKey={keyField}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontWeight: 700 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
              dy={10}
            />
            <YAxis
              tickFormatter={fmtShort}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
              width={65}
              dx={-10}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted))" }}
              contentStyle={{
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0px",
                padding: "12px 16px",
                fontSize: "14px",
                fontFamily: "'Satoshi', sans-serif"
              }}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 900, marginBottom: 8, textTransform: "uppercase" }}
              itemStyle={{ color: "hsl(var(--foreground))", fontWeight: 700 }}
              formatter={(val: number) => [fmtShort(val), "Amount"]}
            />
            <Bar dataKey="amount" radius={[0, 0, 0, 0]}>
              {data.map((entry, i) => {
                const key = String(entry[keyField]).toLowerCase()
                const color = CHART_COLORS[key] ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]
                return <Cell key={key} fill={color} />
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend table */}
      <div className="grid gap-3 pt-6 border-t border-border">
        {data.map((item, i) => {
          const key = String(item[keyField]).toLowerCase()
          const color = CHART_COLORS[key] ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]
          const label = String(item[keyField])
          const amount = item.amount as number
          const pct = item.percentage as number
          const barW = `${Math.max(pct, 2)}%`

          return (
            <div key={key} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 flex-shrink-0 sharp-border" style={{ backgroundColor: color }} />
                  <span className="text-sm font-bold uppercase tracking-widest">{label}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-foreground">{fmtShort(amount)}</span>
                  <span className="text-xs text-muted-foreground ml-3 font-bold">{pct.toFixed(1)}%</span>
                </div>
              </div>
              <div className="h-1.5 bg-muted">
                <div
                  className="h-full transition-all duration-500"
                  style={{ width: barW, backgroundColor: color }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function BudgetCharts({ sectorData, revenueData }: BudgetChartsProps) {
  const sectors = sectorData.map((d) => ({ ...d, sector: d.sector.charAt(0).toUpperCase() + d.sector.slice(1) }))
  const revenues = revenueData.map((d) => ({ ...d, source: d.source.toUpperCase() }))

  return (
    <Tabs defaultValue="sectors" className="w-full">
      <TabsList className="w-full grid grid-cols-2 rounded-none bg-border p-0 h-14">
        <TabsTrigger 
          value="sectors" 
          className="rounded-none data-[state=active]:bg-card data-[state=active]:text-foreground uppercase tracking-widest font-bold text-xs h-full"
        >
          Sector Allocation
        </TabsTrigger>
        <TabsTrigger 
          value="revenue" 
          className="rounded-none data-[state=active]:bg-card data-[state=active]:text-foreground uppercase tracking-widest font-bold text-xs h-full"
        >
          Revenue Sources
        </TabsTrigger>
      </TabsList>
      <TabsContent value="sectors" className="mt-0">
        <ChartPanel data={sectors} keyField="sector" />
      </TabsContent>
      <TabsContent value="revenue" className="mt-0">
        <ChartPanel data={revenues} keyField="source" />
      </TabsContent>
    </Tabs>
  )
}
