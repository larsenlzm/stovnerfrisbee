# Analytics

Bruksstatistikk med PostHog (EU, uten cookies). Mål: se hvor mange som går fra arrangementssiden til eksterne lenker, og hvor mange som trykker «Bli medlem» og videre til Spond.

## Oppsett

- Koden ligger i `src/lib/analytics.ts` og startes fra `src/hooks.client.ts`.
- Prosjektnøkkelen (`phc_...`) settes som `PUBLIC_POSTHOG_KEY` i Vercel (Production). Den er en offentlig nøkkel som uansett sendes til alle besøkende, så den er ikke hemmelig. Etter endring må det deployes på nytt.
- Lokal `.env` trengs ikke: sporing er kun på for `stovnerfrisbee.no`, `www.stovnerfrisbee.no` og `nc.stovnerfrisbee.no` (Norges Cup-siden), så lokal utvikling og forhåndsvisninger telles aldri.
- Data går via en proxy på `/sf-data` (`src/hooks.server.ts`) for å komme rundt annonseblokkere.
- `persistence: 'memory'`: ingen cookies eller localStorage, så vi trenger ikke samtykkebanner. Det gir ingen personprofiler, så anonyme hendelser kan ikke slettes enkeltvis via persons-API-et.

## Slå av sporing i egen nettleser

- `?notrack` på en hvilken som helst adresse slår av sporing i denne nettleseren (lagres i localStorage som `sf-notrack`).
- `?track` slår den på igjen.
- `?notrack` lagres per domene (localStorage), så den må settes separat på `nc.stovnerfrisbee.no`.

## Hendelser

| Hendelse | Når | Egenskaper |
|---|---|---|
| `$pageview` | Sidevisning (også ved navigering i appen) | standard |
| `outbound_click` | Klikk på lenke til annet domene | `destination`, `href`, `from_path`, `location`, `label`, `event_title` |
| `member_cta_click` | Klikk på lenke til `/bli-medlem` | `href`, `from_path`, `location`, `label` |
| `calendar_click` | Klikk på «Legg i kalenderen» eller «Google Kalender» (`data-calendar`) | `href`, `from_path`, `location`, `label`, `method` (`ics`/`google`) |

Merking i markup:

- `nc.stovnerfrisbee.no` deler stier med hovedsiden (f.eks. `/`), så filtrer eller del opp på `$host` i innsikter.
- Kalenderlenkene på Norges Cup-siden har `location` `nc-ics` og `nc-google`.
- `data-track="<navn>"` på en lenke gir `location` (f.eks. `nav-desktop`, `nav-mobile-menu`, `frontpage-hero`, `frontpage-live` for «Pågår nå»-stripen, `banene-status` for statuslinjen på banekortene). Uten den brukes sidens sti.
- `data-calendar="ics|google"` på kalenderlenker gir `calendar_click` med `method`. Slike lenker telles ikke i tillegg som `outbound_click`.
- `data-event="<tittel>"` på en arrangementskort gir `event_title` på klikk inni kortet.

Nye eksterne lenker spores automatisk. Legg til `data-track` bare når samme lenke finnes flere steder og vi vil skille dem.

## Tratter å bygge når det er trafikk

1. «Bli medlem»-klikk (`member_cta_click`) → `/bli-medlem` → utgående klikk til Spond.
2. `/arrangementer` → `outbound_click`, fordelt på `destination` og `event_title`.

## Rydding av data

- Prosjektet opprettet 2026-11-05 inneholder egne testklikk fra localhost og tidlige besøk. Anbefalt: nytt PostHog-prosjekt (EU), ny nøkkel i Vercel, og gammelt prosjekt slettes når det nye viser første hendelser.
- Alternativ: behold prosjektet og filtrer alle innsikter på `$host = www.stovnerfrisbee.no`.
- `data-event` og `data-track` er først live når `forside-redesign` er merget.
