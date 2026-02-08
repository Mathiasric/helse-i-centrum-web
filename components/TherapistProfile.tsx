import Image from "next/image";
import { getClinic, type Therapist } from "@/lib/content";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md";

interface TherapistProfileProps {
  therapist: Therapist;
}

function ProfileCta({ therapist }: { therapist: Therapist }) {
  const hasBooking = !!therapist.bookingUrl;

  return (
    <div className="mt-6 flex flex-col gap-0.5">
      <a
        href={hasBooking ? therapist.bookingUrl! : `tel:${getClinic().contact.phoneE164}`}
        target={hasBooking ? "_blank" : undefined}
        rel={hasBooking ? "noopener noreferrer" : undefined}
        className={`inline-flex w-fit items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
      >
        {hasBooking ? "Bestill time" : "Ring for time"}
      </a>
      {hasBooking && (
        <span className="text-xs text-gray-500">Online booking · Physica</span>
      )}
    </div>
  );
}

export function TherapistProfile({ therapist }: TherapistProfileProps) {
  const paragraphs = therapist.professionalProfile
    .split(/\n+/)
    .filter((p) => p.trim());

  return (
    <article id={therapist.id} className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12 scroll-mt-24">
      <div className="relative h-64 w-56 shrink-0 overflow-hidden rounded-xl sm:h-72 sm:w-60">
        <Image
          src={therapist.image}
          alt={`Fysioterapeut ${therapist.name} – Helse i Centrum i Bergen`}
          fill
          className="object-cover"
          style={{ objectPosition: therapist.imagePosition ?? "center 35%" }}
          sizes="240px"
          loading="lazy"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-bold text-gray-900">{therapist.name}</h2>
        <p className="mt-1 text-sm font-semibold text-gray-700">{therapist.role}</p>
        {therapist.summary && (
          <p className="mt-3 max-w-prose text-gray-600 leading-relaxed">{therapist.summary}</p>
        )}
        <div className="mt-4 max-w-prose space-y-4 text-gray-600 leading-relaxed">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => (
              <p key={i}>{p.trim()}</p>
            ))
          ) : (
            <p>{therapist.professionalProfile}</p>
          )}
        </div>
        <ProfileCta therapist={therapist} />
      </div>
    </article>
  );
}
