# Implementierungsplan — Theo

**Stand:** 20. September 2026  
**Status:** Entwicklungsplan zur anschließenden Umsetzung; noch kein Implementierungsauftrag ausgeführt  
**Geprüfter Ausgangsstand:** `de76404add4f2a665682c064aaa32a9e6f13f490`

## 1. Ziel und Arbeitsweise

Eine tatsächlich nutzbare V1 für **iOS, Android und Web** mit lokalem Gastmodus, nachvollziehbarer Berechnung, optionalem Konto und bearbeitbarem Plan.

Im geprüften Repo liegen Produktdokumentation und Bildreferenzen, aber kein ausführbares App-Projekt. Vorhandene Designbilder sind Richtungsreferenzen, keine fertigen Komponenten und keine verbindlichen Rechentestdaten. Frühere lokale Codefragmente sind kein geprüfter Ausgangsstand.

Die spätere Umsetzung erfolgt in einem geklonten Repository auf einem Entwicklungsbranch. Jede Etappe liefert ausführbaren Code, gezielte Prüfungen und einen überprüfbaren Commit/PR. Kein reines Nachzeichnen statischer Mockups. Die aktuelle Arbeit erstellt nur diesen Plan.

Technische Grundlage: [Tech Stack](tech-stack.md), [Gastmodus](guest-mode.md), [Produktentscheidungen](PRODUCT-DECISIONS.md). Paketversionen werden bei Projektanlage kompatibel ausgewählt und mit Lockfile festgehalten, nicht aus alten Beispielen ungeprüft übernommen.

## 2. Verbindlicher V1-Umfang und neuere Gesprächsentscheidungen

Diese Präzisierungen stammen aus dem Gespräch nach D-048 beziehungsweise ergänzen ältere Mockups. Bei Beginn der Implementierung in die betroffenen Fach-/Flow-Dokumente zurückführen:

- **Navigation:** ausschließlich „Heute“ und „Profil“. Kein Tab „Woche“, keine eigene Wochenverteilungsansicht.
- **Heute:** heutiges Kalorienziel und im Makromodus Protein-, Fett- und Kohlenhydratziele. Die Überschrift **„Deine Makroziele“ entfällt**; Labels und Werte stehen direkt unter dem Kalorienziel.
- Cheat Day am jeweiligen Tag dezent kennzeichnen; das tatsächlich geltende Tagesbudget und die zugehörigen Makros zeigen.
- Keine erfassten/verbleibenden Kalorien, Fortschrittsringe, Mahlzeitenliste, Mikrofonfunktion oder Gewichtskurve in V1.
- **Profil:** als Gast optional anmelden/registrieren; Körperdaten, Gewicht, Aktivität, Ziel und Zeitraum sowie Planoptionen bearbeiten.
- Kontoaufnahme übernimmt den vorhandenen Gastplan. Registrierung darf nicht vor dem ersten Ergebnis erzwungen werden.
- Die interne Wochenbudget-Berechnung bleibt erhalten. Ausgangsbudget und Umverteilung dürfen im Onboarding und in der aufgerufenen Erklärung nachvollziehbar sein; daraus entsteht keine permanente Wochenübersicht.
- Nocturne, großzügige freie Flächen, zurückhaltende feste Schriftgrößen und Unterstützung von System-Schriftvergrößerung.
- „Theo“ mit großem T auf dem Startscreen; kein obligatorischer Namensheader auf jedem Folgescreen.
- Theo öffnet kontextbezogene Hilfe. Beim ersten Auftreten einmalig eine kurze Sprechblase zur antippbaren Hilfe, danach keine dauerhaften Sprechblasen.
- **Frisur:** bei Auswahl „Männlich“/„Weiblich“ passende Frisur mit kurzem Übergang, **ausschließlich auf diesem Auswahl-Screen**. Beim Verlassen zurück zur Standardfigur. Es handelt sich um eine Einzelauswahl, keine unabhängig aktivierbaren Checkboxen.
- Geplante Animationen aus [Theo-Animationen](theo-animations.md); keine Körper-/Gefühlsbewertung anhand Gewicht, Körperfett oder Kalorien.

Makros bleiben gemäß bisheriger Spezifikation optional. Eine geänderte Voreinstellung wurde noch nicht abschließend beschlossen. Oben rechts gezeigter Theo ist ein Positionsvorschlag; keine endgültig freigegebene Platzierung.

## 3. Architektur für die erste Umsetzung

