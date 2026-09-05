'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { SanityImage as Image } from '@/components/sanity-image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { MaskHeading, Reveal } from '@/components/reveal'
import type { GalleryContent } from '@/sanity/lib/homepage'

const IMAGES = [1, 2, 3, 5, 7, 8, 9, 10, 11, 12].map((number) => ({
  src: `/optimized/images/gallery/${number}.webp`,
  alt: `Dr Satinder Eye Care clinic gallery image ${number}`,
  label: 'Dr Satinder Eye Care',
}))

export function Gallery({ content }: { content?: GalleryContent }) {
  const gallery = { eyebrow: 'The space', heading: 'A clinic designed to put you at ease', description: 'Explore the calm, comfortable spaces where your eye care takes place.', ...content }
  const images = content
    ? content.items?.filter((item): item is { _key?: string; src: string; alt?: string } => Boolean(item.src)).map((item) => ({ src: item.src, alt: item.alt ?? 'Dr Satinder Eye Care clinic gallery image', label: 'Dr Satinder Eye Care' })) ?? []
    : IMAGES
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const visibleRef = useRef(false)
  const [selectedImage, setSelectedImage] = useState<(typeof IMAGES)[number] | null>(null)

  const scrollGallery = (direction: 1 | -1) => {
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
      if (!track || !visibleRef.current || pausedRef.current || selectedImage) return

      const nextPosition = track.scrollLeft + track.clientWidth
      const atEnd = nextPosition >= track.scrollWidth - track.clientWidth - 8
      track.scrollTo({ left: atEnd ? 0 : nextPosition, behavior: 'smooth' })
    }, 5600)

    return () => window.clearInterval(timer)
  }, [selectedImage])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    if (!selectedImage) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [selectedImage])

  return (
    <section id="gallery" className="relative overflow-hidden bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <span className="label-caps inline-flex items-center gap-2 text-primary">
                <span className="h-px w-8 bg-primary" />
                {gallery.eyebrow}
              </span>
            </Reveal>
            <MaskHeading
              as="h2"
              className="mt-4 font-serif text-3xl font-light leading-[1.08] tracking-tight text-foreground sm:text-4xl"
              lines={[gallery.heading]}
            />
          </div>
          <Reveal delay={140} className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {gallery.description}
          </Reveal>
        </div>

        <Reveal delay={180} className="mt-8">
          <div
            className="group/carousel relative overflow-hidden"
            onPointerEnter={() => {
              pausedRef.current = true
            }}
            onPointerLeave={() => {
              pausedRef.current = false
            }}
          >
            <button
              type="button"
              onClick={() => scrollGallery(-1)}
              aria-label="Show previous gallery images"
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/45 bg-charcoal/80 text-ivory shadow-lg backdrop-blur-sm transition-colors hover:bg-ivory hover:text-charcoal"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollGallery(1)}
              aria-label="Show more gallery images"
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/45 bg-charcoal/80 text-ivory shadow-lg backdrop-blur-sm transition-colors hover:bg-ivory hover:text-charcoal"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div ref={trackRef} className="scrollbar-hidden flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3">
              {images.map((img, index) => (
                <button
                  type="button"
                  key={img.src}
                  onClick={() => setSelectedImage(img)}
                  className="group relative aspect-[3/2] w-[19rem] shrink-0 snap-start overflow-hidden rounded-lg sm:w-[24rem] lg:w-[calc((100%-2.5rem)/3)]"
                  aria-label={`Open ${img.alt}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 304px, (max-width: 1024px) 384px, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="label-caps absolute bottom-4 left-5 translate-y-2 text-[0.62rem] text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
      {selectedImage && createPortal(
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.alt}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedImage(null)
          }}
        >
          <div className="relative flex max-h-full w-full max-w-6xl items-center justify-center">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/85 text-ivory transition-colors hover:bg-ivory hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-primary sm:right-4 sm:top-4"
              aria-label="Close gallery image"
            >
              <X className="h-5 w-5" />
            </button>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1600}
              height={1100}
              sizes="100vw"
              className="max-h-[calc(100dvh-1.5rem)] w-auto max-w-full rounded-lg object-contain shadow-2xl sm:max-h-[calc(100dvh-3rem)]"
            />
          </div>
        </div>,
        document.body,
      )}
    </section>
  )
}
