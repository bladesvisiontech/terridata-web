import { ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { HERO } from "@/content/home";
import { ROUTES, WHATSAPP_INTENTS, whatsappUrl } from "@/lib/constants";

import heroBanner from "../../../public/brand/hero-banner.png";

/**
 * Apertura en dos columnas: argumento a la izquierda, banner a la
 * derecha.
 *
 * El banner es material propio del cliente y trae capturas reales de
 * la plataforma, así que sustituye al mosaico que se había montado
 * con fotografía de stock.
 *
 * Se importa el PNG en vez de referenciar la ruta como cadena para que
 * Next conozca sus medidas en compilación y reserve el hueco: sin eso
 * la columna da un salto al cargar la imagen.
 */
export function Hero() {
  return (
    <Section
      tone="paper"
      spacing="none"
      className="pb-(--spacing-section-tight) pt-10 lg:pt-14"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            {/* El hero ya está en pantalla al cargar: anima al montar. */}
            <Reveal trigger="mount">
              <Eyebrow>{HERO.eyebrow}</Eyebrow>
            </Reveal>

            <TextReveal
              as="h1"
              trigger="mount"
              delay={0.1}
              lines={HERO.headlineSplit}
              linesMobile={HERO.headlineMobile}
              className="mt-6 text-display-lg text-ink"
            />

            <Reveal trigger="mount" delay={0.45}>
              <p className="mt-7 max-w-xl text-lead text-ink-700">{HERO.body}</p>
            </Reveal>

            <Reveal trigger="mount" delay={0.58}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={whatsappUrl(WHATSAPP_INTENTS.demo)} external size="lg">
                  <MessageCircle aria-hidden strokeWidth={1.75} className="size-[1.125rem]" />
                  Solicitar demostración
                </ButtonLink>
                <ButtonLink href={ROUTES.productos} variant="secondary" size="lg">
                  Conocer el ecosistema
                  <ArrowRight
                    aria-hidden
                    strokeWidth={1.75}
                    className="size-[1.125rem] transition-transform duration-(--duration-base) group-hover:translate-x-1"
                  />
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal trigger="mount" delay={0.3} distance={28}>
            <Image
              src={heroBanner}
              alt="Plataforma Terridata: consulta de un trámite en el sistema, un ciudadano con su recibo de impuesto predial y una vista aérea de un municipio colombiano"
              priority
              sizes="(max-width: 1024px) 100vw, 680px"
              className="h-auto w-full"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
