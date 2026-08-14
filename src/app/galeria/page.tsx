import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/Button";
import { BrandImage } from "@/components/ui/BrandImage";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { MediaKey } from "@/content/media";
import { CONTACT, WHATSAPP_INTENTS, whatsappUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Galería",
  description:
    "Paisajes de referencia del territorio colombiano que Terridata atiende, mientras se incorpora material propio de los municipios cliente.",
};

/**
 * PROVISIONAL: todas las fotos de esta página son de banco (ver
 * `src/content/media.ts` y créditos de autor). Ninguna se presenta
 * como un municipio cliente real: de ahí el pie "paisaje de
 * referencia" en cada una. Se reemplazan por material propio cuando
 * Terridata lo aporte.
 */
const GALLERY: MediaKey[] = [
  "heroTerritorio",
  "territorioRural",
  "tramaUrbana",
  "paisajeAndino",
  "ciudadCaribe",
  "moduloVisor",
  "equipoTecnico",
  "ciudadanoDigital",
  "moduloCatastral",
  "moduloPlaneacion",
  "moduloAnalitica",
  "moduloPortal",
];

export default function GaleriaPage() {
  return (
    <Section tone="paper" backdrop="dots">
      <Container>
        <Eyebrow>Galería</Eyebrow>
        <h1 className="mt-5 max-w-2xl text-display-lg text-ink text-balance">
          El territorio que Terridata atiende
        </h1>
        <p className="mt-6 max-w-xl text-lead text-ink-700">
          Mientras incorporamos material propio de los municipios cliente, esta galería
          reúne paisajes de referencia del territorio colombiano y del trabajo técnico
          detrás del sistema.
        </p>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY.map((key) => (
            <li key={key} className="group relative overflow-hidden rounded-md">
              <BrandImage
                media={key}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="aspect-[4/3]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-3 opacity-0 transition-opacity duration-(--duration-base) group-hover:opacity-100">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-cream-50">
                  Paisaje de referencia
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-start gap-4 border-t border-ink/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[0.9375rem] leading-relaxed text-ink-500">
            ¿Su municipio ya trabaja con Terridata y quiere aparecer aquí con material
            propio? Escríbanos.
          </p>
          <ButtonLink href={whatsappUrl(WHATSAPP_INTENTS.advisor)} external variant="secondary">
            Hablar con un asesor
          </ButtonLink>
        </div>

        <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-300">
          Contacto: {CONTACT.email}
        </p>
      </Container>
    </Section>
  );
}
