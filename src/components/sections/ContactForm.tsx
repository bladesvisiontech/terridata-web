"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { contactSchema, type ContactFormValues } from "@/lib/validation/contact";

type FieldName = keyof ContactFormValues;

const FIELDS: Array<{
  name: FieldName;
  label: string;
  type?: string;
  span?: "full" | "half";
  as?: "input" | "textarea";
}> = [
  { name: "name", label: "Nombre completo", span: "half" },
  { name: "role", label: "Cargo", span: "half" },
  { name: "entity", label: "Entidad o alcaldía", span: "half" },
  { name: "municipality", label: "Municipio", span: "half" },
  { name: "email", label: "Correo institucional", type: "email", span: "half" },
  { name: "phone", label: "Teléfono", type: "tel", span: "half" },
  { name: "message", label: "¿Qué necesita resolver su municipio?", span: "full", as: "textarea" },
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    setServerError(null);
    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setServerError(data?.error ?? "No pudimos enviar el mensaje. Intente de nuevo.");
        setStatus("error");
        return;
      }

      reset();
      setStatus("success");
    } catch {
      setServerError("No pudimos enviar el mensaje. Revise su conexión e intente de nuevo.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-lg border border-green-500/30 bg-green-50 p-8">
        <CheckCircle2 aria-hidden className="size-8 text-green-700" strokeWidth={1.75} />
        <h3 className="text-display-sm text-ink">Mensaje enviado</h3>
        <p className="text-[0.9375rem] leading-relaxed text-ink-700">
          Gracias por escribirnos. Un asesor de Terridata revisará su caso y se pondrá en
          contacto en el transcurso del siguiente día hábil.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")} className="mt-2">
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
      {FIELDS.map((field) => {
        const error = errors[field.name];
        const inputId = `contacto-${field.name}`;
        const errorId = `${inputId}-error`;

        return (
          <div
            key={field.name}
            className={cn("flex flex-col gap-2", field.span === "full" && "sm:col-span-2")}
          >
            <label htmlFor={inputId} className="text-[0.8125rem] font-medium text-ink-700">
              {field.label}
            </label>

            {field.as === "textarea" ? (
              <textarea
                id={inputId}
                rows={5}
                aria-invalid={error ? "true" : undefined}
                aria-describedby={error ? errorId : undefined}
                className={cn(
                  "min-h-32 rounded-md border bg-cream-50 px-4 py-3 text-[0.9375rem] text-ink outline-none transition-colors duration-(--duration-base)",
                  "focus-visible:border-green-500",
                  error ? "border-danger" : "border-ink/15",
                )}
                {...register(field.name)}
              />
            ) : (
              <input
                id={inputId}
                type={field.type ?? "text"}
                autoComplete={field.name === "email" ? "email" : field.name === "phone" ? "tel" : "on"}
                aria-invalid={error ? "true" : undefined}
                aria-describedby={error ? errorId : undefined}
                className={cn(
                  "h-11 rounded-md border bg-cream-50 px-4 text-[0.9375rem] text-ink outline-none transition-colors duration-(--duration-base)",
                  "focus-visible:border-green-500",
                  error ? "border-danger" : "border-ink/15",
                )}
                {...register(field.name)}
              />
            )}

            {error ? (
              <p id={errorId} role="alert" className="text-[0.8125rem] text-danger">
                {error.message}
              </p>
            ) : null}
          </div>
        );
      })}

      {serverError ? (
        <p role="alert" className="text-[0.875rem] text-danger sm:col-span-2">
          {serverError}
        </p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} size="lg" className="sm:col-span-2">
        {isSubmitting ? (
          <LoaderCircle aria-hidden className="size-4 animate-spin" strokeWidth={2} />
        ) : null}
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </Button>
    </form>
  );
}
