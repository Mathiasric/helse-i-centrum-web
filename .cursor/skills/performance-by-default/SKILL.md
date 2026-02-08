---
name: performance-by-default
description: Optimizes for performance by default: server rendering where possible, minimal client-side JS, optimized images, simple component structure. Use when building pages, adding components, choosing rendering strategy, or optimizing load times. Prioritizes fast first render on mobile.
---

# Ytelse som standard

## Prinsipp

- **Server først**: Bruk server components og statisk rendering der mulig.
- **Minimal JS på klient**: Kun det som virkelig trenger interaktivitet.
- **Optimaliserte bilder**: Riktige størrelser og formater.
- **Enkel komponentstruktur**: Unngå unødvendig nesting og abstraksjon.
- **Mobil first**: Rask første render på mobil prioriteres.

---

## Server vs. klient

### Bruk server components (default)

- Sideinnhold, statisk tekst, listevisninger.
- Datahenting (fetch, database).
- Layout og navigasjon som ikke krever state.

### Bruk `"use client"` kun når

- Brukerinteraksjon krever state (f.eks. skjema, accordion, modal).
- Hooks som `useState`, `useEffect`, `useRef` er nødvendige.
- Tredjepartskomponenter krever klient.

### Strategi

- Hold `"use client"` nederst i komponenttreet – wrap kun den delen som trenger det.
- Sørg for at foreldrekomponenter forblir server components slik at de kan streames/statically genereres.

---

## Bilder

- **Next.js Image**: Bruk alltid `next/image` for bilder.
- **Størrelser**: Angi `width` og `height` eller `sizes` for å unngå layout shift og overlasting.
- **Formater**: La Next.js håndtere WebP/AVIF via automatisk optimalisering.
- **Lazy loading**: Default forbilder under fold; bruk `priority` på LCP-bilde (f.eks. hero).

**Eksempel:**

```tsx
<Image
  src="/hero.jpg"
  alt="Beskrivelse"
  width={1200}
  height={630}
  sizes="(max-width: 768px) 100vw, 1200px"
  priority
/>
```

---

## Klient-side JavaScript

- **Ingen tunge libs uten grunn**: Unngå store biblioteker for små oppgaver.
- **Code splitting**: Next.js splitter automatisk; unngå å importere store moduler øverst i treet.
- **Dynamisk import**: Ved tung klientlogikk, bruk `next/dynamic` med `ssr: false` kun der nødvendig.
- **Formulærer**: Vurder HTML-form med server action før du legger til klient-validering.

---

## Komponentstruktur

- **Flat og lesbar**: Unngå dypt nestede wrappers.
- **Én ansvar**: Hver komponent gjør én ting.
- **Gjenbruk der det gir verdi**: Ikke abstraher for hypotetiske fremtidige behov.
- **Ingen dødkode**: Fjern ubrukte komponenter og imports.

---

## Første render på mobil

- **Kritisk innhold først**: Hva, hvem, CTA innen første skjerm.
- **LCP**: Prioriter hero/tittel og eventuelt hero-bilde; `priority` på LCP-bilde.
- **Ikke blokkér**: Unngå font-display: block uten fallback; bruk `optional` eller `swap`.
- **Målet**: "Snappy" følelse – brukeren skal oppleve innhold raskt.

---

## Selvsjekk

Før du avslutter en endring som berører ytelse:

- [ ] Server components brukt der mulig
- [ ] `"use client"` kun der nødvendig, og begrenset i scope
- [ ] Bilder via `next/image` med riktige størrelser
- [ ] Ingen tunge klientlibs uten grunn
- [ ] Komponentstruktur enkel og flat
- [ ] Kritisk innhold synlig innen første skjerm på mobil
