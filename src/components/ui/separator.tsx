import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Versión simplificada del Separator de shadcn/ui: el original usa
 * `@radix-ui/react-separator`, que esta prueba no instala porque
 * Card/Badge no lo necesitan. El único comportamiento que se pierde
 * es `decorative`; el `role` y `aria-orientation` se declaran a mano.
 */
function Separator({
  className,
  orientation = "horizontal",
  ...props
}: ComponentProps<"div"> & { orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      data-slot="separator"
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "bg-border shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
