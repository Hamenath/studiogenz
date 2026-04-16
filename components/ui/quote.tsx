"use client";

import DotPattern from "@/components/ui/dot-pattern-1";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export function Quote() {
  return (
    <>
      <div className="mx-auto mb-16 max-w-5xl px-6 md:mb-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="relative flex flex-col items-center border border-violet-500/30 bg-violet-500/[0.02] rounded-3xl overflow-hidden"
        >
          <DotPattern width={5} height={5} className="opacity-40" />

          {/* Corner Squares */}
          <div className="absolute -left-1 -top-1 h-2.5 w-2.5 bg-violet-500" />
          <div className="absolute -bottom-1 -left-1 h-2.5 w-2.5 bg-violet-500" />
          <div className="absolute -right-1 -top-1 h-2.5 w-2.5 bg-violet-500" />
          <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 bg-violet-500" />

          <motion.div variants={containerVariants} className="relative z-20 mx-auto w-full py-12 md:py-20 px-8 text-center"
          >
            <motion.p variants={itemVariants} className="text-[10px] md:text-xs font-900 text-violet-500 uppercase tracking-[0.3em] mb-6">
              Core Philosophy
            </motion.p>
            <div className="text-2xl tracking-tighter md:text-4xl lg:text-5xl xl:text-6xl text-black leading-[1.1]">
              <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 md:gap-3">
                <h1 className="font-bold whitespace-nowrap">"Design should be</h1>
                <p className="font-light whitespace-nowrap">easy to</p>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 md:gap-3">
                <p className="font-light whitespace-nowrap">understand</p>
                <h1 className="font-bold whitespace-nowrap">because</h1>
                <p className="font-light whitespace-nowrap">simple</p>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 md:gap-3">
                <p className="font-light whitespace-nowrap">ideas</p>
                <h1 className="font-bold whitespace-nowrap">are quicker to</h1>
              </motion.div>
              <motion.h1 variants={itemVariants} className="font-bold mt-2 whitespace-nowrap">grasp..."</motion.h1>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
