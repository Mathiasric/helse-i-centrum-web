"use client";

import { useState } from "react";
import Image from "next/image";
import { getClinic, type Therapist } from "@/lib/content";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md";

interface TherapistProfileProps {
  therapist: Therapist;
}

function ProfileCta({ therapist, compact }: { therapist: Therapist; compact?: boolean }) {
  const hasBooking = !!therapist.bookingUrl;

  return (
    <div className={`flex flex-col gap-0.5 ${compact ? "" : "mt-6"}`}>
      <a
        href={hasBooking ? therapist.bookingUrl! : `tel:${getClinic().contact.phoneE164}`}
        target={hasBooking ? "_blank" : undefined}
        rel={hasBooking ? "noopener noreferrer" : undefined}
        className={`inline-flex items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 ${focusRing} w-full md:w-fit`}
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
  const [showMore, setShowMore] = useState(false);
  const paragraphs = therapist.professionalProfile
    .split(/\n+/)
    .filter((p) => p.trim());

  return (
    <article
      id={therapist.id}
      className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10 scroll-mt-24"
    >
      {/* Image: full width on mobile, fixed size on desktop */}
      <div className="relative w-full shrink-0 overflow-hidden rounded-xl aspect-[4/3] md:aspect-auto md:h-72 md:w-60">
        <Image
          src={therapist.image}
          alt={`Fysioterapeut ${therapist.name} – Helse i Centrum i Bergen`}
          fill
          className="object-cover object-center"
          style={{ objectPosition: therapist.imagePosition ?? "center 35%" }}
          sizes="(max-width: 767px) 100vw, 240px"
          loading="lazy"
        />
      </div>

      <div className="min-w-0 flex-1 md:max-w-none">
        <h2 className="text-xl font-bold text-gray-900">{therapist.name}</h2>
        <p className="mt-1 text-sm font-semibold text-gray-700 md:text-primary-600">{therapist.role}</p>

        {/* Desktop (md+): original layout – full professionalProfile, no summary/bullets/accordion */}
        <div className="hidden mt-4 max-w-prose space-y-4 text-gray-600 leading-relaxed md:block">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => <p key={i}>{p.trim()}</p>)
          ) : (
            <p>{therapist.professionalProfile}</p>
          )}
        </div>

        {/* Mobile (< md): image, navn, rolle, Bestill time, Les mer → brødtekst */}
        <div className="md:hidden">
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
            <ProfileCta therapist={therapist} compact />
            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className={`inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 ${focusRing} py-1`}
              aria-expanded={showMore}
            >
              {showMore ? "Vis mindre" : "Les mer"}
              <svg
                className={`h-4 w-4 transition ${showMore ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          {showMore && (
            <div className="mt-4 max-w-prose space-y-4 text-gray-600 leading-relaxed">
              {paragraphs.length > 0 ? (
                paragraphs.map((p, i) => <p key={i}>{p.trim()}</p>)
              ) : (
                <p>{therapist.professionalProfile}</p>
              )}
            </div>
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <ProfileCta therapist={therapist} />
        </div>
      </div>
    </article>
  );
}
