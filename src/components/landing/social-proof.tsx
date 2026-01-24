"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote: "I've tried 10+ habit apps. This is the first one that actually keeps me accountable. The AI personality makes all the difference.",
    author: "Sarah Chen",
    role: "Product Manager",
    avatar: "/avatar-wise.png",
    rating: 5
  },
  {
    quote: "The automated goal breakdown feature saved me hours. I went from overwhelmed to taking action in minutes.",
    author: "Marcus Johnson",
    role: "Entrepreneur",
    avatar: "/avatar-robot.png",
    rating: 5
  },
  {
    quote: "Finally built a 60-day streak! The personalized coaching feels like having a real coach in my pocket.",
    author: "Emma Rodriguez",
    role: "Fitness Coach",
    avatar: "/avatar-general.png",
    rating: 5
  }
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

export function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="social-proof" className="py-24 md:py-32 bg-linear-to-b from-background via-secondary/15 to-background relative overflow-hidden">
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.15, 1] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl"
          suppressHydrationWarning
        />
        <motion.div
          animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl"
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
            Loved by Users
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Join Hundreds Building{" "}
            <span className="bg-linear-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
              Unstoppable Habits
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Real people, real results. Discover what our users love about Habit Coach AI.
          </p>
        </motion.div>

        {/* Desktop Grid - 3 columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="hidden md:grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative h-full"
            >
              <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 h-full overflow-hidden">
                {/* Animated gradient background */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.05 }}
                  className="absolute inset-0 bg-linear-to-br from-chart-4 to-chart-2 pointer-events-none"
                  suppressHydrationWarning
                />

                {/* Stars */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-1 mb-4 relative z-10"
                >
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: i * 0.1 + j * 0.05 }}
                      >
                        <Star className="size-4 fill-chart-4 text-chart-4" />
                      </motion.div>
                    ))}
                </motion.div>

                {/* Quote */}
                <p className="text-muted-foreground mb-6 italic text-sm leading-relaxed relative z-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 relative z-10">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover bg-linear-to-br from-primary/20 to-secondary/20"
                  />
                  <div>
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                {/* Top accent border on hover */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-chart-4 to-chart-2 origin-left"
                  suppressHydrationWarning
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative max-w-2xl mx-auto">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative p-8 rounded-2xl bg-card border border-border overflow-hidden"
            >
              {/* Animated gradient background */}
              <motion.div
                animate={{ opacity: [0.03, 0.08, 0.03] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-linear-to-br from-chart-4 to-chart-2 pointer-events-none"
                suppressHydrationWarning
              />

              {/* Stars */}
              <div className="flex gap-1 mb-4 relative z-10">
                {Array(testimonials[currentIndex].rating)
                  .fill(0)
                  .map((_, j) => (
                    <Star
                      key={j}
                      className="size-4 fill-chart-4 text-chart-4"
                    />
                  ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground mb-6 italic text-sm leading-relaxed relative z-10">
                &ldquo;{testimonials[currentIndex].quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 relative z-10">
                <Image
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].author}
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover bg-linear-to-br from-primary/20 to-secondary/20"
                />
                <div>
                  <p className="font-semibold text-sm">{testimonials[currentIndex].author}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="p-2 rounded-full border border-border hover:bg-secondary hover:border-primary/30 transition-all"
              >
                <ChevronLeft className="size-5" />
              </motion.button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    whileHover={{ scale: 1.2 }}
                    className={`rounded-full transition-all ${i === currentIndex
                        ? "bg-primary w-6 h-2"
                        : "bg-border w-2 h-2 hover:bg-primary/50"
                      }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="p-2 rounded-full border border-border hover:bg-secondary hover:border-primary/30 transition-all"
              >
                <ChevronRight className="size-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
