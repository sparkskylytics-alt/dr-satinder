export type Doctor = {
  slug: string
  name: string
  role: string
  qualifications: string
  specialties: string[]
  image: string
  // Drafted from the fields above only (role/qualifications/specialties) — no invented
  // experience, achievements, or history. Needs doctor review before treated as final.
  bio: string
  relatedServiceSlugs: string[]
}

export const DOCTORS: Doctor[] = [
  {
    slug: 'ravinder-kumar-sharma',
    name: 'Dr. Ravinder Kumar Sharma',
    role: 'Senior Ophthalmologist',
    qualifications: 'B.I.M., D.U.M.S. (Lk.), D.R. Opth. (Delhi)',
    specialties: ['Refraction & Contact Lens Specialist', 'General Ophthalmologist'],
    image: '/doctor-image/ravinder.jpeg',
    bio: 'Dr. Ravinder Kumar Sharma is a Senior Ophthalmologist at Dr. Satinder Eye Care Centre in Muzaffarnagar, holding D.U.M.S. (Lucknow) and D.R. Opth. (Delhi) qualifications. His practice focuses on refraction and contact lens fitting alongside general ophthalmology care.',
    relatedServiceSlugs: ['refractive-error-evaluation-muzaffarnagar', 'spectacle-contact-lens-muzaffarnagar', 'comprehensive-eye-checkup-muzaffarnagar'],
  },
  {
    slug: 'vibhuti-sharan',
    name: 'Dr. Vibhuti Sharan',
    role: 'Visiting Surgeon',
    qualifications: 'M.B.B.S., M.S.',
    specialties: ['Ophthalmologist', 'Phaco & LASIK Eye Surgeon'],
    image: '/doctor-image/vibhuti.jpeg',
    bio: 'Dr. Vibhuti Sharan is a Visiting Surgeon at Dr. Satinder Eye Care Centre, holding M.B.B.S. and M.S. qualifications. As an ophthalmologist, his practice focuses on phacoemulsification cataract surgery and LASIK eye surgery.',
    relatedServiceSlugs: ['cataract-surgery-muzaffarnagar', 'lasik-eye-surgery-muzaffarnagar'],
  },
  {
    slug: 'vikrant-vashist',
    name: 'Dr. Vikrant Vashist',
    role: 'Optometrist & Eye Care Specialist',
    qualifications: 'M.Sc., M.Optom · B.Sc., B.Optom (Chandigarh)',
    specialties: ['Clinical Eye Care', 'Optometry & Vision Assessment', 'Refraction and lens specialist'],
    image: '/doctor-image/vikrant.jpeg',
    bio: 'Dr. Vikrant Vashist is an Optometrist and Eye Care Specialist at Dr. Satinder Eye Care Centre, holding M.Optom and B.Optom qualifications from Chandigarh. His work focuses on clinical eye care, vision assessment, and refraction and lens fitting.',
    relatedServiceSlugs: ['comprehensive-eye-checkup-muzaffarnagar', 'refractive-error-evaluation-muzaffarnagar', 'spectacle-contact-lens-muzaffarnagar'],
  },
]

export function getDoctorBySlug(slug: string) {
  return DOCTORS.find((doctor) => doctor.slug === slug)
}
