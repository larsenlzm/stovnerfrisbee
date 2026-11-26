/**
 * Godkjenning av nettsideinnhold i regnearket «Stovner Frisbee – nettsideinnhold».
 *
 * Redaktører skriver i arbeidsfanene (Arrangementer, Styret). Godkjennere krysser av
 * «Godkjent», og skriptet kopierer raden til den beskyttede Publisert-fanen, som er det
 * eneste nettsiden leser. Godkjenning bygger aldri på hvem som redigerte (noen bruker
 * private Gmail-kontoer): den sikres av beskyttede områder + en hash av innholdet.
 *
 * Kolonner slås opp på overskriftsnavn i rad 1. Innholdskolonner = alt mellom «ID» og
 * «Fjern» (begge eksklusive).
 *
 * Merk: at en godkjenner manuelt fjerner krysset i «Godkjent» gjør ingenting med versjonen
 * på nettsiden. For å ta noe ned: kryss av «Fjern» og deretter «Godkjent».
 *
 * Kjør setup() én gang manuelt som eier. Script Property DEPLOY_HOOK_URL settes manuelt.
 */

var CONFIG = {
  approvers: ['admin@stovnerfrisbee.no', 'td@stovnerfrisbee.no'],
  tabs: {
    'Arrangementer': 'Publisert – arrangementer',
    'Styret': 'Publisert – styret'
  }
};

var OK_STATUS = '✅';
var HASH_SEPARATOR = '␟';
var NOTIFY_SECONDS = 30 * 60;
var PROTECTION_PREFIX = 'Godkjenning: ';
var LOCK_TIMEOUT_MS = 30000;

// ---------------------------------------------------------------------------
// Oppsett
// ---------------------------------------------------------------------------

