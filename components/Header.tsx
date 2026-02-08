import Link from "next/link";
import Image from "next/image";
import { getClinic } from "@/lib/content";
import { BookingButton } from "./BookingButton";

const clinic = getClinic();

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className={`inline-flex shrink-0 ${focusRing}`}
          aria-label="Hjem"
        >
          <span className="flex h-10 w-10 overflow-hidden rounded-full">
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

        <nav
          className="flex items-center gap-4 sm:gap-6"
          aria-label="Hovednavigasjon"
        >
          <Link
            href="/"
            className={`text-sm font-medium text-gray-700 transition hover:text-gray-900 ${focusRing} px-1 py-0.5`}
          >
            Hjem
          </Link>
          <Link
            href="/terapeuter"
            className={`text-sm font-medium text-gray-700 transition hover:text-gray-900 ${focusRing} px-1 py-0.5`}
          >
            Terapeuter
          </Link>
          <Link
            href="/#kontakt"
            className={`text-sm font-medium text-gray-700 transition hover:text-gray-900 ${focusRing} px-1 py-0.5`}
          >
            Kontakt
          </Link>
          <BookingButton />
        </nav>
      </div>
    </header>
  );
}
