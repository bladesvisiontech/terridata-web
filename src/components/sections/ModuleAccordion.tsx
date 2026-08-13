"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, MessageCircle, Plus } from "lucide-react";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

import { BrandImage } from "@/components/ui/BrandImage";
import { ButtonLink } from "@/components/ui/Button";
import { ModuleGlyph } from "@/components/ui/ModuleGlyph";
import { MODULES, type EcosystemModule } from "@/content/modules";
import { WHATSAPP_INTENTS, whatsappUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

const MODULE_NAME_BY_ID = new Map(MODULES.map((m) => [m.id, m.name]));

/**
 * Los once módulos en un solo lugar.
 *
 * Se despliegan en sitio en vez de llevar a once páginas: el cliente
 * pidió un recorrido corto y fácil de seguir, y así el usuario compara
 * módulos sin perder el hilo ni la posición de scroll.
 *
 * Cada módulo tiene su propio `id`, así que `/productos#gestion-catastral`
 * abre el que corresponde y baja hasta él.
 */
function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

/**
 * El fragmento de la URL, como fuente externa.
 *
 * Se lee con `useSyncExternalStore` y no copiándolo a estado desde un
 * efecto: copiarlo obliga a un render de más y deja dos fuentes de
 * verdad que se pueden desincronizar. En el servidor devuelve cadena
 * vacía, que es lo correcto —allí no hay fragmento—.
 */
function useHash() {
  return useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash.slice(1),
    () => "",
  );
}

export function ModuleAccordion() {
  const reduceMotion = useReducedMotion();
  const hash = useHash();

  // Solo se guarda lo que el usuario ha tocado. El resto se deduce.
  const [manual, setManual] = useState<Record<string, boolean>>({});

  /**
   * Recibe el estado efectivo, no solo el manual.
   *
   * Con `!manual[id]` a secas, el primer clic sobre un módulo que ya
   * estaba abierto por defecto lo «abría» otra vez: nunca se cerraba.
   */
  const toggle = useCallback((id: string, currentlyOpen: boolean) => {
    setManual((current) => ({ ...current, [id]: !currentlyOpen }));
  }, []);

  const targeted = MODULE_NAME_BY_ID.has(hash) ? hash : null;

  function isOpen(id: string) {
    // Lo que el usuario decidió manda sobre cualquier automatismo.
    const manualState = manual[id];
    if (manualState !== undefined) return manualState;
    if (targeted) return id === targeted;
    // Sin fragmento, el primero abierto: nadie llega a un acordeón
    // completamente cerrado sin saber qué hay dentro.
    return id === MODULES[0].id;
  }

  // Traer a la vista el módulo enlazado. Es un efecto secundario puro,
  // no toca estado.
  useEffect(() => {
    if (!targeted) return;

    // Espera a que el panel esté montado antes de desplazar.
    const timer = window.setTimeout(() => {
      document.getElementById(targeted)?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }, 140);

    return () => window.clearTimeout(timer);
  }, [targeted, reduceMotion]);

  return (
    <ul className="mt-14 flex flex-col gap-3">
      {MODULES.map((module) => {
        const open = isOpen(module.id);
        return (
          <ModuleRow
            key={module.id}
            module={module}
            open={open}
            onToggle={() => toggle(module.id, open)}
            reduceMotion={Boolean(reduceMotion)}
          />
        );
      })}
    </ul>
  );
}

function ModuleRow({
  module,
  open,
  onToggle,
  reduceMotion,
}: {
  module: EcosystemModule;
  open: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
}) {
  const panelId = `${module.id}-panel`;
  const buttonId = `${module.id}-boton`;

  return (
    <li
      id={module.id}
      className={cn(
        "scroll-mt-28 overflow-hidden rounded-2xl border transition-colors duration-(--duration-base)",
        open ? "border-green-500/45 bg-cream-50" : "border-ink/12 bg-cream-50",
      )}
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className={cn(
            "group flex w-full cursor-pointer items-start gap-4 p-5 text-left",
            "transition-colors duration-(--duration-fast) hover:bg-green-50/60 sm:gap-6 sm:p-7",
          )}
        >
          <span
            className={cn(
              "hidden shrink-0 items-center justify-center rounded-xl transition-colors duration-(--duration-base) sm:inline-flex sm:size-12",
              open
                ? "bg-green-500 text-cream-50"
                : "bg-green-50 text-green-700 group-hover:bg-green-100",
            )}
          >
            <ModuleGlyph icon={module.icon} />
          </span>

          <span className="flex-1">
            <span className="flex items-baseline gap-3">
              <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-ink-300">
                {module.index}
              </span>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-green-800">
                {module.name}
              </span>
            </span>
            {/* El beneficio manda: es lo que el alcalde está buscando. */}
            <span className="mt-2 block text-display-sm text-ink">
              {module.benefit}
            </span>
          </span>

          <span
            aria-hidden
            className={cn(
              "mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full border",
              "transition-[transform,background-color,border-color] duration-(--duration-base) ease-(--ease-entrance)",
              open
                ? "rotate-45 border-green-500 bg-green-500 text-cream-50"
                : "border-ink/20 text-ink-500 group-hover:border-ink/40",
            )}
          >
            <Plus strokeWidth={2} className="size-4" />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
              // La opacidad va por detrás para que no parpadee al cerrar.
              opacity: { duration: open ? 0.28 : 0.16, delay: open ? 0.08 : 0 },
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink/10 p-5 sm:p-7">
              <div className="grid gap-7 lg:grid-cols-[1fr_20rem] lg:gap-10">
                <p className="text-[1.0625rem] leading-relaxed text-ink-700">
                  {module.summary}
                </p>
                <BrandImage
                  media={module.image}
                  sizes="(max-width: 1024px) 100vw, 320px"
                  className="aspect-[16/10] rounded-xl lg:row-span-2"
                />
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
                <div>
                  <p className="eyebrow text-ink-500">Qué incluye</p>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {module.capabilities.map((capability) => (
                      <li key={capability} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500"
                        >
                          <Check strokeWidth={3} className="size-3 text-cream-50" />
                        </span>
                        <span className="text-[0.9375rem] leading-relaxed text-ink">
                          {capability}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-7">
                  <div>
                    <p className="eyebrow text-ink-500">Quién lo usa</p>
                    <ul className="mt-3.5 flex flex-wrap gap-2">
                      {module.users.map((user) => (
                        <li
                          key={user}
                          className="rounded-full bg-cream-200 px-3 py-1.5 text-[0.75rem] font-medium text-ink"
                        >
                          {user}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="eyebrow text-ink-500">Comparte información con</p>
                    <ul className="mt-3.5 flex flex-col gap-1">
                      {module.integrations.map((id) => (
                        <li key={id}>
                          <a
                            href={`#${id}`}
                            className="inline-flex min-h-8 items-center gap-1.5 text-[0.8125rem] text-green-800 transition-colors hover:text-green-900"
                          >
                            {MODULE_NAME_BY_ID.get(id)}
                            <ArrowUpRight
                              aria-hidden
                              strokeWidth={2}
                              className="size-3.5"
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-ink/10 pt-6">
                <ButtonLink
                  href={whatsappUrl(WHATSAPP_INTENTS.module(module.name))}
                  external
                >
                  <MessageCircle aria-hidden strokeWidth={1.75} className="size-4" />
                  Ver este módulo en funcionamiento
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