function setup() {
  var ss = SpreadsheetApp.getActive();

  ScriptApp.getProjectTriggers().forEach(function (t) { ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('onEditInstalled').forSpreadsheet(ss).onEdit().create();
  ScriptApp.newTrigger('hourlyCheck').timeBased().everyHours(1).create();

  var editors = protectionEditors_(ss);

  Object.keys(CONFIG.tabs).forEach(function (workName) {
    var work = getSheetOrThrow_(ss, workName);
    var pubName = CONFIG.tabs[workName];
    var pub = getSheetOrThrow_(ss, pubName);

    removeOwnProtections_(work);
    removeOwnProtections_(pub);

    var cols = getColumns_(work);
    [['ID', cols.id], ['Godkjent', cols.godkjent], ['Publisering', cols.publisering], ['Hash', cols.hash]]
      .forEach(function (pair) {
        var letter = columnLetter_(pair[1]);
        var protection = work.getRange(letter + ':' + letter).protect()
          .setDescription(PROTECTION_PREFIX + workName + ' / ' + pair[0]);
        restrictEditors_(protection, editors);
      });

    // Overskriftsraden: en omdøpt kolonne ville ellers gjøre at feltet ikke kan publiseres.
    var headerProtection = work.getRange('1:1').protect()
      .setDescription(PROTECTION_PREFIX + workName + ' / overskrifter');
    restrictEditors_(headerProtection, editors);

    var sheetProtection = pub.protect().setDescription(PROTECTION_PREFIX + pubName);
    restrictEditors_(sheetProtection, editors);

    work.hideColumns(cols.hash);
  });

  hourlyCheck();
}

function protectionEditors_(ss) {
  var list = CONFIG.approvers.slice();
  var owner = ss.getOwner();
  if (owner && owner.getEmail() && list.indexOf(owner.getEmail()) === -1) list.push(owner.getEmail());
  return list;
}

function restrictEditors_(protection, editors) {
  // Mønster fra Google-dokumentasjonen: sørg for at den som kjører beholder tilgang,
  // fjern alle andre, og legg så til de tillatte.
  protection.addEditor(Session.getEffectiveUser());
  protection.removeEditors(protection.getEditors());
  if (protection.canDomainEdit()) protection.setDomainEdit(false);
  protection.addEditors(editors);
}

function removeOwnProtections_(sheet) {
  var types = [SpreadsheetApp.ProtectionType.RANGE, SpreadsheetApp.ProtectionType.SHEET];
  types.forEach(function (type) {
    sheet.getProtections(type).forEach(function (p) {
      if (String(p.getDescription()).indexOf(PROTECTION_PREFIX) === 0 && p.canEdit()) p.remove();
    });
  });
}

// ---------------------------------------------------------------------------
// Redigering
// ---------------------------------------------------------------------------

function onEditInstalled(e) {
  if (!e || !e.range) return;
  var range = e.range;
  var sheet = range.getSheet();
  var tabName = sheet.getName();
  if (!CONFIG.tabs.hasOwnProperty(tabName)) return;

  var firstRow = Math.max(range.getRow(), 2);
  var lastRow = range.getLastRow();
  if (lastRow < firstRow) return;

  var ss = SpreadsheetApp.getActive();
  var cols;
  try {
    cols = getColumns_(sheet);
  } catch (err) {
    // Godkjent kan ikke fjernes uten kolonnene; hourlyCheck rydder opp når arket er rettet.
    ss.toast('Publisering feilet: ' + err.message, tabName, 15);
    return;
  }
  var editedFrom = range.getColumn();
  var editedTo = range.getLastColumn();
  var touches = function (col) { return col >= editedFrom && col <= editedTo; };

  var godkjentEdited = touches(cols.godkjent);
  var contentEdited = touches(cols.fjern) || cols.content.some(touches);
  // Redigeringer kun i ID, Status, Publisering eller Hash ignoreres.
  if (!godkjentEdited && !contentEdited) return;

  SpreadsheetApp.flush(); // sørg for at Status-formelen er regnet ut på nytt
  // Settes til true så snart en Publisert-fane faktisk er endret, også om noe feiler etterpå.
  var state = { deployNeeded: false };

  for (var row = firstRow; row <= lastRow; row++) {
    var values = readRow_(sheet, row);
    var hasContent = hasContent_(values, cols);
    // Helt tom rad som aldri er godkjent: ingenting å gjøre.
    if (!hasContent && !cellString_(values, cols.hash)) continue;

    if (hasContent && !cellString_(values, cols.id)) {
      var newId = Utilities.getUuid().slice(0, 8);
      sheet.getRange(row, cols.id).setValue(newId);
      values[cols.id - 1] = newId;
    }

    // Bare en avkrysning (TRUE) i Godkjent er en godkjenning. Et manuelt fjernet kryss
    // gjør ingenting med versjonen på nettsiden.
    if (godkjentEdited && values[cols.godkjent - 1] === true) {
      try {
        approveRow_(ss, sheet, row, values, cols, state);
      } catch (err) {
        approvalFailed_(ss, sheet, row, cols, err);
      }
    } else if (contentEdited) {
      try {
        contentChanged_(ss, sheet, row, values, cols);
      } catch (err) {
        ss.toast('Feil ved behandling av rad ' + row + ': ' + err.message, tabName, 15);
      }
    }
  }

  if (state.deployNeeded) callDeployHook_(ss);
}

/**
 * En godkjenning som feiler skal ikke se vellykket ut: fjern krysset slik at raden
 * ikke senere tas for å være godkjent (se hourlyCheck), og forklar hvorfor.
 */
function approvalFailed_(ss, sheet, row, cols, err) {
  var reason = err && err.message ? err.message : String(err);
  try {
    sheet.getRange(row, cols.godkjent).setValue(false);
    sheet.getRange(row, cols.publisering).setValue('Publisering feilet: ' + reason);
  } catch (ignored) {
    // Kan ikke skrive til arket; toasten under er alt vi kan gjøre.
  }
  ss.toast('Publisering feilet: ' + reason, sheet.getName() + ', rad ' + row, 15);
}

/** Setter state.deployNeeded = true når Publisert-fanen er endret. Kaster ved feil. */
function approveRow_(ss, sheet, row, values, cols, state) {
  var tabName = sheet.getName();
  var id = cellString_(values, cols.id);
  var removing = values[cols.fjern - 1] === true;

  // Fjerning tillates selv om Status ikke er ✅ (en rad som er gjort ugyldig skal kunne tas ned).
  if (!removing) {
    var status = cellString_(values, cols.status);
    if (status !== OK_STATUS) {
      sheet.getRange(row, cols.godkjent).setValue(false);
      ss.toast('Kan ikke godkjennes: ' + (status || 'Status mangler'), tabName + ', rad ' + row, 10);
      return;
    }
  }

  var pub = getSheetOrThrow_(ss, CONFIG.tabs[tabName]);
  var tz = ss.getSpreadsheetTimeZone();
  var now = new Date();

  withLock_(function () {
    if (removing) {
      deletePublished_(pub, id);
    } else {
      upsertPublished_(pub, id, values, cols, now);
    }
  });
  state.deployNeeded = true;

  var publisering = removing
    ? 'Fjernet fra nettsiden ' + Utilities.formatDate(now, tz, 'dd.MM.yyyy')
    : 'Publisert ' + Utilities.formatDate(now, tz, 'dd.MM.yyyy HH:mm');
  sheet.getRange(row, cols.hash).setValue(computeHash_(values, cols));
  sheet.getRange(row, cols.publisering).setValue(publisering);
  ss.toast(publisering + ': ' + rowLabel_(values, cols), tabName, 5);
}

function contentChanged_(ss, sheet, row, values, cols) {
  var stored = cellString_(values, cols.hash);
  if (stored) {
    if (stored === computeHash_(values, cols)) return; // innholdet er som godkjent
    markChanged_(ss, sheet, row, values, cols);
  } else {
    sheet.getRange(row, cols.publisering).setValue('Venter på godkjenning');
    notifyApprovers_(ss, sheet, row, values, cols);
  }
}

function markChanged_(ss, sheet, row, values, cols) {
  sheet.getRange(row, cols.godkjent).setValue(false);
  sheet.getRange(row, cols.publisering).setValue('Endret – venter på godkjenning');
  notifyApprovers_(ss, sheet, row, values, cols);
}

// ---------------------------------------------------------------------------
// Publisert-fanene
// ---------------------------------------------------------------------------

function upsertPublished_(pub, id, values, cols, now) {
  var pubHeaders = readHeaders_(pub);
  var idCol = pubHeaders.indexOf('ID') + 1;
  if (!idCol) throw new Error('Fant ikke kolonnen «ID» i ' + pub.getName());

  var email = '';
  try { email = Session.getActiveUser().getEmail(); } catch (err) { email = ''; }

  // Alle Publisert-kolonner må finnes i arbeidsfanen; ellers ville feltet publiseres tomt.
  var missing = pubHeaders.filter(function (name) {
    return name && name !== 'Publisert av' && name !== 'Publisert tidspunkt' && !cols.byName[name];
  });
  if (missing.length) {
    throw new Error('kolonnen ' + missing.map(function (n) { return '«' + n + '»'; }).join(', ') +
      ' mangler i arbeidsfanen');
  }

  var out = pubHeaders.map(function (name) {
    if (name === 'Publisert av') return email || 'ukjent';
    if (name === 'Publisert tidspunkt') return now;
    return name ? values[cols.byName[name] - 1] : '';
  });

  var targetRow = findPublishedRow_(pub, idCol, id);
  if (!targetRow) targetRow = Math.max(pub.getLastRow(), 1) + 1;
  pub.getRange(targetRow, 1, 1, out.length).setValues([out]);
}

function deletePublished_(pub, id) {
  var idCol = readHeaders_(pub).indexOf('ID') + 1;
  if (!idCol) throw new Error('Fant ikke kolonnen «ID» i ' + pub.getName());
  // Slett nedenfra slik at radnumrene ikke forskyves.
  var last = pub.getLastRow();
  if (last < 2) return;
  var ids = pub.getRange(2, idCol, last - 1, 1).getValues();
  for (var i = ids.length - 1; i >= 0; i--) {
    if (String(ids[i][0]) === id) pub.deleteRow(i + 2);
  }
}

function findPublishedRow_(pub, idCol, id) {
  var last = pub.getLastRow();
  if (last < 2) return 0;
  var ids = pub.getRange(2, idCol, last - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === id) return i + 2;
  }
  return 0;
}

/** Sett med ID-ene i en Publisert-fane. */
function readPublishedIds_(pub) {
  var idCol = readHeaders_(pub).indexOf('ID') + 1;
  if (!idCol) throw new Error('Fant ikke kolonnen «ID» i ' + pub.getName());
  var ids = {};
  var last = pub.getLastRow();
  if (last < 2) return ids;
  pub.getRange(2, idCol, last - 1, 1).getValues().forEach(function (r) {
    var id = String(r[0]).trim();
    if (id) ids[id] = true;
  });
  return ids;
}

function withLock_(fn) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(LOCK_TIMEOUT_MS)) throw new Error('arket var opptatt, prøv igjen');
  try {
    fn();
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
}

