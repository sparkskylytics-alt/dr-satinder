'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MaskHeading, Reveal } from '@/components/reveal'
import type { TeamContent } from '@/sanity/lib/homepage'

const TEAM = [
  {
    name: 'Dr. Ravinder Kumar Sharma',
    role: 'Senior Ophthalmologist',
    qualifications: 'B.I.M., D.U.M.S. (Lk.), D.R. Opth. (Delhi)',
    specialties: ['Refraction & Contact Lens Specialist', 'General Ophthalmologist'],
    initials: 'RS',
    image: '/doctor-image/ravinder.jpeg',
  },
  {
    name: 'Dr. Vibhuti Sharan',
    role: 'Visiting Surgeon',
    qualifications: 'M.B.B.S., M.S.',
    specialties: ['Ophthalmologist', 'Phaco & LASIK Eye Surgeon'],
    initials: 'VS',
    image: '/doctor-image/vibhuti.jpeg',
  },
  {
    name: 'Dr. Vikrant Vashist',
    role: 'Optometrist & Eye Care Specialist',
    qualifications: 'M.Sc., M.Optom · B.Sc., B.Optom (Chandigarh)',
    specialties: ['Clinical Eye Care', 'Optometry & Vision Assessment','Refraction and lens specialist'],
    initials: 'VV',
    image: '/doctor-image/vikrant.jpeg',
  },
]

export function AboutDoctor({ content }: { content?: TeamContent }) {
  const team = { eyebrow: 'Our specialists', heading: 'Eye care, expertly guided.', description: 'Our experienced eye-care team combines careful diagnosis, advanced treatment, and personal attention—so every patient feels understood and confidently cared for.', ...content }
  const doctors = content?.members?.length ? content.members.map((member, index) => ({ name: member.name ?? 'Doctor', role: member.role ?? '', qualifications: member.qualifications ?? '', specialties: member.specialties ?? [], image: member.image ?? TEAM[index % TEAM.length].image })) : TEAM
  const [expandedDoctor, setExpandedDoctor] = useState<number | null>(null)

  return (
    <section id="team" className="relative overflow-hidden bg-background py-6 md:py-8">
      <div className="absolute left-0 top-20 hidden h-px w-[18%] bg-primary/25 lg:block" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="border-b border-border pb-5 text-center lg:pb-6">
          <Reveal>
            <span className="label-caps inline-flex items-center gap-3 text-primary">
              <span className="h-px w-10 bg-primary" />
              {team.eyebrow}
              <span className="h-px w-10 bg-primary" />
            </span>
          </Reveal>
          <div className="mx-auto mt-3 max-w-3xl">
            <MaskHeading
              as="h2"
              className="font-serif text-2xl font-light leading-[1.03] tracking-tight text-foreground sm:text-3xl md:text-4xl"
              lines={[team.heading]}
            />
            <Reveal delay={160} className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{team.description}</Reveal>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3 lg:gap-5">
          {doctors.map((doctor, index) => (
            <Reveal key={doctor.name} className="h-full" delay={80 + index * 100}>
              <article
                tabIndex={0}
                role="button"
                aria-expanded={expandedDoctor === index}
                onClick={() => setExpandedDoctor((current) => (current === index ? null : index))}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setExpandedDoctor((current) => (current === index ? null : index))
                  }
                }}
                className="group relative flex h-full min-h-[22rem] cursor-pointer flex-col overflow-hidden rounded-lg bg-charcoal p-5 text-primary-foreground transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/60 sm:p-6"
              >
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/18 to-transparent" />
                <div className={`pointer-events-none absolute inset-0 transition-colors duration-300 ${expandedDoctor === index ? 'bg-charcoal/45' : 'bg-transparent'} md:bg-transparent md:group-hover:bg-charcoal/45 md:group-focus:bg-charcoal/45`} />
                <div className="relative mt-auto">
                  <h3 className="font-serif text-lg leading-none text-primary-foreground sm:text-xl">{doctor.name}</h3>
                  <p className="label-caps mt-2 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/90">{doctor.role}</p>
                  <p className="mt-3 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-accent sm:hidden">Tap to view qualifications</p>
                  <p className="mt-3 hidden text-[0.58rem] font-medium uppercase tracking-[0.16em] text-accent sm:block">Hover to view qualifications</p>
                  <div className={`mt-3 grid overflow-hidden border-t border-white/15 pt-3 transition-all duration-500 ${expandedDoctor === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus:grid-rows-[1fr]`}>
                    <div className="min-h-0 overflow-hidden">
                    <p className="text-sm leading-relaxed text-white">{doctor.qualifications}</p>
                    <ul className="mt-3 space-y-1.5">
                      {doctor.specialties.map((specialty) => (
                        <li key={specialty} className="flex gap-3 text-sm text-primary-foreground/90">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {specialty}
                        </li>
                      ))}
                    </ul>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={360} className="mt-4 border-l-2 border-accent pl-4 md:ml-[calc(40%+1rem)]">
          <p className="max-w-2xl font-serif text-lg leading-snug text-foreground md:text-xl">
            “Dr. Ravinder Kumar Sharma is dedicated to comprehensive, compassionate care—with
            accurate diagnosis, advanced treatment, and a plan tailored to each patient.”
          </p>
        </Reveal>
      </div>
    </section>
  )
}
