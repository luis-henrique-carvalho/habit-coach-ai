"use client";

import { motion } from "framer-motion";
import { Zap, Target, BarChart3, Bell, BrainCircuit, Split } from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "Insights Impulsionados por IA",
    description: "Nossa IA analisa seus padrões para prever quando você vai fracassar e ajuda você a prevenir antes que aconteça.",
    colorBg: "bg-primary/8",
    colorIcon: "bg-primary/15",
  },
  {
    icon: Split,
    title: "Divisão Inteligente de Metas",
    description: "Sobrecarregado com grandes metas? Nossa IA as divide automaticamente em pequenas tarefas diárias gerenciáveis.",
    colorBg: "bg-accent/8",
    colorIcon: "bg-accent/15",
  },
  {
    icon: BarChart3,
    title: "Análise Preditiva",
    description: "Não apenas veja onde você esteve. Veja para onde você está indo com previsões de probabilidade de sucesso.",
    colorBg: "bg-primary/5",
    colorIcon: "bg-primary/12",
  },
  {
    icon: Target,
    title: "Pilhas de Hábitos Personalizadas",
    description: "Construa rotinas poderosas encadeando hábitos. A IA sugere horários ideais para cada pilha.",
    colorBg: "bg-secondary/8",
    colorIcon: "bg-secondary/15",
  },
  {
    icon: Bell,
    title: "Incentivos Contextuais",
    description: "Receba lembretes que realmente importam, baseados em sua localização, hora e nível de energia atual.",
    colorBg: "bg-accent/6",
    colorIcon: "bg-accent/12",
  },
  {
    icon: Zap,
    title: "Streaks Gamificados",
    description: "Ganhe XP e suba de nível seu personagem. Desbloqueie novas aparências para seu técnico de IA conforme progride.",
    colorBg: "bg-primary/6",
    colorIcon: "bg-primary/14",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/3 via-transparent to-accent/3 pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <span className="size-1.5 rounded-full bg-primary animate-glow-pulse" />
            Recursos Poderosos
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Mais que apenas{" "}
            <span className="text-primary">
              caixas de seleção
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Um sistema completo projetado para reformular seu cérebro para o sucesso, alimentado por ciência comportamental avançada e IA.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative h-full"
              >
                <div className="relative p-8 rounded-xl h-full bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 overflow-hidden">
                  {/* Subtle background */}
                  <div className={`absolute inset-0 ${feature.colorBg} pointer-events-none`} />

                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={`relative z-10 size-14 rounded-lg ${feature.colorIcon} flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300`}
                  >
                    <Icon className="size-7 text-foreground" strokeWidth={1.5} />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>

                  {/* Subtle accent line on top */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}