import Image from "next/image";

import { MEDIA, type MediaKey } from "@/content/media";
import { cn } from "@/lib/utils";

/**
 * Fotografía con el tratamiento de la marca.
 *
 * Las fotos vienen de autores distintos, con dominantes de color y
 * saturaciones que no tienen nada que ver entre sí. Sin un tratamiento
 * común, una página con doce fotos parece un tablero de recortes.
 *
 * El tratamiento son dos capas sobre la imagen: verde en `multiply`
 * para llevar las sombras al verde de marca, y crema en `soft-light`
 * para calentar las luces. Es el mismo duotono del deck institucional,
 * atenuado para que la foto siga leyéndose.
 *
 * `sizes` es obligatorio en las imágenes con `fill`: sin él Next sirve
 * la variante de 3840 px a un teléfono.
 */

type Treatment = "duotone" | "tint" | "none";

const TREATMENT_FILTER: Record<Treatment, string> = {
  duotone: "saturate(0.55) contrast(1.06)",
  tint: "saturate(0.88) contrast(1.02)",
  none: "none",
};

type BrandImageProps = {
  media: MediaKey;
  className?: string;
  /** Se pasa a `sizes`. Ajustar al ancho real que ocupa la imagen. */
  sizes?: string;
  treatment?: Treatment;
  priority?: boolean;
  /** Sobrescribe el alt del plan cuando el contexto pide otro. */
  alt?: string;
  /** Oscurece la imagen para que un texto encima cumpla contraste. */
  scrim?: "none" | "bottom" | "full";
};

export function BrandImage({
  media,
  className,
  sizes = "100vw",
  treatment = "tint",
  priority = false,
  alt,
  scrim = "none",
}: BrandImageProps) {
  const entry = MEDIA[media];

  return (
    <span className={cn("relative block overflow-hidden", className)}>
      <Image
        src={entry.src}
        alt={alt ?? entry.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ filter: TREATMENT_FILTER[treatment] }}
      />

      {treatment !== "none" ? (
        <>
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 mix-blend-multiply",
              treatment === "duotone" ? "bg-green-800/45" : "bg-green-900/12",
            )}
          />
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 mix-blend-soft-light",
              treatment === "duotone" ? "bg-cream-200/45" : "bg-cream-200/25",
            )}
          />
        </>
      ) : null}

      {scrim !== "none" ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0",
            scrim === "bottom"
              ? "bg-gradient-to-t from-green-900/85 via-green-900/35 to-transparent"
              : "bg-green-900/70",
          )}
        />
      ) : null}
    </span>
  );
}
