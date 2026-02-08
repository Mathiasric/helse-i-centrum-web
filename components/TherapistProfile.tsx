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

function BulletSection({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
      <ul className="mt-1.5 space-y-1 text-sm text-gray-600">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TherapistProfile({ therapist }: TherapistProfileProps) {
  const [showMore, setShowMore] = useState(false);
  const paragraphs = therapist.professionalProfile
    .split(/\n+/)
    .filter((p) => p.trim());

  const hasBullets =
    (therapist.focusAreas?.length ?? 0) > 0 ||
    (therapist.education?.length ?? 0) > 0 ||
    (therapist.methods?.length ?? 0) > 0 ||
    (therapist.experience?.length ?? 0) > 0;

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

        {/* Mobile (< md): compact – 1 intro line, CTA, accordion for all detail */}
        <div className="md:hidden">
          {therapist.summary && (
            <p className="mt-3 max-w-prose text-gray-600 leading-relaxed">{therapist.summary}</p>
          )}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
            <ProfileCta therapist={therapist} compact />
            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className={`inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 ${focusRing} py-1`}
              aria-expanded={showMore}
            >
              {showMore ? "Vis mindre" : "Vis mer"}
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
            <div className="mt-4 space-y-4">
              {hasBullets && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {therapist.focusAreas?.length ? (
                    <BulletSection title="Fokusområder" items={therapist.focusAreas} />
                  ) : null}
                  {therapist.specialization?.length ? (
                    <BulletSection title="Spesialisering" items={therapist.specialization} />
                  ) : null}
                  {therapist.education?.length ? (
                    <BulletSection title="Utdanning" items={therapist.education} />
                  ) : null}
                  {therapist.experience?.length ? (
                    <BulletSection title="Erfaring" items={therapist.experience} />
                  ) : null}
                  {therapist.methods?.length ? (
                    <BulletSection title="Metoder" items={therapist.methods} />
                  ) : null}
                </div>
              )}
              <div className="max-w-prose space-y-4 text-gray-600 leading-relaxed">
                {paragraphs.length > 0 ? (
                  paragraphs.map((p, i) => <p key={i}>{p.trim()}</p>)
                ) : (
                  <p>{therapist.professionalProfile}</p>
                )}
              </div>
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
