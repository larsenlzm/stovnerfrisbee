# Apps Script: godkjenning av nettsideinnhold

`Code.gs` er Apps Script-koden som ligger i regnearket «Stovner Frisbee – nettsideinnhold». Den er ikke en del av nettsidebygget; filen ligger her for versjonskontroll.

Skriptet kopierer godkjente rader fra arbeidsfanene (`Arrangementer`, `Styret`) til de beskyttede fanene `Publisert – arrangementer` og `Publisert – styret`, som er det eneste nettsiden leser. Det setter ID på nye rader, varsler godkjennerne på e-post når noe venter, fjerner godkjenningen når en godkjent rad endres, og starter et nytt bygg via deploy-hooken.

## Installering

1. Åpne regnearket som eier (`admin@stovnerfrisbee.no`) → **Utvidelser → Apps Script**.
2. Lim inn hele innholdet i `Code.gs` (erstatt det som står der) og lagre.
3. **Prosjektinnstillinger → Skriptegenskaper**: legg til `DEPLOY_HOOK_URL` med Vercel-deploy-hooken.
4. Velg funksjonen `setup` og trykk **Kjør** én gang. Godta tilgangene. `setup()` lager triggerne (`onEditInstalled` ved redigering, `hourlyCheck` hver time), setter beskyttelser og skjuler Hash-kolonnen. Den kan kjøres på nytt; gamle triggere og egne beskyttelser byttes ut.

Når `Code.gs` endres her: lim inn på nytt i Apps Script. `setup()` trenger bare kjøres igjen hvis kolonner eller faner er endret.

## Manuell testsjekkliste (Task 5)

Kjør i arket etter `setup()`. Bruk en testrad, og rydd opp etterpå.

| # | Oppførsel | Sjekk |
|---|---|---|
| 0 | `setup()` | Triggerne `onEditInstalled` og `hourlyCheck` finnes (Apps Script → Triggere). ID, Godkjent, Publisering og Hash i begge arbeidsfaner og begge Publisert-faner er beskyttet med kun godkjennere + eier, og det samme gjelder overskriftsraden (rad 1) i begge arbeidsfaner. Hash-kolonnen er skjult. |
| 1 | Rad med innhold men uten ID | Skriv en tittel i en ny rad i `Arrangementer` → ID fylles med 8 tegn. Samme i `Styret` med navn. |
| 2 | Godkjent, Status ≠ `✅` | Kryss av Godkjent på en ufullstendig rad → krysset fjernes, toast «Kan ikke godkjennes: Mangler …». Publisert-fanen er uendret. |
| 3 | Godkjent, Status = `✅`, Fjern ikke krysset | Kryss av Godkjent på en gyldig rad → raden finnes i Publisert-fanen (kolonnene i riktig rekkefølge, `Publisert av` = e-post eller `ukjent`, `Publisert tidspunkt` = nå), Publisering = `Publisert dd.mm.yyyy HH:mm`, Hash er fylt, nettsiden bygges (eller toast om manglende/feilende deploy-hook). Godkjenn samme rad på nytt etter en endring → raden oppdateres, ikke dupliseres. |
| 4 | Godkjent, Fjern krysset | Kryss av Fjern (→ «Endret – venter på godkjenning»), så Godkjent → raden er slettet fra Publisert-fanen, Publisering = `Fjernet fra nettsiden dd.mm.yyyy`, deploy-hook kalt. |
| 5 | Innhold endret på publisert rad | Endre tittelen på en publisert rad → Godkjent fjernes, Publisering = `Endret – venter på godkjenning`, godkjennerne får e-post. Publisert-fanen har fortsatt gammel versjon. Endre igjen innen 30 min → ingen ny e-post. |
| 6 | Innhold endret, aldri publisert | Fyll ut en ny rad → Publisering = `Venter på godkjenning`, godkjennerne får én e-post (ikke én per celle). |
| 7 | Flerradsliming | Lim inn to rader innhold samtidig → begge får ID og «Venter på godkjenning». Lim inn avkrysset Godkjent i to gyldige rader → begge publiseres, deploy-hook kalles én gang. |
| 8 | Godkjenner fjerner kryss manuelt | Fjern krysset i Godkjent på en publisert rad → ingenting skjer; raden står fortsatt i Publisert-fanen. |
| 9 | `hourlyCheck` | Tøm Hash-cellen på en godkjent rad som står i Publisert-fanen og kjør `hourlyCheck` → hash lagres, Godkjent står. Endre Hash-cellen til noe annet og kjør igjen → som rad 5. Simuler en godkjenning som feilet: slett en godkjent rad fra Publisert-fanen for hånd, tøm Hash-cellen (vis kolonnen midlertidig) og kjør `hourlyCheck` → Godkjent fjernes, Publisering = `Venter på godkjenning`. |
| 10 | Redaktør uten godkjennerrettighet | Som redaktør: forsøk å krysse av Godkjent eller redigere en Publisert-fane → blokkert av beskyttelsen. |
| 11 | Publisering feiler | Gi en kolonne i Publisert-fanen et navn som ikke finnes i arbeidsfanen (f.eks. `Beskrivelse` → `Beskrivelse2`), og kryss av Godkjent på en gyldig rad → krysset fjernes, Publisering = `Publisering feilet: kolonnen «Beskrivelse2» mangler i arbeidsfanen`, toast, ingen rad i Publisert-fanen. Rett navnet tilbake etterpå. |
