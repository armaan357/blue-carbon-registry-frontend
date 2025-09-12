"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Leaf } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">BlueCarbon</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link
                href="/upload"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Upload Plantation
              </Link>
              <Link
                href="/registry"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Registry
              </Link>
              <Link
                href="/admin"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Admin
              </Link>
              <Link
                href="/wallet"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Wallet
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <Button>Connect Wallet</Button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground hover:text-primary">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                href="/upload"
                className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                Upload Plantation
              </Link>
              <Link
                href="/registry"
                className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                Registry
              </Link>
              <Link
                href="/admin"
                className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                Admin
              </Link>
              <Link
                href="/wallet"
                className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                Wallet
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </Link>
              <div className="px-3 py-2">
                <Button className="w-full">Connect Wallet</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
