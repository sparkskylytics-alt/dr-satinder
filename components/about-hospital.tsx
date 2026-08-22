import Image from 'next/image'
import { HeartPulse, ShieldCheck, Stethoscope } from 'lucide-react'
import { MaskHeading, Reveal } from '@/components/reveal'
import type { AboutContent } from '@/sanity/lib/homepage'

const VALUES = [
  { icon: Stethoscope, title: 'Personalised care', copy: 'Every consultation begins with listening and clear guidance.' },
  { icon: ShieldCheck, title: 'Trusted standards', copy: 'Thoughtful diagnosis and treatment plans for every stage of care.' },
  { icon: HeartPulse, title: 'Comfort first', copy: 'A calm, respectful experience for patients and their families.' },
]

export function AboutHospital({ content }: { content?: AboutContent }) {
  const about = { eyebrow: 'About the hospital', heading: 'Care with clarity.', description: 'Founded by Dr.Satinder, Dr.Satinder Eye Care brings together careful diagnosis, modern treatment, and compassionate guidance for every patient.', founderName: 'Dr Satinder', founderDescription: 'From Bhiwani, Haryana, he laid the foundation of Dr. Satinder Eye Care with a vision for compassionate, dependable eye care.', founderImagePath: '/doctor-image/satinder.PNG', ...content }
  const values = content?.values?.length ? content.values : VALUES.map(({ title, copy }) => ({ title, description: copy }))
  return (
    <section id="about" className="bg-pearl py-10 md:py-12">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 md:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-mist sm:aspect-[16/10] lg:aspect-[5/4]">
          <Image
            src={about.founderImagePath}
            alt={`${about.founderName}, founder of Dr Satinder Eye Care`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 to-transparent p-5 pt-16">
<p className="inline-block rounded-full bg-white/85 px-3 py-1 text-[0.62rem] uppercase tracking-[0.35em] text-gray-900 backdrop-blur-sm">
  Founder
</p>
            <p className="mt-1 font-serif text-2xl text-ivory">{about.founderName}</p>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-ivory/85 sm:text-sm">
              {about.founderDescription}
            </p>
          </div>
        </div>

        <div>
          <Reveal>
            <span className="label-caps inline-flex items-center gap-3 text-primary">
              <span className="h-px w-8 bg-primary" />
              {about.eyebrow}
            </span>
          </Reveal>
          <MaskHeading
            as="h2"
            className="mt-4 font-serif text-3xl font-light leading-[1.04] tracking-tight text-foreground sm:text-4xl"
            lines={[about.heading]}
          />
          <Reveal delay={160} className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>{about.description}</p>
          </Reveal>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {values.map(({ title, description }, index) => {
              const Icon = VALUES[index % VALUES.length].icon
              return (
              <Reveal key={title} delay={240 + index * 80}>
                <div className="h-full border-t border-border pt-3">
                  <Icon className="h-4 w-4 text-primary" />
                  <h3 className="mt-2 font-serif text-lg text-foreground">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
                </div>
              </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
