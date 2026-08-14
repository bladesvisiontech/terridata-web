import { RATE_LIMIT } from "@/lib/constants";

/**
 * Limitador de tasa en memoria del proceso. En una instancia serverless
 * es un "mejor esfuerzo" (cada instancia fría tiene su propio mapa),
 * pero cubre el caso real que le preocupa a este formulario: un mismo
 * visitante reenviando el formulario en bucle desde una instancia
 * caliente.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT.windowMs;
  const recent = (hits.get(key) ?? []).filter((timestamp) => timestamp > windowStart);

  if (recent.length >= RATE_LIMIT.maxRequests) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);
  return false;
}
