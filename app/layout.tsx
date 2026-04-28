import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://app.icebrkr.one'),
  title: 'icebrkr — Your day. Before you even asked.',
  description: 'The proactive AI personal assistant that anticipates your needs. One scroll for your whole life.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/ib-icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
  openGraph: {
    title: 'icebrkr — Your day. Before you even asked.',
    description: 'The proactive AI personal assistant that anticipates your needs. One scroll for your whole life.',
    url: 'https://app.icebrkr.one',
    siteName: 'icebrkr',
    images: [
      {
        url: '/icebrkr-brand-icon.png',
        width: 1200,
        height: 630,
        alt: 'icebrkr logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'icebrkr — Your day. Before you even asked.',
    description: 'The proactive AI personal assistant that anticipates your needs. One scroll for your whole life.',
    images: ['/icebrkr-brand-icon.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
