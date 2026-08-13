import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { AudienceGlyph } from "@/components/ui/AudienceGlyph";
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
              className="group flex h-full flex-col rounded-2xl border border-ink/12 p-7 transition-[border-color,background-color,transform,box-shadow] duration-(--duration-base) ease-(--ease-entrance) hover:-translate-y-1 hover:border-green-500/45 hover:bg-green-50/50 hover:shadow-card"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <AudienceGlyph icon={item.icon} />
              </span>

              <h3 className="mt-5 text-display-sm text-ink">{item.role}</h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-500">
                {item.value}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
