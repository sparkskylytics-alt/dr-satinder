import type { ImageLoaderProps } from 'next/image'

const SANITY_CDN_HOST = 'cdn.sanity.io'

export function isSanityImageUrl(src: string) {
  return src.includes(SANITY_CDN_HOST)
}

export function sanityImageLoader({ src, width, quality }: ImageLoaderProps) {
  if (!isSanityImageUrl(src)) return src
  const url = new URL(src)
  url.searchParams.set('w', String(width))
  url.searchParams.set('fm', 'webp')
  url.searchParams.set('q', String(quality ?? 75))
  url.searchParams.set('auto', 'format')
  return url.toString()
}
