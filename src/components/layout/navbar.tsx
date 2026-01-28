"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

/**
 * Navigation links for the public navbar
 * Uses anchor-based navigation for landing page sections
 */
const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

/**
 * Public Navigation Bar Component
 *
 * Features:
 * - Sticky positioning at the top of the viewport
 * - Desktop: Horizontal layout with all navigation links and auth buttons
 * - Mobile (< 768px): Hamburger menu with drawer
 * - Uses anchor navigation for landing page sections
 * - Responsive design with Tailwind CSS
 * - Theme colors from design system (Signal Orange primary)
 */
export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container px-4 mx-auto h-16 flex items-center justify-between">
        {/* Logo / Branding - Left */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 group"
          aria-label="Habit Coach AI - Home"
        >
          <div className="size-8 rounded-sm bg-primary border-2 border-primary group-hover:bg-primary/90 transition-colors" />
          <span className="font-bold text-sm uppercase tracking-widest hidden sm:inline text-foreground">
            Habit Coach AI
          </span>
        </Link>

        {/* Desktop Navigation - Center (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Auth Buttons - Right (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-medium"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button
              variant="default"
              size="sm"
              className="text-sm font-medium"
            >
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Menu - Right (visible only on mobile) */}
        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
          <SheetTrigger
            className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>

          <SheetContent side="right" className="flex flex-col">
            {/* Mobile Navigation Links */}
            <div className="mt-8 flex flex-col space-y-4 flex-1">
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setDrawerOpen(false)}
                    className="block px-4 py-2 rounded-md text-foreground hover:bg-accent transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="space-y-3 border-t border-border pt-4">
              <Link href="/login" className="block w-full" onClick={() => setDrawerOpen(false)}>
                <Button variant="ghost" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/register" className="block w-full" onClick={() => setDrawerOpen(false)}>
                <Button variant="default" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
