import {
  AlertTriangle,
  BarChart3,
  Briefcase,
  Coins,
  Compass,
  Layers,
  LifeBuoy,
  Map,
  MapPinned,
  Receipt,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { ModuleIcon } from "@/content/modules";
import { cn } from "@/lib/utils";

/**
 * Una sola familia de iconos, un solo grosor de trazo.
 * Nada de emoji como icono estructural.
 */
const GLYPHS: Record<ModuleIcon, LucideIcon> = {
  map: Map,
  layers: Layers,
  coins: Coins,
  receipt: Receipt,
  compass: Compass,
  briefcase: Briefcase,
  chart: BarChart3,
  users: Users,
  alert: AlertTriangle,
  region: MapPinned,
  support: LifeBuoy,
};

type ModuleGlyphProps = {
  icon: ModuleIcon;
  className?: string;
};

export function ModuleGlyph({ icon, className }: ModuleGlyphProps) {
  const Glyph = GLYPHS[icon];
  return <Glyph aria-hidden strokeWidth={1.5} className={cn("size-6", className)} />;
}
