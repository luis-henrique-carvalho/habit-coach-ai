"use client";

import { motion } from "framer-motion";
import { Zap, Target, BarChart3, Bell, BrainCircuit, Split } from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "PREDIÇÃO DE FRACASSO",
    description: "IA analisa seus padrões e avisa: 'Você vai desistir na 3ª feira'. Evite antes que aconteça.",
    className: "lg:col-span-2 bg-primary text-primary-foreground",
    iconColor: "text-primary-foreground",
  },
  {
    icon: Split,
    title: "DIVISÃO ATÔMICA",
    description: "Metas grandes paralisam. A IA as tritura em passos ridículos de tão fáceis.",
    className: "lg:col-span-1 bg-card",
    iconColor: "text-primary",
  },
  {
    icon: BarChart3,
    title: "DADOS REAIS",
    description: "Sem gráficos de vaidade. Apenas a probabilidade bruta do seu sucesso futuro.",
    className: "lg:col-span-1 bg-card",
    iconColor: "text-primary",
  },
  {
    icon: Target,
    title: "PILHAS DE HÁBITOS",
    description: "A IA sugere: 'Depois do café (hábito âncora), faça 5 flexões'. Automação humana.",
    className: "lg:col-span-2 bg-secondary/50",
    iconColor: "text-foreground",
  },
  {
    icon: Bell,
    title: "CHUTES NO TIGRE",
    description: "Lembretes baseados no seu nível de energia, não apenas no horário.",
    className: "lg:col-span-1 bg-card",
    iconColor: "text-primary",
  },
  {
    icon: Zap,
    title: "GAMIFICAÇÃO RPG",
    description: "Seu técnico sobe de nível. Desbloqueie skins do 'General' ou 'Yoda' conforme progride.",
    className: "lg:col-span-2 bg-accent text-accent-foreground",
    iconColor: "text-accent-foreground",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 20,
    },
  },
};

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-background relative overflow-hidden text-foreground">
      <div className="container px-4 mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase">
            Sistema <span className="text-transparent bg-clip-text bg-linear-to-b from-primary to-primary/60">Operacional</span>
          </h2>
          <p className="text-xl md:text-2xl font-medium text-muted-foreground max-w-2xl mx-auto">
            Não é motivação. É engenharia comportamental.
          </p>
        </motion.div>

        {/* Bento Grid Layout - Feature Fragments */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`
                  group relative p-8 rounded-none border-2 border-border
                  hover:scale-[1.01] hover:shadow-xl hover:shadow-primary/5 hover:border-primary
                  transition-all duration-300 flex flex-col justify-between overflow-hidden
                  ${feature.className}
                `}
              >
                {/* Tech Decoration */}
                <div className="absolute top-2 right-2 opacity-20 font-mono text-xs">
                  {`F-0${i + 1}`}
                </div>

                <div className="mb-8">
                  <div className={`p-3 w-fit rounded-none border-2 border-current mb-4 ${feature.iconColor}`}>
                    <Icon className="size-8 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-lg font-medium leading-relaxed opacity-90">
                  {feature.description}
                </p>

                {/* Hover Reveal Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
