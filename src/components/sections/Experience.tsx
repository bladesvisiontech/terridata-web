import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BrandImage } from "@/components/ui/BrandImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EXPERIENCE } from "@/content/home";

export function Experience() {
  return (
    <Section tone="cream">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={EXPERIENCE.eyebrow}
              headline={EXPERIENCE.headline}
              body={EXPERIENCE.body}
            />
            <Reveal delay={0.3} distance={26}>
              <BrandImage
                media="equipoTecnico"
                sizes="(max-width: 1024px) 100vw, 560px"
                className="mt-10 aspect-[16/10] rounded-2xl"
              />
            </Reveal>
          </div>

          {/*
           * Los separadores van como borde de cada elemento y no como
           * hueco de un contenedor con fondo: si el contenedor se estira
           * —y aquí se estira, porque la columna de al lado lleva foto—,
           * el sobrante enseña su propio fondo como una mancha.
           */}
          <Stagger as="ul" delay={0.2} className="flex flex-col self-start">
            {EXPERIENCE.pillars.map((pillar) => (
              <StaggerItem
                as="li"
                key={pillar.title}
                className="border-b border-ink/15 py-7 first:pt-0"
              >
                <h3 className="text-display-sm text-ink">{pillar.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-700">
                  {pillar.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
