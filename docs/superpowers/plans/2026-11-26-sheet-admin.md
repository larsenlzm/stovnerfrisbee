# Redigering via Google Sheets – Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Styremedlemmer redigerer arrangementer og styret i et Google-regneark; bare godkjente rader havner på stovnerfrisbee.no.

**Architecture:** Et regneark med arbeidsfaner (redaktører) og beskyttede *Publisert*-faner (kun skriptet/godkjennere). Et Apps Script kopierer en rad til Publisert når en godkjenner krysser av, fjerner godkjenningen når innholdet endres (hash-sammenligning, ikke identitet), og trigger en Vercel Deploy Hook. Et `prebuild`-skript leser Publisert-fanene via service-konto, validerer, laster ned styrebilder og skriver JSON-snapshots som `content.ts` eksporterer i samme form som i dag.

**Tech Stack:** SvelteKit 2 / Svelte 5, TypeScript, vitest, Node ≥ 22.6 (`--experimental-strip-types`), sharp, Google Sheets API v4 + Drive API v3 (rå `fetch`, JWT signert med `node:crypto` – ingen nye avhengigheter), Google Apps Script, Vercel Deploy Hooks.

**Spec:** `docs/superpowers/specs/2026-11-24-sheet-admin-design.md`

## Global Constraints

- Godkjennere: `admin@stovnerfrisbee.no`, `td@stovnerfrisbee.no`. Eier av arket: `admin@stovnerfrisbee.no`.
- Arknavn: «Stovner Frisbee – nettsideinnhold». Faner: `Arrangementer`, `Styret`, `Publisert – arrangementer`, `Publisert – styret` (tankestrek –, U+2013).
- Godkjenning bygger aldri på hvem som redigerte (noen redaktører bruker private Gmail-kontoer): kun beskyttede områder + innholds-hash.
- Nettsiden leser kun Publisert-fanene. Utkast er aldri offentlige (arket deles ikke offentlig).
- `events` og `boardMembers` i `content.ts` beholder dagens form; ingen sider endres visuelt.
- Bygg feiler (Vercel beholder forrige deploy) ved: manglende credentials på Vercel, utilgjengelig ark, manglende kolonneoverskrift, bilde som ikke kan lastes ned, tom Publisert-fane. Enkeltrader som er ugyldige hoppes over med advarsel.
- Lokalt uten credentials: innsjekket snapshot brukes, `npm run dev`/`npm test` virker uten Google.
- Ingen nye npm-avhengigheter.
- Tekst mot brukere (Status-meldinger, e-post, guide) på norsk bokmål.

## Kolonner (fasit for alle tasks)

**Arrangementer** (arbeidsfane), kolonne A→Q:
`ID | Tittel | Startdato | Sluttdato | Ukedag | Datotekst | Bane | Beskrivelse | Lenke | Lenketekst | Kategori | Resultatlenke | Fjern | Godkjent | Status | Publisering | Hash`

**Styret** (arbeidsfane), A→K:
`ID | Rekkefølge | Navn | Rolle | E-post | Bilde | Fjern | Godkjent | Status | Publisering | Hash`

**Publisert – arrangementer**: `ID` + `Tittel`…`Resultatlenke` + `Publisert av | Publisert tidspunkt`
**Publisert – styret**: `ID` + `Rekkefølge`…`Bilde` + `Publisert av | Publisert tidspunkt`

`Hash` er skjult. `ID`, `Godkjent`, `Publisering`, `Hash` og begge Publisert-faner er beskyttet (kun godkjennere + eier).

**Valideringsregler** (samme regler i Status-formelen og i `parse.ts`; første brutte regel vises):

| Fane | Regel | Melding |
|---|---|---|
| Arr. | Tittel tom | `Mangler tittel` |
| Arr. | Startdato, Sluttdato og Datotekst alle tomme | `Mangler dato` |
| Arr. | Sluttdato < Startdato | `Sluttdato før startdato` |
| Arr. | Beskrivelse tom | `Mangler beskrivelse` |
| Arr. | Lenke tom | `Mangler lenke` |
| Arr. | Lenke starter ikke med `https://` eller `/` | `Lenken må starte med https:// eller /` |
| Arr. | Lenketekst tom | `Mangler lenketekst` |
| Arr. | Kategori tom | `Mangler kategori` |
| Arr. | Resultatlenke satt og starter ikke med `https://` eller `/` | `Resultatlenken må starte med https:// eller /` |
| Styret | Rekkefølge ikke et tall | `Mangler rekkefølge` |
| Styret | Navn tom | `Mangler navn` |
| Styret | Rolle tom | `Mangler rolle` |
| Styret | E-post satt og ikke på formen `x@y.z` | `Ugyldig e-post` |
| Styret | Bilde tom | `Mangler bilde` |
| Styret | Bilde er ikke en Drive-lenke `driveFileId` kjenner | `Bildet må være en Google Drive-lenke` |

