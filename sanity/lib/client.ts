import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // The Studio is the source of truth for this site. Fetch published edits directly
  // so additions and deletions appear immediately instead of waiting for CDN caching.
  useCdn: false,
})
