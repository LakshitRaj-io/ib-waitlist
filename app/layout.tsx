import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

export const metadata: Metadata = {
  title: 'icebrkr — Your day. Before you even asked.',
  description: 'The proactive AI personal assistant that anticipates your needs. One scroll for your whole life.',
  generator: 'icebrkr.one',
  icons: {
    icon: [
      {
        url: '/ib-icon.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/ib-icon.svg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/ib-icon.svg',
        type: 'image/svg+xml',
      },
    ],
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
