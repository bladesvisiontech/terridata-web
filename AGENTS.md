<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Terridata — reglas del proyecto

Sitio comercial de Terridata, plataforma de inteligencia territorial para
municipios colombianos. Venta B2G: el decisor es un alcalde o un secretario, no
un usuario final. La conversión es una conversación por WhatsApp, no un registro.

## Nada hardcodeado

Ningún literal de negocio vive en JSX. Antes de escribir un string o un número
que no sea sintaxis:

- **Copy, listas, cifras** → `src/content/*.ts`
- **Rutas, navegación, contacto, accesos, límites de formulario** → `src/lib/constants.ts`
- **Secretos** → env var leída con un getter en `src/lib/env.ts` que lanza si falta

Si el valor todavía no existe, se añade primero al módulo que le corresponde y
luego se importa.

## Color

Cuatro colores, extraídos del deck institucional (no inventados):

| Token | Hex | Uso |
|---|---|---|
| `green-500` | `#367F62` | Verde de marca. Fondos, acentos, iconos |
| `cream-200` | `#FCE7C3` | Superficie cálida de sección |
| `cream-50` | `#FFFDF8` | Fondo base |
| `ink` | `#0B0811` | Texto |

**Restricción de contraste, no negociable:** `green-500` sobre `cream-200` da
**4.0:1** y no pasa AA. Para texto sobre crema va `green-800` (8.9:1). El
`green-500` sobre `cream-50` sí pasa (4.7:1), y el texto blanco sobre
`green-500` también (4.8:1).

Ratios verificados: `ink`/`cream-50` 19.4:1 · `ink`/`cream-200` 16.2:1 ·
`green-800`/`cream-50` 10.6:1 · `cream-50`/`green-900` 19.8:1.

## Dirección de arte

El lenguaje visual sale del oficio del cliente: **el plano catastral**.

- **La retícula** (`.cadastral-grid`) es el fondo técnico del sitio: dos tramas
  superpuestas de 24 px y 120 px, desvanecidas por `.grid-fade` para que no
  corten en seco contra el borde de la sección.
- **Los predios** del hero se generan por subdivisión recursiva determinista
  (`src/lib/parcels.ts`). La semilla es fija: el servidor y el cliente tienen que
  trazar exactamente lo mismo o React marca error de hidratación.
- **Numeración visible.** Retos, módulos y pilares van numerados en
  monoespaciada. El índice sale de la posición, no del contenido.
- **Primero el beneficio, después el nombre.** Las tarjetas de módulo dicen qué
  gana el municipio antes de cómo se llama el módulo.

Dos familias: **Montserrat** (la del deck) para todo el texto, y **JetBrains
Mono** para etiquetas, índices, coordenadas y cifras. La mono es la voz «de
datos» del sistema y no se usa para prosa.

## Motion

Toda animación pasa por las primitivas de `src/components/motion/`. No se usa
`framer-motion` directamente en secciones ni páginas.

Con `prefers-reduced-motion` activo el contenido se renderiza visible y estático.
**El contenido nunca depende de JS para ser legible.**

Tres reglas que costaron caro:

1. **Quien observa el viewport nunca se transforma.** Un titular desplazado
   dentro de un `overflow-hidden`, o una regla en `scaleX(0)`, tiene área visible
   cero: el navegador no lo da nunca por dentro del viewport y se queda invisible
   **para siempre**. El envoltorio observa, el hijo anima.

2. **Umbral cero y viewport completo** (`ENTRANCE_VIEWPORT`). Nada de márgenes
   negativos: recortar el viewport crea una franja donde un elemento está a la
   vista y no ha disparado.

3. **Lo que ya está en pantalla al cargar anima al montar** (`trigger="mount"`),
   no al entrar en vista. En la primera carga no ha habido scroll: el hero no
   puede esperar a «entrar».

Y una cuarta, del contador: **el testigo de «ya arrancó» va en una ref, no en
estado.** Con estado cambia una dependencia del efecto, el efecto se reejecuta y
su limpieza detiene la animación recién empezada; el contador se queda en cero.

`overflow-hidden` en una sección **anula `position: sticky`** dentro de ella.
`<Section>` usa `overflow-clip`, que recorta igual sin crear contenedor de scroll.

## Titulares

Se declaran partidos en líneas: el corte es decisión de diseño y `<TextReveal>`
anima línea por línea.

Un corte pensado para escritorio **no cabe en 375 px**. Por defecto, en móvil las
líneas se unen en un bloque que fluye. Para los titulares grandes se declara un
corte propio en `linesMobile` (ver `HERO.headlineMobile`).

El mínimo de `--text-display-xl` está calculado contra 335 px de ancho útil y la
línea móvil más larga del titular. **Subirlo hace que refluya.**

## Tailwind

Los tamaños propios (`text-display-*`, `text-lead`, `text-label`) están
registrados en `extendTailwindMerge` en `src/lib/utils.ts`. Sin eso,
`tailwind-merge` los toma por colores y `cn("text-display-xl", "text-ink")`
descarta el tamaño: el titular se queda en 16 px. **Al añadir un tamaño a
`tokens.css` hay que añadirlo también ahí.**

## Seguridad

La CSP se emite en `src/proxy.ts` (en Next 16 `middleware` pasó a llamarse
`proxy`), no en `next.config.ts`, porque necesita un **nonce distinto en cada
petición**.

Una CSP que solo admita `'self'` en `script-src` bloquea los scripts de arranque
de Next: React no hidrata y todo lo que dependa de JS se queda congelado en su
estado inicial —que, con estas animaciones, significa **una página en blanco**—.

`style-src` sí lleva `'unsafe-inline'`: el nonce no aplica a atributos `style`, y
Tailwind y framer-motion escriben estilos sobre los elementos.

⚠️ El nonce obliga a **render dinámico**. Está asumido para este proyecto por ser
un cliente del sector público, donde una auditoría de seguridad es probable.

## Componentes

Las páginas son Server Components. Solo llevan `"use client"` las primitivas de
motion, el header, el menú de acceso y los visuales animados. Se mantienen
delgados.

## Pendientes con el cliente

Marcados en el código con `PENDIENTE` o `PROVISIONAL`:

- Logo vectorial oficial → `src/components/ui/Logo.tsx`
- Capturas reales de la plataforma → `src/components/visuals/PlatformFrame.tsx`
- Correo institucional, dirección y redes → `src/lib/constants.ts`
- URL definitiva de la plataforma → `NEXT_PUBLIC_PLATFORM_ORIGIN`, ver
  `docs/migracion-dominio.md`
- **Cifras de casos de éxito**: «+38 % recaudo (Tabio)» y «247 inconsistencias
  (Montería)» están marcadas «por validar públicamente» en el documento fuente.
  No se publican sin autorización escrita de cada entidad. La estructura ya las
  contempla en `CASES.items[].metric`.
