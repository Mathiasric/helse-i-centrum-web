import Link from "next/link";
import { Hand, Stethoscope, Bone, RotateCcw, Activity, Thermometer } from "lucide-react";
import { getClinic } from "@/lib/content";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Manuellterapi": Hand,
  "Allmennfysioterapi": Stethoscope,
  "Muskel- og skjelettplager": Bone,
  "Rehabilitering etter skade & operasjon": RotateCcw,
  "Opptrening & funksjonsforbedring": Activity,
  "Akutte & langvarige smerter": Thermometer,
};

const clinic = getClinic();

export function ServicesOverview() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Tjenester
        </h2>
        <p className="mt-2 text-gray-600">
          Manuellterapi og allmennfysioterapi i Bergen sentrum.
        </p>
        <Link
          href="/#kontakt"
          className="mt-3 inline-block text-sm font-medium text-primary-600 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
        >
          Kontakt & adkomst →
        </Link>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {clinic.services.map((service) => {
            const Icon = iconMap[service.name];
            return (
              <div
                key={service.name}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-primary-200 hover:shadow-md"
              >
                {Icon && (
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition group-hover:bg-primary-100">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900">
                  {service.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
