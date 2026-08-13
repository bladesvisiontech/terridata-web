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
};

export const MODULES: readonly EcosystemModule[] = [
  {
    id: "visor-geografico",
    index: "01",
    name: "Visor Geográfico Inteligente",
    benefit: "Comprenda su territorio desde una sola pantalla",
    summary:
      "El mapa vivo del municipio en 2D y 3D: predios, redes, estratificación, uso del suelo y ordenamiento sobre la cartografía catastral real, con las normas de su territorio.",
    capabilities: [
      "Búsqueda de cualquier predio por número predial",
      "Capas activables: predial, zonas homogéneas, ordenamiento, áreas protegidas, cuencas",
      "Modelo tridimensional del casco urbano",
      "Medición de distancias y áreas sobre el terreno",
      "Un clic sobre un predio devuelve toda su información",
    ],
    integrations: ["gestion-catastral", "gestion-tributaria", "planeacion-urbanismo", "cartera-y-cobro", "analitica-territorial", "portal-ciudadano"],
    users: ["Planeación", "Hacienda", "Catastro", "Jurídica", "Alcaldía"],
    icon: "map",
    image: "moduloVisor",
  },
  {
    id: "gestion-catastral",
    index: "02",
    name: "Gestión Catastral",
    benefit: "Conozca la calidad real de su base catastral",
    summary:
      "El inventario predial del municipio, vivo y auditado de forma permanente. No solo consulta: diagnostica con más de 500 validaciones automáticas y le muestra dónde están las inconsistencias.",
    capabilities: [
      "Ficha predial completa con historial de vigencias",
      "Diagnóstico físico: áreas, destinos y condiciones incoherentes",
      "Diagnóstico cartográfico: predios sin mapa y mapas sin registro",
      "Auditoría permanente que cuantifica y clasifica cada inconsistencia",
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
      "Predial y alumbrado público en una sola plataforma. Cada liquidación es transparente, normativa y auditable, con el marco legal aplicado y visible.",
    capabilities: [
      "Liquidador con Ley 44 de 1990 y límites de la Ley 1995 de 2019",
      "Tratamiento de predios nuevos, cambios de uso y lotes no edificados",
      "Liquidación masiva y simulación de escenarios",
      "Trazabilidad: cada cálculo puede reconstruirse paso a paso",
      "Ciclo completo del impuesto de alumbrado público",
    ],
    integrations: ["gestion-catastral", "visor-geografico", "cartera-y-cobro", "analitica-territorial", "portal-ciudadano"],
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
      "Transforme la cartera del predial y del alumbrado en una gestión organizada y trazable, con el cobro persuasivo, coactivo y el proceso judicial integrados en la plataforma.",
    capabilities: [
      "Panorama de mora: predios, impuesto, intereses y saldo total",
      "Distribución por acuerdos de pago, cobro persuasivo y coactivo",
      "Cronograma procesal conforme al Estatuto Tributario Nacional",
      "Formatos y documentos listos para diligenciar en cada actuación",
      "Expediente electrónico por predio deudor",
    ],
    integrations: ["gestion-tributaria", "visor-geografico", "analitica-territorial", "portal-ciudadano"],
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
      "Licenciamiento, ordenamiento, control urbano y estratificación sobre la norma vigente de su municipio, con el acuerdo y el artículo que los sustentan.",
    capabilities: [
      "Estratificación de principio a fin, visualizada sobre el mapa",
      "Actualización masiva de estratos desde plantilla",
      "Certificado de uso del suelo construido sobre el ordenamiento vigente",
      "Demarcación, nomenclatura y licencias urbanísticas",
      "Firma del funcionario, código de verificación y QR en cada documento",
    ],
    integrations: ["visor-geografico", "gestion-catastral", "gestion-tributaria", "analitica-territorial"],
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
      "Levante el censo de establecimientos en campo, crúcelo con la DIAN, cámara de comercio y pagos, y detecte a los omisos. El ICA que hoy se le escapa, ubicado en el mapa.",
    capabilities: [
      "Registro de contribuyentes por actividad económica y tarifa",
      "Distinción entre activos y suspendidos",
      "Gestión de declaración y liquidación",
      "Certificado de paz y salvo expedido en el momento",
    ],
    integrations: ["gestion-tributaria", "cartera-y-cobro", "analitica-territorial"],
    users: ["Hacienda", "Tesorería"],
    icon: "briefcase",
    image: "moduloHacienda",
  },
  {
    id: "gestion-riesgo",
    index: "07",
    name: "Gestión del Riesgo",
    benefit: "Anticipe el riesgo antes de que sea emergencia",
    summary:
      "Un sistema de información para la gestión del riesgo de desastres: ubica las zonas de amenaza sobre el mismo mapa del municipio y conecta al ciudadano y a las dependencias para prevenir y responder a tiempo.",
    capabilities: [
      "Mapa de zonas de amenaza y vulnerabilidad sobre el territorio",
      "Registro y seguimiento de emergencias",
      "Alertas tempranas a la comunidad y a las dependencias",
      "Articulación entre Gestión del Riesgo, Planeación y Atención al Ciudadano",
    ],
    integrations: ["visor-geografico", "planeacion-urbanismo", "portal-ciudadano"],
    users: ["Gestión del Riesgo", "Planeación", "Alcaldía"],
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
      "Mapas temáticos que revelan dónde se concentra cada situación",
    ],
    integrations: ["gestion-catastral", "gestion-tributaria", "planeacion-urbanismo", "visor-geografico", "portal-ciudadano"],
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
      "Acceso digital a consultas, certificados y trámites, sin filas ni desplazamientos, y menos carga para la atención presencial.",
    capabilities: [
      "Solicitud de trámites en línea sin necesidad de credenciales",
      "Consulta del estado de un radicado",
      "Verificación de autenticidad de documentos expedidos",
    ],
    integrations: ["gestion-tributaria", "cartera-y-cobro", "gestion-catastral", "planeacion-urbanismo", "mesa-ayuda"],
    users: ["Atención al Ciudadano", "Ciudadanía"],
    icon: "users",
    image: "moduloPortal",
  },
  {
    id: "operacion-multimunicipio",
    index: "10",
    name: "Operación Multimunicipio",
    benefit: "Un municipio o todo un departamento, en una sola plataforma",
    summary:
      "Terridata administra varios municipios a la vez, cada uno con su información separada e independiente. Ideal para gobernaciones y áreas metropolitanas que quieren fortalecer a sus municipios pequeños.",
    capabilities: [
      "Administración de varios municipios desde una sola cuenta",
      "Información separada e independiente por municipio",
      "Panel comparativo entre municipios de la misma gobernación o área metropolitana",
      "Roles y permisos diferenciados por entidad",
    ],
    integrations: ["analitica-territorial"],
    users: ["Gobernaciones", "Áreas Metropolitanas", "Alcaldía"],
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
      "Asistente conversacional para funcionarios",
      "Creación y seguimiento de casos de soporte",
      "Escalamiento a soporte humano cuando el caso lo requiere",
    ],
    integrations: ["portal-ciudadano"],
    users: ["Todas las dependencias"],
    icon: "support",
    image: "ciudadanoDigital",
  },
] as const;
