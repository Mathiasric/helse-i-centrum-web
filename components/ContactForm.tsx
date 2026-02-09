"use client";

import { useState } from "react";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    setFormState("submitting");

    const formData = new FormData(form);
    const payload = new URLSearchParams();
    payload.append("form-name", "kontakt-melding");
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        payload.append(key, value);
      }
    });

    try {
      const response = await fetch("/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      if (response.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <p className="rounded-lg bg-primary-50 p-4 text-base font-medium text-primary-800">
        Takk! Meldingen er sendt.
      </p>
    );
  }

  return (
    <form
      name="kontakt-melding"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input type="hidden" name="form-name" value="kontakt-melding" />
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-900">
          Navn <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          disabled={formState === "submitting"}
          className={`mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:opacity-60 ${focusRing}`}
          placeholder="Ditt navn"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-900">
          E-post <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          disabled={formState === "submitting"}
          className={`mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:opacity-60 ${focusRing}`}
          placeholder="din@epost.no"
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-900">
          Telefon
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          disabled={formState === "submitting"}
          className={`mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:opacity-60 ${focusRing}`}
          placeholder="Valgfritt"
        />
      </div>
      <div>
        <label htmlFor="contact-fodselsdato" className="block text-sm font-medium text-gray-900">
          Fødselsdato
        </label>
        <input
          id="contact-fodselsdato"
          name="fodselsdato"
          type="date"
          disabled={formState === "submitting"}
          className={`mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:opacity-60 ${focusRing}`}
        />
        <p className="mt-1 text-xs text-gray-500">Oppgis kun dersom det er relevant for henvendelsen.</p>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-900">
          Melding <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          disabled={formState === "submitting"}
          className={`mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:opacity-60 ${focusRing}`}
          placeholder="Skriv din melding her..."
        />
      </div>
      {formState === "error" && (
        <p className="text-sm font-medium text-red-600">Noe gikk galt. Prøv igjen.</p>
      )}
      <button
        type="submit"
        disabled={formState === "submitting"}
        className={`inline-flex w-full justify-center rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60 sm:w-fit ${focusRing}`}
      >
        {formState === "submitting" ? "Sender..." : "Send melding"}
      </button>
    </form>
  );
}
