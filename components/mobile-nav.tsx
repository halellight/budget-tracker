"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "/",         label: "Home" },
  { href: "/states",   label: "States" },
  { href: "/compare",  label: "Compare" },
  { href: "/about",    label: "About" },
  { href: "/admin/upload", label: "Upload Data" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden text-foreground hover:text-primary transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" strokeWidth={1.5} />
      </button>

      {/* Drawer */}
      <div
        className={`
          fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-background border-l border-border
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <Link href="/" className="font-bold text-xl tracking-tight" onClick={() => setOpen(false)}>
            ngtrak<span className="text-primary">.</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex flex-col p-6 gap-6">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`
                  text-2xl font-bold tracking-tight transition-colors
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

        <div className="absolute bottom-6 left-6 right-6 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
            Civic Transparency
          </p>
        </div>
      </div>
    </>
  )
}
