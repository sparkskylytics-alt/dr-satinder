import { CLINIC } from '@/lib/clinic'
import { SERVICES } from '@/lib/services'
import { DOCTORS } from '@/lib/doctors'

export const dynamic = 'force-static'

export function GET() {
  const lines = [
    `# ${CLINIC.legalName}`,
    '',
    `${CLINIC.legalName} is an eye clinic located at ${CLINIC.addressDisplay}. The clinic has been operating for 50+ years and serves ${CLINIC.areaServed.join(', ')}.`,
    '',
    `Phone: ${CLINIC.telephoneDisplay}`,
    `Email: ${CLINIC.email}`,
    `Hours: ${CLINIC.hoursDisplay}`,
    `Website: ${CLINIC.url}`,
    '',
    '## Services',
    '',
    ...SERVICES.map((service) => `- [${service.name}](${CLINIC.url}/${service.slug})`),
    '',
    '## Doctors',
    '',
    ...DOCTORS.map((doctor) => `- [${doctor.name}](${CLINIC.url}/doctors/${doctor.slug}) — ${doctor.role}`),
    '',
    '## Contact',
    '',
    `- [Contact page](${CLINIC.url}/contact)`,
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
