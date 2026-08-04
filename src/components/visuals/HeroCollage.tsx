import { ArrowUpRight, BadgeCheck, MapPin } from "lucide-react";
import Link from "next/link";

import { BrandImage } from "@/components/ui/BrandImage";
import { HERO_COLLAGE } from "@/content/home";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Mosaico de apertura.
 *
 * Tres fotografías de distinto tamaño con fichas de datos encima, en
 * vez de una sola imagen grande. La foto sola dice «territorio»; la
 * ficha encima dice «territorio con información asociada», que es de
 * lo que va el producto.
 *
 * Los datos de las fichas son ilustrativos y así se declara en el
 * contenido. Ninguna se presenta como una captura de la plataforma.
 */
export function HeroCollage({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {/* --- Columna izquierda --- */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <BrandImage
            media="heroTerritorio"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
            className="notch-br aspect-[4/3] rounded-2xl"
          />
          {/* Ficha del predio, anclada abajo a la izquierda. */}
          <div className="data-chip notch-br absolute bottom-3 left-3 right-3 rounded-xl p-3 sm:right-auto sm:max-w-[13.5rem]">
            <p className="flex items-center gap-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-green-800">
              <MapPin aria-hidden strokeWidth={2} className="size-3" />
              {HERO_COLLAGE.parcel.label}
            </p>
            <p
              className="mt-1.5 font-mono text-[0.6875rem] leading-tight text-ink"
              data-tabular
            >
              {HERO_COLLAGE.parcel.code}
            </p>
            <p className="mt-2 text-[1.0625rem] font-extrabold tracking-tight text-ink" data-tabular>
              {HERO_COLLAGE.parcel.value}
            </p>
          </div>
        </div>

        <BrandImage
          media="tramaUrbana"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          className="notch-tr aspect-[2/1] rounded-2xl"
        />
      </div>

      {/* --- Columna derecha --- */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <BrandImage
            media="ciudadanoDigital"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
            className="notch-bl aspect-square rounded-2xl"
          />
          <div className="data-chip absolute bottom-3 left-3 right-3 rounded-xl p-3">
            <p className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-ink">
              <BadgeCheck aria-hidden strokeWidth={2} className="size-3.5 text-green-600" />
              {HERO_COLLAGE.procedure.title}
            </p>
            <p className="mt-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.1em] text-ink-500">
              {HERO_COLLAGE.procedure.detail}
            </p>
          </div>
        </div>

        {/* Baldosa de marca: cierra el mosaico y lleva al ecosistema. */}
        <Link
          href={ROUTES.productos}
          className={cn(
            "notch-tr group relative flex flex-1 flex-col justify-between gap-6",
            "rounded-2xl bg-green-800 p-5",
            "transition-colors duration-(--duration-base) hover:bg-green-700",
          )}
        >
          <span className="text-[1.0625rem] font-bold leading-snug text-cream-50">
            {HERO_COLLAGE.tile.title}
          </span>
          <span className="flex items-center justify-between">
            <span className="eyebrow text-cream-300">{HERO_COLLAGE.tile.action}</span>
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-cream-50/15 text-cream-50 transition-transform duration-(--duration-base) group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <ArrowUpRight aria-hidden strokeWidth={2} className="size-4" />
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}
