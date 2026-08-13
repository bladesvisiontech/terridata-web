/**
 * Copy de la página de inicio.
 *
 * Fuente: mapa de navegación (copy aprobado) y guion de locución.
 * Los titulares se declaran partidos en líneas porque el corte es
 * una decisión de diseño: `<TextReveal>` anima línea por línea y el
 * ritmo debe ser el mismo en cualquier ancho.
 */

export const HERO = {
  eyebrow: "Inteligencia Territorial",
  headline: [
    "Convierta la información",
    "de su municipio en",
    "decisiones estratégicas.",
  ],
  /*
   * Corte para el hero a media anchura.
   *
   * La columna mide unos 613 px a 1440. Con Montserrat ExtraBold, una
   * línea de 23 caracteres necesitaría bajar la tipografía a 48 px
   * para caber; con líneas de 15 caracteres aguanta hasta 74 px. Por
   * eso el corte es de cinco líneas cortas y no de cuatro largas.
   */
  headlineSplit: [
    "Convierta la",
    "información de",
    "su municipio en",
    "decisiones",
    "estratégicas.",
  ],
  /* A 375 px hasta ese corte refluye: aquí van líneas más cortas. */
  headlineMobile: [
    "Convierta la",
    "información de",
    "su municipio en",
    "decisiones",
    "estratégicas.",
  ],
  body: "Terridata integra la información geográfica, catastral, tributaria, urbanística y administrativa en un solo sistema. Una plataforma que se adapta a las necesidades y a la realidad de su municipio.",
} as const;

/**
 * Cifras de la franja de apertura.
 *
 * Dos, no tres: el cliente retiró «8 módulos conectados» porque el
 * número de módulos ya se cuenta en la sección del ecosistema y aquí
 * competía con las dos cifras que sí son argumento de venta.
 */
export const STATS_BAND = [
  { value: 20, suffix: "+", label: "Años en gestión territorial" },
  { value: 100, suffix: "%", label: "Web, sin instalaciones locales" },
] as const;

/**
 * Video institucional de apertura.
 *
 * Lo aporta el cliente y lleva narración con subtítulos incrustados en
 * la propia imagen.
 *
 * PENDIENTE: los subtítulos van quemados en el video, así que no hay
 * pista de texto seleccionable ni transcripción. Para cumplir WCAG
 * 1.2.2 conviene pedirle al cliente el guion y añadir un `<track>` de
 * subtítulos, o publicar la transcripción junto al video.
 */
export const HERO_VIDEO = {
  src: "/media/hero.mp4",
  poster: "/media/hero-poster.jpg",
  description:
    "Video institucional de Terridata: vistas aéreas de municipios colombianos y de la plataforma en uso, con narración sobre los retos de la gestión territorial.",
  fallback:
    "Su navegador no puede reproducir este video. Escríbanos por WhatsApp y se lo compartimos.",
} as const;

export const TRUST = {
  label: "Confían en Terridata",
  entities: ["Municipio de Tabio", "Municipio de Montería"],
  upcoming: "Próximamente…",
} as const;

export const CHALLENGE = {
  eyebrow: "El punto de partida",
  /*
   * El titular va en dos pesos, como en la referencia del cliente: la
   * primera parte en regular y el remate en negrita. Se declaran por
   * separado porque son dos tratamientos tipográficos distintos, no un
   * corte de línea.
   */
  headlineLight: ["Cuando la información", "está dispersa,"],
  headlineBold: ["las decisiones también."],
  body: "Las administraciones públicas gestionan a diario grandes volúmenes de información de distintas dependencias. Cuando esos datos permanecen aislados, aumentan los tiempos de respuesta, se duplican procesos y disminuye la capacidad de planificar el territorio.",
  items: [
    {
      id: "informacion-dispersa",
      icon: "/brand/retos/informaciondispersa.png",
      title: "Información dispersa",
      description: "Cada dependencia con su propia base de datos, sin un punto común.",
    },
    {
      id: "procesos-manuales",
      icon: "/brand/retos/procesosmanuales.png",
      title: "Procesos manuales",
      description: "Mayor carga operativa y menor productividad de los equipos técnicos.",
    },
    {
      id: "datos-sin-aprovechar",
      icon: "/brand/retos/datossinaprovechar.png",
      title: "Datos sin aprovechar",
      description: "La información existe, pero es difícil de consultar y de analizar.",
    },
    {
      id: "decisiones-inciertas",
      icon: "/brand/retos/incertidumbre.png",
      title: "Decisiones con incertidumbre",
      description: "Falta una visión integral del territorio en el momento de decidir.",
    },
  ],
} as const;

