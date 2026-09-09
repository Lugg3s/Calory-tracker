# Offene Fragen

Diese Liste wird während der Produktentwicklung fortlaufend ergänzt.

## Berechnung

- Wie werden die Zeitanteile für das MET-basierte Alltagsmodell mit möglichst wenig zusätzlichem Onboarding-Aufwand erfasst oder abgeleitet?
- Welche konkreten Alltagstypen werden welchen MET-Werten bzw. MET-Zeitprofilen zugeordnet?
- Wie wird im MET-Alltagsmodell sichergestellt, dass Gehaktivität nicht doppelt mit der separat berechneten Schritt-Komponente gezählt wird?
- Soll `0,414 × Körpergröße` als Fallback für die Schrittlänge bestehen bleiben oder durch eine besser validierte Schätzung ersetzt werden?
- Wie werden gemessene Distanzdaten aus Smartphone/Health/Wearables priorisiert und in das Schrittmodell übernommen?
- Welche Standard-MET-Werte verwenden wir für die einzelnen Trainingsarten?
- Wie werden unterschiedliche Trainingsintensitäten modelliert, ohne das initiale Onboarding unnötig zu verlängern?
- Wie wird mit stark variierender Trainingsdauer oder sehr unregelmäßigem Training umgegangen?
- Wann sollen sportartspezifische Modelle, z. B. Pace/Distanz beim Laufen oder Watt beim Radfahren, den generischen MET-Ansatz ersetzen?
- Soll TEF später im erweiterten Modus makronährstoffabhängig statt pauschal mit 10 % berechnet werden?
- Welche Grenzen gelten für das empfohlene Defizit?
- Welche Methode verwenden wir für die Projektion über längere Zeiträume?
- Wie berücksichtigen wir metabolische Anpassungen und sinkenden Energiebedarf bei Gewichtsverlust?
- Wie wissenschaftlich belastbar ist die Annahme konstanter fettfreier Masse für die Ableitung eines Zielgewichts aus aktuellem KFA und Ziel-KFA, und wie soll das Modell gegebenenfalls verbessert werden?
- Wie gehen wir damit um, dass sich fettfreie Masse während einer Gewichtsabnahme verändern kann?
- Wie wird aus dem durchschnittlichen täglichen Kalorienziel ein Wochenbudget abgeleitet?
- Wie wird ein geplanter Cheat Day in das Wochenbudget eingerechnet, ohne das geplante durchschnittliche Defizit über die Woche unbeabsichtigt zu verändern?
- Wie werden die Kalorien auf Cheat Day und übrige Wochentage verteilt, und welche Grenzen gelten für diese Umverteilung?

## Wissenschaft

- Welcher Wert pro kg Fettmasse soll als Modellannahme für die Defizit-/Gewichtsverlustrechnung verwendet werden?
- Welche Literatur unterstützt diesen Wert und welche Einschränkungen gibt es?
- Welche Proteinempfehlung ist bei Energiedefizit optimal?
- Ist 1,2 g/kg für nicht trainierende Nutzer sinnvoll als Standard?
- Ist 2,0 g/kg für Kraft-/Leistungssportler sinnvoll als MVP-Standard?
- Ist 0,8 g/kg Fett als Mindestwert für die App geeignet?
- Soll Protein bei vorhandenem KFA eher auf fettfreie Masse als auf Körpergewicht bezogen werden?
- Welche Ziel-KFA-Bereiche sind für unterschiedliche Nutzergruppen sinnvoll bzw. sicher, und ab welchen Werten muss die App warnen oder Ziele ablehnen?
- Wie soll das gesamte Erhaltungsbedarfsmodell später gegen reale Gewichts-/Energieverlaufsdaten kalibriert und validiert werden?

## Produkt / UX

- Wie detailliert soll die Berechnung standardmäßig sichtbar sein?
- Welche Werte dürfen Nutzer manuell überschreiben?
- Wie stark soll die App Nutzer vor sehr aggressiven Zielen warnen?
- Wie werden allgemeine Schätzungen und Unsicherheit dargestellt, ohne jede interne Modellunsicherheit separat im UI auszuweisen?
- Wie genau soll der einfache vs. erweiterte Tracking-Modus aussehen?
- Wie genau soll die Zieldefinition dargestellt werden, wenn ein aktueller KFA vorhanden ist: Zielgewicht direkt eingeben oder Ziel-KFA auswählen und daraus das Zielgewicht ableiten?
- Soll der aus Ziel-KFA berechnete Zielgewichtswert dem Nutzer vor der Planerstellung noch einmal ausdrücklich zur Bestätigung gezeigt werden?
- Wie zeigen wir dem Nutzer nach Auswahl eines Ziel-KFA verständlich, dass das daraus berechnete Zielgewicht und die notwendige Gewichtsabnahme nur Modellschätzungen sind?
- Wie genau soll der geplante Cheat-Day-Screen im Onboarding aussehen?
- Ist ein Cheat Day optional, welcher Wochentag wird gewählt und wie viel zusätzliches Kalorienbudget kann der Nutzer dafür einplanen?
- Soll die App statt des Begriffs „Cheat Day“ eventuell eine neutralere Bezeichnung wie „flexibler Tag“ oder „höheres Tagesbudget“ verwenden?
- Wie genau wird aus Größe und Gewicht die interne Körperform-/Referenzkategorie für KFA-Vergleichsbilder abgeleitet?
- Wie viele Körperform-/Referenzkategorien brauchen wir, damit die Bildbibliothek klein bleibt und die Beispiele trotzdem hilfreich sind?
- Welche Grenzwerte sollen diese Kategorien haben, und wie vermeiden wir irreführende Zuordnungen bei sehr muskulösen oder anderweitig atypischen Körperzusammensetzungen?
- Welche KFA-Spanne soll die Referenzbibliothek abdecken und bleiben 5-Prozentpunkt-Schritte als Standard für die visuellen Anker geeignet?
- Reicht für die erste Version eine Frontansicht pro Referenzkombination oder brauchen wir zusätzliche Bildansichten?
- Wie stellen wir bei KFA-Referenzbildern klar genug dar, dass Körperform und Fettverteilung individuell variieren und die Bilder nur eine grobe Orientierung sind?

## Food Tracking

- Welche Lebensmittel-Datenbank verwenden wir?
- Wie werden Portionsgrößen geschätzt?
- Wie werden unbekannte Mengen behandelt?
- Welche Funktionen sind ohne LLM sinnvoll?

## AI

- Welches LLM?
- Welcher Speech-to-Text-Dienst?
- Welche strukturierte Schnittstelle zwischen LLM und Ernährungsdatenbank?
- Wie werden Halluzinationen bzw. falsche Nährwertangaben verhindert?
- Welche Daten dürfen an externe Modelle übertragen werden?

## Tech Stack

- Frontend / Mobile Framework
- Backend
- Datenbank
- Authentifizierung
- Hosting
- Analytics
- KI-Infrastruktur
