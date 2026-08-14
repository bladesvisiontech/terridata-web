import { NextResponse } from "next/server";
import { Resend } from "resend";

import { CONTACT } from "@/lib/constants";
import { getResendApiKey } from "@/lib/env";
import { isRateLimited } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validation/contact";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonimo";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Ha enviado varios mensajes seguidos. Intente de nuevo en unos minutos." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Revise los datos del formulario.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { name, role, entity, municipality, email, phone, message } = parsed.data;

  try {
    const resend = new Resend(getResendApiKey());
    const { error } = await resend.emails.send({
      from: `Terridata <contacto@${CONTACT.email.split("@")[1]}>`,
      to: CONTACT.email,
      replyTo: email,
      subject: `Nuevo contacto: ${entity} (${municipality})`,
      text: [
        `Nombre: ${name}`,
        `Cargo: ${role}`,
        `Entidad: ${entity}`,
        `Municipio: ${municipality}`,
        `Correo: ${email}`,
        `Teléfono: ${phone}`,
        "",
        "Mensaje:",
        message,
      ].join("\n"),
    });

    if (error) {
      return NextResponse.json({ error: "No pudimos enviar el mensaje. Intente de nuevo." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "No pudimos enviar el mensaje. Intente de nuevo." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
