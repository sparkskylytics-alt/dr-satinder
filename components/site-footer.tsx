 'use client'

import { useState } from 'react'
import { Clock, Mail, MapPin, Phone, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import type { FooterContent } from '@/sanity/lib/homepage'

const COLUMNS = [
  { heading: 'Treatments', links: [{ label: 'Cataract Surgery', href: '#services' }, { label: 'LASIK & Refractive', href: '#services' }, { label: 'Glaucoma', href: '#services' }, { label: 'Retina', href: '#services' }, { label: 'Consultation', href: '#appointment' }] },
  { heading: 'Explore', links: [{ label: 'About', href: '#about' }, { label: 'Treatments', href: '#services' }, { label: 'Technology', href: '#technology' }, { label: 'Gallery', href: '#gallery' }, { label: 'Patients', href: '#testimonials' }] },
]

const ADDRESS = '349, Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar – 251002'

export function SiteFooter({ content }: { content?: FooterContent }) {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null)
  const footer = {
    description: 'Comprehensive, compassionate eye care for clearer vision and long-term eye health.',
    address: ADDRESS,
    phone: '8958334505',
    email: 'Drsatinderyecare@gmail.com',
    hours: 'Mon & Wed–Sun: 10:00 AM – 7:30 PM · Tue: Closed',
    copyright: '© 2026 Dr Satinder Eye Care. All rights reserved.',
    ...content,
  }
  const columns = [
    { heading: 'Treatments', links: content?.treatmentLinks?.length ? content.treatmentLinks : COLUMNS[0].links },
    { heading: 'Explore', links: content?.exploreLinks?.length ? content.exploreLinks : COLUMNS[1].links },
  ]
  const phoneNumbers = ['8958334505']
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
              <div className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><a href="tel:+918958344505" className="transition-colors hover:text-accent">8958334505</a></div>
              <a href="mailto:Drsatinderyecare@gmail.com" className="flex gap-3 break-all transition-colors hover:text-accent"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>Drsatinderyecare@gmail.com</span></a>
              <div className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>Mon & Wed–Sun: 10:00 AM – 7:30 PM · Tue: Closed</span></div>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-lg border border-ivory/10">
          <iframe title="Dr Satinder Eye Care location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55576.67035787829!2d77.61323072167968!3d29.47138449999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c1b11dc372fb3%3A0x6f18e3e888c40138!2sDr.%20SATINDER%20EYE%20CARE%20CENTRE!5e0!3m2!1sen!2sin!4v1787477824622!5m2!1sen!2sin" className="h-64 w-full border-0 grayscale-[0.25]" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-6 text-xs text-ivory/40 sm:flex-row sm:items-center">
          <p>{footer.copyright}</p>
          <div className="flex gap-6"><button type="button" onClick={() => setLegalModal('privacy')} className="transition-colors hover:text-ivory/80">Privacy</button><button type="button" onClick={() => setLegalModal('terms')} className="transition-colors hover:text-ivory/80">Terms</button></div>
        </div>
      </div>
      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
    </footer>
  )
}

function LegalModal({ type, onClose }: { type: 'privacy' | 'terms'; onClose: () => void }) {
  const isPrivacy = type === 'privacy'
  const title = isPrivacy ? 'Privacy policy' : 'Terms of use'
  const copy = isPrivacy
    ? 'We use the details you provide only to respond to your appointment request and coordinate your care. We do not sell your personal information.'
    : 'The information on this website is for general guidance only and does not replace medical advice. Please contact our clinic for personalised care.'

  return <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <div className="relative w-full max-w-sm rounded-xl border border-ivory/15 bg-charcoal p-5 text-ivory shadow-2xl">
      <button type="button" onClick={onClose} className="absolute right-3 top-3 rounded-md p-1.5 text-ivory/65 transition-colors hover:bg-ivory/10 hover:text-ivory" aria-label="Close"><X className="h-4 w-4" /></button>
      <h2 id="legal-modal-title" className="pr-8 font-serif text-2xl">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-ivory/70">{copy}</p>
      <button type="button" onClick={onClose} className="mt-5 rounded-md bg-ivory px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-primary hover:text-ivory">Close</button>
    </div>
  </div>
}
