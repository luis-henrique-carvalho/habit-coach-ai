"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import Link from 'next/link';

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Roadmap", href: "#" },
    { label: "Blog", href: "#" }
  ],
  support: [
    { label: "FAQ", href: "#faq" },
    { label: "Help Center", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Status Page", href: "#" }
  ],
  legal: [
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "GDPR", href: "#" },
    { label: "Cookies", href: "#" }
  ]
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" }
];

export function Footer() {
  return (
    <footer className="relative bg-black text-white py-24 md:py-32 overflow-hidden border-t border-white/10">
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 mb-24">

          {/* Brand Column */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="size-8 rounded-none bg-primary border-2 border-white" />
                <span className="font-bold tracking-widest uppercase">Habit Coach AI</span>
              </div>

              <h3 className="text-4xl md:text-6xl font-black leading-none tracking-tighter mb-6">
                BUILD.<br />
                TRACK.<br />
                EVOLVE.
              </h3>

              <p className="text-white/60 text-lg max-w-sm font-medium">
                The only habit tracker that yells at you when you&apos;re lazy and hugs you when you try.
              </p>
            </motion.div>

            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, rotate: 5, backgroundColor: "var(--primary)" }}
                    className="size-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-black hover:border-transparent transition-all"
                  >
                    <Icon className="size-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Grid - Asymmetric */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary mb-6">Product</h4>
              <ul className="space-y-4">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/60 hover:text-white text-lg font-medium transition-colors flex items-center group">
                      {link.label}
                      <ArrowUpRight className="size-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:pt-12">
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary mb-6">Support</h4>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/60 hover:text-white text-lg font-medium transition-colors flex items-center group">
                      {link.label}
                      <ArrowUpRight className="size-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary mb-6">Legal</h4>
              <ul className="space-y-4">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/60 hover:text-white text-lg font-medium transition-colors flex items-center group">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Massive Footer Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <p className="text-white/40 text-sm font-mono">
            © 2026 Habit Coach AI Labs.
          </p>

          {/* Giant Wordmark */}
          <div className="w-full md:w-auto overflow-hidden">
            <span className="text-[12vw] md:text-[8rem] font-black leading-[0.8] tracking-tighter text-white/5 select-none block md:absolute md:-bottom-8 md:right-4 pointer-events-none">
              HABIT
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
