import type { Metadata } from 'next'
import { ServicePage } from '@/components/service-page'
import { getServiceBySlug } from '@/lib/services'

const service = getServiceBySlug('post-operative-follow-up-care-muzaffarnagar')!

export const metadata: Metadata = {
  title: service.seoTitle,
  description: service.metaDescription,
  alternates: { canonical: `/${service.slug}` },
}

export default function Page() {
  return <ServicePage service={service} />
}
