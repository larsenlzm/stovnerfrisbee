# Redigere arrangementer og styret i regnearket

Arrangementer og styret på nettsiden hentes fra Google-regnearket **Stovner Frisbee – nettsideinnhold**. Del 1 er for redaktører. Del 2 er for admin og beskriver oppsettet.

## Del 1: For redaktører

### Slik fungerer det

- Du skriver i fanene **Arrangementer** og **Styret**. Alt du skriver er et utkast, og ingen ser det på nettsiden.
- En godkjenner (admin eller TD) leser gjennom og krysser av **Godkjent**. Først da blir raden publisert.
- Etter godkjenning er endringen vanligvis på nettsiden i løpet av et par minutter.
- Fanene **Publisert – arrangementer** og **Publisert – styret** er det nettsiden leser. De er låst, så ikke prøv å skrive der.
- Ikke endre navnet på kolonneoverskriftene i rad 1. De er låst, og skriptet finner kolonnene på navnet.
- Du kan ikke krysse av Godkjent selv. Kolonnene ID, Godkjent, Publisering og Hash er låst for redaktører.

### Legge til et arrangement

1. Gå til fanen **Arrangementer** og skriv i første tomme rad. ID fylles ut av seg selv.
2. Fyll ut kolonnene under. Se på **Status**: står det `✅`, er raden klar.
3. Si fra til en godkjenner. De får også en e-post automatisk (høyst én per rad hvert 30. minutt).

| Kolonne | Påkrevd? | Slik fyller du ut |
|---|---|---|
| Tittel | Ja | Navnet på arrangementet |
| Startdato | Dato eller Datotekst | Velg fra datovelgeren (format `åååå-mm-dd`) |
| Sluttdato | Nei | Bare for flerdagers arrangement. Ikke før startdato. Tom Sluttdato betyr samme dag |
| Ukedag | Nei | Nedtrekk, mandag til søndag. Brukes for ukentlige arrangementer |
| Datotekst | Dato eller Startdato/Sluttdato | Fritekst som vises på siden, for eksempel «Hver tirsdag kl. 18». Tom: siden lager teksten fra datoene |
| Bane | Nei | Må være nøyaktig «Stovner Discgolfpark» eller «Forsheimer DiskGolfPark» (nedtrekk; annen tekst godtas, men gir ingen banestatus). Brukes til status på /banene og forsiden. For at en ukentlig liga skal vises som «spilles i dag», må Kategori inneholde «Ukentlig», og Ukedag, Startdato, Sluttdato og Bane må være satt |
| Beskrivelse | Ja | Kort tekst om arrangementet |
| Lenke | Ja | Må starte med `https://` eller `/` |
| Lenketekst | Ja | Teksten på knappen, for eksempel «Meld deg på» |
| Kategori | Ja | Nedtrekk: Ukentlig, Liga, Turnering, PDGA, DOUBLES. Du kan velge flere |
| Resultatlenke | Nei | Hvis satt: må starte med `https://` eller `/` |
| Fjern | Nei | Se «Fjerne noe» |

Minst en av Startdato, Sluttdato og Datotekst må være fylt ut.

### Legge til et styremedlem

Fanen **Styret**, første tomme rad.

| Kolonne | Påkrevd? | Slik fyller du ut |
|---|---|---|
| Rekkefølge | Ja | Et tall. Laveste tall vises først |
| Navn | Ja | Fullt navn |
| Rolle | Ja | Nedtrekk: Leder, Nestleder, Styremedlem, Varamedlem. Du kan skrive en annen rolle |
| E-post | Nei | Må se ut som `navn@domene.no` |
| Bilde | Ja | Delelenke til bildet i Google Drive, se under |
| Fjern | Nei | Se «Fjerne noe» |

**Bilder:** Last bildet opp i Drive-mappen **Nettside – styrebilder**. Høyreklikk bildet, velg **Del → Kopier lenke**, og lim lenken inn i Bilde-cellen. Du trenger ikke endre delingsinnstillingene på bildet.

### Endre noe

Skriv over cellen. Står raden allerede på nettsiden, vises den gamle versjonen helt til en godkjenner har krysset av Godkjent på nytt. Godkjent fjernes automatisk når du endrer en publisert rad, og godkjennerne får e-post.

### Fjerne noe

**Slett aldri rader.** Å slette en rad tar ikke bort noe fra nettsiden, og det som allerede er publisert blir stående. (Beskyttelsen i arket kan også hindre deg i å slette raden.) Legger du raden inn på nytt, får den ny ID og blir en ekstra oppføring, mens den gamle blir stående.

