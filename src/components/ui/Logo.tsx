import Image from "next/image";

import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

import logoInverso from "../../../public/brand/logo-inverso.png";
import logo from "../../../public/brand/logo.png";

/**
 * Logo oficial de Terridata.
 *
 * Se importa el PNG en vez de referenciar la ruta como cadena para que
 * Next conozca las dimensiones en tiempo de compilación y reserve el
 * hueco: sin eso la cabecera da un salto al cargar la imagen.
 *
 * La variante inversa es el mismo archivo con la palabra recoloreada a
 * crema. El verde de marca sobre el verde 900 del pie da 1.6:1 y
 * sencillamente no se lee.
 *
 * `priority` porque va en la cabecera: es parte de la primera pantalla
 * y no debe cargarse en diferido.
 */

/** Proporción del archivo recortado: 1782 × 501. */
const RATIO = 1782 / 501;

type LogoProps = {
  className?: string;
  tone?: "default" | "inverse";
  /** Alto en píxeles. El ancho se deduce de la proporción. */
  height?: number;
  showTagline?: boolean;
  priority?: boolean;
};

export function Logo({
  className,
  tone = "default",
  height = 34,
  showTagline = false,
  priority = false,
}: LogoProps) {
  const inverse = tone === "inverse";

  return (
    <span className={cn("inline-flex flex-col", className)}>
      <Image
        src={inverse ? logoInverso : logo}
        alt={`${COMPANY.name} — ${COMPANY.tagline}`}
        height={height}
        width={Math.round(height * RATIO)}
        priority={priority}
        className="h-auto w-auto"
        style={{ height, width: "auto" }}
      />
      {showTagline ? (
        <span
          className={cn(
            "eyebrow mt-2.5",
            inverse ? "text-cream-300" : "text-ink-500",
          )}
        >
          {COMPANY.tagline}
        </span>
      ) : null}
    </span>
  );
}
