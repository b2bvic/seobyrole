import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import clsx from 'clsx'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Use local version of Lexend so that we can use OpenType features
const lexend = localFont({
  src: '../fonts/lexend.woff2',
  display: 'swap',
  variable: '--font-lexend',
})

export const metadata: Metadata = {
  title: {
    template: '%s | SEO by Role',
    default: 'SEO by Role - SEO Guidance for Every Company Role',
  },
  description: 'Role-specific SEO guidance for CMOs, developers, content teams, and executives. Learn what SEO means for your specific job function.',
  metadataBase: new URL('https://seobyrole.com'),
  authors: [{ name: 'Victor Valentine Romo', url: 'https://victorvalentineromo.com' }],
  creator: 'Victor Valentine Romo',
  openGraph: {
    title: 'SEO by Role - SEO Guidance for Every Company Role',
    description: 'Role-specific SEO guidance for CMOs, developers, content teams, and executives.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@b2bvic',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable, lexend.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full bg-white dark:bg-slate-900">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
