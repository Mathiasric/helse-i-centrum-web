import type { Handler } from "@netlify/functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || process.env.FORM_TO_EMAIL || "";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "no-reply@botpartner.no";
const SITE_URL = process.env.URL || "https://helseicentrum.no";

function norskDatoTid(): string {
  return new Date().toLocaleString("nb-NO", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function buildHtml(data: {
  name: string;
  email: string;
  phone?: string;
  fodselsdato?: string;
  message: string;
}): string {
  const telefon = data.phone?.trim() || "–";
  const fodselsdato = data.fodselsdato?.trim() || "–";
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111; max-width: 560px;">
  <h2 style="font-size: 1.25rem; margin-bottom: 1rem;">Ny henvendelse fra nettsiden</h2>
  <table style="border-collapse: collapse; width: 100%;">
    <tr><td style="padding: 0.25rem 0.5rem 0.25rem 0; font-weight: 600;">Navn</td><td style="padding: 0.25rem 0;">${escapeHtml(data.name)}</td></tr>
    <tr><td style="padding: 0.25rem 0.5rem 0.25rem 0; font-weight: 600;">E-post</td><td style="padding: 0.25rem 0;">${escapeHtml(data.email)}</td></tr>
    <tr><td style="padding: 0.25rem 0.5rem 0.25rem 0; font-weight: 600;">Telefon</td><td style="padding: 0.25rem 0;">${escapeHtml(telefon)}</td></tr>
    <tr><td style="padding: 0.25rem 0.5rem 0.25rem 0; font-weight: 600;">Fødselsdato</td><td style="padding: 0.25rem 0;">${escapeHtml(fodselsdato)}</td></tr>
  </table>
  <p style="font-weight: 600; margin-top: 1rem; margin-bottom: 0.25rem;">Melding</p>
  <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
  <p style="margin-top: 1.5rem; font-size: 0.875rem; color: #666;">Sendt fra kontaktskjema – ${escapeHtml(SITE_URL)} – ${escapeHtml(norskDatoTid())}</p>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, error: "Method Not Allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");
    const name = String(data.name ?? "").trim();
    const email = String(data.email ?? "").trim();
    const message = String(data.message ?? "").trim();
    const phone = data.phone != null ? String(data.phone).trim() : "";
    const fodselsdato =
      data.fodselsdato != null ? String(data.fodselsdato).trim() : "";

    if (!name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, error: "Navn er påkrevd" }),
      };
    }
    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, error: "E-post er påkrevd" }),
      };
    }
    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, error: "Melding er påkrevd" }),
      };
    }

    if (!CONTACT_TO_EMAIL) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          ok: false,
          error: "CONTACT_TO_EMAIL er ikke satt",
        }),
      };
    }

    if (!process.env.RESEND_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          ok: false,
          error: "RESEND_API_KEY er ikke satt",
        }),
      };
    }

    const text = `
Ny henvendelse fra nettsiden

Navn: ${name}
E-post: ${email}
Telefon: ${phone || "–"}
Fødselsdato: ${fodselsdato || "–"}

Melding:
${message}

---
Sendt fra kontaktskjema – ${SITE_URL} – ${norskDatoTid()}
`;

    await resend.emails.send({
      from: CONTACT_FROM_EMAIL.includes("<")
        ? CONTACT_FROM_EMAIL
        : `Helse i Centrum <${CONTACT_FROM_EMAIL}>`,
      to: [CONTACT_TO_EMAIL],
      replyTo: email,
      subject: "Ny pasienthenvendelse – Helse i Centrum",
      text,
      html: buildHtml({ name, email, phone, fodselsdato, message }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Email error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: message }),
    };
  }
};
