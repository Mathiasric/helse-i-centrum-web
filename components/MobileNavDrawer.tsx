"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
  useTerapeuterLink?: boolean;
  onRequestBooking?: () => void;
}

export function MobileNavDrawer({ open, onClose, useTerapeuterLink, onRequestBooking }: MobileNavDrawerProps) {
  const pathname = usePathname();

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

  return (
    <div
      className={`fixed inset-0 z-[100] md:hidden transition-opacity duration-200 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-modal="true"
      aria-label="Meny"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Drawer – slide in from right */}
      <div
        className={`fixed right-0 top-0 h-dvh w-[85vw] max-w-sm bg-white shadow-xl transition-transform duration-200 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top: X button */}
        <div className="flex items-center justify-end px-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Lukk meny"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${focusRing}`}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4 pt-2" aria-label="Hovednavigasjon">
          {/* Bestill time – øverst som primær CTA */}
          {useTerapeuterLink ? (
            <Link
              href="/terapeuter"
              onClick={onClose}
              className={`w-full rounded-lg bg-primary-600 px-4 py-3 text-center text-base font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
            >
              Bestill time
            </Link>
          ) : onRequestBooking ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestBooking();
              }}
              className={`w-full rounded-lg bg-primary-600 px-4 py-3 text-center text-base font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
            >
              Bestill time
            </button>
          ) : null}

          {/* Separator */}
          <div className="my-2 border-t border-gray-100" />

          {/* Nav links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`rounded-lg px-4 py-3 text-base font-medium transition ${focusRing} ${
                isActive(pathname, link.href)
                  ? "text-gray-900 bg-gray-50 underline underline-offset-4 decoration-2 decoration-primary-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={phoneHref}
            onClick={onClose}
            className={`rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 ${focusRing}`}
          >
            Ring {clinic.contact.phoneDisplay}
          </a>
        </nav>
      </div>
    </div>
  );
}
