"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle2, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote: "I've tried 10+ habit apps. This is the first one that actually keeps me accountable. The AI personality makes all the difference.",
    author: "Sarah Chen",
    role: "Product Manager",
    avatar: "/avatar-wise.png",
    rating: 5,
    highlight: "Accountability",
    offset: 0
  },
  {
    quote: "The automated goal breakdown feature saved me hours. I went from overwhelmed to taking action in minutes.",
    author: "Marcus Johnson",
    role: "Entrepreneur",
    avatar: "/avatar-robot.png",
    rating: 5,
    highlight: "Clarity",
    offset: 40 // Push this one down
  },
  {
    quote: "Finally built a 60-day streak! The personalized coaching feels like having a real coach in my pocket.",
    author: "Emma Rodriguez",
    role: "Fitness Coach",
    avatar: "/avatar-general.png",
    rating: 5,
    highlight: "Consistency",
    offset: 0
  }
];

export function SocialProof() {
  return (
    <section id="social-proof" className="py-32 bg-background relative overflow-hidden">
      {/* Massive Background Typography */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none opacity-[0.03] select-none text-center">
        <span className="text-[15vw] font-black tracking-tighter text-foreground whitespace-nowrap">
          RESULTS
        </span>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="size-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-[10px] font-bold">
                  User
                </div>
              ))}
            </div>
            <span className="text-sm font-semibold text-muted-foreground ml-2">Trusted by 5,000+ early adopters</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
            Real People. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              Unstoppable Habits.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative group ${i === 1 ? 'md:mt-24' : ''}`}
            >
              <div className="relative p-8 md:p-10 rounded-4xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5">
                {/* Quote Icon Background */}
                <Quote className="absolute top-8 right-8 size-12 text-primary/10 fill-primary/10" />

                <div className="flex gap-1 mb-6">
                  {Array(5).fill(0).map((_, j) => (
                    <Star key={j} className="size-4 fill-primary text-primary" />
                  ))}
                </div>

                <div className="mb-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-background border border-border text-xs font-bold uppercase tracking-wider mb-4 text-primary">
                    {t.highlight}
                  </span>
                  <p className="text-lg md:text-xl font-medium leading-relaxed text-foreground">
                    &quot;{t.quote}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                  <div className="relative">
                    <Image
                      src={t.avatar}
                      alt={t.author}
                      width={48}
                      height={48}
                      className="size-12 rounded-xl object-cover bg-background"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                      <CheckCircle2 className="size-4 text-primary fill-background" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-base leading-none mb-1">{t.author}</h4>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
