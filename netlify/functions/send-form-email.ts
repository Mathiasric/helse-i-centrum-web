import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body || "{}");

  const text = `
Ny henvendelse fra nettsiden

Navn: ${data.name}
E-post: ${data.email}
Telefon: ${data.phone || "-"}
Fødselsdato: ${data.fodselsdato || "-"}
Melding:
${data.message}
`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Helse i Centrum <onboarding@resend.dev>",
      to: [process.env.FORM_TO_EMAIL],
      reply_to: data.email,
      subject: "Ny melding fra nettsiden",
      text,
    }),
  });

  return { statusCode: 200, body: "ok" };
};
