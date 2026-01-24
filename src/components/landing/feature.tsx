"use client";

import { motion } from "framer-motion";
import { Zap, Target, BarChart3, Bell, BrainCircuit, Split } from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Insights",
    description: "Our AI analyzes your patterns to predict when you'll slip up and helps you prevent it before it happens.",
    accent: "from-purple-400 to-violet-500",
    glow: "shadow-purple-500/20",
  },
  {
    icon: Split,
    title: "Smart Goal Breaking",
    description: "Overwhelmed by big goals? Our AI automatically breaks them down into tiny, manageable daily tasks.",
    accent: "from-indigo-400 to-blue-500",
    glow: "shadow-indigo-500/20",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "Don't just see where you've been. See where you're going with success probability forecasts.",
    accent: "from-cyan-400 to-blue-500",
    glow: "shadow-cyan-500/20",
  },
  {
    icon: Target,
    title: "Custom Habit Stacks",
    description: "Build powerful routines by chaining habits together. The AI suggests optimal times for each stack.",
    accent: "from-emerald-400 to-green-500",
    glow: "shadow-emerald-500/20",
  },
  {
    icon: Bell,
    title: "Contextual Nudges",
    description: "Get reminders that actually matter, based on your location, time, and current energy levels.",
    accent: "from-amber-400 to-yellow-500",
    glow: "shadow-amber-500/20",
  },
  {
    icon: Zap,
    title: "Gamified Streaks",
    description: "Earn XP and level up your character. Unlock new skins for your AI coach as you progress.",
    accent: "from-orange-400 to-red-500",
    glow: "shadow-orange-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-linear-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -right-60 w-96 h-96 bg-primary/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -left-60 w-96 h-96 bg-accent/8 rounded-full blur-3xl"
        />
      </div>

      <div className="container px-4 mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 backdrop-blur-sm border border-primary/20">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            More Than Just{" "}
            <span className="bg-linear-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Checkboxes
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A complete system designed to rewire your brain for success, powered by advanced behavioral science and AI.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative h-full"
              >
                <div className="relative p-8 rounded-2xl h-full bg-card border border-border hover:border-primary/30 transition-all duration-300 overflow-hidden">
                  {/* Animated gradient background */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.05 }}
                    className={`absolute inset-0 bg-linear-to-br ${feature.accent} pointer-events-none`}
                    suppressHydrationWarning
                  />

                  {/* Icon Container with gradient */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={`relative z-10 size-16 rounded-2xl bg-linear-to-br ${feature.accent} p-0.5 shadow-lg ${feature.glow} mb-6`}
                  >
                    <div className="size-full rounded-2xl bg-card flex items-center justify-center relative overflow-hidden group-hover:bg-transparent transition-colors duration-300">
                      <Icon className="size-8 text-foreground group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />

                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {feature.description}
                    </p>
                  </div>

                  {/* Top accent border on hover */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${feature.accent} origin-left`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}