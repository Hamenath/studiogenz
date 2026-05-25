"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Check, Compass, Layers, Feather, Target } from "lucide-react";
import Link from "next/link";

const deliverables = [
  { title: "Core Logo Kit", desc: "Responsive vector logo marks, wordmarks, app icon versions, and lockups optimized for all backgrounds." },
  { title: "Typographic System", desc: "Selection of sleek display and sans-serif fonts with strict sizes, weights, and letter-spacing standards." },
  { title: "Harmonious Palette", desc: "Curated HSL tailored color schemes, defining core accents, deep grays, luxury light colors, and gradients." },
  { title: "Brand Style Guide", desc: "A comprehensive PDF guidelines document explaining margin rules, alignment guides, and strict usage errors." },
  { title: "Corporate Collaterals", desc: "Visual templates for digital pitch decks, social profile banners, retail packaging, and letterheads." },
];

const brandingProcess = [
  { step: "01", name: "MOODBOARDING", desc: "We compile editorial visual folders, abstract textures, typography trends, and competitor identities to form the aesthetic North Star." },
  { step: "02", name: "VECTOR SKETCHING", desc: "We sketch initial layout concepts, transferring drafts to Illustrator grids. We refine geometry curves to build timeless shapes." },
  { step: "03", name: "COLOR & SCALING", desc: "We test logo variations at 16px mobile icons and 60ft billboards, checking contrast ratio values to guarantee high readability." },
  { step: "04", name: "ASSET COMPILING", desc: "We export final assets (SVG, PNG, PDF guides), cataloging directories to ensure your development team has instant access." },
];

export default function BrandIdentityPage() {
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
            SERVICE PILLAR 01
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-900 text-[clamp(2.5rem,7vw,5.5rem)] leading-none uppercase tracking-tighter max-w-[900px]"
          >
            BRAND <span className="gradient-text-violet">IDENTITY</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-base md:text-xl leading-relaxed max-w-[650px] mt-2 font-sans"
          >
            We define the visual core of your company. Timeless shapes, tailored font systems, and HSL palettes engineered for modern digital presence.
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
              SHAPING UNIQUE BRAND SOULS
            </h2>
            <p className="text-sm md:text-base text-(--text-muted) leading-relaxed">
              Branding isn't just about drawing a logo; it's about claiming a visual signature. In a crowded digital world, we construct clean, bold assets that tell your story immediately. 
            </p>
            <p className="text-sm md:text-base text-(--text-muted) leading-relaxed">
              We look beyond fast visual trends, prioritizing mathematical geometry and high contrast ratios to ensure your identity remains powerful and recognizable for the next ten years.
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
              BRANDING EXECUTION STEPS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandingProcess.map((proc) => (
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
            ELEVATE YOUR BRAND <span className="text-violet-400">IDENTITY?</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-[500px]">
            Let's design a clean logo mark and outline modern brand rules to set a premium standard.
          </p>
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 text-xs font-bold py-3.5 px-8 rounded-full border border-violet-500 bg-violet-600 text-white shadow-xl hover:scale-105 hover:bg-violet-500 transition-all duration-300 mt-4"
          >
            INITIATE BRANDING
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
