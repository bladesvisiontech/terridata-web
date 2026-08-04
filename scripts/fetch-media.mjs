/**
 * Descarga los medios del sitio y genera el mapa tipado que consumen los
 * componentes.
 *
 * Uso:  npm run media              — descarga lo que falte
 *       npm run media -- --force   — vuelve a resolver y descargar todo
 *
 * Proveedor: usa Unsplash si existe UNSPLASH_ACCESS_KEY; si no, Pexels.
 * Ambos entregan fotografía libre de regalías apta para uso comercial.
 *
 * La clave solo se usa aquí, en tiempo de construcción de activos: nunca llega
 * al bundle ni al runtime, por eso no pasa por `src/lib/env.ts`.
 *
 * Las elecciones se fijan en `media.lock.json` para que dos ejecuciones no
 * devuelvan fotos distintas y el diseño no cambie solo.
 */

import { execFile } from "node:child_process";
import { createWriteStream } from "node:fs";
import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { PHOTOS, PHOTO_MAX_WIDTH } from "./media-plan.mjs";

const run = promisify(execFile);

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MEDIA_DIR = join(ROOT, "public", "media");
const LOCK_PATH = join(ROOT, "media.lock.json");
const OUTPUT_TS = join(ROOT, "src", "content", "media.ts");
const CREDITS_PATH = join(MEDIA_DIR, "CREDITS.md");

const force = process.argv.includes("--force");

/**
 * Sustituto para las claves que no se resuelvan. Garantiza que `media.ts`
 * siempre exponga todas las claves del plan, de modo que el proyecto compile
 * aunque una consulta se quede sin resultados.
 */
const PLACEHOLDER = {
  src: "/media/placeholder.svg",
  width: 1600,
  height: 1000,
  photographer: "—",
  sourceUrl: "—",
  provider: "—",
};

// --- claves ------------------------------------------------------------------

