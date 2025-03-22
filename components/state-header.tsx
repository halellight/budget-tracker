"use client"

import { useState } from "react"

interface StateHeaderProps {
  stateName: string
  year: string
  statePath: string
}

export function StateHeader({ stateName, year, statePath }: StateHeaderProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="relative h-[300px] mb-8 rounded-lg overflow-hidden">
      <img
        src={imageError ? "/placeholder.svg?height=300&width=800" : `/states/${statePath}.jpg`}
        alt={`${stateName} State`}
        className="absolute inset-0 w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-2">{stateName} State</h1>
          <p className="text-lg">Budget Analysis {year}</p>
        </div>
      </div>
    </div>
  )
}

