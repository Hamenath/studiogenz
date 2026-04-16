'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const brands = [
  "iDEED", "VEXATECH", "LUNEWISE", "ZYLO", "CREX", "AGROTECH", "WHIZDESIGN",
  "iDEED", "VEXATECH", "LUNEWISE", "ZYLO", "CREX", "AGROTECH", "WHIZDESIGN"
]

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    // Marquee animation
    gsap.to('.social-marquee-track', {
      x: '-50%',
      duration: 30,
      ease: 'none',
      repeat: -1,
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-20 bg-black relative overflow-hidden border-t border-white/5">
      <div className="container-apple">
        {/* Client Logos Marquee */}
        <div className="overflow-hidden relative">
          {/* Edge Fading */}
          <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black to-transparent z-10" />

          <div className="social-marquee-track flex whitespace-nowrap py-10">
            {brands.map((b, i) => (
              <div key={i} className="inline-flex items-center mx-16">
                <span className="font-display font-black text-4xl md:text-6xl text-white/5 tracking-tighter uppercase select-none hover:text-violet-500 transition-colors duration-500">
                  {b}
                </span>
                <div className="w-2 h-2 ml-16 rounded-full bg-violet-600/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
