import { Metadata } from "next";
import Link from "next/link";
import { getClinic, getTherapists } from "@/lib/content";
import { TherapistPageCard } from "@/components/TherapistPageCard";
import { BreadcrumbSchema } from "@/components/ClinicSchema";

const clinic = getClinic();
const SITE_URL = "https://hicbergen.no";

export const metadata: Metadata = {
  title: "Terapeuter – Fysioterapi i Bergen sentrum",
  description:
    "Se våre terapeuter i Bergen sentrum. Finn riktig behandler og bestill time online via Physica.",
  alternates: {
    canonical: "https://hicbergen.no/terapeuter",
  },
  openGraph: {
    title: "Terapeuter | Fysioterapi i Bergen sentrum | Helse i Centrum",
    description:
      "Se våre terapeuter i Bergen sentrum. Finn riktig behandler og bestill time online via Physica.",
    url: "https://hicbergen.no/terapeuter",
    siteName: "Helse i Centrum",
    type: "website",
    images: [{ url: "https://hicbergen.no/content/image/og-hero.jpg", width: 1200, height: 630, alt: "Terapeuter – Helse i Centrum Bergen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terapeuter | Fysioterapi i Bergen sentrum | Helse i Centrum",
    description: "Se våre terapeuter i Bergen sentrum. Bestill time online via Physica.",
  },
};

export default function TherapistsPage() {
  const therapists = getTherapists();

  // Only worth saying when the two groups actually differ.
  const bookable = therapists.filter((t) => t.bookingUrl);
  const bookableNames =
    bookable.length > 0 && bookable.length < therapists.length
      ? new Intl.ListFormat("nb-NO", { style: "long", type: "conjunction" }).format(
          bookable.map((t) => t.name.split(" ")[0])
        )
      : "";

  return (
    <div className="bg-white">
      <BreadcrumbSchema
        items={[
          { name: "Hjem", url: SITE_URL },
          { name: "Terapeuter", url: `${SITE_URL}/terapeuter` },
        ]}
      />
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Våre terapeuter
        </h1>
        <p className="mt-4 max-w-2xl text-gray-600">
          {clinic.therapistsPageIntro ?? clinic.summary}
        </p>
        <Link
          href="/kontakt#skjema"
          className="mt-4 inline-block text-sm font-medium text-primary-600 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
        >
          Send oss en melding →
        </Link>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-24">
        {bookableNames && (
          <p className="mb-8 max-w-2xl text-sm text-gray-600">
            {bookableNames} kan bookes direkte online. De øvrige avtaler time
            på telefon eller via skjema.
          </p>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
          {therapists.map((therapist, index) => (
            <div
              key={therapist.id}
              className={
                [
                  "w-full min-w-0 lg:col-span-2",
                  therapists.length === 5 && index === 3 ? "lg:col-start-2 lg:mr-[2.5rem]" : "",
                  therapists.length === 5 && index === 4 ? "lg:col-start-4 lg:ml-[2.5rem]" : "",
                ]
                  .filter(Boolean)
                  .join(" ")
              }
            >
              <TherapistPageCard therapist={therapist} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
