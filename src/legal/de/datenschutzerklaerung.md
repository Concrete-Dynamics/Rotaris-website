# Datenschutzerklärung für Rotaris und Rotaris Cloud

Stand: 21. August 2026

Diese Erklärung gilt für die Rotaris-Desktop-Anwendung, die Kommandozeilen- und
Terminaloberflächen sowie für den kostenpflichtigen Dienst **Rotaris Cloud**. Für
unsere Website gilt die dort veröffentlichte gesonderte Datenschutzerklärung.

## 1. Verantwortlicher

Concrete Dynamics UG (haftungsbeschränkt)
Bahnhofstr. 15, 87435 Kempten (Allgäu), Deutschland
Vertreten durch die Geschäftsführer David Fischer und Philipp Geirhos
Registergericht: Amtsgericht Kempten (Allgäu), HRB 18115
E-Mail: info@concrete-dynamics.com
Telefon: +49 157 34796582

Einen Datenschutzbeauftragten haben wir nicht bestellt; die gesetzlichen
Voraussetzungen des Art. 37 DSGVO und des § 38 BDSG liegen bei uns nicht vor.
Für Datenschutzanfragen erreichst du uns unter der oben genannten Adresse.

## 2. Das Wichtigste zuerst: Rotaris arbeitet lokal

Rotaris läuft auf deinem Rechner und arbeitet in deinem Arbeitsverzeichnis. Deine
Projektdateien, die vollständigen Sitzungsprotokolle, Diagnoseprotokolle, der
Antwort-Cache und die von Rotaris angelegten Git-Arbeitsbäume werden ausschließlich
lokal gespeichert:

- `<Arbeitsverzeichnis>/.rotaris/` — Sitzungen, Protokolle, Cache, Arbeitsbäume
- `~/.config/rotaris/` — globale Konfiguration
- `~/.local/share/rotaris/tokens/` — Zugangsdaten, dateibasiert mit Rechten `0600`

Auf diese Daten haben wir keinen Zugriff. Sie verlassen deinen Rechner nur in den
unter Ziffer 4 beschriebenen Fällen — und dann nur, weil du eine Aufgabe an ein
Sprachmodell gibst oder uns ausdrücklich etwas übermittelst.

**Deine Verantwortung für Inhalte.** Was du an ein Sprachmodell übergibst, bestimmst
du. Enthalten deine Quelldateien, Protokolle oder Aufgabenbeschreibungen
personenbezogene Daten Dritter, bist du für diese Verarbeitung datenschutzrechtlich
verantwortlich. Für den geschäftlichen Einsatz stellen wir dir auf Anfrage einen
Auftragsverarbeitungsvertrag nach Art. 28 DSGVO zur Verfügung.

## 3. Registrierung und Nutzerkonto (nur Rotaris Cloud)

Die Rotaris-Anwendung selbst kannst du ohne Konto nutzen. Für Rotaris Cloud legst du
ein Konto an. Dabei verarbeiten wir:

| Datum | Zweck |
| --- | --- |
| E-Mail-Adresse | Anmeldung, Kontowiederherstellung, dienstbezogene Nachrichten |
| Passwort (nur als kryptografischer Hash, nie im Klartext) | Authentifizierung |
| Zeitpunkt der Registrierung, Kontostatus | Vertragsverwaltung |

Die Anmeldung läuft über unseren eigenen Keycloak-Server nach dem Standardverfahren
OpenID Connect (Authorization Code Flow mit PKCE). Der Server steht auf einem von uns
betriebenen virtuellen Server bei der Contabo GmbH in Deutschland.

Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Erfüllung des Nutzungsvertrags).

## 4. Verarbeitung bei Nutzung von Rotaris Cloud

### 4.1 Modellanfragen

Wählst du Rotaris Cloud als Anbieter, sendet die Anwendung deine Anfrage an
`https://rotaris.ai/v1`. Eine Anfrage besteht aus dem, was der Agent für die Aufgabe
braucht: Aufgabentext, Ausschnitte deiner Quelldateien, Ausgaben ausgeführter Befehle
und Ergebnisse vorheriger Arbeitsschritte.

