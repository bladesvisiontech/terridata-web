import type { Metadata } from "next";

import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Galería",
  description: "Capturas del sistema en funcionamiento e imágenes de los municipios que ya trabajan con Terridata.",
};

export default function Page() {
  return (
    <ComingSoon
      title="La plataforma y los territorios donde opera"
      description="Capturas del sistema en funcionamiento e imágenes de los municipios que ya trabajan con Terridata."
    />
  );
}
