"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Check, Smartphone } from "lucide-react";
import Link from "next/link";

const deliverables = [
  { title: "Atomic Design System", desc: "A unified Figma master component library including inputs, status states, dynamic charts, layouts, and system light tokens." },
  { title: "Touch Interaction Flows", desc: "Carefully planned mobile screen transitions optimized for human thumb reach zones and quick gesture controls." },
  { title: "SaaS Dashboard Layouts", desc: "High-density data layouts optimized to decrease cognitive clutter, prioritizing clean text contrast and structural hierarchies." },
  { title: "Interactive Prototypes", desc: "Rigorous Figma click prototypes illustrating screen overlays, slide drawers, and button triggers to guide dev teams." },
  { title: "Asset Store Publishing Kits", desc: "Polished App Store and Google Play mockup screens, graphics, icons, and visually stunning promo assets." },
];

const uiProcess = [
  { step: "01", name: "JOURNEY MAPPING", desc: "We list all app paths, identifying friction zones and mapping user step hierarchies to keep flows incredibly fast." },
  { step: "02", name: "ATOMIC BLUEPRINTS", desc: "We draft low-fidelity wireframes to establish basic layout columns, focusing strictly on functional density and readability." },
  { step: "03", name: "HIGH-FIDELITY DESIGN", desc: "We apply the branding visual stamp, custom colors, glassmorphic panel headers, and subtle glows, styling final screen states." },
  { step: "04", name: "COMPONENT EXPORT", desc: "We organize the Figma library, defining auto-layouts, spacing tokens, and component variations for an seamless developer handoff." },
];

export default function AppUIPage() {
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
            SERVICE PILLAR 03
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-900 text-[clamp(2.5rem,7vw,5.5rem)] leading-none uppercase tracking-tighter max-w-[900px]"
          >
            APP <span className="gradient-text-violet">UI/UX</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-base md:text-xl leading-relaxed max-w-[650px] mt-2 font-sans"
          >
            We design conversion-driven digital interfaces. Interactive prototypes, structured atomic components, and touch layouts engineered for elite engagement.
          </motion.p>
        </div>
      </section>

      {/* Service Core Intro */}
      <section className="section-padding bg-(--bg-primary)">
        <div className="container-apple grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Philosophy */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <span className="section-label text-violet-500 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Philosophy
            </span>
            <h2 className="font-display font-800 text-3xl md:text-4xl uppercase tracking-tight text-(--text-primary)">
              THE ART OF UNHINDERED FLOW
            </h2>
            <p className="text-sm md:text-base text-(--text-muted) leading-relaxed">
              Superb application design doesn't call attention to itself; it removes obstacles. We structure intuitive pathways that let users accomplish their tasks with zero thinking time, transforming features into habit loops.
            </p>
            <p className="text-sm md:text-base text-(--text-muted) leading-relaxed">
              We compile organized Figma design libraries containing clear auto-layouts and variables, ensuring your engineering team can construct polished frontend interfaces in half the time.
            </p>
          </div>

          {/* Deliverables list */}
          <div className="lg:col-span-7 space-y-6">
            {deliverables.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-(--bg-secondary) border border-(--border-color) hover:shadow-lg transition-all duration-300 flex flex-col gap-2 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-white shrink-0">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </div>
                  <h3 className="font-display font-bold text-sm uppercase tracking-tight text-(--text-primary)">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-(--text-muted) leading-relaxed pl-8">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Execution */}
      <section className="section-padding bg-(--bg-secondary) border-t border-(--border-color)">
        <div className="container-apple flex flex-col gap-16">
          <div className="text-center flex flex-col gap-4">
            <span className="section-label text-violet-500 mx-auto">WORKFLOW</span>
            <h2 className="font-display font-800 text-3xl md:text-5xl uppercase tracking-tight text-(--text-primary)">
              APP DESIGN PIPELINE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {uiProcess.map((proc) => (
              <div
                key={proc.step}
                className="bg-(--bg-primary) p-8 rounded-3xl border border-(--border-color) hover:shadow-xl transition-all duration-300 flex flex-col gap-4 text-left"
              >
                <div className="font-display font-900 text-3xl text-violet-500/20">
                  {proc.step}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-bold text-xs tracking-wider text-violet-500 uppercase">
                    {proc.name}
                  </h3>
                  <p className="text-xs md:text-sm text-(--text-muted) leading-relaxed">
                    {proc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-white text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.4) 0%, transparent 60%)",
          }}
        />
        <div className="container-apple relative z-10 flex flex-col items-center gap-6">
          <h2 className="font-display font-900 text-3xl md:text-5xl uppercase tracking-tighter max-w-[650px]">
            CONSTRUCT A HIGHER UX STANDARD <span className="text-violet-400">TODAY?</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-[500px]">
            Let's sketch interactive screens and compile an atomic Figma layout to turn your idea into a functioning product.
          </p>
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 text-xs font-bold py-3.5 px-8 rounded-full border border-violet-500 bg-violet-600 text-white shadow-xl hover:scale-105 hover:bg-violet-500 transition-all duration-300 mt-4"
          >
            INITIATE APP DESIGN
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
