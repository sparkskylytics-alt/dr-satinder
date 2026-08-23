'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, Check, X } from 'lucide-react'
import { sendAppointmentToWhatsApp } from '@/lib/appointment-whatsapp'

const dismissedKey = 'appointment-modal-dismissed-v2'

export function AppointmentModal() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const autoOpened = useRef(false)

  const close = () => {
    sessionStorage.setItem(dismissedKey, 'true')
    setOpen(false)
  }

  useEffect(() => {
    const openModal = () => {
      setSubmitted(false)
      setOpen(true)
    }
    window.addEventListener('open-appointment', openModal)

    return () => {
      window.removeEventListener('open-appointment', openModal)
    }
  }, [])

  useEffect(() => {
    const showAtMeaningfulDepth = () => {
      if (autoOpened.current || sessionStorage.getItem(dismissedKey)) return
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0
      if (window.scrollY < 900 && progress < 0.35) return

      autoOpened.current = true
      setSubmitted(false)
      setOpen(true)
      window.removeEventListener('scroll', showAtMeaningfulDepth)
    }

    window.addEventListener('scroll', showAtMeaningfulDepth, { passive: true })
    return () => window.removeEventListener('scroll', showAtMeaningfulDepth)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const escape = (event: KeyboardEvent) => event.key === 'Escape' && close()
    window.addEventListener('keydown', escape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', escape)
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="appointment-modal-title" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <div className="relative w-full max-w-md rounded-2xl border border-ivory/15 bg-charcoal p-4 text-ivory shadow-2xl sm:p-5">
        <button type="button" onClick={close} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-ivory/15 text-ivory/75 transition-colors hover:bg-ivory hover:text-charcoal" aria-label="Close appointment form"><X className="h-4 w-4" /></button>
        {submitted ? (
          <div className="flex min-h-64 flex-col items-center justify-center text-center"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary"><Check className="h-5 w-5" /></span><h2 id="appointment-modal-title" className="mt-4 font-serif text-2xl">Thank you</h2><p className="mt-2 max-w-sm text-sm leading-relaxed text-ivory/70">Your request has been received. Our team will call you shortly to confirm your appointment.</p></div>
        ) : (
          <><p className="label-caps text-accent">Appointments</p><h2 id="appointment-modal-title" className="mt-1 font-serif text-2xl sm:text-3xl">Book a consultation</h2><p className="mt-1 text-sm leading-relaxed text-ivory/65">Our care team will contact you to confirm your visit.</p>
            <form className="mt-4 space-y-2.5" onSubmit={(event) => { event.preventDefault(); sendAppointmentToWhatsApp(event.currentTarget); setSubmitted(true); sessionStorage.setItem(dismissedKey, 'true') }}>
              <Input label="Full name" name="name" placeholder="Your name" required />
              <Input label="Phone" name="phone" type="tel" placeholder="+91 00000 00000" required />
              <Input label="Message" name="message" placeholder="Anything we should know?" textarea />
              <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-md bg-ivory px-5 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-primary hover:text-ivory">Request appointment <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
            </form>
          </>
        )}
      </div>
    </div>, document.body,
  )
}

function Input({ label, name, type = 'text', placeholder, textarea, required }: { label: string; name: string; type?: string; placeholder?: string; textarea?: boolean; required?: boolean }) {
  const className = 'w-full rounded-md border border-ivory/15 bg-transparent px-3 py-2 text-sm text-ivory placeholder:text-ivory/35 outline-none transition-colors focus:border-[var(--logo-blue)]'
  return <label className="block"><span className="label-caps mb-1 block text-[0.56rem] text-ivory/60">{label}</span>{textarea ? <textarea name={name} rows={2} placeholder={placeholder} className={`${className} resize-none`} /> : <input name={name} type={type} placeholder={placeholder} required={required} className={className} />}</label>
}
