export type ServiceFaq = { question: string; answer: string }

export type Service = {
  slug: string
  name: string
  seoTitle: string
  metaDescription: string
  h1: string
  matchKeywords: string[]
  quickAnswers: string[]
  faqs: ServiceFaq[]
}

const NEEDS_REVIEW = 'To be confirmed by our clinical team — ask about this during your consultation.'

export const SERVICES: Service[] = [
  {
    slug: 'cataract-surgery-muzaffarnagar',
    name: 'Cataract Surgery',
    seoTitle: 'Cataract Surgery in Muzaffarnagar | Dr. Satinder Eye Care Centre',
    metaDescription: 'Cataract surgery in Muzaffarnagar at Dr. Satinder Eye Care Centre. 50+ years of experience. Call 8958334505 to book a consultation.',
    h1: 'Cataract Surgery in Muzaffarnagar',
    matchKeywords: ['cataract'],
    quickAnswers: [
      'Dr. Satinder Eye Care Centre is an eye clinic located on Shamli Road, Muzaffarnagar, Uttar Pradesh.',
      'The clinic offers cataract evaluation and surgery among its ophthalmology services.',
      'Consultations for cataract surgery are conducted by the clinic\'s ophthalmology team.',
      'To book a cataract consultation, call 8958334505 or 8630506562.',
    ],
    faqs: [
      { question: 'Where is Dr. Satinder Eye Care Centre located?', answer: 'The clinic is on Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar, Uttar Pradesh 251002.' },
      { question: 'How do I book a cataract surgery consultation?', answer: 'Call 8958334505 or 8630506562, or use the appointment form on this page to request a visit.' },
      { question: 'Who performs cataract surgery at this clinic?', answer: 'Cataract evaluations and surgery are handled by the clinic\'s ophthalmology team; ask at booking which specialist will see you.' },
      { question: 'What does cataract surgery involve?', answer: NEEDS_REVIEW },
      { question: 'How long is recovery after cataract surgery?', answer: NEEDS_REVIEW },
      { question: 'Is cataract surgery covered by insurance?', answer: NEEDS_REVIEW },
    ],
  },
  {
    slug: 'lasik-eye-surgery-muzaffarnagar',
    name: 'LASIK Eye Surgery',
    seoTitle: 'LASIK Eye Surgery in Muzaffarnagar | Dr. Satinder Eye Care Centre',
    metaDescription: 'LASIK and refractive eye surgery in Muzaffarnagar at Dr. Satinder Eye Care Centre. Call 8958334505 to book a consultation.',
    h1: 'LASIK Eye Surgery in Muzaffarnagar',
    matchKeywords: ['lasik', 'refractive'],
    quickAnswers: [
      'Dr. Satinder Eye Care Centre is an eye clinic located on Shamli Road, Muzaffarnagar, Uttar Pradesh.',
      'The clinic offers LASIK and refractive eye surgery consultations.',
      'LASIK consultations are conducted by the clinic\'s ophthalmology team, including a Phaco & LASIK eye surgeon.',
      'To book a LASIK consultation, call 8958334505 or 8630506562.',
    ],
    faqs: [
      { question: 'Where is Dr. Satinder Eye Care Centre located?', answer: 'The clinic is on Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar, Uttar Pradesh 251002.' },
      { question: 'How do I book a LASIK consultation?', answer: 'Call 8958334505 or 8630506562, or use the appointment form on this page to request a visit.' },
      { question: 'Who performs LASIK surgery at this clinic?', answer: 'LASIK consultations are handled by the clinic\'s ophthalmology team; ask at booking which specialist will see you.' },
      { question: 'Am I a candidate for LASIK?', answer: NEEDS_REVIEW },
      { question: 'What does LASIK surgery involve?', answer: NEEDS_REVIEW },
      { question: 'How long does LASIK recovery take?', answer: NEEDS_REVIEW },
    ],
  },
  {
    slug: 'glaucoma-treatment-muzaffarnagar',
    name: 'Glaucoma Treatment',
    seoTitle: 'Glaucoma Treatment in Muzaffarnagar | Dr. Satinder Eye Care Centre',
    metaDescription: 'Glaucoma screening and treatment in Muzaffarnagar at Dr. Satinder Eye Care Centre. Call 8958334505 to book a consultation.',
    h1: 'Glaucoma Treatment in Muzaffarnagar',
    matchKeywords: ['glaucoma'],
    quickAnswers: [
      'Dr. Satinder Eye Care Centre is an eye clinic located on Shamli Road, Muzaffarnagar, Uttar Pradesh.',
      'The clinic offers glaucoma screening, monitoring, and treatment.',
      'Glaucoma consultations are conducted by the clinic\'s ophthalmology team.',
      'To book a glaucoma consultation, call 8958334505 or 8630506562.',
    ],
    faqs: [
      { question: 'Where is Dr. Satinder Eye Care Centre located?', answer: 'The clinic is on Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar, Uttar Pradesh 251002.' },
      { question: 'How do I book a glaucoma consultation?', answer: 'Call 8958334505 or 8630506562, or use the appointment form on this page to request a visit.' },
      { question: 'Who treats glaucoma at this clinic?', answer: 'Glaucoma care is handled by the clinic\'s ophthalmology team; ask at booking which specialist will see you.' },
      { question: 'What are the symptoms of glaucoma?', answer: NEEDS_REVIEW },
      { question: 'How is glaucoma diagnosed?', answer: NEEDS_REVIEW },
      { question: 'Is glaucoma treatment ongoing or one-time?', answer: NEEDS_REVIEW },
    ],
  },
  {
    slug: 'retina-treatment-muzaffarnagar',
    name: 'Retina Treatment',
    seoTitle: 'Retina Treatment in Muzaffarnagar | Dr. Satinder Eye Care Centre',
    metaDescription: 'Retinal disease evaluation and treatment in Muzaffarnagar at Dr. Satinder Eye Care Centre. Call 8958334505 to book.',
    h1: 'Retina Treatment in Muzaffarnagar',
    matchKeywords: ['retina', 'retinal'],
    quickAnswers: [
      'Dr. Satinder Eye Care Centre is an eye clinic located on Shamli Road, Muzaffarnagar, Uttar Pradesh.',
      'The clinic offers retinal disease evaluation as part of its ophthalmology services.',
      'Retina consultations are conducted by the clinic\'s ophthalmology team.',
      'To book a retina consultation, call 8958334505 or 8630506562.',
    ],
    faqs: [
      { question: 'Where is Dr. Satinder Eye Care Centre located?', answer: 'The clinic is on Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar, Uttar Pradesh 251002.' },
      { question: 'How do I book a retina consultation?', answer: 'Call 8958334505 or 8630506562, or use the appointment form on this page to request a visit.' },
      { question: 'Who evaluates retinal disease at this clinic?', answer: 'Retina evaluations are handled by the clinic\'s ophthalmology team; ask at booking which specialist will see you.' },
      { question: 'What retinal conditions are evaluated here?', answer: NEEDS_REVIEW },
      { question: 'What imaging is used to evaluate the retina?', answer: NEEDS_REVIEW },
      { question: 'How often should I get a retina check-up?', answer: NEEDS_REVIEW },
    ],
  },
  {
    slug: 'pediatric-eye-care-muzaffarnagar',
    name: 'Pediatric Eye Care',
    seoTitle: 'Pediatric Eye Care in Muzaffarnagar | Dr. Satinder Eye Care Centre',
    metaDescription: 'Pediatric eye examinations in Muzaffarnagar at Dr. Satinder Eye Care Centre. Gentle care for children. Call 8958334505 to book.',
    h1: 'Pediatric Eye Care in Muzaffarnagar',
    matchKeywords: ['pediatric', 'paediatric', 'children'],
    quickAnswers: [
      'Dr. Satinder Eye Care Centre is an eye clinic located on Shamli Road, Muzaffarnagar, Uttar Pradesh.',
      'The clinic offers eye examinations for children of all ages.',
      'Pediatric eye examinations are conducted by the clinic\'s ophthalmology team.',
      'To book a pediatric eye check-up, call 8958334505 or 8630506562.',
    ],
    faqs: [
      { question: 'Where is Dr. Satinder Eye Care Centre located?', answer: 'The clinic is on Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar, Uttar Pradesh 251002.' },
      { question: 'How do I book a pediatric eye check-up?', answer: 'Call 8958334505 or 8630506562, or use the appointment form on this page to request a visit.' },
      { question: 'Who examines children at this clinic?', answer: 'Pediatric eye examinations are handled by the clinic\'s ophthalmology team; ask at booking which specialist will see you.' },
      { question: 'At what age should a child have their first eye exam?', answer: NEEDS_REVIEW },
      { question: 'What does a pediatric eye exam involve?', answer: NEEDS_REVIEW },
      { question: 'What signs suggest my child needs an eye check-up?', answer: NEEDS_REVIEW },
    ],
  },
  {
    slug: 'comprehensive-eye-checkup-muzaffarnagar',
    name: 'Comprehensive Eye Check-up',
    seoTitle: 'Comprehensive Eye Check-up in Muzaffarnagar | Dr. Satinder Eye Care Centre',
    metaDescription: 'Comprehensive eye check-ups in Muzaffarnagar at Dr. Satinder Eye Care Centre. 50+ years of experience. Call 8958334505 to book.',
    h1: 'Comprehensive Eye Check-up in Muzaffarnagar',
    matchKeywords: ['comprehensive eye', 'eye check', 'eye checkup', 'eye exam'],
    quickAnswers: [
      'Dr. Satinder Eye Care Centre is an eye clinic located on Shamli Road, Muzaffarnagar, Uttar Pradesh.',
      'The clinic offers a comprehensive eye check-up covering vision and overall eye health.',
      'Eye check-ups are conducted by the clinic\'s ophthalmology team.',
      'To book a comprehensive eye check-up, call 8958334505 or 8630506562.',
    ],
    faqs: [
      { question: 'Where is Dr. Satinder Eye Care Centre located?', answer: 'The clinic is on Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar, Uttar Pradesh 251002.' },
      { question: 'How do I book a comprehensive eye check-up?', answer: 'Call 8958334505 or 8630506562, or use the appointment form on this page to request a visit.' },
      { question: 'Who conducts the eye check-up at this clinic?', answer: 'Eye check-ups are handled by the clinic\'s ophthalmology team; ask at booking which specialist will see you.' },
      { question: 'What is included in a comprehensive eye check-up?', answer: NEEDS_REVIEW },
      { question: 'How long does an eye check-up take?', answer: NEEDS_REVIEW },
      { question: 'How often should I get an eye check-up?', answer: NEEDS_REVIEW },
    ],
  },
]

export function getServiceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug)
}

export function findServiceForTitle(title: string) {
  const lower = title.toLowerCase()
  return SERVICES.find((service) => service.matchKeywords.some((keyword) => lower.includes(keyword)))
}

export function getSiblingServices(slug: string, count = 2) {
  return SERVICES.filter((service) => service.slug !== slug).slice(0, count)
}
