# Norges Cup #4 landing page (nc.stovnerfrisbee.no)

Date: 2026-11-09 · Status: design, waiting for the owner's approval

## Why

Stovner Frisbee has won the bid to host **Norges Cup #4, 6–8 August 2027**, at Stovner disc golf park in Oslo. The club wants its own address, `nc.stovnerfrisbee.no`, that people can share and come back to. Over the next months it will grow into a full event page for players, volunteers and spectators (inspiration: [diskgolfnm.no](https://www.diskgolfnm.no/)). For now there is very little to say, so the first version is a short, celebratory "save the date" page.

Main audience: players. Also volunteers who want to help, and people curious about what will happen on the course before the tournament.

## Goals

- Anyone landing on the page understands within seconds: **what** (Norges Cup #4), **when** (6.–8. august 2027), **where** (Stovner), and that **more info is coming**.
- One clear action: **add the date to your calendar**.
- It feels celebratory but calm and minimal, and clearly belongs to Stovner Frisbee (club logo, colours, font).
- It works well on phone and desktop, in both light and dark theme.
- The page is built so the next event page (or the next phase of this one) can reuse the layout by changing name, number, dates, image and calendar file.

## Non-goals (for this version)

- **No newsletter or email signup.** The owner decided to drop it for ease of use. Do not add forms, email collection or a mailing service.
- No news list, schedule, registration, volunteer signup, accommodation or sponsor sections. They come later as real content appears.
- No general multi-event system or CMS. One page, with its event details kept in one place in code.
- No link to the Norges Cup page from the main site's menu or front page in this round (the main menu needs the owner's approval for new items; see `docs/design-principles.md`).

## Anti-goals (would make it a failure even if it works)

- Looking busy or template-like: no confetti, stamps, gradients, shadows, card grids or number strips.
- Feeling sterile or like a plain club subpage. It should have a little celebration (the pennants) and confident type.
- Breaking the main site: existing pages, the club menu and the front page must look and behave exactly as before.

## The design (approved by the owner: "version 2C")

The final mockup is `.superpowers/brainstorm/85183-1794227216/content/nc4-v2-image-options.html`, option **C · Innfelt under teksten** (desktop and mobile shown side by side). It is ignored by git, so it exists only in the owner's checkout. The description below is the source of truth if the two disagree.

Top to bottom:

