# CLAUDE.md — Helse i Centrum

## Project overview

Website for **Helse i Centrum**, a physiotherapy clinic in Bergen, Norway.
Live at **hicbergen.no**.

**Primary goal:** Increase online bookings.

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14.2 (App Router, static export) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 — custom `primary` palette (green, 50–900) |
| Icons | lucide-react |
| Email | Resend via Netlify serverless function |
| Hosting | Netlify (static site + functions) |

## Commands

```bash
npm run dev       # Start dev server (runs image sync first)
npm run build     # Production build (static export to .next/)
npm run lint      # ESLint
```

## Project structure

```
app/
  layout.tsx            # Root layout (Header + Footer, lang="nb")
  page.tsx              # Homepage: Hero → Services → Therapists → Clinic
  globals.css           # Tailwind imports + CSS variables
  robots.ts             # SEO robots.txt
  sitemap.ts            # SEO sitemap
  kontakt/page.tsx      # Contact page (form + map + structured data)
  terapeuter/page.tsx   # Therapists page (cards with modal profiles)
components/             # Flat directory, one file per component
  Header.tsx            # Sticky nav, desktop + mobile, booking CTA
  Footer.tsx            # Contact info, hours, links
  Hero.tsx              # Full-width hero with CTAs
  ServicesOverview.tsx   # 6-service grid with lucide icons
  TherapistsPreview.tsx  # Homepage therapist grid
  TherapistCard.tsx      # Therapist card (preview variant)
  TherapistPageCard.tsx  # Therapist card with modal profile
  TherapistProfile.tsx   # Full profile component (unused)
  ClinicSection.tsx      # Clinic description + image
  ClinicSchema.tsx       # LocalBusiness structured data (JSON-LD)
  ContactSection.tsx     # Contact info + Google Maps embed
  ContactForm.tsx        # Contact form (Netlify + Resend)
  BookingButton.tsx      # Desktop booking dropdown
  BookingSheet.tsx       # Mobile booking bottom sheet
  MobileNavDrawer.tsx    # Mobile nav drawer
content/
  clinic.json           # Clinic data (name, address, phone, services, hours)
  therapist.json        # 5 therapist profiles (id, role, education, focusAreas, bookingUrl)
  image/                # Source images (synced to public/ at build)
  favicon/              # Favicon assets
lib/
  content.ts            # Data access: getClinic(), getTherapists(), getTherapistById()
                        # therapistImageMap + therapistImagePosition overrides
netlify/
  functions/
    send-form-email.ts  # Resend email handler
scripts/
  sync-content-images.js  # Copies content/image/ → public/content/image/
```

## Pages

| Route | Purpose | Key components |
|-------|---------|---------------|
| `/` | Homepage | Hero, ServicesOverview, TherapistsPreview, ClinicSection |
| `/terapeuter` | Therapist profiles | TherapistPageCard (grid, modal on "Les mer") |
| `/kontakt` | Contact | ContactSection (map), ContactForm |

## Content system

- All data lives in JSON under `content/`.
- `lib/content.ts` loads JSON and overrides image paths via `therapistImageMap`.
- Images stored in `content/image/`, synced to `public/content/image/` by prebuild script.
- **To add/change a therapist:** edit `content/therapist.json`, add image to `content/image/`, update `therapistImageMap` and `therapistImagePosition` in `lib/content.ts`.

## Therapists (current)

| Name | Role | Booking |
|------|------|---------|
| Magnus Richardsen | Fysioterapeut i spesialisering | Aspit online |
| Marcus Småvik Dasa | Fysioterapeut i spesialisering | Aspit online |
| Eirik Hammer Østvold | Manuellterapeut | Phone only |
| Kjartan Vibe Fersum | Manuellterapeut | Phone only |
| Anine Vibe Simonsen | Manuellterapeut | Phone only |

## Booking logic

- External booking via Aspit (`helse.aspit.no`), URLs per-therapist in `therapist.json`.
- Header CTA logic:
  - 3+ therapists with booking → links to `/terapeuter`
  - 1–2 with booking → dropdown or direct link
  - 0 with booking → phone link
- BookingButton (desktop dropdown) and BookingSheet (mobile bottom sheet).

## Color system

Custom green palette representing health/wellness:

```
primary-50:  #f0f7f4   (backgrounds)
primary-100: #d9ebe3
primary-200: #b6d7c9
primary-300: #87bca6
primary-400: #5a9d82
primary-500: #3d8268   (main brand)
primary-600: #2e6853   (buttons, links)
primary-700: #275444   (hover states)
primary-800: #224438
primary-900: #1e3a31   (dark text)
```

Usage pattern: `bg-primary-600 hover:bg-primary-700` for buttons, `text-primary-600` for links, `bg-primary-50 text-primary-700` for badges.

## Key conventions

- **Language:** All UI text in Norwegian Bokmål. HTML `lang="nb"`.
- **No i18n** — text hardcoded in components and JSON.
- **Static site** — pages statically generated, no SSR.
- **Images:** Next.js `<Image>` preferred. Source images in `content/image/`. Native `<img>` used for content paths to avoid build issues.
- **Components:** Flat directory, no barrel exports, one file per component.
- **Client components:** Marked with `"use client"` (Header, ContactForm, BookingButton, BookingSheet, MobileNavDrawer, TherapistPageCard).
- **Focus style:** `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md`
- **Section spacing:** `py-14 sm:py-16`
- **Container widths:** `max-w-6xl` or `max-w-5xl` with `mx-auto px-4 sm:px-6`
- **Responsive grids:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

## SEO

- Structured data: LocalBusiness/Physiotherapist (ClinicSchema.tsx), BreadcrumbList
- Sitemap priorities: `/` (1.0), `/terapeuter` (0.9), `/kontakt` (0.8)
- Geo coordinates: 60.3913, 5.3221
- Target keywords: "Fysioterapi Bergen sentrum", "Manuellterapeut Bergen", "Langvarige smerter Bergen"

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `RESEND_API_KEY` | Yes | Email sending via Resend |
| `CONTACT_TO_EMAIL` / `FORM_TO_EMAIL` | Yes | Recipient email |
| `CONTACT_FROM_EMAIL` | No | Sender (default: hei@provant.no). Domain must be verified in Resend. |
| `URL` | No | Site URL (default: hicbergen.no) |

---

# Guardrails

## Strict Rules
- Do NOT change text without approval
- Do NOT change typography
- Do NOT change global spacing
- Do NOT change grid architecture
- Do NOT redesign components

## Therapist Cards
- Identical width
- Identical CTA height
- "Les mer" bottom-aligned
- No per-index hacks
- Reserve space if only one CTA
- 5-therapist grid: last 2 centered (`lg:col-start-2`, `lg:col-start-4`)

## Navbar
- Desktop + mobile logic must stay intact
- Booking CTA always visible
- Active page underline via `after:` pseudo-element

## Change Policy
- Small, precise edits only
- Touch only specified files
- Always respect responsive breakpoints
