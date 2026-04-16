'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')
  const navRef = useRef<HTMLElement>(null)

  // 1. Detect Scroll Position for Style Change (Trigger at 80px)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 2. Scroll Spy Logic for Active Menu
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          const active = navLinks.find(link => link.href === `#${id}`);
          if (active) setActiveLink(active.label);
        }
      });
    }, observerOptions);

    // Observe sections
    navLinks.forEach(link => {
      if (link.href !== '#') {
        const section = document.querySelector(link.href);
        if (section) observer.observe(section);
      }
    });

    // Handle 'Home' state when near top
    const handleHomeState = () => {
      if (window.scrollY < 200) {
        setActiveLink('Home');
      }
    };
    window.addEventListener('scroll', handleHomeState);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleHomeState);
    };
  }, []);

  useGSAP(() => {
    if (!navRef.current) return
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
    )
  }, [])

  const scrollTo = (href: string, label: string) => {
    setActiveLink(label)
    setMobileMenuOpen(false)
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.querySelector(href)
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-4 md:p-6 transition-all duration-300">
        <div className="max-w-[1200px] mx-auto">
          <nav 
            ref={navRef}
            className={`pointer-events-auto flex items-center justify-between rounded-full border transition-all duration-300 ease-in-out opacity-0 px-6 py-3 shadow-2xl ${
              isScrolled 
                ? 'bg-white/80 backdrop-blur-2xl text-black border-black/5 shadow-xl scale-[1.01]' 
                : 'bg-white/10 backdrop-blur-xl text-white border-white/10'
            }`}
          >
            {/* Logo Section */}
            <a 
              href="#"
              onClick={(e) => { e.preventDefault(); scrollTo('#', 'Home'); }}
              className="group flex items-center gap-3 decoration-none"
            >
              <div className={`w-9 h-9 rounded-full overflow-hidden border transition-all duration-300 flex items-center justify-center group-hover:scale-110 group-hover:border-violet-500/50 ${
                isScrolled ? 'border-black/5 bg-black/5' : 'border-white/20 bg-white/5'
              }`}>
                <img src="/genzlogo.jpeg" alt="GZ Logo" className="w-full h-full object-cover" />
              </div>
              <span className={`font-display font-bold text-sm tracking-widest hidden sm:block transition-colors group-hover:text-violet-500 ${
                isScrolled ? 'text-black' : 'text-white'
              }`}>
                STUDIO GENZ
              </span>
            </a>

            {/* Nav Links - Center */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href, link.label); }}
                  className={`relative text-[13px] transition-all duration-300 group py-1 ${
                    activeLink === link.label 
                      ? 'text-violet-500 font-bold' 
                      : (isScrolled ? 'text-black/80 font-medium hover:text-violet-500' : 'text-white/90 font-medium hover:text-violet-500')
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Premium Underline Animation */}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-violet-500 transition-all duration-300 ease-out ${
                    activeLink === link.label ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </a>
              ))}
            </div>

            {/* CTA & Mobile Menu Trigger */}
            <div className="flex items-center gap-4">
              <a 
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo('#contact', 'Contact'); }}
                className={`group relative hidden sm:inline-flex items-center gap-2 text-[11px] font-bold py-2.5 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] border ${
                  isScrolled 
                    ? 'bg-black text-white border-black/5' 
                    : 'bg-black text-white border-white/5'
                }`}
              >
                LET'S TALK
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${
                  isScrolled 
                    ? 'bg-black/5 border-black/10 text-black hover:bg-black/10' 
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300" 
            onClick={() => setMobileMenuOpen(false)}
          />
          
          <div className="absolute top-4 right-4 left-4 p-8 rounded-3xl bg-neutral-900/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-6 items-center transition-all duration-300 animate-in fade-in zoom-in">
            <div className="flex justify-between w-full items-center mb-4">
               <span className="font-display font-bold text-sm tracking-widest text-violet-400">STUDIO GENZ</span>
               <button onClick={() => setMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white">
                 <X size={20} />
               </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href, link.label); }}
                className={`text-2xl font-bold transition-all duration-300 ${
                  activeLink === link.label ? 'text-violet-400 scale-110' : 'text-white hover:text-violet-400'
                }`}
              >
                {link.label}
              </a>
            ))}
            
            <button 
              onClick={(e) => { e.preventDefault(); scrollTo('#contact', 'Contact'); }}
              className="mt-6 w-full text-center bg-violet-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-violet-500/20 hover:bg-violet-500 transition-colors"
            >
              LET'S TALK
            </button>
          </div>
        </div>
      )}
    </>
  )
}
