# Gjenopprett "Online booking · Physica" og lenke til Physica

Når dere får tilbake lenke til online booking (Physica), gjør følgende.

## 1. TherapistPageCard.tsx

**Kort (terapeutsiden):** I `<div className="mt-4 mt-auto flex flex-col gap-2">`:

- Erstatt den ene `<Link href={contactHref}>` med:
  - **Når `hasBooking`:** `<a href={therapist.bookingUrl} target="_blank" rel="noopener noreferrer" className="...">Bestill time</a>`
  - **Ellers:** `<Link href={contactHref} className="...">Ta kontakt for time</Link>`
- Legg til under knappen (kun når `hasBooking`):
  ```tsx
  {hasBooking && (
    <span className="text-xs text-gray-500">Online booking · Physica</span>
  )}
  ```

**Modal (ctaBlock):** I `ctaBlock` inne i `BioModal`:

- Samme logikk: ved `hasBooking` bruk `<a href={therapist.bookingUrl} target="_blank" rel="noopener noreferrer">Bestill time</a>`, ellers `<Link href={contactHref}>Ta kontakt for time</Link>`.
- Legg til `{hasBooking && <span className="text-xs text-gray-500">Online booking · Physica</span>}`.

## 2. TherapistCard.tsx

I `BookingCta`:

- Ved `hasBooking`: `<a href={therapist.bookingUrl} target="_blank" rel="noopener noreferrer" className="...">Bestill time</a>`
- Ellers: `<Link href={contactHref} className="...">Ta kontakt for time</Link>`
- Under knappen: `{hasBooking && <span className="text-xs text-gray-500">Online booking · Physica</span>}`

## 3. TherapistProfile.tsx

I `ProfileCta`:

- Ved `hasBooking`: `<a href={therapist.bookingUrl} ...>` eller beholde lenke til skjema – avhengig av ønsket oppførsel.
- Legg til: `{hasBooking && <span className="text-xs text-gray-500">Online booking · Physica</span>}`

## Data

`therapist.bookingUrl` kommer fra `content/therapist.json` (f.eks. `"bookingUrl": "https://helse-i-centrum.physica.no/booking/magnus"`). Sørg for at terapeuter som skal ha online booking har `bookingUrl` satt.
