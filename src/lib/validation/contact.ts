import { z } from "zod";

import { FORM_LIMITS } from "@/lib/constants";

/**
 * Esquema único para el formulario de `/contacto`: lo usa el cliente
 * (`react-hook-form` + `zodResolver`) y el route handler que recibe el
 * envío, así que un mensaje de error nunca puede desalinearse entre
 * los dos lados. Los límites vienen de `FORM_LIMITS`, no de números
 * sueltos en este archivo.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(FORM_LIMITS.name.min, "Escriba su nombre completo.")
    .max(FORM_LIMITS.name.max, "El nombre es demasiado largo."),
  role: z
    .string()
    .trim()
    .min(FORM_LIMITS.role.min, "Indique su cargo.")
    .max(FORM_LIMITS.role.max, "El cargo es demasiado largo."),
  entity: z
    .string()
    .trim()
    .min(FORM_LIMITS.entity.min, "Indique la entidad o alcaldía.")
    .max(FORM_LIMITS.entity.max, "El nombre de la entidad es demasiado largo."),
  municipality: z
    .string()
    .trim()
    .min(FORM_LIMITS.municipality.min, "Indique el municipio.")
    .max(FORM_LIMITS.municipality.max, "El nombre del municipio es demasiado largo."),
  email: z
    .string()
    .trim()
    .max(FORM_LIMITS.email.max, "El correo es demasiado largo.")
    .email("Escriba un correo válido."),
  phone: z
    .string()
    .trim()
    .min(FORM_LIMITS.phone.min, "Escriba un teléfono válido.")
    .max(FORM_LIMITS.phone.max, "El teléfono es demasiado largo."),
  message: z
    .string()
    .trim()
    .min(FORM_LIMITS.message.min, "Cuéntenos un poco más sobre lo que necesita.")
    .max(FORM_LIMITS.message.max, "El mensaje es demasiado largo."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
