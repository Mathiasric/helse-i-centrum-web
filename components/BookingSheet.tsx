"use client";

import { useEffect } from "react";
import { getClinic, getTherapists } from "@/lib/content";

const clinic = getClinic();
const therapists = getTherapists();
const phoneHref = `tel:${clinic.contact.phoneE164}`;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md";

interface BookingSheetProps {
  open: boolean;
  onClose: () => void;
}

export function BookingSheet({ open, onClose }: BookingSheetProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/40 md:hidden"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        className="fixed inset-x-0 bottom-0 z-[101] rounded-t-xl border-t border-gray-200 bg-white shadow-xl md:hidden"
        aria-modal="true"
        aria-label="Bestill time"
      >
        <div className="flex justify-center py-3">
          <div className="h-1 w-12 rounded-full bg-gray-300" aria-hidden />
        </div>
        <div className="px-4 pb-8 pt-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Velg terapeut
          </h3>
          <div className="mt-4 flex flex-col gap-2">
            {therapists.map((t) => (
              <a
                key={t.id}
                href={t.bookingUrl ?? phoneHref}
                target={t.bookingUrl ? "_blank" : undefined}
                rel={t.bookingUrl ? "noopener noreferrer" : undefined}
                onClick={onClose}
                className={`flex items-center justify-between rounded-lg bg-primary-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
              >
                Bestill hos {t.name.split(" ")[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
