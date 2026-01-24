"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-linear-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          suppressHydrationWarning
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          suppressHydrationWarning
        />
      </div>

      <div className="container px-4 mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 backdrop-blur-sm border border-primary/20">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            Simple Pricing
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Invest in Your{" "}
            <span className="bg-linear-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
              Future Self
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Start for free, upgrade for superpower accountability and advanced features.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Free Plan */}
          <motion.div
            variants={itemVariants}
            className="group relative h-full"
          >
            <div className="relative p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 flex flex-col h-full overflow-hidden">
              {/* Animated gradient background */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.05 }}
                className="absolute inset-0 bg-linear-to-br from-emerald-400 to-green-500 pointer-events-none"
                suppressHydrationWarning
              />

              <div className="relative z-10 mb-8">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="text-5xl font-bold mb-2">$0</div>
                <p className="text-muted-foreground">Perfect for building your first solid habits.</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1 relative z-10">
                {["3 Active Habits", "1 Active Goal", "1 AI Personality (Random)", "Basic Dashboard"].map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full p-1 flex-shrink-0">
                      <Check size={16} />
                    </div>
                    <span className="group-hover:text-foreground transition-colors">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-400 to-green-500 origin-left"
                suppressHydrationWarning
              />

              <Button variant="outline" size="lg" className="w-full rounded-full h-12 relative z-10">
                Start for Free
              </Button>
            </div>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            variants={itemVariants}
            className="group relative h-full"
          >
            <div className="relative p-8 rounded-3xl bg-primary text-primary-foreground flex flex-col h-full shadow-2xl shadow-primary/30 overflow-hidden">
              {/* Most popular badge with animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute top-0 right-0 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-bl-2xl flex items-center gap-2 border border-white/20"
              >
                <Zap className="size-3" />
                MOST POPULAR
              </motion.div>

              {/* Animated gradient background */}
              <motion.div
                animate={{ opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-linear-to-br from-white/10 to-white/5"
                suppressHydrationWarning
              />

              <div className="relative z-10 mb-8">
                <h3 className="text-2xl font-bold mb-2">Pro Coach</h3>
                <div className="text-5xl font-bold mb-2">R$ 29,90<span className="text-lg font-normal opacity-80">/mo</span></div>
                <p className="opacity-90">For serious achievers who need results.</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1 relative z-10">
                {["Unlimited Habits & Goals", "Access to ALL AI Personalities", "Smart Goal Breakdown (MCP)", "Predictive Analytics", "Priority Support"].map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="bg-white/20 text-white rounded-full p-1 flex-shrink-0">
                      <Check size={16} />
                    </div>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
                <Button variant="secondary" size="lg" className="w-full rounded-full h-12 font-bold text-primary hover:bg-white/95">
                  Get Pro Access
                </Button>
              </motion.div>

              {/* Animated corner decorations */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                suppressHydrationWarning
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}