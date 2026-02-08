"use client";

import { useEffect } from "react";
import Link from "next/link";
import { getClinic } from "@/lib/content";

const clinic = getClinic();
const phoneHref = `tel:${clinic.contact.phoneE164}`;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md";

const navLinks = [
  { href: "/", label: "Hjem" },
  { href: "/terapeuter", label: "Terapeuter" },
  { href: "/#kontakt", label: "Kontakt" },
];

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 md:hidden"
        aria-hidden="true"
        onClick={onClose}
      />
      <aside
        className="fixed right-0 top-0 z-50 h-full w-72 max-w-[85vw] border-l border-gray-200 bg-white shadow-xl md:hidden"
        aria-modal="true"
        aria-label="Meny"
      >
        <nav className="flex flex-col gap-1 p-4 pt-16" aria-label="Hovednavigasjon">
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
            className={`flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 ${focusRing}`}
          >
            Ring
          </a>
        </nav>
      </aside>
    </>
  );
}
