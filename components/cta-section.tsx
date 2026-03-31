"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

export function CtaSection() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!isValid) {
      setError(true)
      return
    }
    setError(false)
    setSuccess(true)
  }

  return (
    <section id="waitlist" className="bg-[#F02D3A] py-20 md:py-24 px-6 text-center" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-3"
      >
        {"Ready? Let's go."}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="text-base text-white/75 mb-10"
      >
        Join the waitlist. Be first when we launch.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.2 }}
        onSubmit={handleSubmit}
        className={`flex flex-col sm:flex-row gap-3 max-w-md mx-auto ${success ? "hidden" : ""}`}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError(false)
          }}
          placeholder="Your email"
          className="flex-1 h-12 border-2 border-white/35 rounded-full px-5 text-sm text-white bg-white/15 outline-none transition-all duration-200 placeholder:text-white/60 focus:border-white"
        />
        <button
          type="submit"
          className="h-12 bg-white text-[#343A40] text-sm font-semibold rounded-full px-7 whitespace-nowrap hover:scale-105 hover:shadow-lg transition-all duration-200"
        >
          Notify me
        </button>
      </motion.form>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-white/85 mt-3"
        >
          That doesn&apos;t look right. Try again.
        </motion.p>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-5 py-3 rounded-xl mx-auto w-fit"
        >
          <span>✓</span>
          <span>You&apos;re in. See you at launch.</span>
        </motion.div>
      )}
    </section>
  )
}
