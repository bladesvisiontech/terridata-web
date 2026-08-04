"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { PLATFORM_ACCESS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Accesos a la plataforma, separados del flujo comercial.
 *
 * Es el único punto del sitio que saca al usuario fuera: por eso va
 * en un menú propio y con tratamiento visual secundario, no como CTA.
 *
 * Los destinos viven en `PLATFORM_ACCESS` y cambian el día de la
 * migración de dominio sin tocar este componente.
 */
export function AccessMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const reduceMotion = useReducedMotion();

  // Cierra al hacer clic fuera y al pulsar Escape. Escape devuelve el
  // foco al disparador para no perder al usuario de teclado.
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
        className={cn(
          "inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full",
          "border border-ink/15 px-4 text-[0.875rem] font-semibold text-ink",
          "transition-colors duration-(--duration-fast)",
          "hover:border-ink/35 hover:bg-ink/[0.03]",
          open && "border-ink/35 bg-ink/[0.03]",
        )}
      >
        Acceder
        <ChevronDown
          aria-hidden
          strokeWidth={2}
          className={cn(
            "size-4 transition-transform duration-(--duration-base)",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Acceso a la plataforma"
            initial={reduceMotion ? undefined : { opacity: 0, y: -6, scale: 0.98 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4, scale: 0.99 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top right" }}
            className={cn(
              "absolute right-0 top-[calc(100%+0.625rem)] z-50 w-[19rem]",
              "rounded-2xl border border-ink/10 bg-cream-50 p-2",
              "shadow-[0_18px_50px_-12px_rgba(11,8,17,0.22)]",
            )}
          >
            {PLATFORM_ACCESS.map((access) => (
              <a
                key={access.id}
                role="menuitem"
                href={access.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={cn(
                  "group flex items-start gap-3 rounded-xl p-3",
                  "transition-colors duration-(--duration-fast) hover:bg-green-50",
                )}
              >
                <span className="flex-1">
                  <span className="flex items-center gap-1.5 text-[0.9375rem] font-semibold text-ink">
                    {access.label}
                    <ExternalLink
                      aria-hidden
                      strokeWidth={1.75}
                      className="size-3.5 text-ink-300 transition-colors group-hover:text-green-700"
                    />
                  </span>
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-500">
                    {access.description}
                  </span>
                </span>
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