Gyldig rad → `✅`. Helt tom rad → tom Status.

## Review Focus

1. **Tom Publisert-fane** (alle rader fjernet eller ugyldige) → bygget feiler i stedet for å publisere en tom side. Test i Task 3.
2. **Datoer i ulike former** fra API-et (serienummer, `2026-05-30`, tekst som `30.05.2026`) → serienummer og ISO godtas; annet gjør raden ugyldig (`Mangler dato`/hoppes over), krasjer aldri. Test i Task 1.
3. **Ujevne rader** (Sheets kutter tomme celler i slutten av en rad) og helt tomme rader → manglende celler = tom streng; tomme rader ignoreres uten advarsel. Test i Task 1.
4. **Arrangement med bare startdato** → `endDate` settes lik `startDate`, ellers ville det ligge som «kommende» for alltid. Test i Task 1.
5. **Drive-lenker i ulike former** (`/file/d/<id>/view`, `open?id=<id>`, `uc?id=<id>&export=download`) → samme fil-ID; andre lenker ugyldige. Test i Task 1.

---

### Task 1: Parsing og validering av Publisert-rader

**Files:**
- Create: `src/lib/sheet/types.ts`, `src/lib/sheet/parse.ts`
- Test: `src/lib/sheet/parse.test.ts`

**Interfaces:**
- Produces:
  - `types.ts`: `SiteEvent { title: string; date: string; startDate?: string; endDate?: string; weekday?: number; course?: string; description: string; link: string; linkText: string; category: string; resultsLink?: string }`, `BoardMember { name: string; role: string; email: string; image: string }`, `PublishedBoardRow { id: string; order: number; name: string; role: string; email: string; imageUrl: string }`, `type Cell = string | number | boolean`.
  - `parse.ts`:
    - `class SheetHeaderError extends Error`
    - `parseEvents(rows: Cell[][]): { items: SiteEvent[]; warnings: string[] }` – rad 0 er overskrifter; kolonner slås opp på navn (rekkefølge vilkårlig); manglende påkrevd overskrift → `SheetHeaderError`. Resultatet er sortert (se `sortEvents`).
    - `parseBoard(rows: Cell[][]): { items: PublishedBoardRow[]; warnings: string[] }` – sortert på `order`.
    - `toIsoDate(v: Cell): string | null` – Sheets-serienummer (dager siden 1899-12-30) eller `YYYY-MM-DD`; ellers `null`.
    - `dateLabel(start?: string, end?: string): string`
    - `weekdayNumber(name: string): number | undefined` – `søndag`=0 … `lørdag`=6, store/små bokstaver likegyldig.
    - `driveFileId(url: string): string | null`
    - `sortEvents(events: SiteEvent[]): SiteEvent[]` – uten `startDate` først (stabil rekkefølge), deretter stigende `startDate`.
    - Advarsler har formen `` `${fane} rad ${n} (${tittel/navn}): ${melding}` ``.

