import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Superficie técnica continua sobre varias secciones.
 *
 * Envuelve un tramo de la página en **una sola** capa de puntos y
 * halos. Puesta sección por sección, cada bloque repetiría sus propios
 * halos y dejaría una costura visible en cada frontera —el mismo
 * problema que obligó a llevar el degradado de fondo al `body`—.
 *
 * Las secciones que queden dentro tienen que ir en `tone="paper"`, que
 * es transparente: un tono con color macizo taparía la superficie.
 */
export function TechSurface({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative isolate", className)}>
      {/* Primero la profundidad, después la trama encima. */}
      <div aria-hidden className="tech-glow pointer-events-none absolute inset-0 -z-20" />
      <div
        aria-hidden
        className="tech-dots tech-fade pointer-events-none absolute inset-0 -z-10"
      />
      {children}
    </div>
  );
}
