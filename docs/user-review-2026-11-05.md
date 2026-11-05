# Brukerperspektiv-gjennomgang, 5. november 2026

Gjennomgang av stovnerfrisbee.no (`main`, uten banekart-grenen) med Playwright, sett fra de åtte besøksprofilene i `CLAUDE.md`. Alle sider på desktop, Banene på mobil, pluss sjekk av lenker og trykkflater. Skjermbilder ble slettet etter gjennomgangen.

## Sammendrag

Siden er ryddig og rask å lese på desktop og mobil. Den fungerer best for **Konkurrent** og **Klubbbygger**, og dårligst for **Planlegger**, **Nybegynner** og **Tilreisende**. Hovedgapet er praktisk informasjon for folk som ikke har spilt her før.

| Profil | Vurdering | Hovedfunn |
|---|---|---|
| 1. Nybegynner | Svak | Ingenting om hva discgolf er, hva man tar med, eller at man kan låne utstyr (nevnes bare under «Bli medlem»). Begge baner er «Vanskelig», uten hint om hvilken som passer best for nybegynnere. |
| 2. Fast spiller | Blandet | Gode banefakta, men ingen nyheter eller oppdateringer om layout, hull eller vedlikehold. |
| 3. Planlegger | Svak | Ingen informasjon om forhold eller stenging. Torsdagsreservasjonen står nederst på Banene. Turneringer som bruker banen er ikke flagget. |
| 4. Klubbbygger | God, ett gap | Tydelig medlemskap og styre. Ingen konkret vei til å melde seg på dugnad eller frivillig arbeid. Ikke alle styremedlemmer har e-post. |
| 5. Konkurrent | God | Oversiktlig arrangementsside med lenker til påmelding og resultater. Utenfor sesong vises bare Torsdagsgolf og en lang liste avsluttede. Ingen hint om når sesongen 2027 kommer. |
| 6. Forelder/ungdom | Blandet | Juniorpris står under «Bli medlem». Ingenting om aldersgrense, juniortilbud eller egnethet for barn. |
| 7. Sponsor/partner | God | Egen sponsorseksjon, org.nr. og adresse. Mangler tall på klubbens størrelse og en navngitt kontaktperson. |
| 8. Tilreisende | Svak | Ingen veibeskrivelse utover «Kart»-lenken (Google Maps). Ingen parkering eller kollektivinfo. At det ikke er toalett eller vann vises bare som en liten grå «✗». |

## Forslag, i prioritert rekkefølge

1. **«Ny til discgolf» / «Spill banen»**: hva discgolf er, hva man tar med, utlån av utstyr, hvor man starter og hvilken bane som er enklest. Hjelper profil 1, 6 og 8.
2. **Statuslinje øverst på Banene** for forhold, stengte dager og begrensninger (inkl. torsdagsreservasjonen og turneringsdager). Hjelper profil 3.
3. **Veibeskrivelse**: adresse, parkering og kollektiv for begge baner. Hjelper profil 1, 3 og 8.
4. **Nyheter/oppdateringer** om baneendringer. Hjelper profil 2 og 3.
5. **Konkret frivillig-vei** (hvem man kontakter om dugnad) under «Bli medlem» eller «Om klubben». Hjelper profil 4.
6. **Småfiks**:
   - Øye-ikonet på banekortene ser klikkbart ut, men gjør ingenting.
   - Footer-lenker og e-post er 16–20 px høye som trykkflater på mobil.
   - «Se resultater»- og «Mer info»-lenker på arrangementskortene er små.
   - Vurder en sesongtekst på Arrangementer når ingenting er planlagt.

## Ikke dekket

- Mobilvisning er bare sjekket visuelt på Banene. Forside, Arrangementer og «Bli medlem» er sjekket på desktop og via innhold.
- Banekart-grenen (`banekart`) er ikke med.
- Selve nettsiden er ikke endret.

## Føringer for oppfølging

Eierens prioritet er at siden forblir ren, pen og lett å navigere. Forslagene over skal løses uten å fylle opp forsiden eller navigasjonen. Se `docs/design-principles.md`.