export const ECOSYSTEM = {
  eyebrow: "Un solo dato, una sola verdad",
  headline: ["Una sola fuente de", "información para todas", "las dependencias."],
  body: "La fuerza de Terridata no está en cada módulo por separado, sino en que todos leen y escriben sobre la misma información. Un solo dato, sin versiones que se contradicen.",
  narrative:
    "Todo se apoya en un mismo territorio georreferenciado. Sobre ese mapa vive el predio que Catastro administra, Hacienda liquida y Cartera cobra; el establecimiento que se censa y controla en el ICA; y la zona de riesgo que puede afectarlo. Cada dependencia trabaja sobre la misma realidad, y el ciudadano hace todos sus trámites por un solo portal.",
  outcome:
    "Se acaba la digitación repetida entre dependencias, que es donde nacen los errores, los reprocesos y la información que nunca cuadra.",
  /*
   * Capas del diagrama, de arriba abajo. El orden importa: son estratos
   * apilados sobre el territorio, no una lista.
   */
  layers: [
    { name: "Portal Ciudadano", detail: "Trámites en un solo punto" },
    { name: "Cartera y Cobro", detail: "Obligaciones y recuperación" },
    { name: "Hacienda e ICA", detail: "Liquidación y comercio" },
    { name: "Catastro", detail: "Inventario predial" },
  ],
  base: {
    name: "Territorio georreferenciado",
    detail: "La misma realidad para todas las dependencias",
  },
} as const;

export const MODULES_SECTION = {
  eyebrow: "El ecosistema",
  headline: ["Soluciones que responden", "a desafíos reales."],
  body: "Cada módulo se activa de forma independiente sobre la información que el municipio ya tiene cargada. Empiece por lo que más necesita hoy y sume capacidades cuando las requiera.",
  cta: "Ver todos los módulos",
} as const;

export const MODULARITY = {
  eyebrow: "Arquitectura modular",
  headline: ["Su municipio no se ajusta", "a la plataforma."],
  headlineAccent: "La plataforma se ajusta a su municipio.",
  pillars: [
    {
      index: "01",
      title: "Usted decide con qué empezar",
      description:
        "Su administración habilita únicamente los módulos que necesita hoy, según su tamaño, su estructura y sus prioridades. El punto de partida lo define el municipio, no el proveedor.",
    },
    {
      index: "02",
      title: "Crece cuando usted crece",
      description:
        "Añadir un módulo no obliga a migrar datos, ni a volver a levantar el inventario predial, ni a reentrenar al equipo. Simplemente aparece una nueva tarjeta en el tablero.",
    },
    {
      index: "03",
      title: "Configurada con su norma",
      description:
        "Se parametriza con sus tarifas y su Estatuto de Rentas, su Plan de Ordenamiento, sus zonas homogéneas y sus perfiles de usuario. Por eso el mapa de un municipio no se parece al de otro.",
    },
  ],
} as const;

export type BenefitIcon = "coins" | "clock" | "chart" | "users";

export const BENEFITS = {
  eyebrow: "Resultados",
  headline: ["Resultados que se ven", "en el recaudo y en la gestión."],
  categories: [
    {
      id: "ingresos",
      icon: "coins",
      title: "Más ingresos",
      items: [
        "Más ingresos propios con respaldo legal",
        "Comercio omiso puesto a tributar",
        "Cartera bajo control",
      ],
    },
    {
      id: "costo-tiempo",
      icon: "clock",
      title: "Menos costo y tiempo",
      items: [
        "Una sola fuente de información",
        "Trámites en minutos",
        "Menos trabajo manual y menos errores",
      ],
    },
    {
      id: "decisiones",
      icon: "chart",
      title: "Mejores decisiones",
      items: [
        "Todo el municipio sobre un mismo mapa",
        "Indicadores en tiempo real",
        "Decisiones con datos, no con supuestos",
      ],
    },
    {
      id: "servicio",
      icon: "users",
      title: "Mejor servicio",
      items: [
        "Atención al ciudadano sin filas ni desplazamientos",
        "Dependencias sobre la misma información",
      ],
    },
  ],
} as const;

