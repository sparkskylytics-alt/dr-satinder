import Link from 'next/link'
import { CLINIC } from '@/lib/clinic'
import { DOCTORS } from '@/lib/doctors'
import { SERVICES } from '@/lib/services'

// Answers use only facts already published on the site (lib/clinic, lib/doctors, lib/services),
// so the visible text and the FAQPage schema on the homepage always match.
export const HOME_FAQS: { question: string; answer: string; lang?: string }[] = [
  {
    question: 'Where is the eye hospital located in Muzaffarnagar?',
    answer: `${CLINIC.legalName} is at ${CLINIC.addressDisplay}.`,
  },
  {
    question: 'Who are the eye doctors at Dr. Satinder Eye Care Centre?',
    answer: `Our eye specialists are ${DOCTORS.map((d) => `${d.name} (${d.role})`).join(', ')}.`,
  },
  {
    question: 'What are the clinic timings?',
    answer: `${CLINIC.hoursDisplay}.`,
  },
  {
    question: 'Which eye treatments are available?',
    answer: `${SERVICES.map((s) => s.name).join(', ')}.`,
  },
  {
    question: 'How can I book an appointment with an eye specialist in Muzaffarnagar?',
    answer: `Call ${CLINIC.telephoneDisplay.replace(' · ', ' or ')}, message us on WhatsApp, or use the appointment form on this page.`,
  },
  {
    question: 'मुज़फ्फरनगर में आँखों के डॉक्टर से कैसे मिलें?',
    answer: `${CLINIC.hindiName}, गौशाला रोड, मुज़फ्फरनगर में स्थित है। अपॉइंटमेंट के लिए ${CLINIC.telephoneDisplay.replace(' · ', ' या ')} पर कॉल करें।`,
    lang: 'hi',
  },
]

export function HomeFaq() {
  return (
    <section id="faq" className="bg-background py-10 md:py-12">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <span className="label-caps inline-flex items-center gap-3 text-primary"><span className="h-px w-10 bg-primary" />FAQ</span>
        <h2 className="mt-3 font-serif text-2xl font-light tracking-tight text-foreground sm:text-3xl md:text-4xl">Eye specialist in Muzaffarnagar — common questions</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {HOME_FAQS.map((faq) => (
            <details key={faq.question} lang={faq.lang} className="group py-4">
              <summary className="cursor-pointer list-none text-base font-medium text-foreground marker:hidden">
                <span className="flex items-center justify-between gap-4">{faq.question}<span className="text-primary transition-transform group-open:rotate-45">+</span></span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          Need directions? See our <Link href="/contact" className="text-primary underline-offset-4 hover:underline">contact page and map</Link>.
        </p>
      </div>
    </section>
  )
}