For å ta noe ned: kryss av **Fjern** på den opprinnelige raden, og be en godkjenner krysse av **Godkjent**. Etter bygget er det borte fra nettsiden. La raden stå i arket.

### Status

Status viser den første feilen i raden. Rett opp feilen, så skifter den til `✅`. Er raden helt tom, er Status tom.

| Status | Hva du må gjøre |
|---|---|
| `✅` | Raden er klar til godkjenning |
| `Mangler tittel` | Fyll ut Tittel |
| `Mangler dato` | Fyll ut Startdato, Sluttdato eller Datotekst |
| `Sluttdato før startdato` | Rett datoene |
| `Mangler beskrivelse` | Fyll ut Beskrivelse |
| `Mangler lenke` | Fyll ut Lenke |
| `Lenken må starte med https:// eller /` | Rett Lenke |
| `Mangler lenketekst` | Fyll ut Lenketekst |
| `Mangler kategori` | Velg Kategori |
| `Resultatlenken må starte med https:// eller /` | Rett Resultatlenke eller tøm den |
| `Mangler rekkefølge` | Skriv et tall i Rekkefølge |
| `Mangler navn` | Fyll ut Navn |
| `Mangler rolle` | Fyll ut Rolle |
| `Ugyldig e-post` | Rett E-post eller tøm den |
| `Mangler bilde` | Lim inn lenke i Bilde |
| `Bildet må være en Google Drive-lenke` | Bruk delelenken fra Drive |

### Publisering

Kolonnen Publisering fylles ut av arket og viser hvor raden står.

| Publisering | Betyr |
|---|---|
| `Venter på godkjenning` | Ny rad som ikke er publisert ennå |
| `Endret – venter på godkjenning` | Raden er endret etter godkjenning. Gammel versjon ligger fortsatt på nettsiden |
| `Publisert dd.mm.åååå tt:mm` | Godkjent og publisert. Nettsiden oppdateres vanligvis i løpet av et par minutter |
| `Publisert (migrert)` | Lagt inn fra den gamle nettsiden |
| `Fjernet fra nettsiden dd.mm.åååå` | Tatt ned |
| `Publisering feilet: …` | Noe gikk galt. Godkjenneren får forklaring i arket. Si fra til admin |

Når en godkjenner krysser av Godkjent på en rad som ikke er gyldig, fjernes krysset igjen, og det vises en melding: `Kan ikke godkjennes: …` med Status-teksten. Rett feilen først.

### Hvis noe ble feil: versjonshistorikk

Alle endringer lagres. Du kan gå tilbake i tid:

- En enkelt celle: høyreklikk cellen og velg **Vis redigeringslogg**. Der kan du se tidligere innhold og kopiere det tilbake for hånd. Husk at raden da må godkjennes på nytt.
- Hele arket (**Fil → Versjonshistorikk**) overlater du til admin. Å gjenopprette en hel versjon ruller også tilbake Publisert-fanene og Hash-kolonnen, og kan gjøre at godkjenninger og publisert innhold ikke lenger stemmer med hverandre.

## Del 2: Oppsett (admin)

Dette gjøres én gang. Arket eies av `admin@stovnerfrisbee.no`. Godkjennere er `admin@stovnerfrisbee.no` og `td@stovnerfrisbee.no`.

### 1. Google Cloud: tjenestekonto

Nettsiden leser det private arket med en tjenestekonto.

