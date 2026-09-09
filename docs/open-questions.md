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
- Wann soll ein bestehender Plan neu berechnet werden, wenn der Nutzer später ein neues aktuelles Gewicht eingibt?
- Soll nach dem MVP ein dynamisches/adaptives Gewichtsverlaufsmodell ergänzt werden, das sinkenden Energiebedarf, metabolische Anpassungen und veränderte Körperzusammensetzung berücksichtigt?
- Wie wissenschaftlich belastbar ist die Annahme konstanter fettfreier Masse für die Ableitung eines Zielgewichts aus aktuellem KFA und Ziel-KFA, und wie soll das Modell gegebenenfalls verbessert werden?
- Wie gehen wir damit um, dass sich fettfreie Masse während einer Gewichtsabnahme verändern kann?
- Wie soll mit mehreren flexiblen Tagen pro Woche in der UX umgegangen werden, obwohl die Berechnungsformel bereits mehrere Tage unterstützt?

## Wissenschaft

- Welche Literatur und Einschränkungen sollen in der Entwicklerdokumentation zur gewählten V1-Modellannahme von 7.700 kcal pro kg Gewichtsverlust festgehalten werden?
- Welche Proteinempfehlung ist bei Energiedefizit optimal?
- Ist 1,2 g/kg für nicht trainierende Nutzer sinnvoll als Standard?
- Ist 2,0 g/kg für Kraft-/Leistungssportler sinnvoll als MVP-Standard?
- Ist 0,8 g/kg Fett als Mindestwert für die App geeignet?
- Soll Protein bei vorhandenem KFA eher auf fettfreie Masse als auf Körpergewicht bezogen werden?
- Welche Ziel-KFA-Bereiche sind für unterschiedliche Nutzergruppen sinnvoll bzw. sicher, und ab welchen Werten muss die App warnen oder Ziele ablehnen?
- Wie soll das gesamte Erhaltungsbedarfsmodell später gegen reale Gewichts-/Energieverlaufsdaten kalibriert und validiert werden?
- Müssen die vorläufigen automatischen Kalorien-Untergrenzen von 1.200 kcal/Tag für die weibliche und 1.500 kcal/Tag für die männliche Gleichungskategorie für bestimmte Zielgruppen angepasst werden?
- Welche Sonderregeln brauchen wir für Nutzergruppen, für die eine allgemeine selbstgesteuerte Gewichtsverlustplanung nicht geeignet ist?

## Produkt / UX

- Wie detailliert soll die Berechnung standardmäßig sichtbar sein?
- Welche Werte dürfen Nutzer manuell überschreiben?
- Wie soll die App mit manuellen Kalorienwerten umgehen, die unter den automatischen Planungsgrenzen liegen?
- Wie werden allgemeine Schätzungen und Unsicherheit dargestellt, ohne jede interne Modellunsicherheit separat im UI auszuweisen?
- Wie genau soll der einfache vs. erweiterte Tracking-Modus aussehen?
- Wie genau soll die Zieldefinition dargestellt werden, wenn ein aktueller KFA vorhanden ist: Zielgewicht direkt eingeben oder Ziel-KFA auswählen und daraus das Zielgewicht ableiten?
- Soll der aus Ziel-KFA berechnete Zielgewichtswert dem Nutzer vor der Planerstellung noch einmal ausdrücklich zur Bestätigung gezeigt werden?
- Wie zeigen wir dem Nutzer nach Auswahl eines Ziel-KFA verständlich, dass das daraus berechnete Zielgewicht und die notwendige Gewichtsabnahme nur Modellschätzungen sind?
- Wie genau soll der geplante flexible-Tag-/höheres-Tagesbudget-Screen im Onboarding aussehen?
- Wie wählt der Nutzer den Wochentag und die Höhe des flexiblen Tagesbudgets zwischen normalem Tagesziel und Erhaltungsbedarf aus?
- Soll die App statt des Begriffs „Cheat Day“ eine neutralere Bezeichnung wie „flexibler Tag“, „Maintenance Day“ oder „höheres Tagesbudget“ verwenden?
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
