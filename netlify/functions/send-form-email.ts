import type { Handler } from "@netlify/functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const handler: Handler = async (event) => {
  try {
    const data = JSON.parse(event.body || "{}");

    const result = await resend.emails.send({
      from: "Helse i Centrum <onboarding@resend.dev>",
      to: process.env.FORM_TO_EMAIL!,
      replyTo: data.email,
      subject: "Ny melding fra nettsiden",
      text: `
Navn: ${data.name}
E-post: ${data.email}
Telefon: ${data.phone || "-"}
Fødselsdato: ${data.fodselsdato || "-"}

Melding:
${data.message}
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, result }),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Email error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: message }),
    };
  }
};
