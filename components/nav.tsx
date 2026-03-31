"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 md:px-7 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-[0_1px_0_var(--border)]"
          : "bg-transparent"
      }`}
    >
      <Link href="#" className="flex items-center gap-2">
        <Image
          src="/icebrkr-wordmark.svg"
          alt="icebrkr"
          width={200}
          height={56}
          className="h-10 w-auto"
          priority
        />
      </Link>
      <Link
        href="#waitlist"
        className="bg-[#F02D3A] text-white text-sm font-semibold rounded-full px-5 py-2.5 hover:scale-105 hover:shadow-lg hover:shadow-[#F02D3A]/30 transition-all duration-200"
      >
        Get early access
      </Link>
    </motion.nav>
  )
}
