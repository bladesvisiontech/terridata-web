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

Cuatro colores, muestreados del logo oficial (`public/brand/logo.png`), no
inventados. Los valores que se habían leído del deck estaban un par de puntos
desviados y quedaron corregidos:

| Token | Hex | Uso |
|---|---|---|
| `green-500` | `#387E66` | Verde de marca. Fondos, acentos, iconos |
| `cream-200` | `#FFEBC6` | Superficie cálida de sección |
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

- **El fondo** es un degradado vertical muy contenido, de blanco a un gris casi
  imperceptible, aplicado al `body` y **no por sección**: repetido en cada bloque
  crearía una costura visible en cada frontera. Por eso `Section tone="paper"` es
  transparente y deja pasar el degradado. Hubo antes una retícula catastral de
  cuadros; se retiró a petición del cliente y no debe reintroducirse.
- **La superficie técnica** (`backdrop` en `<Section>`) es lo que ocupó su lugar:
  `tech-dots`, una matriz de puntos finos que da precisión de instrumento sin
  volver al cuadriculado, y `tech-glow`, dos halos de verde muy abiertos que
  aportan profundidad. Se reserva para los bloques de apertura: puesta en todas
  las secciones deja de ser un acento y se vuelve ruido.
- **Los predios** del visor y de la base del diagrama de capas se generan por
  subdivisión recursiva determinista (`src/lib/parcels.ts`). La semilla es fija:
  el servidor y el cliente tienen que trazar exactamente lo mismo o React marca
  error de hidratación.
- **El diagrama del ecosistema** (`LayerStack`) es una pila isométrica, no una
  órbita: el copy dice que todo se apoya sobre un mismo territorio
  georreferenciado, que es un apilado de capas temáticas sobre una base común,
  como en un SIG real — no dependencias satélite alrededor de un núcleo.
- **El bisel** (`.notch-diag`, `.notch-top`, `.notch-br`, `.notch-tr`,
  `.notch-bl`) es el corte diagonal que firma el sitio. Va con `clip-path` y no
  con bordes girados: recorta de verdad, así que también corta la foto o el
  color que haya debajo. Un solo valor —`--notch`, `--notch-lg`— para todo; si
  cada bloque corta distinto deja de leerse como sistema. Por debajo de `sm` se
  encoge, porque a 375 px un corte de 3.5rem se come la esquina entera.
- **Las fichas de datos** (`.data-chip`) flotan sobre la fotografía. La foto
  sola dice «territorio»; la ficha encima dice «territorio con información
  asociada», que es de lo que va el producto.
- **Numeración visible.** Retos, módulos y pilares van numerados en
  monoespaciada. El índice sale de la posición, no del contenido.
- **Primero el beneficio, después el nombre.** Las tarjetas de módulo dicen qué
  gana el municipio antes de cómo se llama el módulo.

Dos familias: **Montserrat** (la del deck) para todo el texto, y **JetBrains
Mono** para etiquetas, índices, coordenadas y cifras. La mono es la voz «de
datos» del sistema y no se usa para prosa.

## Fotografía

Toda foto pasa por `<BrandImage>`. Nunca se usa `next/image` suelto en una
sección: las fotos vienen de autores distintos y sin un tratamiento común una
página con doce imágenes parece un tablero de recortes. El tratamiento son dos
capas —verde en `multiply`, crema en `soft-light`— sobre una imagen
desaturada; es el duotono del deck, atenuado.

Los medios se descargan con `npm run media`, que resuelve el plan de
`scripts/media-plan.mjs` contra Pexels —o Unsplash, si existe
`UNSPLASH_ACCESS_KEY`— y fija cada elección en `media.lock.json` para que dos
ejecuciones no barajen las fotos.

**La curación es obligatoria y manual.** La búsqueda automática acierta con los
conceptos concretos (una vista aérea, un mercado) y falla con los abstractos:
«data dashboard» devolvió pantallas de trading de criptomonedas, «storefront»
un local con rótulo de Quebec y «messy desk» un puñado de lápices. Para esos
casos está `node scripts/preview-media.mjs "consulta"`, que monta una hoja de
contactos numerada; se elige a la vista y se fija con
`node scripts/preview-media.mjs "consulta" clave índice`. Cada elección manual
queda justificada en un comentario dentro de `media-plan.mjs`.

Dos reglas de honestidad, ambas de cara al cliente:

1. Ninguna foto de stock puede presentarse como un municipio cliente. Las
   tarjetas de casos llevan el pie «paisaje de referencia» hasta que Terridata
   aporte material propio.
2. Ninguna ilustración puede presentarse como una captura de la plataforma.
   `PlatformFrame` y `CadastralMap` son diagramas declarados como
   provisionales.

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

## Medir contraste