- [ ] **Step 1: Skriv feilende tester** i `parse.test.ts`:
  - `toIsoDate`: `46172` → `'2026-05-30'`; `'2026-05-30'` → `'2026-05-30'`; `'30.05.2026'` → `null`; `''` → `null`.
  - `dateLabel`: `('2026-05-30','2026-05-31')` → `'30.–31. mai 2026'`; `('2026-06-15','2026-06-15')` → `'15. juni 2026'`; `('2026-05-30','2026-06-02')` → `'30. mai – 2. juni 2026'`; `('2026-12-30','2027-01-02')` → `'30. desember 2026 – 2. januar 2027'`; `(undefined,'2026-11-05')` → `'5. november 2026'`.
  - `weekdayNumber('Onsdag')` → `3`; `weekdayNumber('søndag')` → `0`; `weekdayNumber('')` → `undefined`.
  - `driveFileId`: `https://drive.google.com/file/d/abc123/view?usp=sharing`, `https://drive.google.com/open?id=abc123`, `https://drive.google.com/uc?id=abc123&export=download` → `'abc123'`; `https://example.com/a.jpg` → `null`.
  - `parseEvents`:
    - Stovner Open-rad med tom Datotekst → `{ title:'Stovner Open 2026', date:'30.–31. mai 2026', startDate:'2026-05-30', endDate:'2026-05-31', … }` (ingen `weekday`/`resultsLink`-nøkler når tomme).
    - Torsdagsgolf-rad med bare Sluttdato `2026-11-05` og Datotekst `Hver torsdag 17:30–20:30` → `date` er Datoteksten, ingen `startDate`.
    - Rad med Ukedag `Onsdag` → `weekday: 3`.
    - Rad med bare Startdato → `endDate === startDate`.
    - Kolonnene i omvendt rekkefølge gir samme resultat.
    - Overskrift `Lenke` mangler → kaster `SheetHeaderError`.
    - Én rad per regel i tabellen over → hoppes over, `warnings` inneholder meldingen.
    - Ujevn rad (kortere enn overskriften) med alle påkrevde felt → godtas; helt tom rad → ingen advarsel.
    - Sortering: `[Stovner Open (05-30), Torsdagsgolf (ingen start), Vårligaen (04-29)]` → `[Torsdagsgolf, Vårligaen, Stovner Open]`.
  - `parseBoard`: gyldige rader sorteres på Rekkefølge; tom e-post → `email: ''`; regel-radene i tabellen gir advarsel og hoppes over.

- [ ] **Step 2: Kjør og se at de feiler** – `npx vitest run src/lib/sheet/parse.test.ts` → FAIL (modulen finnes ikke).
- [ ] **Step 3: Implementer `types.ts` og `parse.ts`** etter signaturene over. Bruk kun syntaks som Node kan type-strippe (ingen `enum`, `namespace` eller parameter-properties) og `.ts`-endelser i relative imports, fordi Task 3 kjører modulen direkte med Node. Månedsnavn: januar … desember.
- [ ] **Step 4: Kjør og se at de passerer** – `npx vitest run src/lib/sheet/parse.test.ts` → PASS.
- [ ] **Step 5: Commit** – `git add src/lib/sheet && git commit -m "Parsing og validering av publiserte rader fra regnearket"`

### Task 2: Snapshot-filer og `content.ts` leser fra dem

**Files:**
- Create: `src/lib/data/sheet/events.json`, `src/lib/data/sheet/board.json`
- Modify: `src/lib/data/content.ts` (erstatt `export const events = [...]` linje 48–195 og `boardMembers` linje 197–204)
- Test: `src/lib/data/content.test.ts`

**Interfaces:**
- Consumes: `SiteEvent`, `BoardMember` fra Task 1.
- Produces: `events: SiteEvent[]` og `boardMembers: BoardMember[]` eksportert fra `content.ts`; snapshot-filene er `SiteEvent[]` / `BoardMember[]` som JSON (2 mellomrom, avsluttende linjeskift).

- [ ] **Step 1: Skriv feilende test** `content.test.ts`: `events` har 12 elementer, `events[0].title === 'Torsdagsgolf'`, `events.at(-1).title === 'Norges Cup #4'`, Vårligaen har `weekday: 3` og `resultsLink: '/arrangementer/varligaen-2026'`; `boardMembers` har 6, første er `{ name:'Herman Walther', role:'Leder', email:'herman@stovnerfrisbee.no', image:'/mansverk.jpg' }`. Importer JSON direkte og sjekk at det er samme data (f.eks. `expect(events).toEqual(eventsJson)`).
- [ ] **Step 2: Kjør** – `npx vitest run src/lib/data/content.test.ts` → FAIL.
- [ ] **Step 3: Flytt dagens to lister uendret inn i JSON-filene** (behold rekkefølge og alle felt; kommentarene forsvinner). `content.ts`: `import eventsJson from './sheet/events.json'`, `export const events: SiteEvent[] = eventsJson;` og tilsvarende for styret.
- [ ] **Step 4: Verifiser** – `npm test` og `npm run check` → grønt. `npm run build` → OK. Start `npm run dev`, åpne `/`, `/arrangementer`, `/banene`, `/om-klubben` og bekreft at de ser ut som på `main` (samme arrangementer i samme rekkefølge, samme styre). Stopp dev-serveren.
- [ ] **Step 5: Commit** – `git commit -m "Arrangementer og styret leses fra snapshot-filer"`

