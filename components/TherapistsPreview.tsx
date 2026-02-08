import Link from "next/link";
import { getTherapists } from "@/lib/content";
import { TherapistCard } from "./TherapistCard";

const therapists = getTherapists();

export function TherapistsPreview() {
  return (
    <section className="bg-gray-50 py-16 sm:py-20" aria-labelledby="terapeuter-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="terapeuter-heading" className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Våre terapeuter
        </h2>
        <p className="mt-2 text-gray-600">
          Fysioterapeuter i Bergen sentrum med kompetanse innen manuellterapi og allmennfysioterapi.
        </p>
        <Link
          href="/terapeuter"
          className="mt-3 inline-block text-sm font-medium text-primary-600 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
        >
          Se terapeuter →
        </Link>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:items-stretch">
          {therapists.map((therapist) => (
            <TherapistCard key={therapist.id} therapist={therapist} variant="preview" />
          ))}
        </div>
      </div>
    </section>
  );
}
