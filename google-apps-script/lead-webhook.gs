/**
 * Flowstack VSL Funnel - Lead Webhook v2
 *
 * Ein Lead wird beim Opt-in angelegt.
 * Bei Bewerbung + Termin wird der Lead über die E-Mail gefunden und aktualisiert.
 *
 * SETUP:
 * 1. Gehe zu https://script.google.com
 * 2. Ersetze den alten Code mit diesem
 * 3. Bereitstellen > Bereitstellungen verwalten > Bearbeiten > Neue Version
 * 4. WICHTIG: "Neue Version" auswählen, dann Bereitstellen
 */

const SPREADSHEET_ID = '14ERWIIEPmmo4YE2e7JtOAUkNS6BA2jm7Hl7LNGSjDIk';
const NOTIFY_EMAIL = 'claudio@flowstack-system.de';
const CALENDAR_ID = 'primary';
const DOMAIN = 'https://flowstack.io';
const SHEET_NAME = 'Leads';

// Twilio — Secrets aus Script Properties laden (Apps Script: Einstellungen → Script-Eigenschaften)
const TWILIO_API_KEY = PropertiesService.getScriptProperties().getProperty('TWILIO_API_KEY') || '';
const TWILIO_API_SECRET = PropertiesService.getScriptProperties().getProperty('TWILIO_API_SECRET') || '';
const TWILIO_VERIFY_SID = PropertiesService.getScriptProperties().getProperty('TWILIO_VERIFY_SID') || '';

// Spalten-Mapping (1-basiert)
var COL = {
  DATUM: 1, VORNAME: 2, NACHNAME: 3, EMAIL: 4, TELEFON: 5, WEBSITE: 6,
  ANREDE: 7, DIENSTLEISTUNG: 8, MONATSUMSATZ: 9, ZIELUMSATZ: 10,
  PROBLEM: 11, WERBEANZEIGEN: 12, MITARBEITER: 13, INVESTITION: 14,
  MOTIVATION: 15, DATENSCHUTZ: 16, TELEFONCONSENT: 17,
  TERMIN_DATUM: 18, TERMIN_ZEIT: 19, ANMERKUNG: 20, STATUS: 21
};

var HEADERS = [
  'Datum', 'Vorname', 'Nachname', 'E-Mail', 'Telefon', 'Website',
  'Anrede', 'Dienstleistung', 'Monatsumsatz', 'Zielumsatz',
  'Problem', 'Werbeanzeigen', 'Mitarbeiter', 'Investition',
  'Motivation', 'Datenschutz', 'Telefon-Consent',
  'Termin-Datum', 'Termin-Zeit', 'Anmerkung', 'Status'
];

// ============================================================
// Main Handlers
// ============================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = e.parameter.action || '';
    var result;

    switch (action) {
      case 'optin':
        result = handleOptin(data);
        break;
      case 'bewerbung':
        result = handleBewerbung(data);
        break;
      case 'termin':
        result = handleTermin(data);
        break;
      case 'send-code':
        result = handleSendCode(data);
        break;
      case 'verify-code':
        result = handleVerifyCode(data);
        break;
      default:
        result = { success: false, error: 'Unbekannte Action: ' + action };
    }
    return jsonResponse(result);
  } catch (error) {
    Logger.log('doPost Error: ' + error.message);
    return jsonResponse({ success: false, error: error.message });
  }
}

function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) || '';
    if (action === 'freebusy') {
      var month = e.parameter.month || '';
      if (!month) return jsonResponse({ success: false, error: 'Parameter "month" fehlt' });
      return jsonResponse(handleFreebusy(month));
    }
    return jsonResponse({ status: 'Flowstack Lead Webhook v2 aktiv' });
  } catch (error) {
    Logger.log('doGet Error: ' + error.message);
    return jsonResponse({ success: false, error: error.message });
  }
}

// ============================================================
// Opt-in: Neuen Lead anlegen
// ============================================================

