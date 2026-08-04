import type { Variants } from "framer-motion";

/**
 * Configuración compartida de las entradas.
 *
 * Tres reglas que sostienen todo este módulo:
 *
 * 1. **Quien observa el viewport nunca se transforma.** Un titular
 *    desplazado dentro de un `overflow-hidden`, o una regla en
 *    `scaleX(0)`, tiene área visible cero: el navegador no lo da
 *    nunca por dentro del viewport y se queda invisible para
 *    siempre. Por eso el envoltorio observa y el hijo anima.
 *
 * 2. **Umbral cero y viewport completo.** Nada de márgenes
 *    negativos: recortar el viewport crea una franja donde un
 *    elemento está a la vista y no ha disparado.
 *
 * 3. **Lo que ya está en pantalla al cargar anima al montar.** En la
 *    primera carga no ha habido scroll; el hero no puede esperar a
 *    "entrar" en vista.
 */
export const ENTRANCE_VIEWPORT = { once: true, amount: 0 } as const;

export type EntranceTrigger = "mount" | "scroll";

export function entranceTriggerProps(trigger: EntranceTrigger) {
  return trigger === "mount"
    ? { initial: "hidden" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: ENTRANCE_VIEWPORT,
      };
}

/** El envoltorio observa y orquesta, pero no se mueve. */
export const ORCHESTRATOR: Variants = {
  hidden: {},
  visible: {},
};

export const DURATION = {
  base: 0.62,
  slow: 0.85,
} as const;

/** Curva única del sitio. Coincide con --ease-entrance en tokens.css. */
export const EASE_ENTRANCE = [0.16, 1, 0.3, 1] as const;
