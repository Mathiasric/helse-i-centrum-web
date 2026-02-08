---
name: technical-seo
description: Implements technical SEO best practices: correct titles, meta descriptions, semantic HTML, clean URL structure, and LocalBusiness/Physiotherapist schema. Use when building pages, adding metadata, structuring content, or optimizing for local search visibility. Focus on clear information and local relevance, not keyword stuffing.
---

# Teknisk SEO

## Prinsipp

- **Klar informasjon**: Brukere og søkemotorer skal raskt forstå hva siden handler om.
- **Lokal synlighet**: Prioriter strukturert data som støtter lokal søk (fysioterapi, helseklinikk).
- **Ingen keyword stuffing**: Naturlig språk. Én hovedtanke per side.
- **Semantikk først**: Riktig HTML gir bedre aksessibilitet og SEO.

---

## Title og meta description

### Title

- **Lengde**: 50–60 tegn (ellers kuttet i SERP).
- **Struktur**: `[Tjeneste/tema] | [Foretaksnavn]` eller `[Foretaksnavn] - [Tjeneste]`.
- **Unik**: Hver side har sin egen title.

**Eksempler**:
- `Fysioterapi ved nakke- og ryggsmerter | Helseicentrum`
- `Om oss - Helseicentrum Fysioterapi`
- `Kiropraktikk | Helseicentrum`

### Meta description

- **Lengde**: 150–160 tegn.
- **Innhold**: Beskriv hva siden tilbyr, hvem den er for, og en klar call-to-action.
- **Unik**: Ikke gjenta samme beskrivelse på tvers av sider.

**Unngå**: Å liste mange nøkkelord. Skriv en kort, lesbar setning.

**Eksempel**:
```
Få profesjonell fysioterapi for nakke- og ryggsmerter i Oslo. Vi tilbyr skreddersydd behandling. Book time enkelt online.
```

---

## Semantisk HTML

- **Én H1** per side – identifiserer hovedtemaet.
- **H2–H6** i logisk rekkefølge (aldri hopp over nivåer).
- **header**, **nav**, **main**, **footer** for struktur.
- **article** for selvstendig innhold (f.eks. bloggpost, behandlingstype).
- **section** for tematiske blokker innen en side.
- Bruk **button** for handlinger, **a** for navigasjon.
- **alt-tekst** på alle bilder – beskriv innholdet kort.

---

## URL-struktur

- **Kort og beskrivende**: `/fysioterapi`, `/om-oss`, `/behandlinger/nakkesmerter`.
- **Bruk bindestrek**: `nakke-og-ryggsmerter`, ikke `nakke_og_ryggsmerter`.
- **Små bokstaver**: `/Om-Oss` → `/om-oss`.
- **Unngå**: Deep nesting (`/tjenester/behandlinger/type1/varianter`).
- **Stabil**: Endre ikke URL-er uten 301-redirect.

---

## LocalBusiness og Physiotherapist schema

Legg inn JSON-LD i `<head>` for hovedsiden og relevante sidetyper.

### LocalBusiness (grunnleggende)

```json
{
  "@context": "https://schema.org",
  "@type": "Physiotherapist",
  "name": "Helseicentrum",
  "description": "Fysioterapi og kiropraktikk i Oslo. Vi hjelper deg med smerter og bevegelsesproblemer.",
  "url": "https://example.com",
  "telephone": "+47 123 45 678",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Eksempelgate 1",
    "addressLocality": "Oslo",
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
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "16:00"
    }
  ]
}
```

### OpenGraph (deling)

- `og:title` – ofte lik eller liknende page title.
- `og:description` – kan bruke meta description.
- `og:image` – kvadratisk eller 16:9, min. 1200×630 px.
- `og:url` – kanonisk URL.
- `og:type` – f.eks. `website` eller `article`.

---

## Lokal synlighet

- Inkluder **adresse**, **telefon** og **åpningstider** tydelig på siden.
- Schema med **geo** og **openingHours** understøtter lokale søk.
- Kontekstuelle lenker (f.eks. til bydel eller nærområde) hjelper uten å være keyword stuffing.
- **NAPs** (Name, Address, Phone) konsistent på tvers av nettside, Google My Business og andre lister.

---

## Selvsjekk

Før du avslutter SEO-relaterte endringer:

- [ ] Title unik og 50–60 tegn
- [ ] Meta description unik og 150–160 tegn
- [ ] Én H1 per side
- [ ] Semantisk HTML (header, main, nav, footer, article/section)
- [ ] Ryddig URL (bindestrek, små bokstaver)
- [ ] LocalBusiness/Physiotherapist schema der det er naturlig
- [ ] OpenGraph-felter for sosiale delinger
- [ ] Ingen keyword stuffing – naturlig språk

---

## Referanse

For fullstendige schema-eksempler og valideringsverktyy, se [reference.md](reference.md).
