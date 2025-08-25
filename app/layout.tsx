import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'
import { JsonLd, getOrganizationSchema, getToolsPageSchema, combineSchemas } from '@/lib/jsonld'
import { NavigationHeader } from '@/components/navigation-header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Free Tools - The Auspicious Company',
  description: 'A collection of free tools and utilities provided by The Auspicious Company, including SEO and Security tools.',
  keywords: 'tools, utilities, free, open source, AI, SEO, business',
  authors: [{ name: 'The Auspicious Company' }],
  creator: 'The Auspicious Company',
  publisher: 'The Auspicious Company',
  icons: {
    icon: '/favicon.ico',
    apple: '/auspicious.png',
  },
  openGraph: {
    title: 'Free Tools - The Auspicious Company',
    description: 'A collection of free tools and utilities provided by The Auspicious Company, including SEO and Security tools.',
    url: 'https://www.theauspiciouscompany.com',
    siteName: 'The Auspicious Company',
    type: 'website',
    images: [
      {
        url: '/auspicious.png',
        width: 512,
        height: 512,
        alt: 'The Auspicious Company Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Tools - The Auspicious Company',
    description: 'A collection of free tools and utilities provided by The Auspicious Company, including SEO and Security tools.',
    images: ['/auspicious.png'],
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
      <head>
        {/* JSON-LD Schema for Organization and Tools Page */}
        <JsonLd data={combineSchemas(
          getOrganizationSchema(),
          getToolsPageSchema()
        )} />
      </head>
      <body className={inter.className}>
        <NavigationHeader />
        <main className="min-h-screen bg-background">
          {children}
        </main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
