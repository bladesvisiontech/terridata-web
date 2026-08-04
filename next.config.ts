import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * ── Por qué `'unsafe-inline'` en `script-src` ─────────────────────
 *
 * Next emite **34 etiquetas `<script>` en línea** en el HTML de
 * producción (arranque de React y carga diferida de los fragmentos).
 * Una CSP sin `'unsafe-inline'` ni nonce las bloquea todas: React no
 * hidrata y la página sale **en blanco**, porque las animaciones
 * dejan el contenido en su estado inicial.
 *
 * La alternativa documentada es un nonce por petición emitido desde
 * `proxy.ts`. Se probó y se descartó con motivo:
 *
 *   1. Obliga a render dinámico, y este sitio no tiene ni un dato
 *      dinámico: se pierde el cacheado estático a cambio de nada.
 *   2. Aun con `force-dynamic` y `connection()`, Next 16.2 siguió
 *      sirviendo la página desde su caché de prerrenderizado
 *      (`x-nextjs-prerender: 1`), y dos peticiones seguidas
 *      devolvieron **el mismo nonce**. Un nonce reutilizado no es un
 *      nonce: no aporta la garantía que justifica su coste.
 *
 * Lo que sí protege esta política, y es lo que importa en un sitio
 * de contenido estático sin autenticación ni entrada de usuario:
 * ningún script de un origen externo, `object-src 'none'`,
 * `base-uri 'self'` contra el secuestro de rutas relativas,
 * `form-action 'self'` contra el reenvío de formularios y
 * `frame-ancestors 'none'` contra el clickjacking.
 *
 * Si una auditoría del cliente exige CSP estricta, la vía es
 * reintroducir el nonce y aceptar el render dinámico. Ver AGENTS.md.
 *
 * `'unsafe-inline'` en `style-src` es inevitable en cualquier caso:
 * el nonce no aplica a atributos `style`, y Tailwind y framer-motion
 * escriben estilos directamente sobre los elementos.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  // next/font autoaloja las tipografías durante el build.
  "font-src 'self' data:",
  "img-src 'self' blob: data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