**Wir speichern die Inhalte dieser Anfragen nicht.** Unser Server nimmt die Anfrage
entgegen, leitet sie an OpenRouter, Inc. weiter, gibt die Antwort zurück und behält
davon nur den für die Abrechnung nötigen Umfang (siehe 4.2). Weder die Anfrage noch
die Antwort werden bei uns dauerhaft gespeichert, protokolliert oder eingesehen.

OpenRouter, Inc. (USA) leitet die Anfrage an den Anbieter des jeweiligen Modells
weiter. Damit findet eine Übermittlung in die Vereinigten Staaten statt; die Grundlage
und die Garantien dafür stehen in Ziffer 7.

Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.

### 4.2 Guthaben, Verbrauch und Zahlung

Rotaris Cloud wird über im Voraus gekauftes Guthaben abgerechnet. Dafür verarbeiten
wir kontobezogen den Guthabenstand, die Verbrauchsbuchungen (Zeitpunkt, verwendetes
Modell, verbrauchte Token, Betrag) sowie die Kauf- und Zahlungsvorgänge. Der
Verbrauchsdatensatz enthält keine Inhalte deiner Anfragen. [PRÜFEN: exakten
Buchungsdatensatz des Backends gegenprüfen und diese Aufzählung daran angleichen.]

Zahlungen wickeln wir über die Stripe Payments Europe, Ltd., Dublin, Irland ab. Deine
Zahlungsdaten — Kartendaten, Bankverbindung — gibst du unmittelbar bei Stripe ein;
wir erhalten sie nicht, sondern nur die Bestätigung der Zahlung und die für die
Rechnung nötigen Angaben. Es gilt zusätzlich die Datenschutzerklärung von Stripe.

Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, für die Aufbewahrung der
Rechnungsdaten Art. 6 Abs. 1 lit. c DSGVO in Verbindung mit § 147 AO und § 257 HGB.

### 4.3 Serverprotokolle

Unsere Server protokollieren beim Zugriff IP-Adresse, Zeitpunkt, angefragten Pfad,
Statuscode und übertragene Datenmenge. Das dient dem Betrieb und der Abwehr von
Angriffen. Die Protokolle werden nach 7 Tagen gelöscht. [PRÜFEN: tatsächliche
Aufbewahrungsdauer auf dem VPS konfigurieren und hier eintragen.]

Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse ist der
sichere und störungsfreie Betrieb des Dienstes.

## 5. Verarbeitung unabhängig von Rotaris Cloud

### 5.1 Prüfung auf Aktualisierungen

Installierte Rotaris-Versionen fragen beim Start bei GitHub ab, ob eine neuere Version
vorliegt (`api.github.com`). Dabei erfährt GitHub deine IP-Adresse und die technischen
Angaben deines Programms. Wir erhalten diese Daten nicht. Aus einer Quellinstallation
heraus findet keine Abfrage statt.

Heruntergeladene Aktualisierungen installiert Rotaris nur, wenn die Prüfsumme der
Datei mit der veröffentlichten Prüfsumme übereinstimmt.

Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse ist es,
dass du Sicherheitsaktualisierungen zeitnah erhältst. Du kannst die Prüfung in den
Einstellungen abschalten. [PRÜFEN: Schalter vorhanden? Wenn nicht, ist er vor
Veröffentlichung zu ergänzen — sonst diesen Satz streichen.]

### 5.2 Andere Modellanbieter deiner Wahl

Rotaris kann statt Rotaris Cloud auch Anthropic, OpenAI, DeepSeek, GitHub Copilot,
OpenAI Codex oder einen beliebigen OpenAI-kompatiblen Endpunkt ansprechen. In diesem
Fall besteht die Verbindung unmittelbar zwischen deinem Rechner und dem von dir
gewählten Anbieter. Wir sind daran nicht beteiligt, erhalten keine Daten und sind
dafür nicht verantwortlich. Es gelten allein deine Vereinbarung und die
Datenschutzerklärung des jeweiligen Anbieters.

Gleiches gilt für von dir eingerichtete MCP-Server, etwa die Websuche über Tavily:
solche Verbindungen entstehen nur, weil du sie konfiguriert hast.

### 5.3 Support und Rückmeldungen

