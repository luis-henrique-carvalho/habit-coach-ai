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

export function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We&apos;ve got answers. Can&apos;t find what you&apos;re looking for? Contact us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-xl overflow-hidden bg-card hover:border-primary/30 transition-colors"
              >
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors text-left"
                >
                  <h3 className="font-semibold text-base pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      expandedIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 py-4 border-t border-border bg-secondary/20"
                    >
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
