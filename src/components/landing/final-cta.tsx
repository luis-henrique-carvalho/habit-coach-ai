"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="final-cta" className="py-24 bg-linear-to-r from-primary/90 to-primary text-primary-foreground">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Build Unstoppable Habits?
          </h2>

          <p className="text-lg md:text-xl mb-12 opacity-90">
            Join hundreds of people building better habits with AI coaching. Start free, no credit card required.
          </p>

          <Button
            size="lg"
            className="h-14 px-10 text-base bg-white text-primary hover:bg-white/90 rounded-full shadow-xl shadow-black/20"
          >
            Start Coaching Now <ArrowRight className="ml-2 size-5" />
          </Button>

          <p className="text-sm mt-6 opacity-75">
            Free forever plan available. Upgrade anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
