"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Compass, Monitor, Smartphone, Share2, ArrowRight, Zap, Palette, Layers, Award } from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    icon: Compass,
    title: "Brand Identity",
    path: "/services/brand-identity",
    desc: "We shape raw ideas into iconic, memorable brand names, vectors, and style sheets that communicate core visions immediately.",
    deliverables: ["Visual Logo Kits", "Palette & Typography Systems", "Brand Style Guidelines", "Vector Assets & Collaterals"],
    color: "from-violet-500/20 to-purple-500/5",
  },
  {
    icon: Monitor,
    title: "Web Design",
    path: "/services/web-design",
    desc: "We design editorial, super-fluid web layouts optimized for desktop displays and mobile touchpoints, maintaining absolute speed.",
    deliverables: ["Responsive UI layouts", "Cinematic Page Transitions", "SEO & Speed Optimizations", "Premium Custom Mockups"],
    color: "from-blue-500/20 to-indigo-500/5",
  },
  {
    icon: Smartphone,
    title: "App UI",
    path: "/services/app-ui",
    desc: "We prototype conversion-driven mobile interactions, software dashboard flows, and atomic Figma libraries for smooth development.",
    deliverables: ["Figma Design Systems", "Interactive Wireframes", "SaaS Dashboard Layouts", "App Store Graphic Assets"],
    color: "from-fuchsia-500/20 to-pink-500/5",
  },
  {
    icon: Share2,
    title: "Campaign Design",
    path: "/services/campaign-design",
    desc: "We produce gorgeous, thumb-stopping marketing creatives and unified editorial templates to maximize click-through rates.",
    deliverables: ["Art Direction & Copy", "Social Grid Formatting", "Marketing Banners & Assets", "High-Engagement Visuals"],
    color: "from-rose-500/20 to-orange-500/5",
  },
];

const processes = [
  { step: "01", name: "DISCOVERY & BRIEFING", desc: "We sit down to define exact project ambitions, dissect competitor visual styles, and compile mood boards that outline the creative trajectory." },
  { step: "02", name: "VISUAL STRATEGY", desc: "We construct wireframes, typographic mockups, and palette iterations to establish the initial design system, making adjustments based on real feedback." },
  { step: "03", name: "PRODUCTION & EDITORIALS", desc: "We refine every logo anchor point, construct responsive Figma layouts, and write micro-interactions, building assets with rigorous quality control." },
  { step: "04", name: "LAUNCH & HANDOVER", desc: "We deploy Next.js pages or hand over Figma system libraries and vector packages. We check files against strict performance check sheets." },
];

export default function ServicesPage() {
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
            OUR FOCUS
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-900 text-[clamp(2.5rem,7vw,5.5rem)] leading-none uppercase tracking-tighter max-w-[900px]"
          >
            CREATIVE SERVICE <span className="gradient-text-violet">PILLARS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-base md:text-xl leading-relaxed max-w-[650px] mt-2 font-sans"
          >
            We merge design, front-end engineering, and marketing strategy under one cohesive roof. Discover our structured visual solutions.
          </motion.p>
        </div>
      </section>

      {/* Core Pillars Grid */}
      <section className="section-padding bg-(--bg-primary)">
        <div className="container-apple flex flex-col gap-16">
          <div className="text-center flex flex-col gap-4">
            <span className="section-label text-violet-500 mx-auto">CAPABILITIES</span>
            <h2 className="font-display font-800 text-3xl md:text-5xl uppercase tracking-tight text-(--text-primary)">
              THE FOUR CORNERSTONES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  className={`glass-panel rounded-3xl p-8 border border-(--border-color) hover:shadow-2xl hover:border-violet-500/20 bg-gradient-to-br ${p.color} transition-all duration-300 flex flex-col justify-between gap-8 text-left`}
                >
                  <div className="flex flex-col gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-(--border-color) flex items-center justify-center text-violet-600 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="font-display font-800 text-xl md:text-2xl uppercase tracking-tight text-(--text-primary)">
                        {p.title}
                      </h3>
                      <p className="text-sm md:text-base text-(--text-muted) leading-relaxed">
                        {p.desc}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <span className="text-[10px] font-bold text-violet-500 uppercase tracking-widest">
                        Core Deliverables:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {p.deliverables.map((del) => (
                          <div key={del} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" />
                            <span className="text-xs font-bold text-(--text-primary) uppercase tracking-tight">
                              {del}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={p.path}
                    className="group relative inline-flex items-center justify-center gap-2 text-[10px] font-bold py-3 px-6 rounded-full border bg-black text-white border-transparent hover:bg-violet-600 hover:scale-[1.03] transition-all duration-300 w-max"
                  >
                    EXPLORE PILLAR
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Production Pipeline / Workflow */}
      <section className="section-padding bg-(--bg-secondary) border-t border-(--border-color)">
        <div className="container-apple flex flex-col gap-16">
          <div className="text-center flex flex-col gap-4">
            <span className="section-label text-violet-500 mx-auto">METHODOLOGY</span>
            <h2 className="font-display font-800 text-3xl md:text-5xl uppercase tracking-tight text-(--text-primary)">
              OUR PRODUCTION WORKFLOW
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processes.map((proc, idx) => (
              <motion.div
                key={proc.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative bg-(--bg-primary) p-8 rounded-3xl border border-(--border-color) hover:shadow-xl transition-all duration-300 flex flex-col gap-4 text-left"
              >
                <div className="font-display font-900 text-3xl text-violet-500/20 absolute top-6 right-6 select-none">
                  {proc.step}
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <h3 className="font-display font-bold text-xs tracking-wider text-violet-500 uppercase">
                    {proc.name}
                  </h3>
                  <p className="text-xs md:text-sm text-(--text-muted) leading-relaxed">
                    {proc.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitments */}
      <section className="section-padding bg-(--bg-primary)">
        <div className="container-apple flex flex-col gap-12 lg:flex-row items-center lg:gap-24">
          <div className="lg:w-1/2 flex flex-col gap-6 text-left">
            <span className="section-label text-violet-500">QUALITY BENCHMARK</span>
            <h2 className="font-display font-800 text-3xl md:text-4.5rem leading-none uppercase tracking-tight text-(--text-primary)">
              BUILT FOR ELITE PERFORMANCE
            </h2>
            <p className="text-sm md:text-base text-(--text-muted) leading-relaxed max-w-lg font-sans">
              We design premium mockups that fit right in with Apple's aesthetic standards, while developing web layouts that hit a 100 on desktop audit scores. No shortcuts.
            </p>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {[
              { icon: Zap, title: "Lighthouse 100", desc: "Our web creations run on lightweight layouts, ensuring near-instantaneous load times." },
              { icon: Palette, title: "Pixel Perfect", desc: "No fuzzy vector nodes. All brand identity components are drawn inside vector coordinate grids." },
              { icon: Layers, title: "Figma Standards", desc: "We build layouts with strictly named components, variables, auto-layouts, and responsive guidelines." },
              { icon: Award, title: "Cultural Stamp", desc: "Our creative direction balances clean minimalism with gen-z energy to stand out immediately." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-6 rounded-2xl bg-(--bg-secondary) border border-(--border-color) flex flex-col gap-4 text-left">
                  <div className="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-display font-bold text-sm uppercase tracking-tight text-(--text-primary)">
                      {item.title}
                    </h4>
                    <p className="text-xs text-(--text-muted) leading-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
