"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-secondary/4 via-transparent to-primary/4 pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <span className="size-1.5 rounded-full bg-primary animate-glow-pulse" />
            Preços Simples
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Invista no seu{" "}
            <span className="text-primary">
              eu futuro
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Comece gratuitamente, atualize para responsabilidade e recursos avançados.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Free Plan */}
          <motion.div
            variants={itemVariants}
            className="group relative h-full"
          >
            <div className="relative p-8 rounded-xl bg-card border border-border/50 hover:border-primary/15 transition-all duration-300 flex flex-col h-full overflow-hidden">
              {/* Subtle background */}
              <div className="absolute inset-0 bg-accent/5 pointer-events-none" />

              <div className="relative z-10 mb-8">
                <h3 className="text-2xl font-bold mb-2">Iniciante</h3>
                <div className="text-5xl font-bold mb-2">R$ 0</div>
                <p className="text-muted-foreground text-sm">Perfeito para construir seus primeiros hábitos sólidos.</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1 relative z-10">
                {["3 Hábitos Ativos", "1 Meta Ativa", "1 Personalidade de IA (Aleatória)", "Dashboard Básico"].map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="bg-accent/15 text-accent rounded-full p-1.5 flex-shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <Button variant="outline" size="lg" className="w-full rounded-lg h-11 relative z-10 font-medium">
                Comece Gratuitamente
              </Button>
            </div>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            variants={itemVariants}
            className="group relative h-full"
          >
            <div className="relative p-8 rounded-xl bg-primary text-primary-foreground flex flex-col h-full shadow-lg shadow-primary/20 overflow-hidden">
              {/* Most popular badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute top-0 right-0 bg-white/15 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl flex items-center gap-2 border border-white/10"
              >
                <Zap className="size-3" />
                MAIS POPULAR
              </motion.div>

              {/* Subtle animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

              <div className="relative z-10 mb-8">
                <h3 className="text-2xl font-bold mb-2">Pro Coach</h3>
                <div className="text-5xl font-bold mb-2">R$ 29,90<span className="text-lg font-normal opacity-70">/mês</span></div>
                <p className="opacity-90 text-sm">Para quem está sério em alcançar resultados.</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1 relative z-10">
                {["Hábitos e Metas Ilimitados", "Todas as Personalidades de IA", "Divisão Inteligente de Metas", "Análise Preditiva", "Suporte Prioritário"].map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="bg-white/20 text-white rounded-full p-1.5 flex-shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
                <Button size="lg" className="w-full rounded-lg h-11 font-semibold bg-white/95 text-primary hover:bg-white transition-colors">
                  Obter Acesso Pro
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}