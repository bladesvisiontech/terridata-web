import { BarChart3, Check, Clock, Coins, Users, type LucideIcon } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BENEFITS, type BenefitIcon } from "@/content/home";

/**
 * Misma familia de iconos que `ModuleGlyph`, con la misma insignia
 * (`bg-green-50 text-green-700`, `rounded-xl`) que usa el acordeón de
 * módulos para su icono en reposo: los resultados son consecuencia de
 * los módulos, así que comparten el lenguaje visual.
 */
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
        <SectionHeading eyebrow={BENEFITS.eyebrow} headline={BENEFITS.headline} />

        <Stagger
          as="ul"
          delay={0.12}
          step={0.06}
          className="mt-12 grid gap-5 sm:grid-cols-2"
        >
          {BENEFITS.categories.map((category) => {
            const Glyph = GLYPHS[category.icon];
            return (
              <StaggerItem
                as="li"
                key={category.id}
                className="rounded-2xl border border-ink/12 bg-cream-50 p-6 sm:p-7"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <Glyph aria-hidden strokeWidth={1.5} className="size-6" />
                </span>

                <h3 className="mt-5 text-display-sm text-ink">{category.title}</h3>

                <ul className="mt-4 flex flex-col gap-2.5">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-green-500"
                      >
                        <Check strokeWidth={3} className="size-3 text-cream-50" />
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
