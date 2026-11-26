# For medlemmer: design

## Hvorfor
Medlemmer vet ikke hva klubben tilbyr, og derfor spør de heller ikke om det. Det som finnes i dag (reisestøtte, utlån av utstyr, rabatt, klubbtur og klubbmesterskap, årsmøtet) står bare som korte punkter på «Bli medlem». Den siden er laget for dem som ikke er medlem ennå.

## Mål
- Én side, `/for-medlemmer`, som viser alt klubben tilbyr medlemmene og hvordan hver ting brukes.
- Siden når medlemmene fordi lenken deles der de allerede er, ikke fordi de finner den selv.

## Ikke mål
- Innlogging eller skjult innhold. Siden er åpen, og det står ingenting hemmelig der, for eksempel rabattkoder.
- Nytt menyvalg.

## Det som ikke må skje
- En lang og travel side. Den skal følge designprinsippene: kort tekst, én idé per seksjon og ingen bokser eller kort for ordningene.

## Måter vi vurderte
- **A. Egen side lenket fra flere steder (valgt).** Ingen menyendring. Den virker bare hvis styret deler lenken.
- B. Nytt menyvalg «For medlemmer». Mer synlig, men travlere meny, og den når ikke medlemmer som ikke besøker siden.
- C. «Bli medlem» blir «Medlemskap» for både nye og eksisterende medlemmer. Ingen ny side, men to lesere på én lang side.

Eier valgte A.

## Siden
- `PageHeader` uten bilde: eyebrow «Medlemskap», tittel «For medlemmer», undertittel «Dette får du som medlem av Stovner Frisbeeklubb».
- Seksjonene er overskrift og tekst, venstrejustert med header (`max-w-6xl`, innhold `max-w-3xl`). Hver seksjon har en `id` som kan lenkes til direkte.
  1. **Reisestøtte** (`#reisestotte`): formål og finansiering i én setning. Hver av de tre ordningene får et kort avsnitt med en fet innledning og beløpet i teksten, for eksempel «**Første norgescup eller NM.** Opptil 1 000 kr til påmelding …». Deretter tre linjer om hvordan man søker, og en tekstlenke til `styret@stovnerfrisbee.no`.
  2. **Lån utstyr**: hva klubben har og hvem man spør.
  3. **Rabatt på utstyr**: wearediscgolf og hvordan man får rabatten.
  4. **Klubbtur og klubbmesterskap**: hva det er og hvor det kunngjøres.
  5. **Årsmøtet**: stemmerett, når det er og hvor innkallingen kommer.
  6. Avslutning: «Spørsmål? Send e-post til styret@stovnerfrisbee.no».
- Ingen fylt knapp. Bare tekstlenker.

## Veier inn
- «Bli medlem» får en tekstlinje øverst: «Allerede medlem? Se hva klubben tilbyr →». Punktet om reisestøtte lenker til `/for-medlemmer#reisestotte`.
- Footeren får lenken «For medlemmer».
- `/reisestotte` og den gamle PDF-adressen sender med 301 til `/for-medlemmer#reisestotte`. Siden `src/routes/reisestotte` slettes.
- `sitemap.xml`: `/reisestotte` byttes med `/for-medlemmer`.
- Utenfor koden, som styret må gjøre: legge lenken i velkomstmeldingen i Spond og sende en påminnelse før hver sesong.

## Innhold (fra eier)
- **Lån utstyr:** klubben har blant annet verktøy, stoler, telt og techdisc. Spør noen i styret (lenke til `/om-klubben#styret`) eller send e-post til styret@stovnerfrisbee.no.
- **Rabatt:** si at du er medlem i Stovner Frisbeeklubb ved kassen i den fysiske butikken til wearediscgolf. Rabattens størrelse oppgis ikke.
- **Klubbtur og klubbmesterskap:** kunngjøres i Spond.
- **Årsmøtet:** holdes i februar, og innkallingen kommer i desember.

Styret-seksjonen på «Om klubben» får `id="styret"` så den kan lenkes til.

## Overlatt til den som bygger
- Den nøyaktige ordlyden, innenfor reglene over. Eier godkjenner teksten.
- Om `PageHeader`-endringen (valgfritt bilde) beholdes. Den trengs fortsatt.
