"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

const quotes = [
  "I stopped switching between 7 apps. This is actually it.",
  "AIPA reminded me about my assignment 30 mins before it was due. Wild.",
  "The icebreaker it gave me actually worked lol.",
]

const avatars = [
  { letter: "P", color: "bg-[#E24B4A]" },
  { letter: "M", color: "bg-[#343A40]" },
  { letter: "A", color: "bg-[#639922]" },
  { letter: "J", color: "bg-[#BA7517]" },
  { letter: "F", color: "bg-[#378ADD]" },
  { letter: "S", color: "bg-[#D4537E]" },
]

export function SocialProofSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 4300)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-white py-24 md:py-28 px-6 text-center" ref={ref}>
      <div className="max-w-xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-[#D6D8D9] to-transparent mb-24 md:mb-28" />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#AEB0B3] mb-3"
        >
          Early believers
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight text-black mb-10"
        >
          Trusted by students who don&apos;t trust easily.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          {avatars.map((av, i) => (
            <div
              key={av.letter}
              className={`w-12 h-12 rounded-full border-[3px] border-white ${av.color} flex items-center justify-center text-sm font-bold text-white shadow-md -ml-2 first:ml-0`}
            >
              {av.letter}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="h-24 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentQuote}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32 }}
              className="text-lg md:text-xl font-normal italic text-[#343A40] leading-relaxed"
            >
              &ldquo;{quotes[currentQuote]}&rdquo;
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <div className="flex justify-center gap-2 mt-6">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQuote(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === currentQuote
                  ? "bg-[#F02D3A] scale-[1.4]"
                  : "bg-[#D6D8D9] hover:bg-[#AEB0B3]"
              }`}
              aria-label={`View quote ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
