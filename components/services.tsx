'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { MaskHeading, Reveal } from '@/components/reveal'
import type { ServicesContent } from '@/sanity/lib/homepage'
import { findServiceForTitle } from '@/lib/services'

const FEATURED_SERVICES = [
  {
    title: 'Comprehensive Eye Check-up',
    description: 'A detailed assessment of your vision and complete eye health.',
    image: '/images/service-eye-checkup.png',
  },
  {
    title: 'Cataract Evaluation & Surgery',
    description: 'Precision phaco surgery with a clear, personalized treatment plan.',
    image: '/images/service-cataract-surgery.png',
  },
  {
    title: 'Glaucoma Care',
    description: 'Early screening, monitoring, and treatment to protect your vision.',
    image: '/images/service-glaucoma-screening.png',
  },
  {
    title: 'Pediatric Eye Care',
    description: 'Gentle, reassuring eye examinations for children of all ages.',
    image: '/images/service-pediatric-care.png',
  },
]

const ADDITIONAL_SERVICES = [
  'Diabetic Eye Examination',
  'Retinal Disease Evaluation',
  'Computer Vision & Digital Eye Strain Management',
  'Dry Eye Treatment',
  'Conjunctivitis & Eye Infection Treatment',
  'Refractive Error Evaluation',
  'Spectacle & Contact Lens Prescription',
  'Optical Services & Customized Eyewear',
  'Emergency Eye Care',
  'Regular Follow-up & Post-operative Care',
  'And many other eye-related issues',
]

export function Services({ content }: { content?: ServicesContent }) {
  const serviceContent = { eyebrow: 'Treatments & services', heading: 'Specialist care for every vision need', description: 'From routine check-ups to advanced eye treatment, your care is planned around your symptoms, vision, and long-term eye health.', ...content }
  const featuredServices = content?.featured?.length ? content.featured.map((service, index) => ({ title: service.title ?? 'Eye care service', description: service.description ?? '', image: service.image ?? FEATURED_SERVICES[index % FEATURED_SERVICES.length].image })) : FEATURED_SERVICES
  const additionalServices = content?.additional ?? ADDITIONAL_SERVICES
  const [showAll, setShowAll] = useState(false)

  return (
    <section id="services" className="relative bg-pearl py-14 md:py-18">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="label-caps inline-flex items-center gap-3 text-primary">
              <span className="h-px w-8 bg-primary" />
              {serviceContent.eyebrow}
              <span className="h-px w-8 bg-primary" />
            </span>
          </Reveal>
          <MaskHeading
            as="h2"
            className="mt-4 font-serif text-3xl font-light leading-[1.08] tracking-tight text-foreground sm:text-4xl"
            lines={[serviceContent.heading]}
          />
          <Reveal delay={120} className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {serviceContent.description}
          </Reveal>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service, index) => (
            <Reveal key={service.title} delay={index * 90}>
              <a
                href={findServiceForTitle(service.title)?.slug ? `/${findServiceForTitle(service.title)!.slug}` : '#appointment'}
                className="group relative block h-64 overflow-hidden rounded-lg bg-charcoal md:h-72"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/25 to-transparent transition-colors duration-500 group-hover:from-charcoal/95 group-hover:via-charcoal/65" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-serif text-2xl leading-none text-ivory">{service.title}</h3>
                  <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                    <p className="overflow-hidden text-sm leading-relaxed text-ivory/80">
                      <span className="mt-3 block">{service.description}</span>
                    </p>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {showAll && (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map((service, index) => {
              const image = featuredServices[index % featuredServices.length].image
              const href = findServiceForTitle(service)?.slug ? `/${findServiceForTitle(service)!.slug}` : '#appointment'
              return (
                <a
                  key={service}
                  href={href}
                  className="group relative block h-64 overflow-hidden rounded-lg bg-charcoal md:h-72"
                >
                  <Image
                    src={image}
                    alt={service}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/25 to-transparent transition-colors duration-500 group-hover:from-charcoal/95 group-hover:via-charcoal/65" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-serif text-2xl leading-none text-ivory">{service}</h3>
                    <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                      <p className="overflow-hidden text-sm leading-relaxed text-ivory/80">
                        <span className="mt-3 block">
                          Personalised evaluation and treatment for your individual eye-care needs.
                        </span>
                      </p>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        )}

        <Reveal delay={250} className="mt-7 text-center">
          <button
            type="button"
            onClick={() => setShowAll((visible) => !visible)}
            aria-expanded={showAll}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-charcoal"
          >
            {showAll ? 'Show fewer services' : 'View all'}
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
