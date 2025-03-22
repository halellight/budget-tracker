"use client"

import { useState, useEffect } from "react"

interface BarChartProps {
  data: {
    label: string
    value: number
    color?: string
    percentage: number
  }[]
  height?: number
  currencyFormatter: string[]
}

export function BarChart({ data, height = 300, currencyFormatter }: BarChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
  }

  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <div className="flex h-full">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 h-full">
            <div className="flex-1 w-full flex items-end px-1">
              <div
                className="w-full rounded-t-md transition-all duration-500 ease-in-out"
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color || "#22C55E",
                }}
              />
            </div>
            <div className="mt-2 text-xs text-center font-medium truncate w-full px-1">{item.label}</div>
            <div className="mt-1 text-xs text-muted-foreground">{currencyFormatter[index]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

