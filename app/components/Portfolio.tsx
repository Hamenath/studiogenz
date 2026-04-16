'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { motion, AnimatePresence, Variants } from 'framer-motion'

const projects = [
  { id: 1, title: 'MODERN BRANDING', desc: 'Minimal identity for tech startup', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'CLEAN UI', desc: 'SaaS dashboard with high-retention UX', img: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'FINTECH LANDING', desc: 'Conversion focused banking site', img: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'FASHION PORTAL', desc: 'Editorial ecommerce platform', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'MOBILE APP', desc: 'Next-gen social experience design', img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'AGENCY SITE', desc: 'Clean portfolio for creative studio', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
  { id: 7, title: '3D SHOWCASE', desc: 'Immersive product landing page', img: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800' },
  { id: 8, title: 'COFFEE BRAND', desc: 'Organic packaging and web identity', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800' },
  { id: 9, title: 'TECH LOGO', desc: 'Geometric mark for robotics firm', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800' },
  { id: 10, title: 'DESIGN SYSTEM', desc: 'Atomic design library for enterprise', img: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800' },
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
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export default function Portfolio() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  
  const activeProject = projects.find(p => p.id === selectedId)

  return (
    <section id="portfolio" className="section-padding bg-black relative">
      <div className="container-apple">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 flex flex-col gap-4"
        >
          <div className="section-label text-violet-400 mx-auto">Our Work</div>
          <h2 className="font-display font-900 text-[clamp(2rem,5vw,3.5rem)] uppercase tracking-tighter text-white">
            Selected <span className="text-violet-400">Projects</span>
          </h2>
        </motion.div>

        {/* Grid: 2x5 on Desktop */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              variants={itemVariants}
              onClick={() => setSelectedId(project.id)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-2xl border border-white/10 bg-white/5"
            >
              <div className="aspect-4/3 w-full overflow-hidden">
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              
              {/* Overlay with Plus Icon */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                  <Plus className="w-5 h-5 text-black" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal Overlay */}
        <AnimatePresence>
          {selectedId && activeProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            >
              <div 
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={() => setSelectedId(null)}
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-4xl bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-violet-600 text-white flex items-center justify-center transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-full aspect-video bg-black">
                  <img 
                    src={activeProject.img} 
                    alt={activeProject.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="p-8 text-center">
                  <h3 className="font-display font-900 text-2xl uppercase tracking-tighter text-white mb-2">
                    {activeProject.title}
                  </h3>
                  <p className="text-gray-400 font-medium text-sm">
                    {activeProject.desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
