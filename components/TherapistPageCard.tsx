"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import type { Therapist } from "@/lib/content";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md";

interface TherapistPageCardProps {
  therapist: Therapist;
}

function TherapistModalImage({ therapist }: { therapist: Therapist }) {
  const useNativeImg = therapist.image.startsWith("/content/");
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50">
      {useNativeImg ? (
        <img
          src={therapist.image}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover ${therapist.id === "eirik-berge" ? "scale-[1.35]" : ""}`}
          style={{ objectPosition: therapist.imagePosition ?? "center 35%" }}
        />
      ) : (
        <Image
          src={therapist.image}
          alt=""
          fill
          className={`h-full w-full object-cover ${therapist.id === "eirik-berge" ? "scale-[1.35]" : ""}`}
          style={{ objectPosition: therapist.imagePosition ?? "center 35%" }}
          sizes="(max-width: 640px) 100vw, 400px"
        />
      )}
    </div>
  );
}

function BioModal({
  therapist,
  onClose,
}: {
  therapist: Therapist;
  onClose: () => void;
}) {
  const hasBooking = !!therapist.bookingUrl;
  const contactHref = `/kontakt?terapeut=${encodeURIComponent(therapist.id)}#skjema`;
  const paragraphs = therapist.professionalProfile
    .split(/\n+/)
    .filter((p) => p.trim());

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  const ctaBlock = (
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={contactHref}
          className={`inline-flex w-fit items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
        >
          {hasBooking ? "Bestill time" : "Ta kontakt for time"}
        </Link>
      </div>
    );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      aria-label={`Om ${therapist.name}`}
    >
      <div
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        className="relative z-10 mx-auto flex max-h-[90vh] w-full max-w-[760px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end border-b border-gray-100 pb-2">
          <button
            type="button"
            onClick={onClose}
            className={`rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${focusRing}`}
            aria-label="Lukk"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto pt-2">
          <div className="mx-auto grid w-full max-w-[400px] grid-cols-1 gap-4 sm:max-w-none sm:grid-cols-[240px_1fr] sm:gap-6 sm:px-0">
            {/* Mobil: navn → bilde → bio. Desktop: venstre = bilde, høyre = navn + bio + CTA */}
            <div className="sm:col-start-2 sm:row-start-1">
              <h2 className="text-xl font-bold text-gray-900">{therapist.name}</h2>
              <p className="mt-0.5 whitespace-pre-line text-sm text-primary-600">{therapist.role}</p>
            </div>
            <div className="sm:col-start-1 sm:row-start-1 sm:row-span-2">
              <TherapistModalImage therapist={therapist} />
            </div>
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed sm:col-start-2 sm:row-start-2">
              {paragraphs.length > 0 ? (
                paragraphs.map((p, i) => <p key={i}>{p.trim()}</p>)
              ) : (
                <p>{therapist.professionalProfile}</p>
              )}
              {therapist.focusAreas.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {therapist.focusAreas.map((area) => (
                    <li
                      key={area}
                      className="rounded-full bg-primary-50 px-3 py-1 text-xs text-primary-700"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-6 max-sm:hidden">
                {ctaBlock}
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 mt-auto border-t border-gray-100 bg-white pt-3 pb-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] sm:hidden">
            <div className="mx-auto max-w-[400px]">
              {ctaBlock}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PLACEHOLDER_ID = "placeholder-5";

function PlaceholderCardContent() {
  return (
    <article
      id={PLACEHOLDER_ID}
      className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm scroll-mt-24"
    >
      <div className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-t-xl bg-slate-100 md:aspect-square md:h-auto">
        <svg
          className="h-20 w-20 text-slate-400"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-lg font-bold text-gray-900">Flere terapeuter</h3>
        <p className="mt-2 text-sm text-gray-600">Profil publiseres fortløpende.</p>
        <div className="mt-4 mt-auto">
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

export function TherapistPageCard({ therapist }: TherapistPageCardProps) {
  if (therapist.id === PLACEHOLDER_ID) {
    return <PlaceholderCardContent />;
  }

  const [modalOpen, setModalOpen] = useState(false);
  const hasBooking = !!therapist.bookingUrl;
  const contactHref = `/kontakt?terapeut=${encodeURIComponent(therapist.id)}#skjema`;
  const teaser = therapist.summary ?? therapist.professionalProfile;
  return (
    <>
      <article id={therapist.id} className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm scroll-mt-24">
        <div className="relative h-52 w-full overflow-hidden rounded-t-xl bg-slate-50 md:aspect-square md:h-auto">
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
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="text-lg font-bold text-gray-900">{therapist.name}</h3>
          <p className="mt-0.5 whitespace-pre-line text-sm text-primary-600">{therapist.role}</p>
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">{teaser}</p>

          <div className="mt-4 mt-auto flex flex-col gap-2">
            <Link
              href={contactHref}
              className={`inline-flex w-fit items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
            >
              {hasBooking ? "Bestill time" : "Ta kontakt for time"}
            </Link>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className={`mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 ${focusRing} py-1`}
            >
              Les mer
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </article>

      {modalOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <BioModal therapist={therapist} onClose={() => setModalOpen(false)} />,
          document.body
        )}
    </>
  );
}
