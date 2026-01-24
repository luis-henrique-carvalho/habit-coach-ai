"use client";

import { motion } from "framer-motion";
import { Zap, Brain, Target, Shield, Trophy } from "lucide-react";
import Image from "next/image";

const benefits = [
  {
    icon: Brain,
    title: "COACHING DE PERSONALIDADE",
    description: "Escolha entre um Sargento que grita ou um Mestre Zen que sussurra.",
  },
  {
    icon: Zap,
    title: "FEEDBACK VIVO",
    description: "O sistema aprende se você responde melhor a elogios ou insultos.",
  },
  {
    icon: Target,
    title: "MICRO-METAS",
    description: "Metas de 1 ano são inúteis. Foque nas próximas 24 horas.",
  },
  {
    icon: Shield,
    title: "ZONA SEM JULGAMENTOS",
    description: "Errou? Tudo bem. O General vai te dar 50 flexões e a vida segue.",
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
  hidden: { opacity: 0, x: 20 },
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
    <section id="solution" className="py-24 md:py-48 bg-background relative overflow-hidden">

      <div className="container px-4 mx-auto relative z-10">

        {/* Asymmetric Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 pl-4 lg:pl-20 border-l-8 border-primary"
        >
          <span className="text-primary font-black tracking-widest uppercase text-sm mb-4 block">
            A Solução Definitiva
          </span>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-foreground uppercase tracking-tighter leading-[0.85]">
            PERSONALIDADE <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              VENCE HÁBITO.
            </span>
          </h2>
        </motion.div>

        {/* Content Stacking */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left: Fragments Stack */}
          <div className="lg:col-span-7 relative h-[600px] flex items-center justify-center">

            {/* Base Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-0 opacity-20 lg:opacity-40 grayscale"
            >
              <Image
                src="/hero-dashboard.png"
                alt="Dashboard Background"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* General Fragment */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotate: -10 }}
              whileInView={{ opacity: 1, x: 0, rotate: -6 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="absolute top-20 left-0 md:left-20 z-10 max-w-xs bg-destructive text-destructive-foreground p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex items-center gap-4 mb-3">
                <Image src="/avatar-general.png" alt="General" width={48} height={48} className="rounded-none border-2 border-black" />
                <span className="font-black uppercase text-xl">GENERAL</span>
              </div>
              <p className="font-bold text-lg leading-tight uppercase">"DOR É FRAQUEZA SAINDO DO CORPO! LEVANTA!"</p>
            </motion.div>

            {/* Yoda Fragment */}
            <motion.div
              initial={{ opacity: 0, x: 100, rotate: 10 }}
              whileInView={{ opacity: 1, x: 0, rotate: 6 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 80 }}
              className="absolute bottom-20 right-0 md:right-20 z-20 max-w-xs bg-background/90 backdrop-blur-md p-6 rounded-3xl border border-primary/20 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-3">
                <Image src="/avatar-wise.png" alt="Yoda" width={48} height={48} className="rounded-full border border-primary" />
                <span className="font-bold text-primary">Mestre Sábio</span>
              </div>
              <p className="font-medium text-muted-foreground italic">"Paciência você deve ter. Um passo de cada vez, o caminho é."</p>
            </motion.div>

          </div>

          {/* Right: Benefits List */}
          <div className="lg:col-span-5">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-8"
            >
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="flex gap-6 group"
                  >
                    <div className="shrink-0 p-4 bg-primary/10 rounded-none group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon className="size-6 stroke-[3]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase mb-1">{benefit.title}</h3>
                      <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
