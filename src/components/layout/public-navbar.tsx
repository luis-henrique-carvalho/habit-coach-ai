"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export function PublicNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-outline/95 backdrop-blur-sm border-b border-border">
      <div className="container px-4 mx-auto h-16 flex items-center justify-between">
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

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-sm font-medium">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="default" size="sm" className="text-sm font-medium">
              Sign Up
            </Button>
          </Link>
        </div>

        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
          <SheetTrigger
            className="md:hidden hover:bg-accent rounded-md transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="" />
          </SheetTrigger>

          <SheetContent side="right" className="data-[state=open]:slide-in-from-top-0">
            <SheetHeader>
              <SheetTitle className="text-lg">Habit Coach AI</SheetTitle>
            </SheetHeader>

            <div className="no-scrollbar overflow-y-auto">
              <div className="space-y-2 py-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <a
                      href={link.href}
                      className="block px-4 py-2 rounded-md text-foreground hover:bg-accent transition-colors font-medium"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </div>
            </div>

            <SheetFooter className="flex flex-col gap-3 border-t border-border pt-4">
              <SheetClose asChild>
                <Link href="/login" className="block w-full">
                  <Button variant="ghost" className="w-full">
                    Sign In
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/register" className="block w-full">
                  <Button variant="default" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
