"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Shield, FileText, Cookie, ArrowRight } from "lucide-react";
import Link from "next/link";

const policies = [
  {
    icon: Shield,
    title: "Privacy Policy",
    path: "/privacy-policy",
    desc: "Explains how Studio GENZ collects, handles, protects, and utilizes user analytical logs, contact emails, and personal information during production.",
    lastUpdated: "May 2026",
  },
  {
    icon: FileText,
    title: "Terms of Service",
    path: "/terms-of-service",
    desc: "Defines our flat-fee project delivery obligations, vector copyright handovers, payment structures, and mutual professional liabilities.",
    lastUpdated: "May 2026",
  },
  {
    icon: Cookie,
    title: "Cookie Policy",
    path: "/cookie-policy",
    desc: "Explains why we use essential session cookies, third-party performance analytics, and custom user styling preferences.",
    lastUpdated: "May 2026",
  },
];

export default function LegalCenterPage() {
  return (
    <main className="min-h-screen bg-(--bg-primary) text-(--text-primary)">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-40 pb-16 overflow-hidden bg-black text-white">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at top right, rgba(139, 92, 246, 0.15), transparent 50%), radial-gradient(circle at bottom left, rgba(139, 92, 246, 0.08), transparent 50%)`,
          }}
        />
        <div className="container-apple relative z-10 text-center flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-bold uppercase tracking-wider text-violet-400"
          >
            AGREEMENTS
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-900 text-[clamp(2.5rem,7vw,5.5rem)] leading-none uppercase tracking-tighter max-w-[900px]"
          >
            LEGAL <span className="gradient-text-violet">CENTER</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-base md:text-xl leading-relaxed max-w-[650px] mt-2 font-sans"
          >
            Studio GENZ operates with absolute clarity, integrity, and transparency. Read our formal terms, policy procedures, and cookie guidelines.
          </motion.p>
        </div>
      </section>

      {/* Policies Hub Grid */}
      <section className="section-padding bg-(--bg-primary)">
        <div className="container-apple flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {policies.map((p, idx) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass-panel rounded-3xl p-8 border border-(--border-color) hover:shadow-xl hover:border-violet-500/20 bg-(--bg-secondary) transition-all duration-300 flex flex-col justify-between gap-6 text-left"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-(--border-color) flex items-center justify-center text-violet-600 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                          {p.title}
                        </h3>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-violet-600/10 text-violet-600 uppercase tracking-widest">
                          Updated
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-(--text-muted) leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-(--border-color) pt-4">
                    <span className="text-[10px] font-bold text-(--text-muted) uppercase tracking-widest">
                      Last update: {p.lastUpdated}
                    </span>
                    <Link
                      href={p.path}
                      className="group flex items-center gap-1 text-[10px] font-bold text-violet-500 hover:text-violet-600 transition-colors uppercase tracking-widest"
                    >
                      READ AGREEMENT
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
