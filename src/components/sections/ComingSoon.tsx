import { ArrowLeft, MessageCircle } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { ROUTES, WHATSAPP_INTENTS, whatsappUrl } from "@/lib/constants";

/**
 * Marcador para las páginas de la fase 2.
 *
 * Existe para que ningún enlace del menú lleve a un 404 mientras el
 * resto del sitio se construye. Se borra en cuanto cada página tenga
 * su contenido real.
 */
export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Section tone="paper" className="min-h-[70dvh]">
      <Container>
        <div className="max-w-2xl">
          <Reveal trigger="mount">
            <Eyebrow>En preparación</Eyebrow>
          </Reveal>

          <TextReveal
            as="h1"
            trigger="mount"
            delay={0.1}
            lines={[title]}
            className="mt-6 text-display-lg text-ink"
          />

          <Reveal trigger="mount" delay={0.3}>
            <p className="mt-6 text-lead text-ink-700">{description}</p>
          </Reveal>

          <Reveal trigger="mount" delay={0.42}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={whatsappUrl(WHATSAPP_INTENTS.advisor)} external>
                <MessageCircle aria-hidden strokeWidth={1.75} className="size-4" />
                Hablar con un asesor
              </ButtonLink>
              <ButtonLink href={ROUTES.home} variant="secondary">
                <ArrowLeft aria-hidden strokeWidth={1.75} className="size-4" />
                Volver al inicio
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