function handleOptin(data) {
  var vorname = data.vorname || '';
  var email = data.email || '';
  var telefon = data.telefon || '';
  var datum = formatDate(new Date());
  var sheet = getOrCreateSheet();

  // Prüfen ob Lead schon existiert
  var row = findRowByEmail(sheet, email);

  var quelle = data.quelle || '';
  var status = quelle.indexOf('bestätigt') > -1 && quelle.indexOf('unbestätigt') === -1
    ? 'Opt-in (bestätigt)'
    : 'Opt-in';

  if (row > 0) {
    // Lead existiert, aktualisieren
    sheet.getRange(row, COL.DATUM).setValue(datum);
    sheet.getRange(row, COL.VORNAME).setValue(vorname);
    sheet.getRange(row, COL.TELEFON).setValue(telefon);
    sheet.getRange(row, COL.STATUS).setValue(status);
  } else {
    // Neuen Lead anlegen
    var newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, COL.DATUM).setValue(datum);
    sheet.getRange(newRow, COL.VORNAME).setValue(vorname);
    sheet.getRange(newRow, COL.EMAIL).setValue(email);
    sheet.getRange(newRow, COL.TELEFON).setValue(telefon);
    sheet.getRange(newRow, COL.STATUS).setValue(status);
  }

  // E-Mail an mich
  try {
    MailApp.sendEmail(NOTIFY_EMAIL, 'Neuer VSL Lead: ' + vorname, [
      'Neuer Lead über den VSL Funnel',
      '',
      'Vorname: ' + vorname,
      'E-Mail: ' + email,
      'Telefon: ' + telefon,
      'Zeitpunkt: ' + datum,
      '',
      'Sheet: https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID
    ].join('\n'));
  } catch (mailError) {
    Logger.log('Mail an mich fehlgeschlagen: ' + mailError.message);
  }

  // HTML E-Mail an Lead
  try {
    MailApp.sendEmail({
      to: email,
      subject: vorname + ', dein Videotraining ist freigeschaltet',
      htmlBody: optinLeadEmail(vorname)
    });
  } catch (mailError) {
    Logger.log('Mail an Lead fehlgeschlagen: ' + mailError.message);
  }

  return { success: true };
}

// ============================================================
// Bewerbung: Bestehenden Lead aktualisieren
// ============================================================

function handleBewerbung(data) {
  var email = data.email || '';
  var datum = formatDate(new Date());
  var sheet = getOrCreateSheet();
  var row = findRowByEmail(sheet, email);

  // Falls Lead nicht existiert, neuen anlegen
  if (row <= 0) {
    row = sheet.getLastRow() + 1;
    sheet.getRange(row, COL.EMAIL).setValue(email);
    sheet.getRange(row, COL.DATUM).setValue(datum);
  }

  // Alle Bewerbungsdaten in bestehende Zeile schreiben
  sheet.getRange(row, COL.ANREDE).setValue(data.anrede || '');
  sheet.getRange(row, COL.VORNAME).setValue(data.vorname || '');
  sheet.getRange(row, COL.NACHNAME).setValue(data.nachname || '');
  sheet.getRange(row, COL.TELEFON).setValue(data.telefon || '');
  sheet.getRange(row, COL.WEBSITE).setValue(data.website || '');
  sheet.getRange(row, COL.DIENSTLEISTUNG).setValue(data.dienstleistung || '');
  sheet.getRange(row, COL.MONATSUMSATZ).setValue(data.monatsumsatz || '');
  sheet.getRange(row, COL.ZIELUMSATZ).setValue(data.zielumsatz || '');
  sheet.getRange(row, COL.PROBLEM).setValue(data.problem || '');
  sheet.getRange(row, COL.WERBEANZEIGEN).setValue(data.werbeanzeigen || '');
  sheet.getRange(row, COL.MITARBEITER).setValue(data.mitarbeiter || '');
  sheet.getRange(row, COL.INVESTITION).setValue(data.investition || '');
  sheet.getRange(row, COL.MOTIVATION).setValue(data.motivation || '');
  sheet.getRange(row, COL.DATENSCHUTZ).setValue(data.datenschutz || '');
  sheet.getRange(row, COL.TELEFONCONSENT).setValue(data.telefonConsent || '');
  sheet.getRange(row, COL.STATUS).setValue('Bewerbung');

  var vorname = data.vorname || '';
  var nachname = data.nachname || '';

  // E-Mail an mich
  try {
    MailApp.sendEmail(NOTIFY_EMAIL, 'Neue Bewerbung: ' + vorname + ' ' + nachname, [
      'Neue Bewerbung über den VSL Funnel',
      '',
      '--- Kontaktdaten ---',
      'Anrede: ' + (data.anrede || ''),
      'Name: ' + vorname + ' ' + nachname,
      'E-Mail: ' + email,
      'Telefon: ' + (data.telefon || ''),
      'Website: ' + (data.website || ''),
      '',
      '--- Unternehmen ---',
      'Dienstleistung: ' + (data.dienstleistung || ''),
      'Monatsumsatz: ' + (data.monatsumsatz || ''),
      'Zielumsatz: ' + (data.zielumsatz || ''),
      'Mitarbeiter: ' + (data.mitarbeiter || ''),
      '',
      '--- Situation ---',
      'Problem: ' + (data.problem || ''),
      'Werbeanzeigen: ' + (data.werbeanzeigen || ''),
      'Investition: ' + (data.investition || ''),
      'Motivation: ' + (data.motivation || ''),
      '',
      'Zeitpunkt: ' + datum,
      'Sheet: https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID
    ].join('\n'));
  } catch (mailError) {
    Logger.log('Mail an mich fehlgeschlagen: ' + mailError.message);
  }

  // HTML Bestätigung an Lead
  try {
    var anredeText = data.anrede === 'Herr' ? 'Herr ' + nachname : data.anrede === 'Frau' ? 'Frau ' + nachname : vorname;
    MailApp.sendEmail({
      to: email,
      subject: anredeText + ', deine Bewerbung ist eingegangen',
      htmlBody: bewerbungLeadEmail(anredeText)
    });
  } catch (mailError) {
    Logger.log('Mail an Lead fehlgeschlagen: ' + mailError.message);
  }

  return { success: true };
}

