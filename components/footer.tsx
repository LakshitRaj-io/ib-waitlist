"use client"

import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#F0F1F3]">
      <div className="max-w-5xl mx-auto px-6 md:px-10 pt-14 pb-10">

        {/* Brand block — centered */}
        <div className="flex flex-col items-center text-center mb-12">

          {/* IB icon — original colors, small */}
          <div className="mb-4">
            <Image
              src="/ib-icon.svg"
              alt="icebrkr"
              width={40}
              height={47}
              className="w-10 h-auto"
              priority
            />
          </div>

          {/* Brand name */}
          <p
            className="text-[#111111] text-[11px] tracking-[0.26em] uppercase mb-3"
            style={{ fontFamily: "var(--font-lexend, 'Lexend', sans-serif)", fontWeight: 500 }}
          >
            icebrkr
          </p>

          {/* Tagline */}
          <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-xs font-sans">
            Breaking the Ice Building the Gap. Efficiency is icebrkr’s other name.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#F0F1F3] mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#9CA3AF] font-sans">

          {/* Left — location + email */}
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span className="flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-4 h-3 rounded-sm overflow-hidden flex-shrink-0">
                <svg viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect width="16" height="12" fill="#D52B1E" />
                  <rect x="6" y="0" width="4" height="12" fill="white" />
                  <rect x="0" y="4" width="16" height="4" fill="white" />
                </svg>
              </span>
              Geneva, Switzerland · Data stored in Switzerland
            </span>
            <span className="hidden md:inline text-[#E5E7EB]">|</span>
            <a
              href="mailto:info@icebrkr.one"
              className="hover:text-[#111111] transition-colors duration-200"
            >
              info@icebrkr.one
            </a>
          </div>

          {/* Right — copyright */}
          <p>
            &copy; {new Date().getFullYear()} icebrkr. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  )
}