// ---------------------------------------------------------------------------
// Timesjekk
// ---------------------------------------------------------------------------

function hourlyCheck() {
  var ss = SpreadsheetApp.getActive();
  var errors = [];
  Object.keys(CONFIG.tabs).forEach(function (tabName) {
    try {
      hourlyCheckTab_(ss, tabName);
    } catch (err) {
      errors.push(tabName + ': ' + err.message);
    }
  });
  if (errors.length) throw new Error('hourlyCheck feilet: ' + errors.join('; '));
}

function hourlyCheckTab_(ss, tabName) {
  var sheet = getSheetOrThrow_(ss, tabName);
  var last = sheet.getLastRow();
  if (last < 2) return;
  var cols = getColumns_(sheet);
  var publishedIds = readPublishedIds_(getSheetOrThrow_(ss, CONFIG.tabs[tabName]));
  var data = sheet.getRange(2, 1, last - 1, sheet.getLastColumn()).getValues();
  data.forEach(function (values, i) {
    if (values[cols.godkjent - 1] !== true) return;
    var row = i + 2;
    var hash = computeHash_(values, cols);
    var stored = cellString_(values, cols.hash);
    if (!stored) {
      // Avkrysset uten hash: enten en migrert rad (står i Publisert-fanen, eller er fjernet
      // med Fjern), eller en godkjenning som feilet underveis. Bare det første godtas.
      var id = cellString_(values, cols.id);
      var removed = values[cols.fjern - 1] === true;
      var consistent = removed ? !publishedIds[id] : (id && publishedIds[id]);
      if (consistent) {
        sheet.getRange(row, cols.hash).setValue(hash);
      } else {
        sheet.getRange(row, cols.godkjent).setValue(false);
        sheet.getRange(row, cols.publisering).setValue('Venter på godkjenning');
        notifyApprovers_(ss, sheet, row, values, cols);
      }
    } else if (stored !== hash) {
      markChanged_(ss, sheet, row, values, cols);
    }
  });
}

