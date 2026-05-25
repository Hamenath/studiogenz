"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Mail, MapPin, Sparkles } from "lucide-react";

const faqs = [
  {
    q: "WHAT IS YOUR TYPICAL PROJECT TIMELINE?",
    a: "We work with extreme focus and high speed. Core brand identity systems typically take 2-3 weeks, while bespoke interactive Next.js websites are delivered in 4-6 weeks from discovery to deployment.",
  },
  {
    q: "HOW DO YOU STRUCTURE PRICING?",
    a: "We believe in flat, per-project transparent pricing rather than unpredictable hourly billing. After defining your exact specs, we provide a guaranteed investment structure starting at $5K.",
  },
  {
    q: "DO YOU WORK WITH STARTUPS?",
    a: "Absolutely. We specialize in elevating high-growth tech startups. We craft high-end brand assets and pitch-ready product designs that help you secure seed funding and captivate users at launch.",
  },
  {
    q: "WHERE ARE YOU LOCATED AND HOW DO WE WORK?",
    a: "We are physically headquartered in Chennai, India, but operate entirely in the cloud. We collaborate asynchronously with bold, ambitious brands across San Francisco, London, Berlin, and Singapore.",
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-(--bg-primary) text-(--text-primary)">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-40 pb-12 overflow-hidden bg-black text-white">
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
            LET'S SYNC
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-900 text-[clamp(2.5rem,7vw,5.5rem)] leading-none uppercase tracking-tighter max-w-[900px]"
          >
            COLLABORATE WITH <span className="gradient-text-violet">GENZ</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-base md:text-xl leading-relaxed max-w-[650px] mt-2 font-sans"
          >
            Ready to redesign your core visual assets or construct a custom web engine? Drop your specs in the system, and our director will contact you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Main Interactive Contact Section */}
      <Contact />

      {/* FAQs Section */}
      <section className="section-padding bg-(--bg-secondary) border-t border-(--border-color)">
        <div className="container-apple grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* FAQ Left Header */}
          <div className="lg:col-span-4 flex flex-col gap-5 text-left">
            <span className="section-label text-violet-500 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Objections Answered
            </span>
            <h2 className="font-display font-800 text-3xl md:text-4xl uppercase tracking-tight text-(--text-primary)">
              FREQUENTLY <br />
              <span className="text-violet-500 italic pr-2">ASKED</span> QUESTIONS
            </h2>
            <p className="text-sm md:text-base text-(--text-muted) max-w-sm">
              Everything you need to know about our visual workflows, asset deliverables, billing structures, and production timelines.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-(--bg-primary) rounded-2xl border border-(--border-color) overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 group"
                  >
                    <span className="font-display font-bold text-xs md:text-sm uppercase tracking-tight text-(--text-primary) group-hover:text-violet-500 transition-colors">
                      {faq.q}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-(--bg-secondary) flex items-center justify-center text-(--text-muted) group-hover:text-violet-500 transition-colors">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-sm md:text-base text-(--text-muted) leading-relaxed border-t border-(--border-color)/5 pt-4 text-left font-sans">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
