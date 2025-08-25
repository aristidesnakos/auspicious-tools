import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auspicious Tools - Free Online Utilities',
  description: 'A collection of free, open-source tools and utilities for developers, marketers, and businesses.',
  keywords: 'tools, utilities, free, open source, AI, SEO, business',
  authors: [{ name: 'The Auspicious Company' }],
  creator: 'The Auspicious Company',
  publisher: 'The Auspicious Company',
  openGraph: {
    title: 'Auspicious Tools - Free Online Utilities',
    description: 'A collection of free, open-source tools and utilities for developers, marketers, and businesses.',
    url: 'https://tools.theauspiciouscompany.com',
    siteName: 'Auspicious Tools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auspicious Tools - Free Online Utilities',
    description: 'A collection of free, open-source tools and utilities for developers, marketers, and businesses.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-background">
          {children}
        </main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
