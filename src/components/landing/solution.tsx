"use client";

import { motion } from "framer-motion";
import { Zap, Brain, Target, Shield } from "lucide-react";
import Image from "next/image";

const benefits = [
  {
    icon: Brain,
    title: "AI Coaching with Customizable Personality",
    description: "Choose from distinct coaching styles that match your personality.",
    accent: "from-purple-400 to-violet-500",
  },
  {
    icon: Zap,
    title: "Personalized Motivation & Feedback",
    description: "Adaptive coaching that evolves with your progress.",
    accent: "from-orange-400 to-amber-500",
  },
  {
    icon: Target,
    title: "Automatic Goal Decomposition",
    description: "Big goals become manageable micro-tasks automatically.",
    accent: "from-emerald-400 to-green-500",
  },
  {
    icon: Shield,
    title: "Real-time Accountability & Tracking",
    description: "24/7 support that keeps you on track without judgment.",
    accent: "from-blue-400 to-indigo-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function Solution() {
  return (
    <section id="solution" className="py-24 md:py-32 bg-linear-to-b from-background via-secondary/15 to-background relative overflow-hidden">
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl"
        />
      </div>

      <div className="container px-4 mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6 backdrop-blur-sm border border-accent/20">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            The Complete Solution
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Meet{" "}
            <span className="bg-linear-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
              Habit Coach AI
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            More than a tracker. A personal coach that adapts to your unique personality and communication style.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left: Image with enhanced visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative group">
              {/* Image frame */}
              <motion.div
                whileHover={{ scale: 1.02, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-10"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-primary/20">
                  <Image
                    src="/hero-dashboard.png"
                    alt="Habit Coach AI Dashboard"
                    width={500}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-primary/20 via-transparent to-transparent" />
                </div>

                {/* Floating accent badge */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 hidden md:block"
                >
                  <div className="bg-white dark:bg-zinc-800/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl border border-primary/20">
                    <p className="text-sm font-bold text-foreground">100% Free</p>
                    <p className="text-xs text-muted-foreground">No credit card needed</p>
                  </div>
                </motion.div>

                {/* Animated corner accent */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-8 -left-8 w-16 h-16 rounded-full border-2 border-primary/30 -z-10"
                />
              </motion.div>

              {/* Background glow */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-3xl rounded-3xl -z-10"
              />
            </div>
          </motion.div>

          {/* Right: Benefits list with animations */}
          <motion.div className="order-1 lg:order-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-muted-foreground mb-10 leading-relaxed"
            >
              Habit Coach AI is more than a tracker. It&apos;s your personal coach that adapts to your unique personality and communication style.
            </motion.p>

            {/* Benefits Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-5 mb-10"
            >
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="group relative"
                  >
                    <div className="flex gap-4 items-start">
                      {/* Icon Container */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className={`relative shrink-0 size-12 rounded-xl bg-linear-to-br ${benefit.accent} p-0.5 shadow-lg shadow-primary/10 mt-1`}
                      >
                        <div className="size-full rounded-xl bg-card flex items-center justify-center relative overflow-hidden group-hover:bg-transparent transition-colors duration-300">
                          <Icon className="size-6 text-foreground group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                        </div>
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <motion.h3
                          whileHover={{ color: "var(--primary)" }}
                          className="font-bold text-base leading-tight mb-1 group-hover:text-primary transition-colors duration-300"
                        >
                          {benefit.title}
                        </motion.h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>

                      {/* Hover accent line */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 h-px w-8 bg-linear-to-r ${benefit.accent} origin-right`}
                      />
                    </div>

                    {/* Background accent on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.05 }}
                      className={`absolute inset-0 -z-10 rounded-lg bg-linear-to-r ${benefit.accent} blur-lg`}
                    />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Closing statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground leading-relaxed border-l-4 border-primary/30 pl-6 py-4 rounded-lg bg-primary/5"
            >
              Whether you need a Drill Sergeant keeping you strict, a Wise Mentor guiding you gently, or a Best Friend cheering you on — we have the personality that matches your coaching style.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
