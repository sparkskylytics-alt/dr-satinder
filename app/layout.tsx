import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CLINIC } from '@/lib/clinic'
import { AppointmentModal } from '@/components/appointment-modal'

const TITLE = 'Eye Doctor & Eye Hospital in Muzaffarnagar | Dr. Satinder'
const DESCRIPTION =
  'Dr. Satinder Eye Care Centre – trusted eye specialist in Muzaffarnagar for 50+ years. Cataract, LASIK, glaucoma & kids eye care. Open daily. Call 8958334505.'

export const metadata: Metadata = {
  metadataBase: new URL(CLINIC.url),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'eye specialist Muzaffarnagar',
    'eye hospital Muzaffarnagar',
    'ophthalmologist Muzaffarnagar',
    'cataract surgery Muzaffarnagar',
    'LASIK eye surgery Muzaffarnagar',
    'glaucoma treatment Muzaffarnagar',
    'retina treatment Muzaffarnagar',
    'pediatric eye care Muzaffarnagar',
    'Dr Satinder Eye Care Centre',
    'best eye doctor Muzaffarnagar',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/images/dr-satinder-eye-care-logo.jpeg', type: 'image/jpeg' }],
    shortcut: '/images/dr-satinder-eye-care-logo.jpeg',
    apple: '/images/dr-satinder-eye-care-logo.jpeg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: CLINIC.url,
    siteName: CLINIC.legalName,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/images/dr-satinder-eye-care-logo.jpeg', width: 512, height: 512, alt: CLINIC.legalName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/dr-satinder-eye-care-logo.jpeg'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f5f0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <AppointmentModal />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
