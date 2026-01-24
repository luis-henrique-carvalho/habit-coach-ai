"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Now available for everyone
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
                Stop failing. <br />
                Get coached by{" "}
                <span className="text-gradient">AI personalities</span> that
                actually care.
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 text-balance">
                Habit Coach AI isn&apos;t just a tracker. It&apos;s a Drill Sergeant, a
                Wise Mentor, or a Best Friend that keeps you accountable 24/7.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base shadow-xl shadow-primary/20 rounded-full"
                >
                  Start Coaching Now <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base rounded-full"
                >
                  View Demo
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  <span>Free Forever Plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 relative w-full max-w-150 lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10"
            >
              <Image
                src="/hero-dashboard.png"
                alt="App Dashboard"
                width={800}
                height={600}
                className="rounded-3xl shadow-2xl border border-white/20 w-full hover:scale-105 transition-transform duration-500"
              />

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-10 -right-10 bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-xl border border-white/10 max-w-50 hidden md:block"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src="/avatar-wise.png"
                    alt="Master Yoda"
                    width={32}
                    height={32}
                    className="size-8 rounded-full bg-green-100"
                  />
                  <span className="font-bold text-xs text-green-600">
                    Master Yoda
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  &quot;Do or do not. There is no try. Your streak, impressive it
                  is.&quot;
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-12 -left-8 bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-xl border border-white/10 max-w-55 hidden md:block"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src="/avatar-general.png"
                    alt="The General"
                    width={32}
                    height={32}
                    className="size-8 rounded-full bg-red-100"
                  />
                  <span className="font-bold text-xs text-red-600">
                    The General
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  &quot;Get up soldier! That 5am run isn&apos;t going to run itself! Move
                  it!&quot;
                </p>
              </motion.div>
            </motion.div>

            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
