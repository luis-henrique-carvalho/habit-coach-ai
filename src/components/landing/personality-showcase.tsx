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

export function PersonalityShowcase() {
  const [activeId, setActiveId] = useState(personalities[0].id);
  const activePersona = personalities.find(p => p.id === activeId)!;

  return (
    <section id="personalities" className="py-24 bg-secondary/30 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Choose Your Coach</h2>
          <p className="text-lg text-muted-foreground">
            Motivation isn&apos;t one-size-fits-all. Select the personality that drives you best.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {personalities.map((persona) => (
              <button
                key={persona.id}
                onClick={() => setActiveId(persona.id)}
                className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 border ${
                  activeId === persona.id 
                    ? "bg-white dark:bg-zinc-800 shadow-lg border-primary/20 scale-105" 
                    : "hover:bg-white/50 border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={persona.avatar} alt={persona.name} width={64} height={64} className="size-16 rounded-2xl bg-secondary object-cover" />
                <div>
                  <h3 className="font-bold text-lg">{persona.name}</h3>
                  <p className="text-sm text-muted-foreground">{persona.role}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-16 shadow-2xl border border-border"
              >
                <div className={`absolute top-0 right-0 p-4 rounded-bl-3xl rounded-tr-3xl text-sm font-bold ${activePersona.color}`}>
                  {activePersona.role}
                </div>

                <div className="flex flex-col gap-8">
                  <div className="flex gap-4 items-start">
                     <Image src={activePersona.avatar} alt={activePersona.name} width={48} height={48} className="size-12 rounded-full" />
                     <div className="bg-secondary p-4 rounded-2xl rounded-tl-none text-lg leading-relaxed">
                        &quot;{activePersona.sample}&quot;
                     </div>
                  </div>
                  
                  <div className="space-y-4 border-t pt-8">
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Coaching Style</h4>
                    <p className="text-xl font-medium">{activePersona.style}</p>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button size="lg" className="rounded-full">
                       Chat with {activePersona.name} <MessageCircle className="ml-2 size-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}