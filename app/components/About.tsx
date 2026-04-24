'use client'

import { useRef } from 'react'
import { Check } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

const points = [
  'Branding & Identity',
  'Website Design',
  'Social Media Content',
  'Video Editing'
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} id="about" className="section-padding bg-(--bg-primary) relative overflow-hidden transition-colors duration-500">
      <div className="container-apple relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-left flex flex-col gap-8 max-w-[500px]"
          >
            <motion.div variants={itemVariants} className="section-label text-violet-500">Our Story</motion.div>
            <motion.h2 variants={itemVariants} className="font-display font-900 text-[clamp(2.4rem,6vw,3.5rem)] leading-none tracking-tight text-(--text-primary) uppercase">
              Building the Future of Digital Brands.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base md:text-[18px] text-(--text-muted) leading-relaxed">
              We help bold businesses evolve through clean design, strategic branding, and rapid execution. Our focus is clarity.
            </motion.p>

            {/* Bullet Points */}
            <motion.div variants={itemVariants} className="space-y-4">
              {points.map((pt) => (
                <div key={pt} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-sm md:text-base font-bold text-(--text-primary) uppercase tracking-tight">
                    {pt}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side: Large Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[480px] aspect-square rounded-3xl overflow-hidden shadow-2xl border border-(--border-color) bg-(--bg-secondary)">
              <img 
                src="/genzlogo.jpeg" 
                alt="Studio GENZ Official" 
                className="w-full h-full object-cover transition-all duration-500"
              />
              {/* Subtle Ambient Glow */}
              <div className="absolute inset-0 pointer-events-none bg-radial-at-tr from-violet-500/10 to-transparent" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