// ============================================================
// Termin: Bestehenden Lead aktualisieren + Calendar Event
// ============================================================

function handleTermin(data) {
  var email = data.email || '';
  var vorname = data.vorname || '';
  var nachname = data.nachname || '';
  var telefon = data.telefon || '';
  var anmerkung = data.anmerkung || '';
  var terminDatum = data.datum || '';
  var terminZeit = data.zeit || '';
  var leadTimezone = data.timezone || 'Europe/Berlin';
  var datum = formatDate(new Date());
  var sheet = getOrCreateSheet();
  var row = findRowByEmail(sheet, email);

  if (row <= 0) {
    row = sheet.getLastRow() + 1;
    sheet.getRange(row, COL.EMAIL).setValue(email);
    sheet.getRange(row, COL.DATUM).setValue(datum);
  }

  // Termin-Daten in bestehende Zeile schreiben
  sheet.getRange(row, COL.VORNAME).setValue(vorname);
  sheet.getRange(row, COL.NACHNAME).setValue(nachname);
  sheet.getRange(row, COL.TELEFON).setValue(telefon);
  sheet.getRange(row, COL.TERMIN_DATUM).setValue(terminDatum);
  sheet.getRange(row, COL.TERMIN_ZEIT).setValue(terminZeit);
  sheet.getRange(row, COL.ANMERKUNG).setValue(anmerkung);
  sheet.getRange(row, COL.STATUS).setValue('Termin gebucht');

  // Google Calendar Event (mit Doppelbuchungs-Check)
  try {
    var startDateTime = parseDateTime(terminDatum, terminZeit, leadTimezone);
    var endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000);
    var calendar = CalendarApp.getCalendarById(CALENDAR_ID);

    // Prüfen ob der Slot noch frei ist (Doppelbuchungs-Schutz)
    var existingEvents = calendar.getEvents(startDateTime, endDateTime);
    if (existingEvents.length > 0) {
      // Slot ist belegt → Lead informieren
      sheet.getRange(row, COL.STATUS).setValue('Termin-Konflikt');
      return { success: false, error: 'Dieser Zeitslot wurde leider gerade von jemand anderem gebucht. Bitte wähle einen anderen Termin.' };
    }

    calendar.createEvent(
      'Flowstack Prozessanalyse — ' + vorname + ' ' + nachname,
      startDateTime,
      endDateTime,
      {
        description: [
          'KOSTENLOSE PROZESSANALYSE (Telefonat, 30 Min)',
          '================================================',
          '',
          'Kontakt:',
          'Name: ' + vorname + ' ' + nachname,
          'E-Mail: ' + email,
          'Telefon: ' + telefon,
          '',
          'Was besprochen wird:',
          '✓ Status-Quo Analyse deiner aktuellen Agentur-Prozesse',
          '✓ Identifikation der 3 größten Automatisierungs-Hebel',
          '✓ Individuelle Roadmap für 80% weniger Fulfillment-Aufwand',
          '✓ Ehrliche Einschätzung ob Flowstack für dich Sinn macht',
          '',
          'Anmerkung: ' + (anmerkung || 'Keine'),
          '',
          'WICHTIG: Claudio ruft an unter ' + telefon
        ].join('\n'),
        location: 'Telefonat — Claudio ruft an unter ' + telefon
      }
    );
  } catch (calError) {
    Logger.log('Calendar Event fehlgeschlagen: ' + calError.message);
  }

  // E-Mail an mich
  try {
    MailApp.sendEmail(NOTIFY_EMAIL, 'Neuer Termin: ' + vorname + ' ' + nachname + ' am ' + terminDatum, [
      'Neuer Termin über den VSL Funnel',
      '',
      'Name: ' + vorname + ' ' + nachname,
      'E-Mail: ' + email,
      'Telefon: ' + telefon,
      'Termin: ' + terminDatum + ' um ' + terminZeit + ' Uhr',
      'Anmerkung: ' + (anmerkung || 'Keine'),
      '',
      'Termin wurde automatisch im Kalender erstellt.',
      'Sheet: https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID
    ].join('\n'));
  } catch (mailError) {
    Logger.log('Mail an mich fehlgeschlagen: ' + mailError.message);
  }

  // HTML Bestätigung an Lead
  try {
    MailApp.sendEmail({
      to: email,
      subject: vorname + ', dein Termin am ' + terminDatum + ' ist bestätigt',
      htmlBody: terminLeadEmail(vorname, terminDatum, terminZeit, telefon)
    });
  } catch (mailError) {
    Logger.log('Mail an Lead fehlgeschlagen: ' + mailError.message);
  }

  return { success: true };
}

