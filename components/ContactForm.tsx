"use client";

import { getClinic } from "@/lib/content";

const clinic = getClinic();

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md";

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string) || "";
    const message = formData.get("message") as string;

    const subject = encodeURIComponent(`Melding fra ${name}`);
    const body = encodeURIComponent(
      `Navn: ${name}\nE-post: ${email}\nTelefon: ${phone || "(ikke oppgitt)"}\n\nMelding:\n${message}`
    );
    window.location.href = `mailto:${clinic.contact.email ?? "hicbergen@gmail.com"}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-900">
          Navn <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className={`mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${focusRing}`}
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
          className={`mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${focusRing}`}
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
          className={`mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${focusRing}`}
          placeholder="Valgfritt"
        />
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
          className={`mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${focusRing}`}
          placeholder="Skriv din melding her..."
        />
      </div>
      <button
        type="submit"
        className={`inline-flex w-full justify-center rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-primary-700 sm:w-fit ${focusRing}`}
      >
        Send melding
      </button>
    </form>
  );
}