### Task 3: Henting fra Google i bygget

**Files:**
- Create: `scripts/fetch-sheet.ts`, `src/lib/sheet/google.ts`, `src/lib/sheet/fetch-plan.ts`
- Modify: `package.json` (scripts + `engines`), `.env.example`
- Test: `src/lib/sheet/fetch-plan.test.ts`

**Interfaces:**
- Consumes: `parseEvents`, `parseBoard`, `driveFileId`, `SheetHeaderError`, typer fra Task 1; snapshot-stier fra Task 2.
- Produces:
  - `google.ts`: `getAccessToken(sa: { client_email: string; private_key: string }, scopes: string[]): Promise<string>` (JWT RS256 med `node:crypto` → `https://oauth2.googleapis.com/token`), `readValues(token: string, sheetId: string, tab: string): Promise<Cell[][]>` (`values/'<tab>'!A1:Z?valueRenderOption=UNFORMATTED_VALUE&dateTimeRenderOption=SERIAL_NUMBER`), `downloadDriveFile(token: string, fileId: string): Promise<Buffer>` (`drive/v3/files/<id>?alt=media&supportsAllDrives=true`). Ikke-2xx → kast `Error` med status og fane/fil-ID.
  - `fetch-plan.ts` (rene funksjoner):
    - `decideSource(env: Record<string, string | undefined>): 'sheet' | 'snapshot' | { error: string }` – `GOOGLE_SERVICE_ACCOUNT_JSON` og `CONTENT_SHEET_ID` satt → `'sheet'`; mangler noen og `VERCEL` er satt → `{ error }`; ellers `'snapshot'`.
    - `assertPublishable(events: SiteEvent[], board: PublishedBoardRow[]): void` – kaster hvis en av dem er tom.
    - `boardImagePath(id: string): string` → `` `/styret/${id}.jpg` ``.
  - `scripts/fetch-sheet.ts`: les env (også `.env` lokalt via `process.loadEnvFile` hvis filen finnes) → `decideSource`. `'snapshot'`: logg «Bruker innsjekket snapshot» og avslutt 0. `'sheet'`: les begge Publisert-faner, parse, logg alle advarsler, `assertPublishable`, last ned hvert bilde, `sharp` → 400×400 `cover`, JPEG kvalitet 82, skriv til `static/styret/<id>.jpg`, slett filer i `static/styret/` som ikke lenger brukes, skriv snapshot-JSON. Enhver kastet feil → skriv melding til stderr og `process.exit(1)`.
  - `package.json`: `"sheet:pull": "node --experimental-strip-types scripts/fetch-sheet.ts"`, `"prebuild": "npm run sheet:pull"`, `"engines": { "node": ">=22.6" }`.
  - `.env.example`: `GOOGLE_SERVICE_ACCOUNT_JSON=` (hele nøkkel-JSON-en på én linje) og `CONTENT_SHEET_ID=` med en kommentarlinje hver.

- [ ] **Step 1: Skriv feilende tester** `fetch-plan.test.ts`: `decideSource({})` → `'snapshot'`; `decideSource({ VERCEL:'1' })` → objekt med `error`; begge variabler satt (med og uten `VERCEL`) → `'sheet'`; bare én satt + `VERCEL` → `error`. `assertPublishable([], [rad])` og `assertPublishable([arr], [])` kaster; begge ikke-tomme kaster ikke. `boardImagePath('a1b2')` → `'/styret/a1b2.jpg'`.
- [ ] **Step 2: Kjør** – `npx vitest run src/lib/sheet/fetch-plan.test.ts` → FAIL.
- [ ] **Step 3: Implementer** `fetch-plan.ts`, `google.ts`, `scripts/fetch-sheet.ts`, `package.json`, `.env.example` etter grensesnittene over.
- [ ] **Step 4: Verifiser** –
  - `npx vitest run` → PASS.
  - `npm run sheet:pull` uten credentials → «Bruker innsjekket snapshot», exit 0, `git status` viser ingen endrede snapshot-filer.
  - `VERCEL=1 npm run sheet:pull` uten credentials → exit 1 med forklarende melding.
  - `npm run build` → OK (prebuild kjører og bruker snapshot).
- [ ] **Step 5: Commit** – `git commit -m "Bygget henter publiserte arrangementer og styret fra Google Sheets"`

