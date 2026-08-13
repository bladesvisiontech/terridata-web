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
  headline: ["Cuando la información está", "dispersa, las decisiones", "también."],
  body: "Las administraciones públicas gestionan a diario grandes volúmenes de información de distintas dependencias. Cuando esos datos permanecen aislados, aumentan los tiempos de respuesta, se duplican procesos y disminuye la capacidad de planificar el territorio.",
  items: [
    {
      index: "01",
      title: "Información dispersa",
      description: "Cada dependencia con su propia base de datos, sin un punto común.",
    },
    {
      index: "02",
      title: "Procesos manuales",
      description: "Mayor carga operativa y menor productividad de los equipos técnicos.",
    },
    {
      index: "03",
      title: "Datos sin aprovechar",
      description: "La información existe, pero es difícil de consultar y de analizar.",
    },
    {
      index: "04",
      title: "Decisiones con incertidumbre",
      description: "Falta una visión integral del territorio en el momento de decidir.",
    },
  ],
} as const;

export const ECOSYSTEM = {
  eyebrow: "Un solo dato, una sola verdad",
  headline: ["Todo el municipio", "conectado desde una", "sola plataforma."],
  body: "Lo que hace diferente a Terridata no es cada módulo por separado. Es que todos se alimentan de la misma información.",
  narrative:
    "El predio que ve en el mapa es el mismo que consulta Catastro, el mismo sobre el que Hacienda liquida el impuesto, el mismo que aparece en cartera y el mismo sobre el que Urbanismo expide un certificado.",
  /** Dependencias que orbitan el núcleo en el diagrama. */
  departments: [
    "Alcaldía",
    "Hacienda",
    "Planeación",
    "Catastro",
    "Tesorería",
    "Atención al Ciudadano",
  ],
  outcome:
    "Se acaba la digitación repetida entre dependencias, que es justamente donde nacen los errores y los reprocesos.",
} as const;

/**
 * Sección de capacidades.
 *
 * ⚠️ Cifras ilustrativas. Representan el tipo de resultado que
 * produce la plataforma, no datos de un municipio cliente.
 */
export const SHOWCASE = {
  eyebrow: "Así se ve por dentro",
  headline: ["El territorio, sus datos", "y la norma que los rige."],
  body: "No es un mapa con información al lado. Es el mismo predio consultado desde catastro, liquidado desde hacienda y certificado desde urbanismo, sin salir del sistema.",
  diagnostic: {
    label: "Diagnóstico catastral",
    total: "1.284",
    totalLabel: "Inconsistencias detectadas automáticamente",
    findings: [
      { name: "Predios sin cartografía", count: "512", percent: 40 },
      { name: "Áreas incoherentes", count: "398", percent: 31 },
      { name: "Destino económico erróneo", count: "374", percent: 29 },
    ],
  },
  liquidation: {
    label: "Liquidación del predial",
    amount: "$1.845.200",
    amountLabel: "Impuesto de la vigencia, con su cálculo trazable",
    steps: [
      { name: "Avalúo catastral", value: "$184.500.000" },
      { name: "Tarifa por destino", value: "10,0 ‰" },
      { name: "Límite de incremento", value: "Aplicado" },
    ],
    basis: "Ley 44 de 1990 · Ley 1995 de 2019",
  },
} as const;

export const MODULES_SECTION = {
  eyebrow: "El ecosistema",
  headline: ["Soluciones que responden", "a desafíos reales."],
  body: "Cada módulo se activa de forma independiente sobre la información que el municipio ya tiene cargada. Empiece por donde más le urge y sume capacidades cuando las necesite.",
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

export const BENEFITS = {
  eyebrow: "Resultados",
  headline: ["Tecnología que fortalece", "la gestión pública."],
  items: [
    "Información centralizada",
    "Mayor coordinación institucional",
    "Mejor planificación territorial",
    "Fortalecimiento del recaudo",
    "Automatización de procesos",
    "Información geográfica integrada",
    "Reducción de tiempos administrativos",
    "Mayor capacidad de análisis",
    "Mejor atención al ciudadano",
    "Decisiones basadas en datos",
  ],
} as const;

export const AUDIENCE = {
  eyebrow: "Para quién es",
  headline: ["Diseñado para quienes", "administran el territorio."],
  items: [
    {
      role: "Alcaldes",
      value: "Información estratégica para gobernar con mayor confianza",
    },
    {
      role: "Secretarios de Hacienda",
      value: "Fortalecer el recaudo y optimizar la gestión tributaria",
    },
    {
      role: "Secretarios de Planeación",
      value: "Información territorial confiable para planificar",
    },
    {
      role: "Gestores Catastrales",
      value: "Gestión integrada de la información predial",
    },
    {
      role: "Gobernaciones",
      value: "Visión regional para la toma de decisiones",
    },
    {
      role: "Empresas de Servicios Públicos",
      value: "Información geográfica para infraestructura y redes",
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
