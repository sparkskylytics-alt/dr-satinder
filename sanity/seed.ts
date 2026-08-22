import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { readFile } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import { apiVersion, dataset, projectId } from './env'

config({ path: '.env.local' })

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) throw new Error('SANITY_API_WRITE_TOKEN is required. Add it to .env.local before running npm run sanity:seed.')

const image = (imagePath: string, alt: string) => ({ _key: imagePath.replace(/[^a-z0-9]/gi, '').toLowerCase(), imagePath, alt })
const keyed = <T extends Record<string, unknown>>(items: T[]) => items.map((item, index) => ({ ...item, _key: `item${index + 1}` }))

const homePage = {
  _id: 'homePage', _type: 'homePage',
  hero: { eyebrow: 'Advanced Ophthalmology', heading: 'Clearer vision, care you can trust', description: 'A calm, considered approach to eye care — combining decades of surgical experience with the most advanced diagnostic technology, in a space designed for comfort.', imagePath: '/images/gallery/1.jpeg', stats: keyed([{ value: '50+', label: 'Years of care' }, { value: '40k+', label: 'Procedures' }, { value: '99%', label: 'Patient trust' }]) },
  about: { eyebrow: 'About the hospital', heading: 'Care with clarity.', description: 'Founded by Dr. Satinder, Dr. Satinder Eye Care brings together careful diagnosis, modern treatment, and compassionate guidance for every patient.', values: keyed([{ title: 'Personalised care', description: 'Every consultation begins with listening and clear guidance.' }, { title: 'Trusted standards', description: 'Thoughtful diagnosis and treatment plans for every stage of care.' }, { title: 'Comfort first', description: 'A calm, respectful experience for patients and their families.' }]), founderImagePath: '/doctor-image/satinder.PNG', founderName: 'Dr Satinder', founderDescription: 'From Bhiwani, Haryana, he laid the foundation of Dr. Satinder Eye Care with a vision for compassionate, dependable eye care.' },
  team: { eyebrow: 'Our specialists', heading: 'Eye care, expertly guided.', description: 'Our experienced eye-care team combines careful diagnosis, advanced treatment, and personal attention—so every patient feels understood and confidently cared for.', members: keyed([{ name: 'Dr. Ravinder Kumar Sharma', role: 'Senior Ophthalmologist', qualifications: 'B.I.M., D.U.M.S. (Lk.), D.R. Opth. (Delhi)', specialties: ['Refraction & Contact Lens Specialist', 'General Ophthalmologist'], imagePath: '/doctor-image/ravinder.jpeg' }, { name: 'Dr. Vibhuti Sharan', role: 'Visiting Surgeon', qualifications: 'M.B.B.S., M.S.', specialties: ['Ophthalmologist', 'Phaco & LASIK Eye Surgeon'], imagePath: '/doctor-image/vibhuti.jpeg' }, { name: 'Dr. Vikrant Vashist', role: 'Optometrist & Eye Care Specialist', qualifications: 'M.Sc., M.Optom · B.Sc., B.Optom (Chandigarh)', specialties: ['Clinical Eye Care', 'Optometry & Vision Assessment', 'Refraction and lens specialist'], imagePath: '/doctor-image/vikrant.jpeg' }]) },
  services: { eyebrow: 'Treatments & services', heading: 'Specialist care for every vision need', description: 'From routine check-ups to advanced eye treatment, your care is planned around your symptoms, vision, and long-term eye health.', featured: keyed([{ title: 'Comprehensive Eye Check-up', description: 'A detailed assessment of your vision and complete eye health.', imagePath: '/images/service-eye-checkup.png' }, { title: 'Cataract Evaluation & Surgery', description: 'Precision phaco surgery with a clear, personalized treatment plan.', imagePath: '/images/service-cataract-surgery.png' }, { title: 'Glaucoma Care', description: 'Early screening, monitoring, and treatment to protect your vision.', imagePath: '/images/service-glaucoma-screening.png' }, { title: 'Pediatric Eye Care', description: 'Gentle, reassuring eye examinations for children of all ages.', imagePath: '/images/service-pediatric-care.png' }]), additional: ['Diabetic Eye Examination', 'Retinal Disease Evaluation', 'Computer Vision & Digital Eye Strain Management', 'Dry Eye Treatment', 'Conjunctivitis & Eye Infection Treatment', 'Refractive Error Evaluation', 'Spectacle & Contact Lens Prescription', 'Optical Services & Customized Eyewear', 'Emergency Eye Care', 'Regular Follow-up & Post-operative Care', 'And many other eye-related issues'] },
  technology: { eyebrow: 'Technology', heading: 'Instruments engineered for certainty', description: 'Diagnosis is only as good as the tools behind it. Our theatre and clinic run on the same platforms trusted by leading eye hospitals worldwide.', machines: keyed([['Auto Refractor', 'Fast, objective measurement of refractive error to guide your prescription.', 'auto-refractor.jpeg'], ['Keratometer', 'Detailed corneal curvature measurements for accurate lens planning and fitting.', 'keratometer.jpeg'], ['Lensometer', 'Precise verification of spectacle lens power for dependable visual correction.', 'lensometer.jpeg'], ['Surgical Microscope', 'High-definition magnification supporting controlled, precise eye procedures.', 'microscope.jpeg'], ['Non-Contact Tonometer', 'A quick, comfortable way to screen intraocular pressure for glaucoma care.', 'non-contact-tonometer.jpeg'], ['Ocular Scan', 'Detailed imaging that helps our team assess eye structures with clarity.', 'scan.jpeg'], ['Slit Lamp', 'High-magnification examination of the cornea, lens, retina, and eye surface.', 'slit-lamps.jpeg']].map(([name, description, file]) => ({ name, description, imagePath: `/images/technology/${file}` }))) },
  gallery: { eyebrow: 'The space', heading: 'A clinic designed to put you at ease', description: 'Explore the calm, comfortable spaces where your eye care takes place.', items: [1, 2, 3, 5, 7, 8, 9, 10, 11, 12].map((number) => image(`/images/gallery/${number}.jpeg`, `Dr Satinder Eye Care clinic gallery image ${number}`)) },
  media: [1, 2, 4, 5, 6, 7].map((number) => image(`/media-gallery/media-gallery-${number}.jpeg`, `Dr Satinder Eye Care featured in media ${number}`)),
  videos: { eyebrow: 'Inside the clinic', heading: 'Precision you can see, care you can feel', description: 'Swipe or use the arrows to explore.', items: keyed([{ title: 'A closer look at your eyes', videoPath: '/doctor-video/video-1.mp4' }, { title: 'Modern diagnostic care', videoPath: '/doctor-video/video-2.mp4' }, { title: 'Precision cataract treatment', videoPath: '/doctor-video/video-3.mp4' }, { title: 'Care designed around you', videoPath: '/doctor-video/video-5.mp4' }, { title: 'Advanced vision technology', videoPath: '/doctor-video/video-6.mp4' }]) },
  testimonials: { eyebrow: 'Patient voices', heading: 'Trusted by the people who see us most', description: '', featuredImagePath: '/images/appointment-cta.png', imageLabel: 'Care, in their words', items: keyed([{ quote: 'I was nervous about cataract surgery, but Dr Satinder explained everything with such patience. The next morning I could read again without glasses. Remarkable.', name: 'Harpreet K.', detail: 'Cataract patient' }, { quote: 'The clinic feels more like a calm hotel than a hospital. Every instrument was modern and every staff member kind. My LASIK result exceeded expectations.', name: 'Rohit M.', detail: 'LASIK patient' }, { quote: 'After years of worry about my glaucoma, I finally feel in safe hands. The monitoring is thorough and the guidance is always clear.', name: 'Anjali S.', detail: 'Glaucoma care' }]) },
  contact: { eyebrow: 'Appointments', heading: 'Begin with a conversation', description: 'Share a few details and our care team will confirm your visit. No obligation — just a considered first step toward clearer vision.', appointmentImagePath: '/images/appointment-cta.png', phoneNumbers: ['89583 44505', '86305 06562'], email: 'Drsatinderyecare@gmail.com', hours: 'Mon & Wed–Sun: 10:00 AM – 7:30 PM · Tue: Closed', address: '349, Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar – 251002' },
  footer: { description: 'Comprehensive, compassionate eye care for clearer vision and long-term eye health.', treatmentLinks: keyed([{ label: 'Cataract Surgery', href: '#services' }, { label: 'LASIK & Refractive', href: '#services' }, { label: 'Glaucoma', href: '#services' }, { label: 'Retina', href: '#services' }, { label: 'Consultation', href: '#appointment' }]), exploreLinks: keyed([{ label: 'About', href: '#about' }, { label: 'Treatments', href: '#services' }, { label: 'Technology', href: '#technology' }, { label: 'Gallery', href: '#gallery' }, { label: 'Patients', href: '#testimonials' }]), address: '349, Shamli Road, near Tarachand Petrol Pump, Eidgah Police Chowki, Muzaffarnagar – 251002', phone: '89583 44505 · 86305 06562', email: 'Drsatinderyecare@gmail.com', hours: 'Mon & Wed–Sun: 10:00 AM – 7:30 PM · Tue: Closed', copyright: '© 2026 Dr Satinder Eye Care. All rights reserved.' },
}

