import { Mail, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { CONTACT, WHATSAPP_INTENTS, whatsappUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbanos y un asesor de Terridata le muestra cómo integrar la información catastral, tributaria y urbanística de su municipio en un solo sistema.",
};

export default function ContactoPage() {
  return (
    <Section tone="paper" backdrop="dots">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Eyebrow>Hablemos</Eyebrow>
            <h1 className="mt-5 text-display-lg text-ink text-balance">
              Conversemos sobre el futuro de su municipio
            </h1>
            <p className="mt-6 max-w-md text-lead text-ink-700">
              Cuéntenos qué necesita resolver su entidad. Un asesor le responde en el
              transcurso del siguiente día hábil con los módulos que le aplican.
            </p>

            <div className="mt-10 flex flex-col gap-4 border-t border-ink/10 pt-8">
              <a
                href={whatsappUrl(WHATSAPP_INTENTS.advisor)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[0.9375rem] text-ink-700 transition-colors duration-(--duration-base) hover:text-green-800"
              >
                <MessageCircle aria-hidden strokeWidth={1.75} className="size-5 text-green-700" />
                {CONTACT.whatsapp.display}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 text-[0.9375rem] text-ink-700 transition-colors duration-(--duration-base) hover:text-green-800"
              >
                <Mail aria-hidden strokeWidth={1.75} className="size-5 text-green-700" />
                {CONTACT.email}
              </a>
              <p className="mt-2 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-ink-300">
                {CONTACT.schedule}
              </p>
            </div>

            <div className="mt-10 rounded-lg border border-ink/12 bg-cream-50 p-6">
              <p className="text-[0.875rem] leading-relaxed text-ink-500">
                ¿Prefiere una respuesta inmediata? Escríbanos por WhatsApp y le atendemos en
                minutos.
              </p>
              <ButtonLink
                href={whatsappUrl(WHATSAPP_INTENTS.advisor)}
                external
                variant="secondary"
                className="mt-4"
              >
                Hablar con un asesor
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-lg border border-ink/12 bg-cream-50/60 p-6 sm:p-9">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
