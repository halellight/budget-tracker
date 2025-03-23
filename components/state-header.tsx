"use client"

import { useState } from "react"
import Image from "next/image"

interface StateHeaderProps {
  stateName: string;
  year: string;
  statePath: string;
}

export function StateHeader({ stateName, year, statePath }: StateHeaderProps) {
  const [imageError, setImageError] = useState(false)
  
  return (
    <div className="relative h-[300px] mb-8 rounded-lg overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {imageError ? (
          <div className="w-full h-full bg-accent flex items-center justify-center">
            <span className="text-muted-foreground">{stateName} State</span>
          </div>
        ) : (
          <Image 
            src={`/states/${statePath}.jpg`}
            alt={`${stateName} State`}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            priority
          />
        )}
      </div>
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