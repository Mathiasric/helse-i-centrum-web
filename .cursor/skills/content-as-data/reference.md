# Content-as-data – referanseeksempler

## Typer for terapeut/side

```ts
// content/therapists/types.ts
export interface Therapist {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  specialization: string[];
  slug: string;  // for URL
}
```

## Eksempel: Terapeutliste

```ts
// content/therapists/index.ts
import type { Therapist } from './types';

export const therapists: Therapist[] = [
  {
    id: 'jane-doe',
    slug: 'jane-doe',
    name: 'Jane Doe',
    title: 'Fysioterapeut',
    bio: 'Spesialisert i ...',
    image: '/images/therapists/jane.jpg',
    specialization: ['Rygg', 'Skulder'],
  },
];
```

## Eksempel: Sidestruktur med hero + CTA

```ts
// content/pages/home.ts
export const homePage = {
  hero: {
    title: 'Din helse i fokus',
    subtitle: 'Personlig behandling i rolige omgivelser.',
    cta: {
      primary: { label: 'Book time', href: '/booking' },
      secondary: { label: 'Les mer', href: '/om-oss' },
    },
  },
  intro: {
    title: 'Om oss',
    body: '...',
  },
} as const;

export type HomePageContent = typeof homePage;
```

## Eksempel: Gjenbrukbar CTA

```ts
// content/shared/cta.ts
export const bookingCta = {
  label: 'Book time',
  href: '/booking',
} as const;
```

## Eksempel: Komponent som bruker data

```tsx
// components/Hero.tsx
import { homePage } from '@/content/pages/home';

export function Hero() {
  const { hero } = homePage;
  return (
    <section>
      <h1>{hero.title}</h1>
      <p>{hero.subtitle}</p>
      <a href={hero.cta.primary.href}>{hero.cta.primary.label}</a>
    </section>
  );
}
```

## Eksempel: Dynamisk liste uten kodeendring

```tsx
// components/TherapistList.tsx
import { therapists } from '@/content/therapists';

export function TherapistList() {
  return (
    <ul>
      {therapists.map((t) => (
        <li key={t.id}>
          <Link href={`/terapeuter/${t.slug}`}>{t.name}</Link>
        </li>
      ))}
    </ul>
  );
}
```

Ny terapeut = ny rad i `therapists/index.ts`. Ingen endring i komponenten.
