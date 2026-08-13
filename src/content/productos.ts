/**
 * Copy de la página de productos.
 *
 * Fuente: guion de locución y mapa de navegación. El argumento va de
 * «no le imponemos un modelo» a «empiece por donde le urge».
 */

export const PRODUCTOS_HERO = {
  eyebrow: "El ecosistema",
  headline: ["Once módulos.", "Una sola información."],
  headlineMobile: ["Once módulos.", "Una sola", "información."],
  body: "Cada módulo se activa de forma independiente sobre la información que su municipio ya tiene cargada. Habilite lo que necesita hoy y sume capacidades cuando aparezcan nuevas exigencias.",
} as const;

export const PRODUCTOS_INTRO = {
  eyebrow: "Cómo funciona",
  headline: ["Cada módulo que activa", "vuelve más valiosos", "los que ya tenía."],
  body: "El predio que ve en el mapa es el mismo que consulta Catastro, el mismo sobre el que Hacienda liquida el impuesto, el mismo que aparece en cartera y el mismo sobre el que Urbanismo expide un certificado.",
  points: [
    {
      index: "01",
      title: "Sin migrar datos",
      description:
        "Añadir un módulo no obliga a volver a levantar el inventario predial ni a reentrenar al equipo. Aparece una nueva tarjeta en el tablero y ya.",
    },
    {
      index: "02",
      title: "Sin digitación repetida",
      description:
        "Se acaba el reingreso de la misma información entre dependencias, que es justamente donde nacen los errores y los reprocesos.",
    },
    {
      index: "03",
      title: "Todo auditable",
      description:
        "Cada actuación queda registrada a nombre de quien la hizo y con su fecha. La información siempre se puede reconstruir.",
    },
  ],
} as const;

export const PRODUCTOS_MODULES = {
  eyebrow: "Los módulos",
  headline: ["Elija por dónde empezar."],
  body: "Toque cualquier módulo para ver sus capacidades, quién lo usa dentro de la administración y con qué otros módulos comparte información.",
} as const;

export const PRODUCTOS_CTA = {
  eyebrow: "El siguiente paso",
  headline: ["Empiece con la necesidad", "de hoy. Evolucione con", "la visión del mañana."],
  body: "Le mostramos la plataforma funcionando con el módulo que más le urja y le explicamos cómo se implementaría en su municipio.",
} as const;
