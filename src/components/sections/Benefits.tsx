import { BarChart3, Check, Clock, Coins, Users, type LucideIcon } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BENEFITS, type BenefitIcon } from "@/content/home";

const GLYPHS: Record<BenefitIcon, LucideIcon> = {
  coins: Coins,
  clock: Clock,
  chart: BarChart3,
  users: Users,
};

export function Benefits() {
  return (
    <Section tone="cream" spacing="tight">
      <Container>
        <SectionHeading headline={BENEFITS.headline} />

        <Stagger
          as="ul"
          delay={0.12}
          step={0.06}
          className="mt-12 grid gap-5 sm:grid-cols-2"
        >
          {BENEFITS.categories.map((category) => {
            const Glyph = GLYPHS[category.icon];
            return (
              <StaggerItem as="li" key={category.id}>
                <div className="flex h-full flex-col gap-5 rounded-lg border border-ink/12 bg-cream-50 p-7 transition-[border-color,transform] duration-(--duration-base) ease-(--ease-entrance) hover:-translate-y-0.5 hover:border-green-500/45">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm bg-green-50 text-green-700">
                      <Glyph aria-hidden strokeWidth={1.75} className="size-4.5" />
                    </span>
                    <h3 className="text-display-sm text-ink">{category.title}</h3>
                  </div>

                  <ul className="flex flex-col gap-3 border-t border-ink/10 pt-5">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check
                          aria-hidden
                          strokeWidth={2.25}
                          className="mt-0.5 size-4 shrink-0 text-green-700"
                        />
                        <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
