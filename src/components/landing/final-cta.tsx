"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="final-cta" className="relative py-32 md:py-48 overflow-hidden bg-foreground text-background">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-neutral-500 to-transparent" />
      <div className="absolute inset-0 bg-black/20" /> {/* Darken slightly for contrast */}

      <div className="container px-4 mx-auto relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Decorative 'START' behind text */}
          <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[15vw] md:text-[20vw] font-black opacity-5 text-white/20 whitespace-nowrap pointer-events-none select-none">
            START
          </span>

          <h2 className="text-6xl md:text-9xl font-black text-center tracking-tighter leading-[0.85] mb-12 mix-blend-overlay opacity-90">
            CHEGA DE <br />
            <span className="text-primary">DESCULPAS</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl md:text-3xl font-medium text-center max-w-2xl mx-auto mb-16 text-white/70"
        >
          Seu "eu futuro" está implorando para você começar hoje. Não o deixe esperando.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          {/* Button Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-orange-500 to-primary rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500 animate-tilt"></div>

          <Button
            size="lg"
            className="relative h-20 md:h-24 px-12 md:px-20 text-xl md:text-3xl font-black bg-white text-black hover:bg-white/90 rounded-full shadow-2xl transition-all"
          >
            CRIAR CONTA GRÁTIS <ArrowRight className="ml-4 size-6 md:size-8" />
          </Button>
        </motion.div>

        <p className="mt-8 text-sm text-white/40 font-mono tracking-widest uppercase">
          Sem cartão de crédito necessário • Acesso Imediato
        </p>
      </div>
    </section>
  );
}
