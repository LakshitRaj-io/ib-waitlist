"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"

const brandColors = [
  { bg: "bg-[#FDE8E9]", text: "text-[#B71C28]", dot: "bg-[#F02D3A]" },
  { bg: "bg-[#FFF3CD]", text: "text-[#CC6D00]", dot: "bg-[#F59E0B]" },
  { bg: "bg-[#E6F4EA]", text: "text-[#1A6630]", dot: "bg-[#22C55E]" },
]

export function Hero() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("That doesn't look right. Try again.")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [colorIndex, setColorIndex] = useState(0)
  const { scrollY } = useScroll()
  const phoneY = useTransform(scrollY, [0, 900], [0, 80])
  const phoneScale = useTransform(scrollY, [0, 900], [1, 0.92])
  const phoneOpacity = useTransform(scrollY, [650, 1050], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % brandColors.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!isValid) {
      setErrorMsg("That doesn't look right. Try again.")
      setError(true)
      return
    }
    setError(false)
    setLoading(true)
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (res.ok) {
        setSuccess(true)
      } else {
        const data = await res.json()
        setErrorMsg(data.error ?? "Something went wrong. Please try again.")
        setError(true)
      }
    } catch {
      setErrorMsg("Network error. Please check your connection.")
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const currentColor = brandColors[colorIndex]

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 md:pt-32 pb-20 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className={`inline-flex items-center gap-2 ${currentColor.bg} ${currentColor.text} text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full mb-7 transition-colors duration-500`}
      >
        <span className={`w-2 h-2 ${currentColor.dot} rounded-full animate-pulse transition-colors duration-500`} />
        Early access open
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.22 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tight text-black max-w-4xl"
      >
        Your day.
        <br />
        <span className="text-[#1A6630]">Before you even asked.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.38 }}
        className="text-base md:text-lg text-[#5D6166] mt-5 max-w-md leading-relaxed"
      >
        Lifelong personal assistant. Let AIPA grow with you. Proactive is our magic sauce.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.52 }}
        onSubmit={handleSubmit}
        className={`flex flex-col sm:flex-row gap-3 mt-10 w-full max-w-md ${success ? "hidden" : ""}`}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError(false)
          }}
          placeholder="Your email address"
          className={`flex-1 h-12 border-2 rounded-full px-5 text-sm text-black bg-white outline-none transition-all duration-200 placeholder:text-[#AEB0B3] ${
            error
              ? "border-[#F02D3A]"
              : "border-[#D6D8D9] focus:border-[#343A40] focus:shadow-[0_0_0_3px_rgba(52,58,64,0.08)]"
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className="h-12 bg-[#F02D3A] text-white text-sm font-semibold rounded-full px-7 whitespace-nowrap hover:scale-105 hover:shadow-lg hover:shadow-[#F02D3A]/30 transition-all duration-200 disabled:opacity-60 disabled:scale-100 disabled:shadow-none flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Joining...
            </>
          ) : (
            "Join waitlist"
          )}
        </button>
      </motion.form>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-[#F02D3A] mt-2"
        >
          {errorMsg}
        </motion.p>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-[#E6F4EA] text-[#1A6630] text-sm font-medium px-5 py-3 rounded-xl mt-10"
        >
          <span>✓</span>
          <span>You&apos;re in. See you at launch.</span>
        </motion.div>
      )}

      {/* iPhone Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.72 }}
        style={{ y: phoneY, scale: phoneScale, opacity: phoneOpacity }}
        className="mt-14 relative"
      >
        <div className="w-[260px] h-[530px] bg-white border-[3px] border-[#d4d4d4] rounded-[50px] relative shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.7),0_0_0_1px_rgba(0,0,0,0.08),0_28px_72px_rgba(0,0,0,0.14)]">
          {/* Hardware buttons */}
          <div className="absolute -right-[4px] top-28 w-[4px] h-[72px] bg-[#bfbfbf] rounded-r-[3px]" />
          <div className="absolute -left-[4px] top-24 w-[4px] h-[36px] bg-[#bfbfbf] rounded-l-[3px]" />
          <div className="absolute -left-[4px] top-36 w-[4px] h-[36px] bg-[#bfbfbf] rounded-l-[3px]" />
          <div className="absolute -left-[4px] top-16 w-[4px] h-[22px] bg-[#bfbfbf] rounded-l-[3px]" />

          {/* Screen */}
          <div className="absolute inset-[3px] bg-white rounded-[44px] overflow-hidden flex flex-col">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-[16px] z-10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#1a1a1a] mr-6" />
            </div>

            {/* Status bar - properly positioned below dynamic island */}
            <div className="flex items-center justify-between px-5 pt-[46px]">
              <span className="text-[11px] font-semibold text-black">9:41</span>
              <div className="flex items-center gap-1">
                <svg width="15" height="10" viewBox="0 0 17 12" fill="#000">
                  <rect x="0" y="5" width="2.5" height="7" rx=".5" />
                  <rect x="3.8" y="3.5" width="2.5" height="8.5" rx=".5" />
                  <rect x="7.6" y="2" width="2.5" height="10" rx=".5" />
                  <rect x="11.4" y=".5" width="2.5" height="11.5" rx=".5" />
                </svg>
                <svg width="13" height="10" viewBox="0 0 15 12" fill="#000">
                  <path d="M7.5 9.5C8.1 9.5 8.6 10 8.6 10.6S8.1 11.7 7.5 11.7 6.4 11.2 6.4 10.6 6.9 9.5 7.5 9.5ZM7.5 5.8C9.2 5.8 10.7 6.5 11.8 7.6L13 6.4C11.6 4.9 9.7 4 7.5 4S3.4 4.9 2 6.4l1.2 1.2C4.3 6.5 5.8 5.8 7.5 5.8ZM7.5 2.1C10 2.1 12.3 3.2 13.9 5L15 3.9C13.1 1.8 10.4.6 7.5.6S1.9 1.8 0 3.9L1.1 5C2.7 3.2 5 2.1 7.5 2.1Z" />
                </svg>
                <svg width="22" height="11" viewBox="0 0 26 13" fill="none">
                  <rect x=".5" y=".5" width="22" height="12" rx="3.5" stroke="#000" strokeOpacity=".35" />
                  <rect x="2" y="2" width="17" height="9" rx="2" fill="#000" />
                  <path d="M24 4.5v4C24.8 8.2 25.5 7.5 25.5 6.5S24.8 4.8 24 4.5Z" fill="#000" fillOpacity=".4" />
                </svg>
              </div>
            </div>

            {/* Feed content */}
            <div className="flex-1 flex flex-col p-3 pt-2 gap-2 overflow-hidden">
              {/* Ticker - using brand amber color */}
              <div className="bg-[#FFF3CD] rounded-xl px-3 py-2 flex items-center gap-2 overflow-hidden shrink-0">
                <span className="bg-[#F59E0B] text-white text-[8px] font-bold px-2 py-0.5 rounded tracking-wide">
                  LIVE
                </span>
                <div className="overflow-hidden flex-1 whitespace-nowrap">
                  <motion.span
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                    className="inline-block text-[9px] font-semibold text-[#CC6D00]"
                  >
                    Group study in 8 min · Eggs expiring today · Outfit: 94% match · Anika nearby — 6 shared interests · Group study in 8 min · Eggs expiring today · Outfit: 94% match · Anika nearby — 6 shared interests ·
                  </motion.span>
                </div>
              </div>

              {/* Feed cards */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.88 }}
                className="bg-white border border-[#D6D8D9] rounded-xl p-3 pl-4 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F02D3A] rounded-l-xl" />
                <div className="text-[11px] font-semibold text-black leading-tight">Group study in 8 min</div>
                <div className="text-[9px] text-[#5D6166] mt-0.5">Calendar · Notes ready</div>
                <span className="inline-block bg-[#FDE8E9] text-[#B71C28] text-[8px] font-semibold px-2 py-0.5 rounded mt-1">AIPA</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.18 }}
                className="bg-white border border-[#D6D8D9] rounded-xl p-3 pl-4 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F59E0B] rounded-l-xl" />
                <div className="text-[11px] font-semibold text-black leading-tight">Eggs expiring today</div>
                <div className="text-[9px] text-[#5D6166] mt-0.5">Fridge · Recipe ready</div>
                <span className="inline-block bg-[#FFF3CD] text-[#CC6D00] text-[8px] font-semibold px-2 py-0.5 rounded mt-1">Smart fridge</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="bg-white border border-[#D6D8D9] rounded-xl p-3 pl-4 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#22C55E] rounded-l-xl" />
                <div className="text-[11px] font-semibold text-black leading-tight">{"Today's outfit: 94% match"}</div>
                <div className="text-[9px] text-[#5D6166] mt-0.5">Weather · Calendar aligned</div>
                <span className="inline-block bg-[#E6F4EA] text-[#1A6630] text-[8px] font-semibold px-2 py-0.5 rounded mt-1">Smart closet</span>
              </motion.div>

              {/* FAB */}
              <motion.div
                animate={{ boxShadow: ["0 0 0 0 rgba(240,45,58,0.5)", "0 0 0 12px rgba(240,45,58,0)", "0 0 0 0 rgba(240,45,58,0.5)"] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-9 h-9 bg-[#F02D3A] rounded-full mx-auto mt-2 flex items-center justify-center shrink-0"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-[118px] h-[5px] bg-black/20 rounded-full" />
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="flex flex-col items-center gap-2 mt-11 text-[#AEB0B3] text-xs"
      >
        <span>scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#AEB0B3]"
        />
      </motion.div>
    </section>
  )
}
