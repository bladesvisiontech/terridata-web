"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AccessMenu } from "@/components/layout/AccessMenu";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import {
  COMPANY,
  NAV_ITEMS,
  PLATFORM_ACCESS,
  ROUTES,
  WHATSAPP_INTENTS,
  whatsappUrl,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // El fondo sólido solo aparece cuando la página ya se movió: sobre
  // el hero el header va transparente.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea el scroll del cuerpo mientras el panel móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#contenido"
        className={cn(
          "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]",
          "focus:rounded-full focus:bg-green-800 focus:px-5 focus:py-3",
          "focus:text-sm focus:font-semibold focus:text-cream-50",
        )}
      >
        Saltar al contenido
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          "transition-[background-color,border-color,backdrop-filter] duration-(--duration-base)",
          scrolled
            ? "border-b border-ink/10 bg-cream-50/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container>
          <div className="flex h-18 items-center justify-between gap-6">
            <Link
              href={ROUTES.home}
              aria-label={`${COMPANY.name} — Inicio`}
              className="inline-flex min-h-11 shrink-0 items-center"
            >
              <Logo />
            </Link>

            <nav aria-label="Navegación principal" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {NAV_ITEMS.map((item) => {
                  const active =
                    item.href === ROUTES.home
                      ? pathname === ROUTES.home
                      : pathname.startsWith(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "relative inline-flex min-h-11 items-center rounded-full px-3.5",
                          "text-[0.9375rem] font-medium transition-colors duration-(--duration-fast)",
                          active ? "text-green-800" : "text-ink-700 hover:text-ink",
                        )}
                      >
                        {item.label}
                        {active ? (
                          <motion.span
                            layoutId="nav-active"
                            aria-hidden
                            className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-green-500"
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2.5">
              <AccessMenu className="hidden sm:block" />

              <ButtonLink
                href={whatsappUrl(WHATSAPP_INTENTS.demo)}
                external
                className="hidden md:inline-flex"
              >
                <MessageCircle aria-hidden strokeWidth={1.75} className="size-4" />
                Solicitar demostración
              </ButtonLink>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Abrir menú"
                aria-expanded={menuOpen}
                className={cn(
                  "inline-flex size-11 cursor-pointer items-center justify-center rounded-full",
                  "border border-ink/15 text-ink transition-colors duration-(--duration-fast)",
                  "hover:border-ink/35 hover:bg-ink/[0.03] lg:hidden",
                )}
              >
                <Menu aria-hidden strokeWidth={1.75} className="size-5" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 cursor-default bg-ink/45 backdrop-blur-sm"
            />

            <motion.div
              initial={reduceMotion ? undefined : { x: "100%" }}
              animate={reduceMotion ? undefined : { x: 0 }}
              exit={reduceMotion ? undefined : { x: "100%" }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col",
                "bg-cream-50 shadow-2xl",
                // Respeta el notch y la barra de gestos.
                "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
              )}
            >
              <div className="flex h-18 shrink-0 items-center justify-between px-(--spacing-gutter)">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className={cn(
                    "inline-flex size-11 cursor-pointer items-center justify-center",
                    "rounded-full border border-ink/15 text-ink",
                    "transition-colors hover:border-ink/35 hover:bg-ink/[0.03]",
                  )}
                >
                  <X aria-hidden strokeWidth={1.75} className="size-5" />
                </button>
              </div>

              <nav
                aria-label="Navegación principal"
                className="flex-1 overflow-y-auto px-(--spacing-gutter) pt-4"
              >
                <ul className="flex flex-col">
                  {NAV_ITEMS.map((item) => {
                    const active =
                      item.href === ROUTES.home
                        ? pathname === ROUTES.home
                        : pathname.startsWith(item.href);

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          // El panel se cierra aquí y no en un efecto sobre
                          // `pathname`: la navegación del cliente no
                          // desmonta el header.
                          onClick={() => setMenuOpen(false)}
                          className={cn(
                            "flex min-h-14 items-center border-b border-ink/8 text-lg font-semibold",
                            active ? "text-green-800" : "text-ink",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8">
                  <p className="eyebrow text-ink-500">Acceso a la plataforma</p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {PLATFORM_ACCESS.map((access) => (
                      <li key={access.id}>
                        <a
                          href={access.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "flex min-h-14 flex-col justify-center rounded-xl",
                            "border border-ink/12 px-4 py-3",
                            "transition-colors hover:border-green-500/50 hover:bg-green-50",
                          )}
                        >
                          <span className="text-[0.9375rem] font-semibold text-ink">
                            {access.label}
                          </span>
                          <span className="mt-0.5 text-[0.8125rem] leading-snug text-ink-500">
                            {access.description}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>

              <div className="shrink-0 border-t border-ink/10 p-(--spacing-gutter)">
                <ButtonLink
                  href={whatsappUrl(WHATSAPP_INTENTS.demo)}
                  external
                  size="lg"
                  className="w-full"
                >
                  <MessageCircle aria-hidden strokeWidth={1.75} className="size-4" />
                  Solicitar demostración
                </ButtonLink>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