async function readEnv(name) {
  if (process.env[name]) return process.env[name];
  try {
    const env = await readFile(join(ROOT, ".env.local"), "utf8");
    const match = env.match(new RegExp(`^\\s*${name}\\s*=\\s*(.+)$`, "m"));
    if (match) return match[1].trim().replace(/^["']|["']$/g, "");
  } catch {
    // .env.local puede no existir todavía.
  }
  return null;
}

async function resolveProvider() {
  const unsplash = await readEnv("UNSPLASH_ACCESS_KEY");
  if (unsplash) return { name: "unsplash", key: unsplash };

  const pexels = await readEnv("PEXELS_API_KEY");
  if (pexels) return { name: "pexels", key: pexels };

  throw new Error(
    "Falta la clave del proveedor de imágenes.\n" +
      "  Unsplash (preferido): https://unsplash.com/developers\n" +
      "    .env.local →  UNSPLASH_ACCESS_KEY=tu_key\n" +
      "  Pexels (alternativa): https://www.pexels.com/api/\n" +
      "    .env.local →  PEXELS_API_KEY=tu_key\n",
  );
}

// --- proveedores -------------------------------------------------------------

/** Normaliza la respuesta de cada API a una forma común. */
async function search(provider, query) {
  if (provider.name === "unsplash") {
    const url =
      "https://api.unsplash.com/search/photos" +
      `?query=${encodeURIComponent(query)}&per_page=20&orientation=landscape`;
    const response = await fetch(url, {
      headers: { Authorization: `Client-ID ${provider.key}` },
    });
    if (response.status === 401)
      throw new Error("Unsplash rechazó la key (401). Revisa que esté completa.");
    if (response.status === 403)
      throw new Error("Unsplash devolvió 403: cuota agotada. Espera una hora.");
    if (!response.ok) throw new Error(`Unsplash respondió ${response.status}`);

    const data = await response.json();
    return (data.results ?? []).map((photo) => ({
      width: photo.width,
      height: photo.height,
      photographer: photo.user?.name ?? "—",
      sourceUrl: photo.links?.html ?? "—",
      // `raw` admite parámetros de recorte y escala del propio CDN.
      downloadUrl: (w) => `${photo.urls.raw}&w=${w}&q=80&fm=jpg&fit=max`,
    }));
  }

  const url =
    "https://api.pexels.com/v1/search" +
    `?query=${encodeURIComponent(query)}&per_page=20&orientation=landscape&size=large`;
  const response = await fetch(url, { headers: { Authorization: provider.key } });
  if (response.status === 401)
    throw new Error("Pexels rechazó la key (401). Revisa que esté completa.");
  if (response.status === 429)
    throw new Error("Pexels devolvió 429: cuota agotada. Espera una hora.");
  if (!response.ok) throw new Error(`Pexels respondió ${response.status}`);

  const data = await response.json();
  return (data.photos ?? []).map((photo) => ({
    width: photo.width,
    height: photo.height,
    photographer: photo.photographer ?? "—",
    sourceUrl: photo.url ?? "—",
    downloadUrl: (w) => `${photo.src.original}?auto=compress&cs=tinysrgb&w=${w}`,
  }));
}

/** Prefiere apaisadas y de buena resolución; descarta verticales. */
function pickPhoto(results) {
  const landscape = results.filter((photo) => photo.width > photo.height * 1.2);
  const pool = landscape.length > 0 ? landscape : results;
  return pool.sort((a, b) => b.width - a.width)[0];
}

// --- descarga ----------------------------------------------------------------

async function download(url, destination) {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`No se pudo descargar (${response.status}) ${url.slice(0, 80)}`);

  await mkdir(dirname(destination), { recursive: true });
  await pipeline(Readable.fromWeb(response.body), createWriteStream(destination));
  return (await stat(destination)).size;
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Recomprime la foto en el sitio. Los originales llegan con muy poca
 * compresión —alguno supera los 5 MB—, peso que no tiene sentido versionar ni
 * subir al despliegue.
 */
async function optimize(path) {
  const temporary = `${path}.tmp.jpg`;
  await run("ffmpeg", [
    "-y",
    "-loglevel",
    "error",
    "-i",
    path,
    "-vf",
    `scale='min(${PHOTO_MAX_WIDTH},iw)':-2`,
    "-q:v",
    "4",
    temporary,
  ]);
  await rename(temporary, path);
  return (await stat(path)).size;
}

/** Lee el tamaño real del archivo ya procesado, no el que prometía la API. */
async function realDimensions(path) {
  const { stdout } = await run("ffprobe", [
    "-v",
    "error",
    "-select_streams",
    "v:0",
    "-show_entries",
    "stream=width,height",
    "-of",
    "csv=p=0",
    path,
  ]);
  const [width, height] = stdout.trim().split(",").map(Number);
  return { width, height };
}

// --- ejecución ---------------------------------------------------------------

async function main() {
  const provider = await resolveProvider();
  console.log(`Proveedor: ${provider.name}`);

  const lock = force
    ? {}
    : JSON.parse(await readFile(LOCK_PATH, "utf8").catch(() => "{}"));

  const entries = [];
  const credits = [];

  for (const photo of PHOTOS) {
    const file = join(MEDIA_DIR, `${photo.key}.jpg`);
    let record = lock[photo.key];

    if (!record || !(await exists(file))) {
      const results = await search(provider, photo.query);
      const chosen = pickPhoto(results);

      if (!chosen) {
        console.warn(`  · sin resultados para "${photo.query}" (${photo.key})`);
        entries.push({ ...photo, ...PLACEHOLDER });
        continue;
      }

      const width = Math.min(chosen.width, PHOTO_MAX_WIDTH);
      await download(chosen.downloadUrl(width), file);
      const bytes = await optimize(file);
      const size = await realDimensions(file);

      record = {
        src: `/media/${photo.key}.jpg`,
        width: size.width,
        height: size.height,
        photographer: chosen.photographer,
        sourceUrl: chosen.sourceUrl,
        provider: provider.name,
      };
      lock[photo.key] = record;
      console.log(
        `  ✓ ${photo.key.padEnd(20)} ${size.width}×${size.height}  ${(bytes / 1024).toFixed(0)} kB  ${record.photographer}`,
      );
    } else {
      console.log(`  · ${photo.key.padEnd(20)} ya descargada`);
    }

    entries.push({ ...photo, ...record });
    credits.push(`- **${photo.key}** — ${record.photographer} (${record.provider}) · ${record.sourceUrl}`);
  }

  await writeFile(LOCK_PATH, `${JSON.stringify(lock, null, 2)}\n`);

  const body = entries
    .map(
      (entry) => `  ${entry.key}: {
    src: ${JSON.stringify(entry.src)},
    width: ${entry.width},
    height: ${entry.height},
    alt: ${JSON.stringify(entry.alt)},
    photographer: ${JSON.stringify(entry.photographer)},
  },`,
    )
    .join("\n");

  await writeFile(
    OUTPUT_TS,
    `/**
 * GENERADO POR scripts/fetch-media.mjs — no editar a mano.
 *
 * Se regenera con \`npm run media\`. Las elecciones están fijadas en
 * media.lock.json; para cambiar una foto, borra su entrada de ahí y
 * vuelve a ejecutar.
 */

export type MediaEntry = {
  src: string;
  width: number;
  height: number;
  alt: string;
  photographer: string;
};

export const MEDIA = {
${body}
} as const satisfies Record<string, MediaEntry>;

export type MediaKey = keyof typeof MEDIA;
`,
  );

  await writeFile(
    CREDITS_PATH,
    `# Créditos de las imágenes\n\nFotografía libre de regalías, apta para uso comercial.\nGenerado por \`scripts/fetch-media.mjs\`.\n\n${credits.join("\n")}\n`,
  );

  console.log(`\n${entries.length} imágenes · src/content/media.ts actualizado`);
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exit(1);
});
