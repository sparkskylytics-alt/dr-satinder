'use client'

import { useEffect, useRef, useState } from 'react'
import { SanityImage as Image } from '@/components/sanity-image'
import { HeartHandshake } from 'lucide-react'
import { MaskHeading, Reveal } from '@/components/reveal'
import type { CommunityContent } from '@/sanity/lib/homepage'

const CAMP_PHOTOS = [1, 2, 4, 5,3].map((number) => ({
  src: `/optimized/camp-photo/camp-${number}.webp`,
  alt: `Dr Satinder Eye Care community eye camp ${number}`,
}))

export function CommunityOutreach({ content }: { content?: CommunityContent }) {
  const community = { eyebrow: 'Community outreach', heading: 'Eye care beyond the clinic', description: 'Our doctors regularly take part in community eye camps, bringing essential eye checks, early guidance, and compassionate care to more people.', footerText: 'Helping communities protect and preserve their vision.', ...content }
  const photos = content ? content.items?.filter((item): item is { _key?: string; src: string; alt?: string } => Boolean(item.src)).map((item) => ({ src: item.src, alt: item.alt ?? 'Dr Satinder Eye Care community eye camp' })) ?? [] : CAMP_PHOTOS
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const visibleRef = useRef(false)
  const activePhotoRef = useRef(0)
  const [activePhoto, setActivePhoto] = useState(0)

  const updateActivePhoto = () => {
    const track = trackRef.current
    if (!track) return

    const photos = Array.from(track.children) as HTMLElement[]
    const closestIndex = photos.reduce((closest, photo, index) => {
      return Math.abs(photo.offsetLeft - track.scrollLeft) < Math.abs((photos[closest]?.offsetLeft ?? 0) - track.scrollLeft)
        ? index
        : closest
    }, 0)
    activePhotoRef.current = closestIndex
    setActivePhoto(closestIndex)
  }

  const showPhoto = (index: number) => {
    const track = trackRef.current
    const photo = track?.children[index] as HTMLElement | undefined
    if (!track || !photo) return
    track.scrollTo({ left: photo.offsetLeft, behavior: 'smooth' })
    activePhotoRef.current = index
    setActivePhoto(index)
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
      if (!visibleRef.current || pausedRef.current) return
      showPhoto((activePhotoRef.current + 1) % photos.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="camps" className="bg-mist py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div className="max-w-xl">
            <Reveal>
              <span className="label-caps inline-flex items-center gap-2 text-primary">
                <span className="h-px w-8 bg-primary" />
                {community.eyebrow}
              </span>
            </Reveal>
            <MaskHeading
              as="h2"
              className="mt-3 font-serif text-2xl font-light leading-[1.08] tracking-tight text-foreground sm:text-3xl"
              lines={[community.heading]}
            />
          </div>
          <Reveal delay={160} className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>
              {community.description}
            </p>
          </Reveal>
        </div>

        <div
          ref={trackRef}
          onScroll={updateActivePhoto}
          onPointerEnter={() => { pausedRef.current = true }}
          onPointerLeave={() => { pausedRef.current = false }}
          className="scrollbar-hidden mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2"
        >
          {photos.map((photo, index) => (
            <Reveal key={photo.src} delay={100 + index * 70}>
              <div className="group relative aspect-[4/3] w-60 shrink-0 snap-start overflow-hidden rounded-lg bg-charcoal sm:w-72">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-2 flex justify-center gap-2" aria-label="Community camp photo navigation">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => showPhoto(index)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-mist ${activePhoto === index ? 'w-6 bg-primary' : 'w-2 bg-primary/30 hover:bg-primary/60'}`}
              aria-label={`Show camp photo ${index + 1}`}
              aria-current={activePhoto === index ? 'true' : undefined}
            />
          ))}
        </div>

        <Reveal delay={320} className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
          <HeartHandshake className="h-5 w-5 text-primary" />
          <p>{community.footerText}</p>
        </Reveal>
      </div>
    </section>
  )
}
