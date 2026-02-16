"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getClinic, getTherapists } from "@/lib/content";
import { BookingButton } from "./BookingButton";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { BookingSheet } from "./BookingSheet";

const clinic = getClinic();
const therapists = getTherapists();
const useTerapeuterLink = therapists.length >= 3;
const hasBookingUrls = therapists.some((t) => t.bookingUrl);
const firstBookingUrl = therapists[0]?.bookingUrl;

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

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2.5 sm:px-6 md:py-3">
          <Link
            href="/"
            className={`inline-flex shrink-0 ${focusRing}`}
            aria-label="Hjem"
          >
            <span className="flex h-9 w-9 overflow-hidden rounded-full sm:h-10 sm:w-10">
              <Image
                src="/content/image/logo_v2.png"
                alt="Helse i Centrum – Fysioterapi Bergen"
                width={40}
                height={40}
                className="h-full w-full object-cover"
                priority
                sizes="40px"
              />
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <nav
              className="hidden items-center gap-4 md:flex md:gap-6"
              aria-label="Hovednavigasjon"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition ${focusRing} px-1 py-0.5 ${
                    isActive(pathname, link.href)
                      ? "text-gray-900 underline underline-offset-8 decoration-2 decoration-primary-600"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {useTerapeuterLink ? (
                <Link
                  href="/terapeuter"
                  className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
                >
                  Bestill time
                </Link>
              ) : hasBookingUrls ? (
                <>
                  {therapists.length === 1 && firstBookingUrl ? (
                    <Link
                      href="/kontakt#skjema"
                      className={`md:hidden inline-flex shrink-0 items-center justify-center rounded-lg bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
                    >
                      Bestill time
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setBookingOpen(true)}
                      className={`md:hidden inline-flex shrink-0 items-center justify-center rounded-lg bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
                    >
                      Bestill time
                    </button>
                  )}
                  <div className="hidden md:block">
                    <BookingButton />
                  </div>
                </>
              ) : (
                <a
                  href={`tel:${clinic.contact.phoneE164}`}
                  className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
                >
                  Bestill time
                </a>
              )}

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Åpne meny"
                className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 md:hidden ${focusRing}`}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {!useTerapeuterLink && !hasBookingUrls && (
                <div className="hidden md:block">
                  <BookingButton />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <MobileNavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} useTerapeuterLink={useTerapeuterLink} onRequestBooking={!useTerapeuterLink && hasBookingUrls ? () => setBookingOpen(true) : undefined} />
      {!useTerapeuterLink && hasBookingUrls && <BookingSheet open={bookingOpen} onClose={() => setBookingOpen(false)} />}
    </>
  );
}
