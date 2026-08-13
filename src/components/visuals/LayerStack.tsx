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
 * El vestido «instrumento técnico» —marco con esquinas de HUD, retícula
 * de fondo, índices L01…L04 en monoespaciada, coordenadas junto a cada
 * nodo y un pulso que recorre el eje vertical en bucle— no es
 * decoración suelta: son las mismas convenciones que ya usa el resto
 * del sitio (`.eyebrow` en mono, `data-tabular`, el trazado catastral
 * determinista) aplicadas aquí.
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

/** Esquina de HUD: dos segmentos en ángulo recto, como un visor de cámara. */
function CornerBracket({
  x,
  y,
  flipX = false,
  flipY = false,
}: {
  x: number;
  y: number;
  flipX?: boolean;
  flipY?: boolean;
}) {
  const sx = flipX ? -1 : 1;
  const sy = flipY ? -1 : 1;
  const len = 16;
  return (
    <path
      d={`M ${x} ${y + len * sy} L ${x} ${y} L ${x + len * sx} ${y}`}
      fill="none"
      stroke="var(--color-green-500)"
      strokeOpacity="0.55"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  );
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
  const axisTop = BASE_Y - STEP * total;

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

  const margin = 14;

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
        <pattern id="hud-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="var(--color-green-500)"
            strokeOpacity="0.07"
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id="hud-fade" cx="35%" cy="60%" r="75%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="hud-grid-mask">
          <rect width={VIEW.width} height={VIEW.height} fill="url(#hud-fade)" />
        </mask>
      </defs>

      {/* --- Retícula de fondo, como el área de trabajo de un CAD --- */}
      <rect
        width={VIEW.width}
        height={VIEW.height}
        fill="url(#hud-grid)"
        mask="url(#hud-grid-mask)"
      />

      {/* --- Marco con esquinas de HUD --- */}
      <CornerBracket x={margin} y={margin} />
      <CornerBracket x={VIEW.width - margin} y={margin} flipX />
      <CornerBracket x={margin} y={VIEW.height - margin} flipY />
      <CornerBracket x={VIEW.width - margin} y={VIEW.height - margin} flipX flipY />

      {/* --- Rótulo de sistema, esquina superior izquierda --- */}
      <text
        x={margin + 6}
        y={margin + 20}
        fill="var(--color-green-700)"
        fontSize="9"
        letterSpacing="0.14em"
        className="font-mono uppercase"
      >
        Modelo de capas · SIG
      </text>

      {/* --- Eje vertical: la columna de datos que atraviesa la pila --- */}
      <motion.line
        x1={PLANE.cx}
        y1={BASE_Y}
        x2={PLANE.cx}
        y2={axisTop}
        stroke="var(--color-green-500)"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        initial={reduceMotion ? undefined : { pathLength: 0 }}
        whileInView={reduceMotion ? undefined : { pathLength: 1 }}
        viewport={ENTRANCE_VIEWPORT}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Pulso que recorre el eje en bucle: sugiere flujo de datos entre
          capas, no un adorno estático. Se omite con movimiento reducido:
          es continuo y no aporta información nueva. */}
      {!reduceMotion ? (
        <motion.circle
          cx={PLANE.cx}
          r="2.5"
          fill="var(--color-green-300)"
          initial={{ cy: BASE_Y, opacity: 0 }}
          whileInView={{
            cy: [BASE_Y, axisTop, BASE_Y],
            opacity: [0, 1, 1, 0],
          }}
          viewport={ENTRANCE_VIEWPORT}
          transition={{
            duration: 3.2,
            delay: 1.4,
            repeat: Infinity,
            repeatDelay: 0.8,
            ease: "easeInOut",
          }}
        />
      ) : null}

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
        {/* Retícula de selección sobre un predio, como en el visor del
            hero: la misma convención en los dos diagramas del sitio. */}
        {parcels[3] ? (
          <rect
            x={PLANE.cx - PLANE.width / 2 + parcels[3].x - 1.5}
            y={BASE_Y - PLANE.height / 2 + parcels[3].y - 1.5}
            width={parcels[3].width + 3}
            height={parcels[3].height + 3}
            fill="none"
            stroke="var(--color-green-200)"
            strokeWidth="1"
            strokeDasharray="2.5 2"
          />
        ) : null}
      </motion.g>

      {/* --- Capas temáticas, de abajo arriba --- */}
      {layers
        .slice()
        .reverse()
        .map((layer, reversedIndex) => {
          const level = reversedIndex + 1;
          const cy = BASE_Y - STEP * level;
          const labelY = cy - 2;
          // Índice de arriba abajo, como una lista de capas real: la
          // superior es 01.
          const layerNumber = String(total - reversedIndex).padStart(2, "0");

          return (
            <motion.g key={layer.name} {...enter(level)}>
              <polygon
                points={diamond(cy)}
                fill="url(#brillo-capa)"
                stroke="var(--color-green-600)"
                strokeOpacity="0.7"
                strokeWidth="1.25"
              />
              {/* Marcas de nivel en el vértice izquierdo: ticks de cota,
                  como una escala de profundidad. */}
              <line
                x1={PLANE.cx - PLANE.width / 2 - 10}
                y1={cy}
                x2={PLANE.cx - PLANE.width / 2 - 2}
                y2={cy}
                stroke="var(--color-green-600)"
                strokeOpacity="0.4"
                strokeWidth="1"
              />
              <text
                x={PLANE.cx - PLANE.width / 2 - 14}
                y={cy + 3}
                fill="var(--color-green-700)"
                fontSize="8.5"
                textAnchor="end"
                className="font-mono"
              >
                L{layerNumber}
              </text>

              {/* Nodo en el vértice derecho, de donde sale la guía. */}
              <circle
                cx={PLANE.cx + PLANE.width / 2}
                cy={cy}
                r="3.5"
                fill="var(--color-green-600)"
              />
              <circle
                cx={PLANE.cx + PLANE.width / 2}
                cy={cy}
                r="7"
                fill="none"
                stroke="var(--color-green-600)"
                strokeOpacity="0.35"
                strokeWidth="1"
              />
              <line
                x1={PLANE.cx + PLANE.width / 2 + 9}
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
                fontSize="9.5"
                letterSpacing="0.02em"
                className="font-mono"
              >
                {layer.detail}
              </text>
            </motion.g>
          );
        })}

      {/* --- Base: rótulo con coordenada simulada, como un origen de
          referencia geográfica --- */}
      <motion.g {...enter(total + 1)}>
        <line
          x1={PLANE.cx - PLANE.width / 2 - 10}
          y1={BASE_Y}
          x2={PLANE.cx - PLANE.width / 2 - 2}
          y2={BASE_Y}
          stroke="var(--color-green-700)"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        <text
          x={PLANE.cx - PLANE.width / 2 - 14}
          y={BASE_Y + 3}
          fill="var(--color-green-800)"
          fontSize="8.5"
          textAnchor="end"
          className="font-mono"
        >
          L00
        </text>

        <line
          x1={PLANE.cx + PLANE.width / 2 + 9}
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
          fontSize="9.5"
          letterSpacing="0.02em"
          className="font-mono"
        >
          La base común
        </text>
      </motion.g>

      {/* --- Coordenada simulada, esquina inferior derecha: ancla el
          diagrama al lenguaje de un plano georreferenciado real --- */}
      <text
        x={VIEW.width - margin - 6}
        y={VIEW.height - margin - 6}
        fill="var(--color-green-700)"
        fontSize="9"
        textAnchor="end"
        letterSpacing="0.03em"
        className="font-mono"
        data-tabular
      >
        04°49&apos;N · 74°02&apos;O
      </text>
    </svg>
  );
}
