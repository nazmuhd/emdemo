# EmDash Marketing Site (Cloudflare)

A marketing site built on the [EmDash](https://github.com/emdash-cms/emdash) blog template, deployed on Cloudflare Workers with D1 and R2.

## What's Included

- Marketing landing page (hero, services grid, featured case studies, stats, CTA)
- Services page (CMS-editable)
- Case studies collection with listing + detail pages
- Blog (renamed from "Home") at `/blog`
- Contact page with a Resend-backed form
- About page (CMS-editable, blocks-based)
- Full-text search, RSS feed, SEO metadata
- Dark/light mode with theme switcher in the header

## Pages

| Page | Route |
|---|---|
| Home (landing) | `/` |
| About | `/about` |
| Services | `/services` |
| Case Studies | `/case-studies` |
| Case Study detail | `/case-studies/:slug` |
| Blog (All Articles) | `/blog` |
| Single article | `/blog/:slug` |
| Category archive | `/category/:slug` |
| Tag archive | `/tag/:slug` |
| Search | `/search` |
| Contact | `/contact` |
| Static pages | `/pages/:slug` |
| RSS | `/rss.xml` |
| 404 | fallback |

## Collections

- `posts` — blog articles (urlPattern `/blog/{slug}`)
- `pages` — static pages with Portable Text + a blocks `layout` field (hero, features, stats, cta, text, values, team, newsletter)
- `case_studies` — case studies (urlPattern `/case-studies/{slug}`), with client, industry, services, timeline, results

## Environment Variables

- `RESEND_API_KEY` — Resend API key for the contact form
- `CONTACT_TO_EMAIL` — recipient address for contact submissions

## Local Development

```bash
pnpm install
pnpm dev
```

Open http://localhost:4321/_emdash/admin and complete the setup wizard. EmDash runs database migrations and applies the seed during setup. The site is available at http://localhost:4321.

To regenerate TypeScript types after schema changes:

```bash
npx emdash types
```

## Deploying

```bash
pnpm wrangler login
pnpm deploy
```

The first deployment provisions the named D1 database and R2 bucket from `wrangler.jsonc`. See [Deploy to Cloudflare](https://docs.emdashcms.com/deployment/cloudflare/) for production setup.

## See Also

- [EmDash documentation](https://docs.emdashcms.com/)