---
name: health-ui-design
description: Design and build UI with consistent, calm, professional look for health services. Use when designing interfaces, building components, or styling pages for healthcare, clinics, or medical applications. Covers spacing tokens, typography hierarchy, limited color palette, clear CTAs, mobile-first layout, and readability over visual effects.
---

# Helse-UI design

## Prinsipp

- **Klinisk og rolig**: Ingen unødvendige animasjoner eller visuelle effekter. Prioritér lesbarhet og ro fremfor "wow".
- **Konsistent**: Faste spacing-tokens, typografi og farger i hele appen.
- **Mobil først**: Design og test for små skjermer først.
- **Tydelige CTA-er**: Én primær og én sekundær handlingsknapp per side maks.

---

## Spacing

Bruk et 4-/8-px grid konsekvent:

| Token | Vurdi | Bruk |
|-------|-------|------|
| `space-1` | 4px | Inne i komponenter |
| `space-2` | 8px | Mellom relaterte elementer |
| `space-3` | 12px | Gruppering |
| `space-4` | 16px | Standard blokkavstand |
| `space-6` | 24px | Mellom seksjoner |
| `space-8` | 32px | Store avbrudd |
| `space-12` | 48px | Mellom store blokker |

**Regel**: Maks 2–3 hovedseksjoner på forsiden. Korte blokker, mye luft.

---

## Typografi

| Nivå | Bruk | Størrelse (mobil) | Vekt |
|------|------|-------------------|------|
| H1 | Sidetittel | 1.5–2rem | 600–700 |
| H2 | Seksjonstittel | 1.25–1.5rem | 600 |
| H3 | Undertittel | 1.125rem | 600 |
| Body | Brødtekst | 1rem (min 16px) | 400 |
| Small | Hjelpetekst | 0.875rem | 400 |

- Én H1 per side.
- Linjehøyde min. 1.5 for brødtekst.
- Kontrast min. 4.5:1 for vanlig tekst.

---

## Farger

Hold paletten liten:

- **Bakgrunn**: Nøytral hvit eller lys grå (#f8f9fa–#ffffff).
- **Tekst**: Mørk grå (#1a1a1a–#333).
- **Primær**: Én accentfarge for CTA (f.eks. blå eller grønn).
- **Sekundær**: Nøytral grå for sekundær knapp.
- **Suksess/feil**: Kun der det er nødvendig (bekreftelser, validering).

Unngå sterke, livlige farger. Helse-UI skal virke trygt og rolig.

---

## CTA og knapper

- **1 primær CTA** per side: tydelig, én hovedhandling.
- **1 sekundær CTA** om nødvendig (f.eks. "Avbryt", "Les mer").
- Primærknapp: høy kontrast, passende størrelse (min 44px høyde på mobil).
- Konsistent hover/focus-state – bruk synlig fokusring for tilgjengelighet.

---

## Mobil først

1. **Løsning**: Start alltid med 320–375px bredde.
2. **Kritisk info innen første skjerm**:
   - Hva dette er
   - Hvem det er for
   - Hva brukeren gjør nå (CTA)
3. **Container**: Begrens bredde (f.eks. max-width 600–800px) for lesbarhet.
4. **Touch**: Knapper og lenker min. 44×44px for touch-område.

---

## Selvsjekk

Før du avslutter en UI-endring:

- [ ] Ingen unødvendige animasjoner eller effekter
- [ ] Spacing følger tokens
- [ ] Typografisk hierarki tydelig (H1/H2/H3)
- [ ] Maks 2–3 hovedseksjoner på forsiden
- [ ] Én primær CTA tydelig
- [ ] Ser riktig ut på mobil
- [ ] God kontrast og lesbarhet
