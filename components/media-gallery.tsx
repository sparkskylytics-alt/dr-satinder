'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { Reveal } from '@/components/reveal'
import type { MediaContent } from '@/sanity/lib/homepage'

const MEDIA_ITEMS = [1, 2, 4, 5, 6, 7].map((number) => ({
  src: `/optimized/media-gallery/media-gallery-${number}.webp`,
  alt: `Dr Satinder Eye Care featured in media ${number}`,
}))

export function MediaGallery({ content }: { content?: MediaContent }) {
  const items = content
    ? content.items?.filter((item): item is { _key?: string; src: string; alt?: string } => Boolean(item.src)) ?? []
    : MEDIA_ITEMS
  const [selectedMedia, setSelectedMedia] = useState<{ src: string; alt?: string } | null>(null)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedMedia(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    document.body.style.overflow = selectedMedia ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedMedia])

  return (
    <section id="media" className="bg-background py-5 md:py-6">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="label-caps inline-flex items-center gap-2 text-primary">
              <span className="h-px w-8 bg-primary" />
              In the media
              <span className="h-px w-8 bg-primary" />
            </span>
          </Reveal>
          <Reveal delay={100} className="mt-2 text-sm leading-relaxed text-muted-foreground">
            <p>Community initiatives and media coverage.</p>
          </Reveal>
        </div>

        <div className="scrollbar-hidden mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
          {items.map((item, index) => (
            <Reveal key={item.src} delay={80 + index * 60}>
              <button
                type="button"
                onClick={() => setSelectedMedia(item)}
                className="group relative block aspect-[3/4] w-32 shrink-0 snap-start overflow-hidden rounded-lg bg-white text-left shadow-sm ring-1 ring-border/50 focus:outline-none focus:ring-2 focus:ring-primary sm:w-36"
                aria-label={`Read ${item.alt ?? 'media image'}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt ?? 'Dr Satinder Eye Care featured in media'}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-charcoal/85 px-2 py-1 text-[0.6rem] text-ivory opacity-0 transition-opacity group-hover:opacity-100">
                  Read full image
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      {selectedMedia && createPortal(
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selectedMedia.alt ?? 'Full media image'}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedMedia(null)
          }}
        >
          <div className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl items-center justify-center overflow-hidden rounded-xl bg-white shadow-2xl">
            <Image src={selectedMedia.src} alt={selectedMedia.alt ?? 'Dr Satinder Eye Care featured in media'} width={1200} height={1600} sizes="(max-width: 1024px) 100vw, 1024px" className="max-h-[calc(100dvh-1.5rem)] w-auto max-w-full object-contain p-3 sm:p-5" priority />
            <button
              type="button"
              onClick={() => setSelectedMedia(null)}
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/85 text-ivory transition-colors hover:bg-charcoal focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close full media image"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      , document.body)}
    </section>
  )
}
