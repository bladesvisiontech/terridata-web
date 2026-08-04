/**
 * GENERADO POR scripts/fetch-media.mjs — no editar a mano.
 *
 * Se regenera con `npm run media`. Las elecciones están fijadas en
 * media.lock.json; para cambiar una foto, borra su entrada de ahí y
 * vuelve a ejecutar.
 */

export type MediaEntry = {
  src: string;
  width: number;
  height: number;
  alt: string;
  photographer: string;
};

export const MEDIA = {
  heroTerritorio: {
    src: "/media/heroTerritorio.jpg",
    width: 2000,
    height: 1334,
    alt: "Vista aérea de un municipio colombiano con su casco urbano y sus parcelas rurales",
    photographer: "Juan Felipe Ramírez",
  },
  retoDispersion: {
    src: "/media/retoDispersion.jpg",
    width: 2000,
    height: 1334,
    alt: "Archivadores alineados, cada dependencia con su propio archivo",
    photographer: "Zulfugar Karimov",
  },
  territorioRural: {
    src: "/media/territorioRural.jpg",
    width: 2000,
    height: 1248,
    alt: "Mosaico de parcelas rurales visto desde el aire",
    photographer: "Quang Nguyen Vinh",
  },
  tramaUrbana: {
    src: "/media/tramaUrbana.jpg",
    width: 2000,
    height: 1126,
    alt: "Vista cenital de la trama de manzanas y calles de una ciudad",
    photographer: "K",
  },
  equipoTecnico: {
    src: "/media/equipoTecnico.jpg",
    width: 2000,
    height: 1334,
    alt: "Equipo técnico revisando planos en campo",
    photographer: "Mikael Blomkvist",
  },
  ciudadanoDigital: {
    src: "/media/ciudadanoDigital.jpg",
    width: 2000,
    height: 1334,
    alt: "Habitante rural en su territorio, a quien el portal le evita un desplazamiento",
    photographer: "Adem Erkoç",
  },
  paisajeAndino: {
    src: "/media/paisajeAndino.jpg",
    width: 2000,
    height: 1338,
    alt: "Casco urbano de arquitectura colonial rodeado de cerros verdes",
    photographer: "Tiarra Sorte",
  },
  ciudadCaribe: {
    src: "/media/ciudadCaribe.jpg",
    width: 2000,
    height: 1126,
    alt: "Vista aérea de una ciudad tropical junto a un río",
    photographer: "K",
  },
  moduloVisor: {
    src: "/media/moduloVisor.jpg",
    width: 2000,
    height: 1334,
    alt: "Parcelas delimitadas vistas desde el aire, como en una vista catastral",
    photographer: "Tiia Pakk",
  },
  moduloCatastral: {
    src: "/media/moduloCatastral.jpg",
    width: 2000,
    height: 1336,
    alt: "Planos técnicos desplegados sobre una mesa de trabajo",
    photographer: "Ivan S",
  },
  moduloTributaria: {
    src: "/media/moduloTributaria.jpg",
    width: 2000,
    height: 1334,
    alt: "Documentos financieros y calculadora sobre un escritorio",
    photographer: "https://kaboompics.com/",
  },
  moduloCartera: {
    src: "/media/moduloCartera.jpg",
    width: 2000,
    height: 1334,
    alt: "Manos revisando una caja de expedientes",
    photographer: "cottonbro studio",
  },
  moduloPlaneacion: {
    src: "/media/moduloPlaneacion.jpg",
    width: 2000,
    height: 1500,
    alt: "Maqueta de planificación urbana de un sector de ciudad",
    photographer: "jason hu",
  },
  moduloHacienda: {
    src: "/media/moduloHacienda.jpg",
    width: 2000,
    height: 1126,
    alt: "Puesto de mercado local con productos a la venta",
    photographer: "TBD Traveller",
  },
  moduloAnalitica: {
    src: "/media/moduloAnalitica.jpg",
    width: 2000,
    height: 1334,
    alt: "Informe impreso con gráficas e indicadores de gestión",
    photographer: "RDNE Stock project",
  },
  moduloPortal: {
    src: "/media/moduloPortal.jpg",
    width: 2000,
    height: 1334,
    alt: "Persona realizando un trámite en línea desde su computador",
    photographer: "Mikael Blomkvist",
  },
} as const satisfies Record<string, MediaEntry>;

export type MediaKey = keyof typeof MEDIA;
