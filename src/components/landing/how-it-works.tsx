"use client";

import { motion } from "framer-motion";
import { UserPlus, Users, Target, Sparkles } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    number: 1,
    title: "Registre-se Gratuitamente",
    description: "Inscreva-se com email. Sem cartão de crédito. Acesso instantâneo.",
    icon: UserPlus,
    colorBg: "bg-primary/8",
    colorIcon: "bg-primary/15",
  },
  {
    number: 2,
    title: "Escolha Seu Técnico",
    description: "Escolha entre a sabedoria de Yoda, a disciplina do General, ou um Amigo atencioso.",
    icon: Users,
    colorBg: "bg-accent/8",
    colorIcon: "bg-accent/15",
    showAvatars: true,
  },
  {
    number: 3,
    title: "Crie Hábitos e Metas",
    description: "Defina o que você quer alcançar. Agendas diárias, semanais ou personalizadas.",
    icon: Target,
    colorBg: "bg-secondary/8",
    colorIcon: "bg-secondary/15",
  },
  {
    number: 4,
    title: "Receba Coaching Personalizado",
    description: "Receba feedback de IA personalizado que se adapta ao seu progresso e estilo.",
    icon: Sparkles,
    colorBg: "bg-primary/6",
    colorIcon: "bg-primary/12",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.3,
    },
  },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-secondary/3 via-transparent to-primary/3 pointer-events-none" />

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
            Configuração Simples
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Sua Jornada para{" "}
            <span className="text-primary">
              Melhores Hábitos
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Do registro até sua primeira mensagem de coaching personalizado em menos de 5 minutos.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Desktop Layout */}
          <div className="hidden lg:block relative">
            {/* Connecting Path */}
            <div className="absolute top-24 left-[12.5%] right-[12.5%] h-0.5 z-0">
              <motion.div
                variants={lineVariants}
                className="h-full bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-full origin-left"
              />
            </div>

            <div className="grid grid-cols-4 gap-6">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="relative group"
                  >
                    {/* Step Card */}
                    <div className="flex flex-col items-center text-center">
                      {/* Icon Container */}
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className={`relative z-10 mb-8 size-16 rounded-lg ${step.colorIcon} flex items-center justify-center`}
                      >
                        <Icon className="size-7 text-foreground" strokeWidth={1.5} />

                        {/* Step number badge */}
                        <div className="absolute -top-2 -right-2 size-6 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center shadow-md">
                          {step.number}
                        </div>
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-48">
                        {step.description}
                      </p>

                      {/* Coach avatars for step 2 */}
                      {step.showAvatars && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 }}
                          className="flex -space-x-3 mt-6"
                        >
                          {["/avatar-wise.png", "/avatar-general.png", "/avatar-robot.png"].map((src) => (
                            <motion.div
                              key={src}
                              whileHover={{ scale: 1.15, zIndex: 10 }}
                              className="relative"
                            >
                              <Image
                                src={src}
                                alt="Avatar do técnico"
                                width={40}
                                height={40}
                                className="size-10 rounded-full border-2 border-background shadow-md object-cover bg-secondary"
                              />
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet Layout - Vertical Timeline */}
          <div className="lg:hidden space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;

              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="relative flex gap-6 group"
                >
                  {/* Timeline line & dot */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`relative z-10 size-12 rounded-lg ${step.colorIcon} flex items-center justify-center`}
                    >
                      <Icon className="size-5" strokeWidth={1.5} />
                      <div className="absolute -top-1 -right-1 size-5 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">
                        {step.number}
                      </div>
                    </motion.div>

                    {!isLast && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-0.5 flex-1 min-h-12 bg-gradient-to-b from-border/50 to-transparent origin-top"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`pb-10 ${isLast ? "pb-0" : ""}`}>
                    <h3 className="text-base font-bold mb-1 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {step.showAvatars && (
                      <div className="flex -space-x-2 mt-3">
                        {["/avatar-wise.png", "/avatar-general.png", "/avatar-robot.png"].map((src) => (
                          <Image
                            key={src}
                            src={src}
                            alt="Avatar do técnico"
                            width={32}
                            height={32}
                            className="size-8 rounded-full border-2 border-background shadow-md object-cover bg-secondary"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
