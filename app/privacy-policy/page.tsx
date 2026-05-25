"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Sparkles, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

const sections = [
  { id: "intro", title: "1. Introduction" },
  { id: "data-collection", title: "2. Information We Collect" },
  { id: "data-use", title: "3. How We Use Information" },
  { id: "data-sharing", title: "4. Data Sharing & Storage" },
  { id: "user-rights", title: "5. Your Privacy Rights" },
  { id: "changes", title: "6. Changes To This Policy" },
];

export default function PrivacyPolicyPage() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

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
          <Link
            href="/legal"
            className="group flex items-center gap-2 text-[10px] font-bold text-violet-400 hover:text-violet-300 transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            BACK TO LEGAL CENTER
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-900 text-[clamp(2.5rem,7vw,5.5rem)] leading-none uppercase tracking-tighter max-w-[900px]"
          >
            PRIVACY <span className="gradient-text-violet">POLICY</span>
          </motion.h1>
          <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-violet-400" />
            LAST UPDATED: MAY 25, 2026
          </div>
        </div>
      </section>

      {/* Structured Legal Layout */}
      <section className="section-padding bg-(--bg-primary)">
        <div className="container-apple grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side: Sticky Table of Contents */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-6 p-8 rounded-3xl bg-(--bg-secondary) border border-(--border-color) text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-violet-500">
                CONTENTS
              </span>
              <nav className="flex flex-col gap-3">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => handleScrollTo(sec.id)}
                    className="text-left text-xs font-bold uppercase tracking-wider text-(--text-muted) hover:text-violet-500 transition-colors duration-200"
                  >
                    {sec.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Right Side: Long-form Editorial Legal Text */}
          <article className="lg:col-span-8 flex flex-col gap-10 text-left font-sans text-sm md:text-base leading-relaxed text-(--text-muted)">
            <section id="intro" className="flex flex-col gap-4 border-b border-(--border-color) pb-8">
              <h2 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                1. INTRODUCTION
              </h2>
              <p>
                At Studio GENZ ("we", "us", or "our"), privacy is a cornerstone of our agency values. We are fully committed to protecting the privacy and personal details of our website visitors, clients, and partners.
              </p>
              <p>
                This Privacy Policy document describes how we collect, store, utilize, and protect your information when you visit our website (studiogenz.com), complete our interactive contact and project briefing forms, or engage in digital brand and design consultations with our director.
              </p>
            </section>

            <section id="data-collection" className="flex flex-col gap-4 border-b border-(--border-color) pb-8">
              <h2 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                2. INFORMATION WE COLLECT
              </h2>
              <p>
                We collect personal information directly from you when you actively fill out our forms or initiate communication. This includes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Contact Credentials:</strong> Your name, professional email address, phone number, and company name when you fill out our contact panels.
                </li>
                <li>
                  <strong>Project Information:</strong> Project budget estimates, requested deliverables (Branding, Web design, App UI, Campaigns), and creative project briefs submitted in our form fields.
                </li>
                <li>
                  <strong>Technical Cookies:</strong> Analytical logs, anonymous browser settings, operating systems, session duration, and page view patterns tracked via our cookies.
                </li>
              </ul>
            </section>

            <section id="data-use" className="flex flex-col gap-4 border-b border-(--border-color) pb-8">
              <h2 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                3. HOW WE USE INFORMATION
              </h2>
              <p>
                Studio GENZ uses the information gathered to maintain, optimize, and launch premium branding services. Specifically, we utilize your details to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Review submitted creative briefs and contact you with accurate flat-fee proposals.</li>
                <li>Provide customer support, draft contract structures, and coordinate asset delivery schedules.</li>
                <li>Analyze website metrics using anonymous cookies to optimize layout speeds and transitions.</li>
                <li>Protect our assets against cyber attacks, spam requests, and fraud behaviors.</li>
              </ul>
            </section>

            <section id="data-sharing" className="flex flex-col gap-4 border-b border-(--border-color) pb-8">
              <h2 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                4. DATA SHARING & STORAGE
              </h2>
              <p>
                <strong>We never sell your personal information or visual assets to third-party brokers.</strong>
              </p>
              <p>
                Your details are stored in highly secure cloud servers under strict safety protocols. We share information only in limited scenarios:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>With trusted hosting and database providers required to keep studiogenz.com running smoothly.</li>
                <li>When legally mandated to comply with governmental regulations, court summons, or national security measures.</li>
              </ul>
            </section>

            <section id="user-rights" className="flex flex-col gap-4 border-b border-(--border-color) pb-8">
              <h2 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                5. YOUR PRIVACY RIGHTS
              </h2>
              <p>
                You retain complete ownership over your personal parameters and creative assets. Depending on your jurisdiction (e.g., GDPR, CCPA), you can contact our director to request:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Immediate access to all stored contact or budget documents in our systems.</li>
                <li>Immediate deletion or anonymization of your contact email, phone logs, and briefings.</li>
                <li>Revisions or corrections to any outdated contact details.</li>
              </ul>
            </section>

            <section id="changes" className="flex flex-col gap-4">
              <h2 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                6. CHANGES TO THIS POLICY
              </h2>
              <p>
                We reserve the right to revise this Privacy Policy at any time. When we make updates, we will change the "Last Updated" date visible at the top of the page. We recommend checking back regularly to stay updated.
              </p>
              <p>
                If you have any questions, comments, or concerns about our privacy guidelines, please reach out to us at <strong>hello@studiogenz.com</strong>.
              </p>
            </section>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
