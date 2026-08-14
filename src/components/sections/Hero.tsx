import { ArrowRight, MessageCircle } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { HeroVideo } from "@/components/visuals/HeroVideo";
import { HERO } from "@/content/home";
import { ROUTES, WHATSAPP_INTENTS, whatsappUrl } from "@/lib/constants";

/**
 * Apertura sobre fondo claro, con el video institucional a la derecha.
 *
 * La superficie técnica —matriz de puntos y halos de verde— la aporta
 * el `<TechSurface>` que envuelve este bloque y los dos siguientes,
 * para que sea continua y no se corte en cada frontera.
 *
 * Contraste medido en el navegador:
 *   titular en tinta ............... 18.9:1
 *   párrafo en tinta 700 ........... 10.4:1
 *   (mínimo AA para texto normal: 4.5:1)
 */
export function Hero() {
  return (
    <Section
      tone="paper"
      spacing="none"
      className="pb-(--spacing-section) pt-10 lg:pt-14"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/*
           * En móvil el video va arriba y el texto debajo; en pantallas
           * anchas vuelven a su sitio.
           *
           * El reordenado es visual, con `order`: en el DOM el bloque de
           * texto sigue primero para que el `h1` sea lo primero que
           * encuentran los buscadores y los lectores de pantalla.
           */}
          <div className="order-2 lg:order-1">
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

          <Reveal
            trigger="mount"
            delay={0.3}
            distance={28}
            className="order-1 lg:order-2"
          >
            <HeroVideo />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