const uploadedImages = new Map<string, { _type: 'image'; asset: { _type: 'reference'; _ref: string } }>()

async function uploadLocalImage(client: ReturnType<typeof createClient>, imagePath: string) {
  const cached = uploadedImages.get(imagePath)
  if (cached) return cached

  const file = await readFile(resolve(process.cwd(), 'public', imagePath.slice(1)))
  const asset = await client.assets.upload('image', file, { filename: basename(imagePath) })
  const image = { _type: 'image' as const, asset: { _type: 'reference' as const, _ref: asset._id } }
  uploadedImages.set(imagePath, image)
  return image
}

async function addSanityImages(client: ReturnType<typeof createClient>, value: unknown): Promise<unknown> {
  if (Array.isArray(value)) return Promise.all(value.map((item) => addSanityImages(client, item)))
  if (!value || typeof value !== 'object') return value

  const record = value as Record<string, unknown>
  const result: Record<string, unknown> = {}
  for (const [key, item] of Object.entries(record)) result[key] = await addSanityImages(client, item)

  if (typeof record.imagePath === 'string') result.image = await uploadLocalImage(client, record.imagePath)
  if (typeof record.founderImagePath === 'string') result.founderImage = await uploadLocalImage(client, record.founderImagePath)
  if (typeof record.featuredImagePath === 'string') result.featuredImage = await uploadLocalImage(client, record.featuredImagePath)
  if (typeof record.appointmentImagePath === 'string') result.appointmentImage = await uploadLocalImage(client, record.appointmentImagePath)
  return result
}

