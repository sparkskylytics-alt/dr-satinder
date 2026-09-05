import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { JsonLd } from '@/components/json-ld'
import { CLINIC } from '@/lib/clinic'
import { breadcrumbSchema } from '@/lib/structured-data'
import { getHomepage } from '@/sanity/lib/homepage'

export const metadata: Metadata = {
  title: 'Contact Us in Muzaffarnagar | Dr. Satinder Eye Care Centre',
  description: 'Contact Dr. Satinder Eye Care Centre in Muzaffarnagar. Address, phone numbers, hours and map. Call 8958334505 to book a consultation.',
  alternates: { canonical: '/contact' },
}

export default async function ContactPage() {
  const content = await getHomepage()

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: CLINIC.url }, { name: 'Contact', url: `${CLINIC.url}/contact` }])} />
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 pb-16 pt-28 md:px-8 md:pt-32">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span>Contact</span>
        </nav>

        <h1 className="mt-4 font-serif text-3xl font-light tracking-tight text-foreground sm:text-5xl">Contact Us in Muzaffarnagar</h1>

        <div className="mt-6 space-y-3 text-sm leading-relaxed text-foreground">
          <p className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{CLINIC.addressDisplay}</p>
          <p className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{CLINIC.telephoneDisplay}</p>
          <p className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{CLINIC.email}</p>
          <p className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{CLINIC.hoursDisplay}</p>
        </div>

        <a
          href={`tel:${CLINIC.telephone[0]}`}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-charcoal"
        >
          <Phone className="h-4 w-4" />
          Call {CLINIC.telephone[0].replace('+91', '')}
        </a>

        <div className="mt-10 overflow-hidden rounded-lg border border-border">
          <iframe
            title="Dr Satinder Eye Care location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55576.67035787829!2d77.61323072167968!3d29.47138449999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c1b11dc372fb3%3A0x6f18e3e888c40138!2sDr.%20SATINDER%20EYE%20CARE%20CENTRE!5e0!3m2!1sen!2sin!4v1787477824622!5m2!1sen!2sin"
            className="h-64 w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </main>
      <SiteFooter content={content?.footer} />
    </>
  )
}
