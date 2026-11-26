# Redigering av arrangementer og styret via Google Sheets – design

Dato: 2026-11-24 · Status: klar til godkjenning

## Hvorfor

Arrangementer og styreliste ligger i dag hardkodet i `src/lib/data/content.ts` (`events`, `boardMembers`), med bilder i `static/`. Hver endring krever kodeendring, commit og deploy, og går i praksis gjennom nettsideansvarlig. Å legge inn nye arrangementer er tungvint, og styrelisten blir fort utdatert.

Målet er at noen få betrodde styremedlemmer kan oppdatere dette selv, i verktøy de allerede bruker (klubben kjører på Google Workspace: Docs, Sheets, Gmail), mens nettsideansvarlig beholder kontroll over hva som faktisk publiseres – en «PR-review», men i et regneark.

## Mål

- Styremedlemmer kan legge til, endre og fjerne arrangementer og styremedlemmer i et delt Google-regneark, uten kode, GitHub eller nye innlogginger.
- Ingenting havner på nettsiden før en godkjenner har godkjent det.
- Endringer i noe som allerede er publisert påvirker ikke nettsiden før endringen er godkjent på nytt. Den publiserte versjonen ligger ute i mellomtiden.
- Godkjent innhold er live på nettsiden innen et par minutter, uten at noen rører koden.
- Full historikk og angre (Google Sheets' versjonshistorikk).
- Feil data kan ikke ødelegge nettsiden.

## Ikke-mål (nå)

- Nyheter/innlegg. Kommer senere, trolig på samme mønster.
- Andre data i `content.ts` (baner, sosiale lenker, navigasjon) og Norges Cup-siden (`src/lib/events/norges-cup-4.ts`). Disse blir i koden.
- Endringer i hvordan arrangementer og styret *vises* på nettsiden. Sidene skal se ut som i dag.
- Et eget admin-grensesnitt på nettsiden.

## Anti-mål (feil selv om det «virker»)

- Et halvferdig eller feilaktig arrangement dukker opp på nettsiden.
- En side krasjer eller blir tom fordi noen skrev feil i regnearket.
- Utkast eller ikke-godkjent innhold blir offentlig tilgjengelig (f.eks. via et publisert CSV-ark).
- Redaktører trenger GitHub, terminal eller teknisk kunnskap.

## Roller

- **Eier av regnearket**: `admin@stovnerfrisbee.no`. Apps Script-triggeren installeres av og kjører som denne kontoen.
- **Redaktører**: utvalgte styremedlemmer, gitt redigeringstilgang til regnearket. Noen bruker klubbens Workspace-konto, andre private Gmail-kontoer. Løsningen kan derfor **ikke** stole på å vite hvem som gjorde en endring (se «Godkjenning uten å kjenne redaktøren» under).
- **Godkjennere**: `admin@stovnerfrisbee.no` (Elias) og `td@stovnerfrisbee.no` (Henrik). Kun de kan godkjenne. Listen skal være enkel å endre (ett sted i skriptet + beskyttelsen i arket).

## Løsningen i korte trekk

1. **Regnearket** «Stovner Frisbee – nettsideinnhold» har to arbeidsfaner, *Arrangementer* og *Styret*, der redaktører jobber, og to beskyttede faner, *Publisert – arrangementer* og *Publisert – styret*, som bare skriptet (og godkjennerne) kan endre.
2. **Arbeidsfanene** har inputvalidering (datovelger, nedtrekkslister, lenker må starte med `https://` eller `/`), en *Status*-kolonne med formel som viser ✅ eller hva som mangler, og en beskyttet *Godkjent*-avkrysning som bare godkjennerne kan krysse av.
3. **Apps Script** (limes inn én gang av Elias via *Utvidelser → Apps Script*, med installerbar onEdit-trigger):
   - Når en godkjenner krysser av *Godkjent* på en gyldig rad: raden kopieres til tilsvarende *Publisert*-fane (oppdateres hvis den finnes fra før, matchet på rad-ID), og nettsiden bygges på nytt via en Vercel Deploy Hook.
   - Hvis raden ikke er gyldig (Status ≠ ✅): avkrysningen fjernes, og det vises en melding om hvorfor.
   - Når noen – også en godkjenner – endrer en godkjent rad: avkrysningen fjernes automatisk, raden markeres som «Endret – venter på godkjenning» (lagret i en skjult kolonne, siden en formel ikke kan vite det), og godkjennerne får e-post. Den publiserte versjonen er uendret til endringen godkjennes. Godkjennere krysser av på nytt når de er ferdige; da publiseres aldri en halvferdig endring, og det blir ikke en deploy per tastetrykk. *(Claudes valg.)*
   - Hver rad får en stabil, automatisk ID ved første redigering, slik at publiserte rader kan matches selv om rekkefølgen endres.

   **Godkjenning uten å kjenne redaktøren.** Siden noen redaktører bruker private Gmail-kontoer, får skriptet ikke alltid vite hvem som redigerte. Løsningen bygger derfor ikke på identitet, men på to ting:
   - *Beskyttede områder* (fungerer for alle kontotyper): bare godkjennerne kan endre Godkjent-kolonnen, ID-kolonnen, den skjulte kontrollkolonnen og Publisert-fanene. At Godkjent blir krysset av betyr dermed at en godkjenner gjorde det.
   - *Fingeravtrykk av innholdet*: når en rad godkjennes, lagrer skriptet en hash av radens innhold i en skjult, beskyttet kolonne. Ved hver endring sammenlignes hashen; avviker den, fjernes avkrysningen og raden markeres som endret. Det gjelder uansett hvem som endret.
   - Det som er live er alltid kopien i Publisert-fanen, tatt i det øyeblikket raden ble godkjent. Selv om en endring av en eller annen grunn ikke fanges opp av onEdit, kan den derfor ikke komme på nettsiden uten ny godkjenning. En tidsstyrt kontroll (f.eks. hver time) kan i tillegg rydde opp i avkrysninger som skulle vært fjernet.
   - Fjerning: redaktør krysser av *Fjern* på raden; når en godkjenner godkjenner, slettes raden fra *Publisert*-fanen. Å slette selve raden i arbeidsfanen fjerner den **ikke** fra nettsiden (det er bevisst, så et uhell ikke tar ned innhold).
   - Godkjennere varsles på e-post når nye rader eller endringer venter.
4. **Nettsidens bygg** leser kun *Publisert*-fanene via en privat Google service-konto (lesetilgang til arket og bildemappen), validerer radene på nytt, og skriver dem til JSON-filer som `content.ts` eksporterer som `events` og `boardMembers` med samme form som i dag. Sidene trenger derfor ingen endring.
5. **Bilder av styremedlemmer** ligger i en delt Drive-mappe. Arket har en kolonne med lenke til bildet. Bygget laster ned bildet via service-kontoen, komprimerer det (sharp finnes allerede i prosjektet) og legger det ut som statisk fil.

## Kolonner

### Arrangementer (arbeidsfane)

Speiler feltene i dagens `events`:

| Kolonne | Felt | Påkrevd | Merknad |
|---|---|---|---|
| ID | – | auto | Settes av skriptet |
| Tittel | `title` | ja | |
| Startdato | `startDate` | nei* | Datovelger |
| Sluttdato | `endDate` | nei* | Datovelger, ≥ startdato |
| Ukedag | `weekday` | nei | Nedtrekk (mandag–søndag), for ukentlige serier |
| Datotekst | `date` | nei | Hvis tom: genereres fra datoene (f.eks. «30.–31. mai 2026»). Fylles ut for gjentakende (f.eks. «Onsdager 29. apr – 17. jun») |
| Bane | `course` | nei | Nedtrekk med kjente baner + fritekst tillatt |
| Beskrivelse | `description` | ja | |
| Lenke | `link` | ja | `https://…` eller intern sti `/…` |
| Lenketekst | `linkText` | ja | Nedtrekk med vanlige verdier («Mer info på DGScene» osv.) + fritekst |
| Kategori | `category` | ja | Fritekst med forslag (dagens verdier er kombinasjoner som «Turnering, PDGA») |
| Resultatlenke | `resultsLink` | nei | |
| Fjern | – | nei | Avkrysning |
| Godkjent | – | – | Beskyttet, kun godkjennere |
| Status | – | formel | ✅ / «Mangler tittel» / «Sluttdato før startdato» / «Endret – venter på godkjenning» osv. |

\* Minst én av startdato, sluttdato eller ukedag+datotekst må finnes (som i dag, der f.eks. Torsdagsgolf bare har sluttdato og datotekst).

**Rekkefølge** *(Claudes valg)*: bygget sorterer arrangementer uten startdato først (ukentlige serier som Torsdagsgolf), deretter etter startdato. Det gir nøyaktig dagens rekkefølge, så ingen rekkefølge-kolonne trengs.

### Styret (arbeidsfane)

| Kolonne | Felt | Påkrevd |
|---|---|---|
| ID | – | auto |
| Rekkefølge | sortering | ja (tall) |
| Navn | `name` | ja |
| Rolle | `role` | ja (nedtrekk: Leder, Nestleder, Styremedlem, Varamedlem + fritekst) |
| E-post | `email` | nei (må være gyldig e-post hvis satt) |
| Bilde | `image` | ja (Drive-lenke). *(Claudes valg: påkrevd, så /om-klubben ikke trenger noen ny visning for manglende bilde. Status viser «Mangler bilde». Kan ikke bygget laste ned et publisert bilde, feiler bygget og forrige versjon blir stående.)* |
| Fjern / Godkjent / Status | som over | |

*Publisert*-fanene har de samme kolonnene (uten Godkjent/Status) pluss *Publisert av* og *Publisert tidspunkt*.

## Sikkerhetsnett

- **Historikk og angre**: Sheets' versjonshistorikk og redigeringshistorikk per celle. *Publisert*-fanene har også historikk, så en publisering kan rulles tilbake.
- **Ugyldig rad i Publisert** (skal ikke skje, men): bygget hopper over raden og logger en advarsel. Resten publiseres.
- **Arket utilgjengelig, kolonneoverskrifter endret, eller credentials mangler i produksjon**: bygget feiler med tydelig melding. Vercel beholder da forrige deploy, så nettsiden er uendret.
- **Lokal utvikling uten credentials**: bygget bruker en innsjekket snapshot av de publiserte dataene, så `npm run dev` og tester virker uten Google-tilgang.
- **Utkast er aldri offentlige**: arket deles ikke offentlig; bygget leser via service-konto.

## Engangsoppsett (manuelle steg)

Claude kan opprette arket, fanene, valideringen og fylle inn dagens data via Google Sheets-koblingen. Er koblingen ikke logget inn som `admin@stovnerfrisbee.no`, oppretter Elias et tomt ark i admin-kontoen og deler det med kontoen koblingen bruker, og Claude fyller det ut derfra. Følgende må gjøres manuelt (med steg-for-steg-instruks):

1. Opprette Google Cloud-prosjekt + service-konto, laste ned nøkkel, dele arket og bildemappen med service-kontoen (lesetilgang).
2. Legge service-kontonøkkel og ark-ID inn som miljøvariabler i Vercel.
3. Opprette Vercel Deploy Hook og legge URL-en inn i skriptets Script Properties.
4. Lime inn Apps Script, installere onEdit-triggeren og godta tillatelsene.
5. Sette beskyttede områder (Godkjent-kolonnene og Publisert-fanene) til godkjennerne – Claude gjør dette hvis koblingen tillater det, ellers manuelt.
6. Dele arket med redaktørene.

## Migrering

- Dagens `events` og `boardMembers` legges inn i både arbeidsfanene og *Publisert*-fanene, slik at nettsiden er identisk før og etter.
- Eksisterende styrebilder i `static/` lastes opp til Drive-mappen.
- Når bygget henter fra arket, fjernes de hardkodede listene fra `content.ts` (de andre eksportene blir).

## Overlatt til den som bygger

- Format og plassering av JSON-snapshot og byggeskript (f.eks. et `prebuild`-steg).
- Hvordan Datotekst genereres, så lenge det matcher dagens stil.
- Om flere godkjenninger på rad samles i én deploy (debounce) eller trigger hver sin.
- Detaljer i e-postvarsler.
- Testoppsett for validering og mapping (prosjektet bruker vitest).
