"use client";

import { motion } from "framer-motion";
import { AlertCircle, TrendingDown, Clock, Users, X } from "lucide-react";

const problems = [
  {
    icon: AlertCircle,
    title: "MOTIVAÇÃO FANTASMA",
    description: "Você começa com fogo, mas apaga em 3 dias. Sem um sargento te cobrando, a chama morre.",
    rotation: "rotate-1",
  },
  {
    icon: TrendingDown,
    title: "RASTREADORES BURROS",
    description: "Apps genéricos não sabem quem você é. Você precisa de um coach que entenda sua psique.",
    rotation: "-rotate-1",
  },
  {
    icon: Clock,
    title: "PARALISIA POR ANÁLISE",
    description: "Dividir grandes metas em micro-tarefas é chato. Nossa IA faz o trabalho sujo para você.",
    rotation: "rotate-2",
  },
  {
    icon: Users,
    title: "SOLIDÃO TÓXICA",
    description: "Tentar mudar sozinho é pedir para falhar. A responsabilidade compartilhada é a chave.",
    rotation: "-rotate-2",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export function Problem() {
  return (
    <section id="problem" className="py-24 md:py-32 bg-background/50 relative overflow-hidden">

      {/* Background Noise/Texture could go here */}
      <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
        <X className="w-96 h-96 text-destructive" strokeWidth={1} />
      </div>

      <div className="container px-4 mx-auto relative z-10">

        {/* Header - Typographic Bold */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-20 max-w-4xl"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1 bg-destructive/10 text-destructive text-sm font-bold uppercase tracking-widest mb-6 border border-destructive/20 rounded-none">
            <AlertCircle className="size-4" />
            O Problema Real
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-foreground">
            POR QUE VOCÊ <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-destructive to-destructive/60">
              CONTINUA FALHANDO?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl border-l-4 border-destructive/30 pl-6">
            Não é culpa sua (totalmente). O sistema tradicional de hábitos está quebrado.
          </p>
        </motion.div>

        {/* Grid Betrayal - Asymmetric Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
        >
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            // Stagger layout manually for asymmetry
            const offsetClass = i % 2 === 0 ? "md:translate-y-0" : "md:translate-y-12";

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`${offsetClass} group`}
              >
                <div
                  className={`
                    relative p-8 h-full bg-card hover:bg-accent/5
                    border-2 border-border hover:border-primary/50
                    transition-all duration-300
                    ${problem.rotation} hover:rotate-0 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10
                    rounded-none
                  `}
                >
                  {/* Technical Corner Markers */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/30" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/30" />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-background border-2 border-foreground/10 shadow-sm rounded-none group-hover:border-primary group-hover:text-primary transition-colors">
                      <Icon className="size-8 stroke-[2.5]" />
                    </div>
                    <span className="text-4xl font-black text-muted-foreground/20 group-hover:text-primary/20 transition-colors">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-foreground group-hover:text-primary transition-colors">
                    {problem.title}
                  </h3>
                  <p className="text-lg text-muted-foreground font-medium leading-relaxed group-hover:text-foreground transition-colors">
                    {problem.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
