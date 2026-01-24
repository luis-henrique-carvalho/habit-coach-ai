"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-linear-to-b from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          suppressHydrationWarning
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          suppressHydrationWarning
        />
      </div>

      <div className="container px-4 mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 backdrop-blur-sm border border-primary/20">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            Got Questions?
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Frequently Asked{" "}
            <span className="bg-linear-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Reach out to our support team.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-3xl mx-auto"
        >
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="border border-border rounded-2xl overflow-hidden bg-card hover:border-primary/30 transition-all duration-300">
                  <button
                    onClick={() => toggleExpand(index)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-secondary/30 transition-colors text-left"
                  >
                    <h3 className="font-semibold text-base pr-4 group-hover:text-primary transition-colors">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      suppressHydrationWarning
                    >
                      <ChevronDown className="size-5 shrink-0 text-muted-foreground" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 py-5 border-t border-border bg-secondary/20"
                      >
                        <p className="text-muted-foreground leading-relaxed text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Top accent line on hover */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary to-chart-2 origin-left"
                    suppressHydrationWarning
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
