/**
 * Terridata — constantes del sitio.
 *
 * Ningún literal de negocio vive en JSX. Rutas, datos de contacto,
 * accesos a la plataforma y límites de formulario se definen aquí.
 * El copy largo vive en `src/content/`.
 */

/* ------------------------------------------------------------------
   Empresa
   ------------------------------------------------------------------ */

export const COMPANY = {
  name: "Terridata",
  legalName: "Terridata S.A.S.",
  tagline: "Inteligencia Territorial",
  claim: "El territorio en un solo sistema",
  promise: "Transformamos datos en decisiones",
  yearsOfExperience: 20,
  domain: "terridata.com.co",
  locale: "es-CO",
  country: "Colombia",
} as const;

/* ------------------------------------------------------------------
   Contacto
   ------------------------------------------------------------------ */

export const CONTACT = {
  whatsapp: {
    /** Formato internacional sin signos, como lo exige wa.me */
    number: "573104764000",
    display: "310 476 4000",
  },
  /** PENDIENTE: confirmar el correo institucional destino con Terridata. */
  email: "contacto@terridata.com.co",
  /** PENDIENTE: confirmar dirección y horario con Terridata. */
  address: null as string | null,
  schedule: "Lunes a viernes, 8:00 a. m. – 6:00 p. m.",
} as const;

/** Mensajes precargados de WhatsApp según el punto de origen del clic. */
export const WHATSAPP_INTENTS = {
  demo: "Hola, quiero solicitar una demostración de Terridata para mi entidad.",
  advisor: "Hola, quiero hablar con un asesor de Terridata.",
  module: (moduleName: string) =>
    `Hola, quiero conocer más sobre el módulo de ${moduleName} de Terridata.`,
} as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/* ------------------------------------------------------------------
   Accesos a la plataforma
   ------------------------------------------------------------------

   ⚠️ Estas URLs cambian el día de la migración de dominio.

   Hoy `terridata.com.co` sirve la aplicación: es una SPA con
   catch-all en nginx (cualquier ruta devuelve el shell). Cuando el
   dominio raíz apunte a Vercel, `/portal` y `/login` apuntarán
   también a Vercel y la plataforma quedará inaccesible.

   El plan acordado es mover la plataforma a `app.terridata.com.co`
   antes de repuntar la raíz. Cuando el subdominio esté activo, basta
   con definir NEXT_PUBLIC_PLATFORM_ORIGIN en Vercel y estas
   constantes lo toman sin tocar código.

   Ver `docs/migracion-dominio.md`.
   ------------------------------------------------------------------ */

const PLATFORM_ORIGIN =
  process.env.NEXT_PUBLIC_PLATFORM_ORIGIN ?? "https://terridata.com.co";

export const PLATFORM_ACCESS = [
  {
    id: "ciudadano",
    label: "Soy Ciudadano",
    description: "Consulte su predio, trámites y certificados en línea",
    href: `${PLATFORM_ORIGIN}/portal`,
  },
  {
    id: "funcionario",
    label: "Soy Funcionario",
    description: "Acceda a la plataforma de gestión territorial",
    href: `${PLATFORM_ORIGIN}/login`,
  },
] as const;

/* ------------------------------------------------------------------
   Navegación
   ------------------------------------------------------------------ */

export const ROUTES = {
  home: "/",
  productos: "/productos",
  galeria: "/galeria",
  blog: "/blog",
  nosotros: "/nosotros",
  contacto: "/contacto",
} as const;

export const NAV_ITEMS = [
  { label: "Inicio", href: ROUTES.home },
  { label: "Productos", href: ROUTES.productos },
  { label: "Galería", href: ROUTES.galeria },
  { label: "Blog", href: ROUTES.blog },
  { label: "Nosotros", href: ROUTES.nosotros },
  { label: "Contacto", href: ROUTES.contacto },
] as const;

export const LEGAL_LINKS = [
  { label: "Política de Tratamiento de Datos", href: "/legal/tratamiento-de-datos" },
  { label: "Política de Cookies", href: "/legal/cookies" },
  { label: "Términos y Condiciones", href: "/legal/terminos" },
] as const;

export type SocialLink = { label: string; href: string | null };

/**
 * PENDIENTE: confirmar los perfiles reales con Terridata.
 * El footer solo pinta las redes que ya tienen URL.
 */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: "LinkedIn", href: null },
  { label: "Facebook", href: null },
  { label: "Instagram", href: null },
  { label: "YouTube", href: null },
];

/* ------------------------------------------------------------------
   Formulario de contacto
   ------------------------------------------------------------------ */

export const FORM_LIMITS = {
  name: { min: 2, max: 80 },
  role: { min: 2, max: 80 },
  entity: { min: 2, max: 120 },
  municipality: { min: 2, max: 80 },
  email: { max: 160 },
  phone: { min: 7, max: 20 },
  message: { min: 10, max: 1200 },
} as const;

/** Ventana y cupo del limitador de peticiones del formulario. */
export const RATE_LIMIT = {
  windowMs: 10 * 60 * 1000,
  maxRequests: 3,
} as const;

/* ------------------------------------------------------------------
   SEO
   ------------------------------------------------------------------ */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://terridata.com.co";

export const DEFAULT_SEO = {
  title: "Terridata | Inteligencia Territorial para municipios en Colombia",
  description:
    "Terridata integra la información geográfica, catastral, tributaria y urbanística de su municipio en un solo ecosistema para fortalecer la gestión pública.",
} as const;
