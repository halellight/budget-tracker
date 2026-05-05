import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: {
    default: "ngtrak. — Nigerian State Budget Tracker",
    template: "%s | ngtrak.",
  },
  description:
    "Explore transparent, data-driven budget allocations for all 36 Nigerian states and FCT. Track government spending, sector allocations, and revenue sources.",
  keywords: ["Nigeria", "budget", "state budget", "government spending", "fiscal transparency", "FAAC", "IGR"],
  authors: [{ name: "ngtrak." }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    title: "ngtrak. — Nigerian State Budget Tracker",
    description: "Transparent budget data for all 36 Nigerian states and FCT",
    siteName: "ngtrak.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ngtrak.",
    description: "Transparent budget data for all 36 Nigerian states and FCT",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-background text-foreground min-h-screen flex flex-col antialiased selection:bg-primary selection:text-primary-foreground">

        {/* Header - Solid, Sharp Border */}
        <header className="sticky top-0 z-30 bg-background border-b border-border">
          <nav className="container mx-auto px-4 sm:px-6 py-4">
            <SiteHeader />
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer - Minimalist, Stark */}
        <footer className="border-t border-border mt-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">

              {/* Brand & Mission */}
              <div className="md:col-span-5">
                <Link href="/" className="inline-block font-bold text-xl tracking-tight mb-4 hover:text-primary transition-colors">
                  ngtrak<span className="text-primary">.</span>
                </Link>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                  Empowering Nigerians with transparent, accessible budget data for all 36 states and the FCT. 
                  Data sourced strictly from official state budget documents, open treasury, and OAGF.
                </p>
              </div>

              {/* Quick Links */}
              <div className="md:col-span-3 md:col-start-7">
                <h4 className="text-xs font-bold text-foreground mb-4 uppercase tracking-widest text-primary">Explore</h4>
                <ul className="space-y-3 text-sm">
                  {[
                    { href: "/states", label: "All States" },
                    { href: "/compare", label: "Compare States" },
                    { href: "/about", label: "About Us" },
                    { href: "/admin/upload", label: "Contribute Data" },
                  ].map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} className="text-muted-foreground hover:text-foreground transition-colors inline-block">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Regions */}
              <div className="md:col-span-3">
                <h4 className="text-xs font-bold text-foreground mb-4 uppercase tracking-widest text-primary">Regions</h4>
                <ul className="space-y-3 text-sm">
                  {["South-West", "South-East", "South-South", "North-West", "North-East", "North-Central"].map((r) => (
                    <li key={r}>
                      <Link
                        href={`/states?region=${encodeURIComponent(r)}`}
                        className="text-muted-foreground hover:text-foreground transition-colors inline-block"
                      >
                        {r}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} ngtrak. Data for the public.
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors">Twitter (X)</a>
                <a href="#" className="hover:text-primary transition-colors">GitHub</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