// ============================================================
// FreeBusy: Belegte Zeitslots abfragen
// ============================================================

function handleFreebusy(month) {
  var parts = month.split('-');
  var year = parseInt(parts[0], 10);
  var mon = parseInt(parts[1], 10);
  var startDate = new Date(year, mon - 1, 1, 0, 0, 0);
  var endDate = new Date(year, mon, 0, 23, 59, 59);
  var calendar = CalendarApp.getCalendarById(CALENDAR_ID);
  var events = calendar.getEvents(startDate, endDate);

  var busyMap = {};
  for (var i = 0; i < events.length; i++) {
    var eventStart = events[i].getStartTime();
    var eventEnd = events[i].getEndTime();
    var tz = Session.getScriptTimeZone();

    // Generate all 30-min slots that this event covers
    var cursor = new Date(eventStart.getTime());
    while (cursor < eventEnd) {
      var dateKey = Utilities.formatDate(cursor, tz, 'yyyy-MM-dd');
      var timeKey = Utilities.formatDate(cursor, tz, 'HH:mm');
      if (!busyMap[dateKey]) busyMap[dateKey] = [];
      if (busyMap[dateKey].indexOf(timeKey) === -1) {
        busyMap[dateKey].push(timeKey);
      }
      cursor = new Date(cursor.getTime() + 30 * 60 * 1000);
    }
  }

  var busySlots = [];
  for (var date in busyMap) {
    busySlots.push({ date: date, times: busyMap[date] });
  }
  busySlots.sort(function(a, b) { return a.date.localeCompare(b.date); });

  return { success: true, busySlots: busySlots };
}

// ============================================================
// Twilio SMS Verifizierung
// ============================================================

