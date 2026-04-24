'use client'

const items = [
  "iDEED", "VEXATECH", "LUNEWISE", "ZYLO", "CREX", "AGROTECH", "WHIZDESIGN"
]

export default function MovingBanner() {
  // Triple the items for extra long seamless loop
  const displayItems = [...items, ...items, ...items]

  return (
    <section className="relative w-full h-24 flex items-center bg-(--bg-primary) border-y border-(--border-color) overflow-hidden transition-colors duration-500">
      {/* Edge Fading Gradient */}
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-(--bg-primary) to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-(--bg-primary) to-transparent z-10" />

      {/* Marquee Container */}
      <div className="flex whitespace-nowrap animate-marquee">
        {displayItems.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center mx-12"
          >
            <span className="text-[14px] md:text-[16px] font-900 uppercase tracking-[0.2em] text-violet-400 glow-violet select-none whitespace-nowrap">
              {item}
            </span>
            <div className="ml-24 w-1.5 h-1.5 rounded-full bg-violet-600/20" />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </section>
  )
}
