# Site Plan — EmDash Blog → Marketing Site

## Overview
Convert the existing EmDash blog template into a marketing site while keeping the blog. Add a landing Home page, Services page, Case Studies (blog-like collection), and Contact page with a Resend-backed form. Theme stays identical (tokens, frame, bands, cards, Inter/JetBrains Mono).

## Menu (`primary`)
Home (`/`) → Services (`/services`) → Case Studies (`/case-studies`) → Blog (`/posts`) → About (`/pages/about`) → Contact (`/contact`)

## Routes
| Route | Source | Purpose |
|---|---|---|
| `/` | `src/pages/index.astro` (rewrite) | Marketing landing page |
| `/services` | `src/pages/services.astro` + `pages` entry `services` | Services page (Portable Text) |
| `/case-studies` | `src/pages/case-studies/index.astro` | Listing grid (mirrors `/posts`) |
| `/case-studies/[slug]` | `src/pages/case-studies/[slug].astro` | Detail (mirrors post detail, no comments) |
| `/contact` | `src/pages/contact.astro` + `pages` entry `contact` | Contact info + form |
| `/posts`, `/posts/[slug]` | unchanged | Blog |

## Schema (`seed/seed.json`)
- New collection `case_studies` (mirrors `posts`: title, featured_image, content, excerpt, plus `client` & `industry` strings); supports drafts/revisions/preview/scheduling/search/seo; urlPattern `/case-studies/{slug}`; no comments.
- `pages` unchanged (Services + Contact entries).
- Menu updated to list above.
- Seed sample content: 3 case studies, Services page, Contact page, plus a `home` page entry for landing hero copy.

## Page layouts

### Home (`/`)
1. Hero band — eyebrow + display headline + muted tagline + 2 CTAs (primary "Get in touch", ghost "View case studies"); text-only, no image.
2. Services overview — 3-column card grid (title + short description + link to `/services`), reusing card styles.
3. Featured case studies — 2 featured cards (image + title + excerpt + client/industry chip) linking to detail.
4. Stats band — 3 stat counters (numbers + mono uppercase labels).
5. Latest from blog — 3 post cards (reuse PostCard) linking to `/posts`.
6. Final CTA band — display headline + "Get in touch" button → `/contact`.

### Services (`/services`)
- Article layout (meta rail + 680px body + TOC/sidebar); body = Portable Text content from `services` page entry. No cards.

### Case Studies listing (`/case-studies`)
- Card grid mirroring `/posts` (image, title, excerpt, client/industry chips), cursor pagination.

### Case Study detail (`/case-studies/[slug]`)
- Three-column reading view (meta rail: client, industry, date, reading time; body; TOC + sidebar widgets). No comments.

### Contact (`/contact`)
- Two-column: PT info (address/hours/email) left, form right. Form fields: Name, Email, Subject, Message. Validation + honeypot. Submits via `src/pages/api/contact.ts` → Resend (`RESEND_API_KEY`, recipient `CONTACT_TO_EMAIL`).

## Files to add/edit
- `seed/seed.json` — new collection, menu, sample content
- `src/pages/index.astro` — rewrite as landing
- `src/pages/services.astro` — new
- `src/pages/case-studies/index.astro`, `[slug].astro` — new
- `src/pages/contact.astro` — new
- `src/pages/api/contact.ts` — new
- `src/components/` — possibly `ServiceCard.astro`, `CaseStudyCard.astro` (or reuse PostCard)
- `src/layouts/Base.astro` — no change (menu renders dynamically)
- `src/styles/theme.css` — no change (reuse tokens)

## Env vars
- `RESEND_API_KEY` — Resend API key
- `CONTACT_TO_EMAIL` — recipient address for contact form submissions

## Theme rules
- Reuse existing tokens/components; no new accent colors.
- New sections are `.band` with content in `.frame` so rails/rules line up.
- Don't collapse article rails on desktop.