1. **Top bar.** Small and quiet. Left: "STOVNER FRISBEE" in small spaced capitals, linking to `https://stovnerfrisbee.no` (this is also the route for volunteers and anyone wanting to contact the club). Right on desktop: "Norges Cup #4" in small text. No hamburger menu, because there is nothing to navigate yet. *(Builder/Claude's call: the mockup showed a ☰ on mobile; drop it.)*
2. **Text block, left-aligned**, with the club logo on the right:
   - A short row of **five small pennants** (downward triangles, about 12 px tall), alternating dark green and orange. This is the only decoration.
   - Kicker in small spaced capitals, muted colour: "6.–8. august 2027 · Stovner".
   - Heading `h1`: "Norges Cup **#4**", with "#4" in the accent orange. Very large on desktop (about 84 px), about 44 px on phone, tight negative letter-spacing, line-height about 1.05.
   - One sentence, muted: "Mer info kommer. Legg datoen i kalenderen, så ses vi på Stovner."
   - **"Legg i kalenderen"**: the page's only filled button (primary green). Under or beside it a quiet text link "Google Kalender" that opens Google Calendar's add-event page with the same details. *(Claude's call: the .ics file works on iPhone and most desktop calendars, but many Android users live in Google Calendar. Owner can veto.)*
   - **Logo** (`static/stovnerlogo.jpg`, round): on desktop about 180 px, to the right of the text, with "ARRANGØR" in small spaced capitals under it. On phone about 84 px, top right of the text block, level with the pennants.
3. **Photo**, inset (not edge to edge): follows the text margins, rounded corners (about 18 px), about 440 px tall on desktop and 240 px on phone. Crop so the basket and the flag are fully in view. For now use `static/rocker.jpg` (the basket in front of the red building) as a stand-in. The owner will provide a dedicated photo later; swapping it must be a one-line change.
4. No footer beyond a small amount of breathing room. *(Builder's call whether to add a tiny line like "Arrangert av Stovner Frisbee" at the very bottom; keep it quiet if added.)*

Spacing is generous. Headings line-height ~1.05–1.1, body 1.6. Touch targets on phone at least 44 px. On phone everything stacks in one column: pennants + logo, kicker, heading, sentence, button (full width), Google link, photo.

## Visual rules

- Use only the existing theme in `src/app.css`: colour tokens (`--color-primary`, `--color-primary-dark`, `--color-accent`, `--color-bg`, `--color-muted`, `--color-border`, …) and the Inter font. No new colours or fonts. Heading green is `--color-primary-dark`, "#4" and orange pennants are `--color-accent`.
- Must work in light and dark theme (the site follows the system setting and supports `data-theme`). The mockup only showed light. In dark theme the logo keeps its white circle.
- **Exception to the design principles, approved by the owner during design:** this page has its own look (pennants, very large heading, text above the image, logo as organiser mark) and does not follow the main site's front page pattern (framed image with text under it) or its menu. The exception applies to the Norges Cup / event subdomain page only. Record it in the decision log in `docs/design-principles.md`.

## Behaviour and technical decisions

- **Same app, not a new project.** Build the page inside this SvelteKit app (deployed on Vercel with `adapter-vercel`). Requests to the host `nc.stovnerfrisbee.no` are served the Norges Cup page at `/`. SvelteKit's `reroute` hook (in `src/hooks.ts`) is the expected way to map the host to the route. The route path on the main domain is the builder's choice, for example `/norges-cup`.
- **No club layout.** The root `+layout.svelte` always renders the club `Nav` and `Footer`. The Norges Cup page must not show them. The builder chooses how (for example route groups, or a layout check). Existing pages must render exactly as before.
- **Calendar file.** An all-day event from 6 to 8 August 2027 inclusive (`DTSTART;VALUE=DATE:20270806`, `DTEND;VALUE=DATE:20270809`), title "Norges Cup #4 – Stovner", location "Stovner discgolfpark, Oslo", a short description with a link to `https://nc.stovnerfrisbee.no`, and a fixed UID so re-adding doesn't create duplicates. A static file or a server route are both fine. It must be served as `text/calendar` and open the calendar app on iPhone and desktop. On Android, Chrome usually downloads the file and opens it in the calendar app on tap; that counts as working, with the Google Kalender link as the main Android path. Name it after the event, for example `norges-cup-4.ics`.
- **Event details in one place.** Name, number, dates (display text and calendar values), place, image and image crop live in one small object or module that the page and the calendar file both read. This is what makes it reusable for the next event.
- **Meta and sharing.** The link will be shared on social media, so set `<title>` ("Norges Cup #4 · 6.–8. august 2027 · Stovner"), a meta description, Open Graph and Twitter tags with an absolute image URL on `nc.stovnerfrisbee.no`, and a canonical URL `https://nc.stovnerfrisbee.no/`. The page language is Norwegian (bokmål).
- **Analytics** (read `docs/analytics.md` first). Add `nc.stovnerfrisbee.no` to the production hosts in `src/lib/analytics.ts`. The PostHog proxy `/sf-data` is in `hooks.server.ts` and will work on the subdomain automatically because it's the same app; check it does. Count calendar clicks as a new event, for example `calendar_click` with `location` (`nc-ics` or `nc-google`). The Google link is already counted as `outbound_click`; avoid double counting or document both. Update the events table in `docs/analytics.md`.
- **Search engines.** The page should be indexable. Adding the subdomain to `static/sitemap.xml` or a sitemap of its own is the builder's call.

## Manual steps for the owner (the builder can't do these)

1. In Vercel: add `nc.stovnerfrisbee.no` as a domain on the existing project.
2. At the domain registrar or DNS host: add the record Vercel asks for (normally a `CNAME` for `nc` pointing to Vercel).
3. Later: provide a dedicated photo for the page.

The plan should include short instructions for these steps and a way to test the subdomain before DNS is live (for example the main-domain path, or Vercel preview).

## Constraints

- Branch from `forside-redesign`, not `main`: the analytics host check and `?notrack` exist only on that branch (three commits not yet merged). If it has been merged by the time work starts, branch from `main`.
- Follow `CLAUDE.md`: check the page and the main site's front page on desktop and phone width with Playwright after the change, and clean up screenshots, dev servers and test files afterwards.
- `npm run check` must pass.

## Left to the builder

- How the host-to-route mapping and the layout split are implemented, and the route path on the main domain.
- Static `.ics` vs server route.
- Exact sizes and spacing within the description above. Use the mockup as reference.
- Whether to add a sitemap entry and a tiny footer line.
- Image format and size optimisation (the repo has `sharp` as a dev dependency).

## Follow-ups (not in this version)

- Link to the Norges Cup page from `/arrangementer` and/or the front page (needs the owner's approval).
- Replace the stand-in photo with a tournament photo.
- Grow the page: news, programme, registration, volunteering, practical info.