function handleSendCode(data) {
  var telefon = data.telefon || '';
  if (!telefon) return { success: false, error: 'Telefonnummer fehlt' };

  var url = 'https://verify.twilio.com/v2/Services/' + TWILIO_VERIFY_SID + '/Verifications';
  var options = {
    method: 'post',
    headers: {
      'Authorization': 'Basic ' + Utilities.base64Encode(TWILIO_API_KEY + ':' + TWILIO_API_SECRET)
    },
    payload: {
      'To': telefon,
      'Channel': 'sms'
    },
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, options);
  var result = JSON.parse(response.getContentText());

  if (result.status === 'pending') {
    return { success: true, message: 'Code gesendet' };
  } else {
    Logger.log('Twilio Send Error: ' + response.getContentText());
    return { success: false, error: result.message || 'SMS konnte nicht gesendet werden' };
  }
}

function handleVerifyCode(data) {
  var telefon = data.telefon || '';
  var code = data.code || '';
  if (!telefon || !code) return { success: false, error: 'Telefonnummer oder Code fehlt' };

  var url = 'https://verify.twilio.com/v2/Services/' + TWILIO_VERIFY_SID + '/VerificationCheck';
  var options = {
    method: 'post',
    headers: {
      'Authorization': 'Basic ' + Utilities.base64Encode(TWILIO_API_KEY + ':' + TWILIO_API_SECRET)
    },
    payload: {
      'To': telefon,
      'Code': code
    },
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, options);
  var result = JSON.parse(response.getContentText());

  if (result.status === 'approved') {
    return { success: true, verified: true };
  } else {
    return { success: false, verified: false, error: 'Code ungültig oder abgelaufen' };
  }
}

// ============================================================
// Helpers
// ============================================================

function getOrCreateSheet() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function findRowByEmail(sheet, email) {
  if (!email) return -1;
  var data = sheet.getDataRange().getValues();
  var emailCol = COL.EMAIL - 1; // 0-basiert
  for (var i = 1; i < data.length; i++) {
    if (data[i][emailCol] && data[i][emailCol].toString().toLowerCase() === email.toLowerCase()) {
      return i + 1; // 1-basiert
    }
  }
  return -1;
}

/**
 * Datum + Zeit + Zeitzone in ein Date-Objekt parsen.
 * Die Slots werden immer in der Lead-Zeitzone angezeigt.
 * Der Kalender-Event muss in Berlin-Zeit sein (dein Kalender).
 * Wenn keine Zeitzone übergeben wird, ist Berlin Standard.
 */
function parseDateTime(datum, zeit, leadTimezone) {
  // Erstelle ISO-String in der Lead-Zeitzone
  var isoStr = datum + 'T' + zeit + ':00';

  // Wenn Lead-Zeitzone = Berlin oder nicht angegeben → direkt parsen
  if (!leadTimezone || leadTimezone === 'Europe/Berlin') {
    var d = datum.split('-');
    var t = zeit.split(':');
    return new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), parseInt(t[0]), parseInt(t[1]), 0);
  }

  // Zeitzone-Offset berechnen: Lead-TZ vs Berlin
  // Trick: Formatiere gleichen Moment in beiden Zeitzonen und vergleiche Stunden
  var now = new Date();
  var berlinStr = Utilities.formatDate(now, 'Europe/Berlin', 'yyyy-MM-dd HH:mm');
  var leadStr = Utilities.formatDate(now, leadTimezone, 'yyyy-MM-dd HH:mm');

  var berlinHour = parseInt(berlinStr.split(' ')[1].split(':')[0]);
  var leadHour = parseInt(leadStr.split(' ')[1].split(':')[0]);
  var offsetHours = berlinHour - leadHour;

  // Parse die Lead-Zeit und addiere den Offset um Berlin-Zeit zu bekommen
  var d = datum.split('-');
  var t = zeit.split(':');
  var leadDate = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), parseInt(t[0]) + offsetHours, parseInt(t[1]), 0);

  return leadDate;
}

function formatDate(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'dd.MM.yyyy, HH:mm');
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
// HTML E-Mail Templates
// ============================================================

