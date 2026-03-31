"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Smartphone, Lock, ArrowDown } from "lucide-react"

const navItems = [
  { href: "#", icon: Home, label: "Home" },
  { href: "#waitlist", icon: Smartphone, label: "Features" },
  { href: "#waitlist", icon: Lock, label: "Privacy" },
  { href: "#waitlist", icon: ArrowDown, label: "Join" },
]

export function MobileNav() {
  const [active, setActive] = useState(0)

  return (
    <>
      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#D6D8D9] px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 z-50">
        <div className="flex justify-around">
          {navItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setActive(i)}
              className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-medium transition-colors ${
                active === i ? "text-[#F02D3A]" : "text-[#AEB0B3]"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Sticky CTA pill for mobile */}
      <Link
        href="#waitlist"
        className="md:hidden fixed bottom-[68px] left-1/2 -translate-x-1/2 z-40 bg-[#F02D3A] text-white text-sm font-semibold rounded-full px-7 py-3 shadow-lg shadow-[#F02D3A]/40 whitespace-nowrap"
      >
        Get early access
      </Link>
    </>
  )
}
