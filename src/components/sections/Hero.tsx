import { ArrowRight, MessageCircle } from "lucide-react";

import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { PlatformFrame } from "@/components/visuals/PlatformFrame";
import { HERO, TRUST } from "@/content/home";
import { ROUTES, WHATSAPP_INTENTS, whatsappUrl } from "@/lib/constants";

/**
 * El titular ocupa el ancho completo en vez de media pantalla.
 *
 * Con la retícula partida en dos columnas, las tres líneas declaradas
 * del titular se refluían a seis y la animación línea por línea
 * perdía todo el sentido. A ancho completo el corte declarado se
 * respeta y la tipografía puede ir al tamaño que pide un titular de
 * apertura.
 */
export function Hero() {
  return (
    <Section
      tone="paper"
      spacing="none"
      grid
      className="pb-(--spacing-section-tight) pt-12 lg:pt-16"
    >
      <Container>
        {/* El hero ya está en pantalla al cargar: anima al montar, no
            al entrar en vista. */}
        <Reveal trigger="mount">
          <Eyebrow>{HERO.eyebrow}</Eyebrow>
        </Reveal>

        <TextReveal
          as="h1"
          trigger="mount"
          delay={0.1}
          lines={HERO.headline}
          linesMobile={HERO.headlineMobile}
          className="mt-6 max-w-6xl text-display-xl text-ink"
        />

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <Reveal trigger="mount" delay={0.45} className="lg:max-w-2xl">
            <p className="text-lead text-ink-700">{HERO.body}</p>
          </Reveal>

          <Reveal trigger="mount" delay={0.58} className="shrink-0">
            <div className="flex flex-col gap-3 sm:flex-row">
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

        <Reveal trigger="mount" delay={0.35} distance={30} className="mt-14 lg:mt-16">
          <PlatformFrame />
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-ink/10 pt-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
          <Reveal trigger="mount" delay={0.7}>
            <dl className="grid grid-cols-3 gap-8 sm:gap-12">
              {HERO.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <Counter
                      to={stat.value}
                      suffix={stat.suffix}
                      className="block text-display-md font-extrabold tracking-tight text-green-800"
                    />
                    <span className="mt-1.5 block max-w-[10rem] text-[0.8125rem] leading-snug text-ink-500">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal trigger="mount" delay={0.82}>
            <div className="flex flex-col gap-3 lg:items-end">
              <p className="eyebrow text-ink-500">{TRUST.label}</p>
              <ul className="flex flex-wrap items-center gap-x-7 gap-y-2.5 lg:justify-end">
                {TRUST.entities.map((entity) => (
                  <li
                    key={entity}
                    className="text-[0.9375rem] font-semibold text-ink-700"
                  >
                    {entity}
                  </li>
                ))}
                <li className="font-mono text-[0.8125rem] text-ink-300">
                  {TRUST.upcoming}
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