Ein Expo-Projekt im Repo, zunächst ohne unnötige Aufteilung in mehrere deploybare Anwendungen.

| Bereich | Aufgabe / vorgeschlagener Ort |
| --- | --- |
| Routen | `app/`: Start, Onboarding, Ergebnis, Heute, Profil, Konto, Erklärungen |
| Fachlogik | `src/domain/`: Eingabetypen, Validierung, Rechenmodell, Rundung, Planversionen |
| Funktionen | `src/features/`: Onboarding, Plan, Profil, Auth, Theo |
| Oberfläche | `src/ui/`: Designwerte, Buttons, Picker, Auswahlfelder, Sheet/Dialog |
| Speicherung | `src/data/`: lokale Gastdaten und Supabase-Zugriff hinter getrennten Schnittstellen |
| Erklärungstexte | `src/content/`: verständliche statische Hilfe pro Screen, ohne LLM |
| Backend | `supabase/migrations/`: Tabellen, Zugriffsregeln und spätere Änderungen |
| Prüfungen | `tests/`: Rechenfälle, Zustandsübergänge, Datenzugriffe, kritische Nutzerabläufe |

**Datenfluss:** Eingaben → validiertes Eingabemodell → reine Berechnungsfunktionen → versionierter Plan → Tagesansicht/Erklärung. Die UI führt keine eigenen abweichenden Formeln aus.

Vorgeschlagene Datenobjekte:

- `OnboardingDraft`: Eingaben und Fortschritt, unabhängig vom Login.
- `Profile`: aktuelle persönliche Angaben und Einstellungen.
- `PlanVersion`: unveränderlicher Stand der Eingaben, Berechnungsergebnisse, Modellversion, Start-/Zieldatum, Wirksamkeitsdatum, Cheat Day und manuelle Overrides.
- `UserPreferences`: Darstellungsmodus und Status der einmaligen Theo-Einführung.
- Lokale Datensätze und Kontodatensätze sind klar getrennt. Nutzerwechsel/Logout dürfen keine fremden Kontodaten anzeigen.

Historische Planstände jetzt berücksichtigen, aber Mahlzeiten-/Gewichtsverlaufsdaten und Diagramme erst in der späteren Tracking-Version hinzufügen.

## 4. Etappen und Abnahmekriterien

### Etappe 0 — Repo, Anforderungen und konkrete Startentscheidungen

**Arbeit**

- Aktuellen Branch, Repo-Anweisungen, Spezifikationen und Asset-Index prüfen.
- Neuere Gesprächsentscheidungen aus Abschnitt 2 in Main-Screen-/Profil-Spezifikation und Animationstext übernehmen.
- Vorläufige Entscheidungen aus Abschnitt 6 sichtbar auflösen oder als klar begrenzte Implementierungsdefaults dokumentieren.
- Lokale Entwicklungsumgebung, Geräte-/Browser-Prüfpfad und Zugang zu einem Entwicklungs-Supabase-Projekt vorbereiten.

**Fertig, wenn:** V1-Scope und offene Produktregeln sind eindeutig; keine veraltete Wochen-Navigation aus Referenzbildern wird übernommen. Fehlender Cloud-Zugang blockiert die lokale Gastentwicklung nicht.

### Etappe 1 — Lauffähiges Grundgerüst und Nocturne-Komponenten

**Arbeit**

- Expo, React Native, TypeScript, Expo Router und Web einrichten; reproduzierbare Abhängigkeiten, Startbefehle, Umgebungsbeispiel und CI für Typprüfung/Tests.
- Designwerte für Farben, Typografie, Abstände, Fokus und Touch-Flächen definieren.
- Button, Radio-Auswahl, Zahlenfeld, vertikalen Wheel-Picker und optionales Hilfepanel bauen.
- Responsives Layout, Tastaturbedienung und System-Schriftvergrößerung berücksichtigen.

**Fertig, wenn:** eine lokale Beispielroute auf iOS, Android und Web startbar ist. Picker lässt sich mit Touch sowie auf Web per Tastatur bedienen. Typprüfung und Grundbuild funktionieren.

### Etappe 2 — Rechenkern als unabhängiges TypeScript-Modul

**Arbeit**