// ---------------------------------------------------------------------------
// Deploy-hook og varsling
// ---------------------------------------------------------------------------

function callDeployHook_(ss) {
  var url = PropertiesService.getScriptProperties().getProperty('DEPLOY_HOOK_URL');
  if (!url) {
    ss.toast('Godkjent, men nettsiden ble ikke bygget på nytt: DEPLOY_HOOK_URL mangler.', 'Deploy', 15);
    return;
  }
  try {
    var res = UrlFetchApp.fetch(url, { method: 'post', muteHttpExceptions: true });
    var code = res.getResponseCode();
    if (code < 200 || code >= 300) {
      ss.toast('Godkjent, men bygging av nettsiden feilet (HTTP ' + code + ').', 'Deploy', 15);
    }
  } catch (err) {
    ss.toast('Godkjent, men bygging av nettsiden feilet: ' + err.message, 'Deploy', 15);
  }
}

function notifyApprovers_(ss, sheet, row, values, cols) {
  var tabName = sheet.getName();
  var id = cellString_(values, cols.id);
  var cache = CacheService.getScriptCache();
  var key = tabName + '|' + id;
  if (cache.get(key)) return;

  var label = rowLabel_(values, cols);
  var link = ss.getUrl() + '#gid=' + sheet.getSheetId() + '&range=A' + row;
  var body = [
    'En rad i nettsideinnholdet venter på godkjenning.',
    '',
    'Fane: ' + tabName,
    'Rad: ' + label,
    '',
    'Åpne regnearket: ' + link,
    '',
    'Kryss av «Godkjent» når Status viser ✅ for å publisere raden.'
  ].join('\n');

  try {
    MailApp.sendEmail({
      to: CONFIG.approvers.join(','),
      subject: 'Venter på godkjenning: ' + label + ' (' + tabName + ')',
      body: body
    });
    cache.put(key, '1', NOTIFY_SECONDS);
  } catch (err) {
    ss.toast('Kunne ikke varsle godkjennerne: ' + err.message, tabName, 10);
  }
}

