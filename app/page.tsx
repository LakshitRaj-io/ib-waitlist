"use client"

import { useState, ReactNode } from "react"
import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { ProblemSection } from "@/components/problem-section"
import { FeaturesSection } from "@/components/features-section"
import { PrivacySection } from "@/components/privacy-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { MobileNav } from "@/components/mobile-nav"
import { FeatureModal } from "@/components/feature-modal"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<{
    title: string
    body: string
    icon: ReactNode
    accentColor: string
  } | null>(null)

  const openModal = (title: string, body: string, icon: ReactNode, accentColor: string) => {
    setModalContent({ title, body, icon, accentColor })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <main className="bg-background overflow-x-hidden">
      <Nav />
      <Hero />
      <ProblemSection />
      <FeaturesSection openModal={openModal} />
      <PrivacySection />
      <SocialProofSection />
      <CtaSection />
      <Footer />
      <MobileNav />
      <FeatureModal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
      />
    </main>
  )
}
