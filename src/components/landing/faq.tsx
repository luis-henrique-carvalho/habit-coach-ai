"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How does the free plan work?",
    answer: "The free plan gives you access to 3 active habits, 1 active goal, 1 AI personality (randomly assigned), and a basic dashboard. It's perfect for testing whether Habit Coach AI is right for you. Upgrade to Pro anytime to unlock unlimited habits, all AI personalities, and advanced features like goal breakdown and predictive analytics."
  },
  {
    question: "Can I cancel my Pro subscription anytime?",
    answer: "Absolutely! There are no long-term commitments. You can cancel your Pro subscription at any time from your account settings. Your subscription will continue until the end of your billing cycle, then revert to the free plan."
  },
  {
    question: "Is my data secure and private?",
    answer: "Yes. We take security seriously. All data is encrypted in transit and at rest. We never sell your data to third parties. Your habits, goals, and coaching interactions are yours alone. We comply with GDPR and other privacy regulations."
  },
  {
    question: "How does the AI coaching work?",
    answer: "When you log your habits or reach a milestone, our AI analyzes your progress and generates personalized coaching messages. The personality you selected shapes the tone and style of this feedback. It's like having a real coach in your pocket who learns your patterns and adapts over time."
  },
  {
    question: "Can I change my AI personality after sign-up?",
    answer: "On the free plan, your personality is assigned randomly and cannot be changed. On the Pro plan, you can switch between all three personalities (Yoda, General, Friend) as often as you like. We recommend giving each personality at least a week to see which one resonates most with you."
  },
  {
    question: "Is there a mobile app?",
    answer: "Currently, Habit Coach AI is available as a web app optimized for mobile browsers. A native iOS and Android app is on our roadmap for Q2 2026. You can still use the web app on your phone with a great mobile experience."
  },
  {
    question: "Does Habit Coach AI work offline?",
    answer: "The web app requires an internet connection to sync with our servers and generate AI coaching. However, we're exploring offline-first capabilities for future versions. For now, make sure you're connected when logging habits."
  },
  {
    question: "What payment methods are supported?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and local payment methods depending on your region. Payments are processed securely through Stripe."
  }
];

export function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-background relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Header Sticky Side */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.8] text-primary/20">
                FYI
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Dúvidas <br />
                Frequentes
              </h3>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Tudo o que você precisa saber para começar a quebrar padrões e construir disciplina.
              </p>

              <div className="hidden lg:block p-6 bg-secondary/30 rounded-2xl border border-secondary">
                <p className="font-bold mb-2">Ainda com dúvidas?</p>
                <a href="mailto:support@habitcoach.ai" className="text-primary hover:underline font-medium">Fale com o suporte &rarr;</a>
              </div>
            </div>
          </div>

          {/* List Side */}
          <div className="lg:col-span-7">
            <div className="flex flex-col border-t-2 border-primary/10">
              {faqs.map((faq, index) => {
                const isOpen = expandedIndex === index;

                return (
                  <div key={index} className="border-b border-border/60">
                    <button
                      onClick={() => setExpandedIndex(isOpen ? null : index)}
                      className="w-full py-8 flex items-start gap-6 text-left group transition-colors hover:bg-secondary/20 px-4 -mx-4 rounded-lg"
                    >
                      <span className={`text-xl font-mono font-bold pt-1 transition-colors ${isOpen ? 'text-primary' : 'text-muted-foreground/30'}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div className="flex-1">
                        <h4 className={`text-xl md:text-2xl font-bold mb-2 transition-colors ${isOpen ? 'text-foreground' : 'text-foreground/80'}`}>
                          {faq.question}
                        </h4>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "circOut" }}
                              className="overflow-hidden"
                            >
                              <p className="text-base md:text-lg text-muted-foreground leading-relaxed py-4 border-t border-dashed border-primary/20 mt-4">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className={`mt-1 bg-secondary rounded-full p-2 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-primary text-primary-foreground' : ''}`}>
                        {isOpen ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
