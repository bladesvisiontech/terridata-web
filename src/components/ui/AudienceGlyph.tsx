import { Building2, Compass, Landmark, LandPlot, Wallet, Zap, type LucideIcon } from "lucide-react";

import type { AudienceIcon } from "@/content/home";
import { cn } from "@/lib/utils";

/** Misma familia y grosor de trazo que `ModuleGlyph`: un solo lenguaje de iconos en todo el sitio. */
const GLYPHS: Record<AudienceIcon, LucideIcon> = {
  landmark: Landmark,
  wallet: Wallet,
  compass: Compass,
  landPlot: LandPlot,
  building: Building2,
  zap: Zap,
};

type AudienceGlyphProps = {
  icon: AudienceIcon;
  className?: string;
};

export function AudienceGlyph({ icon, className }: AudienceGlyphProps) {
  const Glyph = GLYPHS[icon];
  return <Glyph aria-hidden strokeWidth={1.5} className={cn("size-5", className)} />;
}