export type AudienceIcon = "landmark" | "wallet" | "compass" | "landPlot" | "building" | "zap";

export const AUDIENCE = {
  eyebrow: "Para quién es",
  headline: ["Diseñado para quienes", "administran el territorio."],
  items: [
    {
      role: "Alcaldes",
      value: "Información estratégica para gobernar con mayor confianza",
      icon: "landmark" satisfies AudienceIcon,
    },
    {
      role: "Secretarios de Hacienda",
      value: "Fortalecer el recaudo y optimizar la gestión tributaria",
      icon: "wallet" satisfies AudienceIcon,
    },
    {
      role: "Secretarios de Planeación",
      value: "Información territorial confiable para planificar",
      icon: "compass" satisfies AudienceIcon,
    },
    {
      role: "Gestores Catastrales",
      value: "Gestión integrada de la información predial",
      icon: "landPlot" satisfies AudienceIcon,
    },
    {
      role: "Gobernaciones",
      value: "Visión regional para la toma de decisiones",
      icon: "building" satisfies AudienceIcon,
    },
    {
      role: "Empresas de Servicios Públicos",
      value: "Información geográfica para infraestructura y redes",
      icon: "zap" satisfies AudienceIcon,
    },
  ],
} as const;

export const EXPERIENCE = {
  eyebrow: "Por qué Terridata",
  headline: ["Más de 20 años convirtiendo", "conocimiento en tecnología."],
  body: "Nuestro mayor diferencial no es únicamente el desarrollo de software. Es la experiencia. Cada módulo responde a las necesidades reales de los municipios y no a una idea de escritorio sobre cómo debería funcionar una alcaldía.",
  pillars: [
    {
      title: "Experiencia aplicada",
      description: "Más de 20 años acompañando entidades públicas colombianas.",
    },
    {
      title: "Equipo especializado",
      description: "Gestión territorial, catastro, planeación y transformación digital.",
    },
    {
      title: "Plataforma escalable",
      description: "Un ecosistema que evoluciona con el municipio y con la norma.",
    },
  ],
} as const;

/**
 * Casos de éxito.
 *
 * ⚠️ Las cifras de resultado («+38 % en recaudo» para Tabio y «247
 * inconsistencias corregidas» para Montería) están marcadas como
 * «por validar públicamente» en el documento fuente. No se publican
 * hasta que Terridata confirme por escrito la autorización de cada
 * entidad. La estructura ya las contempla en `metric`.
 */
export const CASES = {
  eyebrow: "Casos de éxito",
  headline: ["Municipios que ya avanzan", "hacia una gestión más", "inteligente."],
  items: [
    {
      id: "tabio",
      municipality: "Tabio",
      department: "Cundinamarca",
      summary: "Implementación del ecosistema Terridata.",
      modules: ["Visor Geográfico", "Gestión Catastral", "Gestión Tributaria", "Analítica"],
      image: "paisajeAndino",
      metric: null as { value: string; label: string } | null,
    },
    {
      id: "monteria",
      municipality: "Montería",
      department: "Córdoba",
      summary: "Transformación digital de la gestión territorial.",
      modules: ["Gestión Catastral", "Información Geográfica", "Analítica Territorial"],
      image: "ciudadCaribe",
      metric: null as { value: string; label: string } | null,
    },
  ],
} as const;

export const FINAL_CTA = {
  eyebrow: "Hablemos",
  headline: ["Descubra cómo Terridata", "puede fortalecer la gestión", "de su municipio."],
  body: "Conozca el ecosistema tecnológico que integra información, optimiza procesos y facilita la toma de decisiones para las administraciones públicas.",
} as const;
