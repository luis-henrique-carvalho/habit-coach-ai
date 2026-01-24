"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Trophy, Zap, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const staggeredFade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.2 + i * 0.15,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section ref={containerRef} className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-background flex items-center justify-center">
      {/* Radical Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div
          style={{ y: y1, rotate: rotate }}
          className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* Status badge - Asymmetric placement override */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 self-center lg:translate-x-[-15%] flex items-center gap-3 px-5 py-2 rounded-full bg-secondary border border-primary/20 shadow-sm"
          >
            <Zap className="size-4 text-primary fill-primary animate-pulse" />
            <span className="text-sm font-bold tracking-tight text-foreground uppercase italic">
              A revolução do hábito chegou.
            </span>
          </motion.div>

          {/* MASSIVE TYPOGRAPHY - Typographic Bold */}
          <div className="relative mb-12">
            <motion.h1
              custom={0}
              initial="hidden"
              animate="visible"
              variants={staggeredFade}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-balance mb-4 drop-shadow-sm select-none"
            >
              PARE DE <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary/80 to-primary/60 italic">
                FALHAR.
              </span>
            </motion.h1>

            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={staggeredFade}
              className="lg:translate-x-1/4 mt-[-1rem]"
            >
              <p className="text-2xl md:text-3xl font-bold text-foreground bg-primary px-4 py-1 inline-block -rotate-1">
                TENHA UM COACH QUE SE IMPORTA.
              </p>
            </motion.div>
          </div>

          {/* Subheading - Center Staggered */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={staggeredFade}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-xl text-balance leading-relaxed font-medium lg:translate-x-[-5%]"
          >
            Esqueça rastreadores chatos. Habit Coach AI te dá um Sargento, um Mentor ou seu Melhor Amigo para te cobrar 24/7. **Sem desculpas.**
          </motion.p>

          {/* CTAs - Radical Scale & Interaction */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={staggeredFade}
            className="flex flex-col sm:flex-row items-center gap-6 mb-16"
          >
            <motion.div whileHover={{ scale: 1.1, rotate: -2 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="lg"
                className="h-16 px-10 text-lg shadow-2xl shadow-primary/40 rounded-none font-black italic uppercase tracking-wider bg-primary hover:bg-primary/90 transition-all border-2 border-primary"
              >
                VAMOS COMEÇAR <ArrowRight className="ml-3 size-6 stroke-[3px]" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="lg"
                className="h-16 px-8 text-lg rounded-none font-bold underline decoration-primary underline-offset-8 transition-all hover:bg-transparent hover:text-primary"
              >
                <Sparkles className="mr-3 size-5 text-primary" />
                VER A DEMO
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating Character Fragments - Integrated & Dynamic */}
          <div className="absolute inset-0 pointer-events-none select-none z-[-1] hidden lg:block">

            {/* Master Yoda Fragment */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute top-1/4 right-0 xl:right-10"
            >
              <div className="group relative bg-card/80 backdrop-blur-md border-2 border-primary/20 p-6 rounded-3xl shadow-2xl max-w-xs rotate-3 hover:rotate-0 transition-transform pointer-events-auto">
                <div className="flex items-center gap-4 mb-4">
                  <div className="size-14 rounded-full bg-accent/20 border-2 border-primary flex items-center justify-center overflow-hidden">
                    <Image src="/avatar-wise.png" alt="Yoda" width={56} height={56} className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-foreground italic uppercase">Mestre Yoda</h4>
                    <div className="flex gap-0.5 text-primary">
                      {[1, 2, 3, 4, 5].map((s) => <Trophy key={s} className="size-3 fill-primary" />)}
                    </div>
                  </div>
                </div>
                <p className="text-base font-bold text-muted-foreground leading-tight italic">
                  "Seu streak, impressionante é. Mas a força nos dados, ainda flutuante está."
                </p>
              </div>
            </motion.div>

            {/* General Strike Fragment */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="absolute bottom-1/4 left-0 xl:left-10"
            >
              <div className="group relative bg-primary text-primary-foreground p-6 rounded-none shadow-2xl max-w-xs -rotate-2 hover:rotate-0 transition-transform pointer-events-auto border-2 border-foreground">
                <div className="flex items-center gap-4 mb-4">
                  <div className="size-14 rounded-full bg-white/20 border-2 border-white flex items-center justify-center overflow-hidden">
                    <Image src="/avatar-general.png" alt="General" width={56} height={56} className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-white italic uppercase">General Strike</h4>
                    <span className="text-[10px] font-bold bg-white text-primary px-1">SARGENTO</span>
                  </div>
                </div>
                <p className="text-base font-black leading-tight uppercase tracking-tighter">
                  "QUER DESCANSO? O CEMITÉRIO ESTÁ CHEIO DE PESSOAS QUE DESCANSARAM!"
                </p>
              </div>
            </motion.div>
          </div>

          {/* Social Proof / Trust - Refined & Minimalist */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 pt-10 border-t border-primary/10 w-full max-w-4xl"
          >
            {[
              { icon: ShieldCheck, label: "Privacidade Total" },
              { icon: Trophy, label: "Gamificado" },
              { icon: Zap, label: "Sincronização 24/7" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 group">
                <item.icon className="size-5 text-primary group-hover:scale-125 transition-transform" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Hero Dashboard Fragment - Layered & Subtle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1.2, ease: "circOut" }}
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 z-[-1]"
      >
        <div className="relative group">
          <Image
            src="/hero-dashboard.png"
            alt="Dashboard Preview"
            width={1200}
            height={800}
            className="rounded-t-3xl border-x-4 border-t-4 border-primary/20 shadow-[0_-20px_50px_-12px_rgba(var(--primary),0.3)] grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent pointer-events-none" />
        </div>
      </motion.div>

    </section>
  );
}
