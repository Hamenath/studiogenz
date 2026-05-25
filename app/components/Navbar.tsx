'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Work', href: '/#portfolio' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')
  const navRef = useRef<HTMLElement>(null)
  
  const pathname = usePathname()
  const router = useRouter()

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  // 1. Detect Scroll Position for Style Change (Trigger at 80px)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check Admin Login State
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkAuth = () => {
        setIsAdminLoggedIn(localStorage.getItem('studiogenz_admin_auth') === 'true')
      }
      checkAuth()
      window.addEventListener('studiogenz_admin_auth_change', checkAuth)
      window.addEventListener('storage', checkAuth)
      return () => {
        window.removeEventListener('studiogenz_admin_auth_change', checkAuth)
        window.removeEventListener('storage', checkAuth)
      }
    }
  }, [])

  // 2. Scroll Spy Logic for Active Menu
  useEffect(() => {
    if (pathname !== '/') {
      setActiveLink('')
      return
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          const active = navLinks.find(link => link.href.endsWith(`#${id}`));
          if (active) setActiveLink(active.label);
        }
      });
    }, observerOptions);

    // Observe sections
    navLinks.forEach(link => {
      const hash = link.href.includes('#') ? link.href.split('#')[1] : '';
      if (hash) {
        const section = document.getElementById(hash);
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
  }, [pathname]);


  const scrollTo = (href: string, label: string) => {
    setActiveLink(label)
    setMobileMenuOpen(false)
    
    const hash = href.includes('#') ? href.split('#')[1] : '';
    
    if (pathname !== '/') {
      router.push(href)
      return
    }
    
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    const el = document.getElementById(hash)
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
            className={`pointer-events-auto flex items-center justify-between rounded-full border transition-all duration-300 ease-in-out px-6 py-3 shadow-2xl ${
              isScrolled 
                ? 'bg-white/80 backdrop-blur-2xl text-black border-black/10 shadow-xl scale-[1.01]' 
                : 'bg-[#E6E5E0] text-black border-transparent'
            }`}
          >
            {/* Logo Section */}
            <a 
              href="/"
              onClick={(e) => { e.preventDefault(); scrollTo('/', 'Home'); }}
              className="group flex items-center gap-3 decoration-none"
            >
              <div className={`w-9 h-9 rounded-full overflow-hidden border transition-all duration-300 flex items-center justify-center group-hover:scale-110 group-hover:border-violet-500/50 ${
                isScrolled ? 'border-black/5 bg-black/5' : 'border-black/10 bg-white/50'
              }`}>
                <img src="/genzlogo.jpeg" alt="GZ Logo" className="w-full h-full object-cover" />
              </div>
              <span className={`font-display font-bold text-sm tracking-widest hidden sm:block transition-colors group-hover:text-violet-500 text-black`}>
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
                      : 'text-black/80 font-medium hover:text-violet-500'
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
            <div className="flex items-center gap-3">
              {isAdminLoggedIn ? (
                <a 
                  href="/admin"
                  className="group relative hidden sm:inline-flex items-center gap-2 text-[11px] font-bold py-2.5 px-5 rounded-full border border-violet-500/30 bg-violet-500/5 hover:bg-violet-500/10 text-violet-600 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  CRM ACTIVE
                </a>
              ) : (
                <a 
                  href="/admin"
                  className="group relative hidden sm:inline-flex items-center gap-2 text-[11px] font-bold py-2.5 px-5 rounded-full border border-black/10 hover:border-violet-500/40 text-black hover:text-violet-600 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                >
                  CRM PANEL
                </a>
              )}
              <a 
                href="/#contact"
                onClick={(e) => { e.preventDefault(); scrollTo('/#contact', 'Contact'); }}
                className="group relative hidden sm:inline-flex items-center gap-2 text-[11px] font-bold py-2.5 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] border bg-black text-white border-transparent"
              >
                LET'S TALK
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${
                  isScrolled 
                    ? 'bg-black/5 border-black/10 text-black hover:bg-black/10' 
                    : 'bg-black/5 border-black/5 text-black hover:bg-black/10'
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
            
            {isAdminLoggedIn ? (
              <a 
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold text-violet-400 flex items-center gap-2 transition-all duration-300"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                CRM ACTIVE
              </a>
            ) : (
              <a 
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold text-white/80 hover:text-violet-400 transition-all duration-300"
              >
                CRM PANEL
              </a>
            )}
            
            <button 
              onClick={(e) => { e.preventDefault(); scrollTo('/#contact', 'Contact'); }}
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
