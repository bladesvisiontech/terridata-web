import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  headline: readonly string[];
  body?: string;
  tone?: "default" | "inverse";
  align?: "start" | "center";
  className?: string;
  as?: "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  headline,
  body,
  tone = "default",
  align = "start",
  className,
  as = "h2",
}: SectionHeadingProps) {
  const inverse = tone === "inverse";

  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}

      <TextReveal
        as={as}
        lines={headline}
        delay={0.08}
        className={cn(
          "mt-5 text-display-lg text-balance",
          inverse ? "text-cream-50" : "text-ink",
        )}
      />

      {body ? (
        <Reveal delay={0.2}>
          <p
            className={cn(
              "mt-6 text-lead",
              align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
              inverse ? "text-cream-50/75" : "text-ink-700",
            )}
          >
            {body}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
