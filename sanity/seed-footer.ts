import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { apiVersion, dataset, projectId } from './env'
import { CLINIC } from '../lib/clinic'

config({ path: '.env.local' })
const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) throw new Error('SANITY_API_WRITE_TOKEN is required.')

const links = (items: [string, string][]) => items.map(([label, href], index) => ({ _key: `link${index + 1}`, label, href }))

createClient({ projectId, dataset, apiVersion, token, useCdn: false }).createOrReplace({
  _id: 'footerSection', _type: 'footerSection',
  description: 'Comprehensive, compassionate eye care for clearer vision and long-term eye health.',
  treatmentLinks: links([['Cataract Surgery', '#services'], ['LASIK & Refractive', '#services'], ['Glaucoma', '#services'], ['Retina', '#services'], ['Consultation', '#appointment']]),
  exploreLinks: links([['About', '#about'], ['Treatments', '#services'], ['Technology', '#technology'], ['Gallery', '#gallery'], ['Patients', '#testimonials']]),
  address: CLINIC.addressDisplay,
  phone: CLINIC.telephoneDisplay, email: CLINIC.email, hours: CLINIC.hoursDisplay, copyright: '© 2026 Dr Satinder Eye Care. All rights reserved.',
}).then(() => console.log('Seeded Footer section.')).catch((error) => { console.error(error); process.exitCode = 1 })
