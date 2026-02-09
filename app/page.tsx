import { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ServicesOverview } from "@/components/ServicesOverview";
import { TherapistsPreview } from "@/components/TherapistsPreview";
import { ClinicSection } from "@/components/ClinicSection";

export const metadata: Metadata = {
  title: "Fysioterapi i Bergen sentrum | Helse i Centrum",
  description:
    "Fysioterapi i Bergen sentrum. Manuellterapi og behandling av muskel- og skjelettplager. Bestill time eller ring 55 90 06 80.",
  alternates: {
    canonical: "https://helseicentrum.no",
  },
  openGraph: {
    title: "Fysioterapi i Bergen sentrum | Helse i Centrum",
    description:
      "Fysioterapi i Bergen sentrum. Manuellterapi og behandling av muskel- og skjelettplager. Bestill time eller ring 55 90 06 80.",
    url: "https://helseicentrum.no",
    siteName: "Helse i Centrum",
    type: "website",
    images: [{ url: "/content/image/Hero_img.png", width: 1200, height: 630, alt: "Helse i Centrum – Fysioterapi i Bergen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fysioterapi i Bergen sentrum | Helse i Centrum",
    description:
      "Fysioterapi i Bergen sentrum. Manuellterapi og behandling av muskel- og skjelettplager.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <TherapistsPreview />
      <ClinicSection />
    </>
  );
}
