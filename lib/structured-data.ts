import { CLINIC } from '@/lib/clinic'

type DoctorInput = {
  name: string
  role?: string
  qualifications?: string
  slug?: string
}

export function medicalClinicSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${CLINIC.url}/#clinic`,
    name: CLINIC.legalName,
    url: CLINIC.url,
    telephone: CLINIC.telephone,
    email: CLINIC.email,
    priceRange: CLINIC.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CLINIC.address.streetAddress,
      addressLocality: CLINIC.address.addressLocality,
      addressRegion: CLINIC.address.addressRegion,
      postalCode: CLINIC.address.postalCode,
      addressCountry: CLINIC.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CLINIC.geo.latitude,
      longitude: CLINIC.geo.longitude,
    },
    openingHoursSpecification: CLINIC.openingHours.map((spec) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    })),
    areaServed: CLINIC.areaServed.map((place) => ({ '@type': 'City', name: place })),
    medicalSpecialty: 'Ophthalmologic',
  }
}

export function physicianSchema(doctor: DoctorInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    jobTitle: doctor.role,
    ...(doctor.qualifications ? { hasCredential: doctor.qualifications } : {}),
    medicalSpecialty: 'Ophthalmologic',
    worksFor: { '@type': 'MedicalClinic', name: CLINIC.legalName, '@id': `${CLINIC.url}/#clinic` },
    ...(doctor.slug ? { url: `${CLINIC.url}/doctors/${doctor.slug}` } : {}),
  }
}

export function medicalProcedureSchema(input: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: input.name,
    description: input.description,
    url: input.url,
    provider: { '@type': 'MedicalClinic', name: CLINIC.legalName, '@id': `${CLINIC.url}/#clinic` },
  }
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
