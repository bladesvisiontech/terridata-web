import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { STATS_BAND, TRUST } from "@/content/home";

/**
 * Confianza y cifras, encadenadas.
 *
 * Primero quién ya trabaja con Terridata y después las cifras, sobre
 * el verde de marca y con el bisel del sistema. Es la única superficie
 * de color macizo de la página: funciona como respiro entre el
 * mosaico del hero y el bloque de retos.
 */
export function TrustBand() {
  return (
    <Section tone="paper" spacing="tight">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-ink/10 pb-8 sm:flex-row sm:items-center sm:gap-10">
            <p className="eyebrow shrink-0 text-ink-500">{TRUST.label}</p>
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-2.5">
              {TRUST.entities.map((entity) => (
                <li key={entity} className="text-base font-semibold text-ink-700">
                  {entity}
                </li>
              ))}
              <li className="font-mono text-[0.8125rem] text-ink-300">
                {TRUST.upcoming}
              </li>
            </ul>
          </div>
        </Reveal>

        <Stagger
          as="dl"
          delay={0.12}
          className="notch-diag mt-10 grid gap-y-10 bg-green-500 px-8 py-12 sm:grid-cols-3 sm:px-12 lg:px-16"
        >
          {STATS_BAND.map((stat) => (
            <StaggerItem key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <Counter
                  to={stat.value}
                  suffix={stat.suffix}
                  className="block text-display-xl leading-none text-cream-50"
                />
                <span className="mx-auto mt-3 block max-w-[13rem] text-[0.875rem] leading-snug text-cream-50/80">
                  {stat.label}
                </span>
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
