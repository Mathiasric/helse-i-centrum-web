import Link from "next/link";
import { getClinic } from "@/lib/content";

const clinic = getClinic();
const phoneHref = `tel:${clinic.contact.phoneE164}`;
const addressLine1 = clinic.location.addressLine1;
const addressLine2 = `${clinic.location.postalCode} ${clinic.location.city}`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.map.googleMapsQuery)}`;
const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clinic.map.googleMapsQuery)}`;
const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(clinic.map.googleMapsQuery)}&output=embed`;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md";

export function ContactSection() {
  return (
    <section
      id="kontakt"
      className="scroll-mt-20 bg-gray-50 py-14 sm:py-16"
      aria-labelledby="kontakt-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Venstre: Informasjonskort – innholdstyrt høyde, CTA rett under Adkomst */}
          <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 sm:pb-8">
            <h2 id="kontakt-heading" className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Kontakt & adkomst
            </h2>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {clinic.name} – {clinic.location.city}
            </p>

            <address className="mt-3 not-italic">
              {/* Adresse + åpningstider */}
              <div className="space-y-0.5">
                <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Adresse · Åpningstider</p>
                <p className="text-[13px] leading-snug text-gray-900">
                  {addressLine1}
                  <br />
                  {addressLine2}
                </p>
                {clinic.openingHours && (
                  <p className="mt-1 text-[13px] leading-snug text-gray-900">{clinic.openingHours}</p>
                )}
              </div>
              {/* Telefon */}
              <div className="mt-2 space-y-0.5">
                <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Telefon</p>
                <a
                  href={phoneHref}
                  className={`block text-[13px] font-medium text-primary-600 underline underline-offset-2 hover:text-primary-700 ${focusRing}`}
                >
                  {clinic.contact.phoneDisplay}
                </a>
              </div>
              {/* E-post */}
              {clinic.contact.email && (
                <div className="mt-2 space-y-0.5">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">E-post</p>
                  <a
                    href={`mailto:${clinic.contact.email}`}
                    className={`block text-[13px] font-medium text-primary-600 underline underline-offset-2 hover:text-primary-700 ${focusRing}`}
                  >
                    {clinic.contact.email}
                  </a>
                </div>
              )}
              {/* Adkomst – én linje med punktum; "Se veibeskrivelse" er lenke til Google Maps Directions */}
              {clinic.adkomst && clinic.adkomst.length > 0 && (
                <div className="mt-2 space-y-0.5">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Adkomst</p>
                  <p className="text-[13px] leading-snug text-gray-700">
                    {clinic.adkomst
                      .filter((item) => item !== "Enkel adkomst")
                      .join(" · ")}
                    {" · "}
                    <a
                      href={mapsDirUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-primary-600 underline underline-offset-1 hover:text-primary-700 ${focusRing}`}
                    >
                      Se veibeskrivelse
                    </a>
                  </p>
                </div>
              )}
            </address>

            {/* CTA: mindre avstand til tekst */}
            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex w-full justify-center rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-primary-700 sm:w-fit ${focusRing}`}
              >
                Åpne i Google Maps
              </a>
              <Link
                href="/terapeuter"
                className={`inline-flex w-full justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-400 hover:bg-gray-50 sm:w-fit ${focusRing}`}
              >
                Bestill time
              </Link>
            </div>
          </div>

          {/* Høyre: Google Maps – balanserer kontaktkortet visuelt */}
          <div className="relative h-[260px] overflow-hidden rounded-xl border border-gray-200 bg-gray-100 pt-3 shadow-sm lg:h-[320px]">
            <iframe
              src={mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kart: Helse i Centrum – Bergen"
              className="absolute inset-x-0 bottom-0 top-3 w-full pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
