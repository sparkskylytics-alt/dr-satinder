import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SanityImage as Image } from '@/components/sanity-image'
import { Phone } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { JsonLd } from '@/components/json-ld'
import { CLINIC } from '@/lib/clinic'
import { DOCTORS, getDoctorBySlug } from '@/lib/doctors'
import { physicianSchema, breadcrumbSchema } from '@/lib/structured-data'
import { getHomepage } from '@/sanity/lib/homepage'

export function generateStaticParams() {
  return DOCTORS.map((doctor) => ({ slug: doctor.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const doctor = getDoctorBySlug(slug)
  if (!doctor) return {}
  return {
    title: `${doctor.name} — ${doctor.role} in Muzaffarnagar | Dr. Satinder Eye Care Centre`,
    description: `${doctor.name}, ${doctor.role} at Dr. Satinder Eye Care Centre, Muzaffarnagar. ${doctor.qualifications}. Call 8958334505 to book.`,
    alternates: { canonical: `/doctors/${doctor.slug}` },
  }
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doctor = getDoctorBySlug(slug)
  if (!doctor) notFound()

  const content = await getHomepage()
  const pageUrl = `${CLINIC.url}/doctors/${doctor.slug}`

  return (
    <>
      <JsonLd
        data={[
          physicianSchema({ name: doctor.name, role: doctor.role, qualifications: doctor.qualifications, slug: doctor.slug }),
          breadcrumbSchema([
            { name: 'Home', url: CLINIC.url },
            { name: doctor.name, url: pageUrl },
          ]),
        ]}
      />
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 pb-16 pt-28 md:px-8 md:pt-32">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span>{doctor.name}</span>
        </nav>

        <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-lg">
            <Image src={doctor.image} alt={doctor.name} fill sizes="160px" className="object-cover" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-light tracking-tight text-foreground sm:text-4xl">{doctor.name}</h1>
            <p className="label-caps mt-2 text-primary">{doctor.role} · Muzaffarnagar</p>
            <p className="mt-2 text-sm text-muted-foreground">{doctor.qualifications}</p>
            <ul className="mt-3 space-y-1">
              {doctor.specialties.map((specialty) => (
                <li key={specialty} className="text-sm text-muted-foreground">{specialty}</li>
              ))}
            </ul>
          </div>
        </div>

        <a
          href={`tel:${CLINIC.telephone[0]}`}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-charcoal"
        >
          <Phone className="h-4 w-4" />
          Call {CLINIC.telephone[0].replace('+91', '')} to book with {doctor.name}
        </a>

        <section className="mt-10">
          <h2 className="font-serif text-2xl font-light text-foreground">About {doctor.name}</h2>
          <div className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {/* TODO: clinical/biographical copy — needs doctor review */}
          </div>
        </section>
      </main>
      <SiteFooter content={content?.footer} />
    </>
  )
}
