import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { readFile } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import { apiVersion, dataset, projectId } from './env'

config({ path: '.env.local' })
const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) throw new Error('SANITY_API_WRITE_TOKEN is required.')

const sourceVideos = [
  ['A closer look at your eyes', '/doctor-video/video-1.mp4'],
  ['Modern diagnostic care', '/doctor-video/video-2.mp4'],
  ['Precision cataract treatment', '/doctor-video/video-3.mp4'],
  ['Care designed around you', '/doctor-video/video-5.mp4'],
  ['Advanced vision technology', '/doctor-video/video-6.mp4'],
]

async function seedVideos() {
  const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })
  const items = await Promise.all(sourceVideos.map(async ([title, videoPath], index) => {
    const file = await readFile(resolve(process.cwd(), 'public', videoPath.slice(1)))
    const asset = await client.assets.upload('file', file, { filename: basename(videoPath), contentType: 'video/mp4' })
    return { _key: `video${index + 1}`, title, videoPath, video: { _type: 'file', asset: { _type: 'reference', _ref: asset._id } } }
  }))

  await client.createOrReplace({
    _id: 'videosSection',
    _type: 'videosSection',
    eyebrow: 'Inside the clinic',
    heading: 'Precision you can see, care you can feel',
    description: 'Swipe or use the arrows to explore.',
    items,
  })
  console.log('Seeded Clinic videos section with uploaded video files.')
}

seedVideos().catch((error) => { console.error('Video seed failed:', error); process.exitCode = 1 })
