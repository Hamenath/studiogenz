'use client'

import { useRef } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  
  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const headingWords = "Innovate & Grow".split(" ")

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="dark-theme relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black px-6"
    >
      
      {/* LAYER 1: Cinematic Ground (z-0) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{ 
          background: 'radial-gradient(125% 125% at 50% 10%, #000 40%, #7c3aed 100%)' 
        }} 
      />

      {/* LAYER 2: Editorial Content (z-10) */}
      <div className="relative z-10 w-full max-w-[800px] flex flex-col items-center text-center">
        
        {/* Top Tag: Capsule Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-[18px] group cursor-pointer inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          <div className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500"></span>
          </div>
          <span className="text-[10px] font-800 text-white/50 uppercase tracking-[0.2em]">Now Accepting Projects</span>
        </motion.div>

        {/* Heading: Word-by-word Reveal */}
        <div className="mb-[12px] flex gap-x-3 md:gap-x-5 flex-wrap justify-center overflow-hidden py-1">
           {headingWords.map((word, i) => (
             <motion.h1 
               key={i}
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{
                 delay: 0.1 + (i * 0.12),
                 duration: 0.7,
                 ease: [0.215, 0.61, 0.355, 1] // Quad easeOut
               }}
               className="font-display font-900 text-[clamp(2.5rem,8vw,4.5rem)] leading-none tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-violet-400 to-violet-700 uppercase"
             >
               {word}
             </motion.h1>
           ))}
        </div>

        {/* Subheading: Fade + Slide */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="mb-[12px] max-w-[750px]"
        >
          <h2 className="text-violet-400 font-display font-bold text-xl md:text-3xl lg:text-4xl uppercase tracking-tight leading-tight">
            Scale Your Business Through Innovation
          </h2>
        </motion.div>

        {/* Description: 1 Line Fade */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="max-w-[650px] mb-[40px]"
        >
          <p className="text-white/70 text-[14px] md:text-[17px] font-medium leading-relaxed">
            Helping startups grow through design and strategy.
          </p>
        </motion.div>

        {/* CTA Buttons: Scale + Fade */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
          className="flex flex-row items-center justify-center"
        >
          <a 
            href="#contact" 
            className="group inline-flex items-center gap-2 bg-linear-to-r from-violet-600 to-violet-800 hover:from-violet-500 hover:to-violet-700 text-white text-[11px] font-900 px-8 py-4.5 rounded-full transition-all duration-400 hover:scale-[1.03] shadow-[0_15px_30px_rgba(124,58,237,0.2)] uppercase tracking-[0.2em]"
          >
            Start Scaling Today
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

      </div>

      {/* Scroll to Explore - Enhanced Visibility & Animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group hover:opacity-100 transition-opacity duration-300"
      >
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-violet-400" />
        </motion.div>
      </motion.div>

    </section>
  )
}
