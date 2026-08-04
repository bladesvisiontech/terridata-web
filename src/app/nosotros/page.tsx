import type { Metadata } from "next";

import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Tecnología desarrollada desde el acompañamiento directo a administraciones públicas colombianas.",
};

export default function Page() {
  return (
    <ComingSoon
      title="Más de 20 años en gestión territorial"
      description="Tecnología desarrollada desde el acompañamiento directo a administraciones públicas colombianas."
    />
  );
}
