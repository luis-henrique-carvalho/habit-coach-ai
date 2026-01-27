"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Zap, Shield, Heart } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const personalities = [
  {
    id: "wise",
    name: "Master Yoda",
    role: "The Wise Mentor",
    icon: Shield,
    avatar: "/avatar-wise.png",
    // Mentor Style: Glass, Smooth, Organic
    containerClass: "bg-card/60 backdrop-blur-xl border-white/10 rounded-[2.5rem]",
    buttonClass: "rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80",
    quote: "Patience you must have. Greatness, time it takes.",
    style: "Inverts sentences • Deep Wisdom • Calm Authority",
    sample: "Distracted you were? Hmm. A failure, this is not. A lesson, it is. To the path, return.",
    accent: "text-accent" // Use tema accent
  },
  {
    id: "general",
    name: "General Strike",
    role: "The Drill Sergeant",
    icon: Zap,
    avatar: "/avatar-general.png",
    // Sergeant Style: Brutalist, Sharp, High Contrast
    containerClass: "bg-primary text-primary-foreground border-4 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    buttonClass: "rounded-none uppercase font-black bg-black text-white hover:bg-black/80 border-2 border-white",
    quote: "EXCUSES DON'T BURN CALORIES! DROP AND GIVE ME FOCUS!",
    style: "LOUD • DIRECT • HIGH ENERGY • NO NONSENSE",
    sample: "I don't care about your feelings! I care about RESULTS! You missed yesterday? TODAY WE DOUBLE EFFORT!",
    accent: "text-primary" // Use tema primary
  },
  {
    id: "friend",
    name: "Buddy Bot",
    role: "The Best Friend",
    icon: Heart,
    avatar: "/avatar-robot.png",
    // Friend Style: Soft, Bouncy, Friendly
    containerClass: "bg-secondary text-secondary-foreground border-2 border-secondary rounded-3xl shadow-xl",
    buttonClass: "rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1",
    quote: "You're doing amazing! Even small steps count! 🌟",
    style: "Empathetic • Cheerful • Supportive • Emojis",
    sample: "Hey! 👋 I noticed you missed your reading habit. No worries at all! Life happens. Want to try just 5 mins today?",
    accent: "text-secondary" // Use tema secondary
  }
];

export function PersonalityShowcase() {
  const [activeId, setActiveId] = useState(personalities[0].id);
  const activePersona = personalities.find(p => p.id === activeId)!;

  return (
    <section id="personalities" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">

          {/* Selector Side */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
                Choose Your <br />
                <span className="text-primary">Voice.</span>
              </h2>
              <p className="text-xl text-muted-foreground font-medium">
                Motivation isn&apos;t generic. Select the psychological trigger that works for YOU.
              </p>
            </motion.div>

            <div className="space-y-4">
              {personalities.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => setActiveId(persona.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 group",
                    activeId === persona.id
                      ? "border-primary bg-primary/5 scale-105 shadow-lg"
                      : "border-border hover:border-primary/50 hover:bg-secondary/50"
                  )}
                >
                  <div className={cn(
                    "size-14 rounded-xl flex items-center justify-center transition-colors",
                    activeId === persona.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground group-hover:text-primary"
                  )}>
                    <persona.icon className="size-7" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-bold text-lg leading-none mb-1",
                      activeId === persona.id ? "text-primary" : "text-foreground"
                    )}>
                      {persona.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      {persona.role}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Visualization Side */}
          <div className="lg:col-span-7 h-150 flex items-center justify-center relative perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, rotateY: -10, scale: 0.9 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 10, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={cn(
                  "w-full max-w-lg p-8 md:p-12 relative overflow-hidden flex flex-col gap-6",
                  activePersona.containerClass
                )}
              >
                {/* Visual Header */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Image
                      src={activePersona.avatar}
                      alt={activePersona.name}
                      width={80}
                      height={80}
                      className={cn(
                        "size-20 object-cover",
                        activeId === 'wise' ? "rounded-full" :
                          activeId === 'general' ? "rounded-none border-2 border-black" :
                            "rounded-2xl"
                      )}
                    />
                    {activeId === 'friend' && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 size-6 rounded-full border-4 border-white" />
                    )}
                  </div>
                  <div>
                    <h3 className={cn("text-2xl font-black", activeId === "general" ? "uppercase tracking-widest" : "tracking-tight")}>
                      {activePersona.name}
                    </h3>
                    <p className={cn("font-medium opacity-80", activeId === "general" && "uppercase text-xs tracking-widest")}>
                      {activePersona.role}
                    </p>
                  </div>
                </div>

                {/* Chat Message Simulation */}
                <div className={cn(
                  "p-6 relative mt-4",
                  activeId === 'wise' ? "bg-white/5 rounded-2xl italic font-serif leading-loose" :
                    activeId === 'general' ? "bg-black text-green-500 font-mono text-sm uppercase p-4 border border-green-500/50" :
                      "bg-blue-50/50 rounded-2xl rounded-tl-sm text-zinc-700"
                )}>
                  {activeId === 'general' && <span className="block mb-2 text-[10px] text-green-700">Warning: High Intensity</span>}
                  &quot;{activePersona.sample}&quot;
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold opacity-50 uppercase tracking-widest">Style Analysis</p>
                  <p className="font-semibold">{activePersona.style}</p>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button size="lg" className={cn("font-bold text-md px-8", activePersona.buttonClass)}>
                    Select Coach <MessageCircle className="ml-2 size-5" />
                  </Button>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Background Blob for atmosphere */}
            <div className={cn(
              "absolute inset-0 -z-10 blur-[100px] transition-colors duration-700 opacity-30",
              activeId === 'wise' ? "bg-emerald-500/30" :
                activeId === 'general' ? "bg-red-600/40" :
                  "bg-blue-400/30"
            )} />
          </div>

        </div>
      </div>
    </section>
  );
}
