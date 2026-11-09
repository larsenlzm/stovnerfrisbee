# Norges Cup #4 Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve a minimal, celebratory "save the date" page for Norges Cup #4 on `nc.stovnerfrisbee.no`, with a calendar file and a Google Calendar link, inside the existing SvelteKit app.

**Architecture:** Event details live in one module (`src/lib/events/norges-cup-4.ts`). Pure helpers build the `.ics` text and the Google Calendar URL from it, and pure host helpers decide rerouting/redirects for the subdomain. The page lives at `/norges-cup`, and SvelteKit's `reroute` hook serves it at `/` on `nc.stovnerfrisbee.no`; the root layout skips the club Nav/Footer for that route.

**Tech Stack:** SvelteKit 2 (Svelte 5 runes), Tailwind CSS v4 with theme tokens in `src/app.css`, adapter-vercel, PostHog (`src/lib/analytics.ts`), Vitest (added in Task 1).

**Spec:** `docs/superpowers/specs/2026-11-09-norges-cup-landing-design.md`

## Global Constraints

- No newsletter, no email collection, no forms.
- Only theme colours/fonts from `src/app.css` (Inter; `--color-primary`, `--color-primary-dark`, `--color-accent`, `--color-bg`, `--color-muted`, `--color-border`, …). No new colours, fonts, shadows, gradients.
- Must work in light and dark theme, and on phone (touch targets ≥ 44 px) and desktop.
- Page copy is Norwegian (bokmål), exactly as given in Task 3.
- Existing club pages, Nav and Footer must render exactly as before.
- Event: Norges Cup #4, 6–8 August 2027 inclusive, "Stovner discgolfpark, Oslo", canonical `https://nc.stovnerfrisbee.no/`.
- `npm run check` and `npm test` pass after every task.
- Follow `CLAUDE.md`: Playwright check on desktop and phone width after UI changes; delete screenshots, stop dev servers afterwards.
- Code comments in Norwegian, matching the existing files' density (one short line where a reason isn't obvious).

## Review Focus

1. **Text with commas/semicolons in calendar fields** (e.g. "Stovner discgolfpark, Oslo"): must be escaped in the `.ics` or calendar apps split the field. Test in Task 1 (`escapes commas and semicolons`).
2. **All-day end date**: the `.ics` and Google URL must end on 9 August (exclusive), so the event shows 6, 7 and 8 August, not 6–7. Tests in Task 1.
3. **Other paths on the subdomain** (`nc.stovnerfrisbee.no/om-klubben`): must redirect to `https://stovnerfrisbee.no/om-klubben` instead of showing club pages under the event host; `/sf-data/*` and the `.ics` must *not* redirect. Tests in Task 4.
4. **Host with port or `www.`/uppercase variations** (`NC.stovnerfrisbee.no`, `nc.stovnerfrisbee.no:443`): `URL.hostname` lowercases and strips the port; tests in Task 4 pin the lowercase case.
5. **Dark theme**: heading, kicker, button and pennants use tokens and stay readable; logo keeps its white circle. Checked with Playwright in Task 3 (dark screenshot step).

---

### Task 0: Branch and commit the design docs

**Files:**
- Modify: `.gitignore` (already has the `.superpowers/` lines, uncommitted)
- Add: `docs/superpowers/specs/2026-11-09-norges-cup-landing-design.md`, `docs/superpowers/plans/2026-11-09-norges-cup-landing.md`

- [ ] **Step 1: Create the branch from `forside-redesign`** (it holds the analytics host check; use `main` instead only if `forside-redesign` has been merged)

```bash
git checkout forside-redesign && git checkout -b norges-cup-landing
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore docs/superpowers
git commit -m "Design og plan for Norges Cup #4-landingsside"
```

---

### Task 1: Event data and calendar helpers (with Vitest)

**Files:**
- Modify: `package.json` (devDependency `vitest`, script `"test": "vitest run"`)
- Modify: `vite.config.ts` (add `test: { include: ['src/**/*.test.ts'] }`)
- Create: `src/lib/events/types.ts`
- Create: `src/lib/events/norges-cup-4.ts`
- Create: `src/lib/events/calendar.ts`
- Test: `src/lib/events/calendar.test.ts`

