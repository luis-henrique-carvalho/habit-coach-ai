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
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      {/* Subtle background gradient - minimal performance impact */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div className="flex-1 text-center lg:text-left">
            {/* Status badge - elegante e simples */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 text-primary text-sm font-semibold mb-8 border border-primary/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-glow-pulse"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Agora disponível para todos
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance leading-tight"
            >
              Pare de falhar.{" "}
              <br className="hidden sm:inline" />
              Seja coaching por{" "}
              <span className="relative inline-block">
                <span className="text-primary">
                  personalidades de IA
                </span>
              </span>
              {" "}que realmente se importam.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 text-balance leading-relaxed"
            >
              Habit Coach AI não é apenas um rastreador. É um Sargento Instrutor, um Mentor Sábio, ou um Melhor Amigo que o mantém responsável 24/7.
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
                  className="h-12 px-8 text-base shadow-lg shadow-primary/25 rounded-full font-semibold bg-primary hover:bg-primary/90 transition-colors"
                >
                  Comece agora <ArrowRight className="ml-2 size-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base rounded-full font-semibold"
                >
                  <Sparkles className="mr-2 size-4" />
                  Ver Demo
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
                <span className="font-medium">Plano gratuito para sempre</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-accent" />
                <span className="font-medium">Sem cartão de crédito</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero image section */}
          <div className="flex-1 relative w-full max-w-150 lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative"
              >
                <Image
                  src="/hero-dashboard.png"
                  alt="App Dashboard"
                  width={800}
                  height={600}
                  className="rounded-2xl shadow-xl border border-primary/15 w-full"
                  priority
                />

                {/* Subtle accent border */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Floating coaching bubble - top right */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -top-8 -right-8 hidden lg:block"
              >
                <div className="bg-card border border-primary/20 p-4 rounded-xl shadow-lg max-w-56 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/avatar-wise.png"
                        alt="Master Yoda"
                        width={32}
                        height={32}
                        className="size-8 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-foreground">Master Yoda</span>
                      <p className="text-xs text-muted-foreground">Mentor Sábio</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "Fazer ou não fazer. Seu streack, impressionante é."
                  </p>
                </div>
              </motion.div>

              {/* Floating coaching bubble - bottom left */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -bottom-10 -left-6 hidden lg:block"
              >
                <div className="bg-card border border-primary/20 p-4 rounded-xl shadow-lg max-w-56 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/avatar-general.png"
                        alt="The General"
                        width={32}
                        height={32}
                        className="size-8 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-foreground">General Strike</span>
                      <p className="text-xs text-muted-foreground">Sargento Instrutor</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "Aquela corrida de 5 da manhã não vai correr sozinha! Vamos!"
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
