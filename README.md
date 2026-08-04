# Terridata — sitio comercial

Sitio informativo de Terridata, plataforma de inteligencia territorial para
municipios colombianos.

## Estado

**Fase 1 — Inicio.** La página de inicio está completa, con el sistema de diseño,
el encabezado, el pie y las animaciones. Las otras cinco páginas se construyen
sobre estos mismos cimientos.

| Página | Ruta | Estado |
|---|---|---|
| Inicio | `/` | ✅ Completa |
| Productos | `/productos` | Pendiente — 8 módulos en acordeón |
| Galería | `/galeria` | Pendiente — plataforma + municipios, con filtros |
| Blog | `/blog` | Pendiente — contenido desde el CMS |
| Nosotros | `/nosotros` | Pendiente |
| Contacto | `/contacto` | Pendiente — formulario + WhatsApp |

## Stack

- **Next.js 16** (App Router, React 19, Turbopack) · TypeScript estricto
- **Tailwind CSS v4** con tokens propios en `src/styles/tokens.css`
- **framer-motion** encapsulado en `src/components/motion/`
- **lucide-react** para iconografía
- Despliegue en **Vercel**

## Puesta en marcha

```bash
npm install
cp .env.example .env.local
npm run dev
```

```bash
npm run build     # compilación de producción
npm run lint      # eslint
npx tsc --noEmit  # comprobación de tipos
```

## Estructura

```
src/
  app/           Rutas. Server Components.
  components/
    layout/      Encabezado, menú de acceso, pie
    motion/      Primitivas de animación — la única puerta a framer-motion
    sections/    Secciones de la página de inicio
    ui/          Botón, contenedor, sección, encabezado de sección
    visuals/     Mapa catastral y diagrama del ecosistema, en SVG
  content/       Copy y datos. Sin literales de negocio en JSX.
  lib/           constants.ts, utils.ts, parcels.ts
  styles/        tokens.css
  proxy.ts       Content-Security-Policy con nonce por petición
docs/
  migracion-dominio.md   ⚠️ Leer antes de apuntar el dominio a Vercel
```

## Contenido y CMS

El contenido editable se leerá desde archivos JSON del propio repositorio, que es
como funciona [`cms-template`](https://github.com/bladesvisiontech/cms-template):
el cliente edita, el CMS hace commit vía la API de GitHub y Vercel reconstruye en
30–60 segundos. Sin base de datos y sin proveedor externo.

El copy estructural de la página de inicio vive en `src/content/*.ts` y no está
pensado para edición diaria.

## Antes de tocar el dominio

`terridata.com.co` **es hoy la plataforma**, no un sitio informativo. Apuntar el
dominio a Vercel sin ejecutar antes la migración deja a los funcionarios sin
acceso. Ver **[`docs/migracion-dominio.md`](docs/migracion-dominio.md)**.

## Convenciones

Las reglas del proyecto —color y contraste, dirección de arte, animación,
titulares, seguridad— están en **[`AGENTS.md`](AGENTS.md)**. Conviene leerlo
antes de escribir código.
