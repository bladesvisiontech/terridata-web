"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

import { ENTRANCE_VIEWPORT } from "@/components/motion/entrance";
import { ECOSYSTEM } from "@/content/home";
import { generateParcels } from "@/lib/parcels";
import { cn } from "@/lib/utils";

/**
 * Pila de capas sobre el territorio.
 *
 * Sustituye al diagrama de órbita, que colocaba las dependencias
 * alrededor de un núcleo como si fueran satélites iguales. El copy
 * dice otra cosa: que **todo se apoya sobre un mismo territorio
 * georreferenciado**. Eso no es una órbita, es un apilado —y es
 * exactamente como trabaja un sistema de información geográfica: capas
 * temáticas sobre una base común.
 *
 * La base lleva el trazado catastral real, generado con el mismo
 * `generateParcels` que dibuja el visor del hero, así que el mapa del
 * fondo y este diagrama hablan el mismo idioma.
 *
 * Proyección isométrica sencilla: cada capa es un rombo, y todas
 * comparten centro en X para que la pila quede a plomo.
 */

/*
 * Ancho ampliado: la etiqueta más larga, «Territorio georreferenciado»,
 * se salía del viewBox y quedaba cortada a la derecha.
 */
const VIEW = { width: 620, height: 470 } as const;

/** Geometría del rombo. Una sola definición para todas las capas. */
const PLANE = { cx: 190, width: 300, height: 132 } as const;
const BASE_Y = 372;
const STEP = 58;

function diamond(cy: number) {
  const { cx, width, height } = PLANE;
  return [
    `${cx},${cy - height / 2}`,
    `${cx + width / 2},${cy}`,
    `${cx},${cy + height / 2}`,
    `${cx - width / 2},${cy}`,
  ].join(" ");
}

export function LayerStack({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  // Predios del plano base. Se recortan al rombo con un `clipPath`.
  const parcels = useMemo(
    () =>
      generateParcels(PLANE.width, PLANE.height, {
        seed: 20260813,
        minArea: 620,
        minSide: 14,
        gap: 2,
      }),
    [],
  );

  const layers = ECOSYSTEM.layers;
  // Se dibuja de abajo arriba para que las capas altas tapen a las bajas.
  const total = layers.length;

  const enter = (index: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          whileInView: { opacity: 1, y: 0 },
          viewport: ENTRANCE_VIEWPORT,
          transition: {
            duration: 0.65,
            delay: 0.15 + index * 0.11,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  return (
    <svg
      viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label={`Diagrama: sobre una base de ${ECOSYSTEM.base.name.toLowerCase()} se apilan las capas de ${layers.map((l) => l.name).join(", ")}.`}
    >
      <defs>
        <clipPath id="capa-base">
          <polygon points={diamond(BASE_Y)} />
        </clipPath>
        <linearGradient id="brillo-capa" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-green-200)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-green-500)" stopOpacity="0.28" />
        </linearGradient>
      </defs>

      {/* --- Eje vertical: la columna de datos que atraviesa la pila --- */}
      <motion.line
        x1={PLANE.cx}
        y1={BASE_Y}
        x2={PLANE.cx}
        y2={BASE_Y - STEP * total}
        stroke="var(--color-green-500)"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        initial={reduceMotion ? undefined : { pathLength: 0 }}
        whileInView={reduceMotion ? undefined : { pathLength: 1 }}
        viewport={ENTRANCE_VIEWPORT}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* --- Base: el territorio, con su trazado predial --- */}
      <motion.g {...enter(0)}>
        <polygon
          points={diamond(BASE_Y)}
          fill="var(--color-green-800)"
          stroke="var(--color-green-900)"
          strokeWidth="1.5"
        />
        <g clipPath="url(#capa-base)" opacity="0.55">
          {parcels.map((parcel) => (
            <rect
              key={parcel.id}
              x={PLANE.cx - PLANE.width / 2 + parcel.x}
              y={BASE_Y - PLANE.height / 2 + parcel.y}
              width={parcel.width}
              height={parcel.height}
              fill="none"
              stroke="var(--color-green-300)"
              strokeOpacity="0.5"
              strokeWidth="0.6"
            />
          ))}
        </g>
      </motion.g>

      {/* --- Capas temáticas, de abajo arriba --- */}
      {layers
        .slice()
        .reverse()
        .map((layer, reversedIndex) => {
          const level = reversedIndex + 1;
          const cy = BASE_Y - STEP * level;
          const labelY = cy - 2;

          return (
            <motion.g key={layer.name} {...enter(level)}>
              <polygon
                points={diamond(cy)}
                fill="url(#brillo-capa)"
                stroke="var(--color-green-600)"
                strokeOpacity="0.7"
                strokeWidth="1.25"
              />
              {/* Nodo en el vértice derecho, de donde sale la guía. */}
              <circle
                cx={PLANE.cx + PLANE.width / 2}
                cy={cy}
                r="3.5"
                fill="var(--color-green-600)"
              />
              <line
                x1={PLANE.cx + PLANE.width / 2 + 6}
                y1={cy}
                x2={PLANE.cx + PLANE.width / 2 + 26}
                y2={cy}
                stroke="var(--color-green-600)"
                strokeOpacity="0.45"
                strokeWidth="1"
              />
              <text
                x={PLANE.cx + PLANE.width / 2 + 34}
                y={labelY}
                fill="var(--color-ink)"
                fontSize="13"
                fontWeight="700"
                className="font-sans"
              >
                {layer.name}
              </text>
              <text
                x={PLANE.cx + PLANE.width / 2 + 34}
                y={labelY + 15}
                fill="var(--color-ink-500)"
                fontSize="10"
                className="font-sans"
              >
                {layer.detail}
              </text>
            </motion.g>
          );
        })}

      {/* --- Rótulo de la base --- */}
      <motion.g {...enter(total + 1)}>
        <line
          x1={PLANE.cx + PLANE.width / 2 + 6}
          y1={BASE_Y}
          x2={PLANE.cx + PLANE.width / 2 + 26}
          y2={BASE_Y}
          stroke="var(--color-green-700)"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <text
          x={PLANE.cx + PLANE.width / 2 + 34}
          y={BASE_Y - 2}
          fill="var(--color-green-800)"
          fontSize="13"
          fontWeight="800"
          className="font-sans"
        >
          {ECOSYSTEM.base.name}
        </text>
        <text
          x={PLANE.cx + PLANE.width / 2 + 34}
          y={BASE_Y + 15}
          fill="var(--color-ink-500)"
          fontSize="10"
          className="font-sans"
        >
          La base común
        </text>
      </motion.g>
    </svg>
  );
}
