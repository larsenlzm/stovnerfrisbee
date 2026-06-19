# agents.md — Stovner Frisbeeklubb

This file describes what needs to be updated when making changes to the site.
It is intended for AI agents and developers working on the codebase.

## Content data

All site content (events, board members, social links, courses) lives in one file:

- `src/lib/data/content.ts`

Edit this file for content changes. Most pages read from it directly, so changes propagate automatically.

## What to update when

### Adding or removing a page

- `static/sitemap.xml` — add or remove the `<url>` entry
- `static/robots.txt` — no change needed unless the page should be blocked from crawlers
- `src/routes/+layout.svelte` or `src/lib/components/Nav.svelte` — add to navigation if needed

### Adding, changing, or removing events

- `src/lib/data/content.ts` — edit the `events` array
- `src/routes/arrangementer/+page.svelte` — JSON-LD is generated automatically from `content.ts`, no manual update needed
- `static/sitemap.xml` — update `<lastmod>` on the arrangementer URL if desired

### Changing club info (name, founding date, description, social links, membership)

- `src/lib/data/content.ts` — update `socialLinks` as needed
- `src/routes/+page.svelte` — update the JSON-LD `<script type="application/ld+json">` in `<svelte:head>` manually (description, foundingDate, sameAs, offers URL)

### Changing membership details or pricing

- `src/routes/bli-medlem/+page.svelte` — update the visible content
- `src/routes/+page.svelte` — the JSON-LD offers block intentionally contains no pricing; only update if the membership URL or description changes

### Changing board members

- `src/lib/data/content.ts` — edit the `boardMembers` array

### Changing or adding courses/baner

- `src/lib/data/content.ts` — edit the `courses` array

## File index

| File | Purpose |
|------|---------|
| `src/lib/data/content.ts` | Single source of truth for all site content |
| `static/robots.txt` | Crawler access rules and sitemap pointer |
| `static/sitemap.xml` | Page index for search engines |
| `static/agents.md` | This file — maintenance guide for AI agents |
| `src/routes/+page.svelte` | Homepage, includes JSON-LD for club identity and membership |
| `src/routes/arrangementer/+page.svelte` | Events page, includes JSON-LD generated from content.ts |
| `README.md` | Developer setup and project structure |

## JSON-LD structured data

Two pages have structured data embedded in `<svelte:head>`:

- **Homepage** (`src/routes/+page.svelte`) — static JSON-LD for `SportsClub` + `NonprofitOrganization`. Update manually when club-level info changes.
- **Arrangementer** (`src/routes/arrangementer/+page.svelte`) — dynamic JSON-LD built from `content.ts` at build time. Updates automatically when events change.

## Club facts (for reference)

- Full name: Stovner Frisbeeklubb
- Founded: 1985
- Location: Stovner, Oslo, Norway
- Sport: Discgolf
- Member of: Norges amerikanske idretters forbund (NAIF)
- Organisation number: 894 417 382
- Domain: stovnerfrisbee.no
