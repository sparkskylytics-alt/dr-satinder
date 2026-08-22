import { client } from './client'
import { HOMEPAGE_QUERY } from './queries'

export type HeroContent = {
  eyebrow?: string
  heading?: string
  description?: string
  imagePath?: string
  stats?: { _key?: string; value: string; label: string }[]
}

export type FooterContent = {
  description?: string
  treatmentLinks?: { _key?: string; label: string; href: string }[]
  exploreLinks?: { _key?: string; label: string; href: string }[]
  address?: string
  phone?: string
  email?: string
  hours?: string
  copyright?: string
}

export type MediaContent = {
  items?: { _key?: string; src?: string; alt?: string }[]
}

export type ContactContent = {
  eyebrow?: string
  heading?: string
  description?: string
  appointmentImagePath?: string
  phoneNumbers?: string[]
  email?: string
  hours?: string
  address?: string
}

export type AboutContent = { eyebrow?: string; heading?: string; description?: string; founderName?: string; founderDescription?: string; founderImagePath?: string; values?: { _key?: string; title?: string; description?: string }[] }
export type TeamContent = { eyebrow?: string; heading?: string; description?: string; members?: { _key?: string; name?: string; role?: string; qualifications?: string; specialties?: string[]; image?: string }[] }
export type ServicesContent = { eyebrow?: string; heading?: string; description?: string; featured?: { _key?: string; title?: string; description?: string; image?: string }[]; additional?: string[] }
export type TechnologyContent = { eyebrow?: string; heading?: string; description?: string; machines?: { _key?: string; name?: string; description?: string; image?: string }[] }
export type GalleryContent = { eyebrow?: string; heading?: string; description?: string; items?: { _key?: string; src?: string; alt?: string }[] }
export type VideosContent = { eyebrow?: string; heading?: string; description?: string; items?: { _key?: string; title?: string; video?: string }[] }
export type TestimonialsContent = { eyebrow?: string; heading?: string; description?: string; imageLabel?: string; featuredImagePath?: string; items?: { _key?: string; quote?: string; name?: string; detail?: string }[] }
export type CommunityContent = { eyebrow?: string; heading?: string; description?: string; footerText?: string; items?: { _key?: string; src?: string; alt?: string }[] }

export async function getHomepage() {
  try {
    return await client.fetch<{ hero?: HeroContent; footer?: FooterContent; media?: MediaContent; contact?: ContactContent; about?: AboutContent; team?: TeamContent; services?: ServicesContent; technology?: TechnologyContent; gallery?: GalleryContent; community?: CommunityContent; videos?: VideosContent; testimonials?: TestimonialsContent } | null>(HOMEPAGE_QUERY)
  } catch (error) {
    console.error('Unable to load Sanity homepage content', error)
    return null
  }
}
