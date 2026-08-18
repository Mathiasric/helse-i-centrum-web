"use client";

import { useState, useRef, useEffect } from "react";
import { getClinic, getTherapists, getBookingHref } from "@/lib/content";

const clinic = getClinic();
const therapists = getTherapists();
const hasBookingUrls = therapists.some((t) => t.bookingUrl);
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

  // Nobody bookable online: the phone is the only route worth offering.
  if (!hasBookingUrls) {
    return (
      <a
        href={phoneHref}
        className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
      >
        Bestill time
      </a>
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
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
          className="absolute right-0 top-full z-50 mt-2 min-w-[260px] rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
          role="menu"
        >
          {therapists.map((t) => {
            const online = !!t.bookingUrl;
            return (
              <a
                key={t.id}
                href={getBookingHref(t)}
                target={online ? "_blank" : undefined}
                rel={online ? "noopener noreferrer" : undefined}
                role="menuitem"
                className={`flex items-center justify-between gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 ${focusRing}`}
                onClick={() => setOpen(false)}
              >
                <span>{t.name}</span>
                {online && (
                  <span className="shrink-0 rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">
                    Online
                  </span>
                )}
              </a>
            );
          })}
          <div className="my-2 border-t border-gray-100" />
          <a
            href="/terapeuter"
            role="menuitem"
            className={`block px-4 py-2 text-sm font-medium text-primary-600 hover:bg-gray-50 ${focusRing}`}
            onClick={() => setOpen(false)}
          >
            Se alle terapeuter →
          </a>
        </div>
      )}
    </div>
  );
}
