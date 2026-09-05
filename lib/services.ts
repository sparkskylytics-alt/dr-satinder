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
    matchKeywords: ['lasik'],
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
    matchKeywords: ['comprehensive eye', 'eye check-up', 'eye checkup'],
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
  {
    slug: 'diabetic-eye-examination-muzaffarnagar',
    name: 'Diabetic Eye Examination',
    seoTitle: 'Diabetic Eye Examination in Muzaffarnagar | Dr. Satinder Eye Care Centre',
    metaDescription: 'Diabetic eye examination in Muzaffarnagar at Dr. Satinder Eye Care Centre. 50+ years of experience. Call 8958334505 to book.',
    h1: 'Diabetic Eye Examination in Muzaffarnagar',
    matchKeywords: ['diabetic'],
    quickAnswers: [
      'Dr. Satinder Eye Care Centre is an eye clinic located on Shamli Road, Muzaffarnagar, Uttar Pradesh.',
      'The clinic offers diabetic eye examinations as part of its ophthalmology services.',
      'Diabetic eye examinations are conducted by the clinic\'s ophthalmology team.',
      'To book a diabetic eye examination, call 8958334505 or 8630506562.',
    ],
    faqs: [
      { question: 'Where is Dr. Satinder Eye Care Centre located?', answer: 'The clinic is on Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar, Uttar Pradesh 251002.' },
      { question: 'How do I book a diabetic eye examination?', answer: 'Call 8958334505 or 8630506562, or use the appointment form on this page to request a visit.' },
      { question: 'Who conducts diabetic eye examinations at this clinic?', answer: 'Diabetic eye examinations are handled by the clinic\'s ophthalmology team; ask at booking which specialist will see you.' },
      { question: 'Why do people with diabetes need regular eye exams?', answer: NEEDS_REVIEW },
      { question: 'What does a diabetic eye examination involve?', answer: NEEDS_REVIEW },
      { question: 'How often should a diabetic patient get an eye check-up?', answer: NEEDS_REVIEW },
    ],
  },
  {
    slug: 'computer-vision-eye-strain-muzaffarnagar',
    name: 'Computer Vision & Digital Eye Strain Management',
    seoTitle: 'Computer Vision & Digital Eye Strain Care in Muzaffarnagar | Dr. Satinder Eye Care Centre',
    metaDescription: 'Computer vision and digital eye strain management in Muzaffarnagar at Dr. Satinder Eye Care Centre. Call 8958334505 to book.',
    h1: 'Computer Vision & Digital Eye Strain Management in Muzaffarnagar',
    matchKeywords: ['computer vision', 'digital eye strain'],
    quickAnswers: [
      'Dr. Satinder Eye Care Centre is an eye clinic located on Shamli Road, Muzaffarnagar, Uttar Pradesh.',
      'The clinic offers computer vision and digital eye strain management.',
      'Consultations for digital eye strain are conducted by the clinic\'s ophthalmology team.',
      'To book a consultation, call 8958334505 or 8630506562.',
    ],
    faqs: [
      { question: 'Where is Dr. Satinder Eye Care Centre located?', answer: 'The clinic is on Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar, Uttar Pradesh 251002.' },
      { question: 'How do I book a digital eye strain consultation?', answer: 'Call 8958334505 or 8630506562, or use the appointment form on this page to request a visit.' },
      { question: 'Who manages digital eye strain at this clinic?', answer: 'Digital eye strain consultations are handled by the clinic\'s ophthalmology team; ask at booking which specialist will see you.' },
      { question: 'What are the symptoms of digital eye strain?', answer: NEEDS_REVIEW },
      { question: 'How is computer vision syndrome managed?', answer: NEEDS_REVIEW },
      { question: 'Can screen time be safely reduced without giving up work?', answer: NEEDS_REVIEW },
    ],
  },
  {
    slug: 'dry-eye-treatment-muzaffarnagar',
    name: 'Dry Eye Treatment',
    seoTitle: 'Dry Eye Treatment in Muzaffarnagar | Dr. Satinder Eye Care Centre',
    metaDescription: 'Dry eye treatment in Muzaffarnagar at Dr. Satinder Eye Care Centre. 50+ years of experience. Call 8958334505 to book.',
    h1: 'Dry Eye Treatment in Muzaffarnagar',
    matchKeywords: ['dry eye'],
    quickAnswers: [
      'Dr. Satinder Eye Care Centre is an eye clinic located on Shamli Road, Muzaffarnagar, Uttar Pradesh.',
      'The clinic offers dry eye treatment among its ophthalmology services.',
      'Dry eye consultations are conducted by the clinic\'s ophthalmology team.',
      'To book a dry eye consultation, call 8958334505 or 8630506562.',
    ],
    faqs: [
      { question: 'Where is Dr. Satinder Eye Care Centre located?', answer: 'The clinic is on Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar, Uttar Pradesh 251002.' },
      { question: 'How do I book a dry eye consultation?', answer: 'Call 8958334505 or 8630506562, or use the appointment form on this page to request a visit.' },
      { question: 'Who treats dry eye at this clinic?', answer: 'Dry eye consultations are handled by the clinic\'s ophthalmology team; ask at booking which specialist will see you.' },
      { question: 'What causes dry eye?', answer: NEEDS_REVIEW },
      { question: 'What treatments are available for dry eye?', answer: NEEDS_REVIEW },
      { question: 'Is dry eye a long-term condition?', answer: NEEDS_REVIEW },
    ],
  },
  {
    slug: 'conjunctivitis-eye-infection-treatment-muzaffarnagar',
    name: 'Conjunctivitis & Eye Infection Treatment',
    seoTitle: 'Conjunctivitis & Eye Infection Treatment in Muzaffarnagar | Dr. Satinder Eye Care Centre',
    metaDescription: 'Conjunctivitis and eye infection treatment in Muzaffarnagar at Dr. Satinder Eye Care Centre. Call 8958334505 to book.',
    h1: 'Conjunctivitis & Eye Infection Treatment in Muzaffarnagar',
    matchKeywords: ['conjunctivitis', 'eye infection'],
    quickAnswers: [
      'Dr. Satinder Eye Care Centre is an eye clinic located on Shamli Road, Muzaffarnagar, Uttar Pradesh.',
      'The clinic offers treatment for conjunctivitis and other eye infections.',
      'Eye infection consultations are conducted by the clinic\'s ophthalmology team.',
      'To book a consultation, call 8958334505 or 8630506562.',
    ],
    faqs: [
      { question: 'Where is Dr. Satinder Eye Care Centre located?', answer: 'The clinic is on Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar, Uttar Pradesh 251002.' },
      { question: 'How do I book an eye infection consultation?', answer: 'Call 8958334505 or 8630506562, or use the appointment form on this page to request a visit.' },
      { question: 'Who treats conjunctivitis at this clinic?', answer: 'Eye infection consultations are handled by the clinic\'s ophthalmology team; ask at booking which specialist will see you.' },
      { question: 'What are the symptoms of conjunctivitis?', answer: NEEDS_REVIEW },
      { question: 'Is conjunctivitis contagious?', answer: NEEDS_REVIEW },
      { question: 'How is an eye infection treated?', answer: NEEDS_REVIEW },
    ],
  },
  {
    slug: 'refractive-error-evaluation-muzaffarnagar',
    name: 'Refractive Error Evaluation',
    seoTitle: 'Refractive Error Evaluation in Muzaffarnagar | Dr. Satinder Eye Care Centre',
    metaDescription: 'Refractive error evaluation in Muzaffarnagar at Dr. Satinder Eye Care Centre. 50+ years of experience. Call 8958334505 to book.',
    h1: 'Refractive Error Evaluation in Muzaffarnagar',
    matchKeywords: ['refractive error'],
    quickAnswers: [
      'Dr. Satinder Eye Care Centre is an eye clinic located on Shamli Road, Muzaffarnagar, Uttar Pradesh.',
      'The clinic offers refractive error evaluation among its ophthalmology services.',
      'Refractive error evaluations are conducted by the clinic\'s ophthalmology team.',
      'To book a refractive error evaluation, call 8958334505 or 8630506562.',
    ],
    faqs: [
      { question: 'Where is Dr. Satinder Eye Care Centre located?', answer: 'The clinic is on Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar, Uttar Pradesh 251002.' },
      { question: 'How do I book a refractive error evaluation?', answer: 'Call 8958334505 or 8630506562, or use the appointment form on this page to request a visit.' },
      { question: 'Who conducts refractive error evaluations at this clinic?', answer: 'Refractive error evaluations are handled by the clinic\'s ophthalmology team; ask at booking which specialist will see you.' },
      { question: 'What is a refractive error?', answer: NEEDS_REVIEW },
      { question: 'How is a refractive error corrected?', answer: NEEDS_REVIEW },
      { question: 'How often should my prescription be rechecked?', answer: NEEDS_REVIEW },
    ],
  },
  {
    slug: 'spectacle-contact-lens-muzaffarnagar',
    name: 'Spectacle & Contact Lens Prescription',
    seoTitle: 'Spectacle & Contact Lens Prescription in Muzaffarnagar | Dr. Satinder Eye Care Centre',
    metaDescription: 'Spectacle and contact lens prescription in Muzaffarnagar at Dr. Satinder Eye Care Centre. Call 8958334505 to book.',
    h1: 'Spectacle & Contact Lens Prescription in Muzaffarnagar',
    matchKeywords: ['spectacle', 'contact lens'],
    quickAnswers: [
      'Dr. Satinder Eye Care Centre is an eye clinic located on Shamli Road, Muzaffarnagar, Uttar Pradesh.',
      'The clinic offers spectacle and contact lens prescription services.',
      'Prescriptions are issued by the clinic\'s ophthalmology team following an eye examination.',
      'To book a consultation, call 8958334505 or 8630506562.',
    ],
    faqs: [
      { question: 'Where is Dr. Satinder Eye Care Centre located?', answer: 'The clinic is on Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar, Uttar Pradesh 251002.' },
      { question: 'How do I book a spectacle or contact lens consultation?', answer: 'Call 8958334505 or 8630506562, or use the appointment form on this page to request a visit.' },
      { question: 'Who issues spectacle and contact lens prescriptions at this clinic?', answer: 'Prescriptions are issued by the clinic\'s ophthalmology team; ask at booking which specialist will see you.' },
      { question: 'How often should a spectacle prescription be updated?', answer: NEEDS_REVIEW },
      { question: 'Am I a candidate for contact lenses?', answer: NEEDS_REVIEW },
      { question: 'What is involved in a contact lens fitting?', answer: NEEDS_REVIEW },
    ],
  },
  {
    slug: 'optical-services-eyewear-muzaffarnagar',
    name: 'Optical Services & Customized Eyewear',
    seoTitle: 'Optical Services & Customized Eyewear in Muzaffarnagar | Dr. Satinder Eye Care Centre',
    metaDescription: 'Optical services and customized eyewear in Muzaffarnagar at Dr. Satinder Eye Care Centre. Call 8958334505 to book.',
    h1: 'Optical Services & Customized Eyewear in Muzaffarnagar',
    matchKeywords: ['optical services', 'eyewear'],
    quickAnswers: [
      'Dr. Satinder Eye Care Centre is an eye clinic located on Shamli Road, Muzaffarnagar, Uttar Pradesh.',
      'The clinic offers optical services and customized eyewear.',
      'Optical consultations are conducted by the clinic\'s ophthalmology team.',
      'To book a consultation, call 8958334505 or 8630506562.',
    ],
    faqs: [
      { question: 'Where is Dr. Satinder Eye Care Centre located?', answer: 'The clinic is on Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar, Uttar Pradesh 251002.' },
      { question: 'How do I book an optical services consultation?', answer: 'Call 8958334505 or 8630506562, or use the appointment form on this page to request a visit.' },
      { question: 'Who provides optical services at this clinic?', answer: 'Optical services are handled by the clinic\'s ophthalmology team; ask at booking which specialist will see you.' },
      { question: 'What eyewear options are available?', answer: NEEDS_REVIEW },
      { question: 'How long does it take to get customized eyewear ready?', answer: NEEDS_REVIEW },
      { question: 'Can eyewear be customized for children?', answer: NEEDS_REVIEW },
    ],
  },
  {
    slug: 'emergency-eye-care-muzaffarnagar',
    name: 'Emergency Eye Care',
    seoTitle: 'Emergency Eye Care in Muzaffarnagar | Dr. Satinder Eye Care Centre',
    metaDescription: 'Emergency eye care in Muzaffarnagar at Dr. Satinder Eye Care Centre. Call 8958334505 for urgent eye concerns.',
    h1: 'Emergency Eye Care in Muzaffarnagar',
    matchKeywords: ['emergency'],
    quickAnswers: [
      'Dr. Satinder Eye Care Centre is an eye clinic located on Shamli Road, Muzaffarnagar, Uttar Pradesh.',
      'The clinic offers emergency eye care for urgent eye concerns.',
      'Emergency consultations are conducted by the clinic\'s ophthalmology team.',
      'For urgent eye concerns, call 8958334505 or 8630506562.',
    ],
    faqs: [
      { question: 'Where is Dr. Satinder Eye Care Centre located?', answer: 'The clinic is on Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar, Uttar Pradesh 251002.' },
      { question: 'What number do I call for an eye emergency?', answer: 'Call 8958334505 or 8630506562.' },
      { question: 'Who handles emergency eye care at this clinic?', answer: 'Emergency eye concerns are handled by the clinic\'s ophthalmology team; call ahead when possible.' },
      { question: 'What counts as an eye emergency?', answer: NEEDS_REVIEW },
      { question: 'Is emergency eye care available outside regular hours?', answer: NEEDS_REVIEW },
      { question: 'What should I do while waiting to be seen for an eye injury?', answer: NEEDS_REVIEW },
    ],
  },
  {
    slug: 'post-operative-follow-up-care-muzaffarnagar',
    name: 'Regular Follow-up & Post-operative Care',
    seoTitle: 'Post-operative & Follow-up Eye Care in Muzaffarnagar | Dr. Satinder Eye Care Centre',
    metaDescription: 'Post-operative and follow-up eye care in Muzaffarnagar at Dr. Satinder Eye Care Centre. Call 8958334505 to book.',
    h1: 'Regular Follow-up & Post-operative Care in Muzaffarnagar',
    matchKeywords: ['follow-up', 'post-operative'],
    quickAnswers: [
      'Dr. Satinder Eye Care Centre is an eye clinic located on Shamli Road, Muzaffarnagar, Uttar Pradesh.',
      'The clinic offers regular follow-up and post-operative care for previous patients.',
      'Follow-up consultations are conducted by the clinic\'s ophthalmology team.',
      'To book a follow-up visit, call 8958334505 or 8630506562.',
    ],
    faqs: [
      { question: 'Where is Dr. Satinder Eye Care Centre located?', answer: 'The clinic is on Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar, Uttar Pradesh 251002.' },
      { question: 'How do I book a follow-up visit?', answer: 'Call 8958334505 or 8630506562, or use the appointment form on this page to request a visit.' },
      { question: 'Who conducts follow-up and post-operative reviews at this clinic?', answer: 'Follow-up care is handled by the clinic\'s ophthalmology team; ask at booking which specialist will see you.' },
      { question: 'How many follow-up visits are typically needed after surgery?', answer: NEEDS_REVIEW },
      { question: 'What happens at a post-operative check-up?', answer: NEEDS_REVIEW },
      { question: 'What symptoms after surgery should prompt an earlier visit?', answer: NEEDS_REVIEW },
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
