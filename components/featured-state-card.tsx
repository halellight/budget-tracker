"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FeaturedStateCardProps {
  state: string;
}

export function FeaturedStateCard({ state }: FeaturedStateCardProps) {
  const [imageError, setImageError] = useState(false)
  
  return (
    <Link href={`/state/${state.toLowerCase()}`}>
      <Card className="hover:bg-accent transition-colors overflow-hidden">
        <div className="relative w-full h-40 md:h-48">
          {imageError ? (
            <div className="w-full h-full bg-accent flex items-center justify-center">
              <span className="text-muted-foreground">{state} State</span>
            </div>
          ) : (
            <Image 
              src={`/states/${state.toLowerCase()}.jpg`}
              alt={state} 
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <CardHeader>
          <CardTitle>{state}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Explore {state} State's budget allocation and economic data
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}