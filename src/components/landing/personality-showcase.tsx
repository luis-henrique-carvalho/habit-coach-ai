"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

const personalities = [
  {
    id: "wise",
    name: "Master Yoda",
    role: "The Wise Mentor",
    avatar: "/avatar-wise.png",
    color: "bg-green-100 text-green-700",
    quote: "Patience you must have, my young padawan. Greatness takes time.",
    style: "Inverts sentences, focuses on patience and deep wisdom.",
    sample: "Distracted you were? Hmm. To the path, return. A failure, this is not. A lesson, it is."
  },
  {
    id: "general",
    name: "General Strike",
    role: "The Drill Sergeant",
    avatar: "/avatar-general.png",
    color: "bg-red-100 text-red-700",
    quote: "Excuses don&apos;t burn calories, soldier! Drop and give me 20 minutes of focus!",
    style: "Direct, loud, high-energy, no-nonsense accountability.",
    sample: "I don&apos;t care about your feelings, I care about your RESULTS! You missed yesterday! TODAY WE DOUBLE EFFORT!"
  },
  {
    id: "friend",
    name: "Buddy Bot",
    role: "The Best Friend",
    avatar: "/avatar-robot.png",
    color: "bg-blue-100 text-blue-700",
    quote: "You&apos;re doing amazing! Even small steps count. Let&apos;s do this together!",
    style: "Empathetic, cheerful, uses emojis, focuses on positive reinforcement.",
    sample: "Hey! 👋 I noticed you missed your reading habit. No worries at all! Life happens. 🌟 Want to try just 5 minutes today?"
  }
];

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function PersonalityShowcase() {
  const [activeId, setActiveId] = useState(personalities[0].id);
  const activePersona = personalities.find(p => p.id === activeId)!;

  return (
    <section id="personalities" className="py-24 md:py-32 bg-linear-to-b from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl"
          suppressHydrationWarning
        />
        <motion.div
          animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl"
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
            Personalized Coaching
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Choose Your{" "}
            <span className="bg-linear-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
              Perfect Coach
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Motivation isn&apos;t one-size-fits-all. Select the personality that drives you best.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto">
          {/* List */}
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {personalities.map((persona) => (
              <motion.button
                key={persona.id}
                variants={listItemVariants}
                onClick={() => setActiveId(persona.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-300 border ${
                  activeId === persona.id
                    ? "bg-card shadow-lg border-primary/20 ring-2 ring-primary/20"
                    : "border-border hover:border-primary/20 hover:bg-card/50 opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={persona.avatar} alt={persona.name} width={64} height={64} className="size-16 rounded-2xl bg-secondary object-cover flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{persona.name}</h3>
                  <p className="text-sm text-muted-foreground">{persona.role}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Preview */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-card rounded-3xl p-8 md:p-12 shadow-2xl border border-border overflow-hidden group"
              >
                {/* Animated gradient background */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.03 }}
                  className="absolute inset-0 bg-linear-to-br from-primary to-orange-500 pointer-events-none"
                  suppressHydrationWarning
                />

                <div className={`absolute top-0 right-0 px-4 py-2 rounded-bl-2xl text-sm font-bold ${activePersona.color}`}>
                  {activePersona.role}
                </div>

                <div className="relative z-10 flex flex-col gap-8">
                  {/* Quote */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <Image src={activePersona.avatar} alt={activePersona.name} width={48} height={48} className="size-12 rounded-full flex-shrink-0 object-cover" />
                    <div className="bg-secondary/50 p-4 rounded-2xl rounded-tl-none text-base leading-relaxed backdrop-blur-sm">
                      &quot;{activePersona.sample}&quot;
                    </div>
                  </motion.div>

                  {/* Coaching Style */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="space-y-4 border-t border-border pt-8"
                  >
                    <h4 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">Coaching Style</h4>
                    <p className="text-lg font-medium text-foreground leading-relaxed">{activePersona.style}</p>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="flex justify-end pt-4"
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="rounded-full bg-linear-to-r from-primary to-orange-500 hover:from-primary hover:to-orange-600 font-semibold shadow-lg">
                        Chat with {activePersona.name} <MessageCircle className="ml-2 size-4" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}