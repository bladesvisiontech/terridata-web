import { FileText } from "lucide-react";
import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { CONTACT, ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre inteligencia territorial, catastro multipropósito, recaudo municipal y gobierno digital.",
};

const TOPICS = [
  "Catastro multipropósito",
  "Recaudo y gestión tributaria",
  "Ordenamiento territorial",
  "Transformación digital municipal",
];

/**
 * PENDIENTE: sin artículos publicados todavía. El diseño ya está listo
 * para recibir el primer post (grid de tarjetas por fecha/tema); esta
 * vista es el estado vacío mientras Terridata entrega el contenido.
 */
export default function BlogPage() {
  return (
    <Section tone="paper" backdrop="dots" className="min-h-[70dvh]">
      <Container>
        <Eyebrow>Blog</Eyebrow>
        <h1 className="mt-5 max-w-2xl text-display-lg text-ink text-balance">
          Conocimiento para fortalecer la gestión pública
        </h1>
        <p className="mt-6 max-w-xl text-lead text-ink-700">
          Estamos preparando los primeros artículos sobre los temas que más consultan las
          entidades que ya trabajan con Terridata.
        </p>

        <ul className="mt-10 flex flex-wrap gap-2">
          {TOPICS.map((topic) => (
            <li
              key={topic}
              className="rounded-full border border-ink/15 px-3.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-500"
            >
              {topic}
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-start gap-4 rounded-lg border border-ink/12 bg-cream-50 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <FileText aria-hidden strokeWidth={1.5} className="mt-0.5 size-6 text-green-700" />
            <div>
              <p className="text-[0.9375rem] font-medium text-ink">
                Los primeros artículos llegan pronto.
              </p>
              <p className="mt-1 text-[0.875rem] text-ink-500">
                Escríbanos a {CONTACT.email} si quiere que avisemos cuando se publiquen.
              </p>
            </div>
          </div>
          <ButtonLink href={ROUTES.contacto} variant="secondary" className="shrink-0">
            Escribirnos
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
