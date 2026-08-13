/**
 * Los once módulos del ecosistema.
 *
 * Fuente: guion de locución institucional (versión más reciente) más
 * la ampliación acordada con el cliente: se suman Gestión del Riesgo
 * y Operación Multimunicipio, y el Portal Ciudadano se separa de la
 * Mesa de Ayuda en dos tarjetas independientes.
 *
 * El `benefit` va antes que el `name` en la interfaz: primero qué
 * gana el municipio, después cómo se llama el módulo.
 *
 * `availability` es la excepción a `integrations`: Operación
 * Multimunicipio y Mesa de Ayuda no comparten información con módulos
 * concretos, están disponibles para todos ellos. Cuando está presente
 * sustituye el bloque de enlaces «Comparte información con» por un
 * texto plano bajo «Disponible en» (ver `ModuleAccordion.tsx`).
 *
 * PROVISIONAL: `gestion-riesgo`, `operacion-multimunicipio` y
 * `mesa-ayuda` reutilizan fotografías ya descargadas de otros
 * módulos como imagen de ambientación temporal, para no bloquear el
 * despliegue en la curación manual de `npm run media`. Cuando haya
 * fotos propias para estos tres, añadir sus claves a
 * `scripts/media-plan.mjs`, ejecutar `npm run media` y actualizar el
 * campo `image` de cada uno.
 */

import type { MediaKey } from "@/content/media";

export type ModuleIcon =
  | "map"
  | "layers"
  | "coins"
  | "receipt"
  | "compass"
  | "briefcase"
  | "chart"
  | "users"
  | "alert"
  | "region"
  | "support";

export type EcosystemModule = {
  id: string;
  index: string;
  name: string;
  benefit: string;
  summary: string;
  /** Capacidades concretas. Se muestran al desplegar el módulo. */
  capabilities: readonly string[];
  /** Módulos con los que comparte información. Ids de esta misma lista. */
  integrations: readonly string[];
  /** Dependencias del municipio que lo usan a diario. */
  users: readonly string[];
  icon: ModuleIcon;
  /** Fotografía de ambientación. Clave de `src/content/media.ts`. */
  image: MediaKey;
  /** Ver comentario de cabecera. Sustituye a `integrations` cuando está presente. */
  availability?: string;
};