Schreibst du uns per E-Mail, verarbeiten wir deine Angaben zur Bearbeitung deines
Anliegens auf Grundlage von Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO und löschen sie,
sobald die Aufbewahrung nicht mehr erforderlich ist.

<!-- [AKTIVIEREN MIT SWR-2208 — erst veröffentlichen, wenn die Funktion ausgeliefert wird:]
Aus der Anwendung heraus kannst du uns eine Supportmeldung senden. Übertragen wird
dein Freitext. Zusätzlich kannst du **freiwillig und durch gesonderte Auswahl** das
Diagnoseprotokoll und die Metadaten der laufenden Sitzung anhängen. Diese Daten können
Dateipfade, deinen Benutzernamen und Ausschnitte deines Quellcodes enthalten; bitte
sieh sie vor dem Absenden durch. Ohne deine Auswahl senden wir sie nicht. Wir löschen
Supportmeldungen spätestens 12 Monate nach Abschluss des Vorgangs. Rechtsgrundlage ist
Art. 6 Abs. 1 lit. b DSGVO, für die freiwilligen Anhänge Art. 6 Abs. 1 lit. a DSGVO.
-->

## 6. Empfänger

Wir geben personenbezogene Daten nur an die folgenden Dienstleister weiter, die für
uns als Auftragsverarbeiter nach Art. 28 DSGVO tätig sind oder eigenverantwortlich als
Zahlungsdienstleister handeln:

| Empfänger | Aufgabe | Ort |
| --- | --- | --- |
| Contabo GmbH, München | Serverinfrastruktur (Hosting) | Deutschland |
| OpenRouter, Inc., Delaware | Vermittlung der Modellanfragen | USA |
| Stripe Payments Europe, Ltd., Dublin | Zahlungsabwicklung | Irland / USA |
| GitHub, Inc. | Auslieferung der Programmaktualisierungen | USA |

Darüber hinaus geben wir Daten weiter, wenn wir gesetzlich dazu verpflichtet sind.

## 7. Übermittlung in Drittländer

Die Weiterleitung der Modellanfragen an OpenRouter sowie die Zahlungsabwicklung und
die Auslieferung der Aktualisierungen berühren die Vereinigten Staaten. Die
Übermittlung stützt sich auf die Standardvertragsklauseln der Europäischen Kommission
nach Art. 46 Abs. 2 lit. c DSGVO, soweit der Empfänger nicht nach dem EU-US Data
Privacy Framework zertifiziert ist (Art. 45 DSGVO). Eine Kopie der Garantien
übersenden wir dir auf Anfrage.

[PRÜFEN: Vor Veröffentlichung ist für OpenRouter der abgeschlossene AV-Vertrag samt
Standardvertragsklauseln und die Zertifizierungslage zu dokumentieren; für Stripe die
DPF-Zertifizierung der Stripe, Inc.]

## 8. Speicherdauer

Kontodaten löschen wir, wenn du dein Konto löschst. Rechnungs- und Buchungsdaten
bewahren wir wegen der handels- und steuerrechtlichen Pflichten 10 Jahre auf und
sperren sie in dieser Zeit für andere Zwecke. Serverprotokolle löschen wir nach 7
Tagen. Einzelheiten stehen in unserem internen Löschkonzept.

## 9. Deine Rechte

Du hast das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und
Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21).
Eine erteilte Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen.

Wende dich dafür an info@concrete-dynamics.com. Wir antworten innerhalb eines Monats.

Du kannst dich außerdem bei einer Aufsichtsbehörde beschweren. Für uns zuständig ist
das Bayerische Landesamt für Datenschutzaufsicht, Promenade 27, 91522 Ansbach.

## 10. Keine automatisierte Entscheidungsfindung

Eine automatisierte Entscheidungsfindung einschließlich Profiling nach Art. 22 DSGVO
findet nicht statt. Die Ausgaben der Sprachmodelle sind Vorschläge zu deiner Aufgabe
und keine Entscheidungen über dich.

## 11. Änderungen

Wir passen diese Erklärung an, wenn sich die Anwendung oder die Rechtslage ändert. Die
jeweils gültige Fassung ist unter [URL EINTRAGEN] abrufbar; das Datum oben nennt den
Stand.
