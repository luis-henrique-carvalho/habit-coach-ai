"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="final-cta" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/90 to-primary" />

      {/* Animated background decorations */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"
        suppressHydrationWarning
      />
      <motion.div
        animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"
        suppressHydrationWarning
      />

      <div className="container px-4 mx-auto relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Animated heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-6xl font-bold mb-6 text-primary-foreground"
          >
            Ready to Build{" "}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative inline-block"
            >
              <span className="text-white">Unstoppable Habits?</span>
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-white/40 blur-sm"
                suppressHydrationWarning
              />
            </motion.span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl mb-12 opacity-90 text-primary-foreground/90"
          >
            Join hundreds of people building better habits with AI coaching. Start free, no credit card required.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="h-14 px-10 text-base bg-white text-primary hover:bg-white/90 rounded-full shadow-2xl shadow-black/30 font-semibold"
            >
              Start Coaching Now <ArrowRight className="ml-2 size-5" />
            </Button>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <div className="flex items-center gap-2 text-sm opacity-90 text-primary-foreground">
              <CheckCircle2 className="size-4" />
              Free forever plan
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2 text-sm opacity-90 text-primary-foreground">
              <CheckCircle2 className="size-4" />
              Upgrade anytime
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
