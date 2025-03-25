"use client"

import { useState, useEffect, useRef } from "react"

interface InteractiveBarChartProps {
  data: {
    label: string
    value: number
    color?: string
    percentage: number
  }[]
  height?: number
  currencyFormatter: string[]
}

export function InteractiveBarChart({ data, height = 300, currencyFormatter }: InteractiveBarChartProps) {
  const [mounted, setMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  if (!mounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
  }

  const maxValue = Math.max(...data.map((item) => item.value))

  const handleInteraction = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  // Format currency for display
  const formatCurrencyForDisplay = (value: string) => {
    if (isMobile) {
      // On mobile, abbreviate large numbers
      if (value.includes("billion")) {
        return value.replace("billion", "B")
      }
      if (value.includes("million")) {
        return value.replace("million", "M")
      }
      // Remove commas and shorten
      return value.replace(/,/g, "").substring(0, 7) + "..."
    }
    return value
  }

  return (
    <div className="w-full relative" style={{ height: `${height}px` }}>
      <div className="flex h-full">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center flex-1 h-full"
            onClick={() => handleInteraction(index)}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onTouchStart={() => handleInteraction(index)}
          >
            <div className="flex-1 w-full flex items-end px-1 relative cursor-pointer">
              <div
                className={`w-full rounded-t-md transition-all duration-300 ease-in-out ${
                  activeIndex === index ? "brightness-110 shadow-lg scale-105 origin-bottom" : ""
                }`}
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color || "#22C55E",
                }}
              />
              {activeIndex === index && (
                <div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-background border border-border rounded-md shadow-md p-2 z-10 whitespace-nowrap"
                  ref={tooltipRef}
                >
                  <div className="font-medium">{currencyFormatter[index]}</div>
                  <div className="text-xs text-muted-foreground">{item.percentage.toFixed(1)}% of budget</div>
                </div>
              )}
            </div>
            <div className="mt-2 text-xs text-center font-medium truncate w-full px-1">{item.label}</div>
            <div
              className={`mt-1 text-xs ${activeIndex === index ? "text-primary font-medium" : "text-muted-foreground"} truncate w-full px-1`}
            >
              {formatCurrencyForDisplay(currencyFormatter[index])}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

