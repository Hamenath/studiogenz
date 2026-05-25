'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { motion, AnimatePresence, Variants } from 'framer-motion'

const projects = [
  { id: 1, title: 'TRADITIONAL WEDDING STORY', desc: 'Aesthetic traditional couple portraiture', img: '/pic.JPG' },
  { id: 2, title: 'SACRED RITUALS PORTRAIT', desc: 'Macro ritual photography close-up', img: '/pic 2.JPG' },
  { id: 3, title: 'COOLIE CAMPAIGN POSTER', desc: 'High-impact cinematic poster concept', img: '/pic 3.jpg' },
  { id: 4, title: 'BUTTERFLY SYMPHONY', desc: 'Creative outdoor fantasy photography', img: '/pic 4.jpg' },
  { id: 5, title: 'WARM LIGHTS EMBRACE', desc: 'Romantic fairy lights pre-wedding shoot', img: '/pic 5.jpg' },
  { id: 6, title: 'VISUALIZE \'26 CAMPAIGN', desc: 'National level hackathon event brand', img: '/pic 6.png' },
  { id: 7, title: 'AI&DS GRADUATION STORY', desc: 'Together We Code yearbook collage', img: '/pic 7.png' },
  { id: 8, title: 'LUNEWISE BRAND LOGO', desc: 'Infinity wave minimalist logo system', img: '/lunewise.png' },
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
    <section id="portfolio" className="section-padding bg-(--bg-primary) relative transition-colors duration-500">
      <div className="container-apple">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 flex flex-col gap-4"
        >
          <div className="section-label text-violet-500 mx-auto">Our Work</div>
          <h2 className="font-display font-900 text-[clamp(2rem,5vw,3.5rem)] uppercase tracking-tighter text-(--text-primary)">
            Selected <span className="text-violet-500">Projects</span>
          </h2>
        </motion.div>

        {/* Grid: 2x5 on Desktop */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6"
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              variants={itemVariants}
              onClick={() => setSelectedId(project.id)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-2xl border border-(--border-color) bg-(--bg-secondary)"
            >
              <div className="aspect-4/3 w-full overflow-hidden">
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700"
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
                className="relative w-full max-w-4xl bg-(--bg-primary) rounded-3xl overflow-hidden shadow-2xl border border-(--border-color)"
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
                  <h3 className="font-display font-900 text-2xl uppercase tracking-tighter text-(--text-primary) mb-2">
                    {activeProject.title}
                  </h3>
                  <p className="text-(--text-muted) font-medium text-sm">
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
