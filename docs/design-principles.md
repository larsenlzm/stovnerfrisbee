# Designprinsipper

Siden skal være ren, pen og enkel å navigere i. Design går foran nye funksjoner og mer innhold. Er du i tvil, la det være.

Disse reglene leses før enhver endring i UI, layout eller innhold, og gjelder alle som endrer siden (også Claude).

## Referanse

[diskgolf.no](https://diskgolf.no/) (Langevåg IL) er eierens referanse for hvordan menyen og forsiden skal *føles*: rolig, luftig og med ett tydelig valg om gangen. Vi låner prinsippene, ikke utseendet. Vi beholder vår egen grønne og oransje palett, vår skrift og våre kort.

## Meny

- Samme oppsett alltid: lav, tynn rad med små, luftige menyvalg og god plass mellom dem.
- **Én fylt knapp**: «Bli medlem». Alt annet er ren tekst eller et lite ikon. Aldri en andre fylt knapp i menyen.
- Mobil: toppfeltet viser bare logo og hamburger. Ingen knapp ved siden av hamburgeren.
- Mobilmenyen er en enkel liste med tynne skillelinjer, god luft mellom linjene og «Bli medlem» som eneste fylte knapp nederst.
- Antall menyvalg styres av at alt får plass på én rad på desktop med romslig avstand. Nye menyvalg krever godkjenning fra eier.

## Forsiden

- Et **innrammet bilde**, ikke et fullbredde banner med tekst oppå. Teksten ligger under bildet. Ett bilde for nå.
- Under bildet: én overskrift, én kort setning og maks to knapper («Bli medlem» og «Se banene»).
- Videre nedover: ett bånd per idé, med lik avstand mellom båndene og vekslende bakgrunnsnyanse.
- Nytt innhold får ikke nye fullbredde-blokker på forsiden. Det får en egen underside, nådd via et bildekort, eller et lite kompakt element.

## Dette gjør vi ikke (eierens valg)

- **Ingen tallstripe** («grunnlagt 1985, 2 baner, 18 hull …»). Eier synes det virker malaktig.
- **Ingen karusell** til å begynne med. Kan vurderes senere når vi har gode bilder.

## Innhold

- Kort tekst, én idé per seksjon. Besøkende skal forstå poenget på noen sekunder.
- Lengre tekst legges bak en «Les mer»-lenke eller en sammenleggbar seksjon.
- Tekst på siden er på norsk (bokmål).

## Visuelt

- Bruk bare fargene og skriften som allerede ligger som tema i `src/app.css`. Ingen nye farger, skrifter eller enkeltstående stiler.
- Alt skal fungere i både lyst og mørkt tema.
- Én fylt knapp per seksjon. Resten er tekstlenker eller omrisset.
- Lik vertikal avstand mellom seksjoner. Ikke press inn ting for å spare plass.

## Prosess for hver endring

1. Sjekk endringen mot reglene over og skriv én linje om hvordan den holder seg innenfor dem.
2. Bryter den en regel, si det og spør eier før du bygger.
3. Større endringer: lag først en skisse eller mockup og få den godkjent.
4. Etter endringen: se forsiden og den endrede siden på desktop og mobil med Playwright. Si fra hvis siden ble travlere enn før.
5. Slett skjermbildene etterpå.

## Beslutningslogg

| Dato | Beslutning |
|---|---|
| 2026-11-05 | diskgolf.no er referanse for meny og forside. |
| 2026-11-05 | Ingen tallstripe. |
| 2026-11-05 | Ingen karusell til å begynne med, ett innrammet bilde. |
| 2026-11-05 | Menyregelen handler om stil og luft, ikke et fast tak på fem valg. |
| 2026-11-09 | Arrangementssider på egne subdomener (først nc.stovnerfrisbee.no) har eget uttrykk: vimpler, stor tittel, tekst over bildet, logo som arrangør. Gjelder bare disse sidene. |
