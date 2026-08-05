import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlatformFrame } from "@/components/visuals/PlatformFrame";
import {
  DiagnosticCard,
  LiquidationCard,
} from "@/components/visuals/ProductCards";
import { SHOWCASE } from "@/content/home";

/**
 * El producto en el centro y sus resultados a los lados.
 *
 * En pantallas anchas las tarjetas se solapan sobre el visor: dan
 * sensación de capas, que es exactamente la idea del producto. Por
 * debajo de `lg` el solape desaparece y todo se apila, porque en una
 * columna estrecha un solape solo tapa contenido.
 */
export function Showcase() {
  return (
    <Section tone="paper">
      <Container>
        <SectionHeading
          eyebrow={SHOWCASE.eyebrow}
          headline={SHOWCASE.headline}
          body={SHOWCASE.body}
          align="center"
        />

        <div className="relative mt-16">
          {/* El visor se estrecha para que el solape de las tarjetas
              caiga sobre el mapa y no sobre el panel de capas ni sobre
              la ficha del predio, que son lo que hay que poder leer. */}
          <div className="mx-auto lg:w-[63%]">
            <PlatformFrame />
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:mt-0 lg:block">
            <DiagnosticCard className="lg:absolute lg:left-0 lg:top-1/2 lg:w-[16.5rem] lg:-translate-y-1/2" />
            <LiquidationCard className="lg:absolute lg:right-0 lg:top-1/2 lg:w-[16.5rem] lg:-translate-y-1/2" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
