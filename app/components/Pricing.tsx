'use client'

import { useRef } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

const plans = [
  {
    name: 'Basic',
    price: '₹2,999',
    desc: 'For small businesses getting started',
    features: [
      'Logo Design',
      '2 Social Media Posts',
      'Basic Color Palette',
      '2 Revisions'
    ],
    cta: 'Get Started',
    popular: false,
    color: 'text-gray-400'
  },
  {
    name: 'Standard',
    price: '₹5,999',
    desc: 'Best for growing brands',
    features: [
      'Logo Design',
      '5 Social Media Posts',
      'Brand Color System',
      'Typography Setup',
      '3 Revisions'
    ],
    cta: 'Choose Plan',
    popular: true,
    color: 'text-blue-600'
  },
  {
    name: 'Premium',
    price: '₹9,999',
    desc: 'Complete branding solution',
    features: [
      'Logo Design',
      '10 Social Media Posts',
      'Full Branding Kit',
      'Poster Design',
      'Priority Support',
      'Unlimited Revisions'
    ],
    cta: 'Go Premium',
    popular: false,
    color: 'text-gray-400'
  },
  {
    name: 'Custom',
    price: 'Custom',
    desc: 'Tailored for advanced needs',
    features: [
      'Custom Website',
      'Full Branding + Strategy',
      'Advanced UI/UX',
      'Ongoing Support'
    ],
    cta: 'Contact Us',
    popular: false,
    color: 'text-gray-400'
  }
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} id="pricing" className="min-h-screen flex flex-col justify-center section-padding bg-black relative overflow-hidden">
      <div className="container-apple relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 flex flex-col gap-4"
        >
          <div className="section-label text-violet-400 mx-auto">Plans</div>
          <h2 className="font-display font-900 text-[clamp(2rem,5vw,3.5rem)] leading-none uppercase tracking-tighter text-white content-heading">
            Simple Pricing.<br />
            <span className="text-violet-400">Scalable Solutions.</span>
          </h2>
        </motion.div>

        {/* Pricing Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`group relative flex flex-col p-8 rounded-3xl bg-white/5 border transition-all duration-300 ease-out hover:shadow-2xl text-left ${
                plan.popular 
                ? 'border-violet-500 ring-4 ring-violet-500/5 z-10 scale-[1.02] md:scale-[1.05]' 
                : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-8 bg-violet-600 text-white text-[10px] font-900 tracking-widest uppercase py-1.5 px-4 rounded-full shadow-lg shadow-violet-500/20">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="font-display font-900 text-lg uppercase tracking-wider text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-start gap-1">
                  <span className="text-3xl font-900 text-white">{plan.price}</span>
                </div>
                <p className="text-xs text-gray-400 mt-3 font-medium leading-relaxed">
                  {plan.desc}
                </p>
              </div>

              <div className="flex-1 space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start justify-start gap-3">
                    <div className={`mt-1 shrink-0 ${plan.popular ? 'text-violet-500' : 'text-gray-500'}`}>
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <span className="text-[13px] font-medium text-gray-400 leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                className={`w-full py-4 rounded-2xl text-[11px] font-900 tracking-widest uppercase transition-all duration-300 ease-out flex items-center justify-center gap-2 ${
                  plan.popular
                  ? 'bg-violet-600 text-white hover:bg-white hover:text-black shadow-lg shadow-violet-500/20'
                  : 'bg-white text-black hover:bg-violet-600 hover:text-white shadow-lg'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Support Note */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-12 text-[11px] font-bold text-gray-500 uppercase tracking-widest"
        >
          Questions? <a href="#contact" className="text-violet-400 border-b border-violet-400 pb-0.5">Contact our team</a>
        </motion.p>

      </div>
    </section>
  )
}