### Task 4: Apps Script for godkjenning

**Files:**
- Create: `apps-script/Code.gs`, `apps-script/README.md` (kort: hva filen er, at den limes inn i arket, og at `setup()` kjøres én gang)

**Interfaces:**
- Consumes: kolonner, faner og valideringsmeldinger fra «Kolonner» over; Status-kolonnen viser `✅` for gyldig rad.
- Produces (globale funksjoner i `Code.gs`):
  - `CONFIG = { approvers: ['admin@stovnerfrisbee.no','td@stovnerfrisbee.no'], tabs: { 'Arrangementer': 'Publisert – arrangementer', 'Styret': 'Publisert – styret' } }`
  - `setup()` – kjøres manuelt én gang av eier: sletter eksisterende triggere for dette prosjektet, lager installerbar `onEditInstalled` (on edit) og `hourlyCheck` (hver time), setter beskyttelser (kolonnene ID, Godkjent, Publisering, Hash i begge arbeidsfaner, og hele begge Publisert-faner) med redaktører = `CONFIG.approvers` + eier, `setDomainEdit(false)`, og skjuler Hash-kolonnen.
  - `onEditInstalled(e)`, `hourlyCheck()`.
  - Script Property `DEPLOY_HOOK_URL` (settes manuelt).

Oppførsel `onEditInstalled` (kun i arbeidsfanene, for hver berørt rad under overskriften):

| Hendelse | Handling |
|---|---|
| Rad har innhold men ingen ID | Sett ID = første 8 tegn av `Utilities.getUuid()` |
| Godkjent krysset av, Status ≠ `✅` | Fjern avkrysningen, vis `SpreadsheetApp.getActive().toast('Kan ikke godkjennes: <Status>')` |
| Godkjent krysset av, Status = `✅`, Fjern ikke krysset | Upsert raden (på ID) i Publisert-fanen med `Publisert av` = `Session.getActiveUser().getEmail()` eller `ukjent`, `Publisert tidspunkt` = nå; lagre hash; Publisering = `Publisert dd.mm.yyyy HH:mm`; kall deploy-hook |
| Godkjent krysset av, Fjern krysset | Slett raden med samme ID fra Publisert-fanen; Publisering = `Fjernet fra nettsiden dd.mm.yyyy`; kall deploy-hook |
| Innholdscelle endret og raden har lagret hash som ikke matcher | Fjern Godkjent, Publisering = `Endret – venter på godkjenning`, varsle godkjennere |
| Innholdscelle endret, rad aldri publisert | Publisering = `Venter på godkjenning`, varsle godkjennere |

- Hash: `Utilities.computeDigest(SHA_256)` over innholdskolonnene + Fjern, slått sammen med `␟`, base64.
- Varsling: `MailApp.sendEmail` til godkjennerne med fane, tittel/navn og lenke til arket; maks én e-post per rad per 30 min (`CacheService.getScriptCache()`, nøkkel = fane+ID).
- Deploy-hook: `UrlFetchApp.fetch(url, { method: 'post', muteHttpExceptions: true })`; mangler URL eller svaret ikke er 2xx → toast med feilen (godkjenningen står, publisering i arket er gjort).
- `hourlyCheck` (kalles også på slutten av `setup()`): for alle rader med Godkjent krysset av – mangler hash (migrerte rader): lagre hash; ellers sammenlign, og ved avvik samme handling som «Innholdscelle endret … ikke matcher».

- [ ] **Step 1: Skriv `Code.gs`** etter tabellene over.
- [ ] **Step 2: Syntakssjekk** – `node --check --input-type=commonjs < apps-script/Code.gs` → ingen feil.
- [ ] **Step 3: Commit** – `git commit -m "Apps Script for godkjenning av innhold i regnearket"` (manuell test skjer i Task 5).

### Task 5: Opprett regnearket, oppsett og veiledning

Utføres i hovedsesjonen sammen med Elias (krever Google-koblingen og manuelle steg).

**Files:**
- Create: `docs/innholdsredigering.md` – del 1 «For redaktører» (hvordan legge inn/endre/fjerne, hva Status og Publisering betyr, versjonshistorikk), del 2 «Oppsett (admin)» (stegene i 2–6 under, inkl. hvordan bytte godkjennere: `CONFIG.approvers` + kjør `setup()` på nytt).
- Modify: `CLAUDE.md` – én linje under «Project»: arrangementer og styret redigeres i regnearket, se `docs/innholdsredigering.md`; ikke rediger `src/lib/data/sheet/*.json` for hånd unntatt ved nødsfall.

