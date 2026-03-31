"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "AIPA — proactive AI",
    body: "Anticipates your day before you open the app. It already knows what matters.",
    fullBody: "Your personal AI that anticipates your day before you open the app. It already knows what matters, what is urgent, and what can wait. AIPA learns your life context and surfaces exactly what you need, when you need it — before you ask.",
    accentColor: "#F02D3A",
    bgColor: "#FDE8E9",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
    title: "Unified feed",
    body: "Calendar, health, finance, social — one ranked scroll. Stop switching apps.",
    fullBody: "Calendar, health, finance, social — one ranked scroll. AIPA prioritises everything so you stop switching between 9 apps and start doing. Red is urgent, amber is important, green is ready.",
    accentColor: "#3B82F6",
    bgColor: "#EFF6FF",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "IB-Connect",
    body: "Meet people who get you. The icebreaker is already written — by AIPA.",
    fullBody: "Meet people who actually get you. The icebreaker is already written — by AIPA. Based on shared interests, context, and timing, AIPA crafts the perfect opener so the cringe is gone before it starts.",
    accentColor: "#8B5CF6",
    bgColor: "#F5F3FF",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Smart fridge",
    body: "Your kitchen keeps up. Know what expires before it is too late.",
    fullBody: "Your kitchen finally keeps up with you. AIPA detects what is expiring, suggests recipes, and adds items to your shopping list — before you open the fridge door and find out the hard way.",
    accentColor: "#14B8A6",
    bgColor: "#F0FDFA",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Smart closet",
    body: "The perfect outfit before you ask. Weather + calendar = dressed fast.",
    fullBody: "The perfect outfit before you even ask. AIPA combines weather, calendar and your wardrobe to suggest a meeting-ready look in under 60 seconds. No decision fatigue. Just dressed.",
    accentColor: "#F59E0B",
    bgColor: "#FFF3CD",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "IB-Vault",
    body: "We cannot sell what we cannot see. Your data stays on your device.",
    fullBody: "We cannot sell what we cannot see. IB-Vault shows you exactly what AIPA has learned. Review it, delete anything, anytime. Total control. Zero compromise. Your data lives on your device — not ours.",
    accentColor: "#22C55E",
    bgColor: "#E6F4EA",
  },
]

interface FeaturesSectionProps {
  openModal: (title: string, body: string, icon: React.ReactNode, accentColor: string) => void
}

export function FeaturesSection({ openModal }: FeaturesSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
  const [isHovered, setIsHovered] = useState(false)

  const goTo = useCallback((index: number) => {
    const clamped = ((index % features.length) + features.length) % features.length
    setDirection(clamped > activeIndex || (activeIndex === features.length - 1 && clamped === 0) ? 1 : -1)
    setActiveIndex(clamped)
  }, [activeIndex])

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (!isInView || isHovered) return
    const interval = setInterval(() => {
      setDirection(1)
      setActiveIndex((prev) => (prev + 1) % features.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isInView, isHovered])

  const active = features[activeIndex]

  // Drag-to-swipe threshold
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
          What icebrkr does
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-center text-black max-w-3xl mx-auto mb-12 md:mb-16"
        >
          Everything you need.
          <br />
          Nothing you don&apos;t.
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

              {/* Tri-color light wash */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.85] transition-all duration-700"
                style={{
                  background: `radial-gradient(60% 55% at 18% 18%, ${active.accentColor}38 0%, transparent 60%), radial-gradient(55% 55% at 50% 10%, rgba(245,158,11,0.15) 0%, transparent 62%), radial-gradient(65% 60% at 85% 55%, rgba(34,197,94,0.15) 0%, transparent 62%), linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 55%, rgba(255,255,255,0.96) 100%)`,
                }}
              />

              {/* Accent top bar — animates color */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[3px]"
                animate={{ backgroundColor: active.accentColor }}
                transition={{ duration: 0.5 }}
              />

              <div className="relative p-7 md:p-12">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.button
                    key={activeIndex}
                    type="button"
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
                    onClick={() => openModal(active.title, active.fullBody, active.icon, active.accentColor)}
                    className="text-left w-full cursor-pointer select-none"
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

                        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: active.accentColor }}>
                          <span>Tap to learn more</span>
                          <motion.svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </motion.svg>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Dot indicators — one per feature, fully clickable ── */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {features.map((f, i) => (
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
