"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80%] sm:w-[350px]">
        <div className="flex flex-col gap-6 mt-8">
          <Link href="/" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/states" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            States
          </Link>
          <Link href="/about" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/admin/upload" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            Upload Data
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

