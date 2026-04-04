"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

const privacyFeatures = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "On-device AI",
    body: "AIPA runs on your phone. 80% of intelligence never touches a server.",
    fullBody: "AIPA runs directly on your device. 80% of all intelligence stays local — never sent to a server, never seen by us. Your habits, routines, and patterns belong to you, not a data centre.",
    accentColor: "#22C55E",
    bgColor: "#E6F4EA",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    ),
    title: "Swiss residency",
    body: "The 20% that syncs lives in Switzerland — world-class privacy laws.",
    fullBody: "The small fraction of data that syncs across your devices is stored exclusively in Switzerland — home to some of the world's strictest privacy legislation. Geneva-based, by design.",
    accentColor: "#F02D3A",
    bgColor: "#FDE8E9",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "AES-256 encryption",
    body: "Bank-grade encryption protects everything. End to end.",
    fullBody: "Every byte is protected with AES-256 — the same standard used by financial institutions globally. End-to-end encryption means only you can decrypt your data. Not even we can read it.",
    accentColor: "#F59E0B",
    bgColor: "#FFF3CD",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    title: "Zero selling",
    body: "We never sold data. We never will. Completely ad-free.",
    fullBody: "Our business model is simple: you pay for the app, we build it for you. We have never sold user data, we run no ads, and we never will. IB-Vault lets you audit everything AIPA knows — and delete it on demand.",
    accentColor: "#343A40",
    bgColor: "#E0E1E2",
  },
]

export function PrivacySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isHovered, setIsHovered] = useState(false)

  const goTo = useCallback((index: number) => {
    const clamped = ((index % privacyFeatures.length) + privacyFeatures.length) % privacyFeatures.length
    setDirection(clamped > activeIndex || (activeIndex === privacyFeatures.length - 1 && clamped === 0) ? 1 : -1)
    setActiveIndex(clamped)
  }, [activeIndex])

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (!isInView || isHovered) return
    const interval = setInterval(() => {
      setDirection(1)
      setActiveIndex((prev) => (prev + 1) % privacyFeatures.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isInView, isHovered])

  const active = privacyFeatures[activeIndex]

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -60) goTo(activeIndex + 1)
    else if (info.offset.x > 60) goTo(activeIndex - 1)
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      filter: "blur(8px)",
      scale: 0.97,
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      filter: "blur(8px)",
      scale: 0.97,
    }),
  }

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#D6D8D9] to-transparent mb-16 md:mb-20" />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-xs md:text-sm font-semibold tracking-[0.15em] uppercase text-[#AEB0B3] text-center mb-3"
        >
          Privacy
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-center text-black max-w-3xl mx-auto mb-12 md:mb-16"
        >
          Your Data is Yours. On your device.
          <br />
          End of story.
        </motion.h2>
      </div>

      {/* Card + controls */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="px-6 md:px-12"
        >
          <div className="mx-auto w-full max-w-[980px]">
            <div className="relative rounded-[2.25rem] border-2 border-[#E0E1E2] bg-white shadow-2xl shadow-black/10 overflow-hidden">

              {/* Ambient background glow matching active card */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.85] transition-all duration-700"
                style={{
                  background: `radial-gradient(60% 55% at 18% 18%, ${active.accentColor}30 0%, transparent 60%), radial-gradient(65% 60% at 85% 55%, ${active.accentColor}18 0%, transparent 62%), linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 55%, rgba(255,255,255,0.96) 100%)`,
                }}
              />

              {/* Accent top bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[3px]"
                animate={{ backgroundColor: active.accentColor }}
                transition={{ duration: 0.5 }}
              />

              <div className="relative p-7 md:p-12">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.08}
                    onDragEnd={handleDragEnd}
                    className="select-none"
                  >
                    <div className="grid gap-5 md:gap-7 md:grid-cols-[auto_1fr] items-start">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.10)]"
                          style={{ backgroundColor: active.bgColor, color: active.accentColor }}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {active.icon}
                        </motion.div>
                      </div>

                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-black tracking-tight font-sans">
                          {active.title}
                        </h3>
                        <p className="mt-3 text-base md:text-lg text-[#5D6166] leading-relaxed font-sans max-w-2xl">
                          {active.body}
                        </p>
                        <p className="mt-4 text-sm text-[#9CA3AF] leading-relaxed font-sans max-w-2xl">
                          {active.fullBody}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Dot indicators — one per privacy feature ── */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {privacyFeatures.map((f, i) => (
            <button
              key={f.title}
              onClick={() => goTo(i)}
              aria-label={`Go to ${f.title}`}
              className="group p-1.5 focus:outline-none"
            >
              <motion.div
                className="h-2 rounded-full"
                animate={{
                  width: i === activeIndex ? 28 : 8,
                  backgroundColor: i === activeIndex ? f.accentColor : "#D1D5DB",
                  opacity: i === activeIndex ? 1 : 0.5,
                }}
                whileHover={{ opacity: 0.85, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