function emailTemplate(content) {
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>'
    + '<body style="margin:0;padding:0;background:#f4f4f5;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">'
    + '<tr><td align="center">'
    + '<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">'
    // Header
    + '<tr><td style="padding:32px 40px 24px;border-bottom:1px solid #e5e7eb;">'
    + '<span style="font-size:22px;font-weight:800;color:#111415;letter-spacing:-0.02em;">Flow<span style="color:#0891b2;">stack</span></span>'
    + '</td></tr>'
    // Content
    + '<tr><td style="padding:32px 40px;">' + content + '</td></tr>'
    // Footer
    + '<tr><td style="padding:24px 40px;background:#f9fafb;border-top:1px solid #e5e7eb;">'
    + '<p style="margin:0 0 8px;font-size:13px;color:#6b7280;">Claudio Di Franco | Flowstack Systems</p>'
    + '<p style="margin:0 0 8px;font-size:12px;color:#9ca3af;">Falkenweg 2, 76327 Pfinztal</p>'
    + '<p style="margin:0;font-size:12px;color:#9ca3af;">'
    + '<a href="' + DOMAIN + '" style="color:#0891b2;text-decoration:none;">flowstack.io</a>'
    + ' · <a href="' + DOMAIN + '/impressum" style="color:#9ca3af;text-decoration:none;">Impressum</a>'
    + ' · <a href="' + DOMAIN + '/datenschutz" style="color:#9ca3af;text-decoration:none;">Datenschutz</a>'
    + '</p>'
    + '</td></tr>'
    + '</table>'
    + '</td></tr></table></body></html>';
}

function emailHeading(text) {
  return '<h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#111415;line-height:1.3;">' + text + '</h1>';
}

function emailText(text) {
  return '<p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">' + text + '</p>';
}

function emailButton(text, url) {
  return '<table cellpadding="0" cellspacing="0" style="margin:24px 0;"><tr><td>'
    + '<a href="' + url + '" style="display:inline-block;padding:14px 32px;background:#111415;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;border-radius:6px;">'
    + text + '</a>'
    + '</td></tr></table>';
}

function emailBullet(text) {
  return '<tr><td style="padding:6px 0;font-size:14px;color:#374151;line-height:1.6;">'
    + '<span style="color:#0891b2;font-weight:700;margin-right:8px;">✓</span>' + text
    + '</td></tr>';
}

function emailBulletList(items) {
  var html = '<table cellpadding="0" cellspacing="0" style="margin:16px 0 24px;">';
  for (var i = 0; i < items.length; i++) {
    html += emailBullet(items[i]);
  }
  html += '</table>';
  return html;
}

function emailDivider() {
  return '<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">';
}

function emailCard(content) {
  return '<div style="background:#f9fafb;border-radius:8px;padding:20px 24px;margin:20px 0;border:1px solid #e5e7eb;">'
    + content + '</div>';
}

function emailSmall(text) {
  return '<p style="margin:0 0 8px;font-size:13px;color:#6b7280;line-height:1.5;">' + text + '</p>';
}

// ============================================================
// HTML E-Mail Inhalte
// ============================================================

function optinLeadEmail(vorname) {
  return emailTemplate(
    emailHeading(vorname + ', dein Videotraining ist freigeschaltet')
    + emailText('Vielen Dank für dein Interesse! Hier ist dein exklusiver Zugang:')
    + emailButton('Videotraining jetzt ansehen →', DOMAIN + '/videotraining')
    + emailText('<strong>In diesem Training erfährst du:</strong>')
    + emailBulletList([
      'Warum 90% aller Agenturen an manuellen Prozessen scheitern',
      'Die exakte Methode, mit der wir 47 Schritte pro Kunde auf 3 Klicks reduzieren',
      'Wie du vom Kundenabschluss bis zum Kampagnen-Launch in 120 Sekunden kommst'
    ])
    + emailDivider()
    + emailText('Nach dem Training hast du die Möglichkeit, dir eine <strong>kostenlose Prozessanalyse</strong> zu sichern. In 15-20 Minuten zeige ich dir persönlich, wo die größten Hebel in deiner Agentur liegen.')
    + emailSmall('P.S. Falls du das Training nicht sofort anschauen kannst: Speichere diese Mail ab. Der Link bleibt 48 Stunden aktiv.')
  );
}