// ---------------------------------------------------------------------------
// Hjelpere
// ---------------------------------------------------------------------------

function getSheetOrThrow_(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) throw new Error('Fant ikke fanen «' + name + '»');
  return sheet;
}

function readHeaders_(sheet) {
  var lastCol = sheet.getLastColumn();
  if (lastCol < 1) return [];
  return sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) { return String(h).trim(); });
}

/** Kolonnenumre (1-basert) slått opp på overskrift i rad 1. */
function getColumns_(sheet) {
  var headers = readHeaders_(sheet);
  var byName = {};
  headers.forEach(function (h, i) { if (h && !byName[h]) byName[h] = i + 1; });

  var required = ['ID', 'Fjern', 'Godkjent', 'Status', 'Publisering', 'Hash'];
  required.forEach(function (name) {
    if (!byName[name]) throw new Error('Fant ikke kolonnen «' + name + '» i ' + sheet.getName());
  });
  if (byName.Fjern <= byName.ID) throw new Error('«Fjern» må stå etter «ID» i ' + sheet.getName());

  var content = [];
  for (var c = byName.ID + 1; c < byName.Fjern; c++) {
    if (headers[c - 1]) content.push(c);
  }

  return {
    byName: byName,
    id: byName.ID,
    content: content,
    fjern: byName.Fjern,
    godkjent: byName.Godkjent,
    status: byName.Status,
    publisering: byName.Publisering,
    hash: byName.Hash
  };
}

function readRow_(sheet, row) {
  return sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
}

function cellString_(values, col) {
  var v = values[col - 1];
  return v === null || v === undefined ? '' : String(v).trim();
}

function hasContent_(values, cols) {
  return cols.content.some(function (c) { return cellString_(values, c) !== ''; });
}

function rowLabel_(values, cols) {
  var col = cols.byName['Tittel'] || cols.byName['Navn'];
  var label = col ? cellString_(values, col) : '';
  return label || ('ID ' + cellString_(values, cols.id));
}

function normalizeForHash_(v) {
  if (v instanceof Date) return v.toISOString();
  if (v === null || v === undefined) return '';
  return String(v);
}

/** SHA-256 over innholdskolonnene + Fjern, slått sammen med ␟, base64. */
function computeHash_(values, cols) {
  var parts = cols.content.concat([cols.fjern]).map(function (c) { return normalizeForHash_(values[c - 1]); });
  var digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    parts.join(HASH_SEPARATOR),
    Utilities.Charset.UTF_8
  );
  return Utilities.base64Encode(digest);
}

function columnLetter_(col) {
  var s = '';
  while (col > 0) {
    var m = (col - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    col = Math.floor((col - 1) / 26);
  }
  return s;
}
