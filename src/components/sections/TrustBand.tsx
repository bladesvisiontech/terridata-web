import Image from "next/image";

import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { STATS_BAND, TRUST } from "@/content/home";

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
export function TrustBand() {
  return (
    <Section tone="paper" spacing="tight">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-ink/10 pb-8 sm:flex-row sm:items-center sm:gap-10">
            <p className="eyebrow shrink-0 text-ink-500">{TRUST.label}</p>
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-2.5">
              {TRUST.entities.map((entity) => (
                <li key={entity} className="text-base font-semibold text-ink-700">
                  {entity}
                </li>
              ))}
              <li className="font-mono text-[0.8125rem] text-ink-300">
                {TRUST.upcoming}
              </li>
            </ul>
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
