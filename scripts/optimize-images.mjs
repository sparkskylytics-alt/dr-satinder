import { mkdir, readdir, stat } from 'node:fs/promises'
import { dirname, join, relative } from 'node:path'
import sharp from 'sharp'

const publicDir = join(process.cwd(), 'public')
const supported = new Set(['.jpg', '.jpeg'])

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? filesIn(path) : [path]
  }))
  return files.flat()
}

const files = (await filesIn(publicDir)).filter((file) => supported.has(file.slice(file.lastIndexOf('.')).toLowerCase()))
let saved = 0

for (const file of files) {
  const before = (await stat(file)).size
  const output = join(publicDir, 'optimized', relative(publicDir, file)).replace(/\.jpe?g$/i, '.webp')
  await mkdir(dirname(output), { recursive: true })
  await sharp(file).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 76 }).toFile(output)
  saved += before - (await stat(output)).size
}

console.log(`Optimized ${files.length} JPEGs and saved ${(saved / 1024 / 1024).toFixed(1)} MB.`)
