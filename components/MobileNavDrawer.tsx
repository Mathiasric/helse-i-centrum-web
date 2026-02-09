"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { getClinic } from "@/lib/content";

const clinic = getClinic();
const phoneHref = `tel:${clinic.contact.phoneE164}`;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md";

const navLinks = [
  { href: "/", label: "Hjem" },
  { href: "/terapeuter", label: "Terapeuter" },
  { href: "/kontakt", label: "Kontakt" },
];

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
  onRequestBooking?: () => void;
}

export function MobileNavDrawer({ open, onClose, onRequestBooking }: MobileNavDrawerProps) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, handleEsc]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden" aria-modal="true" aria-label="Meny">
      <div
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
          <button
            type="button"
            onClick={onClose}
            aria-label="Lukk meny"
            className={`absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${focusRing}`}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <nav className="flex flex-col gap-1" aria-label="Hovednavigasjon">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 ${focusRing}`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={phoneHref}
              onClick={onClose}
              className={`rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 ${focusRing}`}
            >
              Ring
            </a>
            {onRequestBooking && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestBooking();
                }}
                className={`rounded-lg px-4 py-3 text-left text-base font-medium text-primary-600 hover:bg-primary-50 ${focusRing}`}
              >
                Bestill time
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
