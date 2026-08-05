"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { CONTACT, WHATSAPP_INTENTS, whatsappUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Acceso permanente a WhatsApp.
 *
 * Toda la conversión del sitio pasa por WhatsApp, así que el canal
 * tiene que estar a un toque desde cualquier punto del recorrido, no
 * solo en el encabezado y en los cierres de sección.
 *
 * Decisiones que sostienen el componente:
 *
 * - **No aparece de entrada.** Sobre el hero ya hay dos botones; un
 *   tercero flotando compite con ellos y tapa el mosaico. Entra
 *   cuando el usuario ha bajado media pantalla, que es cuando ya
 *   está leyendo y el atajo suma.
 * - **56 px de diámetro**, por encima del mínimo táctil de 44.
 * - **Etiqueta al pasar el cursor o al enfocar**, no solo al pasar el
 *   cursor: quien navega con teclado ve lo mismo que quien usa ratón.
 *   En móvil no se despliega, porque ahí no hay estado intermedio.
 * - **Respeta el área segura** del teléfono para no quedar bajo la
 *   barra de gestos.
 * - **Va en la capa 40**, por debajo del encabezado y del panel de
 *   navegación: con el menú abierto queda tapado, que es lo correcto.
 */

/** Glifo oficial de WhatsApp. Se usa la marca tal cual, sin alterar. */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.8, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.85, y: 8 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "fixed right-5 z-40 sm:right-7",
            // Se apoya en el área segura para no quedar bajo la barra
            // de gestos del teléfono.
            "bottom-[calc(1.25rem+env(safe-area-inset-bottom))]",
            "sm:bottom-[calc(1.75rem+env(safe-area-inset-bottom))]",
          )}
        >
          <a
            href={whatsappUrl(WHATSAPP_INTENTS.advisor)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Escribir por WhatsApp al ${CONTACT.whatsapp.display}`}
            className={cn(
              "group flex h-14 items-center gap-0 rounded-full bg-green-500 pl-4 pr-4",
              "text-cream-50 shadow-[0_8px_28px_-8px_rgba(11,8,17,0.45)]",
              "transition-[background-color,gap,padding,transform] duration-(--duration-base)",
              "ease-(--ease-entrance) hover:bg-green-600 active:scale-95",
              // La etiqueta se despliega al pasar el cursor y también al
              // enfocar con teclado. Solo a partir de sm: en móvil no
              // hay estado intermedio que aprovechar.
              "sm:hover:gap-2.5 sm:hover:pr-6 sm:focus-visible:gap-2.5 sm:focus-visible:pr-6",
            )}
          >
            <WhatsAppGlyph className="size-6 shrink-0" />

            {/* `aria-hidden` porque el enlace ya tiene su etiqueta
                accesible: sin esto el lector la anunciaría dos veces. */}
            <span
              aria-hidden
              className={cn(
                "hidden max-w-0 overflow-hidden whitespace-nowrap text-[0.9375rem] font-semibold",
                "transition-[max-width,opacity] duration-(--duration-base) ease-(--ease-entrance)",
                "opacity-0 sm:block",
                "sm:group-hover:max-w-[12rem] sm:group-hover:opacity-100",
                "sm:group-focus-visible:max-w-[12rem] sm:group-focus-visible:opacity-100",
              )}
            >
              Hablar con un asesor
            </span>
          </a>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
