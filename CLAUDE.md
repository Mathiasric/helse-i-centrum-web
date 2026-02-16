# CLAUDE.md — Helse i Centrum

## Project overview

Website for **Helse i Centrum**, a physiotherapy clinic in Bergen, Norway.
Live at **hicbergen.no**.

## Tech stack

- **Framework:** Next.js 14 (App Router, static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3 — custom `primary` color palette (green tones, 50–900)
- **Icons:** lucide-react
- **Email:** Resend (contact form)
- **Hosting:** Netlify (serverless functions in `netlify/functions/`)

## Commands

```bash
npm run dev       # Start dev server (runs image sync first)
npm run build     # Production build (static export to .next/)
npm run lint      # ESLint
```

## Project structure

```
app/
  layout.tsx          # Root layout (Header + Footer, lang="nb")
  page.tsx            # Homepage: Hero → Services → Therapists → Clinic
  kontakt/page.tsx    # Contact page
  terapeuter/page.tsx # Therapists page
components/           # All UI components (no subdirectories)
content/
  clinic.json         # Clinic data (name, address, services, hours)
  therapist.json      # Therapist profiles (id, role, education, focusAreas)
  image/              # Source images (synced to public/ via prebuild script)
  favicon/            # Favicon assets
lib/
  content.ts          # Data access layer — getClinic(), getTherapists(), getTherapistById()
netlify/
  functions/          # Serverless functions (send-form-email.ts)
scripts/
  sync-content-images.js  # Copies content/ images to public/content/
```

## Content system

- All clinic/therapist data lives in JSON files under `content/`.
- `lib/content.ts` loads the JSON and applies image path overrides via `therapistImageMap`.
- Images are stored in `content/image/` and synced to `public/content/image/` at build time.
- To add/change a therapist image: update the file in `content/image/` and update `therapistImageMap` in `lib/content.ts`.

## Key conventions

- **Language:** All UI text is in Norwegian (Bokmal). HTML lang is `nb`.
- **No i18n framework** — text is hardcoded in components and JSON.
- **Static site** — no server-side rendering; pages are statically generated.
- **Image handling:** Use Next.js `<Image>` where possible. Source images go in `content/image/`.
- **Component style:** Flat component directory, no barrel exports. Each component is a single file.
- **Booking:** External booking via Aspit (`helse.aspit.no`). Booking URLs are per-therapist in `therapist.json`.

# CLAUDE.md — HIC Guardrails

## Primary Goal
Increase online bookings.

## Strict Rules
- Do NOT change text without approval
- Do NOT change typography
- Do NOT change global spacing
- Do NOT change grid architecture
- Do NOT redesign components

## Therapist Cards
- Identical width
- Identical CTA height
- "Les mer" aligned
- No per-index hacks
- Reserve space if only one CTA

## Navbar
- Desktop + mobile logic must stay intact
- Booking CTA always visible
- Active page underline

## SEO Priority
- “Fysioterapi Bergen sentrum”
- “Manuellterapeut Bergen”
- “Langvarige smerter Bergen”

## Change Policy
- Small, precise edits only
- Touch only specified files
- Always respect responsive breakpoints