export const MODULES: readonly EcosystemModule[] = [
  {
    id: "visor-geografico",
    index: "01",
    name: "Visor Geográfico Inteligente",
    benefit: "Comprenda su territorio desde una sola pantalla",
    summary:
      "El mapa vivo del municipio. Predios, redes, estratificación, uso del suelo y ordenamiento sobre la cartografía catastral real, con las normas de su territorio.",
    capabilities: [
      "Búsqueda de cualquier predio por número predial",
      "Capas activables: predial, zonas homogéneas, ordenamiento, áreas protegidas, cuencas",
      "Modelo tridimensional del municipio, generado con la información que entrega la administración",
      "Medición de distancias y áreas sobre el terreno",
      "Un clic sobre un predio devuelve toda su información",
    ],
    integrations: ["gestion-catastral", "gestion-tributaria", "planeacion-urbanismo", "cartera-y-cobro", "analitica-territorial", "portal-ciudadano"],
    users: ["Planeación", "Hacienda", "Catastro", "Gobierno", "Alcaldía"],
    icon: "map",
    image: "moduloVisor",
  },
  {
    id: "gestion-catastral",
    index: "02",
    name: "Gestión Catastral",
    benefit: "Conozca la calidad real de su base catastral",
    summary:
      "El inventario predial del municipio, vivo y auditado de forma permanente. No solo consulta la información: diagnostica automáticamente sus inconsistencias.",
    capabilities: [
      "Ficha predial completa con historial de vigencias",
      "Diagnóstico físico: áreas, destinos y condiciones incoherentes",
      "Diagnóstico cartográfico: predios sin mapa y mapas sin registro",
      "Auditoría permanente con más de 500 validaciones que cuantifica y clasifica cada inconsistencia",
      "Comparación de dos o más vigencias sobre el mismo mapa",
    ],
    integrations: ["visor-geografico", "gestion-tributaria", "planeacion-urbanismo", "analitica-territorial"],
    users: ["Catastro", "Planeación", "Hacienda"],
    icon: "layers",
    image: "moduloCatastral",
  },
  {
    id: "gestion-tributaria",
    index: "03",
    name: "Gestión Tributaria",
    benefit: "Recaude con seguridad jurídica",
    summary:
      "Convierta la información del territorio en ingresos. Cada liquidación es transparente, normativa y auditable, con el marco legal aplicado y visible.",
    capabilities: [
      "Liquidador con Ley 44 de 1990 y límites de la Ley 1995 de 2019",
      "Tratamiento de predios nuevos, cambios de uso y lotes no edificados",
      "Liquidación masiva y simulación de escenarios",
      "Trazabilidad: cada cálculo puede reconstruirse paso a paso",
      "Ciclo completo del impuesto de alumbrado público",
    ],
    integrations: ["gestion-catastral", "cartera-y-cobro", "analitica-territorial", "visor-geografico"],
    users: ["Hacienda", "Tesorería", "Alcaldía"],
    icon: "coins",
    image: "moduloTributaria",
  },
  {
    id: "cartera-y-cobro",
    index: "04",
    name: "Cartera y Cobro",
    benefit: "Sepa a quién cobrar y cuál es el siguiente paso",
    summary:
      "Transforme la cartera municipal en una gestión organizada y trazable, con el debido proceso integrado dentro de la plataforma.",
    capabilities: [
      "Panorama de mora: predios, impuesto, intereses y saldo total",
      "Segmentación geográfica de la cartera: focalice el cobro por zonas, sectores y estratos sobre el mapa",
      "Distribución por acuerdos de pago, cobro persuasivo y coactivo",
      "Cronograma procesal conforme al Estatuto Tributario Nacional",
      "Formatos y documentos listos para diligenciar en cada actuación",
      "Expediente electrónico por predio deudor",
    ],
    integrations: ["gestion-tributaria", "gestion-catastral", "visor-geografico", "analitica-territorial"],
    users: ["Hacienda", "Tesorería", "Jurídica"],
    icon: "receipt",
    image: "moduloCartera",
  },
  {
    id: "planeacion-urbanismo",
    index: "05",
    name: "Planeación y Urbanismo",
    benefit: "Expida certificados verificables el mismo día",
    summary:
      "Licenciamiento, ordenamiento, control urbano y estratificación sobre la norma vigente de su municipio, con el acuerdo y el artículo que la sustentan.",
    capabilities: [
      "Estratificación de principio a fin, visualizada sobre el mapa",
      "Actualización masiva de estratos desde plantilla",
      "Certificado de uso del suelo construido sobre el ordenamiento vigente",
      "Demarcación, nomenclatura, licencias y delineación urbana",
      "Cada documento con firma del funcionario y QR de verificación y autenticidad",
    ],
    integrations: ["visor-geografico", "gestion-catastral", "gestion-tributaria", "portal-ciudadano", "analitica-territorial"],
    users: ["Planeación", "Urbanismo", "Atención al Ciudadano"],
    icon: "compass",
    image: "moduloPlaneacion",
  },
  {
    id: "hacienda-ica",
    index: "06",
    name: "Hacienda e Industria y Comercio",
    benefit: "Encuentre el comercio que opera y no está tributando",
    summary:
      "Levante el censo de establecimientos en campo, crúcelo con fuentes externas y detecte a los omisos. El ICA que hoy se le escapa, ubicado en el mapa.",
    capabilities: [
      "Censo de establecimientos con aplicativo móvil en campo y georreferenciación",
      "Clasificación automática: nuevos, no inscritos, omisos e inexactos",
      "Fiscalización mediante cruces con DIAN, cámara de comercio, banca y plataformas de pago",
      "Actuaciones del procedimiento tributario con plantillas, consecutivos y control de términos",
      "Consulta de contribuyentes y paz y salvo con QR de verificación y autenticidad",
    ],
    integrations: ["visor-geografico", "cartera-y-cobro", "analitica-territorial"],
    users: ["Hacienda", "Fiscalización", "Tesorería"],
    icon: "briefcase",
    image: "moduloHacienda",
  },
  {
    id: "gestion-riesgo",
    index: "07",
    name: "Gestión del Riesgo",
    benefit: "Anticipe el riesgo antes de que sea emergencia",
    summary:
      "Un sistema de información para la gestión del riesgo de desastres que ubica las zonas de amenaza sobre el mismo mapa del municipio y conecta al ciudadano con las dependencias.",
    capabilities: [
      "Zonas de amenaza y riesgo representadas como capa sobre el territorio",
      "Portal ciudadano para reportar y radicar situaciones de riesgo",
      "Portal institucional para la gestión y respuesta de las dependencias",
      "Información centralizada para el Consejo Municipal de Gestión del Riesgo",
      "Consulta del riesgo predio a predio desde el Visor",
    ],
    integrations: ["visor-geografico", "planeacion-urbanismo", "portal-ciudadano"],
    users: ["Secretaría de Gobierno", "Consejo Municipal de Gestión del Riesgo"],
    icon: "alert",
    image: "equipoTecnico",
  },
  {
    id: "analitica-territorial",
    index: "08",
    name: "Analítica Territorial",
    benefit: "Gobierne con datos, no con impresiones",
    summary:
      "La analítica vive dentro de la operación: cada cifra sale del uso diario del sistema, no de un informe armado a mano.",
    capabilities: [
      "Diagnóstico de la calidad de la base catastral",
      "Comparación de vigencias y evolución del municipio",
      "Estadísticas de cartera por estado y rango de deuda",
      "Indicadores de fiscalización: censados, omisos y aforo potencial",
      "Mapas temáticos que revelan dónde se concentra cada situación",
    ],
    integrations: ["gestion-catastral", "gestion-tributaria", "cartera-y-cobro", "planeacion-urbanismo", "hacienda-ica", "visor-geografico"],
    users: ["Alcaldía", "Hacienda", "Planeación", "Gobernaciones"],
    icon: "chart",
    image: "moduloAnalitica",
  },
  {
    id: "portal-ciudadano",
    index: "09",
    name: "Portal Ciudadano",
    benefit: "Menos filas, menos papel, menos desplazamientos",
    summary:
      "Acceso digital a consultas, certificados y trámites, sin filas ni desplazamientos, y con menos carga para la atención presencial.",
    capabilities: [
      "Solicitud de trámites en línea sin necesidad de credenciales",
      "Consulta del estado de cada radicado",
      "Descarga de certificados y documentos en PDF",
      "Verificación de autenticidad de los documentos expedidos mediante QR",
      "Un solo punto de entrada para los trámites del municipio",
    ],
    integrations: ["planeacion-urbanismo", "gestion-riesgo", "gestion-catastral"],
    users: ["Ciudadanía", "Atención al Ciudadano"],
    icon: "users",
    image: "moduloPortal",
  },
  {
    id: "operacion-multimunicipio",
    index: "10",
    name: "Operación Multimunicipio",
    benefit: "Un municipio o todo un departamento, en una sola plataforma",
    summary:
      "Terridata administra varios municipios a la vez, cada uno con su información separada e independiente. Ideal para gobernaciones y áreas metropolitanas.",
    capabilities: [
      "Selección del municipio activo desde la parte superior de la pantalla",
      "Información de cada municipio separada e independiente",
      "Los mismos módulos disponibles para cada municipio administrado",
      "Visión consolidada para la gobernación o el área metropolitana",
      "Escalabilidad para sumar municipios sin montar un sistema nuevo",
    ],
    integrations: [],
    availability: "Todos los módulos, para cada municipio",
    users: ["Gobernación", "Área Metropolitana", "Municipios asociados"],
    icon: "region",
    image: "ciudadCaribe",
  },
  {
    id: "mesa-ayuda",
    index: "11",
    name: "Mesa de Ayuda",
    benefit: "Nunca queda solo: soporte dentro de la plataforma",
    summary:
      "Mesa de ayuda integrada, con asistente, casos y seguimiento, para resolver cualquier duda sin salir del sistema.",
    capabilities: [
      "Asistente conversacional y preguntas frecuentes dentro de la plataforma",
      "Creación y seguimiento de casos de soporte",
      "Estados y trazabilidad de cada solicitud",
      "Cierre y calificación del servicio",
      "Acompañamiento sin depender de canales externos",
    ],
    integrations: [],
    availability: "Todos los módulos",
    users: ["Todos los funcionarios usuarios de la plataforma"],
    icon: "support",
    image: "ciudadanoDigital",
  },
] as const;
