import Link from "next/link";
import { getClinic } from "@/lib/content";

const clinic = getClinic();
const phoneHref = `tel:${clinic.contact.phoneE164}`;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
      <p className="text-sm font-semibold text-primary-600">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Siden finnes ikke
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600">
        Vi fant ikke siden du lette etter. Den kan ha blitt flyttet, eller
        lenken kan være feil.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-4">
        <Link
          href="/kontakt#skjema"
          className={`inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
        >
          Bestill time
        </Link>
        <Link
          href="/terapeuter"
          className={`inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-base font-semibold text-gray-900 transition hover:bg-gray-50 ${focusRing}`}
        >
          Se terapeuter
        </Link>
      </div>
      <p className="mt-8 text-sm text-gray-600">
        Eller ring oss på{" "}
        <a href={phoneHref} className={`font-semibold text-primary-600 hover:text-primary-700 ${focusRing}`}>
          {clinic.contact.phoneDisplay}
        </a>
        .{" "}
        <Link href="/" className={`text-primary-600 hover:text-primary-700 ${focusRing}`}>
          Tilbake til forsiden
        </Link>
      </p>
    </section>
  );
}
