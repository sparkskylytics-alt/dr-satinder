'use client'

import { useState } from 'react'
import { SanityImage as Image } from '@/components/sanity-image'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { MaskHeading, Reveal } from '@/components/reveal'
import type { TestimonialsContent } from '@/sanity/lib/homepage'

const REVIEW_TEMPLATES = [
  {
    quote:
      'I was nervous about cataract surgery, but Dr Satinder explained everything with such patience. The next morning I could read again without glasses. Remarkable.',
    name: 'Harpreet K.',
    detail: 'Cataract patient',
  },
  {
    quote:
      'The clinic feels more like a calm hotel than a hospital. Every instrument was modern and every staff member kind. My LASIK result exceeded expectations.',
    name: 'Rohit M.',
    detail: 'LASIK patient',
  },
  {
    quote:
      'After years of worry about my glaucoma, I finally feel in safe hands. The monitoring is thorough and the guidance is always clear.',
    name: 'Anjali S.',
    detail: 'Glaucoma care',
  },
]

const MOBILE_REVIEWS = REVIEW_TEMPLATES

export function Testimonials({ content }: { content?: TestimonialsContent }) {
  const testimonial = { eyebrow: 'Patient voices', heading: 'Trusted by the people who see us most', featuredImagePath: '/images/appointment-cta.png', imageLabel: 'Care, in their words', ...content }
  const reviews = content?.items?.length ? content.items.map((item) => ({ quote: item.quote ?? '', name: item.name ?? '', detail: item.detail ?? '' })) : REVIEW_TEMPLATES
  const [activeReview, setActiveReview] = useState(0)
  const review = reviews[activeReview]

  const showReview = (direction: 1 | -1) => {
    setActiveReview((current) => (current + direction + reviews.length) % reviews.length)
  }

  return (
    <section id="testimonials" className="relative overflow-hidden bg-mist py-7 md:py-9">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <span className="label-caps inline-flex items-center gap-2 text-primary">
              <span className="h-px w-8 bg-primary" />
              {testimonial.eyebrow}
            </span>
          </Reveal>
          <MaskHeading
            as="h2"
            className="mt-4 font-serif text-3xl font-light leading-[1.08] tracking-tight text-foreground sm:text-4xl"
            lines={[testimonial.heading]}
          />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-[0.62fr_2fr]">
          <div className="relative min-h-48 overflow-hidden rounded-lg md:min-h-full">
            <Image
              src={testimonial.featuredImagePath}
              alt="Patient receiving thoughtful eye care"
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
            <p className="label-caps absolute bottom-5 left-5 text-[0.62rem] text-ivory">{testimonial.imageLabel}</p>
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-border">
            <ReviewCard review={review} />
            <div className="flex items-center justify-between border-t border-border bg-pearl px-4 py-3">
              <button
                type="button"
                onClick={() => showReview(-1)}
                aria-label="Show previous review"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-mist"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="label-caps text-[0.58rem] text-muted-foreground">
                Review {activeReview + 1} of {reviews.length}
              </span>
              <button
                type="button"
                onClick={() => showReview(1)}
                aria-label="Show next review"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-mist"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review }: { review: { quote: string; name: string; detail: string } }) {
  return (
    <article className="flex min-h-[15rem] flex-col justify-between bg-pearl p-4">
      <div>
        <Quote className="h-6 w-6 text-accent" aria-hidden />
        <p className="mt-3 text-sm leading-relaxed text-foreground">{review.quote}</p>
      </div>
      <div className="mt-4 border-t border-border pt-3">
        <p className="font-serif text-lg text-foreground">{review.name}</p>
        <p className="label-caps mt-1 text-[0.58rem] text-muted-foreground">{review.detail}</p>
      </div>
    </article>
  )
}
