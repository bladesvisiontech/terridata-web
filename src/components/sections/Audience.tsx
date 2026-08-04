import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AUDIENCE } from "@/content/home";

export function Audience() {
  return (
    <Section tone="paper">
      <Container>
        <SectionHeading
          eyebrow={AUDIENCE.eyebrow}
          headline={AUDIENCE.headline}
          align="center"
        />

        <Stagger
          as="ul"
          delay={0.15}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {AUDIENCE.items.map((item) => (
            <StaggerItem
              as="li"
              key={item.role}
              className="group rounded-2xl border border-ink/12 p-7 transition-colors duration-(--duration-base) hover:border-green-500/45 hover:bg-green-50/50"
            >
              <h3 className="text-display-sm text-ink">{item.role}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-500">
                {item.value}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
