import type { Metadata } from "next";

import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Productos",
  description: "Visor Geográfico, Gestión Catastral, Gestión Tributaria, Cartera y Cobro, Planeación y Urbanismo, Hacienda e Industria y Comercio, Analítica Territorial y Portal Ciudadano. Cada uno se activa de forma independiente sobre la información que su municipio ya tiene cargada.",
};

export default function Page() {
  return (
    <ComingSoon
      title="Los ocho módulos del ecosistema Terridata"
      description="Visor Geográfico, Gestión Catastral, Gestión Tributaria, Cartera y Cobro, Planeación y Urbanismo, Hacienda e Industria y Comercio, Analítica Territorial y Portal Ciudadano. Cada uno se activa de forma independiente sobre la información que su municipio ya tiene cargada."
    />
  );
}
