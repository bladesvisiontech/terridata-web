/**
 * Terridata — getters de variables de entorno.
 *
 * Ningún secreto se lee directo de `process.env` en el resto del
 * código: cada uno pasa por un getter de aquí que lanza si falta, para
 * que un despliegue sin la variable falle rápido y en un solo sitio
 * en vez de silenciosamente en tiempo de ejecución.
 */

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}.`);
  }
  return value;
}

/**
 * PENDIENTE: Terridata debe generar una API key de Resend
 * (https://resend.com/api-keys) y añadirla como `RESEND_API_KEY` en
 * las variables de entorno de Vercel. Sin ella, el formulario de
 * `/contacto` valida y limita la tasa correctamente, pero el envío del
 * correo falla con un mensaje explícito en vez de fallar en silencio.
 */
export function getResendApiKey(): string {
  return required("RESEND_API_KEY");
}
