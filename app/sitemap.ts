import type { MetadataRoute } from 'next'
import { CLINIC } from '@/lib/clinic'
import { SERVICES } from '@/lib/services'
import { DOCTORS } from '@/lib/doctors'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${CLINIC.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${CLINIC.url}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${CLINIC.url}/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const doctorRoutes: MetadataRoute.Sitemap = DOCTORS.map((doctor) => ({
    url: `${CLINIC.url}/doctors/${doctor.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...serviceRoutes, ...doctorRoutes]
}
