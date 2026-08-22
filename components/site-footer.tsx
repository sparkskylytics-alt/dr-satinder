import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '@/components/logo'
import type { FooterContent } from '@/sanity/lib/homepage'

const COLUMNS = [
  { heading: 'Treatments', links: [{ label: 'Cataract Surgery', href: '#services' }, { label: 'LASIK & Refractive', href: '#services' }, { label: 'Glaucoma', href: '#services' }, { label: 'Retina', href: '#services' }, { label: 'Consultation', href: '#appointment' }] },
  { heading: 'Explore', links: [{ label: 'About', href: '#about' }, { label: 'Treatments', href: '#services' }, { label: 'Technology', href: '#technology' }, { label: 'Gallery', href: '#gallery' }, { label: 'Patients', href: '#testimonials' }] },
]

const ADDRESS = '349, Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar – 251002'

export function SiteFooter({ content }: { content?: FooterContent }) {
  const footer = {
    description: 'Comprehensive, compassionate eye care for clearer vision and long-term eye health.',
    address: ADDRESS,
    phone: '89583 44505 · 86305 06562',
    email: 'Drsatinderyecare@gmail.com',
    hours: 'Mon & Wed–Sun: 10:00 AM – 7:30 PM · Tue: Closed',
    copyright: '© 2026 Dr Satinder Eye Care. All rights reserved.',
    ...content,
  }
  const columns = [
    { heading: 'Treatments', links: content?.treatmentLinks?.length ? content.treatmentLinks : COLUMNS[0].links },
    { heading: 'Explore', links: content?.exploreLinks?.length ? content.exploreLinks : COLUMNS[1].links },
  ]
  const phoneNumbers = footer.phone.split(/[·,]/).map((phone) => phone.trim()).filter(Boolean)
  return (
    <footer className="bg-[#0d0f10] text-ivory">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid gap-9 lg:grid-cols-[1.05fr_1fr_1.35fr]">
          <div>
            <div className="inline-flex rounded-lg bg-ivory/[0.03] p-3"><Logo tone="light" /></div>
            <p className="mt-6 max-w-xs text-pretty text-sm leading-relaxed text-ivory/55">
              {footer.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="label-caps text-[0.58rem] text-accent">{col.heading}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}><a href={link.href} className="text-sm text-ivory/60 transition-colors hover:text-[var(--logo-blue)]">{link.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <p className="label-caps text-[0.58rem] text-accent">Visit & contact</p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-ivory/65">
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(footer.address)}`} target="_blank" rel="noreferrer" className="flex gap-3 transition-colors hover:text-ivory"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>{footer.address}</span></a>
              <div className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span className="flex flex-wrap gap-x-2">{phoneNumbers.map((phone, index) => <span key={phone} className="contents"><a href={`tel:${phone.replace(/\D/g, '')}`} className="transition-colors hover:text-accent">{phone}</a>{index < phoneNumbers.length - 1 && <span className="text-ivory/35">·</span>}</span>)}</span></div>
              <a href={`mailto:${footer.email}`} className="flex gap-3 break-all transition-colors hover:text-accent"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>{footer.email}</span></a>
              <div className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>{footer.hours}</span></div>
            </div>
            <div className="hidden">
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(footer.address)}`} target="_blank" rel="noreferrer" className="flex gap-3 transition-colors hover:text-ivory"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>{footer.address}</span></a>
              <div className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span className="flex flex-wrap gap-x-2"><a href="tel:+918958344505" className="transition-colors hover:text-accent">89583 44505</a><span className="text-ivory/35">·</span><a href="tel:+918630506562" className="transition-colors hover:text-accent">86305 06562</a></span></div>
              <a href="mailto:Drsatinderyecare@gmail.com" className="flex gap-3 break-all transition-colors hover:text-accent"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>Drsatinderyecare@gmail.com</span></a>
              <div className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>Mon & Wed–Sun: 10:00 AM – 7:30 PM · Tue: Closed</span></div>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-lg border border-ivory/10">
          <iframe title="Dr Satinder Eye Care location" src={`https://www.google.com/maps?q=${encodeURIComponent(footer.address)}&output=embed`} className="h-64 w-full border-0 grayscale-[0.25]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-6 text-xs text-ivory/40 sm:flex-row sm:items-center">
          <p>{footer.copyright}</p>
          <div className="flex gap-6"><a href="#" className="transition-colors hover:text-ivory/80">Privacy</a><a href="#" className="transition-colors hover:text-ivory/80">Terms</a><a href="#" className="transition-colors hover:text-ivory/80">Accessibility</a></div>
        </div>
      </div>
    </footer>
  )
}