- Mifflin/Cunningham-Routing mit optionalem aktuellem KFA.
- MET-Alltagsprofile mit 5/7-Mittelung, Schritte und Netto-Training.
- TEF, Erhaltungsbedarf, Ziel-KFA → Zielgewicht, Zeitraum und Defizit.
- Automatische Planungsgrenzen getrennt von bewussten manuellen Overrides.
- Wochenbudget, genau ein Cheat Day, 50-kcal-Raster, nominales Limit und deterministische Rundungsrestverteilung.
- Protein-Tier, Fettanteil und restliche Kohlenhydrate pro konkretem Tag.
- Strukturierte Berechnungspositionen für dieselben Zahlen in Ergebnis und Erklärung.

**Fertig, wenn:** Tests die dokumentierten Rechenbeispiele innerhalb begründeter Rundungstoleranzen reproduzieren. Grenzfälle umfassen fehlenden KFA, 0 Training, Schwelle 2/3 Einheiten, ungültige Zahlen/Datumswerte, Ziel-KFA ohne aktuellen KFA, unmögliche Zielzeiträume, Budgeterhaltung und manuelle Makroabweichungen. Kein ungültiger Plan wird still als reguläres Ergebnis angezeigt.

Die Tests prüfen Produktregeln. Bekannte Modellunsicherheit und mögliche Alltags-/Schrittüberschneidung bleiben dokumentiert; kein erfundener Korrekturfaktor.

### Etappe 3 — Kleiner durchgängiger Nutzerpfad

**Arbeit**

- Einen gültigen Eingabepfad mit lokaler Berechnung, Cheat-Day-Picker, Ergebnis und Heute verbinden.
- Eingabedaten bleiben im Gastmodus lokal. Fehlende Backend-Konfiguration verhindert die Berechnung nicht.
- Kontextbezogene Theo-Hilfe und einmalige Einführung integrieren.
- Mit Entwicklungs-Supabase den Pfad „Gastplan → Registrierung → bestätigtes Speichern → erneut laden“ früh prüfen.

**Fertig, wenn:** reale Eingaben statt Mockwerte zu einem reproduzierbaren Plan führen. Picker aktualisiert abgeleitete Werte konsistent. Login-/Speicherfehler zerstören den Gastentwurf nicht. Dieser schmale Pfad ist die Architekturprüfung vor dem Ausbau aller Screens.

### Etappe 4 — Vollständiges Onboarding und Gastmodus

**Arbeit**

- Alle 18 dokumentierten Schritte einschließlich bedingter Trainingsscreens und alternativer Zieldefinition umsetzen.
- Zurücknavigation und Änderungen früherer Angaben konsistent behandeln: z. B. Training auf 0 oder aktuellen KFA entfernen.
- KFA-Hilfe anhand des vorhandenen Asset-Index anbinden; numerische Zwischenwerte unabhängig von Bildankern erlauben.
- Gastentwurf gemäß gewählter Speicherregel fortsetzen und zurücksetzen können.
- Validierung, Lade-/Fehlerzustände und Hilfetexte fertigstellen.

**Fertig, wenn:** der vollständige Gastablauf ohne Konto funktioniert, optionale Pfade übersprungen werden können und Änderungen keine veralteten abhängigen Werte in die Berechnung übernehmen. Es werden keine Gast-Körperdaten ans Backend geschickt. Vorhandene KFA-Dateien werden auf Vollständigkeit und Freigabestatus geprüft; Existenz bedeutet nicht fachliche Validierung.

### Etappe 5 — Heute, Profil und Planänderungen

**Arbeit**

- Heute: datumsgültiges Kalorienziel, optionale Makrozeile ohne zusätzliche Überschrift, Cheat-Day-Label, Berechnungszugang.
- Nur Heute/Profil als Hauptnavigation.
- Profil mit Körper-/Aktivitätsdaten, Ziel/Zeitraum, Cheat Day, Tracking-Modus und erweiterten manuellen Anpassungen.
- Änderungen zunächst als Entwurf berechnen; beim Übernehmen neue Planversion erzeugen.
- Tageswechsel, App-Wiederaufnahme, Planende und noch nicht vorhandenen Plan berücksichtigen.

**Fertig, wenn:** regulärer Tag und Cheat Day die passenden Werte zeigen, Profiländerungen nachvollziehbar wirksam werden und manuelle Overrides nicht still verschwinden. Heute enthält weder Wochenübersicht noch vorgetäuschtes Tracking. Datumsauswahl und Wirksamkeit hängen an einer klaren Kalender-/Zeitzonenregel.

### Etappe 6 — Konten, Speicherung und geräteübergreifender Zugriff

**Arbeit**

