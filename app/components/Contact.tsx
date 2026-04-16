'use client'

import { useRef, useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { Mail, MapPin, ArrowRight } from 'lucide-react'

const projectTypes = [
  'Branding & Identity',
  'Web Design',
  'UI/UX Design',
  'Content Strategy',
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

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', type: '', message: '' })

  return (
    <section ref={containerRef} id="contact" className="relative section-padding bg-black text-white overflow-hidden border-t border-white/5">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(139, 92, 246, 0.1) 0%, transparent 70%)' }} />

      <div className="container-apple relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-8 max-w-[400px]"
          >
            <motion.div variants={itemVariants} className="section-label text-violet-400">Connect</motion.div>
            <motion.h2 variants={itemVariants} className="font-display font-900 text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-tighter uppercase">
              Let's <span className="text-violet-400">Work</span> Together.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-400 text-lg leading-relaxed">
              Tell us about your project. We'll get back quickly.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all duration-300 ease-out">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-violet-400 tracking-[0.2em] uppercase mb-0.5">Email Us</p>
                  <p className="text-sm font-bold tracking-tight text-white">contact@studiogenz.com</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all duration-300 ease-out">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-violet-400 tracking-[0.2em] uppercase mb-0.5">Our Base</p>
                  <p className="text-sm font-bold tracking-tight uppercase text-white">Tamil Nadu, India</p>
                </div>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-[11px] font-bold text-white/20 tracking-widest uppercase mt-8 pt-8 border-t border-white/10">
              Fast response. Clear process.
            </motion.p>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="w-full lg:max-w-xl"
          >
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-300 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-300 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <input 
                    type="tel" 
                    placeholder="Phone (Optional)"
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-300 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <select 
                    value={formState.type}
                    onChange={e => setFormState(p => ({ ...p, type: e.target.value }))}
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-300 text-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-black">Project Type</option>
                    {projectTypes.map(type => (
                      <option key={type} value={type} className="bg-neutral-900 text-white">{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <textarea 
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-300 text-sm resize-none"
                />
              </div>

              <button className="w-full py-5 rounded-full bg-violet-600 hover:bg-white hover:text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 ease-out hover:scale-[1.02] shadow-xl shadow-violet-500/10">
                <span>Send Message</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
