"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Search } from "lucide-react";

import { CadastralMap } from "@/components/visuals/CadastralMap";
import { cn } from "@/lib/utils";

/**
 * ⚠️ PROVISIONAL — ilustración del producto, no una captura real.
 *
 * Muestra el gesto central de la plataforma: se elige un predio en el
 * mapa y su información aparece al lado, sin cambiar de sistema.
 *
 * Se reemplaza por capturas reales del Visor cuando lleguen. Las
 * dimensiones del marco ya están fijadas para que el reemplazo no
 * mueva el layout.
 */

/** Capas del panel lateral. Las activas coinciden con el mapa. */
const LAYERS = [
  { name: "Predial", active: true },
  { name: "Zonas homogéneas", active: true },
  { name: "Ordenamiento", active: false },
  { name: "Áreas protegidas", active: false },
  { name: "Cuencas", active: false },
] as const;

/** Ficha del predio seleccionado. Datos ilustrativos. */
const PARCEL_RECORD = [
  { label: "Número predial", value: "25785000100010001" },
  { label: "Área de terreno", value: "412 m²" },
  { label: "Destino económico", value: "Habitacional" },
  { label: "Estado catastral", value: "Actualizado" },
] as const;

export function PlatformFrame({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  const enter = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-ink/10 bg-cream-50 p-2.5",
        "shadow-[0_28px_70px_-24px_rgba(11,8,17,0.28)]",
        className,
      )}
    >
      {/* Barra del navegador, para situar que es una plataforma web. */}
      <div className="flex items-center gap-2 px-2 pb-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
        </span>
        <span className="ml-1 flex flex-1 items-center gap-1.5 rounded-md bg-ink/[0.04] px-2.5 py-1">
          <Search aria-hidden strokeWidth={2} className="size-3 text-ink-300" />
          <span className="font-mono text-[0.625rem] text-ink-500">
            Visor Geográfico Inteligente
          </span>
        </span>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-[9rem_1fr] lg:grid-cols-[12rem_1fr]">
        {/* Panel de capas */}
        <motion.div
          {...enter(0.5)}
          className="hidden rounded-xl border border-ink/8 bg-cream-100/60 p-4 sm:block"
        >
          <p className="eyebrow text-ink-500">Capas</p>
          <ul className="mt-4 flex flex-col gap-3">
            {LAYERS.map((layer) => (
              <li key={layer.name} className="flex items-start gap-2">
                <span
                  aria-hidden
                  className={cn(
                    "mt-px flex size-3.5 shrink-0 items-center justify-center rounded-[3px] border",
                    layer.active
                      ? "border-green-500 bg-green-500"
                      : "border-ink/25 bg-transparent",
                  )}
                >
                  {layer.active ? (
                    <Check strokeWidth={3.5} className="size-2.5 text-cream-50" />
                  ) : null}
                </span>
                <span
                  className={cn(
                    "text-[0.75rem] leading-tight",
                    layer.active ? "text-ink" : "text-ink-300",
                  )}
                >
                  {layer.name}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Mapa + ficha.
            En móvil el mapa mide unos 140 px de alto: la ficha no cabe
            encima sin taparlo entero, así que baja al flujo normal y
            solo se superpone a partir de `sm`. */}
        <div className="relative rounded-xl border border-ink/8 bg-cream-100/40 sm:overflow-hidden">
          <CadastralMap className="block" />

          <motion.div
            {...enter(1.25)}
            className={cn(
              "m-2.5 rounded-xl border border-ink/10 bg-cream-50/95 p-4",
              "shadow-[0_10px_30px_-10px_rgba(11,8,17,0.25)]",
              "sm:absolute sm:bottom-4 sm:right-4 sm:m-0 sm:w-[min(17rem,78%)]",
              "sm:backdrop-blur-sm",
            )}
          >
            <p className="eyebrow text-green-800">Predio seleccionado</p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {PARCEL_RECORD.map((field) => (
                <div key={field.label} className="flex flex-col">
                  <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.1em] text-ink-300">
                    {field.label}
                  </dt>
                  <dd
                    className="font-mono text-[0.6875rem] leading-tight text-ink"
                    data-tabular
                  >
                    {field.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
