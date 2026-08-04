"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { COMPANY } from "@/lib/constants";

type CounterProps = {
  to: number;
  /** Decimales a mostrar. Útil para porcentajes con coma. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  durationMs?: number;
};

/**
 * Cifra que cuenta hasta su valor al entrar en vista.
 *
 * El valor final se renderiza en el HTML del servidor y solo se
 * reemplaza cuando la animación arranca en el cliente: si JS no
 * carga, o el usuario pide movimiento reducido, la cifra correcta ya
 * está ahí.
 *
 * El testigo de «ya arrancó» va en una ref y no en estado. Con estado
 * cambiaba una dependencia del efecto, el efecto se volvía a ejecutar
 * y su limpieza detenía la animación recién empezada: el contador se
 * quedaba clavado en cero.
 *
 * Las cifras van en `tabular-nums` para que el ancho no cambie
 * mientras suben y no desplacen el texto de al lado.
 */
export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  durationMs = 1600,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasStarted = useRef(false);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (reduceMotion || !inView || hasStarted.current) return;

    hasStarted.current = true;
    setValue(0);

    const controls = animate(0, to, {
      duration: durationMs / 1000,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setValue,
    });

    return () => controls.stop();
  }, [inView, reduceMotion, to, durationMs]);

  const formatted = value.toLocaleString(COMPANY.locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className} data-tabular>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
