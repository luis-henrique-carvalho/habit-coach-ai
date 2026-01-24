"use client";

import { motion } from "framer-motion";
import { UserPlus, Users, Target, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Registre-se Gratuitamente",
    description: "Sem cartões de crédito. Apenas sua vontade de mudar. O acesso é imediato e a transformação começa agora.",
    icon: UserPlus,
    colorBg: "bg-primary/5",
    align: "left",
  },
  {
    number: "02",
    title: "Escolha Seu Técnico",
    description: "Você precisa de um abraço ou de um grito? Escolha a sabedoria de Yoda, a fúria do General ou o apoio do Buddy.",
    icon: Users,
    colorBg: "bg-accent/5",
    align: "right",
    showAvatars: true,
  },
  {
    number: "03",
    title: "Defina a Missão",
    description: "Não são apenas 'metas'. São missões. Quebre grandes objetivos em vitórias diárias tangíveis.",
    icon: Target,
    colorBg: "bg-secondary/5",
    align: "left",
  },
  {
    number: "04",
    title: "Evolução Contínua",
    description: "Feedback brutalmente honesto ou gentilmente persuasivo. A IA aprende seus pontos fracos e ataca lá.",
    icon: Sparkles,
    colorBg: "bg-primary/5",
    align: "right",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 bg-background relative overflow-hidden">
      {/* Massive Background Typography */}
      <div className="absolute top-20 left-0 w-full overflow-hidden leading-none pointer-events-none opacity-[0.03]">
        <span className="text-[20rem] font-black tracking-tighter text-foreground whitespace-nowrap">
          SYSTEM
        </span>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-32"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold mb-8 uppercase tracking-wider">
            <span className="size-2 rounded-full bg-white animate-pulse" />
            Processo de 4 Etapas
          </div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            A Máquina de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">
              Hábitos
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Do zero ao primeiro hábito em 5 minutos. Sem fricção, apenas ação.
          </p>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-border hidden lg:block" />

          <div className="space-y-32">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col lg:flex-row gap-12 items-center ${step.align === "right" ? "lg:flex-row-reverse" : ""
                  }`}
              >
                {/* Content Side */}
                <div className={`flex-1 ${step.align === "right" ? "text-left lg:text-left" : "text-left lg:text-right"}`}>
                  <div className={`flex flex-col gap-6 ${step.align === "right" ? "items-start" : "items-start lg:items-end"}`}>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">Passo {step.number}</span>
                      <div className="h-px w-12 bg-primary" />
                    </div>

                    <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-none uppercase">
                      {step.title}
                    </h3>

                    <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                      {step.description}
                    </p>

                    {step.showAvatars && (
                      <div className="flex -space-x-4 pt-4">
                        {["/avatar-wise.png", "/avatar-general.png", "/avatar-robot.png"].map((src, idx) => (
                          <div key={idx} className="relative z-10 transition-transform hover:scale-110 hover:z-20">
                            <Image
                              src={src}
                              alt="Coach"
                              width={60}
                              height={60}
                              className="size-14 rounded-full border-4 border-background object-cover bg-secondary"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Center Marker */}
                <div className="relative z-10 hidden lg:flex items-center justify-center">
                  <div className="size-4 rounded-full bg-primary border-4 border-background shadow-xl" />
                </div>

                {/* Visual Side */}
                <div className="flex-1 w-full lg:w-auto">
                  <div className={`relative p-8 md:p-12 rounded-3xl overflow-hidden border border-border/50 ${step.colorBg} backdrop-blur-sm group hover:border-primary/30 transition-colors duration-500`}>
                    <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-9xl leading-none select-none">
                      {step.number}
                    </div>

                    <div className="relative z-10">
                      <div className="size-20 rounded-2xl bg-background flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <step.icon className="size-10 text-primary" strokeWidth={1.5} />
                      </div>

                      <div className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                        Comece Agora <ArrowRight className="size-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
