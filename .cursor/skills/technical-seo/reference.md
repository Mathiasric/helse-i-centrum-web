# Teknisk SEO – referanse

## Schema.org-typer for helse

| Type | Bruk |
|------|------|
| `Physiotherapist` | Fysioterapiklinikk – arver fra LocalBusiness |
| `LocalBusiness` | Generell helseklinikk |
| `MedicalBusiness` | Overordnet type for medisinske virksomheter |
| `HealthProfessional` | Individuell terapeut/behandler |

For helseicentrum: Bruk `Physiotherapist` når fysioterapi er hovedtjeneste, ellers `LocalBusiness`.

---

## Fullstendig Physiotherapist-schema

```json
{
  "@context": "https://schema.org",
  "@type": "Physiotherapist",
  "name": "Helseicentrum",
  "alternateName": "Helseicentrum Fysioterapi",
  "description": "Fysioterapi og kiropraktikk i Oslo. Vi hjelper deg med smerter og bevegelsesproblemer.",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "image": "https://example.com/bilde.jpg",
  "telephone": "+47 123 45 678",
  "email": "post@example.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Eksempelgate 1",
    "addressLocality": "Oslo",
    "addressRegion": "Oslo",
    "postalCode": "0123",
    "addressCountry": "NO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 59.9139,
    "longitude": 10.7522
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "08:00",
      "closes": "16:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Friday",
      "opens": "08:00",
      "closes": "15:00"
    }
  ],
  "priceRange": "$$",
  "areaServed": {
    "@type": "Place",
    "name": "Oslo"
  }
}
```

---

## OpenGraph-standardfelter

```html
<meta property="og:title" content="[Sidetittel]" />
<meta property="og:description" content="[Beskrivelse]" />
<meta property="og:image" content="https://example.com/bilde.jpg" />
<meta property="og:url" content="https://example.com/side" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="nb_NO" />
```

For artikler: `og:type` = `article`, og legg til `article:published_time`, `article:author` om relevant.

---

## Validering

- **Schema**: [Google Rich Results Test](https://search.google.com/test/rich-results) eller [Schema.org Validator](https://validator.schema.org/)
- **OpenGraph**: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Meta**: Sjekk at title/description ikke kuttet i [SERP-simulator](https://www.seomofo.com/snippet-optimizer.html)

---

## Next.js-integrasjon

For `app/`-router:

```ts
// app/layout.tsx eller app/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await getPageData(params.slug);
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://example.com/${params.slug}`,
      images: [{ url: data.image }],
    },
  };
}
```

JSON-LD plasseres i layout eller page som script:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
/>
```
