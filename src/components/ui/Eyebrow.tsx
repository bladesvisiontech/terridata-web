import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: string;
  className?: string;
  tone?: "default" | "inverse";
};

/**
 * Epígrafe monoespaciado con marca de sección.
 *
 * El cuadrado sólido de la izquierda es el mismo signo que se repite
 * en índices y leyendas: la unidad mínima de la retícula catastral.
 */
export function Eyebrow({ children, className, tone = "default" }: EyebrowProps) {
  return (
    <p
      className={cn(
        "eyebrow inline-flex items-center gap-2.5",
        tone === "inverse" ? "text-cream-200" : "text-green-800",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5",
          tone === "inverse" ? "bg-cream-300" : "bg-green-500",
        )}
      />
      {children}
    </p>
  );
}
