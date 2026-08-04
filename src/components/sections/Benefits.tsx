import { Check } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BENEFITS } from "@/content/home";

export function Benefits() {
  return (
    <Section tone="cream" spacing="tight">
      <Container>
        <SectionHeading eyebrow={BENEFITS.eyebrow} headline={BENEFITS.headline} />

        <Stagger
          as="ul"
          delay={0.12}
          step={0.045}
          className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-2"
        >
          {BENEFITS.items.map((benefit) => (
            <StaggerItem
              as="li"
              key={benefit}
              className="flex items-center gap-3.5 border-b border-ink/12 pb-4"
            >
              <span
                aria-hidden
                className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-green-500"
              >
                <Check strokeWidth={3} className="size-3.5 text-cream-50" />
              </span>
              <span className="text-[0.9375rem] font-medium text-ink">{benefit}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
