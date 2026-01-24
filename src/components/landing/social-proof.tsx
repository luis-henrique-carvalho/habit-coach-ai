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
    avatar: "/avatar-friend.png",
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

export function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="social-proof" className="py-24 bg-secondary/30">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Loved by Our Users</h2>
          <p className="text-lg text-muted-foreground">
            Join hundreds of people building unstoppable habits with Habit Coach AI.
          </p>
        </div>

        {/* Desktop Grid - 3 columns */}
        <div className="hidden md:grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array(testimonial.rating)
                  .fill(0)
                  .map((_, j) => (
                    <Star
                      key={j}
                      className="size-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
              </div>

              <p className="text-muted-foreground mb-6 italic text-sm leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover bg-linear-to-br from-primary/20 to-secondary/20"
                />
                <div>
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative max-w-2xl mx-auto">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-2xl bg-card border border-border"
            >
              <div className="flex gap-1 mb-4">
                {Array(testimonials[currentIndex].rating)
                  .fill(0)
                  .map((_, j) => (
                    <Star
                      key={j}
                      className="size-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
              </div>

              <p className="text-muted-foreground mb-6 italic text-sm leading-relaxed">
                &ldquo;{testimonials[currentIndex].quote}&rdquo;
              </p>

              <div className="flex items-center gap-4">
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
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="size-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`size-2 rounded-full transition-all ${
                      i === currentIndex ? "bg-primary w-6" : "bg-border"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
