'use client'

import Image, { type ImageProps } from 'next/image'
import { sanityImageLoader } from '@/lib/sanity-image-loader'

/**
 * Wraps next/image with a loader that appends Sanity CDN resize params
 * (?w=&fm=webp&q=75&auto=format) so large originals (up to 6240x4160)
 * aren't shipped at full size. Local/static src strings pass through
 * unchanged.
 */
export function SanityImage(props: ImageProps) {
  return <Image {...props} loader={sanityImageLoader} quality={props.quality ?? 75} />
}
