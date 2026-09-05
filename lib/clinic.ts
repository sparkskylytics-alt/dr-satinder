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
    // Street/sub-locality text matches the clinic's Google Business Profile listing exactly
    // (confirmed by the owner) for NAP consistency. addressLocality stays "Muzaffarnagar" —
    // that's the actual city for local-search targeting, independent of the display string below.
    streetAddress: 'Police Chawki, 349, Gaushala Road, Main Rd, near Eidgah Road, Shamli',
    addressLocality: 'Muzaffarnagar',
    addressRegion: 'Uttar Pradesh',
    postalCode: '251002',
    addressCountry: 'IN',
  },
  addressDisplay: 'Police Chawki, 349, Gaushala Road, Main Rd, near Eidgah Road, Shamli, Muzaffarnagar, Uttar Pradesh 251002',
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
  mapsQuery: 'Dr. SATINDER EYE CARE CENTRE, Police Chawki, 349, Gaushala Road, Main Rd, near Eidgah Road, Shamli, Muzaffarnagar, Uttar Pradesh 251002',
} as const
