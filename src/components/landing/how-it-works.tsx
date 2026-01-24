"use client";

import { motion } from "framer-motion";
import { UserPlus, Users, Target, Sparkles } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    number: 1,
    title: "Register for Free",
    description: "Sign up with email. No credit card required. Get instant access.",
    icon: UserPlus,
    accent: "from-orange-400 to-amber-500",
    glow: "shadow-orange-500/20",
  },
  {
    number: 2,
    title: "Choose Your Coach",
    description: "Pick from Yoda's wisdom, the General's discipline, or a supportive Friend.",
    icon: Users,
    accent: "from-emerald-400 to-green-500",
    glow: "shadow-emerald-500/20",
    showAvatars: true,
  },
  {
    number: 3,
    title: "Create Habits & Goals",
    description: "Define what you want to achieve. Daily, weekly, or custom schedules.",
    icon: Target,
    accent: "from-blue-400 to-indigo-500",
    glow: "shadow-blue-500/20",
  },
  {
    number: 4,
    title: "Get Personalized Coaching",
    description: "Receive tailored AI feedback that adapts to your progress and style.",
    icon: Sparkles,
    accent: "from-violet-400 to-purple-500",
    glow: "shadow-violet-500/20",
  },
];

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

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.3,
    },
  },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-linear-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            Simple Setup
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Your Journey to{" "}
            <span className="bg-linear-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
              Better Habits
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            From signup to your first personalized coaching message in under 5 minutes.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Desktop Layout */}
          <div className="hidden lg:block relative">
            {/* Connecting Path */}
            <div className="absolute top-24 left-[12.5%] right-[12.5%] h-1 z-0">
              <motion.div
                variants={lineVariants}
                className="h-full bg-linear-to-r from-primary/40 via-accent/40 to-primary/40 rounded-full origin-left"
              />
              {/* Animated dots on the line */}
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -translate-y-1/2 size-2 rounded-full bg-primary shadow-lg shadow-primary/50"
              />
            </div>

            <div className="grid grid-cols-4 gap-6">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="relative group"
                  >
                    {/* Step Card */}
                    <div className="flex flex-col items-center text-center">
                      {/* Icon Container */}
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className={`relative z-10 mb-8 size-20 rounded-2xl bg-linear-to-br ${step.accent} p-0.5 shadow-xl ${step.glow}`}
                      >
                        <div className="size-full rounded-2xl bg-background flex items-center justify-center relative overflow-hidden group-hover:bg-transparent transition-colors duration-300">
                          <Icon className={`size-8 text-foreground group-hover:text-white transition-colors duration-300`} strokeWidth={1.5} />

                          {/* Shimmer effect */}
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                        </div>

                        {/* Step number badge */}
                        <div className="absolute -top-2 -right-2 size-7 rounded-full bg-foreground text-background text-sm font-bold flex items-center justify-center shadow-lg">
                          {step.number}
                        </div>
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-50">
                        {step.description}
                      </p>

                      {/* Coach avatars for step 2 */}
                      {step.showAvatars && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 }}
                          className="flex -space-x-3 mt-6"
                        >
                          {["/avatar-wise.png", "/avatar-general.png", "/avatar-robot.png"].map((src) => (
                            <motion.div
                              key={src}
                              whileHover={{ scale: 1.2, zIndex: 10 }}
                              className="relative"
                            >
                              <Image
                                src={src}
                                alt="Coach avatar"
                                width={40}
                                height={40}
                                className="size-10 rounded-full border-2 border-background shadow-lg object-cover bg-secondary"
                              />
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet Layout - Vertical Timeline */}
          <div className="lg:hidden space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;

              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="relative flex gap-6 group"
                >
                  {/* Timeline line & dot */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`relative z-10 size-14 rounded-xl bg-linear-to-br ${step.accent} p-0.5 shadow-lg ${step.glow}`}
                    >
                      <div className="size-full rounded-xl bg-background flex items-center justify-center">
                        <Icon className="size-6" strokeWidth={1.5} />
                      </div>
                      <div className="absolute -top-1 -right-1 size-5 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">
                        {step.number}
                      </div>
                    </motion.div>

                    {!isLast && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-0.5 flex-1 min-h-16 bg-linear-to-b from-border to-transparent origin-top"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`pb-12 ${isLast ? "pb-0" : ""}`}>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {step.showAvatars && (
                      <div className="flex -space-x-2 mt-4">
                        {["/avatar-wise.png", "/avatar-general.png", "/avatar-robot.png"].map((src) => (
                          <Image
                            key={src}
                            src={src}
                            alt="Coach avatar"
                            width={32}
                            height={32}
                            className="size-8 rounded-full border-2 border-background shadow-md object-cover bg-secondary"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
