import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CHALLENGE } from "@/content/home";

export function Challenge() {
  return (
    <Section tone="cream">
      <Container>
        <SectionHeading
          eyebrow={CHALLENGE.eyebrow}
          headline={CHALLENGE.headline}
          body={CHALLENGE.body}
        />

        <Stagger
          as="ul"
          delay={0.15}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CHALLENGE.items.map((item) => (
            <StaggerItem
              as="li"
              key={item.index}
              className="flex flex-col bg-cream-200 p-7"
            >
              <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-green-800">
                {item.index}
              </span>
              <h3 className="mt-5 text-display-sm text-ink">{item.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">
                {item.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
