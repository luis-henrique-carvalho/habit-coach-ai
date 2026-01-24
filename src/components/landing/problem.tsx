"use client";

import { motion } from "framer-motion";
import { AlertCircle, TrendingDown, Clock, Users } from "lucide-react";

const problems = [
  {
    icon: AlertCircle,
    title: "Lack of Consistency & Motivation",
    description: "You start with enthusiasm, but motivation fades. Without personalized support, maintaining habits becomes an uphill battle.",
    accent: "from-red-400 to-pink-500",
    glow: "shadow-red-500/20",
  },
  {
    icon: TrendingDown,
    title: "No Personalized Feedback",
    description: "Generic habit trackers don't understand you. You need coaching that adapts to your personality, not the other way around.",
    accent: "from-orange-400 to-amber-500",
    glow: "shadow-orange-500/20",
  },
  {
    icon: Clock,
    title: "Overwhelming Goal-Setting",
    description: "Big goals feel impossible to tackle. Breaking them down into actionable steps is exhausting and confusing.",
    accent: "from-yellow-400 to-orange-500",
    glow: "shadow-yellow-500/20",
  },
  {
    icon: Users,
    title: "Lack of Accountability",
    description: "Going it alone is hard. Without someone checking in on your progress, it's easy to lose focus and give up.",
    accent: "from-rose-400 to-red-500",
    glow: "shadow-rose-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function Problem() {
  return (
    <section id="problem" className="py-24 md:py-32 bg-linear-to-b from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-destructive/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-semibold mb-6 backdrop-blur-sm border border-destructive/20">
            <span className="size-1.5 rounded-full bg-destructive animate-pulse" />
            The Real Obstacles
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            What&apos;s{" "}
            <span className="bg-linear-to-r from-destructive via-red-500 to-orange-500 bg-clip-text text-transparent">
              Holding You Back?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Building habits is hard. You&apos;re not alone in struggling with these challenges.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative h-full"
              >
                <div className="relative p-8 rounded-2xl h-full bg-card border border-border hover:border-destructive/30 transition-all duration-300 overflow-hidden">
                  {/* Animated gradient background on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.05 }}
                    className={`absolute inset-0 bg-linear-to-br ${problem.accent} pointer-events-none`}
                    suppressHydrationWarning
                  />

                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={`relative z-10 size-14 rounded-2xl bg-linear-to-br ${problem.accent} p-0.5 shadow-lg ${problem.glow} mb-6`}
                  >
                    <div className="size-full rounded-2xl bg-card flex items-center justify-center relative overflow-hidden group-hover:bg-transparent transition-colors duration-300">
                      <Icon className="size-7 text-foreground group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />

                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-3 group-hover:text-destructive transition-colors duration-300">
                      {problem.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {problem.description}
                    </p>
                  </div>

                  {/* Bottom accent line on hover */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${problem.accent} origin-left`}
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
