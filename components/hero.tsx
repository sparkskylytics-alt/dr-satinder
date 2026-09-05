'use client'

import { SanityImage as Image } from '@/components/sanity-image'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { MaskHeading, Reveal } from '@/components/reveal'
import type { HeroContent } from '@/sanity/lib/homepage'

const fallback = {
  eyebrow: 'Advanced Ophthalmology',
  heading: 'Clearer vision, care you can trust',
  description: 'A calm, considered approach to eye care — combining decades of surgical experience with the most advanced diagnostic technology, in a space designed for comfort.',
  imagePath: '/optimized/images/gallery/1.webp',
  stats: [{ value: '50+', label: 'Years of care' }, { value: '40k+', label: 'Procedures' }, { value: '99%', label: 'Patient trust' }],
}

export function Hero({ content }: { content?: HeroContent }) {
  const hero = { ...fallback, ...content, stats: content?.stats?.length ? content.stats : fallback.stats }
  return (
    <section id="top" className="relative overflow-hidden bg-background pt-16 md:pt-18">
      <div className="mx-auto grid max-w-7xl items-center gap-7 px-5 pb-8 pt-4 md:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pb-10 lg:pt-6">
        <div className="max-w-xl">
          <Reveal><span className="label-caps inline-flex items-center gap-2 text-primary"><span className="h-px w-8 bg-primary" />{hero.eyebrow}</span></Reveal>
          <MaskHeading as="h1" className="mt-5 font-serif text-4xl font-light leading-[1.02] tracking-tight text-foreground sm:text-5xl lg:text-6xl" lines={['Eye Care in Muzaffarnagar']} />
          <MaskHeading as="h2" className="mt-3 font-serif text-xl font-light leading-snug tracking-tight text-foreground/80 sm:text-2xl" lines={[hero.heading]} />
          <Reveal delay={220} className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground"><p>{hero.description}</p></Reveal>
          <Reveal delay={340} className="mt-6 flex flex-wrap items-center gap-4">
            <a href="#appointment" className="group inline-flex items-center gap-2 rounded-md bg-charcoal px-6 py-3.5 text-sm font-medium text-ivory shadow-sm transition-colors duration-300 hover:bg-primary">Book a Consultation<ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
            <a href="#services" className="group inline-flex items-center gap-2 border-b border-charcoal/30 pb-1 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary">Explore Treatments<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></a>
          </Reveal>
          <Reveal delay={460} className="mt-6 flex items-center gap-8 border-t border-border pt-5">
            {hero.stats.map((stat, index) => <div key={stat.label} className="contents"><Stat value={stat.value} label={stat.label} />{index < hero.stats.length - 1 && <span className="h-8 w-px bg-border" />}</div>)}
          </Reveal>
        </div>
        <div className="relative"><div className="relative aspect-[5/4] w-full overflow-hidden rounded-lg sm:aspect-[16/11]"><Image src={hero.imagePath} alt="Interior of the Dr Satinder Eye Care clinic" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover brightness-110 contrast-110 saturate-110" /><div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 to-transparent" /></div>
          <Reveal delay={400} className="absolute -bottom-6 -left-4 hidden max-w-[15rem] rounded-lg border border-border bg-pearl/90 p-5 shadow-lg backdrop-blur sm:block"><p className="font-serif text-2xl leading-tight text-foreground">Accredited excellence</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Experienced specialists and trusted clinical protocols for every patient.</p></Reveal>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div><p className="font-serif text-3xl text-foreground">{value}</p><p className="label-caps mt-1 text-[0.62rem] text-muted-foreground">{label}</p></div>
}
