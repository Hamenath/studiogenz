"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

const sections = [
  { id: "agreement", title: "1. Acceptance of Terms" },
  { id: "scope", title: "2. Scope of Services" },
  { id: "payments", title: "3. Flat-Fee Payments" },
  { id: "copyright", title: "4. Intellectual Property" },
  { id: "liabilities", title: "5. Limitation of Liability" },
  { id: "termination", title: "6. Term & Termination" },
];

export default function TermsOfServicePage() {
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
            TERMS OF <span className="gradient-text-violet">SERVICE</span>
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
            <section id="agreement" className="flex flex-col gap-4 border-b border-(--border-color) pb-8">
              <h2 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                1. ACCEPTANCE OF TERMS
              </h2>
              <p>
                By entering, browsing, or utilizing studiogenz.com, or by signing a creative flat-fee production agreement with Studio GENZ ("we", "us", or "our"), you agree to be formally bound by these Terms of Service.
              </p>
              <p>
                These terms govern all graphical assets, Figma component systems, vector logo packages, and custom Next.js frontend creations delivered to you. If you do not accept these mutual specifications, please do not engage our agency.
              </p>
            </section>

            <section id="scope" className="flex flex-col gap-4 border-b border-(--border-color) pb-8">
              <h2 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                2. SCOPE OF SERVICES
              </h2>
              <p>
                We provide creative branding visual systems, high-fidelity responsive web designs, touch interaction blueprints, and social marketing creatives.
              </p>
              <p>
                The exact deliverables, feedback loops, and timeline schedules will be specified in your individual Project Proposal Sheet. Any requests outside the defined outline will require an extra flat-fee amendment signed by both parties.
              </p>
            </section>

            <section id="payments" className="flex flex-col gap-4 border-b border-(--border-color) pb-8">
              <h2 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                3. FLAT-FEE PAYMENTS
              </h2>
              <p>
                Studio GENZ values transparent billing. We operate entirely on guaranteed per-project flat fees:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Deposit Payment:</strong> A 50% non-refundable onboarding deposit is required before visual research, layout sketching, or code production begins.
                </li>
                <li>
                  <strong>Final Milestone:</strong> The remaining 50% payment is due immediately upon draft approval, prior to vector handbook releases, Figma transfers, or web deployment handovers.
                </li>
                <li>
                  <strong>Late Handovers:</strong> Handovers delayed by client responsiveness may result in timeline rescheduling or minor system restart fees.
                </li>
              </ul>
            </section>

            <section id="copyright" className="flex flex-col gap-4 border-b border-(--border-color) pb-8">
              <h2 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                4. INTELLECTUAL PROPERTY
              </h2>
              <p>
                <strong>Handovers are complete and absolute.</strong>
              </p>
              <p>
                Upon final 50% milestone payment clearance:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>We transfer complete intellectual property rights, vector copyrights, and branding usage parameters to you.</li>
                <li>Studio GENZ retains the permanent right to display final graphics, responsive screens, and code previews in our public portfolio showcase, case study journals, and digital channels for marketing purposes.</li>
              </ul>
            </section>

            <section id="liabilities" className="flex flex-col gap-4 border-b border-(--border-color) pb-8">
              <h2 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                5. LIMITATION OF LIABILITY
              </h2>
              <p>
                We deliver design assets "as is". While we guarantee rigorous checks across modern Safari/iOS viewports and strict Lighthouse scores, we are not liable for:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Loss of corporate revenue, profits, or data arising out of server delays.</li>
                <li>Copyright infringements caused by client-supplied copywriting or asset assets.</li>
                <li>Bugs introduced by third-party developer teams after initial site deployment.</li>
              </ul>
            </section>

            <section id="termination" className="flex flex-col gap-4">
              <h2 className="font-display font-800 text-lg uppercase tracking-tight text-(--text-primary)">
                6. TERM & TERMINATION
              </h2>
              <p>
                Either party may terminate an ongoing creative contract with a written 7-day notice if the other party breaches defined scope guidelines. Upon termination, the client will pay for all completed work hours, and Studio GENZ will deliver partial asset files matching completed payments.
              </p>
              <p>
                If you have any questions, comments, or concerns about our terms of service, please reach out to us at <strong>hello@studiogenz.com</strong>.
              </p>
            </section>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