1. Logg inn på [console.cloud.google.com](https://console.cloud.google.com) som admin og opprett et prosjekt, for eksempel «Stovner Frisbee nettside».
2. **APIer og tjenester → Bibliotek**: aktiver **Google Sheets API** og **Google Drive API**.
3. **IAM og administrasjon → Tjenestekontoer → Opprett tjenestekonto**. Gi den et navn, ingen roller trengs.
4. Åpne tjenestekontoen → **Nøkler → Legg til nøkkel → Opprett ny nøkkel → JSON**. Filen lastes ned. Behandle den som et passord og ikke legg den i repoet.
5. Kopier e-postadressen til tjenestekontoen (`…@…iam.gserviceaccount.com`).

### 2. Del med tjenestekontoen

- Del regnearket med tjenestekontoens e-post som **Leser**.
- Del Drive-mappen **Nettside – styrebilder** med den samme e-posten som **Leser**.

### 3. Miljøvariabler

| Variabel | Verdi |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Hele innholdet i JSON-nøkkelen, på én linje. Lag den med `jq -c . nøkkel.json` |
| `CONTENT_SHEET_ID` | ID-en fra arkets URL: `docs.google.com/spreadsheets/d/<ID>/edit` |

- **Vercel**: Project → Settings → Environment Variables. Legg inn begge for alle miljøer (Production, Preview, Development).
- **Lokalt**: legg dem i `.env` (se `.env.example`). Uten dem brukes den innsjekkede kopien i `src/lib/data/sheet/`.

### 4. Vercel Deploy Hook

1. Vercel: Project → Settings → Git → **Deploy Hooks**. Opprett en hook for branchen `main` og kopier URL-en.
2. Apps Script (neste punkt): legg URL-en inn som Script Property `DEPLOY_HOOK_URL`.

Mangler eller feiler hooken, får godkjenneren en melding i arket, og nettsiden bygges ikke på nytt.

Hooken svarer OK så snart bygget er startet, også hvis bygget feiler etterpå (for eksempel fordi et bilde ligger utenfor den delte mappen). Sørg derfor for at Vercel sender e-post om mislykkede deployer til `admin@stovnerfrisbee.no` (Vercel: Account/Team → Settings → Notifications → Deployment failed). Årsaken står i build-loggen til den mislykkede deployen.

**Build Command** i Vercel (Project → Settings → Build and Deployment) må stå på standard, `npm run build`. Henting fra arket ligger i det kommandoet; overstyres det, hoppes henting fra arket over uten advarsel.

### 5. Apps Script

1. Åpne regnearket som eier → **Utvidelser → Apps Script**.
2. Lim inn hele `apps-script/Code.gs` (erstatt det som står der) og lagre.
3. **Prosjektinnstillinger → Skriptegenskaper**: legg til `DEPLOY_HOOK_URL` med URL-en fra forrige punkt.
4. Velg funksjonen `setup` og trykk **Kjør**. Godta tilgangene.

`setup()` lager triggerne (`onEditInstalled` ved redigering og `hourlyCheck` hver time), beskytter kolonnene og Publisert-fanene og skjuler Hash-kolonnen. Den kan kjøres på nytt uten skade.

`hourlyCheck` rydder opp i rader der godkjenningen ikke stemmer med innholdet.

### 6. Del arket og bildemappen

Del arket med godkjennerne (`td@stovnerfrisbee.no`; `admin@` er eier) og redaktørene som **Redigerer**. Godkjennerne må være delt med **før** du kjører `setup()`, ellers kan beskyttelsene feile.

Del også bildemappen **Nettside – styrebilder** med redaktørene og godkjennerne som **Redigerer**, slik at de kan laste opp bilder.

Redaktørene kan bruke private Gmail-kontoer. Godkjenning avhenger ikke av hvem som redigerer, bare av at kolonnene er beskyttet. Arket skal ikke deles offentlig.

### Bytte godkjennere

1. Del arket med den nye personen som **Redigerer** (og mappen med bilder). Gjør dette først.
2. Endre `CONFIG.approvers` øverst i `Code.gs` (og i `apps-script/Code.gs` i repoet).
3. Lim koden inn på nytt i Apps Script.
4. Kjør `setup()` på nytt, slik at beskyttelsene oppdateres.

Eier av arket har alltid tilgang til de beskyttede områdene.

### Når noe går galt

- **Bygget feiler på Vercel**: Vercel beholder forrige versjon, så nettsiden er trygg. Åpne build-loggen og les den norske feilmeldingen. Vanlige årsaker: miljøvariablene mangler, arket er ikke delt med tjenestekontoen, en kolonneoverskrift er endret, et bilde kan ikke lastes ned, eller en Publisert-fane har ingen gyldige rader.
- **Rader mangler på nettsiden**: Ugyldige rader hoppes over, og bygget skriver `Advarsel:` i loggen, for eksempel `Duplikat ID` eller `Ugyldig ID`. Rett raden og godkjenn på nytt.
- **Et publisert element mangler arbeidsrad** (raden ble slettet): slett raden med samme ID i den matchende fanen `Publisert – arrangementer` eller `Publisert – styret`. Start så nytt bygg: godkjenn en annen endring (det kaller deploy-hooken), eller trykk Redeploy på siste produksjonsdeploy i Vercel.
- **Prøv lokalt**: `npm run sheet:pull` (med `.env`) henter arket, og skriver advarsler og feil i terminalen. Resultatet havner i `src/lib/data/sheet/` og `static/styret/`. Ikke rediger disse filene for hånd, unntatt i nødsfall.
- **Teste godkjenningsflyten**: se sjekklisten i `apps-script/README.md`.
