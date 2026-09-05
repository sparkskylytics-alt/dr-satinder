export type Doctor = {
  slug: string
  name: string
  role: string
  qualifications: string
  specialties: string[]
  image: string
}

export const DOCTORS: Doctor[] = [
  {
    slug: 'ravinder-kumar-sharma',
    name: 'Dr. Ravinder Kumar Sharma',
    role: 'Senior Ophthalmologist',
    qualifications: 'B.I.M., D.U.M.S. (Lk.), D.R. Opth. (Delhi)',
    specialties: ['Refraction & Contact Lens Specialist', 'General Ophthalmologist'],
    image: '/doctor-image/ravinder.jpeg',
  },
  {
    slug: 'vibhuti-sharan',
    name: 'Dr. Vibhuti Sharan',
    role: 'Visiting Surgeon',
    qualifications: 'M.B.B.S., M.S.',
    specialties: ['Ophthalmologist', 'Phaco & LASIK Eye Surgeon'],
    image: '/doctor-image/vibhuti.jpeg',
  },
  {
    slug: 'vikrant-vashist',
    name: 'Dr. Vikrant Vashist',
    role: 'Optometrist & Eye Care Specialist',
    qualifications: 'M.Sc., M.Optom · B.Sc., B.Optom (Chandigarh)',
    specialties: ['Clinical Eye Care', 'Optometry & Vision Assessment', 'Refraction and lens specialist'],
    image: '/doctor-image/vikrant.jpeg',
  },
]

export function getDoctorBySlug(slug: string) {
  return DOCTORS.find((doctor) => doctor.slug === slug)
}
