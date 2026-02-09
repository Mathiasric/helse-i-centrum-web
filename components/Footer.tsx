import Link from "next/link";
import Image from "next/image";
import { getClinic } from "@/lib/content";

const clinic = getClinic();
const phoneHref = `tel:${clinic.contact.phoneE164}`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.map.googleMapsQuery)}`;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-md";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. Identitet */}
          <div className="flex flex-col gap-3">
            <Link href="/" className={`inline-flex shrink-0 w-fit ${focusRing}`} aria-label="Hjem">
              <Image
                src="/content/image/logo_v2.png"
                alt={`${clinic.name} logo`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover opacity-90"
                sizes="40px"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-300">
              Fysioterapi i Bergen sentrum.
            </p>
          </div>

          {/* 2. Kontakt */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold tracking-wide text-slate-200">Kontakt</p>
            <a
              href={phoneHref}
              className={`text-sm text-slate-100 hover:underline w-fit transition ${focusRing} px-0.5 py-0.5`}
            >
              {clinic.contact.phoneDisplay}
            </a>
            {clinic.contact.email && (
              <a
                href={`mailto:${clinic.contact.email}`}
                className={`text-sm text-slate-100 hover:underline w-fit transition ${focusRing} px-0.5 py-0.5`}
              >
                {clinic.contact.email}
              </a>
            )}
            <p className="text-sm text-slate-300">
              {clinic.location.addressLine1}
              <br />
              {clinic.location.postalCode} {clinic.location.city}
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm text-gray-400 hover:text-white underline-offset-4 hover:underline w-fit transition ${focusRing} px-0.5 py-0.5`}
            >
              Åpne i Google Maps
            </a>
          </div>

          {/* 3. Åpningstider */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold tracking-wide text-slate-200">Åpningstider</p>
            {clinic.openingHours && (
              <p className="text-sm text-slate-300">{clinic.openingHours}</p>
            )}
          </div>

          {/* 4. Sider */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold tracking-wide text-slate-200">Sider</p>
            <nav className="flex flex-col gap-1" aria-label="Footer-navigasjon">
              <Link
                href="/"
                className={`text-sm text-slate-300 hover:text-slate-100 w-fit transition ${focusRing} px-0.5 py-0.5`}
              >
                Hjem
              </Link>
              <Link
                href="/terapeuter"
                className={`text-sm text-slate-300 hover:text-slate-100 w-fit transition ${focusRing} px-0.5 py-0.5`}
              >
                Terapeuter
              </Link>
              <Link
                href="/kontakt"
                className={`text-sm text-slate-300 hover:text-slate-100 w-fit transition ${focusRing} px-0.5 py-0.5`}
              >
                Kontakt
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-700/60 pt-6">
          <p className="text-xs text-slate-500">
            © {year} {clinic.name} – {clinic.location.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