`getComputedStyle` devuelve `oklab(... / alfa)` para cualquier color con
transparencia —`text-cream-50/75` es uno—, y un parser de RGB con regex lee el
primer número de esa cadena como si fuera el canal rojo: da ratios absurdos
como 1.4:1 sobre texto perfectamente legible. Pasó una vez y casi se reporta
como hallazgo real. La forma fiable es muestrear los píxeles ya compuestos de
una captura de pantalla, no el color computado del elemento.

## Seguridad

La CSP y las demás cabeceras se emiten en `next.config.ts`.

Una CSP que solo admita `'self'` en `script-src` bloquea las 34 etiquetas
`<script>` en línea que Next emite para arrancar React: no hidrata y todo lo que
dependa de JS se queda congelado en su estado inicial —que, con estas
animaciones, significa **una página en blanco**—. Por eso lleva
`'unsafe-inline'`.

**Se intentó antes la vía estricta y se descartó con motivo.** La alternativa
documentada por Next es un nonce por petición desde `proxy.ts` (en Next 16
`middleware` pasó a llamarse así). Obliga a render dinámico, y este sitio no
tiene un solo dato dinámico. Peor: aun con `force-dynamic` y `connection()`,
Next 16.2 siguió sirviendo la página desde su caché de prerrenderizado
(`x-nextjs-prerender: 1`) y dos peticiones seguidas devolvieron **el mismo
nonce**. Un nonce reutilizado no aporta la garantía que justifica su coste.

Lo que sí protege la política actual, y es lo que importa en un sitio estático
sin autenticación ni entrada de usuario: ningún script de origen externo,
`object-src 'none'`, `base-uri 'self'`, `form-action 'self'` y
`frame-ancestors 'none'`.

`'unsafe-eval'` se concede **solo en desarrollo**: React lo usa para reconstruir
los stack traces del servidor en el navegador y sin él el overlay de errores
queda inutilizado.

`style-src` lleva `'unsafe-inline'` en cualquier caso: el nonce no aplica a
atributos `style`, y Tailwind y framer-motion escriben estilos sobre los
elementos.

⚠️ Si una auditoría del cliente exige CSP estricta, la vía es reintroducir el
nonce y aceptar el render dinámico.

## Componentes

Las páginas son Server Components. Solo llevan `"use client"` las primitivas de
motion, el header, el menú de acceso y los visuales animados. Se mantienen
delgados.

## Probar con WebKit (Safari)

Playwright trae un motor WebKit real, útil para detectar lo que Chromium deja
pasar. Dos trampas al usarlo:

1. **Nunca contra `http://localhost` en dev.** WebKit fuerza HTTPS en algunos
   recursos de ese origen y todo falla con «SSL error», incluida la hoja de
   estilos — la página sale sin ningún CSS, como si el sitio estuviera roto.
   No es un bug real: es un artefacto de probar HTTP local con ese motor.
   Probar siempre contra la URL de producción (HTTPS) o contra un build local
   servido también por HTTPS.
2. **`locator.screenshot()` no dispara las entradas por scroll.** Captura el
   elemento completo aunque esté fuera del viewport, pero las animaciones con
   `whileInView` solo se disparan con intersección real del navegador. Una
   captura tomada tras `scrollIntoViewIfNeeded()` puede mostrar solo la primera
   capa de un diagrama con opacidad 0 en el resto, y parece un fallo de
   renderizado cuando es nada más que la animación sin haberse disparado. Hay
   que desplazarse de verdad, en pasos, antes de capturar.

## Identidad de git

El repositorio tiene identidad **local**, distinta de la global de la máquina:

```
user.name   ventori2026-ui
user.email  ventori2026@gmail.com
```

No es una preferencia: Vercel rechaza el despliegue si el correo del autor del
commit no corresponde a una cuenta de GitHub con acceso al equipo. El mensaje
que aparece es «the commit email could not be matched to a GitHub account», y
el despliegue queda bloqueado sin más aviso.

Si vuelve a pasar, **no se reescribe el historial**: Vercel solo mira el commit
de cabeza de cada push, así que basta con un commit nuevo —aunque sea vacío—
hecho con la identidad correcta.

## Pendientes con el cliente

Marcados en el código con `PENDIENTE` o `PROVISIONAL`:

- Logo vectorial oficial → `src/components/ui/Logo.tsx`
- Capturas reales de la plataforma → `src/components/visuals/PlatformFrame.tsx`.
  El banner del hero (`public/brand/hero-banner.png`) sí es material propio del
  cliente y ya trae capturas reales.
- Correo institucional, dirección y redes → `src/lib/constants.ts`
- URL definitiva de la plataforma → `NEXT_PUBLIC_PLATFORM_ORIGIN`, ver
  `docs/migracion-dominio.md`
- **Cifras de casos de éxito**: «+38 % recaudo (Tabio)» y «247 inconsistencias
  (Montería)» están marcadas «por validar públicamente» en el documento fuente.
  No se publican sin autorización escrita de cada entidad. La estructura ya las
  contempla en `CASES.items[].metric`.
