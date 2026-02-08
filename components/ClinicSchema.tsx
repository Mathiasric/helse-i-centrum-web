import { getClinic } from "@/lib/content";

const SITE_URL = "https://helseicentrum.no";

export function ClinicSchema() {
  const clinic = getClinic();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Physiotherapist",
    "@id": `${SITE_URL}/#organization`,
    name: "Helse i Centrum – Bergen",
    alternateName: clinic.alternateName,
    description: clinic.summary,
    url: SITE_URL,
    telephone: clinic.contact.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.location.addressLine1,
      addressLocality: clinic.location.city,
      postalCode: clinic.location.postalCode,
      addressCountry: "NO",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    areaServed: {
      "@type": "City",
      name: "Bergen",
      containedInPlace: {
        "@type": "Country",
        name: "Norge",
      },
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 60.3913,
      longitude: 5.3221,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
