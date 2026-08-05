import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TextReveal } from "@/components/motion/TextReveal";
import { BrandImage } from "@/components/ui/BrandImage";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { MODULARITY } from "@/content/home";

/**
 * El argumento comercial más fuerte del guion, y por eso la única
 * sección oscura de la página: rompe el ritmo y se queda.
 */
export function Modularity() {
  return (
    <Section tone="deep" notch="diag">
      {/* El territorio de fondo, muy contenido: es la sección donde el
          argumento pesa más que la imagen. */}
      <BrandImage
        media="territorioRural"
        treatment="duotone"
        scrim="full"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
      />
      <Container>
        <div className="max-w-4xl">
          <Reveal>
            <Eyebrow tone="inverse">{MODULARITY.eyebrow}</Eyebrow>
          </Reveal>

          <TextReveal
            lines={MODULARITY.headline}
            delay={0.08}
            className="mt-5 text-display-lg text-balance text-cream-50/60"
          />

          <TextReveal
            as="p"
            lines={[MODULARITY.headlineAccent]}
            delay={0.28}
            className="mt-2 text-display-lg text-balance text-cream-50"
          />
        </div>

        <Stagger
          as="ul"
          delay={0.2}
          className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {MODULARITY.pillars.map((pillar) => (
            <StaggerItem as="li" key={pillar.index}>
              <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-cream-300">
                {pillar.index}
              </span>
              <div aria-hidden className="mt-4 h-px w-full bg-cream-50/20" />
              <h3 className="mt-6 text-display-sm text-cream-50">{pillar.title}</h3>
              <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-cream-50/70">
                {pillar.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
