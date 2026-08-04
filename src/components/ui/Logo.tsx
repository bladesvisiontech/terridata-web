import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * ⚠️ PROVISIONAL — a la espera del logo vectorial oficial.
 *
 * El isotipo es una manzana catastral: cuatro predios de distinto
 * tamaño dentro de un mismo perímetro. Uno va sólido (el predio
 * consultado) y el resto en trazo, que es exactamente lo que hace el
 * visor al seleccionar un predio.
 *
 * Cuando llegue el SVG oficial, se reemplaza únicamente el contenido
 * de <Isotype>. Las medidas y el espaciado del lockup ya están
 * definidos y no deberían cambiar.
 */

function Isotype({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("size-8 shrink-0", className)}
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.75"
        opacity="0.35"
      />
      <path
        d="M1 12.5h30M12.5 1v30"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.35"
      />
      <rect x="1" y="1" width="11.5" height="11.5" fill="currentColor" />
      <path
        d="M21.5 12.5v19"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.35"
      />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** `inverse` para fondos oscuros. */
  tone?: "default" | "inverse";
  showTagline?: boolean;
};

export function Logo({ className, tone = "default", showTagline = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Isotype className={tone === "inverse" ? "text-cream-200" : "text-green-500"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[1.0625rem] font-extrabold tracking-[-0.02em]",
            tone === "inverse" ? "text-cream-50" : "text-ink",
          )}
        >
          {COMPANY.name}
        </span>
        {showTagline ? (
          <span
            className={cn(
              "eyebrow mt-1.5",
              tone === "inverse" ? "text-cream-300" : "text-ink-500",
            )}
          >
            {COMPANY.tagline}
          </span>
        ) : null}
      </span>
    </span>
  );
}
