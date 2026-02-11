import Image from "next/image";
import { Metadata } from "next";
import { getClinic } from "@/lib/content";
import { ContactSection } from "@/components/ContactSection";
import { ContactForm } from "@/components/ContactForm";

const clinic = getClinic();

const SITE_URL = "https://helseicentrum.no";

export const metadata: Metadata = {
  title: "Kontakt & adkomst | Helse i Centrum – Bergen",
  description:
    "Adresse, åpningstider og kontaktinformasjon for Helse i Centrum i Bergen. Se kart, finn inngangen i Markeveien 4C og send oss en melding.",
  alternates: {
    canonical: `${SITE_URL}/kontakt`,
  },
  openGraph: {
    title: "Kontakt & adkomst | Helse i Centrum – Bergen",
    description:
      "Adresse, åpningstider og kontaktinformasjon for Helse i Centrum i Bergen. Se kart, finn inngangen i Markeveien 4C og send oss en melding.",
    url: `${SITE_URL}/kontakt`,
    siteName: "Helse i Centrum",
    type: "website",
    images: [{ url: "/content/image/Hero_img.png", width: 1200, height: 630, alt: "Helse i Centrum – Kontakt i Bergen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt & adkomst | Helse i Centrum – Bergen",
    description:
      "Adresse, åpningstider og kontaktinformasjon for Helse i Centrum i Bergen. Se kart, finn inngangen i Markeveien 4C og send oss en melding.",
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Helse i Centrum",
  url: `${SITE_URL}/kontakt`,
  telephone: "+4755900680",
  email: "hicbergen@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Markeveien 4C",
    addressLocality: "Bergen",
    postalCode: "5012",
    addressCountry: "NO",
  },
};

export default function KontaktPage() {
  return (
    <div className="min-w-0 overflow-x-hidden bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Kontakt & adkomst
        </h1>
        <p className="mt-2 text-lg text-gray-600 sm:text-xl">
          Helse i Centrum – Bergen
        </p>
      </section>

      {/* Kontaktinformasjon + kart */}
      <ContactSection />

      {/* Send oss en melding: inngang + skjema */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
            {/* Venstre på desktop, under på mobil */}
            <div className="order-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:order-1">
              <div className="relative aspect-[4/3.75] w-full">
                <Image
                  src="/content/image/Inngang.png"
                  alt="Inngang til Helse i Centrum i Bergen"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <p className="border-t border-gray-100 px-4 py-3 text-sm text-gray-500">
                Inngang: Markeveien 4C
              </p>
            </div>

            {/* Høyre på desktop, først på mobil */}
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Send oss en melding
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Ønsker du å bestille time? Skriv det i meldingen og oppgi fødselsdato og telefon.
              </p>
              <div className="mt-6">
                <ContactForm />
                <p className="mt-4 text-xs leading-relaxed text-gray-500">
                  Vi bruker opplysningene dine kun for å svare på henvendelsen. Les personvernerklæringen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
