"use client";

import { motion } from "framer-motion";
import { Check, Zap, X } from "lucide-react";
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
    <section id="pricing" className="py-32 bg-background relative overflow-hidden">
      {/* Massive Background Typography */}
      <div className="absolute top-0 right-0 overflow-hidden leading-none pointer-events-none opacity-[0.03] select-none text-right">
        <span className="text-[20vw] font-black tracking-tighter text-foreground whitespace-nowrap block mr-[-5vw]">
          VALUE
        </span>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-24 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold mb-8 uppercase tracking-wider transform -rotate-2">
            <span className="size-2 rounded-full bg-white animate-pulse" />
            Investimento Estratégico
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            Preço de <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              Compromisso.
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            O free é para curiosos. O Pro é para quem decidiu mudar de vida.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto items-center"
        >
          {/* Free Plan */}
          <motion.div
            variants={itemVariants}
            className="group relative"
          >
            <div className="relative p-10 rounded-3xl bg-secondary/20 border-2 border-transparent hover:border-primary/20 transition-all duration-300">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 opacity-70">Curioso</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-black tracking-tighter">R$0</span>
                  <span className="text-xl font-medium text-muted-foreground">/sempre</span>
                </div>
                <p className="mt-4 text-muted-foreground font-medium">
                  Para quem está apenas olhando.
                </p>
              </div>

              <ul className="space-y-4 mb-10">
                {[
                  { text: "3 Hábitos Ativos", active: true },
                  { text: "1 Meta Simples", active: true },
                  { text: "1 Personalidade (Aleatória)", active: true },
                  { text: "Análise Preditiva", active: false },
                  { text: "Modo Hardcore", active: false },
                ].map((feature, i) => (
                  <li key={i} className={`flex items-center gap-3 ${feature.active ? "" : "opacity-40"}`}>
                    <div className={`rounded-full p-1 ${feature.active ? "bg-primary/10 text-primary" : "bg-card text-muted-foreground"}`}>
                      {feature.active ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
                    </div>
                    <span className="text-sm font-bold">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <Button variant="outline" size="lg" className="w-full rounded-xl h-14 text-lg font-bold border-2 hover:bg-background">
                Começar Grátis
              </Button>
            </div>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            variants={itemVariants}
            className="group relative"
          >
            {/* Absolute Badge */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 rounded-full font-black uppercase tracking-widest text-sm z-20 shadow-xl border-2 border-white transform rotate-2">
              Recomendado
            </div>

            <div className="relative p-10 rounded-[2.5rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/30 overflow-hidden transform hover:-translate-y-2 transition-transform duration-500">
              {/* Texture */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

              <div className="relative z-10 mb-8">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-black uppercase tracking-widest mb-4">Pro Coach</h3>
                  <Zap className="size-8 fill-white text-white" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-7xl font-black tracking-tighter">R$29</span>
                  <span className="text-xl font-medium opacity-80">/mês</span>
                </div>
                <p className="mt-4 font-medium opacity-90 leading-relaxed">
                  Compromisso total. Todas as ferramentas. Sem desculpas.
                </p>
              </div>

              <div className="h-px w-full bg-white/20 mb-8" />

              <ul className="space-y-4 mb-10 relative z-10">
                {[
                  "Hábitos Ilimitados",
                  "Metas Complexas & Quebra Automática",
                  "Todas as 3 Personalidades",
                  "Análise de Padrões Preditiva",
                  "Acesso Antecipado ao App Mobile"
                ].map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3"
                  >
                    <div className="bg-white text-primary rounded-full p-1 shrink-0">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    <span className="text-sm font-bold">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative z-10">
                <Button size="lg" className="w-full rounded-2xl h-16 text-xl font-black bg-white text-primary hover:bg-white/90 shadow-xl">
                  ASSINAR AGORA
                </Button>
                <p className="text-center text-xs mt-4 opacity-70 font-medium">Cancelamento a qualquer momento.</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
