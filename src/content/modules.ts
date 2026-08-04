/**
 * Los ocho módulos del ecosistema.
 *
 * Fuente: guion de locución institucional (versión más reciente).
 * El mapa de navegación lista siete; el guion añade «Hacienda e
 * Industria y Comercio» y suma la Mesa de Ayuda al Portal Ciudadano.
 * Se acordó con el cliente ir por los ocho.
 *
 * El `benefit` va antes que el `name` en la interfaz: primero qué
 * gana el municipio, después cómo se llama el módulo.
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
  | "users";

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
      "El mapa vivo del municipio. Predios, redes, estratificación, uso del suelo y ordenamiento sobre la cartografía catastral real, con las normas de su territorio.",
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
      "El inventario predial del municipio, vivo y auditado de forma permanente. No solo consulta la información: diagnostica automáticamente sus inconsistencias.",
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
    benefit: "Recaude con seguridad jurídica, no solo más",
    summary:
      "Convierte la información del territorio en ingresos. Cada liquidación es transparente, normativa y auditable, con el marco legal aplicado y visible.",
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
      "Transforma la cartera municipal en una gestión organizada y trazable, con el debido proceso integrado dentro de la plataforma.",
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
      "Licenciamiento, ordenamiento, control urbano y estratificación sobre la norma vigente de su municipio, con el acuerdo y el artículo que la sustentan.",
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
    benefit: "El comercio registrado, clasificado y al día",
    summary:
      "Administración del impuesto de industria y comercio: inscritos, actividad económica, tarifa y estado de cada contribuyente.",
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
    id: "analitica-territorial",
    index: "07",
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
    index: "08",
    name: "Portal Ciudadano y Mesa de Ayuda",
    benefit: "Menos filas, menos papel, menos desplazamientos",
    summary:
      "Acceso digital a consultas, certificados y trámites sin credenciales ni desplazamientos. Sobre todo para el habitante rural.",
    capabilities: [
      "Solicitud de trámites en línea sin necesidad de credenciales",
      "Consulta del estado de un radicado",
      "Verificación de autenticidad de documentos expedidos",
      "Mesa de Ayuda con asistente conversacional para funcionarios",
      "Creación y seguimiento de casos de soporte",
    ],
    integrations: ["gestion-tributaria", "cartera-y-cobro", "gestion-catastral", "planeacion-urbanismo"],
    users: ["Atención al Ciudadano", "Ciudadanía"],
    icon: "users",
    image: "moduloPortal",
  },
] as const;
