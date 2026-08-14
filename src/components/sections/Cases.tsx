import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BrandImage } from "@/components/ui/BrandImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CASES } from "@/content/home";

/**
 * Las cifras de resultado (`metric`) llegan en null a propósito:
 * están marcadas «por validar públicamente» en el documento fuente.
 * La tarjeta se sostiene sin ellas y las muestra en cuanto Terridata
 * confirme la autorización de cada entidad.
 */
export function Cases() {
  return (
    <Section tone="paper">
      <Container>
        <SectionHeading headline={CASES.headline} className="max-w-3xl" />

        <Stagger as="ul" delay={0.15} className="mt-14 grid gap-5 lg:grid-cols-2">
          {CASES.items.map((item) => (
            <StaggerItem
              as="li"
              key={item.id}
              className="flex flex-col overflow-hidden rounded-lg border border-ink/12 bg-cream-50"
            >
              {/* Fotografía de ambientación, no del municipio real: el
                  material propio lo tiene que aportar el cliente. Por eso
                  el pie dice «paisaje de referencia» y no el nombre del
                  municipio. La proporción está fijada para que la foto
                  definitiva no desplace nada al entrar. */}
              <div className="relative">
                <BrandImage
                  media={item.image}
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="aspect-[16/9] w-full"
                />
                <span className="absolute bottom-3 right-3 rounded-full bg-ink/55 px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-cream-50 backdrop-blur-sm">
                  Paisaje de referencia
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-baseline gap-2.5">
                  <h3 className="text-display-sm text-ink">{item.municipality}</h3>
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-300">
                    {item.department}
                  </span>
                </div>

                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">
                  {item.summary}
                </p>

                {item.metric ? (
                  <p className="mt-6 flex items-baseline gap-2.5">
                    <span
                      className="text-display-md font-extrabold text-green-800"
                      data-tabular
                    >
                      {item.metric.value}
                    </span>
                    <span className="text-[0.875rem] text-ink-500">
                      {item.metric.label}
                    </span>
                  </p>
                ) : null}

                <ul className="mt-7 flex flex-wrap gap-2 border-t border-ink/10 pt-5">
                  {item.modules.map((module) => (
                    <li
                      key={module}
                      className="rounded-full bg-green-50 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-green-800"
                    >
                      {module}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
