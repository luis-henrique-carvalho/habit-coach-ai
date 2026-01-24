"use client";

import { motion } from "framer-motion";
import { AlertCircle, TrendingDown, Clock, Users } from "lucide-react";

const problems = [
  {
    icon: AlertCircle,
    title: "Falta de Consistência e Motivação",
    description: "Você começa com entusiasmo, mas a motivação desaparece. Sem suporte personalizado, manter hábitos se torna uma batalha árdua.",
    colorBg: "bg-primary/6",
    colorIcon: "bg-primary/12",
  },
  {
    icon: TrendingDown,
    title: "Sem Feedback Personalizado",
    description: "Rastreadores genéricos não o entendem. Você precisa de um coaching que se adapte à sua personalidade.",
    colorBg: "bg-accent/6",
    colorIcon: "bg-accent/12",
  },
  {
    icon: Clock,
    title: "Definição de Metas Esmagadora",
    description: "Grandes metas parecem impossíveis. Dividi-las em etapas acionáveis é cansativo e confuso.",
    colorBg: "bg-secondary/6",
    colorIcon: "bg-secondary/12",
  },
  {
    icon: Users,
    title: "Falta de Responsabilidade",
    description: "Ir sozinho é difícil. Sem alguém verificando seu progresso, é fácil perder o foco.",
    colorBg: "bg-primary/5",
    colorIcon: "bg-primary/10",
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

export function Problem() {
  return (
    <section id="problem" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/3 via-transparent to-secondary/3 pointer-events-none" />

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
            Os Verdadeiros Obstáculos
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            O que está{" "}
            <span className="text-primary">
              te impedindo?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Construir hábitos é difícil. Você não está sozinho nessa luta.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative h-full"
              >
                <div className="relative p-8 rounded-xl h-full bg-card border border-border/50 hover:border-primary/15 transition-all duration-300 overflow-hidden">
                  {/* Subtle background */}
                  <div className={`absolute inset-0 ${problem.colorBg} pointer-events-none`} />

                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={`relative z-10 size-12 rounded-lg ${problem.colorIcon} flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300`}
                  >
                    <Icon className="size-6 text-foreground" strokeWidth={1.5} />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {problem.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {problem.description}
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
