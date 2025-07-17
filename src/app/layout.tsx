import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Free Invoice Generator - Professional Invoice Templates',
  description: 'Create professional invoices instantly with our free invoice generator. Download PDF invoices, customize templates, and manage your billing efficiently.',
  keywords: ['invoice generator', 'free invoice', 'PDF invoice', 'billing software', 'invoice template'],
  authors: [{ name: 'Franco Fantillo' }],
  creator: 'Franco Fantillo',
  publisher: 'Franco Fantillo',
  metadataBase: new URL('https://francofantillo.github.io/invoice-generator-standalone'),
  openGraph: {
    title: 'Free Invoice Generator - Professional Invoice Templates',
    description: 'Create professional invoices instantly with our free invoice generator. Download PDF invoices, customize templates, and manage your billing efficiently.',
    type: 'website',
    locale: 'en_US',
    url: 'https://francofantillo.github.io/invoice-generator-standalone',
    siteName: 'Free Invoice Generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Invoice Generator - Professional Invoice Templates',
    description: 'Create professional invoices instantly with our free invoice generator. Download PDF invoices, customize templates, and manage your billing efficiently.',
    creator: '@franco_fantillo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
