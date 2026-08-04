import type { Metadata } from "next";

import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Mientras habilitamos el formulario, puede escribirnos directamente por WhatsApp y le respondemos el mismo día.",
};

export default function Page() {
  return (
    <ComingSoon
      title="Conversemos sobre el futuro de su municipio"
      description="Mientras habilitamos el formulario, puede escribirnos directamente por WhatsApp y le respondemos el mismo día."
    />
  );
}
