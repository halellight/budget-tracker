"use client"

import Link from "next/link"
import { useState } from "react"

export function SiteHeader() {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold flex items-center gap-2">
        <img
          src={imageError ? "/placeholder.svg?height=32&width=32" : "/coat-of-arms.svg"}
          alt="Nigerian Coat of Arms"
          className="w-8 h-8"
          onError={() => setImageError(true)}
        />
        BudgetTrack
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <Link href="/states" className="hover:text-primary">
          States
        </Link>
        <Link href="/about" className="hover:text-primary">
          About
        </Link>
        <Link href="/admin/upload" className="hover:text-primary">
          Upload Data
        </Link>
      </div>
    </div>
  )
}

