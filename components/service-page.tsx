import Link from 'next/link'
import { Phone } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { JsonLd } from '@/components/json-ld'
import { CLINIC } from '@/lib/clinic'
import { getSiblingServices, type Service } from '@/lib/services'
import { medicalProcedureSchema, faqPageSchema, breadcrumbSchema } from '@/lib/structured-data'
import { getHomepage } from '@/sanity/lib/homepage'

export async function ServicePage({ service }: { service: Service }) {
  const content = await getHomepage()
  const siblings = getSiblingServices(service.slug)
  const pageUrl = `${CLINIC.url}/${service.slug}`

  return (
    <>
      <JsonLd
        data={[
          medicalProcedureSchema({ name: service.name, description: service.metaDescription, url: pageUrl }),
          faqPageSchema(service.faqs),
          breadcrumbSchema([
            { name: 'Home', url: CLINIC.url },
            { name: service.name, url: pageUrl },
          ]),
        ]}
      />
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 pb-16 pt-28 md:px-8 md:pt-32">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span>{service.name}</span>
        </nav>

        <h1 className="mt-4 font-serif text-3xl font-light tracking-tight text-foreground sm:text-5xl">{service.h1}</h1>

        <section aria-label="Quick answers" className="mt-6 rounded-lg border border-border bg-pearl p-5">
          <h2 className="label-caps text-primary">Quick answers</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground">
            {service.quickAnswers.map((answer) => (
              <li key={answer}>{answer}</li>
            ))}
          </ul>
        </section>

        <a
          href={`tel:${CLINIC.telephone[0]}`}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-charcoal"
        >
          <Phone className="h-4 w-4" />
          Call {CLINIC.telephone[0].replace('+91', '')} to book
        </a>

        <section className="mt-10">
          <h2 className="font-serif text-2xl font-light text-foreground">About {service.name.toLowerCase()} at {CLINIC.shortName}</h2>
          <div className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {/* TODO: clinical copy — needs doctor review */}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl font-light text-foreground">Frequently asked questions</h2>
          <div className="mt-4 space-y-5">
            {service.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-base font-medium text-foreground">{faq.question}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 border-t border-border pt-6">
          <h2 className="label-caps text-primary">Related treatments</h2>
          <ul className="mt-3 space-y-2">
            {siblings.map((sibling) => (
              <li key={sibling.slug}>
                <Link href={`/${sibling.slug}`} className="text-sm font-medium text-foreground hover:text-primary">
                  {sibling.name} in Muzaffarnagar
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter content={content?.footer} />
    </>
  )
}
