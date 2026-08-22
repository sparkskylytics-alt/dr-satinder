import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dr Satinder Eye Care | Advanced Ophthalmology & Vision Care',
  description:
    'A premium eye-care clinic offering advanced cataract, LASIK, glaucoma and retina care with world-class technology and compassionate expertise.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/images/dr-satinder-eye-care-logo.jpeg', type: 'image/jpeg' }],
    shortcut: '/images/dr-satinder-eye-care-logo.jpeg',
    apple: '/images/dr-satinder-eye-care-logo.jpeg',
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
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
