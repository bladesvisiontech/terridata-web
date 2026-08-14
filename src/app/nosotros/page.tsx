import type { Metadata } from "next";

import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ButtonLink } from "@/components/ui/Button";
import { BrandImage } from "@/components/ui/BrandImage";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { EXPERIENCE } from "@/content/home";
import { COMPANY, ROUTES, WHATSAPP_INTENTS, whatsappUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Tecnología desarrollada desde el acompañamiento directo a administraciones públicas colombianas.",
};

export default function NosotrosPage() {
  return (
    <>
      <Section tone="paper" backdrop="dots">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow>Nosotros</Eyebrow>
              <h1 className="mt-5 text-display-lg text-ink text-balance">
                {COMPANY.yearsOfExperience} años convirtiendo conocimiento territorial en
                tecnología
              </h1>
              <p className="mt-6 text-lead text-ink-700">
                {COMPANY.promise}. {EXPERIENCE.body}
              </p>
              <ButtonLink href={ROUTES.contacto} className="mt-8">
                Conversar con el equipo
              </ButtonLink>
            </div>

            <Reveal distance={26}>
              <BrandImage
                media="equipoTecnico"
                sizes="(max-width: 1024px) 100vw, 560px"
                className="aspect-[4/3] rounded-lg"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <h2 className="text-display-md text-ink">Lo que nos distingue</h2>

          <Stagger as="ul" delay={0.12} className="mt-10 grid gap-4 sm:grid-cols-3">
            {EXPERIENCE.pillars.map((pillar, index) => (
              <StaggerItem
                as="li"
                key={pillar.title}
                className="rounded-lg border border-ink/12 bg-cream-50 p-7"
              >
                <span className="font-mono text-[0.6875rem] text-green-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-display-sm text-ink">{pillar.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-700">
                  {pillar.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tone="deep" notch="top">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-display-lg text-cream-50 text-balance">
              ¿Quiere conocer al equipo detrás de Terridata?
            </h2>
            <p className="mt-5 text-lead text-cream-50/75">
              Agende una conversación y le mostramos cómo trabajamos con entidades como la
              suya.
            </p>
            <ButtonLink
              href={whatsappUrl(WHATSAPP_INTENTS.advisor)}
              external
              variant="inverse"
              size="lg"
              className="mt-8"
            >
              Hablar con un asesor
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
