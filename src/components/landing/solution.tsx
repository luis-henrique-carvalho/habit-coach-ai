"use client";

import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const benefits = [
  "AI coaching with customizable personality",
  "Personalized motivation and feedback",
  "Automatic goal decomposition",
  "Real-time accountability and tracking"
];

export function Solution() {
  return (
    <section id="solution" className="py-24 bg-secondary/30">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Meet Habit Coach AI</h2>
          <p className="text-lg text-muted-foreground">
            The solution that understands you. Personalized, adaptive, and always there when you need support.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative">
              <Image
                src="/hero-dashboard.png"
                alt="Habit Coach AI Dashboard"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl border border-white/20"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-lg text-muted-foreground mb-8">
              Habit Coach AI is more than a tracker. It&apos;s your personal coach that adapts to your unique personality and communication style.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="size-6 text-green-500 shrink-0" />
                  </div>
                  <div>
                    <p className="font-semibold text-base">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mt-8 text-sm">
              Whether you need a Drill Sergeant keeping you strict, a Wise Mentor guiding you gently, or a Best Friend cheering you on, we have the personality that matches your coaching style.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
