"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { MobileNav } from "./mobile-nav"

export function SiteHeader() {
  const [imageError, setImageError] = useState(false)
  
  return (
    <div className="flex justify-between items-center w-full">
      <Link href="/" className="text-2xl font-bold flex items-center gap-2">
        <div className="relative w-8 h-8">
          {imageError ? (
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center text-white text-xs">
              NG
            </div>
          ) : (
            <Image 
              src="/coat-of-arms.svg"
              alt="Nigerian Coat of Arms" 
              fill
              onError={() => setImageError(true)}
            />
          )}
        </div>
        BudgetTrack
      </Link>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <Link href="/states" className="hover:text-primary">States</Link>
        <Link href="/about" className="hover:text-primary">About</Link>
        <Link href="/admin/upload" className="hover:text-primary">Upload Data</Link>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
}