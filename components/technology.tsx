'use client'

import { useEffect, useRef, useState } from 'react'
import { SanityImage as Image } from '@/components/sanity-image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { MaskHeading, Reveal } from '@/components/reveal'
import type { TechnologyContent } from '@/sanity/lib/homepage'

const MACHINES = [
  {
    n: '01',
    name: 'Auto Refractor',
    copy: 'Fast, objective measurement of refractive error to guide your prescription.',
    image: '/optimized/images/technology/auto-refractor.webp',
  },
  {
    n: '02',
    name: 'Keratometer',
    copy: 'Detailed corneal curvature measurements for accurate lens planning and fitting.',
    image: '/optimized/images/technology/keratometer.webp',
  },
  {
    n: '03',
    name: 'Lensometer',
    copy: 'Precise verification of spectacle lens power for dependable visual correction.',
    image: '/optimized/images/technology/lensometer.webp',
  },
  {
    n: '04',
    name: 'Surgical Microscope',
    copy: 'High-definition magnification supporting controlled, precise eye procedures.',
    image: '/optimized/images/technology/microscope.webp',
  },
  {
    n: '05',
    name: 'Non-Contact Tonometer',
    copy: 'A quick, comfortable way to screen intraocular pressure for glaucoma care.',
    image: '/optimized/images/technology/non-contact-tonometer.webp',
  },
  {
    n: '06',
    name: 'Ocular Scan',
    copy: 'Detailed imaging that helps our team assess eye structures with clarity.',
    image: '/optimized/images/technology/scan.webp',
  },
  {
    n: '07',
    name: 'Slit Lamp',
    copy: 'High-magnification examination of the cornea, lens, retina, and eye surface.',
    image: '/optimized/images/technology/slit-lamps.webp',
  },
]

export function Technology({ content }: { content?: TechnologyContent }) {
  const technology = { eyebrow: 'Technology', heading: 'Instruments engineered for certainty', description: 'Diagnosis is only as good as the tools behind it. Our theatre and clinic run on the same platforms trusted by leading eye hospitals worldwide.', ...content }
  const machines = content?.machines?.length ? content.machines.map((machine, index) => ({ n: String(index + 1).padStart(2, '0'), name: machine.name ?? 'Instrument', copy: machine.description ?? '', image: machine.image ?? MACHINES[index % MACHINES.length].image })) : MACHINES
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const visibleRef = useRef(false)
  const [selectedMachine, setSelectedMachine] = useState<(typeof MACHINES)[number] | null>(null)

  const scrollMachines = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' })
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting
    }, { threshold: 0.25 })
    observer.observe(track)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      const track = trackRef.current
      if (!track || !visibleRef.current || pausedRef.current) return

      const nextPosition = track.scrollLeft + track.clientWidth
      const atEnd = nextPosition >= track.scrollWidth - track.clientWidth - 8
      track.scrollTo({ left: atEnd ? 0 : nextPosition, behavior: 'smooth' })
    }, 5600)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedMachine(null)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <section
      id="technology"
      className="relative bg-[#101214] py-8 text-ivory md:py-10"
      onPointerEnter={() => {
        pausedRef.current = true
      }}
      onPointerLeave={() => {
        pausedRef.current = false
      }}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="label-caps inline-flex items-center gap-2 text-accent">
                <span className="h-px w-8 bg-accent" />
                {technology.eyebrow}
              </span>
            </Reveal>
            <MaskHeading
              as="h2"
              className="mt-4 max-w-2xl font-serif text-3xl font-light leading-[1.08] tracking-tight sm:text-4xl"
              lines={[technology.heading]}
            />
          </div>
          <Reveal delay={200} className="max-w-sm text-pretty text-sm leading-relaxed text-ivory/65">
            <p>
              {technology.description}
            </p>
          </Reveal>
        </div>

        <div className="group/carousel relative mt-6 overflow-hidden">
          <button
            type="button"
            onClick={() => scrollMachines(-1)}
            aria-label="Show previous instruments"
            className="absolute left-2 top-[35%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/85 text-ivory shadow-lg backdrop-blur-sm transition-colors hover:bg-ivory hover:text-charcoal"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollMachines(1)}
            aria-label="Show more instruments"
            className="absolute right-2 top-[35%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/85 text-ivory shadow-lg backdrop-blur-sm transition-colors hover:bg-ivory hover:text-charcoal"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={trackRef}
            className="scrollbar-hidden flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3"
          >
            {machines.map((m, i) => (
              <Reveal
                key={m.name}
                delay={i * 130}
                className="group w-[20rem] shrink-0 snap-start sm:w-[24rem] lg:w-[calc((100%-2.5rem)/3)]"
              >
                <button
                  type="button"
                  onClick={() => setSelectedMachine(m)}
                  className="relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-black/25 text-left focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[#101214]"
                  aria-label={`View ${m.name} details`}
                >
                  <Image
                    src={m.image || '/placeholder.svg'}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 320px, 384px"
                    className="object-contain p-2 transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                  <span className="absolute bottom-4 right-4 rounded-full bg-charcoal/80 px-3 py-1.5 text-xs font-medium text-ivory opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                    View details
                  </span>
                </button>
                <h3 className="mt-4 font-serif text-2xl">{m.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/60">{m.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      {selectedMachine && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="machine-dialog-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedMachine(null)
          }}
        >
          <div className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl overflow-y-auto rounded-xl bg-[#1b1f22] shadow-2xl sm:max-h-[calc(100dvh-2.5rem)]">
            <button
              type="button"
              onClick={() => setSelectedMachine(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/85 text-ivory transition-colors hover:bg-ivory hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Close instrument details"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative h-[min(54vh,26rem)] overflow-hidden bg-black/30 sm:h-[min(56vh,28rem)]">
              <Image src={selectedMachine.image} alt={selectedMachine.name} fill sizes="(max-width: 768px) 100vw, 960px" className="object-contain p-3 sm:p-4" />
            </div>
            <div className="p-4 sm:px-6 sm:py-5">
              <h3 id="machine-dialog-title" className="mt-1 font-serif text-2xl text-ivory sm:text-3xl">{selectedMachine.name}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/70">{selectedMachine.copy}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
