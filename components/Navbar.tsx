'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-background shadow-lg border-b border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-primary text-2xl font-bold">BudgetTrack</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-foreground hover:bg-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link href="/states" className="text-foreground hover:bg-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium">States</Link>
              <Link href="/about" className="text-foreground hover:bg-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link href="/upload" className="text-foreground hover:bg-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Upload</Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-foreground hover:bg-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link href="/states" className="text-foreground hover:bg-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium">States</Link>
            <Link href="/about" className="text-foreground hover:bg-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link href="/upload" className="text-foreground hover:bg-secondary hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Upload</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

