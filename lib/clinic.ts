export type OpeningHours = {
  dayOfWeek: string[]
  opens: string
  closes: string
}

export const CLINIC = {
  legalName: 'Dr. Satinder Eye Care Centre',
  shortName: 'Dr Satinder Eye Care',
  url: 'https://www.satindereyecarecentre.com',
  telephone: ['+918958334505', '+918630506562'] as [string, string],
  telephoneDisplay: '8958334505 · 8630506562',
  email: 'Drsatindereyecare@gmail.com',
  address: {
    streetAddress: '349, Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki',
    addressLocality: 'Muzaffarnagar',
    addressRegion: 'Uttar Pradesh',
    postalCode: '251002',
    addressCountry: 'IN',
  },
  addressDisplay: '349, Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar – 251002',
  geo: {
    latitude: 29.4713845,
    longitude: 77.6132307,
  },
  hoursDisplay: 'Mon & Wed–Sun: 10:00 AM – 7:30 PM · Tuesday: halfday',
  // Tuesday's exact half-day close time is not published anywhere (Sanity only says "halfday") —
  // omitted from structured data rather than guessed. Confirm the real close time before adding it.
  openingHours: [
    { dayOfWeek: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '10:00', closes: '19:30' },
  ] satisfies OpeningHours[],
  areaServed: ['Muzaffarnagar', 'Shamli', 'Budhana', 'Khatauli', 'Charthawal'],
  priceRange: '₹₹',
  whatsappNumber: '918958334505',
  mapsQuery: 'Dr. SATINDER EYE CARE CENTRE, 349, Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar – 251002',
} as const