**Interfaces:**
- Produces:
  - `interface EventInfo { slug: string; name: string; number: number; title: string; dateLabel: string; place: string; location: string; start: string; endInclusive: string; url: string; intro: string; image: { src: string; alt: string; position: string } }` (dates as `YYYY-MM-DD`) in `types.ts`
  - `export const norgesCup4: EventInfo` in `norges-cup-4.ts`
  - `toIcs(event: EventInfo, now?: Date): string` and `googleCalendarUrl(event: EventInfo): string` in `calendar.ts`

- [ ] **Step 1: Install Vitest and wire the script**

Run: `npm install -D vitest` then add `"test": "vitest run"` to `scripts` and the `test` block to `vite.config.ts`.
Expected: `npm test` runs and reports "No test files found".

- [ ] **Step 2: Create the event data** — `norgesCup4` values, verbatim:

```ts
slug: 'norges-cup-4', name: 'Norges Cup', number: 4, title: 'Norges Cup #4',
dateLabel: '6.–8. august 2027', place: 'Stovner', location: 'Stovner discgolfpark, Oslo',
start: '2027-08-06', endInclusive: '2027-08-08', url: 'https://nc.stovnerfrisbee.no/',
intro: 'Mer info kommer. Legg datoen i kalenderen, så ses vi på Stovner.',
image: { src: '/rocker.jpg', alt: 'Discgolfkurv med gult flagg på Stovner', position: '50% 58%' }
```

- [ ] **Step 3: Write the failing tests** in `calendar.test.ts`

```ts
const ics = toIcs(norgesCup4, new Date('2026-11-09T12:00:00Z'));
const lines = ics.split('\r\n');

it('uses CRLF and wraps one VEVENT', () => {
  expect(lines[0]).toBe('BEGIN:VCALENDAR');
  expect(lines).toContain('BEGIN:VEVENT');
  expect(ics.endsWith('END:VCALENDAR\r\n')).toBe(true);
  expect(ics).not.toMatch(/[^\r]\n/);
});
it('is an all-day event 6–8 August with exclusive end', () => {
  expect(lines).toContain('DTSTART;VALUE=DATE:20270806');
  expect(lines).toContain('DTEND;VALUE=DATE:20270809');
});
it('has a fixed UID and the stamp', () => {
  expect(lines).toContain('UID:norges-cup-4@stovnerfrisbee.no');
  expect(lines).toContain('DTSTAMP:20261109T120000Z');
});
it('escapes commas and semicolons', () => {
  expect(lines).toContain('LOCATION:Stovner discgolfpark\\, Oslo');
  expect(lines).toContain('SUMMARY:Norges Cup #4 – Stovner');
  expect(lines).toContain('URL:https://nc.stovnerfrisbee.no/');
});
it('builds a Google Calendar link with exclusive end', () => {
  const u = new URL(googleCalendarUrl(norgesCup4));
  expect(u.origin + u.pathname).toBe('https://calendar.google.com/calendar/render');
  expect(u.searchParams.get('action')).toBe('TEMPLATE');
  expect(u.searchParams.get('text')).toBe('Norges Cup #4 – Stovner');
  expect(u.searchParams.get('dates')).toBe('20270806/20270809');
  expect(u.searchParams.get('location')).toBe('Stovner discgolfpark, Oslo');
  expect(u.searchParams.get('details')).toContain('https://nc.stovnerfrisbee.no/');
});
```

- [ ] **Step 4: Run to verify they fail**

Run: `npm test`
Expected: FAIL, `toIcs`/`googleCalendarUrl` not exported.

- [ ] **Step 5: Implement `calendar.ts`**

`SUMMARY` and Google `text` = `` `${event.title} – ${event.place}` ``. `DESCRIPTION`/`details` = `` `${event.intro} ${event.url}` ``. Lines in order: `BEGIN:VCALENDAR`, `VERSION:2.0`, `PRODID:-//Stovner Frisbee//Norges Cup//NO`, `CALSCALE:GREGORIAN`, `METHOD:PUBLISH`, `BEGIN:VEVENT`, `UID:${slug}@stovnerfrisbee.no`, `DTSTAMP`, `DTSTART;VALUE=DATE`, `DTEND;VALUE=DATE` (endInclusive + 1 day, computed in UTC), `SUMMARY`, `LOCATION`, `DESCRIPTION`, `URL`, `END:VEVENT`, `END:VCALENDAR`, joined with `\r\n` plus a trailing `\r\n`. Escape text values: `\` → `\\`, `;` → `\;`, `,` → `\,`, newline → `\n`. Lines stay under 75 octets for this event, so no folding is needed (YAGNI).

- [ ] **Step 6: Run tests**

Run: `npm test && npm run check`
Expected: 5 passed; check reports 0 errors.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.ts src/lib/events
git commit -m "Hendelsesdata og kalenderfil for Norges Cup #4"
```

