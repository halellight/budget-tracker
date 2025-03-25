"use client"

import { Info } from "lucide-react"
import { useState } from "react"

export function ChartInstruction() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-accent/50 p-2 rounded-md mb-4">
      <Info className="h-4 w-4" />
      <span>Hover or tap on chart bars to see detailed budget information</span>
      <button className="ml-auto text-xs text-primary" onClick={() => setDismissed(true)}>
        Dismiss
      </button>
    </div>
  )
}

