"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

import { generateParcels } from "@/lib/parcels";
import { cn } from "@/lib/utils";

/**
 * ⚠️ PROVISIONAL — ilustración, no una captura de la plataforma.
 *
 * Representa lo que hace el Visor Geográfico: una manzana catastral
 * donde cada predio es consultable y uno está seleccionado. Se
 * sustituye por capturas reales cuando el cliente las entregue.
 *
 * Va en SVG en vez de imagen porque escala sin pesar, se anima con
 * `transform`/`opacity` y se lee nítida en cualquier densidad de
 * pantalla.
 */

/** Formato apaisado: el visor ocupa el ancho completo del hero. */
const VIEWBOX = { width: 960, height: 400 } as const;

/** Índice del predio destacado dentro del trazado generado. */
const HIGHLIGHTED_INDEX = 11;

export function CadastralMap({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const parcels = useMemo(
    () =>
      generateParcels(VIEWBOX.width, VIEWBOX.height, {
        seed: 20260804,
        minArea: 5200,
        minSide: 38,
        gap: 3,
      }),
    [],
  );

  const highlighted = parcels[HIGHLIGHTED_INDEX % parcels.length];

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Representación de una manzana catastral con un predio seleccionado y su ficha de información"
    >
      <defs>
        <linearGradient id="parcel-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-green-500)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-green-700)" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* Predios en trazo. Entran escalonados, como si el mapa se
          dibujara capa por capa. */}
      <g>
        {parcels.map((parcel, index) => {
          const isHighlighted = index === HIGHLIGHTED_INDEX % parcels.length;

          return (
            <motion.rect
              key={parcel.id}
              x={parcel.x}
              y={parcel.y}
              width={parcel.width}
              height={parcel.height}
              rx={1.5}
              fill={isHighlighted ? "url(#parcel-fill)" : "var(--color-green-500)"}
              fillOpacity={isHighlighted ? 1 : 0.06}
              stroke="var(--color-green-700)"
              strokeOpacity={isHighlighted ? 0 : 0.3}
              strokeWidth={1.2}
              initial={reduceMotion ? undefined : { opacity: 0 }}
              animate={reduceMotion ? undefined : { opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.25 + index * 0.02,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ willChange: "opacity" }}
            />
          );
        })}
      </g>

      {/* Trama fina de fondo, como el papel milimetrado de un plano. */}
      <g stroke="var(--color-ink)" strokeOpacity="0.05" strokeWidth="0.6">
        {Array.from({ length: Math.floor(VIEWBOX.width / 32) }, (_, i) => (
          <line key={`v${i}`} x1={i * 32} y1={0} x2={i * 32} y2={VIEWBOX.height} />
        ))}
        {Array.from({ length: Math.floor(VIEWBOX.height / 32) }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 32} x2={VIEWBOX.width} y2={i * 32} />
        ))}
      </g>

      {/* Retícula de selección sobre el predio destacado. */}
      {highlighted ? (
        <motion.g
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformOrigin: `${highlighted.x + highlighted.width / 2}px ${
              highlighted.y + highlighted.height / 2
            }px`,
          }}
        >
          <rect
            x={highlighted.x - 7}
            y={highlighted.y - 7}
            width={highlighted.width + 14}
            height={highlighted.height + 14}
            fill="none"
            stroke="var(--color-green-800)"
            strokeWidth="2"
            strokeDasharray="8 5"
          />
          {/* Manijas en las cuatro esquinas. */}
          {[
            [highlighted.x - 7, highlighted.y - 7],
            [highlighted.x + highlighted.width + 7, highlighted.y - 7],
            [highlighted.x - 7, highlighted.y + highlighted.height + 7],
            [
              highlighted.x + highlighted.width + 7,
              highlighted.y + highlighted.height + 7,
            ],
          ].map(([cx, cy]) => (
            <rect
              key={`${cx}-${cy}`}
              x={cx - 3.5}
              y={cy - 3.5}
              width={7}
              height={7}
              fill="var(--color-cream-50)"
              stroke="var(--color-green-800)"
              strokeWidth="1.75"
            />
          ))}
        </motion.g>
      ) : null}
    </svg>
  );
}
