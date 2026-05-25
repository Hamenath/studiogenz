'use client'

import { useRef } from 'react'
import { motion, Variants } from 'framer-motion'

const testimonials = [
  {
    initials: 'DH',
    name: 'Dharvin',
    role: 'Student, AI&DS',
    quote: 'The AI&DS farewell photo frame designed by Studio GENZ is super detailed. An absolute masterpiece!',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    initials: 'SK',
    name: 'Srinivasa K',
    role: 'CEO, VEXATECH',
    quote: 'We got logo, website, everything in few weeks. Quality was top level.',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    initials: 'AB',
    name: 'Arjun Balaji',
    role: 'Founder, LUNEWISE',
    quote: 'They understand modern design perfectly. Everything looked clean and premium.',
    color: 'bg-green-100 text-green-600'
  }
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
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

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-(--bg-primary) relative overflow-hidden transition-colors duration-500">
      <div className="container-apple relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 flex flex-col gap-4"
        >
          <div className="section-label text-violet-500 mx-auto">Feedback</div>
          <h2 className="font-display font-900 text-[clamp(1.8rem,4vw,3rem)] uppercase tracking-tighter text-(--text-primary)">
            Trusted by <span className="text-violet-500">Innovators.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="group relative flex flex-col p-10 rounded-3xl bg-(--bg-secondary) border border-(--border-color) shadow-2xl transition-all duration-300 ease-out h-full text-center hover:bg-(--bg-primary)"
            >
              {/* Profile Bar */}
              <div className="flex flex-col items-center mb-6">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-display font-900 text-sm tracking-tighter mb-4 shadow-lg ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-display font-900 text-base uppercase tracking-tight text-(--text-primary)">{t.name}</h4>
                  <p className="text-[10px] font-bold text-(--text-muted) uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-6 justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <div className="flex-1">
                <p className="text-(--text-muted) text-base leading-relaxed font-medium max-w-xs mx-auto italic">
                  "{t.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>

  )
}
