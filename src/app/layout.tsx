import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { COMPANY, DEFAULT_SEO, SITE_URL } from "@/lib/constants";

import "./globals.css";

/**
 * Geist es variable: un solo peso cubre todo el rango 100-900, lo que
 * permite bajar el display a 700 sin cargar un archivo de fuente extra.
 * Geist Mono se reserva para etiquetas, índices y cifras: es la voz
 * «de datos» del sistema.
 *
 * `display: swap` evita el texto invisible mientras carga la fuente.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_SEO.title,
    template: `%s | ${COMPANY.name}`,
  },
  description: DEFAULT_SEO.description,
  applicationName: COMPANY.name,
  authors: [{ name: COMPANY.legalName }],
  keywords: [
    "inteligencia territorial",
    "software gestión municipal",
    "catastro multipropósito",
    "gestión tributaria municipal",
    "modernización municipios Colombia",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: COMPANY.name,
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#367f62",
  width: "device-width",
  initialScale: 1,
  // Nunca se desactiva el zoom.
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CO"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <Header />
        {/* Compensa la altura del header fijo (h-18 = 4.5rem) y, en
            móvil, la barra fija inferior (h-16 + área segura). */}
        <main
          id="contenido"
          className="flex-1 pt-18 pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0"
        >
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
