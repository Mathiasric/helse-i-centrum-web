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
      className={`fixed inset-0 z-50 lg:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-modal="true"
      aria-label="Meny"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Drawer – slide in from right, full height */}
      <div
        className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top: X button */}
        <div className="flex items-center justify-end px-6 pt-6">
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

        <div className="px-6 py-6 space-y-6">
          {/* Bestill time – øverst, kompakt CTA */}
          {useTerapeuterLink ? (
            <Link
              href="/terapeuter"
              onClick={onClose}
              className={`block w-full rounded-lg bg-primary-700 py-3 text-center text-base font-semibold text-white transition hover:bg-primary-800 ${focusRing}`}
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
              className={`w-full rounded-lg bg-primary-700 py-3 text-center text-base font-semibold text-white transition hover:bg-primary-800 ${focusRing}`}
            >
              Bestill time
            </button>
          ) : null}

          {/* Nav links – stram og ryddig */}
          <nav className="flex flex-col" aria-label="Hovednavigasjon">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`relative block text-lg font-medium py-2 ${focusRing} ${
                    active ? "text-gray-900" : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-primary-700" />
                  )}
                </Link>
              );
            })}
            <a
              href={phoneHref}
              onClick={onClose}
              className={`block text-lg font-medium py-2 text-gray-700 hover:text-gray-900 ${focusRing}`}
            >
              Ring {clinic.contact.phoneDisplay}
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
