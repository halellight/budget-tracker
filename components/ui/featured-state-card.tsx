"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FeaturedStateCardProps {
  state: string
}

export function FeaturedStateCard({ state }: FeaturedStateCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <Link href={`/state/${state.toLowerCase()}`}>
      <Card className="hover:bg-accent transition-colors overflow-hidden">
        <img
          src={imageError ? "/placeholder.svg?height=200&width=400" : `/states/${state.toLowerCase()}.jpg`}
          alt={state}
          className="w-full h-40 md:h-48 object-cover"
          onError={() => setImageError(true)}
        />
        <CardHeader>
          <CardTitle>{state}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Explore {state} State's budget allocation and economic data</p>
        </CardContent>
      </Card>
    </Link>
  )
}

