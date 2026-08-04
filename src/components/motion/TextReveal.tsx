"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import {
  EASE_ENTRANCE,
  ORCHESTRATOR,
  entranceTriggerProps,
  type EntranceTrigger,
} from "./entrance";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  /**
   * Líneas del titular, ya partidas.
   *
   * El corte es una decisión de diseño, no del navegador: los
   * titulares se declaran partidos para que el ritmo visual sea el
   * mismo en cualquier ancho.
   */
  lines: readonly string[];
  /**
   * Cortes alternativos por debajo de `sm` (640 px).
   *
   * Un corte pensado para escritorio no cabe en 375 px: la línea
   * refluye, aparecen seis renglones donde se declararon tres y la
   * animación por líneas pierde el sentido.
   *
   * Si no se pasa nada, en móvil el titular se une en un solo bloque
   * que fluye con el ancho disponible y entra de una pieza. Para los
   * titulares grandes —donde ese bloque quedaría demasiado alto—
   * conviene declarar aquí un corte propio.
   *
   * Se renderizan las dos versiones y CSS muestra la que toca, sin
   * JS de por medio, así que no hay desajuste de hidratación. La
   * copia oculta va con `display: none`, que también la saca del
   * árbol de accesibilidad: el lector de pantalla no lee el titular
   * dos veces.
   */
  linesMobile?: readonly string[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  trigger?: EntranceTrigger;
  delay?: number;
};

export function TextReveal({
  lines,
  linesMobile,
  className,
  as = "h2",
  trigger = "scroll",
  delay = 0,
}: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as;

  // Sin corte propio, en móvil el titular fluye como un solo bloque.
  const mobileLines = linesMobile ?? [lines.join(" ")];
  const needsSplit = mobileLines.length !== lines.length ||
    mobileLines.some((line, index) => line !== lines[index]);

  const lineVariants: Variants = {
    hidden: { y: "110%" },
    visible: (index: number) => ({
      y: "0%",
      transition: {
        duration: 0.9,
        ease: EASE_ENTRANCE,
        delay: delay + index * 0.09,
      },
    }),
  };

  function renderLines(source: readonly string[], visibility?: string) {
    if (reduceMotion) {
      return (
        <span className={visibility}>
          {source.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
      );
    }

    return (
      <span className={visibility}>
        {source.map((text, index) => (
          // La caja que recorta no observa el viewport: solo recorta.
          <span key={text} className="block overflow-hidden pb-[0.12em]">
            <motion.span
              custom={index}
              variants={lineVariants}
              style={{ display: "block", willChange: "transform" }}
            >
              {text}
            </motion.span>
          </span>
        ))}
      </span>
    );
  }

  if (reduceMotion) {
    return (
      <Tag className={className}>
        {linesMobile ? renderLines(linesMobile, "block sm:hidden") : null}
        {renderLines(lines, linesMobile ? "hidden sm:block" : undefined)}
      </Tag>
    );
  }

  const Motion = motion[as];

  return (
    <Motion
      className={cn(className)}
      variants={ORCHESTRATOR}
      {...entranceTriggerProps(trigger)}
    >
      {needsSplit ? renderLines(mobileLines, "block sm:hidden") : null}
      {renderLines(lines, needsSplit ? "hidden sm:block" : undefined)}
    </Motion>
  );
}
