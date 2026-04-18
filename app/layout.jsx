import { Inter } from 'next/font/google'
import '../styles/reset.css'
import '../styles/tokens.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const SITE_URL = 'https://faizghifari.com'
const OG_IMAGE = `${SITE_URL}/faiz-optimized.jpg`
const TITLE = 'Faiz Ghifari — CEO & Founder, Belajarlagi'
const DESCRIPTION = "Building Indonesia's learning culture — one person at a time."

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [{ url: '/feed.xml', title: 'Faiz Ghifari — Writing' }],
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mfaizghifari',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Faiz Ghifari',
  jobTitle: 'CEO & Founder',
  worksFor: {
    '@type': 'Organization',
    name: 'Belajarlagi',
  },
  url: SITE_URL,
  image: OG_IMAGE,
  sameAs: [
    'https://www.linkedin.com/in/faizghifari/',
    'https://x.com/mfaizghifari',
    'https://instagram.com/mfaizghifarii',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  )
}
