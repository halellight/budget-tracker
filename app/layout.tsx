import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Nigerian Budget Tracker",
  description: "Track budget spending across Nigerian states",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable}`}>
      <body className="font-sans bg-background text-foreground min-h-screen">
        <header className="border-b border-border">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                <img src="/coat-of-arms.svg" alt="Nigerian Coat of Arms" className="w-8 h-8" />
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

              {/* Mobile Navigation */}
              <MobileNav />
            </div>
          </nav>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="border-t border-border mt-8">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold mb-2">About BudgetTrack</h3>
                <p className="text-muted-foreground">Empowering Nigerians with transparent budget information</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Quick Links</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/states" className="text-muted-foreground hover:text-primary">
                      States
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-muted-foreground hover:text-primary">
                      About
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Contact</h3>
                <p className="text-muted-foreground">info@budgettrack.ng</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

