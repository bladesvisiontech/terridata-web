import clsx, { type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Los tamaños propios de `tokens.css` hay que registrarlos aquí.
 *
 * Sin esto, tailwind-merge toma `text-display-xl` por una clase de
 * color y `cn("text-display-xl", "text-cream-50")` descarta el
 * tamaño: el titular se queda en 16 px.
 *
 * Al añadir un tamaño nuevo a tokens.css, añadirlo también aquí.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["display-xl", "display-lg", "display-md", "display-sm", "lead", "label"],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
