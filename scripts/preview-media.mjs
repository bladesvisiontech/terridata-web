/**
 * Elección deliberada de fotografía.
 *
 *   node scripts/preview-media.mjs "consulta"              → hoja de contactos
 *   node scripts/preview-media.mjs "consulta" clave índice → fija el elegido
 *
 * La búsqueda automática de `fetch-media.mjs` acierta con los conceptos
 * concretos (una vista aérea, un mercado) y falla con los abstractos: para
 * «información dispersa» devolvía lápices sueltos y libros en primer plano.
 * Ahí hace falta mirar los candidatos y escoger.
 *
 * Lo elegido se fija en media.lock.json, así que `npm run media` lo respeta.
 */
import { execFile } from 'node:child_process'
import { mkdir, readFile, rename, stat, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

import { PHOTO_MAX_WIDTH } from './media-plan.mjs'

const run = promisify(execFile)
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = process.env.PREVIEW_DIR || '/tmp'

const [query, targetKey, index] = process.argv.slice(2)

const env = await readFile(join(ROOT, '.env.local'), 'utf8')
const apiKey = env.match(/^\s*PEXELS_API_KEY\s*=\s*(.+)$/m)[1].trim()

const response = await fetch(
  `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=12&orientation=landscape&size=large`,
  { headers: { Authorization: apiKey } },
)
const { photos } = await response.json()

async function save(url, path) {
  const res = await fetch(url)
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, Buffer.from(await res.arrayBuffer()))
}

// --- modo elección -----------------------------------------------------------
if (targetKey && index !== undefined) {
  const photo = photos[Number(index)]
  if (!photo) throw new Error(`No hay candidato ${index}`)

  const file = join(ROOT, 'public', 'media', `${targetKey}.jpg`)
  const width = Math.min(photo.width, PHOTO_MAX_WIDTH)
  await save(`${photo.src.original}?auto=compress&cs=tinysrgb&w=${width}`, file)

  const tmp = `${file}.tmp.jpg`
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', file,
    '-vf', `scale='min(${PHOTO_MAX_WIDTH},iw)':-2`, '-q:v', '4', tmp])
  await rename(tmp, file)

  const { stdout } = await run('ffprobe', ['-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height', '-of', 'csv=p=0', file])
  const [w, h] = stdout.trim().split(',').map(Number)

  const lockPath = join(ROOT, 'media.lock.json')
  const lock = JSON.parse(await readFile(lockPath, 'utf8').catch(() => '{}'))
  lock[targetKey] = {
    src: `/media/${targetKey}.jpg`,
    width: w, height: h,
    photographer: photo.photographer,
    sourceUrl: photo.url,
    provider: 'pexels',
  }
  await writeFile(lockPath, `${JSON.stringify(lock, null, 2)}\n`)

  const bytes = (await stat(file)).size
  console.log(`✓ ${targetKey}  ${w}×${h}  ${(bytes / 1024).toFixed(0)} kB  ${photo.photographer}`)
} else {
  // --- modo hoja de contactos ------------------------------------------------
  const rows = []
  for (const [i, p] of photos.entries()) {
    await save(`${p.src.original}?auto=compress&cs=tinysrgb&w=520`, join(OUT, 'cand', `${i}.jpg`))
    rows.push(`${i}\t${p.photographer}`)
  }
  console.log(rows.join('\n'))
}
