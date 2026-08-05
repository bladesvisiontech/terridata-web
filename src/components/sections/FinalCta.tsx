import { ArrowRight, MessageCircle } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { FINAL_CTA } from "@/content/home";
import { ROUTES, WHATSAPP_INTENTS, whatsappUrl } from "@/lib/constants";

export function FinalCta() {
  return (
    <Section tone="deep" notch="top">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow tone="inverse" className="justify-center">
              {FINAL_CTA.eyebrow}
            </Eyebrow>
          </Reveal>

          <TextReveal
            lines={FINAL_CTA.headline}
            delay={0.08}
            className="mt-6 text-display-lg text-balance text-cream-50"
          />

          <Reveal delay={0.25}>
            <p className="mx-auto mt-7 max-w-2xl text-lead text-cream-50/75">
              {FINAL_CTA.body}
            </p>
          </Reveal>

          <Reveal delay={0.38}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink
                href={whatsappUrl(WHATSAPP_INTENTS.demo)}
                external
                variant="inverse"
                size="lg"
              >
                <MessageCircle aria-hidden strokeWidth={1.75} className="size-[1.125rem]" />
                Solicitar demostración
              </ButtonLink>

              <ButtonLink
                href={ROUTES.contacto}
                size="lg"
                className="border border-cream-50/25 bg-transparent text-cream-50 hover:bg-cream-50/10"
              >
                Hablar con un asesor
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-[1.125rem] transition-transform duration-(--duration-base) group-hover:translate-x-1"
                />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
