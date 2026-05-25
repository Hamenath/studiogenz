"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

const sections = [
  { id: "what-are-cookies", title: "1. What Are Cookies" },
  { id: "how-we-use", title: "2. How We Use Cookies" },
  { id: "categories", title: "3. Cookie Categories" },
  { id: "managing-cookies", title: "4. Managing Preferences" },
];

export default function CookiePolicyPage() {
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
            COOKIE <span className="gradient-text-violet">POLICY</span>
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
            <section id="what-are-cookies" className="flex flex-col gap-4 border-b border-(--border-color) pb-8">
              <h2 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                1. WHAT ARE COOKIES
              </h2>
              <p>
                Cookies are small text documents saved directly on your desktop device or phone storage by websites you browse. They contain letters and numbers that record analytical data to speed up navigation and personalize layouts.
              </p>
              <p>
                Cookies do not give us access to your computer or private directories, and they are completely harmless to your device's security.
              </p>
            </section>

            <section id="how-we-use" className="flex flex-col gap-4 border-b border-(--border-color) pb-8">
              <h2 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                2. HOW WE USE COOKIES
              </h2>
              <p>
                Studio GENZ utilizes cookies to analyze web traffic, evaluate screen loading speeds, and optimize user interfaces.
              </p>
              <p>
                By utilizing cookies, we can record:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Whether you have closed our glow notification bars or cookie banner overlays.</li>
                <li>Anonymous website performance data, such as screen rendering delays, allowing us to maintain a high-performance visual experience.</li>
                <li>Visitor paths and active clicks to refine our responsive container sizing systems.</li>
              </ul>
            </section>

            <section id="categories" className="flex flex-col gap-4 border-b border-(--border-color) pb-8">
              <h2 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                3. COOKIE CATEGORIES
              </h2>
              <p>
                We divide cookies into two core operational classes:
              </p>
              <ul className="list-disc pl-5 space-y-4">
                <li>
                  <strong>Essential Cookies (First-party):</strong> These cookies are critical to maintain structural operations. Without them, specific layout components, contact forms, or custom dark-to-light theme transition memory will not work.
                </li>
                <li>
                  <strong>Performance & Analytics (Third-party):</strong> We utilize Google Analytics cookies to compile completely anonymous logs showing where web traffic arrives from and which portfolio items are clicked most, allowing us to optimize layouts.
                </li>
              </ul>
            </section>

            <section id="managing-cookies" className="flex flex-col gap-4">
              <h2 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                4. MANAGING PREFERENCES
              </h2>
              <p>
                By default, browsers accept cookies automatically. If you wish to disable cookies, you can adjust your browser settings (Chrome, Safari, Firefox) to decline cookie installations.
              </p>
              <p>
                Please note that blocking essential first-party cookies may prevent you from utilizing contact forms, and specific dynamic layouts may load with delayed speed.
              </p>
              <p>
                If you have any questions, comments, or concerns about our Cookie guidelines, please reach out to us at <strong>hello@studiogenz.com</strong>.
              </p>
            </section>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
