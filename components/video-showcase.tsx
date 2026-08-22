'use client'

import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MaskHeading, Reveal } from '@/components/reveal'
import type { VideosContent } from '@/sanity/lib/homepage'

const CLINIC_FILMS = [
  {
    title: 'A closer look at your eyes',
    video: '/doctor-video/video-1.mp4',
  },
  {
    title: 'Modern diagnostic care',
    video: '/doctor-video/video-2.mp4',
  },
  {
    title: 'Precision cataract treatment',
    video: '/doctor-video/video-3.mp4',
  },
  {
    title: 'Care designed around you',
    video: '/doctor-video/video-5.mp4',
  },
  {
    title: 'Advanced vision technology',
    video: '/doctor-video/video-6.mp4',
  },
]

export function VideoShowcase({ content }: { content?: VideosContent }) {
  const videoContent = { eyebrow: 'Inside the clinic', heading: 'Precision you can see, care you can feel', description: 'Swipe or use the arrows to explore', ...content }
  const films = content?.items?.length ? content.items.map((item, index) => ({ title: item.title ?? 'Clinic film', video: item.video ?? CLINIC_FILMS[index % CLINIC_FILMS.length].video })) : CLINIC_FILMS
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollVideos = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 300, behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-charcoal py-8 text-ivory md:py-10">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="label-caps inline-flex items-center gap-2 text-accent">
              <span className="h-px w-8 bg-accent" />
              {videoContent.eyebrow}
              <span className="h-px w-8 bg-accent" />
            </span>
          </Reveal>
          <MaskHeading
            as="h2"
            className="mx-auto mt-3 font-serif text-2xl font-light leading-[1.08] tracking-tight sm:text-3xl"
            lines={[videoContent.heading]}
          />
        </div>

        <Reveal delay={160} className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-ivory/65">{videoContent.description}</p>
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollVideos(-1)}
                aria-label="Show previous clinic videos"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:bg-ivory hover:text-charcoal"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollVideos(1)}
                aria-label="Show more clinic videos"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:bg-ivory hover:text-charcoal"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={trackRef}
            className="scrollbar-hidden flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3"
          >
            {films.map((film) => (
              <div
                key={film.title}
                className="group relative aspect-[9/14] w-[13.5rem] shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-ivory/10 sm:w-[15rem]"
              >
                <ClinicVideo src={film.video} title={film.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="label-caps text-[0.58rem] text-accent">Clinic film</span>
                  <h3 className="mt-2 font-serif text-xl leading-none text-ivory">{film.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ClinicVideo({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined)
        } else {
          video.pause()
        }
      },
      { threshold: 0.7, rootMargin: '0px' },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="none"
      aria-label={title}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
