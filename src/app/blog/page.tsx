import type { Metadata } from "next";

import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos sobre inteligencia territorial, catastro multipropósito, recaudo municipal y gobierno digital.",
};

export default function Page() {
  return (
    <ComingSoon
      title="Conocimiento para fortalecer la gestión pública"
      description="Artículos sobre inteligencia territorial, catastro multipropósito, recaudo municipal y gobierno digital."
    />
  );
}
