"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Check, Share2 } from "lucide-react";
import Link from "next/link";

const deliverables = [
  { title: "Advertising Creative Sets", desc: "High-impact visual advertising layouts optimized for social platforms to drive conversions and minimize spend." },
  { title: "Art Direction & Theme Guides", desc: "Establishing strict photography tones, graphical accents, and copy grids to unify offline and online advertising." },
  { title: "Social Grid Design Kits", desc: "Dynamic templates for Instagram, LinkedIn, and Twitter feeds, ensuring your daily posts look cohesive and luxurious." },
  { title: "Digital Event Graphics", desc: "Sleek banners, invitations, and promotional overlays for webinar registrations, tech launches, and trade shows." },
  { title: "Launch Copywriting & Hooks", desc: "Short, punchy editorial copies, headers, and call-to-actions written to hook ambitious clients immediately." },
];

const campaignProcess = [
  { step: "01", name: "IDEATION & AUDIT", desc: "We analyze competitor ad formats and target demographic preferences, writing core hooks and visual themes." },
  { step: "02", name: "CREATIVE DRAFTS", desc: "We compile initial layout alternatives, sketching text grids and visual assets to establish high-impact layouts." },
  { step: "03", name: "CROSS-PLATFORM TUNING", desc: "We adapt final assets into dynamic sizes (vertical stories, landscape grids, square posts), reviewing color contrast." },
  { step: "04", name: "METRICS TRACKING", desc: "We coordinate with marketing leads during the initial launch, providing quick asset revisions to double click-through rates." },
];

export default function CampaignDesignPage() {
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
            SERVICE PILLAR 04
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-900 text-[clamp(2.5rem,7vw,5.5rem)] leading-none uppercase tracking-tighter max-w-[900px]"
          >
            CAMPAIGN <span className="gradient-text-violet">DESIGN</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-base md:text-xl leading-relaxed max-w-[650px] mt-2 font-sans"
          >
            We design unified visual campaigns. Conversion copywriting, high-engagement graphics, and custom ad kits optimized to establish absolute dominance.
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
              CAPTURING PURE VISUAL FOCUS
            </h2>
            <p className="text-sm md:text-base text-(--text-muted) leading-relaxed">
              In an age of infinite digital feeds, visual stagnation is terminal. We craft highly punchy, thumb-stopping marketing assets that stop scroll behaviors, transferring immediate values using gorgeous typography and clean visual contrast.
            </p>
            <p className="text-sm md:text-base text-(--text-muted) leading-relaxed">
              We compile highly organized Campaign kits, including visual rules, typography guides, and vector templates, ensuring your visual presence remains elegant and recognizable across offline and online channels.
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
              CAMPAIGN DESIGN WORKFLOW
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {campaignProcess.map((proc) => (
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
            LAUNCH A HIGH-CONVERSION <span className="text-violet-400">CAMPAIGN?</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-[500px]">
            Let's structure thumb-stopping creative sets and outline unified art directions to double your ad click-throughs.
          </p>
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 text-xs font-bold py-3.5 px-8 rounded-full border border-violet-500 bg-violet-600 text-white shadow-xl hover:scale-105 hover:bg-violet-500 transition-all duration-300 mt-4"
          >
            INITIATE CAMPAIGN
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
