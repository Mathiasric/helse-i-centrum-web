import Image from "next/image";
import { getClinic } from "@/lib/content";

const clinic = getClinic();

export function ClinicSection() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl sm:aspect-[4/3] lg:max-h-[450px]">
            <Image
              src="/content/image/venterom_v2.png"
              alt="Venterom og resepsjon hos Helse i Centrum i Bergen"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Helse i Centrum – Bergen
            </h2>
            <p className="mt-4 text-gray-600">
              Vi tilbyr strukturert undersøkelse, målrettet behandling og aktiv rehabilitering for muskel- og skjelettplager – basert på faglig vurdering og individuelt tilpasset oppfølging.
            </p>
            <p className="mt-4 text-gray-600">
              {clinic.summary}
            </p>
            <p className="mt-4 text-gray-600">
              {clinic.agreements?.[0]?.description ?? "Klinikken har kommunalt driftstilskudd gjennom Bergen kommune."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
