import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Nigerian Budget Tracker',
    template: '%s | Nigerian Budget Tracker',
  },
  description: 'Track and analyze Nigerian state budgets transparently',
  keywords: ['Nigeria', 'budget', 'tracking', 'transparency', 'government', 'finance'],
  authors: [{ name: 'Praise Ibe' }],
  creator: 'Praise Ibe',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://ngtrak.netlify.app/',
    title: 'Nigerian Budget Tracker',
    description: 'Track and analyze Nigerian state budgets transparently',
    siteName: 'Nigerian Budget Tracker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nigerian Budget Tracker',
    description: 'Track and analyze Nigerian state budgets transparently',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

