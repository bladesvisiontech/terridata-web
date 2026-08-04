/**
 * Inventario de medios del sitio.
 *
 * Cada entrada define QUÉ imagen se necesita y DÓNDE se usa, no una URL. El
 * script de descarga resuelve la consulta contra el proveedor y fija el
 * resultado en `media.lock.json`, de modo que dos ejecuciones no barajen las
 * fotos y el diseño no cambie solo.
 *
 * Para sustituir una foto de stock por material propio de Terridata: deja el
 * archivo en `public/media/<key>.jpg` y borra su entrada del lockfile.
 *
 * IMPORTANTE — son imágenes de ambientación. Ninguna puede presentarse como
 * una captura de la plataforma ni como un municipio cliente concreto. Las
 * fotos reales de Tabio y Montería las tiene que aportar el cliente.
 */

/** Ancho máximo al que se guardan las fotos. Por encima no aporta nitidez. */
export const PHOTO_MAX_WIDTH = 2000;

export const PHOTOS = [
  // --- Inicio ---------------------------------------------------------------
  {
    /*
     * Elegida a mano. La búsqueda genérica devolvía un valle brumoso de
     * Vietnam: bonito, pero oscuro y ajeno. Esta muestra un municipio
     * colombiano completo —casco urbano, parcelas rurales y montaña—,
     * que es exactamente el objeto del que habla el producto.
     */
    key: "heroTerritorio",
    query: "colombia town aerial view green mountains sunny",
    alt: "Vista aérea de un municipio colombiano con su casco urbano y sus parcelas rurales",
  },
  {
    /*
     * Elegida a mano: «messy desk» devolvía lápices sueltos y libros en
     * primer plano. Una pared de archivadores comunica mejor la idea de
     * dependencias con su propio archivo, cada una por su lado.
     */
    key: "retoDispersion",
    query: "government office archive boxes files documents",
    alt: "Archivadores alineados, cada dependencia con su propio archivo",
  },
  {
    key: "territorioRural",
    query: "rural countryside farmland aerial patchwork fields",
    alt: "Mosaico de parcelas rurales visto desde el aire",
  },
  {
    key: "tramaUrbana",
    query: "aerial top view city blocks streets urban grid",
    alt: "Vista cenital de la trama de manzanas y calles de una ciudad",
  },
  {
    /*
     * La consulta de oficina devolvía escenas de startup sin relación con
     * el territorio.
     */
    key: "equipoTecnico",
    query: "engineers reviewing blueprints construction site outdoors",
    alt: "Equipo técnico revisando planos en campo",
  },
  {
    /*
     * Elegida a mano con preview-media.mjs. Las búsquedas automáticas daban
     * retratos de gesto triste o vistas aéreas sin persona; el guion habla
     * del habitante rural que necesita medio día de camino para una consulta
     * de dos minutos, y esa es la cara que tiene que verse.
     */
    key: "ciudadanoDigital",
    query: "older man using smartphone outdoors village",
    alt: "Habitante rural en su territorio, a quien el portal le evita un desplazamiento",
  },

  // --- Casos de éxito -------------------------------------------------------
  {
    /*
     * Ambientación de altiplano cundiboyacense, que es el paisaje de Tabio.
     * No se rotula como Tabio en ninguna parte de la interfaz: la tarjeta
     * lleva el pie «paisaje de referencia».
     */
    key: "paisajeAndino",
    query: "colombia town aerial view green mountains sunny",
    alt: "Casco urbano de arquitectura colonial rodeado de cerros verdes",
  },
  {
    key: "ciudadCaribe",
    query: "aerial view river city tropical latin america",
    alt: "Vista aérea de una ciudad tropical junto a un río",
  },

  // --- Módulos --------------------------------------------------------------
  {
    /*
     * Elegida a mano: «topographic map» devolvía mapas vintage con brújula y
     * café, más decorativos que técnicos. Unas parcelas delimitadas vistas
     * desde el aire son, literalmente, una vista catastral.
     */
    key: "moduloVisor",
    query: "aerial view farmland fields property boundaries",
    alt: "Parcelas delimitadas vistas desde el aire, como en una vista catastral",
  },
  {
    key: "moduloCatastral",
    query: "architectural blueprint plans drawing technical",
    alt: "Planos técnicos desplegados sobre una mesa de trabajo",
  },
  {
    key: "moduloTributaria",
    query: "calculator financial documents desk accounting",
    alt: "Documentos financieros y calculadora sobre un escritorio",
  },
  {
    /*
     * Elegida a mano: las búsquedas devolvían archivadores en blanco y negro
     * que chocan con la paleta cálida.
     */
    key: "moduloCartera",
    query: "government office archive boxes files documents",
    alt: "Manos revisando una caja de expedientes",
  },
  {
    key: "moduloPlaneacion",
    query: "urban planning model city development scale",
    alt: "Maqueta de planificación urbana de un sector de ciudad",
  },
  {
    /*
     * «storefront» devolvía un local con rótulo «DÉPANNEUR», señalética de
     * Quebec que sitúa la escena fuera de Colombia.
     */
    key: "moduloHacienda",
    query: "market vendor fruit vegetable stall hands",
    alt: "Puesto de mercado local con productos a la venta",
  },
  {
    /*
     * «data dashboard» devolvía pantallas de trading de criptomonedas, que
     * no tienen nada que ver con la analítica municipal.
     */
    key: "moduloAnalitica",
    query: "printed business report charts graphs analysis desk",
    alt: "Informe impreso con gráficas e indicadores de gestión",
  },
  {
    key: "moduloPortal",
    query: "woman using laptop home desk online",
    alt: "Persona realizando un trámite en línea desde su computador",
  },
];
