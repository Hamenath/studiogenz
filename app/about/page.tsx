"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About from "../components/About";
import { motion } from "framer-motion";
import { Compass, Flame, Shield, Trophy } from "lucide-react";

const stats = [
  { value: "50+", label: "Brands Elevated" },
  { value: "15+", label: "Creative Awards" },
  { value: "100%", label: "Rapid Execution" },
  { value: "8+", label: "Global Markets" },
];

const values = [
  {
    icon: Compass,
    title: "Uncompromising Vision",
    desc: "We look beyond trends to craft brand structures and digital platforms that stand the test of time and capture pure emotional intent.",
  },
  {
    icon: Flame,
    title: "Bold Aesthetics",
    desc: "We make products that refuse to blend in. Vibrant palettes, elegant typography, and premium micro-interactions form our visual signature.",
  },
  {
    icon: Shield,
    title: "Clarity Over Complexity",
    desc: "Minimalism isn't just about empty space; it's about making the essential elements sing. We cut the clutter to bring absolute brand focus.",
  },
  {
    icon: Trophy,
    title: "Velocity of Delivery",
    desc: "We understand that digital trends move at light speed. We combine rapid iteration and strict standards to launch premium websites in weeks, not months.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-(--bg-primary) text-(--text-primary)">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-black text-white">
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
            WHO WE ARE
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-900 text-[clamp(2.5rem,8vw,5.5rem)] leading-none uppercase tracking-tighter max-w-[900px]"
          >
            THE NEW DIGITAL <span className="gradient-text-violet">VANGUARD</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-base md:text-xl leading-relaxed max-w-[650px] mt-2 font-sans"
          >
            Studio GENZ is an editorial-first creative agency designed for modern businesses. We design brand identities, craft cinematic interfaces, and build experiences that define cultures.
          </motion.p>
        </div>
      </section>

      {/* Main Brand Section */}
      <About />

      {/* Stats Section */}
      <section className="py-20 bg-(--bg-secondary) border-y border-(--border-color)">
        <div className="container-apple">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center flex flex-col gap-2"
              >
                <div className="font-display font-900 text-4xl md:text-6xl text-violet-600">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-(--text-muted)">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values / Philosophy */}
      <section className="section-padding bg-(--bg-primary)">
        <div className="container-apple flex flex-col gap-16">
          <div className="text-center flex flex-col gap-4">
            <span className="section-label text-violet-500 mx-auto">OUR DNA</span>
            <h2 className="font-display font-800 text-3xl md:text-5xl uppercase tracking-tight text-(--text-primary)">
              THE PHILOSOPHY WE WEAR
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="glass-panel rounded-3xl p-8 md:p-10 border border-(--border-color) hover:shadow-xl hover:border-violet-500/20 hover:bg-white transition-all duration-300 group flex flex-col gap-5 text-left"
                >
                  <div className="w-12 h-12 rounded-2xl bg-violet-600/10 flex items-center justify-center text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display font-bold text-lg uppercase tracking-tight text-(--text-primary)">
                      {v.title}
                    </h3>
                    <p className="text-sm md:text-base text-(--text-muted) leading-relaxed">
                      {v.desc}
                    </p>
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
