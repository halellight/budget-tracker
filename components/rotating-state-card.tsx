"use client"

import { useState, useEffect } from "react"
import { PieChart, BarChart3, Building2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { StateData } from "@/types/budget"

function formatShortCurrency(amount: number) {
  if (amount >= 1_000_000_000_000) return `₦${(amount / 1_000_000_000_000).toFixed(2)}T`
  if (amount >= 1_000_000_000) return `₦${(amount / 1_000_000_000).toFixed(2)}B`
  return formatCurrency(amount)
}

export function RotatingStateCard({ states }: { states: StateData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Rotate every 7 seconds
  useEffect(() => {
    if (states.length === 0) return
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % states.length)
        setIsAnimating(false)
      }, 500) // Half a second for fade out
    }, 7000)
    return () => clearInterval(interval)
  }, [states.length])

  if (states.length === 0) return null

  const currentState = states[currentIndex]
  const latestBudget = currentState.budgets[currentState.budgets.length - 1]

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square sm:aspect-auto sm:h-96">
      <div 
        className={`absolute inset-0 bg-card sharp-border p-4 flex flex-col gap-4 transition-opacity duration-500 ease-in-out ${isAnimating ? "opacity-0" : "opacity-100"}`}
      >
        {/* Top Total Box */}
        <div className="bg-background sharp-border p-6 flex-1 flex flex-col justify-center relative">
          <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest mb-2">
            {currentState.name} State Budget {latestBudget.year}
          </p>
          <p className="text-4xl sm:text-5xl font-black text-foreground">
            {formatShortCurrency(latestBudget.totalBudget)}
          </p>
          <div className="absolute top-6 right-6">
            <PieChart className="w-8 h-8 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 flex-1">
          {/* Bottom Left: Capital */}
          <div className="bg-background sharp-border p-6 flex flex-col justify-center">
            <BarChart3 className="w-6 h-6 text-primary mb-4" strokeWidth={1.5} />
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">
              Capital Expenditure
            </p>
            <p className="text-2xl sm:text-3xl font-black text-foreground">
              {formatShortCurrency(latestBudget.capitalExpenditure)}
            </p>
          </div>

          {/* Bottom Right: Recurrent */}
          <div className="bg-background sharp-border p-6 flex flex-col justify-center">
            <Building2 className="w-6 h-6 text-primary mb-4" strokeWidth={1.5} />
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">
              Recurrent Expenditure
            </p>
            <p className="text-2xl sm:text-3xl font-black text-foreground">
              {formatShortCurrency(latestBudget.recurrentExpenditure)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