---

### Task 2: Calendar endpoint `/norges-cup-4.ics`

**Files:**
- Create: `src/routes/norges-cup-4.ics/+server.ts`

**Interfaces:**
- Consumes: `norgesCup4`, `toIcs` (Task 1)
- Produces: `GET /norges-cup-4.ics` on both hosts (root path on purpose, so the same link works on `stovnerfrisbee.no` and `nc.stovnerfrisbee.no`)

- [ ] **Step 1: Implement `GET: RequestHandler`** returning `toIcs(norgesCup4)` with headers `Content-Type: text/calendar; charset=utf-8`, `Content-Disposition: inline; filename="norges-cup-4.ics"`, `Cache-Control: public, max-age=3600`.

- [ ] **Step 2: Verify**

Run: `npm run dev` (background), then `curl -si http://localhost:5173/norges-cup-4.ics | head -20`
Expected: `HTTP/1.1 200`, `content-type: text/calendar; charset=utf-8`, body starts with `BEGIN:VCALENDAR` and contains `DTEND;VALUE=DATE:20270809`. Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add src/routes/norges-cup-4.ics
git commit -m "Kalenderfil for Norges Cup #4 på /norges-cup-4.ics"
```

---

### Task 3: The page at `/norges-cup` without the club layout

**Files:**
- Create: `src/routes/norges-cup/+page.svelte`
- Modify: `src/routes/+layout.svelte` (skip Nav, Footer and the `<main>` padding when `page.route.id === '/norges-cup'`)

**Interfaces:**
- Consumes: `norgesCup4`, `googleCalendarUrl` (Task 1), `/norges-cup-4.ics` (Task 2)
- Produces: route id `/norges-cup` (Task 4 reroutes to it); calendar links carry `data-calendar="ics"` / `data-calendar="google"` (Task 5 tracks them)

- [ ] **Step 1: Layout bypass.** In `+layout.svelte`, derive `const eventPage = $derived($page.route.id === '/norges-cup')`; when true render only `{@render children()}`. Existing markup stays byte-for-byte the same in the else branch.

- [ ] **Step 2: Build the page** from the spec's "The design" section, all text and values from `norgesCup4`. Structure and exact copy:

  - `<svelte:head>`: `<title>Norges Cup #4 · 6.–8. august 2027 · Stovner</title>`, `meta description` = `Stovner Frisbee arrangerer Norges Cup #4 på Stovner 6.–8. august 2027. Mer info kommer.`, `link rel="canonical" href={event.url}`, `og:type=website`, `og:title`, `og:description`, `og:url`, `og:image=https://nc.stovnerfrisbee.no/rocker.jpg`, `og:locale=nb_NO`, `twitter:card=summary_large_image`.
  - Top bar: link "Stovner Frisbee" → `https://stovnerfrisbee.no` (small spaced capitals); right, hidden on phone: "Norges Cup #4". No hamburger.
  - Pennant row: 5 `aria-hidden` CSS triangles (~12 px), alternating `--color-primary-dark` / `--color-accent`.
  - Kicker `<p>`: `{dateLabel} · {place}`.
  - `<h1>`: `Norges Cup <span class="text-[var(--color-accent)]">#4</span>`, ~84 px desktop / ~44 px phone, `leading-[1.05]`, tight negative tracking, colour `--color-primary-dark`.
  - Intro `<p>`: `{intro}`, muted, `leading-relaxed` (1.6).
  - Filled button `<a href="/norges-cup-4.ics" data-calendar="ics">Legg i kalenderen</a>` (primary green, ≥ 48 px tall, full width on phone) and text link `<a href={googleCalendarUrl(event)} data-calendar="google" target="_blank" rel="noopener">Google Kalender</a>`.
  - Logo: `<img src="/stovnerlogo.jpg" alt="Stovner Frisbee">`, round, ~180 px desktop with caption "Arrangør" (small spaced capitals), ~84 px on phone top-right of the text block.
  - Photo: `<img>` from `event.image` (`object-position` from `position`), inset to text margins, `rounded-[18px]`, ~440 px tall desktop / 240 px phone, `fetchpriority="high"`.
  - Page background `--color-bg`; text colours via tokens so dark theme works.

