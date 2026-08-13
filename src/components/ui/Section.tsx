import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "paper" | "cream" | "deep";
  spacing?: "default" | "tight" | "none";
  /**
   * Bisel del bloque. `diag` corta arriba-izquierda y abajo-derecha;
   * `top` corta las dos esquinas superiores. Se usa en las secciones
   * de color macizo, que son las que cierran un tramo.
   */
  notch?: "none" | "diag" | "top";
  /**
   * Superficie técnica de fondo. `dots` es la matriz de puntos,
   * `glow` los halos de verde, `both` las dos.
   *
   * Se reserva para los bloques de apertura: puesta en todas las
   * secciones deja de ser un acento y se convierte en ruido.
   */
  backdrop?: "none" | "dots" | "glow" | "both";
};

const TONE_CLASS = {
  // Transparente a propósito: deja ver el degradado del body.
  paper: "text-ink",
  cream: "bg-cream-200 text-ink",
  deep: "bg-green-900 text-cream-50",
} as const;

const SPACING_CLASS = {
  default: "py-(--spacing-section)",
  tight: "py-(--spacing-section-tight)",
  none: "",
} as const;

export function Section({
  children,
  className,
  id,
  tone = "paper",
  spacing = "default",
  notch = "none",
  backdrop = "none",
}: SectionProps) {
  const showGlow = backdrop === "glow" || backdrop === "both";
  const showDots = backdrop === "dots" || backdrop === "both";

  return (
    <section
      id={id}
      className={cn(
        "relative isolate",
        // `overflow-clip` recorta igual que `overflow-hidden` pero no
        // crea contenedor de scroll, así que no anula `position: sticky`
        // en los hijos.
        "overflow-clip",
        notch === "diag" && "notch-diag",
        notch === "top" && "notch-top",
        TONE_CLASS[tone],
        SPACING_CLASS[spacing],
        className,
      )}
    >
      {/* Los halos van debajo de los puntos: primero la profundidad,
          después la trama encima. */}
      {showGlow ? (
        <div aria-hidden className="tech-glow pointer-events-none absolute inset-0 -z-20" />
      ) : null}
      {showDots ? (
        <div
          aria-hidden
          className="tech-dots tech-fade pointer-events-none absolute inset-0 -z-10"
        />
      ) : null}
      {children}
    </section>
  );
}
