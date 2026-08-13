import { ArrowRight, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TextReveal } from "@/components/motion/TextReveal";
import { ModuleAccordion } from "@/components/sections/ModuleAccordion";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  PRODUCTOS_CTA,
  PRODUCTOS_HERO,
  PRODUCTOS_INTRO,
  PRODUCTOS_MODULES,
} from "@/content/productos";
import { ROUTES, WHATSAPP_INTENTS, whatsappUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Los once módulos del ecosistema Terridata: Visor Geográfico, Gestión Catastral, Gestión Tributaria, Cartera y Cobro, Planeación y Urbanismo, Hacienda e ICA, Gestión del Riesgo, Analítica Territorial, Portal Ciudadano, Operación Multimunicipio y Mesa de Ayuda.",
};

export default function ProductosPage() {
  return (
    <>
      <Section
        tone="paper"
        spacing="none"
        backdrop="both"
        className="pb-(--spacing-section-tight) pt-14 lg:pt-20"
      >
        <Container>
          <Reveal trigger="mount">
            <Eyebrow>{PRODUCTOS_HERO.eyebrow}</Eyebrow>
          </Reveal>

          <TextReveal
            as="h1"
            trigger="mount"
            delay={0.1}
            lines={PRODUCTOS_HERO.headline}
            linesMobile={PRODUCTOS_HERO.headlineMobile}
            className="mt-6 max-w-5xl text-display-xl text-ink"
          />

          <Reveal trigger="mount" delay={0.4}>
            <p className="mt-8 max-w-2xl text-lead text-ink-700">
              {PRODUCTOS_HERO.body}
            </p>
          </Reveal>

          <Reveal trigger="mount" delay={0.52}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={whatsappUrl(WHATSAPP_INTENTS.demo)} external size="lg">
                <MessageCircle aria-hidden strokeWidth={1.75} className="size-[1.125rem]" />
                Solicitar demostración
              </ButtonLink>
              <ButtonLink href={ROUTES.contacto} variant="secondary" size="lg">
                Hablar con un asesor
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-[1.125rem] transition-transform duration-(--duration-base) group-hover:translate-x-1"
                />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <SectionHeading
              eyebrow={PRODUCTOS_INTRO.eyebrow}
              headline={PRODUCTOS_INTRO.headline}
              body={PRODUCTOS_INTRO.body}
            />

            {/* Separadores como borde de cada elemento: un contenedor con
                fondo enseñaría su sobrante al estirarse. */}
            <Stagger as="ul" delay={0.2} className="flex flex-col self-start">
              {PRODUCTOS_INTRO.points.map((point) => (
                <StaggerItem
                  as="li"
                  key={point.index}
                  className="border-b border-ink/15 py-7 first:pt-0"
                >
                  <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-green-800">
                    {point.index}
                  </span>
                  <h3 className="mt-3 text-display-sm text-ink">{point.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-700">
                    {point.description}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      <Section tone="paper" id="modulos">
        <Container>
          <SectionHeading
            eyebrow={PRODUCTOS_MODULES.eyebrow}
            headline={PRODUCTOS_MODULES.headline}
            body={PRODUCTOS_MODULES.body}
            className="max-w-3xl"
          />

          <ModuleAccordion />
        </Container>
      </Section>

      <Section tone="deep" notch="top">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow tone="inverse" className="justify-center">
                {PRODUCTOS_CTA.eyebrow}
              </Eyebrow>
            </Reveal>

            <TextReveal
              lines={PRODUCTOS_CTA.headline}
              delay={0.08}
              className="mt-6 text-display-lg text-balance text-cream-50"
            />

            <Reveal delay={0.25}>
              <p className="mx-auto mt-7 max-w-2xl text-lead text-cream-50/75">
                {PRODUCTOS_CTA.body}
              </p>
            </Reveal>

            <Reveal delay={0.38}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
                  href={ROUTES.home}
                  size="lg"
                  className="border border-cream-50/25 bg-transparent text-cream-50 hover:bg-cream-50/10"
                >
                  Volver al inicio
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
