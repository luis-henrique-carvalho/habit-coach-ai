"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Image from "next/image";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-linear-to-b from-background via-transparent to-background">
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container px-4 mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div className="flex-1 text-center lg:text-left z-10">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 backdrop-blur-sm border border-primary/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Now available for everyone
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance leading-tight"
            >
              Stop failing.{" "}
              <br className="hidden sm:inline" />
              Get coached by{" "}
              <span className="relative inline-block">
                <span className="bg-linear-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
                  AI personalities
                </span>
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-primary via-orange-500 to-amber-500 blur-sm"
                />
              </span>
              {" "}that actually care.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 text-balance leading-relaxed"
            >
              Habit Coach AI isn&apos;t just a tracker. It&apos;s a Drill Sergeant, a
              Wise Mentor, or a Best Friend that keeps you accountable 24/7.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="h-12 px-8 text-base shadow-xl shadow-primary/30 rounded-full font-semibold bg-linear-to-r from-primary to-orange-500 hover:from-primary hover:to-orange-600"
                >
                  Start Coaching Now <ArrowRight className="ml-2 size-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base rounded-full font-semibold hover:bg-secondary"
                >
                  <Sparkles className="mr-2 size-4" />
                  View Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-accent" />
                <span className="font-medium">Free Forever Plan</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-accent" />
                <span className="font-medium">No credit card required</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero image section */}
          <div className="flex-1 relative w-full max-w-150 lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative z-10"
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative"
                suppressHydrationWarning
              >
                <Image
                  src="/hero-dashboard.png"
                  alt="App Dashboard"
                  width={800}
                  height={600}
                  className="rounded-3xl shadow-2xl border border-primary/20 w-full"
                  priority
                />

                {/* Gradient overlay frame */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-t from-primary/20 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Floating coaching bubbles */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -right-8 hidden md:block"
              >
                <div className="bg-white dark:bg-zinc-800/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-primary/20 max-w-56">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="size-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0"
                    >
                      <Image
                        src="/avatar-wise.png"
                        alt="Master Yoda"
                        width={32}
                        height={32}
                        className="size-8 rounded-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <span className="font-bold text-sm text-foreground">Master Yoda</span>
                      <p className="text-xs text-muted-foreground">Wise Mentor</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    &quot;Do or do not. Your streak, impressive it is.&quot;
                  </p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-10 -left-6 hidden md:block"
              >
                <div className="bg-white dark:bg-zinc-800/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-primary/20 max-w-56">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="size-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0"
                    >
                      <Image
                        src="/avatar-general.png"
                        alt="The General"
                        width={32}
                        height={32}
                        className="size-8 rounded-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <span className="font-bold text-sm text-foreground">General Strike</span>
                      <p className="text-xs text-muted-foreground">Drill Sergeant</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    &quot;That 5am run won&apos;t run itself! Move it!&quot;
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Animated background blur */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary/15 blur-[120px] rounded-full -z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
