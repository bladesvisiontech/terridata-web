import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BrandImage } from "@/components/ui/BrandImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CHALLENGE } from "@/content/home";

export function Challenge() {
  return (
    <Section tone="paper">
      <Container>
        <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <SectionHeading
            eyebrow={CHALLENGE.eyebrow}
            headline={CHALLENGE.headline}
            body={CHALLENGE.body}
          />

          <Reveal delay={0.2} distance={26}>
            <BrandImage
              media="retoDispersion"
              sizes="(max-width: 1024px) 100vw, 560px"
              className="aspect-[4/3] rounded-2xl lg:aspect-[5/4]"
            />
          </Reveal>
        </div>

        <Stagger
          as="ul"
          delay={0.15}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CHALLENGE.items.map((item) => (
            <StaggerItem
              as="li"
              key={item.index}
              className="flex flex-col bg-cream-50 p-7"
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
