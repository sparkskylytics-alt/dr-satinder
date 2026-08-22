import { defineQuery } from 'next-sanity'

export const HOMEPAGE_QUERY = defineQuery(`{
  "hero": *[_id == "heroSection"][0]{
    eyebrow, heading, description, imagePath,
    "imagePath": coalesce(image.asset->url, imagePath),
    stats[]{_key, value, label}
  },
  "footer": *[_id == "footerSection"][0]{description, treatmentLinks[]{_key, label, href}, exploreLinks[]{_key, label, href}, address, phone, email, hours, copyright},
  "media": *[_id == "mediaSection"][0]{
    items[]{_key, alt, "src": coalesce(image.asset->url, imagePath)}
  },
  "contact": *[_id == "contactSection"][0]{
    eyebrow, heading, description,
    "appointmentImagePath": coalesce(appointmentImage.asset->url, appointmentImagePath),
    phoneNumbers, email, hours, address
  },
  "about": *[_id == "aboutSection"][0]{
    eyebrow, heading, description, founderName, founderDescription,
    "founderImagePath": coalesce(founderImage.asset->url, founderImagePath),
    values[]{_key, title, description}
  },
  "team": *[_id == "teamSection"][0]{
    eyebrow, heading, description,
    members[]{_key, name, role, qualifications, specialties, "image": coalesce(image.asset->url, imagePath)}
  },
  "services": *[_id == "servicesSection"][0]{
    eyebrow, heading, description,
    featured[]{_key, title, description, "image": coalesce(image.asset->url, imagePath)},
    additional
  },
  "technology": *[_id == "technologySection"][0]{
    eyebrow, heading, description,
    machines[]{_key, name, description, "image": coalesce(image.asset->url, imagePath)}
  },
  "gallery": *[_id == "gallerySection"][0]{
    eyebrow, heading, description,
    items[]{_key, alt, "src": coalesce(image.asset->url, imagePath)}
  },
  "community": *[_id == "communitySection"][0]{
    eyebrow, heading, description, footerText,
    items[]{_key, alt, "src": coalesce(image.asset->url, imagePath)}
  },
  "videos": *[_id == "videosSection"][0]{
    eyebrow, heading, description,
    items[]{_key, title, "video": coalesce(video.asset->url, videoPath)}
  },
  "testimonials": *[_id == "testimonialsSection"][0]{
    eyebrow, heading, description, imageLabel,
    "featuredImagePath": coalesce(featuredImage.asset->url, featuredImagePath),
    items[]{_key, quote, name, detail}
  }
}`)
