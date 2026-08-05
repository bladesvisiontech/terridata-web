import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { MODULES } from "@/content/modules";
import {
  COMPANY,
  CONTACT,
  LEGAL_LINKS,
  NAV_ITEMS,
  PLATFORM_ACCESS,
  ROUTES,
  SOCIAL_LINKS,
  WHATSAPP_INTENTS,
  whatsappUrl,
} from "@/lib/constants";

const currentYear = new Date().getFullYear();

/** Solo se listan las redes que ya tienen URL confirmada. */
const activeSocials = SOCIAL_LINKS.flatMap((social) =>
  social.href ? [{ label: social.label, href: social.href }] : [],
);

export function Footer() {
  return (
    <footer className="relative isolate overflow-clip bg-green-900 text-cream-50">
      <Container className="py-(--spacing-section-tight)">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="inverse" showTagline />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-cream-50/70">
              {COMPANY.claim}. Integramos información, tecnología y conocimiento
              para fortalecer la gestión pública en {COMPANY.country}.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={whatsappUrl(WHATSAPP_INTENTS.advisor)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2.5 text-[0.9375rem] font-medium text-cream-50 transition-colors hover:text-cream-300"
              >
                <MessageCircle aria-hidden strokeWidth={1.75} className="size-4" />
                WhatsApp {CONTACT.whatsapp.display}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex min-h-11 items-center gap-2.5 text-[0.9375rem] font-medium text-cream-50 transition-colors hover:text-cream-300"
              >
                <Phone aria-hidden strokeWidth={1.75} className="size-4" />
                {CONTACT.email}
              </a>
            </div>
          </div>

          <nav aria-label="Ecosistema">
            <h2 className="eyebrow text-cream-300">Ecosistema</h2>
            <ul className="mt-4 flex flex-col gap-0.5">
              {MODULES.map((module) => (
                <li key={module.id}>
                  <Link
                    href={`${ROUTES.productos}#${module.id}`}
                    className="inline-flex min-h-8 items-center text-[0.875rem] leading-snug text-cream-50/70 transition-colors hover:text-cream-50"
                  >
                    {module.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Empresa">
            <h2 className="eyebrow text-cream-300">Empresa</h2>
            <ul className="mt-4 flex flex-col gap-0.5">
              {NAV_ITEMS.filter((item) => item.href !== ROUTES.home).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-8 items-center text-[0.875rem] text-cream-50/70 transition-colors hover:text-cream-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {activeSocials.length > 0 ? (
              <>
                <h2 className="eyebrow mt-8 text-cream-300">Redes</h2>
                <ul className="mt-4 flex flex-col gap-0.5">
                  {activeSocials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-8 items-center text-[0.875rem] text-cream-50/70 transition-colors hover:text-cream-50"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </nav>

          <div>
            <h2 className="eyebrow text-cream-300">Acceso a la plataforma</h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {PLATFORM_ACCESS.map((access) => (
                <li key={access.id}>
                  <a
                    href={access.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 items-center rounded-xl border border-cream-50/20 px-4 text-[0.875rem] font-semibold text-cream-50 transition-colors hover:border-cream-300/60 hover:bg-cream-50/5"
                  >
                    {access.label}
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="eyebrow mt-8 text-cream-300">Información legal</h2>
            <ul className="mt-4 flex flex-col gap-0.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-8 items-center text-[0.875rem] leading-snug text-cream-50/70 transition-colors hover:text-cream-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream-50/15 pt-7 text-[0.8125rem] text-cream-50/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {COMPANY.legalName}. Todos los derechos reservados.
          </p>
          <p>
            Tratamiento de datos conforme a la Ley 1581 de 2012 (habeas data).
          </p>
        </div>
      </Container>
    </footer>
  );
}
