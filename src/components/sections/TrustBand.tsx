import Image from "next/image";

import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { STATS_BAND, TRUST } from "@/content/home";
import { cn } from "@/lib/utils";

import cifrasFondo from "../../../public/brand/cifras.jpg";

/**
 * Confianza y cifras.
 *
 * La franja usa el fondo que aportó el cliente: casi negro con
 * destellos de verde y el isotipo trazado a la izquierda.
 *
 * Contraste sobre ese fondo (#131917 en la zona donde cae el texto):
 *   cifra en verde 200 ............ 11.1:1
 *   etiqueta en crema 50 .......... 18.4:1
 *
 * El color de respaldo del contenedor es el mismo casi negro de la
 * imagen: si la foto tarda o falla, el texto sigue leyéndose en vez de
 * quedar claro sobre blanco.
 */

const TRUST_ITEMS: { id: string; label: string; muted: boolean }[] = [
  ...TRUST.entities.map((entity) => ({ id: entity, label: entity, muted: false })),
  { id: "upcoming", label: TRUST.upcoming, muted: true },
];

/**
 * Fila del marquee. Se renderiza dos veces dentro del mismo track
 * (ver más abajo): la segunda copia es la que hace el bucle parecer
 * infinito y por eso va marcada `aria-hidden` y desaparece del todo
 * con `prefers-reduced-motion`, para no duplicar la lista ante un
 * lector de pantalla ni ante quien no anima nada.
 */
function TrustMarqueeRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className={cn(
        "flex shrink-0 items-center gap-x-3 sm:gap-x-4",
        duplicate && "motion-reduce:hidden",
      )}
    >
      {TRUST_ITEMS.map((item) => (
        <li key={item.id} className="flex shrink-0 items-center gap-x-3 sm:gap-x-4">
          <span
            className={
              item.muted
                ? "font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-ink-300"
                : "font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-ink-700"
            }
          >
            {item.label}
          </span>
          <span aria-hidden className="h-3.5 w-px bg-ink/15" />
        </li>
      ))}
    </ul>
  );
}

export function TrustBand() {
  return (
    <Section tone="paper" spacing="tight">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-ink/10 pb-8 sm:flex-row sm:items-center sm:gap-10">
            <p className="eyebrow shrink-0 text-ink-500">{TRUST.label}</p>

            <div
              className={cn(
                "relative min-w-0 flex-1 overflow-hidden",
                "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
                "[-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
                "motion-reduce:overflow-visible motion-reduce:[mask-image:none] motion-reduce:[-webkit-mask-image:none]",
              )}
            >
              <div
                className={cn(
                  "flex w-max items-center will-change-transform",
                  "[animation:marquee_28s_linear_infinite] hover:[animation-play-state:paused]",
                  "motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:[animation:none]",
                )}
              >
                <TrustMarqueeRow />
                <TrustMarqueeRow duplicate />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="notch-diag relative isolate mt-10 overflow-hidden bg-[#131917]">
          <Image
            src={cifrasFondo}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 1024px) 100vw, 1320px"
            className="-z-10 object-cover"
          />

          <Stagger
            as="dl"
            delay={0.12}
            className="grid gap-y-10 px-8 py-14 sm:grid-cols-2 sm:gap-y-0 sm:px-12 lg:px-16"
          >
            {STATS_BAND.map((stat, index) => (
              <StaggerItem
                key={stat.label}
                className={
                  // El divisor es borde del segundo elemento, no un
                  // nodo suelto: así aparece solo cuando hay algo a los
                  // dos lados y desaparece al apilarse en móvil.
                  index > 0
                    ? "text-center sm:border-l sm:border-cream-50/25"
                    : "text-center"
                }
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <Counter
                    to={stat.value}
                    suffix={stat.suffix}
                    className="block text-display-xl leading-none text-green-200"
                  />
                  <span className="mx-auto mt-4 block max-w-[15rem] text-[0.9375rem] font-bold leading-snug text-cream-50">
                    {stat.label}
                  </span>
                </dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
