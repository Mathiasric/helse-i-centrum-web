import Image from "next/image";
import Link from "next/link";
import { type Therapist } from "@/lib/content";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md";

interface TherapistCardProps {
  therapist: Therapist;
  variant?: "preview" | "full";
}

function BookingCta({ therapist }: { therapist: Therapist }) {
  const hasBooking = !!therapist.bookingUrl;
  const contactHref = `/kontakt?terapeut=${encodeURIComponent(therapist.id)}#skjema`;

  return (
    <div className="flex flex-col gap-0.5">
      <Link
        href={contactHref}
        className={`inline-flex w-fit items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
      >
        {hasBooking ? "Bestill time" : "Ta kontakt for time"}
      </Link>
    </div>
  );
}

const PLACEHOLDER_ID = "placeholder-5";

function PlaceholderCardPreview() {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex justify-center px-1 pt-1.5">
        <div className="relative flex aspect-square w-full max-w-[360px] items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
          <svg className="h-20 w-20 text-slate-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3 pt-2">
        <h3 className="text-lg font-bold text-gray-900">Flere terapeuter</h3>
        <p className="mt-2 text-sm text-gray-600">Profil publiseres fortløpende.</p>
        <div className="mt-auto pt-3">
          <Link
            href="/kontakt"
            className={`inline-flex w-fit items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
          >
            Kontakt klinikken
          </Link>
        </div>
      </div>
    </article>
  );
}

export function TherapistCard({ therapist, variant = "preview" }: TherapistCardProps) {
  if (therapist.id === PLACEHOLDER_ID) {
    return <PlaceholderCardPreview />;
  }
  if (variant === "full") {
    return (
      <article className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:p-6">
        <div className="relative aspect-square w-44 shrink-0 overflow-hidden rounded-2xl bg-slate-50 sm:w-48">
          {therapist.image.startsWith("/content/") ? (
            <img
              src={therapist.image}
              alt={`${therapist.name} – Helse i Centrum Bergen`}
              className={`absolute inset-0 h-full w-full object-cover ${therapist.id === "eirik-berge" ? "scale-[1.35]" : ""}`}
              style={{ objectPosition: therapist.imagePosition ?? "center 35%" }}
              loading="lazy"
            />
          ) : (
            <Image
              src={therapist.image}
              alt={`${therapist.name} – Helse i Centrum Bergen`}
              fill
              className={`h-full w-full object-cover ${therapist.id === "eirik-berge" ? "scale-[1.35]" : ""}`}
              style={{ objectPosition: therapist.imagePosition ?? "center 35%" }}
              sizes="208px"
              loading="lazy"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col">
          <h3 className="text-xl font-bold text-gray-900">{therapist.name}</h3>
          <p className="mt-1 whitespace-pre-line text-primary-600">{therapist.role}</p>
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

  const teaser = therapist.summary ?? therapist.professionalProfile;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex justify-center px-1 pt-1.5">
        <div className="relative aspect-square w-full max-w-[360px] overflow-hidden rounded-2xl bg-slate-50">
          {therapist.image.startsWith("/content/") ? (
            <img
              src={therapist.image}
              alt={`${therapist.name} – Helse i Centrum Bergen`}
              className={`absolute inset-0 h-full w-full object-cover ${therapist.id === "eirik-berge" ? "scale-[1.35]" : ""}`}
              style={{ objectPosition: therapist.imagePosition ?? "center 35%" }}
              loading="lazy"
            />
          ) : (
            <Image
              src={therapist.image}
              alt={`${therapist.name} – Helse i Centrum Bergen`}
              fill
              className={`h-full w-full object-cover ${therapist.id === "eirik-berge" ? "scale-[1.35]" : ""}`}
              style={{ objectPosition: therapist.imagePosition ?? "center 35%" }}
              sizes="360px"
              loading="lazy"
            />
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3 pt-2">
        <h3 className="text-lg font-bold text-gray-900">{therapist.name}</h3>
        <p className="mt-0.5 whitespace-pre-line text-primary-600">{therapist.role}</p>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{teaser}</p>
        <div className="mt-auto pt-3 flex flex-col gap-2">
          <BookingCta therapist={therapist} />
          <Link
            href={`/terapeuter#${therapist.id}`}
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded py-1"
          >
            Les mer
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
