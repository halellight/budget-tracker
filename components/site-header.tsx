"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MobileNav } from "./mobile-nav"

const navLinks = [
  { href: "/",          label: "Home" },
  { href: "/states",   label: "States" },
  { href: "/compare",  label: "Compare" },
  { href: "/about",    label: "About" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <div className="flex justify-between items-center w-full">
      {/* Logo */}
      <Link href="/" className="font-bold text-xl tracking-tight hover:text-primary transition-colors">
        ngtrak<span className="text-primary">.</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`
                text-sm font-semibold uppercase tracking-widest transition-colors
                ${isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      {/* CTA + Mobile */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/upload"
          className="hidden md:inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 sharp-border hover:border-primary hover:text-primary transition-colors"
        >
          Upload Data
        </Link>
        <MobileNav />
      </div>
    </div>
  )
}
