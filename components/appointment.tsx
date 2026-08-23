'use client'

import Image from 'next/image'
import { useState, type FormEvent, type ReactNode } from 'react'
import { ArrowUpRight, Check, Phone, Clock, MapPin, Mail } from 'lucide-react'
import { MaskHeading, Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'
import { sendAppointmentToWhatsApp } from '@/lib/appointment-whatsapp'
import type { ContactContent } from '@/sanity/lib/homepage'

const fallbackContact = {
  eyebrow: 'Appointments',
  heading: 'Begin with a conversation',
  description: 'Share a few details and our care team will confirm your visit. No obligation — just a considered first step toward clearer vision.',
  appointmentImagePath: '/images/appointment-cta.png',
  phoneNumbers: ['8958334505'],
  email: 'Drsatinderyecare@gmail.com',
  hours: 'Mon & Wed–Sun: 10:00 AM – 7:30 PM · Tue: Closed',
  address: '349, Shamli Road, near Tarachand Petrol Pump, Muzaffarnagar – 251002',
}

export function Appointment({ content }: { content?: ContactContent }) {
  const contact = { ...fallbackContact, ...content }
  const phoneNumbers = fallbackContact.phoneNumbers
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    sendAppointmentToWhatsApp(event.currentTarget)
    setSubmitted(true)
  }

  return (
    <section id="appointment" className="relative overflow-hidden bg-charcoal py-7 text-ivory md:py-9">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 md:px-8 lg:grid-cols-2 lg:gap-9">
        <div>
          <Reveal><span className="label-caps inline-flex items-center gap-2 text-accent"><span className="h-px w-8 bg-accent" />{contact.eyebrow}</span></Reveal>
          <MaskHeading as="h2" className="mt-4 font-serif text-3xl font-light leading-[1.06] tracking-tight sm:text-4xl" lines={[contact.heading]} />
          <Reveal delay={200} className="mt-4 max-w-md text-sm leading-relaxed text-ivory/70"><p>{contact.description}</p></Reveal>

          <Reveal delay={300} className="mt-4 space-y-2">
            <Detail icon={Phone} label="Call us" value={<span className="flex flex-wrap gap-x-2">{phoneNumbers.map((phone, index) => <span key={phone} className="contents"><a href={`tel:${phone.replace(/\D/g, '')}`} className="hover:text-accent">{phone}</a>{index < phoneNumbers.length - 1 && <span className="text-ivory/35">·</span>}</span>)}</span>} />
            <Detail icon={Mail} label="Email" value={<a href={`mailto:${contact.email}`} className="hover:text-accent">{contact.email}</a>} />
            <Detail icon={Clock} label="Clinic hours" value={contact.hours} />
            <Detail icon={MapPin} label="Visit" value={contact.address} />
          </Reveal>

          <div className="relative mt-4 hidden aspect-[16/5] overflow-hidden rounded-lg lg:block"><Image src={contact.appointmentImagePath} alt="A reassured patient at rest" fill sizes="45vw" className="object-cover" /></div>
        </div>

        <Reveal delay={120}>
          <div className="rounded-xl border border-ivory/12 bg-ivory/[0.04] p-4 backdrop-blur-sm sm:p-5">
            {submitted ? (
              <div className="flex min-h-[24rem] flex-col items-center justify-center text-center"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-ivory"><Check className="h-7 w-7" /></span><h3 className="mt-6 font-serif text-3xl">Thank you</h3><p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/70">Your request has been received. Our team will call you shortly to confirm your appointment.</p></div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <Field label="Full name" name="name" placeholder="Your name" />
                <Field label="Phone" name="phone" type="tel" placeholder="+91 00000 00000" />
                <Field label="Message" name="message" placeholder="Anything we should know?" textarea />
                <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-md bg-ivory px-6 py-3.5 text-sm font-medium text-charcoal transition-colors duration-300 hover:bg-primary hover:text-ivory">Request Appointment <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Detail({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: ReactNode }) {
  return <div className="flex items-center gap-3 rounded-lg border border-ivory/10 bg-ivory/[0.03] p-2.5 transition-colors hover:border-ivory/25"><span className="flex h-9 w-9 items-center justify-center rounded-md border border-ivory/15 text-accent"><Icon className="h-4 w-4" /></span><div><p className="label-caps text-[0.56rem] text-ivory/50">{label}</p><div className="mt-0.5 text-sm text-ivory/90 transition-colors">{value}</div></div></div>
}

function Field({ label, name, type = 'text', placeholder, textarea }: { label: string; name: string; type?: string; placeholder?: string; textarea?: boolean }) {
  const base = 'w-full rounded-md border border-ivory/15 bg-transparent px-3 py-2.5 text-sm text-ivory placeholder:text-ivory/35 outline-none transition-colors duration-300 focus:border-[var(--logo-blue)]'
  return <label className="block"><span className="label-caps mb-2 block text-[0.6rem] text-ivory/60">{label}</span>{textarea ? <textarea name={name} rows={3} placeholder={placeholder} className={cn(base, 'resize-none')} /> : <input name={name} type={type} placeholder={placeholder} className={cn(base, '[color-scheme:dark]')} />}</label>
}
