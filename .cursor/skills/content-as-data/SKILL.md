---
name: content-as-data
description: Structures all content as data in /content, separates content from presentation, and creates flexible data structures reusable by multiple components. Use when adding content, refactoring data, creating new pages, adding therapists or services, or when the user wants content-driven UI without changing layout code.
---

# Content as Data

## Prinsipp

- **Content lever i /content** – JSON eller TS-objects. Aldri hardkodet tekst i komponenter.
- **UI leser data** – Komponenter eier ikke teksten. De mottar props og renderer.
- **Fleksible strukturer** – Samme data kan brukes av flere komponenter. Nye elementer legges til uten å endre UI-kode.

---

## Mappestruktur

```
content/
├── site.ts          # Global sidetekster, meta, footer
├── pages/
│   ├── home.ts
│   ├── about.ts
│   └── services.ts
├── therapists/
│   ├── index.ts     # Liste over alle terapeuter
│   └── jane-doe.ts
├── services/
│   ├── index.ts
│   └── physiotherapy.ts
└── shared/
    └── cta.ts       # Gjenbrukte CTA-tekster
```

---

## Data-struktur

### 1. Én type = én fil/eksport

Hver content-type har en tydelig TypeScript-interface. Komponenter importerer typen og data.

```ts
// content/therapists/types.ts
export interface Therapist {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  specialization: string[];
}
```

### 2. Innhold som arrays med ID

For lister (terapeuter, tjenester): bruk `id` som nøkkel. UI itererer; ingen kodeendring ved nye elementer.

```ts
// content/therapists/index.ts
import type { Therapist } from './types';

export const therapists: Therapist[] = [
  { id: 'jane-doe', name: 'Jane Doe', ... },
  { id: 'john-smith', name: 'John Smith', ... },
];
```

### 3. Sidestruktur med seksjoner

Hver side har seksjoner som komponenter kan mappe direkte:

```ts
// content/pages/home.ts
export const homePage = {
  hero: {
    title: '...',
    subtitle: '...',
    cta: { label: '...', href: '...' },
  },
  services: {
    title: '...',
    items: [...],  // eller referanse til services/index
  },
} as const;
```

---

## Regler for fleksibilitet

| Situasjon | Løsning |
|-----------|---------|
| Ny terapeut | Legg til objekt i `therapists/index.ts` |
| Ny side | Opprett `content/pages/ny-side.ts` + rute |
| Endre tekst | Rediger kun i /content |
| Ny seksjon på side | Utvid sidestrukturen; komponent leser den nye nøkkelen |
| Gjenbruk CTA | `content/shared/cta.ts` – importer der det trengs |

---

## Komponentmønster

```tsx
// Riktig: Komponent leser data
export function Hero({ data }: { data: HeroContent }) {
  return (
    <section>
      <h1>{data.title}</h1>
      <p>{data.subtitle}</p>
      <Link href={data.cta.href}>{data.cta.label}</Link>
    </section>
  );
}

// Feil: Tekst i komponenten
export function Hero() {
  return <h1>Velkommen til klinikken</h1>;
}
```

---

## Selvsjekk ved nytt innhold

- [ ] Finnes data i /content, ikke i komponent?
- [ ] Kan nytt element legges til via data alene?
- [ ] Er typen definert og gjenbrukbar?
- [ ] Bruker komponenten props, ikke hardkodet tekst?

---

## Referanse

For konkrete eksempler på typer og strukturer, se [reference.md](reference.md).
