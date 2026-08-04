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
import { Showcase } from "@/components/sections/Showcase";
import { TrustBand } from "@/components/sections/TrustBand";

/**
 * El recorrido de la página sigue el argumento del guion comercial:
 * problema → concepto → capacidades → adaptabilidad → resultados →
 * a quién sirve → por qué nosotros → prueba → conversión.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBand />
      <Challenge />
      <Showcase />
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
