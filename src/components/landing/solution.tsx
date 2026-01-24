"use client";

import { motion } from "framer-motion";
import { Zap, Brain, Target, Shield } from "lucide-react";
import Image from "next/image";

const benefits = [
  {
    icon: Brain,
    title: "Coaching de IA com Personalidade Customizável",
    description: "Escolha entre estilos de coaching distintos que combinam com sua personalidade.",
    colorBg: "bg-primary/8",
    colorIcon: "bg-primary/15",
  },
  {
    icon: Zap,
    title: "Motivação e Feedback Personalizados",
    description: "Coaching adaptativo que evolui com seu progresso.",
    colorBg: "bg-accent/8",
    colorIcon: "bg-accent/15",
  },
  {
    icon: Target,
    title: "Decomposição Automática de Metas",
    description: "Grandes metas se tornam micro-tarefas gerenciáveis automaticamente.",
    colorBg: "bg-secondary/8",
    colorIcon: "bg-secondary/15",
  },
  {
    icon: Shield,
    title: "Rastreamento e Responsabilidade em Tempo Real",
    description: "Suporte 24/7 que o mantém no caminho sem julgamentos.",
    colorBg: "bg-primary/6",
    colorIcon: "bg-primary/12",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function Solution() {
  return (
    <section id="solution" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-accent/3 via-transparent to-primary/3 pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <span className="size-1.5 rounded-full bg-primary animate-glow-pulse" />
            A Solução Completa
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Conheça o{" "}
            <span className="text-primary">
              Habit Coach AI
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Mais que um rastreador. Um técnico pessoal que se adapta à sua personalidade e estilo de comunicação únicos.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left: Image with enhanced visuals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative group">
              {/* Image frame */}
              <motion.div
                whileHover={{ scale: 1.02, y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative z-10"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-primary/15">
                  <Image
                    src="/hero-dashboard.png"
                    alt="Dashboard do Habit Coach AI"
                    width={500}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-primary/10 via-transparent to-transparent" />
                </div>

                {/* Floating accent badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute -bottom-6 -right-6 hidden md:block"
                >
                  <div className="bg-card backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg border border-primary/15">
                    <p className="text-sm font-bold text-foreground">100% Grátis</p>
                    <p className="text-xs text-muted-foreground">Sem cartão de crédito</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Benefits list with animations */}
          <motion.div className="order-1 lg:order-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-muted-foreground mb-10 leading-relaxed"
            >
              Habit Coach AI é mais que um rastreador. É seu técnico pessoal que se adapta à sua personalidade e estilo de comunicação únicos.
            </motion.p>

            {/* Benefits Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-4 mb-10"
            >
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="group relative"
                  >
                    <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-primary/5 transition-colors duration-300">
                      {/* Icon Container */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className={`relative shrink-0 size-11 rounded-lg ${benefit.colorIcon} flex items-center justify-center mt-0.5`}
                      >
                        <Icon className="size-5 text-foreground" strokeWidth={1.5} />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-bold text-base leading-tight mb-1 group-hover:text-primary transition-colors duration-300">
                          {benefit.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Closing statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground leading-relaxed border-l-4 border-primary/20 pl-6 py-4 rounded-lg bg-primary/4"
            >
              Se você precisa de um Sargento Instrutor mantendo você firme, um Mentor Sábio guiando você gentilmente, ou um Melhor Amigo torcendo por você — temos a personalidade que se encaixa no seu estilo de coaching.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
