import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "md" | "lg";

/**
 * Contraste verificado sobre los fondos del sitio:
 *   crema 50 / tinta ............ 19.4:1
 *   verde 500 / crema 50 .......  4.8:1  (texto blanco sobre verde)
 *   verde 800 / crema 200 ......  8.9:1
 *
 * El verde 500 nunca se usa como color de texto sobre crema 200:
 * ahí da 4.0:1 y no pasa AA. Para texto sobre crema va el verde 800.
 */
const VARIANT_CLASS: Record<Variant, string> = {
  primary:
    "bg-green-500 text-cream-50 hover:bg-green-600 active:bg-green-700 shadow-[0_1px_2px_rgba(11,8,17,0.12)]",
  secondary:
    "bg-transparent text-green-800 border border-green-800/30 hover:border-green-800/70 hover:bg-green-50",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
  inverse: "bg-cream-50 text-green-900 hover:bg-cream-200",
};

const SIZE_CLASS: Record<Size, string> = {
  // min-h-11 = 44 px: el mínimo táctil de la HIG.
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-13 px-7 text-base",
};

const BASE =
  "group relative inline-flex items-center justify-center gap-2.5 font-semibold " +
  "cursor-pointer select-none rounded-md " +
  "transition-[background-color,border-color,color,transform] duration-(--duration-base) " +
  "ease-(--ease-entrance) active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-50";

type ButtonAsLink = {
  href: string;
  external?: boolean;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  external = false,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonAsLink) {
  const classes = cn(BASE, VARIANT_CLASS[variant], SIZE_CLASS[size], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & ComponentProps<"button">;

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(BASE, VARIANT_CLASS[variant], SIZE_CLASS[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
