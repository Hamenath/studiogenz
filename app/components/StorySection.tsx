'use client'

import { useRef } from 'react'
import { motion, Variants } from 'framer-motion'

const steps = [
  {
    id: '01',
    title: 'Discover',
    desc: 'Deep strategy to uncover your brand soul.'
  },
  {
    id: '02',
    title: 'Create',
    desc: 'Cinematic design and pixel-perfect builds.'
  },
  {
    id: '03',
    title: 'Launch',
    desc: 'Smooth deployment and iteration for growth.'
  }
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
}

export default function StorySection() {
  return (
    <section id="how-it-works" className="section-padding bg-black relative overflow-hidden">
      <div className="container-apple relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24 flex flex-col gap-4"
        >
          <div className="section-label text-violet-400 mx-auto">Process</div>
          <h2 className="font-display font-900 text-[clamp(1.8rem,4vw,2.5rem)] uppercase tracking-tighter text-white">
            Our Creative <span className="text-violet-400">Process.</span>
          </h2>
        </motion.div>

        {/* Horizontal Steps Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20"
        >
          
          {/* Subtle Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[22px] left-0 w-full h-px bg-white/10 z-0" />

          {steps.map((step) => (
            <motion.div key={step.id} variants={itemVariants} className="relative z-10 group">
              {/* Step indicator */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
                
                {/* Number Circle */}
                <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center font-display font-900 text-xs mb-2 shadow-xl group-hover:scale-110 group-hover:bg-violet-500 group-hover:text-white transition-all duration-300 ease-out">
                  {step.id}
                </div>

                {/* Title */}
                <h3 className="font-display font-900 text-xl uppercase tracking-tight text-white">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-400 font-medium leading-relaxed max-w-[240px]">
                  {step.desc}
                </p>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
