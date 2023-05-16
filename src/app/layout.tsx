import '~/css/global.scss'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { AppHooks } from './app-hooks'
import { Header } from './components/header'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: {
    default: 'next-typescript | basement.studio',
    template: '%s | basement.studio'
  },
  description: `A minimalist's boilerplate — Next.js with TypeScript.`,
  openGraph: {
    type: 'website',
    siteName: 'next-typescript | basement.studio',
    title: 'next-typescript | basement.studio'
  },
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png'
    }
  ],
  manifest: '/manifest.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: 'next-typescript | basement.studio',
    creator: '@basementstudio',
    siteId: '@basementstudio'
  }
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body style={{ opacity: 0 }} className={inter.variable}>
        <Header />
        {children}
        <AppHooks />
      </body>
    </html>
  )
}

export default RootLayout
