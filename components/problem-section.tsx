"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  {
    num: "9",
    unit: " apps",
    desc: "The average person checks 9 different apps before 9am every single morning.",
    accentColor: "#F02D3A",
    bgColor: "#FDE8E9",
  },
  {
    num: "23",
    unit: " min",
    desc: "Lost to app-switching daily. Before noon. Every day. icebrkr fixes that.",
    accentColor: "#F59E0B",
    bgColor: "#FFF3CD",
  },
  {
    num: "1",
    unit: " scroll",
    desc: "Everything ranked, ready, and proactive. Before you even open your phone.",
    accentColor: "#22C55E",
    bgColor: "#E6F4EA",
  },
]

export function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="bg-white py-24 md:py-28 px-6" ref={ref}>
      <div className="max-w-[900px] mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-[#D6D8D9] to-transparent mb-24 md:mb-28" />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#AEB0B3] text-center mb-3"
        >
          The problem
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight text-center text-black max-w-xl mx-auto mb-14"
        >
          How many apps do you check before 9am? Be honest.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12 }}
              whileHover={{ 
                y: -12, 
                scale: 1.04, 
                boxShadow: "0 30px 70px rgba(0,0,0,0.14)" 
              }}
              className="group bg-white border-2 border-[#D6D8D9] rounded-3xl p-8 relative overflow-hidden cursor-default transition-all duration-300"
            >
              {/* Top accent bar on hover */}
              <div 
                className="absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl"
                style={{ backgroundColor: stat.accentColor }}
              />
              
              {/* Background glow on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ 
                  background: `radial-gradient(circle at 30% 20%, ${stat.bgColor} 0%, transparent 60%)` 
                }}
              />
              
              <div className="relative">
                <div className="text-4xl md:text-5xl font-bold tracking-tight text-black leading-none mb-3">
                  <span style={{ color: stat.accentColor }}>{stat.num}</span>
                  {stat.unit}
                </div>
                <p className="text-sm text-[#5D6166] leading-relaxed">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
