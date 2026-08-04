"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

import {
  DURATION,
  EASE_ENTRANCE,
  entranceTriggerProps,
  type EntranceTrigger,
} from "./entrance";

/** 60 ms entre elementos: una rejilla de 8 tarjetas entra en ~0.5 s. */
const STAGGER_STEP = 0.06;

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  step?: number;
  trigger?: EntranceTrigger;
};

/**
 * Contenedor que escalona la entrada de sus hijos `<StaggerItem>`.
 *
 * El contenedor observa el viewport y no se transforma; propaga las
 * variantes a los hijos, que son los que animan.
 */
export function Stagger({
  children,
  className,
  as = "div",
  delay = 0,
  step = STAGGER_STEP,
  trigger = "scroll",
}: StaggerProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as;

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: step, delayChildren: delay } },
  };

  const Motion = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Motion className={className} variants={container} {...entranceTriggerProps(trigger)}>
      {children}
    </Motion>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "span";
  distance?: number;
};

export function StaggerItem({
  children,
  className,
  as = "div",
  distance = 18,
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as;

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const item: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.base, ease: EASE_ENTRANCE },
    },
  };

  const Motion = motion[as];

  return (
    <Motion className={className} variants={item} style={{ willChange: "transform, opacity" }}>
      {children}
    </Motion>
  );
}
