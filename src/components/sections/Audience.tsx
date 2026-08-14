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
        <SectionHeading headline={AUDIENCE.headline} align="center" />

        <Stagger
          as="ul"
          delay={0.15}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {AUDIENCE.items.map((item) => (
            <StaggerItem as="li" key={item.role}>
              <div className="flex h-full flex-col gap-3 rounded-lg border border-ink/12 bg-cream-50 p-7 transition-[border-color,transform] duration-(--duration-base) ease-(--ease-entrance) hover:-translate-y-0.5 hover:border-green-500/45">
                <span className="inline-flex size-9 items-center justify-center rounded-sm bg-green-50 text-green-700">
                  <AudienceGlyph icon={item.icon} className="size-4.5" />
                </span>
                <h3 className="mt-1 text-display-sm text-ink">{item.role}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-ink-500">
                  {item.value}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
