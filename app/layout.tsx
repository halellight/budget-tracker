import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Nigerian Budget Tracker",
  description: "Track budget spending across Nigerian states",
  metadataBase: new URL("https://ngtrak.netlify.app"),
  openGraph: {
    title: "Nigerian Budget Tracker",
    description: "Track budget spending across Nigerian states",
    url: "https://ngtrak.netlify.app",
    siteName: "Nigerian Budget Tracker",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/eaca33e9-e2ce-45cc-9ce1-a0cee4db9cb5.png?token=3c4CPi2s7blESZllXtFUI96bPacl8Ubi7cf_xWFJGis&height=458&width=1200&expires=33278934701",
        width: 1200,
        height: 630,
        alt: "Nigerian Budget Tracker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nigerian Budget Tracker",
    description: "Track budget spending across Nigerian states",
    images: [
      "https://opengraph.b-cdn.net/production/images/eaca33e9-e2ce-45cc-9ce1-a0cee4db9cb5.png?token=3c4CPi2s7blESZllXtFUI96bPacl8Ubi7cf_xWFJGis&height=458&width=1200&expires=33278934701",
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable}`}>
      <body className="font-sans bg-background text-foreground min-h-screen flex flex-col">
        <header className="border-b border-border">
          <nav className="container mx-auto px-4 py-4">
            <SiteHeader />
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
                <p className="text-muted-foreground">praiseibec@gmail.com</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