- Supabase Auth, Tabellen/Migrationen und nutzerbezogene Zugriffsregeln fertigstellen.
- Registrierung/Login über Profil und optionale Kontospeicherung nach dem Ergebnis.
- Gastimport wiederholbar ohne doppelte Pläne; Erfolg erst nach bestätigtem Schreiben.
- Bestehendes Konto mit anderem Plan: ausdrückliche Auswahl statt stilles Überschreiben.
- Logout, erneutes Login, Session-Erneuerung, Kontowiederherstellung und Speicherfehler.
- Versions-/Konfliktprüfung bei Änderungen von mehreren Geräten.

**Fertig, wenn:** zwei Testnutzer nicht auf Daten des jeweils anderen zugreifen können; ein Nutzer seinen Plan auf einem zweiten Gerät laden kann; fehlgeschlagene Imports wiederholt werden können. Privilegierte Supabase-Schlüssel liegen nicht im Client.

### Etappe 7 — Theo, Animationen und visuelle Ausarbeitung

**Arbeit**

- Animierbare Figur mit getrennten Elementen für Körper, Gesicht, Frisuren und Requisiten erstellen. Vorhandene gerenderte Mockup-Figur ist noch kein fertiges Animationsasset.
- Größenänderung mit festem Fußpunkt und unverändertem Layout.
- Frisur nur im Geschlechtsauswahl-Screen; beim Verlassen vollständig zurücksetzen, auch über Zurücknavigation.
- Schritte, Training, Timer, Kalender, neutrale Gewichtseingabe, Cheat-Day-Erklärung, Zeigen auf Rechenschritte und Speicher-Häkchen gemäß Animationskonzept.
- Bewegungen unterbrechen bei neuer Eingabe, Screenwechsel oder Hintergrundzustand; danach Ruhe.
- Reduzierte Bewegung und zugängliche Alternative zur animierten Hilfe.

**Fertig, wenn:** Theos Bewegungen den Inhalt nicht verdecken, keine Dauerschleifen entstehen und Systempräferenzen berücksichtigt werden. Häkchen nur nach echtem Speichererfolg. Die Frisur bleibt niemals auf anderen Screens hängen. Sprach-Wellenform bleibt außerhalb V1.

### Etappe 8 — V1-Abnahme und veröffentlichbare Builds

**Arbeit**

- Gast und Konto, KFA ja/nein, Training ja/nein, Makros ja/nein, Cheat Day ja/nein, manuelle Änderungen und Fehlerfälle prüfen.
- Automatisierte Rechen-/Datenzugriffstests sowie gezielte End-to-End-Tests für Gast → Plan und Gast → Konto.
- Browserprüfung auf schmalen und breiten Ansichten; iOS-/Android-Gerätetests für Picker, Tastatur, Deep Links, Animationen und Barrierefreiheit.
- Web-Build und mobile Testbuilds erstellen, Einrichtung und bekannte Grenzen dokumentieren.
- Kostenpflichtige Dienste, Produktionskonfiguration, Store-Konten und öffentliche Veröffentlichung separat behandeln.

**Fertig, wenn:** die Kernabläufe auf allen Zielplattformen geprüft sind und nachvollziehbar dokumentierte Builds vorliegen. Ein im Browser bestandener Test allein ist keine mobile Abnahme. Offene Modell-/Content-Fragen werden nicht durch „Build erfolgreich“ als wissenschaftlich validiert erklärt.

## 5. Umsetzung nach V1 — eigene Ausbaustufen

### V2a: Gewicht und Verlauf

- Datierte Gewichtsmessung unabhängig von „aktuelles Gewicht im Profil ändern“.
- Neuer Bereich „Verlauf“.
- Tatsächliche Messpunkte und klar bezeichnete Modellprognose über den Zielzeitraum.
- Ursprüngliche Planprognose und spätere Planversionen getrennt erhalten.
- Fehlende Messungen nicht als Nullwerte oder erfundene Messpunkte darstellen.

### V2b: Ernährungstracking und Vergleiche

- Mahlzeiten mit Datum, Mengen, Nährwerten, Bearbeiten und Löschen.
- Tagesbilanz und jeweils damals gültige Kalorien-/Makroziele.
- Diagramme für Kalorien sowie Protein/Fett/Kohlenhydrate: erfasst versus geplant.
- Kalenderstatus „Ziel eingehalten“ erst mit definierter Toleranz und Kennzeichnung unvollständiger Tage.
- Fehlendes Tracking ist weder 0 kcal noch automatisch Erfolg/Misserfolg.

