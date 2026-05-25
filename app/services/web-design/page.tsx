"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Check, Monitor } from "lucide-react";
import Link from "next/link";

const deliverables = [
  { title: "Bespoke Web Design", desc: "Custom designed homepage and inner layouts matching premium Apple-inspired light gradients, with no generic templates." },
  { title: "Responsive Grid Mapping", desc: "Design scaling rules optimized for massive 4K studio monitors, Standard 13-inch laptops, iPad viewports, and mobile screens." },
  { title: "Sleek Micro-Animations", desc: "Custom page triggers, paragraph scroll reveals, and elegant menu hover animations to draw client engagement." },
  { title: "Developer Handoff Prep", desc: "Structured design assets featuring full design scaling tokens, spacing numbers, styled components, and dynamic vector symbols." },
  { title: "Audit Optimizations", desc: "Rigorous image compression and layout specs to guarantee near-instantaneous speeds on all modern browsers." },
];

const designProcess = [
  { step: "01", name: "WIRE FRAMING & UX", desc: "We map out general section hierarchies, focusing on ease of user flow and placing high-converting CTA containers at strategic hotspots." },
  { step: "02", name: "EDITORIAL MOCKUPS", desc: "We design complete high-fidelity pages in Figma, applying premium display fonts, subtle glows, and clean container layouts." },
  { step: "03", name: "ANIMATION DESIGN", desc: "We design micro-interaction timelines (GSAP / Framer Motion directives) to decide precisely how pages reveal themselves during scroll." },
  { step: "04", name: "QUALITY ASSURANCE", desc: "We review screen variations across Safari, Chrome, and iOS viewports, checking contrast values and verifying overall design integrity." },
];

export default function WebDesignPage() {
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
            SERVICE PILLAR 02
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-900 text-[clamp(2.5rem,7vw,5.5rem)] leading-none uppercase tracking-tighter max-w-[900px]"
          >
            WEB <span className="gradient-text-violet">DESIGN</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-base md:text-xl leading-relaxed max-w-[650px] mt-2 font-sans"
          >
            We engineer high-performance editorial web experiences. Fluid layouts, micro-animations, and clean typography built on the highest responsive standards.
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
              WHERE FORM MERGES WITH SPEED
            </h2>
            <p className="text-sm md:text-base text-(--text-muted) leading-relaxed">
              A premium website is the ultimate digital flagship of any modern brand. We construct web pages that act as active narrative experiences, guiding users through elegant layouts while keeping load times under a second.
            </p>
            <p className="text-sm md:text-base text-(--text-muted) leading-relaxed">
              We focus on premium visual balance. Utilizing Orbitron font headlines, Inter paragraph text, responsive layout files, and subtle radial violet glow variables to create an immersive, luxury visual stamp.
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
              WEB DESIGN WORKFLOW
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {designProcess.map((proc) => (
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
            BUILD YOUR Bespoke FLAGSHIP <span className="text-violet-400">WEBSITE?</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-[500px]">
            Let's design a high-fidelity cinematic web interface optimized to convert visitors into active leads.
          </p>
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 text-xs font-bold py-3.5 px-8 rounded-full border border-violet-500 bg-violet-600 text-white shadow-xl hover:scale-105 hover:bg-violet-500 transition-all duration-300 mt-4"
          >
            INITIATE WEB DESIGN
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
