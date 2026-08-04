import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EXPERIENCE } from "@/content/home";

export function Experience() {
  return (
    <Section tone="cream">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <SectionHeading
            eyebrow={EXPERIENCE.eyebrow}
            headline={EXPERIENCE.headline}
            body={EXPERIENCE.body}
          />

          <Stagger as="ul" delay={0.2} className="flex flex-col gap-px bg-ink/12">
            {EXPERIENCE.pillars.map((pillar) => (
              <StaggerItem as="li" key={pillar.title} className="bg-cream-200 py-6">
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