- [ ] **Step 3: Verify in the browser.** `npm run dev`, open `http://localhost:5173/norges-cup` with Playwright at 1440×900 and 390×844, in light and dark (`emulate_media` colorScheme dark). Expected: matches the spec/mockup; no club Nav/Footer; heading, kicker, button, pennants readable in dark; button ≥ 44 px on phone; "Legg i kalenderen" downloads/opens the `.ics`; Google link opens Google Calendar with 6–8 Aug prefilled. Also open `/` and `/om-klubben`: Nav and Footer unchanged. Delete screenshots, stop the server.

- [ ] **Step 4: Run checks**

Run: `npm run check && npm test`
Expected: 0 errors; tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/routes/norges-cup src/routes/+layout.svelte
git commit -m "Landingsside for Norges Cup #4 uten klubbmeny"
```

---

### Task 4: Serve the page on `nc.stovnerfrisbee.no`

**Files:**
- Create: `src/lib/events/hosts.ts`
- Test: `src/lib/events/hosts.test.ts`
- Create: `src/hooks.ts` (universal `reroute`)
- Modify: `src/hooks.server.ts` (redirect before the existing proxy logic)
- Modify: `vite.config.ts` (`server.allowedHosts` and `preview.allowedHosts`: `['nc.stovnerfrisbee.no']`, only if Vite rejects the Host header in Step 5)
- Modify: `README.md` (short "Norges Cup-subdomene" section with the owner's Vercel/DNS steps)

**Interfaces:**
- Consumes: route id `/norges-cup` (Task 3), `/norges-cup-4.ics` (Task 2)
- Produces:
  - `export const EVENT_HOST = 'nc.stovnerfrisbee.no'`
  - `eventReroute(url: URL): string | undefined` — `'/norges-cup'` for `EVENT_HOST` + pathname `/`, otherwise `undefined`
  - `eventHostRedirect(url: URL): string | null` — on `EVENT_HOST`, for any pathname except `/`, `/norges-cup-4.ics`, `/sf-data/*` and `/_app/*` (SvelteKit's own assets), returns `https://stovnerfrisbee.no${pathname}${search}`; otherwise `null`

- [ ] **Step 1: Write the failing tests**

```ts
const u = (s: string) => new URL(s);
it('reroutes the subdomain root', () => {
  expect(eventReroute(u('https://nc.stovnerfrisbee.no/'))).toBe('/norges-cup');
  expect(eventReroute(u('https://NC.stovnerfrisbee.no/'))).toBe('/norges-cup');
});
it('leaves the main site alone', () => {
  expect(eventReroute(u('https://stovnerfrisbee.no/'))).toBeUndefined();
  expect(eventHostRedirect(u('https://stovnerfrisbee.no/om-klubben'))).toBeNull();
});
it('keeps the page, calendar file and proxy on the subdomain', () => {
  expect(eventHostRedirect(u('https://nc.stovnerfrisbee.no/'))).toBeNull();
  expect(eventHostRedirect(u('https://nc.stovnerfrisbee.no/norges-cup-4.ics'))).toBeNull();
  expect(eventHostRedirect(u('https://nc.stovnerfrisbee.no/sf-data/e/?ip=1'))).toBeNull();
  expect(eventHostRedirect(u('https://nc.stovnerfrisbee.no/_app/immutable/entry/start.js'))).toBeNull();
});
it('sends other subdomain paths to the main site', () => {
  expect(eventHostRedirect(u('https://nc.stovnerfrisbee.no/om-klubben?x=1'))).toBe('https://stovnerfrisbee.no/om-klubben?x=1');
  expect(eventHostRedirect(u('https://nc.stovnerfrisbee.no/norges-cup'))).toBe('https://stovnerfrisbee.no/norges-cup');
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `npm test`
Expected: FAIL, `hosts.ts` exports missing.

- [ ] **Step 3: Implement `hosts.ts`**, then `src/hooks.ts` exporting `reroute: Reroute = ({ url }) => eventReroute(url)`, and at the top of `handle` in `hooks.server.ts`: `const target = eventHostRedirect(event.url); if (target) redirect(308, target);` (import `redirect` from `@sveltejs/kit`).

- [ ] **Step 4: Run tests**

Run: `npm test && npm run check`
Expected: all pass, 0 errors.

- [ ] **Step 5: Verify with a Host header**

Run: `npm run build && npm run preview` (background), then
`curl -s -H 'Host: nc.stovnerfrisbee.no' http://localhost:4173/ | grep -o '<h1[^>]*>[^<]*'` → contains `Norges Cup`;
`curl -si -H 'Host: nc.stovnerfrisbee.no' http://localhost:4173/om-klubben | head -3` → `308` with `location: https://stovnerfrisbee.no/om-klubben`;
`curl -s http://localhost:4173/ | grep -c 'Norges Cup #4'` → main front page unchanged (0 unless the front page already mentions it).
If Vite answers 403 "Blocked request", add the `allowedHosts` entries and rerun. Stop the preview server.

- [ ] **Step 6: README section** with these owner steps: (1) Vercel → Project → Settings → Domains → add `nc.stovnerfrisbee.no`; (2) at the DNS host add the record Vercel shows (normally `CNAME nc → cname.vercel-dns.com`); (3) wait for Vercel to show "Valid Configuration", then open `https://nc.stovnerfrisbee.no`. Before DNS is live, the page is at `/norges-cup` on any deployment.

- [ ] **Step 7: Commit**

```bash
git add src/lib/events/hosts.ts src/lib/events/hosts.test.ts src/hooks.ts src/hooks.server.ts vite.config.ts README.md
git commit -m "Norges Cup-siden på nc.stovnerfrisbee.no via reroute"
```

---

### Task 5: Analytics and design-principles log

**Files:**
- Modify: `src/lib/analytics.ts` (`PRODUCTION_HOSTS` + `calendar_click`)
- Modify: `docs/analytics.md`
- Modify: `docs/design-principles.md` (decision log row)

**Interfaces:**
- Consumes: `data-calendar` attributes (Task 3), `EVENT_HOST` (Task 4)

- [ ] **Step 1: Hosts.** Add `EVENT_HOST` (import from `$lib/events/hosts`) to `PRODUCTION_HOSTS`.

- [ ] **Step 2: Calendar clicks.** In `trackLinkClick`, before the outbound/member branches: if `a.dataset.calendar` is set, `posthog.capture('calendar_click', { ...props, method: a.dataset.calendar })` and return, so the Google link is counted once as `calendar_click` (method `google`), not as `outbound_click`.

- [ ] **Step 3: Docs.** In `docs/analytics.md`: note that `nc.stovnerfrisbee.no` counts as production; add the row `calendar_click | Klikk på «Legg i kalenderen» eller «Google Kalender» (data-calendar) | href, from_path, location, label, method (ics/google)`; mention that `data-calendar` links are not also counted as `outbound_click`. In `docs/design-principles.md` decision log add: `| 2026-11-09 | Arrangementssider på egne subdomener (først nc.stovnerfrisbee.no) har eget uttrykk: vimpler, stor tittel, tekst over bildet, logo som arrangør. Gjelder bare disse sidene. |`

- [ ] **Step 4: Run checks**

Run: `npm run check && npm test`
Expected: 0 errors; tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/analytics.ts docs/analytics.md docs/design-principles.md
git commit -m "Sporing av kalenderklikk og nc-subdomenet, beslutningslogg"
```

---

### Task 6: Final verification and cleanup

- [ ] **Step 1:** `npm run check && npm test && npm run build` — all succeed.
- [ ] **Step 2:** Playwright pass per `CLAUDE.md`: `/norges-cup` and `/` at 1440×900 and 390×844; report anything that got busier than before. Delete screenshots, stop servers, close the browser.
- [ ] **Step 3:** Hand back to the owner with the README's Vercel/DNS steps and the follow-ups from the spec (real photo, link from `/arrangementer`).
