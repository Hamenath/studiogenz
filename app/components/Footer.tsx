"use client";

import { ArrowUpRight } from "lucide-react";

// Custom Brand Icons for Lucide compatibility
const Instagram = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const Twitter = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const Linkedin = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

import Link from "next/link";

const links = {
  Company: [
    { name: "About", path: "/about" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact Us", path: "/#contact" },
  ],
  Services: [
    { name: "Brand Identity", path: "/services/brand-identity" },
    { name: "Web Design", path: "/services/web-design" },
    { name: "App UI", path: "/services/app-ui" },
    { name: "Campaign Design", path: "/services/campaign-design" },
  ],
  Legal: [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms-of-service" },
    { name: "Cookie Policy", path: "/cookie-policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Ambient Violet Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(139, 92, 246, 0.2) 0%, transparent 75%)",
        }}
      />

      <div className="container-apple relative z-10">
        {/* Footer nav */}
        <div className="py-10 sm:py-14 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1 v-rhythm-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                <img
                  src="/genzlogo.jpeg"
                  alt="GZ Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-display font-900 text-lg tracking-tight">
                <b>
                  GENZ<span className="text-blue-500"> STUDIO </span>
                </b>
              </span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed max-w-[200px] pt-3">
              A next-gen creative agency for the bold and ambitious.
            </p>
            <div className="flex gap-4 pt-4">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/_.genz_studio._?igsh=NWlwemQ2NWx0dWQ2", label: "Instagram" },
                { Icon: Twitter, href: "https://x.com/HamenathOffi", label: "Twitter" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/hamenathbdesigner", label: "LinkedIn" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/30 hover:text-white transition-colors"
                >
                  <s.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <p className="text-[10px] font-900 tracking-widest uppercase text-blue-500 mb-6">
                {section === "Services" ? (
                  <Link href="/services" className="hover:text-white transition-colors">
                    {section}
                  </Link>
                ) : section === "Legal" ? (
                  <Link href="/legal" className="hover:text-white transition-colors">
                    {section}
                  </Link>
                ) : (
                  section
                )}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className="text-[13px] font-500 text-white/40 hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-[10px] font-700 text-white/20 uppercase tracking-widest"
            suppressHydrationWarning
          >
            © {new Date().getFullYear()} STUDIO GENZ. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] font-700 text-white/20 uppercase tracking-widest">
            DESIGNED & BUILT IN CHENNAI, INDIA 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