async function seed() {
  console.log('Preparing existing content and images for Sanity...')
  const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })
  await client.transaction()
    .createOrReplace({ _id: 'heroSection', _type: 'heroSection', ...homePage.hero })
    .createOrReplace({ _id: 'aboutSection', _type: 'aboutSection', ...homePage.about })
    .createOrReplace({ _id: 'teamSection', _type: 'teamSection', ...homePage.team })
    .createOrReplace({ _id: 'servicesSection', _type: 'servicesSection', ...homePage.services })
    .createOrReplace({ _id: 'technologySection', _type: 'technologySection', ...homePage.technology })
    .createOrReplace({ _id: 'gallerySection', _type: 'gallerySection', ...homePage.gallery })
    .createOrReplace({ _id: 'videosSection', _type: 'videosSection', ...homePage.videos })
    .createOrReplace({ _id: 'mediaSection', _type: 'mediaSection', items: homePage.media })
    .createOrReplace({ _id: 'testimonialsSection', _type: 'testimonialsSection', ...homePage.testimonials })
    .createOrReplace({ _id: 'contactSection', _type: 'contactSection', ...homePage.contact })
    .createOrReplace({ _id: 'footerSection', _type: 'footerSection', ...homePage.footer })
    .commit()
  console.log('Text content seeded. Uploading existing images...')

  const sections = await addSanityImages(client, homePage) as typeof homePage
  await client.transaction()
    .createOrReplace({ _id: 'heroSection', _type: 'heroSection', ...sections.hero })
    .createOrReplace({ _id: 'aboutSection', _type: 'aboutSection', ...sections.about })
    .createOrReplace({ _id: 'teamSection', _type: 'teamSection', ...sections.team })
    .createOrReplace({ _id: 'servicesSection', _type: 'servicesSection', ...sections.services })
    .createOrReplace({ _id: 'technologySection', _type: 'technologySection', ...sections.technology })
    .createOrReplace({ _id: 'gallerySection', _type: 'gallerySection', ...sections.gallery })
    .createOrReplace({ _id: 'videosSection', _type: 'videosSection', ...sections.videos })
    .createOrReplace({ _id: 'mediaSection', _type: 'mediaSection', items: sections.media })
    .createOrReplace({ _id: 'testimonialsSection', _type: 'testimonialsSection', ...sections.testimonials })
    .createOrReplace({ _id: 'contactSection', _type: 'contactSection', ...sections.contact })
    .commit()
  console.log(`Seeded website sections into ${projectId}/${dataset}`)
}

seed().catch((error) => {
  console.error('Sanity seed failed:', error)
  process.exitCode = 1
})
