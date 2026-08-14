import { BarChart3, Check, Clock, Coins, Users, type LucideIcon } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Separator } from "@/components/ui/separator";
import { BENEFITS, type BenefitIcon } from "@/content/home";

/**
 * PRUEBA — shadcn/ui.
 *
 * Reemplaza la tarjeta a mano (borde + insignia cuadrada) por la
 * composición `Card`/`CardHeader`/`CardContent` de shadcn/ui, con sus
 * mismos tokens semánticos (`bg-card`, `shadow-sm`, `rounded-xl`) y
 * microinteracciones (`hover:shadow-md`, anillo de foco). Los colores
 * siguen siendo los cuatro de marca — ver el puente en `tokens.css`.
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
              <StaggerItem as="li" key={category.id}>
                <Card className="h-full gap-4 transition-[box-shadow,border-color,transform] duration-(--duration-base) ease-(--ease-entrance) hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                  <CardHeader>
                    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Glyph aria-hidden strokeWidth={1.75} className="size-4.5" />
                    </span>
                    <CardTitle className="mt-4 text-display-sm text-ink">
                      {category.title}
                    </CardTitle>
                  </CardHeader>

                  <Separator />

                  <CardContent>
                    <ul className="flex flex-col gap-3">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Badge
                            variant="secondary"
                            className="mt-0.5 size-4.5 shrink-0 rounded-full p-0 [&>svg]:size-2.5"
                          >
                            <Check aria-hidden strokeWidth={3} />
                          </Badge>
                          <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
