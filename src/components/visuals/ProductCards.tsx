"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileCheck2, TriangleAlert } from "lucide-react";

import { ENTRANCE_VIEWPORT } from "@/components/motion/entrance";
import { SHOWCASE } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * ⚠️ PROVISIONAL — ilustraciones, no capturas de la plataforma.
 *
 * Dos piezas de interfaz que resumen lo que hace Terridata más allá
 * del mapa: auditar la calidad del catastro y sustentar cada
 * liquidación. Se sustituyen por capturas reales cuando lleguen; las
 * proporciones ya están fijadas para que el reemplazo no mueva nada.
 */

function enter(reduceMotion: boolean, delay: number) {
  return reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: ENTRANCE_VIEWPORT,
        transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
      };
}

/** Diagnóstico automático de la base catastral. */
export function DiagnosticCard({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const { diagnostic } = SHOWCASE;

  return (
    <motion.div
      {...enter(Boolean(reduceMotion), 0.15)}
      className={cn(
        "notch-br rounded-2xl border border-ink/10 bg-cream-50 p-5",
        "shadow-[0_18px_44px_-20px_rgba(11,8,17,0.26)]",
        className,
      )}
    >
      <p className="flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-green-800">
        <TriangleAlert aria-hidden strokeWidth={2} className="size-3" />
        {diagnostic.label}
      </p>

      <p className="mt-3 text-display-sm text-ink" data-tabular>
        {diagnostic.total}
      </p>
      <p className="text-[0.75rem] text-ink-500">{diagnostic.totalLabel}</p>

      <ul className="mt-5 flex flex-col gap-3">
        {diagnostic.findings.map((finding, index) => (
          <li key={finding.name}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[0.75rem] text-ink-700">{finding.name}</span>
              <span className="font-mono text-[0.6875rem] text-ink" data-tabular>
                {finding.count}
              </span>
            </div>
            {/* La barra escala en X, así que su envoltorio es quien
                tiene caja medible y quien observa el viewport. */}
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-green-50">
              <motion.div
                initial={reduceMotion ? undefined : { scaleX: 0 }}
                whileInView={reduceMotion ? undefined : { scaleX: 1 }}
                viewport={ENTRANCE_VIEWPORT}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ width: `${finding.percent}%`, transformOrigin: "left" }}
                className="h-full rounded-full bg-green-500"
              />
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/** Liquidación con su fundamento normativo a la vista. */
export function LiquidationCard({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const { liquidation } = SHOWCASE;

  return (
    <motion.div
      {...enter(Boolean(reduceMotion), 0.25)}
      className={cn(
        "notch-bl rounded-2xl border border-ink/10 bg-cream-50 p-5",
        "shadow-[0_18px_44px_-20px_rgba(11,8,17,0.26)]",
        className,
      )}
    >
      <p className="flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-green-800">
        <FileCheck2 aria-hidden strokeWidth={2} className="size-3" />
        {liquidation.label}
      </p>

      <p className="mt-3 text-display-sm text-ink" data-tabular>
        {liquidation.amount}
      </p>
      <p className="text-[0.75rem] text-ink-500">{liquidation.amountLabel}</p>

      <dl className="mt-5 flex flex-col gap-2.5 border-t border-ink/10 pt-4">
        {liquidation.steps.map((step) => (
          <div key={step.name} className="flex items-baseline justify-between gap-3">
            <dt className="text-[0.75rem] text-ink-700">{step.name}</dt>
            <dd className="font-mono text-[0.6875rem] text-ink" data-tabular>
              {step.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 inline-flex rounded-full bg-green-50 px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.1em] text-green-800">
        {liquidation.basis}
      </p>
    </motion.div>
  );
}
