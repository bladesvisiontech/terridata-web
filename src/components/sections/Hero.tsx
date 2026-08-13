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
 * Apertura sobre verde oscuro, con el video institucional a la
 * derecha.
 *
 * Contraste sobre `green-900` (#133024), medido en el navegador:
 *   titular en crema 50 ............ 14.0:1
 *   párrafo en crema 50 al 78 % ..... 9.1:1
 *   (mínimo AA para texto normal: 4.5:1)
 *
 * El botón principal invierte —fondo crema, texto verde— porque el
 * verde 500 de marca sobre el verde 900 del fondo se queda en 3.1:1 y
 * el botón dejaría de distinguirse del bloque.
 */
export function Hero() {
  return (
    <Section
      tone="deep"
      spacing="none"
      notch="diag"
      className="pb-(--spacing-section) pt-14 lg:pt-20"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            {/* El hero ya está en pantalla al cargar: anima al montar. */}
            <Reveal trigger="mount">
              <Eyebrow tone="inverse">{HERO.eyebrow}</Eyebrow>
            </Reveal>

            <TextReveal
              as="h1"
              trigger="mount"
              delay={0.1}
              lines={HERO.headlineSplit}
              linesMobile={HERO.headlineMobile}
              className="mt-6 text-display-lg text-cream-50"
            />

            <Reveal trigger="mount" delay={0.45}>
              <p className="mt-7 max-w-xl text-lead text-cream-50/78">{HERO.body}</p>
            </Reveal>

            <Reveal trigger="mount" delay={0.58}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={whatsappUrl(WHATSAPP_INTENTS.demo)}
                  external
                  variant="inverse"
                  size="lg"
                >
                  <MessageCircle aria-hidden strokeWidth={1.75} className="size-[1.125rem]" />
                  Solicitar demostración
                </ButtonLink>
                <ButtonLink
                  href={ROUTES.productos}
                  size="lg"
                  className="border border-cream-50/30 bg-transparent text-cream-50 hover:bg-cream-50/10"
                >
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
            <HeroVideo />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
