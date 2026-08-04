import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ModuleGlyph } from "@/components/ui/ModuleGlyph";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MODULES_SECTION } from "@/content/home";
import { MODULES } from "@/content/modules";
import { ROUTES } from "@/lib/constants";

export function Modules() {
  return (
    <Section tone="paper" id="modulos">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={MODULES_SECTION.eyebrow}
            headline={MODULES_SECTION.headline}
            body={MODULES_SECTION.body}
            className="lg:max-w-2xl"
          />

          <Reveal delay={0.25} className="shrink-0">
            <ButtonLink href={ROUTES.productos} variant="secondary">
              {MODULES_SECTION.cta}
              <ArrowRight
                aria-hidden
                strokeWidth={1.75}
                className="size-[1.125rem] transition-transform duration-(--duration-base) group-hover:translate-x-1"
              />
            </ButtonLink>
          </Reveal>
        </div>

        <Stagger
          as="ul"
          delay={0.15}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {MODULES.map((module) => (
            <StaggerItem as="li" key={module.id}>
              <Link
                href={`${ROUTES.productos}#${module.id}`}
                className="group flex h-full flex-col rounded-2xl border border-ink/12 bg-cream-50 p-6 transition-[border-color,transform,box-shadow] duration-(--duration-base) ease-(--ease-entrance) hover:-translate-y-1 hover:border-green-500/45 hover:shadow-[0_18px_40px_-20px_rgba(11,8,17,0.3)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-green-50 text-green-700 transition-colors duration-(--duration-base) group-hover:bg-green-500 group-hover:text-cream-50">
                    <ModuleGlyph icon={module.icon} />
                  </span>
                  <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-ink-300">
                    {module.index}
                  </span>
                </div>

                {/* Primero el beneficio, después el nombre del módulo. */}
                <h3 className="mt-6 text-[1.0625rem] font-bold leading-snug tracking-tight text-ink">
                  {module.benefit}
                </h3>
                <p className="mt-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-green-800">
                  {module.name}
                </p>

                <p className="mt-4 flex-1 text-[0.875rem] leading-relaxed text-ink-500">
                  {module.summary}
                </p>

                <span className="mt-6 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-green-800">
                  Conocer solución
                  <ArrowRight
                    aria-hidden
                    strokeWidth={2}
                    className="size-3.5 transition-transform duration-(--duration-base) group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
