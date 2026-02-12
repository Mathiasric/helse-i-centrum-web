"use client";

import { useState, useRef, useEffect } from "react";
import { getClinic, getTherapists } from "@/lib/content";

const clinic = getClinic();
const therapists = getTherapists();
const phoneHref = `tel:${clinic.contact.phoneE164}`;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md";

function useClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, handler]);
}

export function BookingButton() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setOpen(false));

  const therapistsWithBooking = therapists.filter((t) => t.bookingUrl);
  const hasBookingUrls = therapistsWithBooking.length > 0;

  if (hasBookingUrls) {
    return (
      <div className="relative" ref={containerRef}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-haspopup="true"
          aria-label="Bestill time"
          className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
        >
          Bestill time
          <svg
            className={`ml-1.5 h-4 w-4 transition ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div
            className="absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
            role="menu"
          >
            {therapistsWithBooking.map((t) => (
              <a
                key={t.id}
                href="/kontakt"
                role="menuitem"
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 ${focusRing}`}
                onClick={() => setOpen(false)}
              >
                Bestill hos {t.name.split(" ")[0]}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={phoneHref}
      className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
    >
      Bestill time
    </a>
  );
}
