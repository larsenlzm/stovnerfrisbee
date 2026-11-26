# For medlemmer – implementeringsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lage siden `/for-medlemmer`, som samler alt klubben tilbyr medlemmer. Reisestøtte flyttes inn på denne siden, og gamle adresser sendes videre dit.

**Architecture:** En statisk SvelteKit-side bygget på `PageHeader` uten bilde, med seksjoner som er ren tekst. Redirectene legges i `src/lib/legacy-redirects.ts`, som `hooks.server.ts` allerede bruker.

**Tech Stack:** SvelteKit (Svelte 5), Tailwind v4 med tema-variabler, vitest.

**Spec:** `docs/superpowers/specs/2026-11-26-for-medlemmer-design.md`

## Global Constraints

- Følg `docs/design-principles.md`. Bruk bare tema-variabler (`var(--color-…)`) og norsk bokmål.
- Ingen bokser eller kort for ordningene. Bruk overskrift og avsnitt med fet innledning.
- Ingen fylt knapp på `/for-medlemmer`. Bruk bare tekstlenker.
- E-post til styret: `styret@stovnerfrisbee.no`.
- Beløpene for reisestøtte: 1 000 kr (første norgescup/NM, påmelding), 3 000 kr (første utenlandske, minst Eurotour, påmelding og billigste overnatting), 1 500 kr (inkludering, påmelding, overnatting og reise, kan utbetales på forhånd).
- Ingen merge til `main` uten eksplisitt tillatelse fra eier.

## Review Focus

- `/reisestotte/` med skråstrek til slutt skal også sendes videre. Testes i Task 1.
- Den gamle PDF-adressen skal fortsatt sendes videre, nå til den nye siden. Testes i Task 1.
- Når lenken `#reisestotte` åpnes, skal siden lande på riktig seksjon. Seksjonen skal ha `id="reisestotte"`, og dette sjekkes manuelt i Task 2.
- Siden skal fungere i mørkt tema. Sjekkes visuelt i Task 2.

---

### Task 1: Redirects til /for-medlemmer

**Files:**
- Modify: `src/lib/legacy-redirects.ts` (tabellen `FILES` får navnet `PATHS`)
- Test: `src/lib/legacy-redirects.test.ts`

**Interfaces:**
- Produces: `legacyRedirect(url: URL): string | null`. Signaturen er uendret.

- [ ] **Step 1: Skriv test som feiler**

```ts
it('sends reisestøtte addresses to the member page', () => {
	expect(legacyRedirect(u('https://stovnerfrisbee.no/reisestotte'))).toBe('/for-medlemmer#reisestotte');
	expect(legacyRedirect(u('https://stovnerfrisbee.no/reisestotte/'))).toBe('/for-medlemmer#reisestotte');
	expect(legacyRedirect(u('http://www.stovnerfrisbee.no/wp-content/uploads/2017/04/Stovner-Frisbeeklubb-Turneringsst%C3%B8tte.pdf'))).toBe('/for-medlemmer#reisestotte');
});
```

Fjern den gamle testen som forventer `'/reisestotte'`.

- [ ] **Step 2:** Kjør `npx vitest run src/lib/legacy-redirects.test.ts`. Forventet resultat: FAIL.
- [ ] **Step 3:** Gi `FILES` navnet `PATHS`, og legg inn `/reisestotte`, `/reisestotte/` og PDF-stien. Alle tre skal peke på `/for-medlemmer#reisestotte`.
- [ ] **Step 4:** Kjør testen på nytt. Forventet resultat: PASS.
- [ ] **Step 5:** Commit.

### Task 2: Siden /for-medlemmer og veiene inn

**Files:**
- Create: `src/routes/for-medlemmer/+page.svelte`
- Delete: `src/routes/reisestotte/`
- Modify: `src/routes/om-klubben/+page.svelte` (Styret-seksjonen får `id="styret"`)
- Modify: `src/routes/bli-medlem/+page.svelte`
  - tekstlinjen «Allerede medlem? Se hva klubben tilbyr →» øverst i første seksjon
  - lenken i punktet om reisestøtte går til `/for-medlemmer#reisestotte`
- Modify: `src/lib/components/Footer.svelte` (lenken «For medlemmer» ved siden av e-posten nederst)
- Modify: `static/sitemap.xml` (`/reisestotte` byttes med `/for-medlemmer`)

- [ ] **Step 1:** Bygg siden med `PageHeader` (eyebrow «Medlemskap», tittel «For medlemmer», undertittel «Dette får du som medlem av Stovner Frisbeeklubb», uten bilde). Innholdet ligger i `max-w-6xl`, med en indre kolonne på `max-w-3xl`, og har disse seksjonene:
  1. `#reisestotte`: én innledningssetning, de tre ordningene som avsnitt med fet innledning, og tre linjer om hvordan man søker.
  2. `#utstyr`: hva klubben har, og en lenke til `/om-klubben#styret` eller til e-posten.
  3. `#rabatt`: si at du er medlem i Stovner Frisbeeklubb ved kassen i den fysiske butikken til wearediscgolf.
  4. `#klubbtur`: klubbtur og klubbmesterskap kunngjøres i Spond.
  5. `#arsmote`: årsmøtet holdes i februar, og innkallingen kommer i desember.
  6. Avslutning: «Spørsmål? Send e-post til styret@stovnerfrisbee.no».
- [ ] **Step 2:** Slett `src/routes/reisestotte/` og gjør endringene i de andre filene som er listet over.
- [ ] **Step 3:** Kjør `npm test && npm run check`. Forventet resultat: alt passerer, 0 feil.
- [ ] **Step 4:** Start dev-serveren og sjekk i Playwright:
  - `/for-medlemmer` på desktop, mobil og i mørkt tema
  - lenken på `/bli-medlem`
  - `/reisestotte` skal gi 301 til `#reisestotte`
  - slett skjermbildene etterpå og stopp serveren
- [ ] **Step 5:** Commit på `for-medlemmer`. Ikke merge.
