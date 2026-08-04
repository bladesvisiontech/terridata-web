/**
 * Generador determinista de manzanas catastrales.
 *
 * Subdivide un rectángulo de forma recursiva, alternando cortes
 * verticales y horizontales, hasta que cada pieza queda por debajo
 * del área mínima. El resultado se parece a una manzana real: predios
 * de distinto tamaño con frentes irregulares.
 *
 * La semilla es fija a propósito. El servidor y el cliente tienen que
 * producir exactamente el mismo trazado o React marca un error de
 * hidratación.
 */

export type Parcel = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

/** PRNG mulberry32: barato, determinista y suficiente para esto. */
function createRandom(seed: number) {
  let state = seed;
  return function random() {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type SubdivideOptions = {
  seed?: number;
  minArea?: number;
  minSide?: number;
  /** Separación entre predios, como una servidumbre. */
  gap?: number;
};

export function generateParcels(
  width: number,
  height: number,
  { seed = 20260804, minArea = 900, minSide = 22, gap = 1.5 }: SubdivideOptions = {},
): Parcel[] {
  const random = createRandom(seed);
  const parcels: Parcel[] = [];
  let counter = 0;

  function subdivide(x: number, y: number, w: number, h: number, depth: number) {
    const smallEnough = w * h < minArea || depth > 5;

    if (smallEnough || w < minSide * 2 || h < minSide * 2) {
      parcels.push({
        id: `parcel-${counter++}`,
        x: x + gap / 2,
        y: y + gap / 2,
        width: Math.max(w - gap, 1),
        height: Math.max(h - gap, 1),
      });
      return;
    }

    // Corta por el lado largo para evitar predios en astilla.
    const cutVertically = w > h;
    // Entre 35 % y 65 %: nunca por la mitad exacta, nunca en el borde.
    const ratio = 0.35 + random() * 0.3;

    if (cutVertically) {
      const left = w * ratio;
      subdivide(x, y, left, h, depth + 1);
      subdivide(x + left, y, w - left, h, depth + 1);
    } else {
      const top = h * ratio;
      subdivide(x, y, w, top, depth + 1);
      subdivide(x, y + top, w, h - top, depth + 1);
    }
  }

  subdivide(0, 0, width, height, 0);
  return parcels;
}