- [ ] **Step 1: Finn ut hvilken konto Google-koblingen bruker.** Er den ikke `admin@stovnerfrisbee.no`: be Elias opprette et tomt ark «Stovner Frisbee – nettsideinnhold» i admin-kontoen og dele det med koblingens konto; ellers opprett det direkte.
- [ ] **Step 2: Bygg arket via Sheets-koblingen**: fire faner med overskrifter fra «Kolonner»; datovalidering (datovelger, format `yyyy-mm-dd`) på Startdato/Sluttdato; nedtrekk Ukedag (mandag…søndag), Rolle (Leder, Nestleder, Styremedlem, Varamedlem, fritekst tillatt), Kategori (Ukentlig, Liga, Turnering, PDGA, DOUBLES, flervalg); avkrysningsbokser på Fjern og Godkjent; Status som én formel i overskriftsraden (`MAP`/`BYROW` el.l.) som dekker alle rader inkl. nye og følger regeltabellen; frys overskriftsraden; betinget formatering: rad lys rød når Status ikke er `✅`/tom.
- [ ] **Step 3: Fyll inn dagens data** fra snapshot-filene i både arbeidsfaner og Publisert-faner, med ID-er (8 tegn), Godkjent krysset av, Publisering = `Publisert (migrert)`. Elias laster de seks styrebildene fra `static/` opp i en Drive-mappe «Nettside – styrebilder»; Bilde-kolonnen fylles med lenkene. Hash-kolonnen står tom; `setup()` fyller den (Task 4).
- [ ] **Step 4: Elias gjør de manuelle stegene** etter `docs/innholdsredigering.md`: Google Cloud-prosjekt + service-konto (Sheets API og Drive API aktivert), del arket og bildemappen med service-kontoen som leser, `GOOGLE_SERVICE_ACCOUNT_JSON` og `CONTENT_SHEET_ID` i Vercel (alle miljøer) og lokal `.env`, Vercel Deploy Hook for `main` inn i Script Property `DEPLOY_HOOK_URL`, lim inn `Code.gs`, kjør `setup()` og godta tillatelser.
- [ ] **Step 5: Lokal ende-til-ende** – `npm run sheet:pull` med `.env` → ingen advarsler; `git diff src/lib/data/sheet` viser bare at bildestiene er byttet til `/styret/<id>.jpg`; `static/styret/` har seks bilder. `npm run dev` → `/om-klubben` og `/arrangementer` ser ut som før. Commit snapshot og bilder.
- [ ] **Step 6: Manuell test av godkjenningsflyten** (helst med en privat Gmail-konto som redaktør):
  1. Redaktør legger til et testarrangement med feil lenke → Status viser `Lenken må starte med https:// eller /`; godkjenner krysser av → avkrysningen fjernes med toast.
  2. Rett lenken → godkjenn → raden finnes i Publisert, Vercel-bygg startet, arrangementet synlig på nettsiden etter bygg.
  3. Redaktør endrer tittelen → Godkjent fjernes, Publisering = `Endret – venter på godkjenning`, e-post mottatt; nettsiden viser fortsatt gammel tittel.
  4. Redaktør prøver å krysse av Godkjent og å redigere Publisert-fanen → nektet av beskyttelsen.
  5. Redaktør sletter raden i arbeidsfanen → arrangementet ligger fortsatt på nettsiden.
  6. Lag raden på nytt, kryss av Fjern, godkjenn → borte fra Publisert og fra nettsiden etter bygg.
- [ ] **Step 7: Commit** – `git commit -m "Veiledning for redigering i regnearket"`; fjern testdata fra arket.

---

## Self-review

- Spec-dekning: arbeidsfaner/validering/Status (T5), beskyttelse/godkjenning/hash/fjern/varsling/deploy (T4, T5), privat lesing via service-konto (T3), bilder via Drive + sharp (T3), sikkerhetsnett og snapshot (T2, T3), migrering (T2, T5), versjonshistorikk (innebygd, beskrevet i guiden T5). Nyheter og andre data er ikke-mål.
- Typer: `SiteEvent`/`BoardMember`/`PublishedBoardRow`/`Cell` definert i T1 og brukt likt i T2–T3.
