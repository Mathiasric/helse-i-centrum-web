import Image from "next/image";
import Link from "next/link";
import { getClinic } from "@/lib/content";

const clinic = getClinic();
const phoneHref = `tel:${clinic.contact.phoneE164}`;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-md";

export function Hero() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[75vh]">
      <div className="absolute inset-0">
        <Image
          src="/content/image/Hero_img.png"
          alt="Fysioterapi og behandling hos Helse i Centrum i Bergen"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gray-900/50"
          aria-hidden="true"
        />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-28">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          {clinic.name}
        </h1>
        <p className="mt-2 text-lg text-white/90 sm:text-xl">
          {clinic.location.city}
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
          {clinic.heroShortIntro ?? `${clinic.summary} Sentral beliggenhet i Bergen sentrum – kort vei fra kollektivtransport.`}
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:gap-4">
          <Link
            href="/terapeuter"
            className={`inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-primary-700 ${focusRing}`}
          >
            Bestill time
          </Link>
          <a
            href={phoneHref}
            className={`inline-flex items-center justify-center rounded-lg border border-white/80 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10 ${focusRing}`}
          >
            Ring
          </a>
        </div>
      </div>
    </section>
  );
}
