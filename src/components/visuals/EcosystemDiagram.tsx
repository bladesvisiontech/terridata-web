"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ENTRANCE_VIEWPORT } from "@/components/motion/entrance";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Las dependencias del municipio alrededor de un núcleo común.
 *
 * La idea que tiene que quedar: no son seis sistemas hablando entre
 * sí, es una sola información que todos consultan.
 *
 * En pantallas anchas van en órbita; por debajo de `sm` la órbita se
 * abandona y quedan en rejilla, porque a 375 px las etiquetas se
 * solapan.
 */

const RADIUS = 42;

function orbitPosition(index: number, total: number) {
  // Se arranca arriba (-90°) para que el primero quede en vertical.
  const angle = (-90 + (360 / total) * index) * (Math.PI / 180);
  return {
    left: `${50 + RADIUS * Math.cos(angle)}%`,
    top: `${50 + RADIUS * Math.sin(angle)}%`,
    // Coordenadas en el sistema del SVG (0–100).
    cx: 50 + RADIUS * Math.cos(angle),
    cy: 50 + RADIUS * Math.sin(angle),
  };
}

type EcosystemDiagramProps = {
  departments: readonly string[];
  className?: string;
};

export function EcosystemDiagram({ departments, className }: EcosystemDiagramProps) {
  const reduceMotion = useReducedMotion();
  const total = departments.length;

  return (
    <div className={cn("w-full", className)}>
      {/* --- Órbita (sm en adelante) --- */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-xl sm:block">
        {/* Radios de conexión. El SVG no observa el viewport: quien
            observa es cada nodo, que sí tiene caja medible. */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 size-full"
          aria-hidden
          preserveAspectRatio="none"
        >
          {departments.map((department, index) => {
            const { cx, cy } = orbitPosition(index, total);
            return (
              <motion.line
                key={department}
                x1="50"
                y1="50"
                x2={cx}
                y2={cy}
                stroke="var(--color-green-500)"
                strokeOpacity="0.3"
                strokeWidth="0.35"
                initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
                whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
                viewport={ENTRANCE_VIEWPORT}
                transition={{
                  duration: 0.7,
                  delay: 0.35 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            );
          })}

          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="var(--color-green-500)"
            strokeOpacity="0.16"
            strokeWidth="0.3"
            strokeDasharray="1.5 1.5"
          />
        </svg>

        {/* Núcleo */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.85 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={ENTRANCE_VIEWPORT}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "absolute left-1/2 top-1/2 flex size-32 -translate-x-1/2 -translate-y-1/2",
            "flex-col items-center justify-center rounded-full bg-green-800 text-center",
            "shadow-[0_16px_40px_-12px_rgba(27,69,52,0.55)] lg:size-36",
          )}
        >
          <span className="text-[1.0625rem] font-extrabold tracking-tight text-cream-50">
            {COMPANY.name}
          </span>
          <span className="eyebrow mt-1.5 text-cream-300">Un solo dato</span>
        </motion.div>

        {/* Dependencias */}
        {departments.map((department, index) => {
          const { left, top } = orbitPosition(index, total);
          return (
            <motion.div
              key={department}
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={ENTRANCE_VIEWPORT}
              transition={{
                duration: 0.5,
                delay: 0.5 + index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ left, top }}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap",
                "rounded-full border border-green-800/20 bg-cream-50 px-4 py-2.5",
                "text-[0.8125rem] font-semibold text-green-900",
                "shadow-[0_6px_18px_-8px_rgba(11,8,17,0.28)]",
              )}
            >
              {department}
            </motion.div>
          );
        })}
      </div>

      {/* --- Rejilla (móvil) --- */}
      <div className="sm:hidden">
        <div
          className={cn(
            "mx-auto flex size-28 flex-col items-center justify-center",
            "rounded-full bg-green-800 text-center",
          )}
        >
          <span className="text-base font-extrabold tracking-tight text-cream-50">
            {COMPANY.name}
          </span>
          <span className="eyebrow mt-1 text-cream-300">Un solo dato</span>
        </div>

        <div aria-hidden className="mx-auto my-4 h-8 w-px bg-green-500/35" />

        <ul className="grid grid-cols-2 gap-2.5">
          {departments.map((department) => (
            <li
              key={department}
              className={cn(
                "rounded-xl border border-green-800/20 bg-cream-50 px-3 py-3",
                "text-center text-[0.8125rem] font-semibold text-green-900",
              )}
            >
              {department}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
