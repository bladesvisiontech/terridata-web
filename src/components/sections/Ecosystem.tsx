import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LayerStack } from "@/components/visuals/LayerStack";
import { ECOSYSTEM } from "@/content/home";

export function Ecosystem() {
  return (
    <Section tone="paper">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow={ECOSYSTEM.eyebrow}
              headline={ECOSYSTEM.headline}
              body={ECOSYSTEM.body}
            />

            <Reveal delay={0.3}>
              <blockquote className="mt-9 border-l-2 border-green-500 pl-6">
                <p className="text-[1.0625rem] leading-relaxed text-ink-700">
                  {ECOSYSTEM.narrative}
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="mt-7 text-[0.9375rem] leading-relaxed text-ink-500">
                {ECOSYSTEM.outcome}
              </p>
            </Reveal>
          </div>

          <LayerStack />
        </div>
      </Container>
    </Section>
  );
}