### V2c: Sprache und LLM

- Aufnahme → Transkription → strukturierte Lebensmittel-/Mengeninterpretation → Datenbankwerte → deterministische Tagesbilanz.
- Antworten kurz und sachlich, ohne Begrüßung oder ungefragte Beratung.
- Knappe Rückfrage bei unklaren Mengen; Schätzungen erkennbar.
- Vorschau/Korrektur und Speicherverhalten gesondert entscheiden.
- Voice-Wellenform nur während echter Aufnahme; Modell-/Dienstwahl und Lebensmittelquelle separat festlegen.

Diese Ausbaustufen sind keine Voraussetzungen für die V1-Fertigstellung und werden bei einem Auftrag zur V1-Umsetzung nicht automatisch mitgebaut.

## 6. Noch offene Punkte — vorgeschlagene Arbeitsannahmen, keine stillen Beschlüsse

| Punkt | Vorschlag für die Umsetzung |
| --- | --- |
| Gastdaten nach Neustart | Lokal fortsetzbaren Entwurf vorsehen, mit „Daten zurücksetzen“; konkrete Speichertechnik in Etappe 0 wählen. Keine Cloud-Synchronisierung ohne Konto. |
| Anmeldung | Für den ersten vollständigen Pfad E-Mail/Passwort mit Wiederherstellung vorschlagen; alternative Provider später. Noch keine Providerentscheidung im Repo. |
| Gleichzeitige Änderungen | Versionen prüfen und Konflikt anzeigen statt still „letzter Schreibzugriff gewinnt“. |
| Neues Gewicht/Ziel | Vor Übernahme Neuberechnung zeigen, dann neuen Planstand ab Wirksamkeitsdatum erzeugen. Umgang mit vorhandenen Overrides sichtbar entscheiden. |
| Zielzeitraum bei Profiländerung | Zieldatum zunächst beibehalten und Restdauer neu bewerten, sofern Nutzer nicht bewusst neu plant; als UX-Regel bestätigen. |
| Zu niedrige reguläre Tage nach Cheat Day | Zustand erkennen und erklären; konkrete Regel laut D-038 noch offen. Vor Umsetzung ausdrücklich dokumentieren, nicht mit manuellen Overrides verwechseln. |
| Eingabegrenzen und nicht unterstützte Ziele | Erwachsene-Abnehmplanung als spezifizierten Fall implementieren; erlaubte Bereiche und nicht unterstützte Fälle vor Ergebnisdarstellung definieren. |
| Kalender/Zeitzone | Tagesziele anhand lokaler Kalendertage, stabile Planstart-/Zieldaten und explizite Reise-/Zeitzonenregel; Mitternacht/Sommerzeit testen. |
| Theo und Frisuren | Figur/Frisuren als separate Assets, Position im Feindesign prüfen; frühere abgelehnte Position nicht als Vorgabe übernehmen. |
| KFA-Bilder und Lebensmittelhilfe | Asset-/Content-Freigabe prüfen; offene Kalorienbeispiele nicht erfinden. |
| Hosting/Cloud-Zugang | Vor Konto-Integration beziehungsweise Veröffentlichung klären; lokale Gastentwicklung kann vorher beginnen. |

Diese Entscheidungen werden gesammelt zu Beginn der jeweils betroffenen Etappe getroffen. Reversible technische Details können bei der Umsetzung sinnvoll gewählt und dokumentiert werden; echte Änderungen am Produktverhalten werden sichtbar abgestimmt.

## 7. Definition „V1 umgesetzt“

- Code liegt reproduzierbar im Repo, mit dokumentiertem lokalen Start und festgehaltenen Abhängigkeiten.
- Gast kann ohne Konto einen validierten, erklärbaren Plan erstellen.
- Konto kann vorhandenen Gastplan speichern und auf anderem Gerät laden.
- Heute und Profil entsprechen den aktuellen Entscheidungen; alle angezeigten Planwerte stammen aus dem Rechenkern.
- Keine erfundenen Trackingdaten, keine Mikrofon-/LLM-Funktion in V1.
- Theo verhält sich kontextbezogen, ruhig und mit reduzierter Bewegung nutzbar.
- Kritische Berechnungen, Datenzugriffe und Nutzerpfade sind geprüft.
- Plattformprüfungen, verbleibende Einschränkungen und nicht freigegebene Inhalte sind konkret dokumentiert.
- Veröffentlichung ist ein eigener Schritt nach überprüfbaren Testbuilds.
