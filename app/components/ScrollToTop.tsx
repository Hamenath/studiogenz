'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div className={`fixed bottom-8 right-8 z-100 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="group relative w-12 h-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-[0_10px_30px_rgba(139,92,246,0.3)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.5)] hover:bg-violet-500 transition-all duration-300 hover:-translate-y-1"
      >
        <ChevronUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        
        {/* Subtle Ambient Pulse */}
        <div className="absolute inset-0 rounded-2xl bg-violet-400 opacity-0 group-hover:animate-ping group-hover:opacity-20 pointer-events-none" />
      </button>
    </div>
  )
}
