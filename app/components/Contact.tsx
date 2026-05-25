'use client'

import { useRef, useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'

const projectTypes = [
  'Branding',
  'Web Design',
  'UI/UX',
  'Content',
  'Video'
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
}

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', budget: '', type: '', message: '' })
  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [lastSubmittedLead, setLastSubmittedLead] = useState<any>(null)
  const [isOtherSelected, setIsOtherSelected] = useState(false)

  const openMailFallback = (lead: any) => {
    const recipient = 'hello@studiogenz.com';
    const subject = encodeURIComponent(`Project Proposal - ${lead.name || 'Client'}`);
    const bodyContent = `Hello Studio GENZ,

I would like to initiate a project with you. Here are the details:

Name: ${lead.name || 'Not provided'}
Email: ${lead.email || 'Not provided'}
Phone: ${lead.phone || 'Not provided'}
Budget: ${lead.budget || 'Not provided'}
Project Type: ${lead.type || 'Not provided'}

Project Description / Message:
${lead.message || 'Not provided'}

Best regards,
${lead.name || 'Client'}`;

    const body = encodeURIComponent(bodyContent);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const newLead = {
      id: 'lead_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now(),
      name: formState.name || 'Anonymous Client',
      email: formState.email || 'No email provided',
      phone: formState.phone || 'No phone provided',
      budget: formState.budget || 'Undetermined',
      type: formState.type || 'Inquiry',
      message: formState.message || 'No details provided',
      status: 'New',
      createdAt: new Date().toISOString(),
      notes: ''
    };

    // Save lead to persistent database via Next.js Route Handler
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLead),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error status');
      }

      // Save lead to localStorage for dual-fallback/sync compatibility
      try {
        const existingLeadsStr = localStorage.getItem('studiogenz_leads');
        const existingLeads = existingLeadsStr ? JSON.parse(existingLeadsStr) : [];
        const updatedLeads = [newLead, ...existingLeads];
        localStorage.setItem('studiogenz_leads', JSON.stringify(updatedLeads));
      } catch (err) {
        console.error('Failed to save to localStorage fallback:', err);
      }

      // Dispatch custom event for real-time dashboard sync if open in same window
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('studiogenz_new_lead'));
      }

      setLastSubmittedLead(newLead);
      setSubmitted(true);
      setFormState({ name: '', email: '', phone: '', budget: '', type: '', message: '' });
      setIsOtherSelected(false);
    } catch (err) {
      console.error('Failed to save lead to CRM database:', err);
      alert('There was a connection issue saving your lead. Opening email fallback...');
      openMailFallback(newLead);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={containerRef} id="contact" className="relative w-full flex items-center py-12 sm:py-16 md:py-20 mb-8 sm:mb-12 md:mb-24 bg-(--bg-primary) text-(--text-primary) overflow-hidden border-t border-(--border-color)">
      {/* Decorative Premium Elements */}
      <div className="absolute top-0 right-0 w-full h-[500px] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, var(--text-primary) 0%, transparent 50%)' }} />
      <div className="absolute bottom-0 left-0 w-full h-[500px] pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, var(--text-primary) 0%, transparent 50%)' }} />

      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center">
          
          {/* Left Side: Typography & Info */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-8 md:gap-10"
          >
            <div>
              <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4 md:mb-6">
                 <Sparkles className="w-4 h-4 text-violet-500" />
                 <span className="text-xs font-bold tracking-[0.2em] uppercase text-violet-500">Initiate Project</span>
              </motion.div>
              <motion.h2 variants={itemVariants} className="font-display font-900 text-[clamp(2rem,8vw,4.5rem)] leading-[0.9] tracking-tighter uppercase text-(--text-primary)">
                Have An <br />
                <span className="text-violet-500 italic pr-4">Idea?</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-(--text-muted) text-base md:text-lg leading-relaxed mt-6 max-w-md font-light">
                We collaborate with visionary brands to create digital experiences that leave a lasting impact.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="flex flex-col gap-6 pt-6 md:pt-8 border-t border-(--border-color)">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@studiogenz.com&su=Project Inquiry - Studio GENZ"
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer w-max block"
              >
                <p className="text-[10px] font-bold text-(--text-muted) tracking-[0.2em] uppercase mb-1">Direct Line</p>
                <div className="flex items-center gap-3">
                  <p className="text-lg md:text-xl font-light tracking-tight text-(--text-primary) group-hover:text-violet-500 transition-colors">hello@studiogenz.com</p>
                  <ArrowUpRight className="w-4 h-4 text-(--text-muted) group-hover:text-violet-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </a>

              <div className="group cursor-pointer w-max">
                <p className="text-[10px] font-bold text-(--text-muted) tracking-[0.2em] uppercase mb-1">Location</p>
                <p className="text-lg md:text-xl font-light tracking-tight text-(--text-primary)">Tamil Nadu, IN</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Ultra Premium Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-6 lg:col-start-7 w-full"
          >
            <div className="bg-(--bg-secondary) p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl md:rounded-[2.5rem] border border-(--border-color) shadow-2xl shadow-black/5 relative overflow-hidden">
               {/* Form subtle glow */}
               <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

                {submitted && lastSubmittedLead ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center py-6 sm:py-8 relative"
                  >
                     {/* Confetti Spark Particle Blast */}
                     {Array.from({ length: 28 }).map((_, i) => {
                       const angle = (i * 360) / 28 + (Math.random() * 15 - 7.5)
                       const distance = 90 + Math.random() * 150
                       const size = 3 + Math.random() * 5
                       const color = ['#8b5cf6', '#3b82f6', '#ec4899', '#f59e0b', '#10b981'][Math.floor(Math.random() * 5)]
                       const rad = (angle * Math.PI) / 180
                       const targetX = Math.cos(rad) * distance
                       const targetY = Math.sin(rad) * distance
                       return (
                         <motion.div
                           key={i}
                           initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                           animate={{
                             x: targetX,
                             y: targetY,
                             scale: 0,
                             opacity: 0,
                             rotate: Math.random() * 360
                           }}
                           transition={{
                             duration: 1.5,
                             ease: [0.16, 1, 0.3, 1],
                             delay: Math.random() * 0.1
                           }}
                           style={{
                             position: 'absolute',
                             top: '18%', // Originate burst from checkmark circle area
                             width: size,
                             height: size,
                             borderRadius: Math.random() > 0.4 ? '50%' : '20%',
                             backgroundColor: color,
                             pointerEvents: 'none',
                             zIndex: 10
                           }}
                         />
                       )
                     })}

                     {/* Drawing Circular Checkmark (Tick) Animation */}
                     <div className="w-16 h-16 rounded-full bg-violet-500/10 border-2 border-violet-500 flex items-center justify-center text-violet-500 mb-6 shadow-[0_0_20px_rgba(139,92,246,0.25)] relative">
                        <svg className="w-8 h-8 text-violet-500" viewBox="0 0 52 52" fill="none">
                           <motion.path 
                             d="M14 27l7.5 7.5 16.5-16.5" 
                             stroke="currentColor" 
                             strokeWidth="4" 
                             strokeLinecap="round" 
                             strokeLinejoin="round" 
                             initial={{ pathLength: 0 }}
                             animate={{ pathLength: 1 }}
                             transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                           />
                        </svg>
                     </div>
                     
                     <h3 className="font-display font-900 text-2xl md:text-3xl text-(--text-primary) uppercase tracking-tighter mb-3 leading-none">
                        Proposal Received!
                     </h3>
                     
                     <p className="text-(--text-muted) text-xs md:text-sm font-light max-w-sm leading-relaxed mb-6">
                        Thank you, <span className="text-(--text-primary) font-semibold">{lastSubmittedLead.name}</span>. Your project parameters have been uploaded to the CRM. Our design director will review them and reach out within 24 hours.
                     </p>

                     {/* Received Parameters Summary with Adaptive Light Theme Colors */}
                     <div className="w-full bg-(--bg-primary)/45 border border-(--border-color) rounded-2xl p-5 mb-8 text-left text-[11px] space-y-2.5">
                        <div className="flex justify-between border-b border-(--border-color)/50 pb-2">
                           <span className="text-(--text-muted) uppercase tracking-wider font-semibold">Service:</span>
                           <span className="text-violet-600 dark:text-violet-400 font-bold">{lastSubmittedLead.type}</span>
                        </div>
                        <div className="flex justify-between border-b border-(--border-color)/50 pb-2">
                           <span className="text-(--text-muted) uppercase tracking-wider font-semibold">Budget Limit:</span>
                           <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">{lastSubmittedLead.budget}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                           <span className="text-(--text-muted) uppercase tracking-wider font-semibold">Contact:</span>
                           <span className="text-(--text-primary) font-mono truncate max-w-[200px]">{lastSubmittedLead.email}</span>
                        </div>
                     </div>

                     {/* Actions Adaptive Buttons */}
                     <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                        <button 
                          onClick={() => openMailFallback(lastSubmittedLead)}
                          className="group inline-flex items-center justify-center gap-2 bg-(--text-primary) text-(--bg-primary) hover:opacity-90 px-6 py-3.5 rounded-full font-bold text-[10px] uppercase tracking-wider transition-all scale-100 hover:scale-105 active:scale-95 cursor-pointer"
                        >
                           Send Manual Email <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                        
                        <button 
                          onClick={() => setSubmitted(false)}
                          className="inline-flex items-center justify-center gap-2 bg-(--bg-secondary) border border-(--border-color) text-(--text-muted) hover:text-(--text-primary) hover:bg-(--border-color)/20 px-6 py-3.5 rounded-full font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                        >
                           Submit Another
                        </button>
                     </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                  
                  {/* Personal Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-6">
                     <div className="relative group">
                       <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedInput === 'name' || formState.name ? '-top-5 text-[10px] text-violet-500 tracking-widest uppercase font-bold' : 'top-2 text-sm text-(--text-muted)'}`}>What's your name?</label>
                       <input 
                         type="text" 
                         value={formState.name}
                         onChange={e => setFormState(p => ({ ...p, name: e.target.value }))}
                         onFocus={() => setFocusedInput('name')}
                         onBlur={() => setFocusedInput(null)}
                         className="w-full bg-transparent border-b border-(--border-color) pb-2 pt-1 text-base md:text-lg text-(--text-primary) focus:outline-none focus:border-violet-500 transition-colors duration-300"
                       />
                     </div>
                     
                     <div className="relative group mt-2 sm:mt-0">
                       <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedInput === 'email' || formState.email ? '-top-5 text-[10px] text-violet-500 tracking-widest uppercase font-bold' : 'top-2 text-sm text-(--text-muted)'}`}>Your email address</label>
                       <input 
                         type="email" 
                         value={formState.email}
                         onChange={e => setFormState(p => ({ ...p, email: e.target.value }))}
                         onFocus={() => setFocusedInput('email')}
                         onBlur={() => setFocusedInput(null)}
                         className="w-full bg-transparent border-b border-(--border-color) pb-2 pt-1 text-base md:text-lg text-(--text-primary) focus:outline-none focus:border-violet-500 transition-colors duration-300"
                       />
                     </div>
                  </div>

                  {/* Phone & Budget Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-6">
                     <div className="relative group mt-2 sm:mt-0">
                       <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedInput === 'phone' || formState.phone ? '-top-5 text-[10px] text-violet-500 tracking-widest uppercase font-bold' : 'top-2 text-sm text-(--text-muted)'}`}>Phone number</label>
                       <input 
                         type="tel" 
                         value={formState.phone}
                         onChange={e => setFormState(p => ({ ...p, phone: e.target.value }))}
                         onFocus={() => setFocusedInput('phone')}
                         onBlur={() => setFocusedInput(null)}
                         className="w-full bg-transparent border-b border-(--border-color) pb-2 pt-1 text-base md:text-lg text-(--text-primary) focus:outline-none focus:border-violet-500 transition-colors duration-300"
                       />
                     </div>

                     <div className="relative group mt-2 sm:mt-0">
                       <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedInput === 'budget' || formState.budget ? '-top-5 text-[10px] text-violet-500 tracking-widest uppercase font-bold' : 'top-2 text-sm text-(--text-muted)'}`}>Project budget</label>
                       <input 
                         type="text" 
                         value={formState.budget}
                         onChange={e => setFormState(p => ({ ...p, budget: e.target.value }))}
                         onFocus={() => setFocusedInput('budget')}
                         onBlur={() => setFocusedInput(null)}
                         className="w-full bg-transparent border-b border-(--border-color) pb-2 pt-1 text-base md:text-lg text-(--text-primary) focus:outline-none focus:border-violet-500 transition-colors duration-300"
                       />
                     </div>
                  </div>

                  {/* Project Type */}
                  <div className="relative group pt-2">
                     <label className="absolute -top-5 text-[10px] text-violet-500 tracking-widest uppercase font-bold">
                        I'm interested in...
                     </label>
                     <div className="relative">
                        <select
                          value={isOtherSelected ? 'Other' : (projectTypes.includes(formState.type) ? formState.type : '')}
                          onChange={e => {
                            const val = e.target.value;
                            if (val === 'Other') {
                              setIsOtherSelected(true);
                              setFormState(p => ({ ...p, type: '' }));
                            } else {
                              setIsOtherSelected(false);
                              setFormState(p => ({ ...p, type: val }));
                            }
                          }}
                          className="w-full bg-transparent border-b border-(--border-color) pb-2 pt-1 text-base md:text-lg text-(--text-primary) focus:outline-none focus:border-violet-500 transition-colors duration-300 appearance-none cursor-pointer"
                        >
                          <option value="" disabled className="bg-(--bg-secondary) text-(--text-muted)">Select an option...</option>
                          {projectTypes.map(type => (
                            <option key={type} value={type} className="bg-(--bg-secondary) text-(--text-primary)">
                              {type}
                            </option>
                          ))}
                          <option value="Other" className="bg-(--bg-secondary) text-(--text-primary)">Other (Fill it yourself)</option>
                        </select>
                        <div className="absolute right-2 top-2 pointer-events-none text-(--text-muted)">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                     </div>
                  </div>

                  {/* Conditional input if Other is selected or client wants to fill it */}
                  {isOtherSelected && (
                     <div className="relative group pt-2">
                        <label className="absolute -top-5 text-[10px] text-violet-500 tracking-widest uppercase font-bold">Specify what you're interested in</label>
                        <input 
                          type="text" 
                          value={formState.type}
                          onChange={e => setFormState(p => ({ ...p, type: e.target.value }))}
                          placeholder="e.g. Marketing, Web App, Photography..."
                          className="w-full bg-transparent border-b border-(--border-color) pb-2 pt-1 text-base md:text-lg text-(--text-primary) focus:outline-none focus:border-violet-500 transition-colors duration-300"
                        />
                     </div>
                  )}

                  {/* Message */}
                  <div className="relative group pt-2 md:pt-4">
                     <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedInput === 'message' || formState.message ? '-top-2 text-[10px] text-violet-500 tracking-widest uppercase font-bold' : 'top-4 text-sm text-(--text-muted)'}`}>Tell us about your project</label>
                     <textarea 
                       rows={1}
                       value={formState.message}
                       onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                       onFocus={() => setFocusedInput('message')}
                       onBlur={() => setFocusedInput(null)}
                       className="w-full bg-transparent border-b border-(--border-color) pb-2 pt-4 text-base md:text-lg text-(--text-primary) focus:outline-none focus:border-violet-500 transition-colors duration-300 resize-none min-h-[60px] md:min-h-[80px]"
                     />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="group w-full md:w-auto inline-flex items-center justify-center gap-3 bg-(--text-primary) text-(--bg-primary) px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] overflow-hidden relative transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     <span className="absolute inset-0 w-full h-full bg-violet-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0" />
                     <span className="relative z-10 flex items-center gap-2 md:gap-3 group-hover:text-white transition-colors duration-300">
                        {isSubmitting ? 'Syncing Specs...' : 'Submit Request'} 
                        {!isSubmitting && <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:rotate-45 transition-transform duration-300" />}
                     </span>
                  </button>

               </form>
               )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
