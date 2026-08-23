'use client'

import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Treatments', href: '#services' },
  { label: 'Technology', href: '#technology' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Patients', href: '#testimonials' },
  { label: 'Contact', href: '#appointment' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#about')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV.map((n) => document.querySelector(n.href)).filter(Boolean) as Element[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border/70 bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" aria-label="Dr Satinder Eye Care home">
          <Logo tone="dark" />
        </a>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
              <span
                className={cn(
                  'absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--logo-blue)] transition-transform duration-300 group-hover:scale-x-100',
                  active === item.href && 'scale-x-100',
                )}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#appointment"
            onClick={(event) => { event.preventDefault(); window.dispatchEvent(new Event('open-appointment')) }}
            className="group hidden items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-300 hover:bg-charcoal sm:inline-flex"
          >
            Book Consultation
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#appointment"
            onClick={(event) => { event.preventDefault(); setOpen(false); window.dispatchEvent(new Event('open-appointment')) }}
            className="inline-flex h-8 items-center justify-center rounded-sm bg-primary px-3 text-[0.68rem] font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-charcoal sm:hidden"
            aria-label="Call to request a consultation"
          >
            Request Consultation
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-50 h-[100dvh] w-screen overflow-y-auto bg-background transition-transform duration-300 lg:hidden',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Logo tone="dark" />
          <button
            type="button"
            onClick={(event) => { event.preventDefault(); setOpen(false); window.dispatchEvent(new Event('open-appointment')) }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-1 px-6 py-5" aria-label="Mobile">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3.5 font-serif text-3xl text-foreground sm:py-5 sm:text-4xl"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="space-y-3 px-6 pb-6 sm:pb-10">
          <a
            href="tel:+918958334505"
            className="flex items-center justify-center gap-2 rounded-md border border-primary px-6 py-3.5 text-base font-medium text-primary"
          >
            <Phone className="h-5 w-5" />
            Call 8958334505
          </a>
          <a
            href="#appointment"
            onClick={(event) => { event.preventDefault(); setOpen(false); window.dispatchEvent(new Event('open-appointment')) }}
            className="group flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 text-base font-medium text-primary-foreground"
          >
            Book Consultation
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </header>
  )
}
