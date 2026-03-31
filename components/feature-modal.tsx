"use client"

import { useEffect, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface FeatureModalProps {
  isOpen: boolean
  onClose: () => void
  content: {
    title: string
    body: string
    icon: ReactNode
    accentColor: string
  } | null
}

export function FeatureModal({ isOpen, onClose, content }: FeatureModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", handleEscape)
    }
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!content) return null

  // Map accent color to background color
  const bgColorMap: Record<string, string> = {
    "#F02D3A": "#FDE8E9",
    "#3B82F6": "#EFF6FF",
    "#8B5CF6": "#F5F3FF",
    "#14B8A6": "#F0FDFA",
    "#F59E0B": "#FFF3CD",
    "#22C55E": "#E6F4EA",
  }

  const bgColor = bgColorMap[content.accentColor] || "#E0E1E2"

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 md:p-10 max-w-md w-full relative shadow-2xl"
          >
            {/* Top accent bar */}
            <div 
              className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl"
              style={{ backgroundColor: content.accentColor }}
            />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 border-2 border-[#D6D8D9] rounded-full bg-white flex items-center justify-center text-[#5D6166] hover:bg-[#E0E1E2] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2"
              style={{ backgroundColor: bgColor, color: content.accentColor }}
            >
              {content.icon}
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-black mt-2 mb-3">
              {content.title}
            </h3>

            <p className="text-sm md:text-base text-[#5D6166] leading-relaxed">
              {content.body}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
