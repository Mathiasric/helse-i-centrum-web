import Image from "next/image";
import Link from "next/link";
import { getClinic, type Therapist } from "@/lib/content";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md";

interface TherapistCardProps {
  therapist: Therapist;
  variant?: "preview" | "full";
}

function BookingCta({ therapist }: { therapist: Therapist }) {
  const clinic = getClinic();
  const hasBooking = !!therapist.bookingUrl;

  return (
    <div className="flex flex-col gap-0.5">
      <a
        href={hasBooking ? therapist.bookingUrl! : `tel:${clinic.contact.phoneE164}`}
        target={hasBooking ? "_blank" : undefined}
        rel={hasBooking ? "noopener noreferrer" : undefined}
        className={`inline-flex w-fit items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
      >
        {hasBooking ? "Bestill time" : "Ring for time"}
      </a>
      {hasBooking && (
        <span className="text-xs text-gray-500">Online booking · Physica</span>
      )}
    </div>
  );
}

export function TherapistCard({ therapist, variant = "preview" }: TherapistCardProps) {
  if (variant === "full") {
    return (
      <article className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:p-6">
        <div className="relative h-72 w-44 shrink-0 overflow-hidden rounded-lg sm:w-48">
          <Image
            src={therapist.image}
            alt={`Fysioterapeut ${therapist.name} – Helse i Centrum i Bergen`}
            fill
            className="object-cover"
            style={{ objectPosition: therapist.imagePosition ?? "center 35%" }}
            sizes="208px"
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <h3 className="text-xl font-bold text-gray-900">{therapist.name}</h3>
          <p className="mt-1 text-primary-600">{therapist.role}</p>
          <p className="mt-4 text-gray-600">{therapist.professionalProfile}</p>
          {therapist.focusAreas.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {therapist.focusAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700"
                >
                  {area}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6">
            <BookingCta therapist={therapist} />
          </div>
        </div>
      </article>
    );
  }

  const previewTitle = "Fysioterapeut";
  const previewDescription = "Les mer om kompetanse og behandlingstilbud.";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex justify-center px-1 pt-1.5">
        <div className="relative h-72 w-full max-w-[360px] overflow-hidden rounded-lg">
          <Image
            src={therapist.image}
            alt={`Fysioterapeut ${therapist.name} – Helse i Centrum i Bergen`}
            fill
            className="object-cover w-full h-full"
            style={{ objectPosition: therapist.imagePosition ?? "center 35%" }}
            data-object-position={therapist.imagePosition ?? "center 35%"}
            sizes="360px"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3 pt-2">
        <h3 className="text-lg font-bold text-gray-900">{therapist.name}</h3>
        <p className="mt-0.5 text-primary-600">{previewTitle}</p>
        <p className="mt-1 text-sm text-gray-600">{previewDescription}</p>
        <div className="mt-auto pt-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <BookingCta therapist={therapist} />
            <Link
              href="/terapeuter"
              className={`text-sm font-medium text-primary-600 underline-offset-2 hover:underline ${focusRing} py-1`}
            >
              Les mer
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
