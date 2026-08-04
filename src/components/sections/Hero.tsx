import { ArrowRight, Layers, MessageCircle, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { HeroCollage } from "@/components/visuals/HeroCollage";
import { HERO } from "@/content/home";
import { ROUTES, WHATSAPP_INTENTS, whatsappUrl } from "@/lib/constants";

/**
 * Apertura en dos columnas: argumento a la izquierda, mosaico a la
 * derecha.
 *
 * El titular vuelve a media anchura y por eso baja de tamaño: con el
 * corte declarado en cuatro líneas cortas cabe sin refluir, y el
 * mosaico aporta el peso visual que antes tenía que cargar la
 * tipografía sola.
 */
export function Hero() {
  return (
    <Section
      tone="paper"
      spacing="none"
      grid
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

            {/* Dos apoyos cortos bajo los botones, como en la referencia:
                resumen del producto sin obligar a bajar. */}
            <Reveal trigger="mount" delay={0.7}>
              <ul className="mt-10 grid gap-5 border-t border-ink/10 pt-7 sm:grid-cols-2">
                {HERO.highlights.map((highlight, index) => (
                  <li key={highlight.title} className="flex items-start gap-3">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
                      {index === 0 ? (
                        <Layers aria-hidden strokeWidth={1.75} className="size-4" />
                      ) : (
                        <ShieldCheck aria-hidden strokeWidth={1.75} className="size-4" />
                      )}
                    </span>
                    <span>
                      <span className="block text-[0.875rem] font-semibold text-ink">
                        {highlight.title}
                      </span>
                      <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-500">
                        {highlight.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal trigger="mount" delay={0.3} distance={28}>
            <HeroCollage />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
