import { Audience } from "@/components/sections/Audience";
import { Benefits } from "@/components/sections/Benefits";
import { Cases } from "@/components/sections/Cases";
import { Challenge } from "@/components/sections/Challenge";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Experience } from "@/components/sections/Experience";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Modularity } from "@/components/sections/Modularity";
import { Modules } from "@/components/sections/Modules";
import { TrustBand } from "@/components/sections/TrustBand";
import { TechSurface } from "@/components/ui/TechSurface";

/**
 * El recorrido de la página sigue el argumento del guion comercial:
 * problema → concepto → capacidades → adaptabilidad → resultados →
 * a quién sirve → por qué nosotros → prueba → conversión.
 */
export default function HomePage() {
  return (
    <>
      {/* La superficie técnica cubre el tramo de apertura de una sola
          pieza —por secciones, cada una repetiría sus halos y dejaría
          costura en cada frontera— y se corta justo donde arranca el
          bloque de retos. */}
      <TechSurface>
        <Hero />
        <TrustBand />
      </TechSurface>

      <Challenge />
      <Ecosystem />
      <Modules />
      <Modularity />
      <Benefits />
      <Audience />
      <Experience />
      <Cases />
      <FinalCta />
    </>
  );
}
