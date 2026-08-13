import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TextReveal } from "@/components/motion/TextReveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { CHALLENGE } from "@/content/home";

import puntoPartida from "../../../public/brand/punto-partida.png";

/**
 * El punto de partida.
 *
 * Sigue la referencia que aportó el cliente:
 *
 * · El titular va en **dos pesos** —regular arriba, negrita en el
 *   remate— y en verde, no en tinta. Es el único titular del sitio que
 *   mezcla pesos, y por eso el contenido los declara por separado.
 * · Los cuatro retos llevan los iconos propios del cliente, no
 *   pictogramas de la librería, y pierden la numeración: el icono ya
 *   hace de ancla visual.
 * · Los separadores verticales van como borde del elemento, no como
 *   nodo suelto, para que solo aparezcan cuando hay algo a los dos
 *   lados y desaparezcan al apilarse.
 */
export function Challenge() {
  return (
    <Section tone="cream">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>{CHALLENGE.eyebrow}</Eyebrow>
            </Reveal>

            <div className="mt-7">
              <TextReveal
                as="h2"
                lines={CHALLENGE.headlineLight}
                className="text-display-lg font-normal text-green-800"
              />
              <TextReveal
                as="p"
                lines={CHALLENGE.headlineBold}
                delay={0.16}
                className="text-display-lg font-extrabold text-green-900"
              />
            </div>

            <Reveal delay={0.28}>
              <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-ink-700">
                {CHALLENGE.body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} distance={26}>
            <Image
              src={puntoPartida}
              alt="Escritorio con documentos apilados, archivo de una oficina municipal y vista aérea de un municipio"
              sizes="(max-width: 1024px) 100vw, 620px"
              className="h-auto w-full"
            />
          </Reveal>
        </div>

        <Stagger
          as="ul"
          delay={0.15}
          className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-x-0"
        >
          {CHALLENGE.items.map((item, index) => (
            <StaggerItem
              as="li"
              key={item.id}
              className={
                index > 0 ? "lg:border-l lg:border-green-800/20 lg:pl-8" : undefined
              }
            >
              <div className="flex items-center gap-3.5">
                {/* Los iconos vienen del cliente y ya traen su propio
                    fondo circular, así que no llevan contenedor. */}
                <Image
                  src={item.icon}
                  alt=""
                  aria-hidden
                  width={153}
                  height={159}
                  className="size-14 shrink-0 object-contain"
                />
                <h3 className="text-[1.0625rem] font-extrabold leading-snug tracking-tight text-green-800">
                  {item.title}
                </h3>
              </div>

              <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-700">
                {item.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
