# Redigere arrangementer og styret i regnearket

Arrangementer og styret på nettsiden hentes fra Google-regnearket **Stovner Frisbee – nettsideinnhold**. Del 1 er for redaktører. Del 2 er for admin og beskriver oppsettet.

## Del 1: For redaktører

### Slik fungerer det

- Du skriver i fanene **Arrangementer** og **Styret**. Alt du skriver er et utkast, og ingen ser det på nettsiden.
- En godkjenner (admin eller TD) leser gjennom og krysser av **Godkjent**. Først da blir raden publisert.
- Etter godkjenning er endringen vanligvis på nettsiden i løpet av et par minutter.
- Fanene **Publisert – arrangementer** og **Publisert – styret** er det nettsiden leser. De er låst, så ikke prøv å skrive der.
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
| Datotekst | Dato eller Startdato | Fritekst som vises på siden, for eksempel «Hver tirsdag kl. 18». Tom: siden lager teksten fra datoene |
| Bane | Nei | For eksempel «Stovner» |
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

**Å slette raden tar ikke bort noe fra nettsiden.** Det som allerede er publisert blir stående.

For å ta noe ned: kryss av **Fjern** på raden, og be en godkjenner krysse av **Godkjent**. Etter bygget er det borte fra nettsiden. Raden kan stå i arket, eller du kan slette den etterpå.

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

- Hele arket: **Fil → Versjonshistorikk → Se versjonshistorikk**.
- En enkelt celle: høyreklikk cellen og velg **Vis redigeringshistorikk**.

Rader kan også gjenopprettes fra versjonshistorikken. Husk at en gjenopprettet rad må godkjennes på nytt.

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
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Hele innholdet i JSON-nøkkelen, på én linje |
| `CONTENT_SHEET_ID` | ID-en fra arkets URL: `docs.google.com/spreadsheets/d/<ID>/edit` |

- **Vercel**: Project → Settings → Environment Variables. Legg inn begge for alle miljøer (Production, Preview, Development).
- **Lokalt**: legg dem i `.env` (se `.env.example`). Uten dem brukes den innsjekkede kopien i `src/lib/data/sheet/`.

### 4. Vercel Deploy Hook

1. Vercel: Project → Settings → Git → **Deploy Hooks**. Opprett en hook for branchen `main` og kopier URL-en.
2. Apps Script (neste punkt): legg URL-en inn som Script Property `DEPLOY_HOOK_URL`.

Mangler eller feiler hooken, får godkjenneren en melding i arket, og nettsiden bygges ikke på nytt.

### 5. Apps Script

1. Åpne regnearket som eier → **Utvidelser → Apps Script**.
2. Lim inn hele `apps-script/Code.gs` (erstatt det som står der) og lagre.
3. **Prosjektinnstillinger → Skriptegenskaper**: legg til `DEPLOY_HOOK_URL` med URL-en fra forrige punkt.
4. Velg funksjonen `setup` og trykk **Kjør**. Godta tilgangene.

`setup()` lager triggerne (`onEditInstalled` ved redigering og `hourlyCheck` hver time), beskytter kolonnene og Publisert-fanene og skjuler Hash-kolonnen. Den kan kjøres på nytt uten skade.

`hourlyCheck` rydder opp i rader der godkjenningen ikke stemmer med innholdet.

### 6. Del arket med redaktørene

Del arket med redaktørene som **Redigerer**. Det går fint med private Gmail-kontoer. Godkjenning avhenger ikke av hvem som redigerer, bare av at kolonnene er beskyttet. Arket skal ikke deles offentlig.

### Bytte godkjennere

1. Endre `CONFIG.approvers` øverst i `Code.gs` (og i `apps-script/Code.gs` i repoet).
2. Lim koden inn på nytt i Apps Script.
3. Kjør `setup()` på nytt, slik at beskyttelsene oppdateres.

Eier av arket har alltid tilgang til de beskyttede områdene.

### Når noe går galt

- **Bygget feiler på Vercel**: Vercel beholder forrige versjon, så nettsiden er trygg. Åpne build-loggen og les den norske feilmeldingen. Vanlige årsaker: miljøvariablene mangler, arket er ikke delt med tjenestekontoen, en kolonneoverskrift er endret, et bilde kan ikke lastes ned, eller en Publisert-fane har ingen gyldige rader.
- **Rader mangler på nettsiden**: Ugyldige rader hoppes over, og bygget skriver `Advarsel:` i loggen, for eksempel `Duplikat ID` eller `Ugyldig ID`. Rett raden og godkjenn på nytt.
- **Prøv lokalt**: `npm run sheet:pull` (med `.env`) henter arket, og skriver advarsler og feil i terminalen. Resultatet havner i `src/lib/data/sheet/` og `static/styret/`. Ikke rediger disse filene for hånd, unntatt i nødsfall.
- **Teste godkjenningsflyten**: se sjekklisten i `apps-script/README.md`.
