"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import {
  DURATION,
  EASE_ENTRANCE,
  ORCHESTRATOR,
  entranceTriggerProps,
  type EntranceTrigger,
} from "./entrance";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Distancia de desplazamiento en píxeles. */
  distance?: number;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  trigger?: EntranceTrigger;
  as?: "div" | "span" | "li";
};

function offsetFor(direction: RevealProps["direction"], distance: number) {
  switch (direction) {
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return { y: distance };
  }
}

/**
 * Entrada básica: desplazamiento y opacidad.
 *
 * El elemento externo es el que observa el viewport y no lleva
 * ninguna transformación, así que su caja siempre es medible.
 */
export function Reveal({
  children,
  className,
  distance = 22,
  direction = "up",
  delay = 0,
  trigger = "scroll",
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  // Con movimiento reducido el contenido se renderiza visible y
  // estático. Nunca depende de JS para ser legible.
  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, ...offsetFor(direction, distance) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: DURATION.base, ease: EASE_ENTRANCE, delay },
    },
  };

  const Outer = motion[as];

  return (
    <Outer className={className} variants={ORCHESTRATOR} {...entranceTriggerProps(trigger)}>
      <motion.span variants={variants} style={{ display: "block", willChange: "transform, opacity" }}>
        {children}
      </motion.span>
    </Outer>
  );
}