function bewerbungLeadEmail(anredeText) {
  return emailTemplate(
    emailHeading('Deine Bewerbung ist eingegangen')
    + emailText('Hallo ' + anredeText + ',')
    + emailText('vielen Dank für deine Bewerbung bei Flowstack. Wir haben deine Angaben erhalten und prüfen, ob eine Zusammenarbeit sinnvoll ist.')
    + emailCard(
      '<p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#111415;">Was passiert jetzt?</p>'
      + '<table cellpadding="0" cellspacing="0">'
      + '<tr><td style="padding:4px 0;font-size:14px;color:#374151;"><span style="color:#0891b2;font-weight:700;margin-right:8px;">1.</span> Wir prüfen deine Angaben (max. 48 Stunden)</td></tr>'
      + '<tr><td style="padding:4px 0;font-size:14px;color:#374151;"><span style="color:#0891b2;font-weight:700;margin-right:8px;">2.</span> Wenn du zu uns passt, melden wir uns telefonisch</td></tr>'
      + '<tr><td style="padding:4px 0;font-size:14px;color:#374151;"><span style="color:#0891b2;font-weight:700;margin-right:8px;">3.</span> Im Gespräch analysieren wir gemeinsam deine Prozesse</td></tr>'
      + '</table>'
    )
    + emailText('Falls du in der Zwischenzeit Fragen hast, antworte einfach auf diese E-Mail.')
    + emailSmall('P.S. Du hast dich beworben, weil du weißt, dass Skalierung kein Zufall ist. Das unterscheidet dich bereits von 90% der Agenturinhaber da draußen.')
  );
}

function terminLeadEmail(vorname, terminDatum, terminZeit, telefon) {
  return emailTemplate(
    emailHeading('Dein Termin ist bestätigt')
    + emailText('Hey ' + vorname + ', dein Termin steht!')
    + emailCard(
      '<table cellpadding="0" cellspacing="0" width="100%">'
      + '<tr><td style="padding:4px 0;font-size:14px;color:#6b7280;width:90px;">Datum</td><td style="padding:4px 0;font-size:15px;font-weight:600;color:#111415;">' + terminDatum + '</td></tr>'
      + '<tr><td style="padding:4px 0;font-size:14px;color:#6b7280;">Uhrzeit</td><td style="padding:4px 0;font-size:15px;font-weight:600;color:#111415;">' + terminZeit + ' Uhr</td></tr>'
      + '<tr><td style="padding:4px 0;font-size:14px;color:#6b7280;">Dauer</td><td style="padding:4px 0;font-size:15px;font-weight:600;color:#111415;">ca. 15-20 Minuten</td></tr>'
      + '<tr><td style="padding:4px 0;font-size:14px;color:#6b7280;">Art</td><td style="padding:4px 0;font-size:15px;font-weight:600;color:#111415;">📞 Telefonat</td></tr>'
      + '</table>'
    )
    + emailText('<strong>Was wir besprechen:</strong>')
    + emailBulletList([
      'Welche deiner Prozesse das größte Automatisierungs-Potenzial haben',
      'Wie viel Zeit und Geld du realistisch einsparen kannst',
      'Ob das Flowstack-System für deine Situation Sinn macht'
    ])
    + emailDivider()
    + emailText('<strong>Vorbereitung:</strong>')
    + emailBulletList([
      'Welche 2-3 Prozesse fressen aktuell die meiste Zeit?',
      'Wie viele Kunden betreust du / willst du betreuen?',
      'Notiere Fragen zur Zusammenarbeit'
    ])
    + emailCard(
      '<p style="margin:0;font-size:14px;color:#374151;">Ich rufe dich pünktlich an unter: <strong>' + telefon + '</strong><br>Bitte stelle sicher, dass du erreichbar bist.</p>'
    )
    + emailSmall('Falls du den Termin verschieben musst, antworte einfach auf diese Mail. Bitte gib uns mindestens 24 Stunden vorher Bescheid.')
  );
}
